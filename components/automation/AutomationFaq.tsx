import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { AUTOMATION_FAQ } from '../../lib/automationPricing';

/**
 * Same accordion as components/FAQ.tsx, different questions. The answers here
 * are also emitted as FAQPage structured data by the page — which is only
 * legitimate because these exact strings are what a visitor reads, so the
 * markup and the page cannot disagree.
 */
const AutomationFaq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Before you ask"
          title="Questions about automation pricing"
          align="center"
          className="mb-14"
        />

        <div className="divide-y divide-[rgba(150,155,180,0.16)] border-y border-border">
          {AUTOMATION_FAQ.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `automation-faq-${i}`;
            return (
              <Reveal key={faq.q} delay={i * 0.04}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
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
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-14 text-[15.5px] leading-relaxed text-textSecondary">
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

export default AutomationFaq;
