import re

with open('components/Hero.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'className="relative flex flex-col items-center min-h-[100vh] bg-background overflow-hidden pb-20 pt-32 lg:pt-40"',
    'className="relative flex flex-col items-center min-h-[100vh] bg-background overflow-hidden pb-20 pt-40 lg:pt-48"'
)

with open('components/Hero.tsx', 'w') as f:
    f.write(content)
