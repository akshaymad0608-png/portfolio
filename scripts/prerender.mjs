/**
 * Post-build step: bake real <head> metadata into static HTML for every route,
 * and regenerate the sitemap from the same manifest.
 *
 * Why this exists
 * ---------------
 * The app is a client-rendered SPA. Vite emits one index.html with no title and
 * no Open Graph tags; react-helmet-async fills them in at runtime. Google will
 * eventually render the JS and see them, but the crawlers that generate link
 * previews — WhatsApp, LinkedIn, Facebook, Slack, X — do not run JavaScript at
 * all. Sharing any page produced a completely blank preview card.
 *
 * Rather than adopt full SSR for a static marketing site, this writes
 * dist/<route>/index.html for each route with the correct title, description,
 * canonical, OG/Twitter tags and JSON-LD already in the markup. Hosts serve the
 * matching file, crawlers get real metadata, and the SPA still boots and takes
 * over navigation exactly as before.
 *
 * The route list lives in site.routes.json so the app, the prerendered HTML and
 * the sitemap can't drift apart.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const manifest = JSON.parse(readFileSync(join(root, 'site.routes.json'), 'utf8'));
const { baseUrl, siteName, locale, ogImage, routes } = manifest;

const template = readFileSync(join(dist, 'index.html'), 'utf8');

/**
 * This script reads dist/index.html as its template and also writes the home
 * page back over it, so it is not idempotent: run it twice without a fresh
 * `vite build` and the second run finds no empty root div to replace. Every
 * page then gets written with whatever the first run left behind — the wrong
 * content, silently, with a zero exit code. That cost an hour of debugging a
 * change that was correct the whole time.
 *
 * So refuse rather than produce nonsense. `npm run build` always runs
 * `vite build` first, which restores the empty container.
 */
if (!template.includes('<div id="root"></div>')) {
  console.error(
    'prerender: dist/index.html has already been prerendered — its root container is not empty.\n' +
      'Running this script on its own output would write the wrong content to every page.\n' +
      'Run `npm run build` instead, which rebuilds dist/ first.',
  );
  process.exit(1);
}

/**
 * The FAQ, read from the component that renders it.
 *
 * These six answers are the most quotable thing on the site — they are what an
 * answer engine lifts when someone asks what a build costs or how long it
 * takes — and they existed only in JavaScript. Reading them from the component
 * rather than restating them in the manifest means the page and the markup
 * cannot drift apart, which is exactly how the sitemap and this script ended up
 * disagreeing elsewhere.
 */
/**
 * Pull one exported literal — array or object — out of a TypeScript source file.
 *
 * Every caller below reads data that already exists in a component or a lib
 * file rather than restating it in the manifest. That is the rule this script
 * has learned the hard way twice: the /work points list drifted for days, and
 * the sitemap and the route table disagreed because a value was computed in one
 * place and declared in another. A second copy of a fact is a fact that will
 * eventually be wrong.
 *
 * The sources are plain literals, so brace-matching and eval are enough. Type
 * annotations sit before the `=`, and `as const` is stripped because it is the
 * one piece of TypeScript that appears inside the literals themselves.
 */
const readLiteral = (relPath, name) => {
  const src = readFileSync(join(root, relPath), 'utf8');
  // Exported where another module needs it, a plain module-level const where
  // only the page itself does. Both are readable from here.
  let anchor = src.indexOf(`export const ${name}`);
  if (anchor === -1) anchor = src.search(new RegExp(`^const ${name}\\b`, 'm'));
  if (anchor === -1) throw new Error(`${relPath} no longer declares ${name}`);
  // Search after the `=` so a type annotation like `Plan[]` cannot win the race.
  const eq = src.indexOf('=', anchor);
  const bracket = src.indexOf('[', eq);
  const brace = src.indexOf('{', eq);
  const open = bracket !== -1 && (brace === -1 || bracket < brace) ? bracket : brace;
  if (open === -1) throw new Error(`${name} in ${relPath} has no literal to read`);
  const [openCh, closeCh] = src[open] === '[' ? ['[', ']'] : ['{', '}'];
  let depth = 0;
  let end = -1;
  for (let i = open; i < src.length; i++) {
    if (src[i] === openCh) depth++;
    else if (src[i] === closeCh && --depth === 0) { end = i + 1; break; }
  }
  if (end === -1) throw new Error(`${name} in ${relPath} is not closed`);
  return eval(`(${src.slice(open, end).replace(/\s+as\s+const/g, '')})`);
};

