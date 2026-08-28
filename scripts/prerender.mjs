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
 * The FAQ, read from the component that renders it.
 *
 * These six answers are the most quotable thing on the site — they are what an
 * answer engine lifts when someone asks what a build costs or how long it
 * takes — and they existed only in JavaScript. Reading them from the component
 * rather than restating them in the manifest means the page and the markup
 * cannot drift apart, which is exactly how the sitemap and this script ended up
 * disagreeing elsewhere.
 */
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
  const faqHtml =
    route.faq && FAQ.length
      ? `<h2>Common questions</h2><dl>${FAQ.map(
          (item) => `<dt>${esc(item.q)}</dt><dd>${esc(item.a)}</dd>`,
        ).join('')}</dl>`
      : '';

  return `
      <main>
        <h1>${esc(route.heading || route.title.split('|')[0].trim())}</h1>
        <p>${esc(route.lead || route.description)}</p>
        ${route.points?.length ? `<h2>${esc(route.pointsHeading || 'Highlights')}</h2><ul>${route.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
        ${extraSections}
        ${faqHtml}
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

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${r.path === '/' ? `${baseUrl}/` : `${baseUrl}${r.path}`}</loc>
    <lastmod>${today}</lastmod>
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
