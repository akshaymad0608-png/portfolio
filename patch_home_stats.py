import re

with open('pages/Home.tsx', 'r') as f:
    content = f.read()

# Add imports
imports = """import Stats from '../components/Stats';
import TechStack from '../components/TechStack';
"""

content = content.replace("import FAQ, { FAQ_DATA } from '../components/FAQ';", "import FAQ, { FAQ_DATA } from '../components/FAQ';\n" + imports)

# Insert components
# In pages/Home.tsx, render <Stats /> right after <Hero /> and <TechStack /> after the Services section.

content = content.replace("<Hero />", "<Hero />\n        <Stats />")
content = content.replace("<ServicesComponent />", "<ServicesComponent />\n        <TechStack />")

with open('pages/Home.tsx', 'w') as f:
    f.write(content)
