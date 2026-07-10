const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const videoHTML = await page.evaluate(() => document.querySelector('video')?.outerHTML);
  console.log(videoHTML);
  await browser.close();
})();
