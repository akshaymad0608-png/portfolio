#!/usr/bin/env node
/**
 * Submit sitemap URLs to IndexNow (Bing and other participating engines).
 *
 *   node scripts/indexnow-submit.mjs --dry-run          # list what would be sent
 *   node scripts/indexnow-submit.mjs                     # send everything in public/sitemap.xml
 *   node scripts/indexnow-submit.mjs --limit 50          # send only the first 50
 *   node scripts/indexnow-submit.mjs --sitemap https://akshay.website/sitemap.xml
 *
 * The key file must already be live at https://<host>/<key>.txt (see public/).
 * Only URLs listed in the sitemap are sent, so noindex pages are never submitted.
 * IndexNow is for new or changed URLs; do not run this on every deploy.
 */
import { readFileSync } from 'node:fs';

const HOST = 'akshay.website';
const KEY = '07403a20b76049babfcc0508fec11ec1';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH = 10000; // IndexNow accepts up to 10,000 URLs per request

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};

const dryRun = flag('--dry-run');
const limit = value('--limit') ? Number(value('--limit')) : Infinity;
const sitemap = value('--sitemap') ?? 'public/sitemap.xml';

async function loadXml(source) {
  if (/^https?:\/\//.test(source)) {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`Could not fetch ${source}: HTTP ${res.status}`);
    return res.text();
  }
  return readFileSync(source, 'utf8');
}

const xml = await loadXml(sitemap);
const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
  .map((m) => m[1].replace(/&amp;/g, '&'))
  .filter((u) => new URL(u).host === HOST)
  .slice(0, limit);

if (urls.length === 0) {
  console.error(`No ${HOST} URLs found in ${sitemap}`);
  process.exit(1);
}

console.log(`${urls.length} URL(s) from ${sitemap}`);
if (dryRun) {
  urls.slice(0, 10).forEach((u) => console.log('  ' + u));
  if (urls.length > 10) console.log(`  ... and ${urls.length - 10} more`);
  console.log('Dry run: nothing sent.');
  process.exit(0);
}

for (let i = 0; i < urls.length; i += BATCH) {
  const urlList = urls.slice(i, i + BATCH);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });
  // 200 = received, 202 = received and key validation pending
  console.log(`batch ${i / BATCH + 1}: ${urlList.length} URLs -> HTTP ${res.status}`);
  if (res.status !== 200 && res.status !== 202) {
    console.error(await res.text());
    process.exit(1);
  }
}
