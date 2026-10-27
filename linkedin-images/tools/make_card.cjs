// usage: node make_card.cjs '<json>' out.png
// json: {kicker, title, items:[...], note, source}
const { chromium } = require('playwright');
const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
(async () => {
  const d = JSON.parse(process.argv[2]); const out = process.argv[3];
  const n = (d.items||[]).length;
  const titleLen = (d.title||'').length;
  const tSize = titleLen > 70 ? 66 : titleLen > 45 ? 78 : 92;
  const items = (d.items||[]).map((t,i)=>`<div class="it"><span class="n">${d.numbered===false?'●':i+1}</span><p>${esc(t)}</p></div>`).join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;font-family:'Inter',sans-serif;background:#0B1020;color:#fff;position:relative;overflow:hidden}
.bg1{position:absolute;right:-200px;top:-200px;width:700px;height:700px;border-radius:50%;background:#1E2A5A}
.bg2{position:absolute;left:-160px;bottom:-160px;width:520px;height:520px;border-radius:50%;background:#14305A}
.wrap{position:relative;padding:84px 80px 70px;height:100%;display:flex;flex-direction:column}
.k{display:inline-block;align-self:flex-start;background:#FFD23F;color:#0B1020;font-weight:900;font-size:34px;letter-spacing:3px;padding:12px 28px;border-radius:14px}
h1{margin-top:44px;font-size:${tSize}px;line-height:1.1;font-weight:900;letter-spacing:-1px}
h1 em{font-style:normal;color:#FFD23F}
.list{margin-top:48px;display:flex;flex-direction:column;gap:${n>3?22:28}px}
.it{display:flex;gap:26px;align-items:flex-start;background:rgba(255,255,255,.07);border-radius:22px;padding:${n>3?24:30}px 30px}
.n{flex:none;width:58px;height:58px;border-radius:50%;background:#2DD4BF;color:#0B1020;font-weight:900;font-size:30px;display:flex;align-items:center;justify-content:center;margin-top:2px}
.it p{font-size:${n>3?34:38}px;line-height:1.28;font-weight:600}
.note{margin-top:auto;font-size:30px;color:#B8C2E0;line-height:1.35;padding-top:28px}
.ft{margin-top:26px;display:flex;justify-content:space-between;align-items:center;border-top:3px solid #2A3566;padding-top:26px;font-size:34px;font-weight:800}
.ft span:last-child{color:#2DD4BF}
</style></head><body><div class="bg1"></div><div class="bg2"></div><div class="wrap">
<div class="k">${esc(d.kicker||'AI TIPS')}</div>
<h1>${esc(d.title)}</h1>
<div class="list">${items}</div>
<div class="note">${esc(d.note||'')}</div>
<div class="ft"><span>${d.source?('Source: '+esc(d.source)):'AI tips aur news, Hindi mein'}</span><span>akshay.website</span></div>
</div></body></html>`;
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1080,height:1350}});
  await p.setContent(html); await p.evaluate(()=>document.fonts.ready);
  await p.screenshot({path: out, type:'png'}); await b.close();
})();