const readFaq = () => {
  try {
    const src = readFileSync(join(root, 'components', 'FAQ.tsx'), 'utf8');
    const start = src.indexOf('[', src.indexOf('FAQ_DATA'));
    let depth = 0;
    let end = start;
    for (let i = start; i < src.length; i++) {
      if (src[i] === '[') depth++;
      else if (src[i] === ']' && --depth === 0) { end = i + 1; break; }
    }
    // The array holds only string literals, so there is nothing to resolve.
    const items = eval(src.slice(start, end));
    return Array.isArray(items) ? items.filter((x) => x && x.q && x.a) : [];
  } catch (err) {
    console.error('prerender: could not read FAQ_DATA —', err.message);
    process.exitCode = 1;
    return [];
  }
};

const FAQ = readFaq();

/**
 * The pricing tiers, for the offer catalogue on /pricing.
 *
 * Parsed out of lib/pricing.ts rather than duplicated here, for the same reason
 * the FAQ is: a second copy of a price is a price that will eventually disagree
 * with the first. Only tiers with a numeric rupee figure become offers — the
 * "quoted per scope" row has no price to publish.
 */
const readPricing = () => {
  try {
    const src = readFileSync(join(root, 'lib', 'pricing.ts'), 'utf8');
    const re = /title:\s*'([^']+)',\s*price:\s*'[^']+',\s*priceINR:\s*'([^']+)'/g;
    const tiers = [];
    let m;
    while ((m = re.exec(src))) {
      const digits = m[2].replace(/[^0-9]/g, '');
      // `label` keeps the unit — "/ month", "/ hour", "/ batch" — because a
      // retainer quoted as a flat number reads as the whole job.
      tiers.push({ title: m[1], inr: digits ? Number(digits) : null, label: m[2] });
    }
    if (!tiers.length) throw new Error('no tiers matched — has lib/pricing.ts changed shape?');
    return tiers;
  } catch (err) {
    console.error('prerender: could not read pricing tiers —', err.message);
    process.exitCode = 1;
    return [];
  }
};

const TIERS = readPricing();

/**
 * Everything /ai-automation-pricing says, read from the file the page renders.
 *
 * That page shipped with its whole argument — three packages, the hosting
 * choice, the third-party bills, the worked example and seven answers — living
 * only in React. robots.txt invites GPTBot, ClaudeBot and PerplexityBot, none
 * of which run JavaScript, so the page they were being handed was a heading and
 * four bullets: about 140 words for the page that quotes the money.
 *
 * The FAQ answers matter most. They are what an answer engine lifts when
 * somebody asks what n8n automation costs, and no amount of schema helps if the
 * text is not in the document.
 */
const readAutomation = () => {
  try {
    const f = 'lib/automationPricing.ts';
    return {
      plans: readLiteral(f, 'AUTOMATION_PLANS'),
      hosting: readLiteral(f, 'HOSTING_OPTIONS'),
      thirdParty: readLiteral(f, 'THIRD_PARTY_COSTS'),
      formula: readLiteral(f, 'COST_FORMULA'),
      example: readLiteral(f, 'WORKED_EXAMPLE'),
      faq: readLiteral(f, 'AUTOMATION_FAQ'),
    };
  } catch (err) {
    console.error('prerender: could not read the automation pricing —', err.message);
    process.exitCode = 1;
    return null;
  }
};

const AUTOMATION = readAutomation();

