import re

with open('components/Footer.tsx', 'r') as f:
    content = f.read()

# Replace Github
content = content.replace(
    'text-textSecondary hover:text-primary hover:border-primary/50 transition-all hover-target hover:-translate-y-1">\n                   <Github size={20} />',
    'text-[#333333] hover:border-[#333333]/50 transition-all hover-target hover:-translate-y-1">\n                   <Github size={20} />'
)

# Replace Linkedin
content = content.replace(
    'text-textSecondary hover:text-primary hover:border-primary/50 transition-all hover-target hover:-translate-y-1">\n                   <Linkedin size={20} />',
    'text-[#0077b5] hover:border-[#0077b5]/50 transition-all hover-target hover:-translate-y-1">\n                   <Linkedin size={20} />'
)
# Add linkedin link
content = content.replace(
    '<a href="#" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#0077b5]',
    '<a href="https://linkedin.com/in/akshay-mahajan-95bb86187" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#0077b5]'
)

# Replace Twitter
content = content.replace(
    'text-textSecondary hover:text-primary hover:border-primary/50 transition-all hover-target hover:-translate-y-1">\n                   <Twitter size={20} />',
    'text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-all hover-target hover:-translate-y-1">\n                   <Twitter size={20} />'
)

# Replace Instagram
content = content.replace(
    'text-textSecondary hover:text-primary hover:border-primary/50 transition-all hover-target hover:-translate-y-1">\n                   <Instagram size={20} />',
    'text-[#E1306C] hover:border-[#E1306C]/50 transition-all hover-target hover:-translate-y-1">\n                   <Instagram size={20} />'
)

with open('components/Footer.tsx', 'w') as f:
    f.write(content)
