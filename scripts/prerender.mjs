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

  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(siteName)}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:image" content="${baseUrl}${ogImage}" />`,
    `<meta property="og:image:width" content="1672" />`,
    `<meta property="og:image:height" content="941" />`,
    `<meta property="og:image:alt" content="Akshay Mahajan — AI agents, chatbots and automation" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${baseUrl}${ogImage}" />`,
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
  const nav = routes
    .filter((r) => r.path !== route.path)
    .map((r) => `<li><a href="${r.path}">${esc(r.title.split('|')[0].trim())}</a></li>`)
    .join('');

  return `
      <main>
        <h1>${esc(route.heading || route.title.split('|')[0].trim())}</h1>
        <p>${esc(route.lead || route.description)}</p>
        ${route.points?.length ? `<ul>${route.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
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

/* Unknown URLs get a page that tells crawlers not to index it. */
const notFound = template.replace(
  '</head>',
  `  <title>Page not found | ${esc(siteName)}</title>
    <meta name="robots" content="noindex, follow" />
  </head>`,
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