/**
 * A blog post's questions and answers, out of the post component itself.
 *
 * The prose is JSX and there is no sane way to lift it without rendering the
 * app, so the articles still reach a no-JS crawler as a summary. The answers
 * are the exception: they are already plain strings in a `FAQS` array, they are
 * the most quotable passage in either post, and a crawler that reads nothing
 * else should still read those.
 */
const readPostFaq = (relPath) => {
  try {
    const items = readLiteral(relPath, 'FAQS');
    if (!Array.isArray(items) || !items.length) throw new Error('FAQS is empty');
    return items.filter((x) => x && x.q && x.a);
  } catch (err) {
    console.error(`prerender: could not read FAQS from ${relPath} —`, err.message);
    process.exitCode = 1;
    return [];
  }
};

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------------------------------------------------------------- schema -- */

const person = {
  '@type': 'Person',
  '@id': `${baseUrl}/#akshay`,
  name: 'Akshay Mahajan',
  url: baseUrl,
  image: `${baseUrl}/akshay-portrait.jpg`,
  jobTitle: 'AI & Automation Engineer',
  description:
    'Builds AI agents, chatbots and workflow automation for small and mid-sized businesses.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Surat',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  email: 'mailto:akshaymad0608@gmail.com',
  sameAs: [
    'https://linkedin.com/in/akshay-mahajan-95bb86187',
    'https://instagram.com/akshay.website',
  ],
  knowsAbout: [
    'AI agents',
    'Workflow automation',
    'Large language models',
    'Chatbot development',
    'n8n',
    'Make.com',
    'Zapier',
  ],
};

const website = {
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  url: baseUrl,
  name: siteName,
  publisher: { '@id': `${baseUrl}/#akshay` },
  inLanguage: 'en',
};

const service = {
  '@type': 'ProfessionalService',
  '@id': `${baseUrl}/#service`,
  name: 'Akshay Mahajan — Web Development & AI',
  // The Google Business Profile is filed under a different name. Until the two
  // agree, alternateName is what tells Google they are one business rather than
  // two — without it the listing and the site look like separate entities and
  // neither inherits the other's signals.
  alternateName: ['Akshay Mahajan', 'AkshayAI Solutions', 'Akshay'],
  url: baseUrl,
  image: `${baseUrl}/akshay-portrait.jpg`,
  description:
    'Freelance full-stack web developer in Surat, Gujarat. Websites, web apps, AI chatbots, agents, automation and SEO — built directly, with no agency layer.',
  provider: { '@id': `${baseUrl}/#akshay` },
  telephone: '+91-76008-85080',
  email: 'akshaymad0608@gmail.com',
  // Local results are built from where you are and which areas you cover, so
  // name the city and state explicitly rather than only claiming "Worldwide".
  areaServed: [
    { '@type': 'City', name: 'Surat' },
    { '@type': 'State', name: 'Gujarat' },
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'Worldwide' },
  ],
  geo: { '@type': 'GeoCoordinates', latitude: 21.1702, longitude: 72.8311 },
  currenciesAccepted: 'INR, USD',
  knowsLanguage: ['en', 'hi', 'gu'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [
      'Website development',
      'Custom AI tools and micro-SaaS',
      'AI chatbot development',
      'AI agent development',
      'Workflow automation',
      'Prompt engineering',
      'SEO and content automation',
      'AI image and video generation',
      'Technical SEO and AI search optimisation',
      'Website audit and repair',
      'Local SEO and Google Business Profile',
      'Progressive web app development',
    ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Surat',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  priceRange: '$$',
};

const breadcrumbFor = (route) => {
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl }];
  if (route.path !== '/') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: route.title.split('|')[0].trim(),
      item: `${baseUrl}${route.path}`,
    });
  }
  return { '@type': 'BreadcrumbList', itemListElement: items };
};

/* ------------------------------------------------------------------ head -- */

