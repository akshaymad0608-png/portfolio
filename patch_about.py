import re
with open('components/About.tsx', 'r') as f:
    content = f.read()
content = content.replace(
    'AI Engineer & Automation Architect',
    'Gen AI Expert & Automation Architect'
)
with open('components/About.tsx', 'w') as f:
    f.write(content)
