import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const FAQ_DATA = [
  {
    q: "How long does a typical automation project take?",
    a: "Most custom automation projects and MVP builds take between 2 to 4 weeks depending on the complexity of the workflow, integrations required, and data sources. We begin with a scoping call to give you a precise timeline."
  },
  {
    q: "How much do your services cost?",
    a: "Pricing is project-based. Small automation scripts and simple workflow setups typically start at around $1,500. Comprehensive AI agents, custom chatbots, and full-stack solutions require custom quoting based on your specific needs."
  },
  {
    q: "Which tools and platforms do you work with?",
    a: "I specialize in modern AI and automation stacks: n8n, Zapier, Make for workflows; OpenAI, Anthropic (Claude), and Google Gemini for LLMs; and React/Next.js/Node.js for custom web solutions."
  },
  {
    q: "Is my data safe when you build automations?",
    a: "Absolutely. We follow strict security practices. API keys are encrypted and stored securely. For sensitive information, we can deploy solutions directly onto your own cloud infrastructure (AWS, GCP, Azure) so data never leaves your environment."
  },
  {
    q: "Do you offer support after the project is delivered?",
    a: "Yes. Every project includes a standard 30-day warranty for bug fixes. Extended retainer agreements are available for ongoing maintenance, prompt optimization, and workflow scaling."
  },
  {
    q: "Can you work with my existing tools/stack?",
    a: "Yes! Most automations are built specifically to bridge the gap between tools you already use (like Salesforce, HubSpot, Slack, Notion, and Google Workspace) without disrupting your current processes."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 max-w-[1000px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 inline-block">
            Questions & Answers
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto">
            Everything you need to know about working together, from timelines to tools and data privacy.
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border border-border"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-bold text-text font-display pr-8">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-textSecondary"
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0 text-textSecondary leading-relaxed text-base">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
