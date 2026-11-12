const {chromium}=require('playwright');
const [w,N]=[+process.argv[2],+process.argv[3]];const FPS=30;const TL=require('./timeline.json');const total=Math.ceil(TL.total*FPS);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+process.cwd()+'/final.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
for(let f=w;f<total;f+=N){await p.evaluate(t=>render(t),f/FPS);await p.screenshot({path:`frames/f_${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:93});}
await b.close();console.log('worker',w,'done');})();
