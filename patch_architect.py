import re

def update_file(filename):
    with open(filename, 'r') as f:
        content = f.read()
    content = content.replace(
        'AI Engineer & Automation Architect',
        'Gen AI Expert & Automation Architect'
    )
    with open(filename, 'w') as f:
        f.write(content)

update_file('components/Experience.tsx')
update_file('components/Contact.tsx')