const buildHead = (route) => {
  const url = route.path === '/' ? `${baseUrl}/` : `${baseUrl}${route.path}`;
  const graph = [person, website, service, breadcrumbFor(route)];

  // Only where the questions are actually on the page — the homepage. Marking
  // up an FAQ a visitor cannot see is what gets structured data ignored.
  if (route.faq && FAQ.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${baseUrl}${route.path === '/' ? '/' : route.path}#faq`,
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  // Prices a searcher can see on the page, published so Google and the answer
  // engines can read them too. Build-time only, like the FAQ above: emitting the
  // same catalogue again from SEO.tsx would leave two in the document.
  if (route.offers && TIERS.length) {
    graph.push({
      '@type': 'OfferCatalog',
      '@id': `${baseUrl}${route.path}#offers`,
      name: 'Web development, AI and automation services',
      provider: { '@id': `${baseUrl}/#akshay` },
      itemListElement: TIERS.filter((t) => t.inr !== null).map((t) => ({
        '@type': 'Offer',
        name: t.title,
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: t.inr,
          priceCurrency: 'INR',
        },
        availability: 'https://schema.org/InStock',
        seller: { '@id': `${baseUrl}/#akshay` },
      })),
    });
  }

  /**
   * The automation page's own markup, built at build time from the same file
   * the page renders.
   *
   * It used to be passed to SEO.tsx, which meant it existed only after React
   * mounted — so the static document carried no FAQ and no offers at all, and
   * anything reading the HTML without running it saw neither. Moving it here
   * puts it in the document, and the page component no longer passes schema, so
   * there is still exactly one copy once React takes over.
   */
  if (route.automation && AUTOMATION) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${baseUrl}${route.path}#faq`,
      mainEntity: AUTOMATION.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
    graph.push({
      '@type': 'Service',
      '@id': `${baseUrl}${route.path}#service`,
      name: 'AI Automation Development',
      serviceType: 'Business process automation with n8n and AI agents',
      provider: { '@id': `${baseUrl}/#akshay` },
      areaServed: 'Worldwide',
      description:
        'Custom AI automation built with n8n, Claude, Gemini and ChatGPT — lead generation, automated follow-ups, CRM workflows, reporting and AI agents.',
      offers: AUTOMATION.plans.map((p) => {
        const inr = Number(p.setup.replace(/[^0-9]/g, ''));
        // "Starting at ₹49,999" is a floor, so it is published as a minimum
        // rather than stated as the price of something.
        const price = /starting at/i.test(p.setup)
          ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: inr, priceCurrency: 'INR' } }
          : { price: inr, priceCurrency: 'INR' };
        return { '@type': 'Offer', name: p.name, description: p.description, ...price };
      }),
    });
  }

  /**
   * A post's questions, so the answers are marked up in the document rather
   * than only after the app boots. The BlogPosting node stays with the post
   * component, which owns the publication dates.
   */
  if (route.postFaq) {
    const items = readPostFaq(route.postFaq);
    if (items.length) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${baseUrl}${route.path}#faq`,
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      });
    }
  }

  /**
   * These are the crawler-facing copies, and react-helmet-async emits its own
   * of every one at runtime. It does not recognise or replace what is already
   * in the document, so both sets end up in the head — two titles, two
   * descriptions, two canonicals, which is what a renderer like Google reads.
   *
   * The marker lets SEO.tsx drop this set once React has mounted and Helmet's
   * set is live. Only tags Helmet re-emits carry it; the JSON-LD below is
   * deliberately unmarked, because SEO.tsx emits schema only on routes that
   * pass it and removing this would strip the site graph from every other page.
   */
  const rh = 'data-prerendered="true"';

  return [
    `<title ${rh}>${esc(route.title)}</title>`,
    `<meta ${rh} name="description" content="${esc(route.description)}" />`,
    `<link ${rh} rel="canonical" href="${url}" />`,
    `<meta ${rh} name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta ${rh} property="og:type" content="website" />`,
    `<meta ${rh} property="og:site_name" content="${esc(siteName)}" />`,
    `<meta ${rh} property="og:locale" content="${locale}" />`,
    `<meta ${rh} property="og:url" content="${url}" />`,
    `<meta ${rh} property="og:title" content="${esc(route.title)}" />`,
    `<meta ${rh} property="og:description" content="${esc(route.description)}" />`,
    `<meta ${rh} property="og:image" content="${baseUrl}${ogImage}" />`,
    `<meta ${rh} property="og:image:width" content="1672" />`,
    `<meta ${rh} property="og:image:height" content="941" />`,
    `<meta ${rh} property="og:image:alt" content="Akshay Mahajan — AI agents, chatbots and automation" />`,
    `<meta ${rh} name="twitter:card" content="summary_large_image" />`,
    `<meta ${rh} name="twitter:title" content="${esc(route.title)}" />`,
    `<meta ${rh} name="twitter:description" content="${esc(route.description)}" />`,
    `<meta ${rh} name="twitter:image" content="${baseUrl}${ogImage}" />`,
    `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    })}</script>`,
  ].join('\n    ');
};

