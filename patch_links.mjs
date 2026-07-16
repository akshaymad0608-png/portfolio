import fs from 'fs';

// Patch Hero.tsx
let hero = fs.readFileSync('components/Hero.tsx', 'utf8');
hero = hero.replace(
    'href="https://wa.me/917600885080?text=Hi%20Akshay,%20I\'d%20like%20to%20discuss%20a%20project"',
    'href="[YOUR_CALENDLY_OR_CAL.COM_URL]"'
);
fs.writeFileSync('components/Hero.tsx', hero);

// Patch FinalCTA.tsx
let cta = fs.readFileSync('components/FinalCTA.tsx', 'utf8');
cta = cta.replace(
    '<Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-[#16a34a] transition-all shadow-[0_4px_14px_0_rgba(34,197,94,0.39)]">\n              Book Free Consultation\n            </Link>',
    '<a href="[YOUR_CALENDLY_OR_CAL.COM_URL]" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-[#16a34a] transition-all shadow-[0_4px_14px_0_rgba(34,197,94,0.39)]">\n              Book Free Consultation\n            </a>'
);
fs.writeFileSync('components/FinalCTA.tsx', cta);
