import fs from 'fs';

const url = 'https://calendly.com/akshaymad0608';

const files = ['pages/Contact.tsx', 'components/Hero.tsx', 'components/FinalCTA.tsx'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\[YOUR_CALENDLY_OR_CAL\.COM_URL\]/g, url);
  fs.writeFileSync(file, content);
}
