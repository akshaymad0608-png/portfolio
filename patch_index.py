import re

with open('index.html', 'r') as f:
    content = f.read()

tag = """<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y47704N52H"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-Y47704N52H');
    </script>"""

content = content.replace('<head>', tag, 1)

with open('index.html', 'w') as f:
    f.write(content)
