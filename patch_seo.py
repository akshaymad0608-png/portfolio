import re

with open('components/SEO.tsx', 'r') as f:
    content = f.read()

content = content.replace('schema?: Record<string, any>;', 'schema?: Record<string, any> | Record<string, any>[];')

with open('components/SEO.tsx', 'w') as f:
    f.write(content)