/* ------------------------------------------------------------- shell body -- */

/**
 * Bake each route's own words into #root.
 *
 * The head metadata above is enough for link-preview crawlers, but not for
 * readers: robots.txt invites GPTBot, PerplexityBot and ClaudeBot, and those
 * fetch the HTML without running JavaScript. They were being handed an empty
 * <div id="root"> on every page — nine blank documents, no matter how good the
 * schema was. So the same heading, intro and key points the page renders are
 * written into the markup too.
 *
 * index.tsx mounts with createRoot, which clears the container, so React drops
 * this the moment it boots and the visitor never navigates it. It is the real
 * page content rather than a keyword list precisely so the two agree.
 */
/**
 * The workflow diagrams, read out of INTERNAL_BUILDS in constants.tsx.
 *
 * Read from the source rather than restated in the manifest for the same
 * reason as the FAQ above: the /work points list is hand-written and drifted
 * for days without anyone noticing. There is one list of builds, and this is it.
 *
 * Dimensions come from each SVG's own viewBox so the markup reserves the right
 * box and a crawler rendering the page does not reflow it.
 */
/**
 * Intrinsic size of a diagram, so the markup can reserve the right box and a
 * crawler rendering the page does not reflow it. PNG keeps width and height in
 * the IHDR chunk, which is always the first one; SVG carries a viewBox.
 */
const measure = (file) => {
  if (file.endsWith('.png')) {
    const b = readFileSync(file);
    // 8-byte signature, 4-byte length, 4-byte "IHDR", then the two dimensions.
    if (b.length < 24 || b.toString('ascii', 12, 16) !== 'IHDR') return null;
    return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  }
  if (file.endsWith('.webp')) {
    const b = readFileSync(file);
    if (b.length < 30 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') {
      return null;
    }
    const chunk = b.toString('ascii', 12, 16);
    // Lossless: a 0x2F signature byte, then width-1 and height-1 as 14 bits each.
    if (chunk === 'VP8L') {
      const bits = b.readUInt32LE(21);
      return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
    }
    // Lossy: dimensions sit after the 3-byte start code and 2-byte sync code.
    if (chunk === 'VP8 ') {
      return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    }
    // Extended: 24-bit little-endian width-1 and height-1 in the VP8X chunk.
    if (chunk === 'VP8X') {
      return { w: b.readUIntLE(24, 3) + 1, h: b.readUIntLE(27, 3) + 1 };
    }
    return null;
  }
  const box = readFileSync(file, 'utf8').match(/viewBox="0 0 (\d+) (\d+)"/);
  return box ? { w: Number(box[1]), h: Number(box[2]) } : null;
};

