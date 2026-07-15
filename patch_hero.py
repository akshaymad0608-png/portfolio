import re
with open('components/Hero.tsx', 'r') as f:
    content = f.read()
content = content.replace(
    'AI-powered automation <br className="hidden md:block" /> for work',
    'Mastering Gen AI & Automation <br className="hidden md:block" /> for the future of work'
)
with open('components/Hero.tsx', 'w') as f:
    f.write(content)
