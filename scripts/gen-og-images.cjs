#!/usr/bin/env node
/**
 * Renders one 1200x630 Open Graph image per route in site.routes.json into
 * public/og/. Run by hand when a page is added or its heading changes; it is
 * not part of `npm run build`, so the build needs no browser.
 *
 *   npm i -g playwright   (or any install that `require('playwright')` can find)
 *   node scripts/gen-og-images.cjs
 *
 * Then add "ogImage": "/og/<slug>.jpg" to the route (the slug is the path with
 * slashes turned into dashes; "/" is "home").
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'site.routes.json'), 'utf8'));
const font = (f) => 'file://' + path.join(root, 'public/fonts', f);
// Embedded as a data URI: a page set with setContent() may not load file:// images.
const avatar = 'data:image/webp;base64,' + fs.readFileSync(path.join(root, 'public/akshay-avatar-256.webp')).toString('base64');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const slugOf = (p) => (p === '/' ? 'home' : p.slice(1).replace(/\//g, '-'));
const textOf = (r) => (r.heading || r.title.split('|')[0]).trim();

const page = (title) => {
  const size = title.length <= 42 ? 92 : title.length <= 70 ? 76 : 62;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:IS;src:url(${font('instrument-serif-latin-400-normal.woff2')})}
@font-face{font-family:IN;font-weight:700;src:url(${font('inter-latin-567244.woff2')})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#F4F7FD;font-family:IN,Arial,sans-serif;color:#0B1220;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(15,23,42,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(15,23,42,.05) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:radial-gradient(ellipse at 20% 0%,#000 20%,transparent 75%)}
.glow{position:absolute;right:-160px;top:-200px;width:700px;height:700px;border-radius:50%;background:rgba(31,91,255,.12);filter:blur(80px)}
.bar{position:absolute;left:0;top:0;bottom:0;width:14px;background:#1F5BFF}
.pill{position:absolute;left:80px;top:64px;border:1px solid #E2E8F4;background:#fff;border-radius:99px;padding:10px 22px;font-size:24px;font-weight:700;color:#1F5BFF}
h1{position:absolute;left:80px;right:90px;top:140px;font-family:IS,Georgia,serif;font-weight:400;font-size:${size}px;line-height:1.04;letter-spacing:-.02em}
.me{position:absolute;left:80px;bottom:56px;display:flex;align-items:center;gap:20px}
.me img{width:68px;height:68px;border-radius:50%}
.me b{display:block;font-size:26px}.me span{font-size:21px;color:#5A6478;font-weight:700}
</style></head><body><div class="grid"></div><div class="glow"></div><div class="bar"></div>
<div class="pill">akshay.website</div><h1>${esc(title)}</h1>
<div class="me"><img src="${avatar}"><div><b>Akshay Mahajan</b><span>Full-stack &amp; AI web developer · Surat, India</span></div></div></body></html>`;
};

(async () => {
  fs.mkdirSync(path.join(root, 'public/og'), { recursive: true });
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage();
  for (const r of manifest.routes) {
    await p.setContent(page(textOf(r)));
    await p.evaluate(() => document.fonts.ready);
    const out = path.join(root, 'public/og', slugOf(r.path) + '.jpg');
    await p.screenshot({ path: out, type: 'jpeg', quality: 80 });
    console.log(r.path.padEnd(52), Math.round(fs.statSync(out).size / 1024) + ' KB');
  }
  await b.close();
})();
