/**
 * Audits a built site against the SEO limits chart.
 *
 * Reads the prerendered HTML, not the source, because that is what a crawler
 * is served. Run from the repo root: node seo-limits-audit.mjs [distDir]
 */
import fs from 'fs';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, relative, sep } from 'path';

const DIST = process.argv[2] || 'dist';

const LIMITS = {
  titleMin: 50, titleMax: 60,
  descMin: 120, descMax: 160,
  altMax: 125,
  anchorWordsMin: 2, anchorWordsMax: 5,
  internalLinksMax: 150,
  imageKbMax: 100,
  robotsKbMax: 500,
  sitemapUrlMax: 50000,
};

const htmlFiles = [];
(function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith('.html')) htmlFiles.push(p);
  }
})(DIST);

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&mdash;/g, '—')
   .replace(/&ndash;/g, '–').replace(/&middot;/g, '·').replace(/&rsquo;/g, '’')
   .replace(/&nbsp;/g, ' ');

const findings = [];
const add = (page, rule, detail) => findings.push({ page, rule, detail });

for (const f of htmlFiles) {
  const page = '/' + relative(DIST, f).split(sep).join('/').replace(/index\.html$/, '');
  const h = fs.readFileSync(f, 'utf8');

  // Title and description limits exist to control how a result looks in the
  // listing. A noindex page never appears in one, so those two rules do not
  // apply to it — the structural checks below still do.
  const noindex = /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(h);

  // 1. meta title 50-60
  const title = decode((h.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '');
  if (noindex) { /* skip listing-only rules */ }
  else if (!title) add(page, 'Meta title', 'missing');
  else if (title.length < LIMITS.titleMin || title.length > LIMITS.titleMax)
    add(page, 'Meta title', `${title.length} chars — "${title}"`);

  // 2. exactly one <title> and one <h1>
  const titleCount = (h.match(/<title[\s>]/g) || []).length;
  if (titleCount > 1) add(page, 'One title per page', `${titleCount} <title> tags`);
  const h1s = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1s.length !== 1) add(page, 'One H1 per page', `${h1s.length} H1 tags`);

  // 3. meta description 120-160
  // Attribute order is not fixed — data-rh leads on the prerendered tags — so
  // find the tag first, then read content out of it.
  const descTag = (h.match(/<meta[^>]*name="description"[^>]*>/) || [])[0] || '';
  const desc = decode((descTag.match(/content="([\s\S]*?)"/) || [])[1] || '');
  if (noindex) { /* skip listing-only rules */ }
  else if (!desc) add(page, 'Meta description', 'missing');
  else if (desc.length < LIMITS.descMin || desc.length > LIMITS.descMax)
    add(page, 'Meta description', `${desc.length} chars — "${desc.slice(0, 70)}…"`);

  // 6. alt text <= 125
  for (const m of h.matchAll(/<img[^>]*\salt="([^"]*)"/g)) {
    const alt = decode(m[1]);
    if (alt.length > LIMITS.altMax) add(page, 'Alt text', `${alt.length} chars — "${alt.slice(0, 60)}…"`);
  }
  // images with no alt attribute at all
  for (const m of h.matchAll(/<img(?![^>]*\salt=)[^>]*>/g)) {
    add(page, 'Alt text', `missing alt on ${(m[0].match(/src="([^"]*)"/) || [])[1] || m[0].slice(0, 50)}`);
  }

  // 7. anchor text 2-5 words  |  8. internal links per page
  let internal = 0;
  for (const m of h.matchAll(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const href = m[1];
    const text = decode(m[2].replace(/<[^>]*>/g, ' ')).trim().replace(/\s+/g, ' ');
    const isInternal = href.startsWith('/') || href.startsWith('#') || href.includes('akshay.website');
    if (isInternal && !href.startsWith('#')) internal++;
    if (!text) continue;                       // icon-only links are checked via aria-label elsewhere
    const words = text.split(' ').length;
    if (words > LIMITS.anchorWordsMax)
      add(page, 'Anchor text', `${words} words — "${text.slice(0, 60)}…"`);
  }
  if (internal > LIMITS.internalLinksMax)
    add(page, 'Internal links', `${internal} internal links`);
}

// 5. image file size < 100 KB
const assets = [];
(function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(png|jpe?g|webp|gif|avif)$/i.test(e)) assets.push(p);
  }
})(DIST);
for (const a of assets) {
  const kb = statSync(a).size / 1024;
  if (kb > LIMITS.imageKbMax)
    add('(assets)', 'Image file size', `${kb.toFixed(0)} KB — ${relative(DIST, a).split(sep).join('/')}`);
}

// 11. robots.txt  |  12. sitemap
const robots = join(DIST, 'robots.txt');
if (existsSync(robots)) {
  const kb = statSync(robots).size / 1024;
  if (kb > LIMITS.robotsKbMax) add('/robots.txt', 'Robots.txt size', `${kb.toFixed(0)} KB`);
} else add('/robots.txt', 'Robots.txt', 'missing');

const sitemap = join(DIST, 'sitemap.xml');
if (existsSync(sitemap)) {
  const urls = (fs.readFileSync(sitemap, 'utf8').match(/<loc>/g) || []).length;
  if (urls > LIMITS.sitemapUrlMax) add('/sitemap.xml', 'Sitemap URLs', `${urls} URLs`);
  console.log(`sitemap: ${urls} URLs (limit ${LIMITS.sitemapUrlMax})`);
} else add('/sitemap.xml', 'Sitemap', 'missing');

// ---- report ----
console.log(`\npages scanned: ${htmlFiles.length}   image assets: ${assets.length}\n`);
if (!findings.length) {
  console.log('No violations.');
} else {
  const byRule = {};
  for (const f of findings) (byRule[f.rule] ||= []).push(f);
  for (const [rule, list] of Object.entries(byRule).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n### ${rule}  (${list.length})`);
    for (const f of list.slice(0, 14)) console.log(`   ${f.page.padEnd(16)} ${f.detail}`);
    if (list.length > 14) console.log(`   … ${list.length - 14} more`);
  }
}
console.log(`\nTOTAL: ${findings.length}`);
