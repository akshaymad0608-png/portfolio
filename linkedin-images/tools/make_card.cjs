// usage: node make_card.cjs '<json>' out.png
// json: {kicker, title, items:[...], note, source, numbered}
const { chromium } = require('playwright');
const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
(async () => {
  const d = JSON.parse(process.argv[2]); const out = process.argv[3];
  const n = (d.items||[]).length;
  const titleLen = (d.title||'').length;
  const tSize = titleLen > 70 ? 64 : titleLen > 45 ? 76 : 88;
  const items = (d.items||[]).map((t,i)=>`<div class="it"><span class="n">${d.numbered===false?'':i+1}</span><p>${esc(t)}</p></div>`).join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;font-family:'Inter',sans-serif;background:#FFFFFF;color:#111827;position:relative;overflow:hidden}
.bar{position:absolute;left:0;top:0;width:100%;height:18px;background:#0A66C2}
.wrap{position:relative;padding:92px 84px 70px;height:100%;display:flex;flex-direction:column}
.k{align-self:flex-start;background:#E8F1FB;color:#0A66C2;font-weight:800;font-size:32px;letter-spacing:2px;padding:12px 26px;border-radius:12px}
h1{margin-top:40px;font-size:${tSize}px;line-height:1.12;font-weight:800;letter-spacing:-1px;color:#111827}
.list{margin-top:50px;display:flex;flex-direction:column;gap:${n>3?20:26}px}
.it{display:flex;gap:26px;align-items:flex-start;background:#F3F6F8;border-left:8px solid #0A66C2;border-radius:16px;padding:${n>3?24:30}px 30px}
.n{flex:none;min-width:52px;height:52px;border-radius:50%;background:#0A66C2;color:#fff;font-weight:800;font-size:28px;display:${d.numbered===false?'none':'flex'};align-items:center;justify-content:center;margin-top:2px}
.it p{font-size:${n>3?34:38}px;line-height:1.3;font-weight:500;color:#1F2937}
.note{margin-top:auto;font-size:30px;color:#4B5563;line-height:1.35;padding-top:28px}
.ft{margin-top:26px;display:flex;justify-content:space-between;align-items:center;border-top:3px solid #D1D5DB;padding-top:26px;font-size:32px;font-weight:700;color:#374151}
.ft span:last-child{color:#0A66C2}
</style></head><body><div class="bar"></div><div class="wrap">
<div class="k">${esc(d.kicker||'AI TIPS')}</div>
<h1>${esc(d.title)}</h1>
<div class="list">${items}</div>
<div class="note">${esc(d.note||'')}</div>
<div class="ft"><span>${d.source?('Source: '+esc(d.source)):'AI tips and news'}</span><span>akshay.website</span></div>
</div></body></html>`;
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1080,height:1350}});
  await p.setContent(html); await p.evaluate(()=>document.fonts.ready);
  await p.screenshot({path: out, type:'png'}); await b.close();
})();
