import re

with open('components/Footer.tsx', 'r') as f:
    content = f.read()

# 1. Remove Github and Twitter links
# The block to remove is:
# <a href="#" className="w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all hover-target hover:-translate-y-1 group hover:border-[#333333]/50">
# ... svg ...
# </a>
# and similar for Twitter
content = re.sub(
    r'<a href="#" className="w-12 h-12[^"]*"[^>]*>\s*<svg[^>]*>.*?</svg>\s*</a>',
    '',
    content,
    flags=re.DOTALL
)

# 2. Update Newsletter text
content = content.replace(
    'Join 5,000+ subscribers. No spam.',
    'Get weekly AI automation tips. No spam.'
)

with open('components/Footer.tsx', 'w') as f:
    f.write(content)
