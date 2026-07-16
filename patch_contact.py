import re

with open('pages/Contact.tsx', 'r') as f:
    content = f.read()

# Replace state and handleSubmit
state_and_submit = """  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    service: '',
    budget: '',
    details: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://formspree.io/f/[YOUR_FORM_ID]', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          setSubmitError(data["errors"].map((error: any) => error["message"]).join(", "));
        } else {
          setSubmitError("Oops! There was a problem submitting your form");
        }
      }
    } catch (error) {
      setSubmitError("Oops! There was a problem submitting your form");
    } finally {
      setIsSubmitting(false);
    }
  };"""

content = re.sub(
    r'const \[isSubmitting, setIsSubmitting\] = useState\(false\);.*?setTimeout\(\(\) => setIsSubmitting\(false\), 2000\); // Simulate send\s*};',
    state_and_submit,
    content,
    flags=re.DOTALL
)

# Add name, value, onChange to inputs
content = content.replace(
    '<input \n                      type="text" \n                      required',
    '<input \n                      type="text" \n                      name="name"\n                      value={formData.name}\n                      onChange={handleChange}\n                      required'
)

content = content.replace(
    '<input \n                      type="email" \n                      required',
    '<input \n                      type="email" \n                      name="email"\n                      value={formData.email}\n                      onChange={handleChange}\n                      required'
)

content = content.replace(
    '<input \n                      type="tel" \n                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"\n                      placeholder="+1 234 567 8900"\n                    />',
    '<input \n                      type="tel" \n                      name="whatsapp"\n                      value={formData.whatsapp}\n                      onChange={handleChange}\n                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"\n                      placeholder="+1 234 567 8900"\n                    />'
)

content = content.replace(
    '<select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">',
    '<select name="service" value={formData.service} onChange={handleChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">'
)

content = content.replace(
    '<select name="service"',
    '<!TEMP_SELECT!>'
)

content = content.replace(
    '<select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">',
    '<select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">'
)

content = content.replace(
    '<!TEMP_SELECT!>',
    '<select name="service"'
)


content = content.replace(
    '<textarea \n                    rows={4}\n                    required',
    '<textarea \n                    name="details"\n                    value={formData.details}\n                    onChange={handleChange}\n                    rows={4}\n                    required'
)

# Handle success/error state UI
success_ui = """            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {submitSuccess ? (
                <div className="bg-cards border border-success rounded-2xl p-8 flex flex-col items-center text-center shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success mb-4">
                    <MessageSquare size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">Thanks!</h3>
                  <p className="text-textSecondary">I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-cards border border-border rounded-2xl p-8 flex flex-col gap-6 shadow-xl">
                  {submitError && (
                    <div className="bg-accent/10 border border-accent rounded-xl p-4 text-accent text-sm text-center">
                      {submitError}
                    </div>
                  )}"""

content = content.replace(
    """            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="bg-cards border border-border rounded-2xl p-8 flex flex-col gap-6 shadow-xl">""",
    success_ui
)

content = content.replace(
    """                </button>
              </form>
            </motion.div>""",
    """                </button>
              </form>
              )}
            </motion.div>"""
)

# Replace calendly link
content = content.replace('href="https://calendly.com"', 'href="[YOUR_CALENDLY_OR_CAL.COM_URL]"')

with open('pages/Contact.tsx', 'w') as f:
    f.write(content)

