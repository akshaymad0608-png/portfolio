import re

with open('pages/Home.tsx', 'r') as f:
    content = f.read()

# Add import
import_statement = "import FAQ, { FAQ_DATA } from '../components/FAQ';\n"
content = content.replace("import PageTransition from '../components/PageTransition';", "import PageTransition from '../components/PageTransition';\n" + import_statement)

# Create schema
schema_code = """
  const defaultPersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Akshay Mahajan",
    "url": "https://akshay.website",
    "jobTitle": "AI Engineer & Founder",
    "sameAs": [
      "https://github.com/akshay",
      "https://linkedin.com/in/akshay"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };
"""

content = content.replace("const Home: React.FC = () => {", "const Home: React.FC = () => {" + schema_code)

content = content.replace("<SEO ", "<SEO \n          schema={[defaultPersonSchema, faqSchema]}\n")

content = content.replace("<FinalCTA />", "<FAQ />\n        <FinalCTA />")

with open('pages/Home.tsx', 'w') as f:
    f.write(content)
