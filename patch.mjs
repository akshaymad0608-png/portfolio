import fs from 'fs';

// Patch Footer.tsx
let footer = fs.readFileSync('components/Footer.tsx', 'utf8');

footer = footer.replace(
    /<a href="#" className="w-12 h-12[^>]*>\s*<svg[^>]*>.*?<\/svg>\s*<\/a>/gs,
    ''
);

footer = footer.replace(
    'Join 5,000+ subscribers. No spam.',
    'Get weekly AI automation tips. No spam.'
);

// Remove the import of Github and Twitter from lucide-react if present
footer = footer.replace(
    /import \{\s*Github,\s*/,
    'import { '
);
footer = footer.replace(
    /,\s*Twitter\s*/,
    ''
);

fs.writeFileSync('components/Footer.tsx', footer);


// Patch Hero.tsx
let hero = fs.readFileSync('components/Hero.tsx', 'utf8');

hero = hero.replace(
    'className="relative flex flex-col items-center min-h-[100vh] bg-background overflow-hidden pb-20 pt-32 lg:pt-40"',
    'className="relative flex flex-col items-center min-h-[100vh] bg-background overflow-hidden pb-20 pt-40 lg:pt-48"'
);

fs.writeFileSync('components/Hero.tsx', hero);
