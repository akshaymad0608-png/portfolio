import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

export const FAQ_DATA = [
  {
    q: 'How long does a project take?',
    a: "Most automations and MVP builds land in two to four weeks, depending on how many systems have to talk to each other. You get a firm timeline after the scoping call, before any money moves.",
  },
  {
    q: 'What does it cost?',
    a: "Pricing is per project, not per hour. A single workflow or script starts around $1,500. Agents, chatbots and full builds get quoted once I know the scope. You'll always see the number before we start.",
  },
  {
    q: 'Do I have to switch tools?',
    a: "No. Most of what I build sits between the tools you already use — Sheets, Slack, Notion, HubSpot, WhatsApp, your CRM — so nothing on your team's side changes.",
  },
  {
    q: 'Where does my data go?',
    a: "API keys are encrypted and stored separately from the code. If your data can't leave your environment, I'll deploy into your own cloud account instead of mine.",
  },
  {
    q: 'What happens after handover?',
    a: 'Every project ships with 30 days of bug fixes included, plus written documentation of how the thing works. Ongoing tuning and scaling is available on a retainer if you want it.',
  },
  {
    q: 'What if the automation breaks?',
    a: "Flows are built with error branches and alerts, so you hear about a failure before your customer does. Within the warranty window I fix it; after that it's covered by the retainer.",
  },
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Before you ask"
          title="The six questions I always get"
          align="center"
          className="mb-14"
        />

        <div className="divide-y divide-[rgba(150,155,180,0.16)] border-y border-border">
          {FAQ_DATA.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.04}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`font-display text-lg font-bold transition-colors md:text-xl ${
                        isOpen ? 'text-wire' : 'text-text'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-textSecondary"
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 text-[15.5px] leading-relaxed text-textSecondary">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