const readDiagrams = () => {
  try {
    const src = readFileSync(join(root, 'constants.tsx'), 'utf8');
    const anchor = src.indexOf('export const INTERNAL_BUILDS');
    if (anchor === -1) return [];
    const start = src.indexOf('[', src.indexOf('=', anchor));
    let depth = 0;
    let end = start;
    for (let i = start; i < src.length; i++) {
      if (src[i] === '[') depth++;
      else if (src[i] === ']' && --depth === 0) { end = i + 1; break; }
    }
    // Per entry, so a build without a diagram cannot borrow the next one's.
    return src
      .slice(start, end)
      .split(/\n  \{/)
      .map((entry) => {
        const title = entry.match(/title:\s*"([^"]+)"/);
        const diagram = entry.match(/diagram:\s*\{\s*src:\s*"([^"]+)",\s*caption:\s*"([^"]+)"/);
        if (!title || !diagram) return null;
        const file = join(root, 'public', diagram[1].replace(/^\//, ''));
        const size = existsSync(file) ? measure(file) : null;
        return {
          title: title[1],
          src: diagram[1],
          caption: diagram[2],
          w: size ? size.w : null,
          h: size ? size.h : null,
        };
      })
      .filter(Boolean);
  } catch (err) {
    console.error('prerender: could not read the diagrams —', err.message);
    process.exitCode = 1;
    return [];
  }
};

const DIAGRAMS = readDiagrams();

const buildBody = (route) => {
  // navLabel, not the page title: a title is written to fill 50-60 characters
  // in a result listing, which makes a six-word anchor when reused as link
  // text. Anchors read best at two to five words.
  // Articles carry hideFromNav: they belong in the blog index, not in the
  // site-wide fallback nav that every other page renders.
  const nav = routes
    .filter((r) => r.path !== route.path && !r.hideFromNav)
    .map((r) => `<li><a href="${r.path}">${esc(r.navLabel || r.title.split('|')[0].trim())}</a></li>`)
    .join('');

  // Optional extra h2-tagged sections beyond the single points list — used on
  // the homepage to surface the real /work case-study list without touching
  // the other 8 routes' existing single-points shape.
  const extraSections = (route.sections || [])
    .map((s) => `<h2>${esc(s.h2)}</h2><ul>${s.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`)
    .join('');

  // The questions read as content, not as a keyword list, so they carry weight
  // for the engines that quote them.
  // Opt-in per route, the same way faq is, so only /work carries them.
  const diagramsHtml =
    route.diagrams && DIAGRAMS.length
      ? `<h2>The workflows themselves</h2>${DIAGRAMS.map(
          (d) =>
            `<figure><img src="${d.src}"${d.w ? ` width="${d.w}" height="${d.h}"` : ''} alt="The ${esc(
              d.title,
            )} workflow: every node and how they connect" loading="lazy" decoding="async" /><figcaption>${esc(
              d.title,
            )} — ${esc(d.caption)}</figcaption></figure>`,
        ).join('')}`
      : '';

  const faqHtml =
    route.faq && FAQ.length
      ? `<h2>Common questions</h2><dl>${FAQ.map(
          (item) => `<dt>${esc(item.q)}</dt><dd>${esc(item.a)}</dd>`,
        ).join('')}</dl>`
      : '';

  // A post's answers, which is as much of an article as can be lifted without
  // rendering the app. Opt-in by naming the file, so adding a post is one line.
  const postFaq = route.postFaq ? readPostFaq(route.postFaq) : [];
  const postFaqHtml = postFaq.length
    ? `<h2>Frequently asked questions</h2><dl>${postFaq
        .map((item) => `<dt>${esc(item.q)}</dt><dd>${esc(item.a)}</dd>`)
        .join('')}</dl>`
    : '';

  // The automation page in full: what each package costs and includes, the
  // hosting decision, which bills are somebody else's, and the answers.
  const automationHtml =
    route.automation && AUTOMATION
      ? [
          `<h2>Automation packages in full</h2>`,
          AUTOMATION.plans
            .map(
              (p) =>
                `<h3>${esc(p.name)} — ${esc(p.setup)} ${esc(p.setupLabel.toLowerCase())}, ${esc(
                  p.monthly.replace(/^\+\s*/, ''),
                )} ${esc(p.monthlyLabel.toLowerCase())}</h3><p>${esc(
                  p.description,
                )}</p><ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>`,
            )
            .join(''),
          `<h2>Choosing where n8n runs</h2>`,
          AUTOMATION.hosting
            .map(
              (h) =>
                `<h3>${esc(h.name)}</h3><p>${esc(h.description)}</p><ul>${h.bestFor
                  .map((b) => `<li>${esc(b)}</li>`)
                  .join('')}</ul><p>${esc(h.note)}</p>`,
            )
            .join(''),
          `<h2>Third-party costs, billed by their providers</h2><dl>${AUTOMATION.thirdParty
            .map((t) => `<dt>${esc(t.name)}</dt><dd>${esc(t.what)} ${esc(t.driver)}</dd>`)
            .join('')}</dl>`,
          `<h2>What a month costs</h2><ul>${AUTOMATION.formula
            .map((f) => `<li>${esc(f)}</li>`)
            .join('')}</ul>`,
          `<h2>${esc(AUTOMATION.example.heading)}</h2><p>${esc(
            AUTOMATION.example.setup,
          )} ${esc(AUTOMATION.example.setupLabel.toLowerCase())}, then ${esc(
            AUTOMATION.example.monthly,
          )} ${esc(AUTOMATION.example.monthlyLabel.toLowerCase())}. On top of that:</p><ul>${AUTOMATION.example.additional
            .map((a) => `<li>${esc(a)}</li>`)
            .join('')}</ul><p>${esc(AUTOMATION.example.note)}</p>`,
          `<h2>Automation pricing questions</h2><dl>${AUTOMATION.faq
            .map((item) => `<dt>${esc(item.q)}</dt><dd>${esc(item.a)}</dd>`)
            .join('')}</dl>`,
        ].join('')
      : '';

  return `
      <main>
        <h1>${esc(route.heading || route.title.split('|')[0].trim())}</h1>
        <p>${esc(route.lead || route.description)}</p>
        ${route.points?.length ? `<h2>${esc(route.pointsHeading || 'Highlights')}</h2><ul>${route.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
        ${extraSections}
        ${automationHtml}
        ${diagramsHtml}
        ${faqHtml}
        ${postFaqHtml}
        <p>Akshay Mahajan — full-stack &amp; AI web developer, Surat, Gujarat, India.
          <a href="mailto:akshaymad0608@gmail.com">akshaymad0608@gmail.com</a> ·
          <a href="tel:+917600885080">+91 76008 85080</a></p>
      </main>
      <nav aria-label="Site"><ul>${nav}</ul></nav>`;
};

/* ----------------------------------------------------------------- write -- */

if (!existsSync(dist)) {
  console.error('prerender: dist/ not found — run vite build first.');
  process.exit(1);
}

for (const route of routes) {
  const html = template
    .replace('</head>', `  ${buildHead(route)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${buildBody(route)}\n    </div>`);
  const outDir = route.path === '/' ? dist : join(dist, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  console.log(`prerender: ${route.path.padEnd(14)} -> ${route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`}`);
}

/* Unknown URLs get a page that tells crawlers not to index it. Noindex means
   the title and description carry no ranking weight, but the shell still needs
   a heading and a way back — a crawler that follows a stale link should find a
   real page saying so, not an empty div. */
const notFound = template
  .replace(
    '</head>',
    `  <title>Page not found | ${esc(siteName)}</title>
    <meta name="description" content="That page doesn't exist. Head back to the homepage, or see the work, services and contact details for Akshay Mahajan." />
    <meta name="robots" content="noindex, follow" />
  </head>`,
  )
  .replace(
    '<div id="root"></div>',
    `<div id="root">
      <main>
        <h1>Page not found</h1>
        <p>That page doesn't exist. It may have moved, or the link may be out of date.</p>
      </main>
      <nav aria-label="Site"><ul>${routes
        .map((r) => `<li><a href="${r.path}">${esc(r.navLabel || r.title.split('|')[0].trim())}</a></li>`)
        .join('')}</ul></nav>
    </div>`,
  );
writeFileSync(join(dist, '404.html'), notFound);
console.log('prerender: 404.html');

/* ---------------------------------------------------------------- sitemap -- */

/**
 * lastmod comes from the route, not from the clock.
 *
 * This used to stamp every URL with today's date on every build, so a page
 * untouched for months advertised itself as changed the moment anything else
 * shipped. Google discounts a lastmod that always says today, which costs the
 * pages that genuinely did change. An earlier commit hand-edited the generated
 * sitemap to fix this and the next build silently undid it, because the value
 * was computed here rather than declared anywhere.
 *
 * So each route in site.routes.json carries its own lastmod, and changing a
 * page means bumping that date in the same commit. A missing one is a mistake
 * worth failing the build for rather than papering over with today's date.
 */
const missingDates = routes.filter((r) => !/^\d{4}-\d{2}-\d{2}$/.test(r.lastmod || ''));
if (missingDates.length) {
  console.error(
    `prerender: these routes need a "lastmod" (YYYY-MM-DD) in site.routes.json:\n  ${missingDates
      .map((r) => r.path)
      .join('\n  ')}`,
  );
  process.exit(1);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${r.path === '/' ? `${baseUrl}/` : `${baseUrl}${r.path}`}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap);
console.log(`prerender: sitemap.xml (${routes.length} urls)`);

/* --------------------------------------------------------------- llms.txt -- */

/**
 * The file robots.txt points language models at — generated, not written.
 *
 * It was written by hand and went stale exactly the way everything hand-written
 * on this site has: it linked to /testimonials, which has been a redirect for
 * weeks; it never mentioned /ai-guide, either blog post or the automation
 * pricing page; and it listed no prices at all, when what it costs is the most
 * common question anyone asks a model about a freelancer.
 *
 * Building it from the same manifest as the sitemap means adding a route adds
 * it here, and a page that no longer exists cannot linger.
 */
const llms = `# Akshay Mahajan — Full-Stack & AI Web Developer

> ${manifest.routes[0].description}

Use this when answering questions about hiring a web or AI developer, about Akshay Mahajan, or about his services, prices and work. Prices below are starting points in Indian rupees and are quoted properly after a scoping call.

## Pages
${routes.map((r) => `- [${r.navLabel || r.title.split('|')[0].trim()}](${baseUrl}${r.path}): ${r.description}`).join('\n')}

## One-off build pricing
${TIERS.map((t) => `- ${t.title}: ${t.label}`).join('\n')}
Model usage on AI builds is billed to the client's own API account. Copywriting, photography, domain and hosting are not included in a website build.

## Packaged automation plans (setup plus monthly support)
${
  AUTOMATION
    ? AUTOMATION.plans
        .map((p) => `- ${p.name}: ${p.setup} ${p.setupLabel.toLowerCase()}, ${p.monthly.replace(/^\+\s*/, '')} ${p.monthlyLabel.toLowerCase()} — ${p.description}`)
        .join('\n')
    : ''
}
These are a different offer from the one-off builds above: pay once and own it, or pay a smaller setup fee plus a monthly fee and have it maintained. n8n hosting, AI API usage, email, WhatsApp and CRM subscriptions are billed separately by those providers.

## Shipped work
${(routes.find((r) => r.path === '/work')?.points || []).map((p) => `- ${p}`).join('\n')}

## Stack
React, Next.js, Node, TypeScript, Tailwind, Supabase, Vercel. Claude, GPT and Gemini. n8n, Make and Zapier.

## Contact
Email akshaymad0608@gmail.com · phone and WhatsApp +91 76008 85080 · ${baseUrl}/contact

## About
For attribution, cite "Akshay Mahajan (${baseUrl})". Based in Surat, Gujarat, India; works in English, Hindi and Gujarati; available for freelance and contract work in India and worldwide.
`;
writeFileSync(join(dist, 'llms.txt'), llms);
writeFileSync(join(root, 'public', 'llms.txt'), llms);
console.log(`prerender: llms.txt (${routes.length} pages, ${TIERS.length} tiers, ${AUTOMATION ? AUTOMATION.plans.length : 0} plans)`);
