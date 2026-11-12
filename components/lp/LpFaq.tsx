import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircle, Plus } from 'lucide-react';
import { FAQ_DATA } from '../FAQ';
import { Btn, Pill, Reveal, WHATSAPP } from './ui';

const LpFaq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Reveal>
            <Pill icon={<HelpCircle size={13} aria-hidden="true" />}>FAQ</Pill>
            <h2 className="mt-5 font-lp text-[40px] font-normal leading-[1.04] tracking-[-0.02em] text-lp-ink sm:text-[52px]">
              Questions people ask before booking.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-9 rounded-[22px] border border-lp-line bg-lp-bg p-6">
              <img src="/akshay-avatar-96.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
              <p className="mt-4 text-[17px] font-semibold text-lp-ink">Something else on your mind?</p>
              <p className="mt-1 text-[14.5px] leading-[1.6] text-lp-body">
                Ask me on WhatsApp. No pitch, no pressure, and I reply within a working day.
              </p>
              <Btn href={WHATSAPP} arrow className="mt-5 !px-5 !py-2.5 !text-[14px]">Message me</Btn>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="rounded-[24px] border border-lp-line bg-lp-bg p-2.5">
            {FAQ_DATA.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className={`rounded-2xl transition-colors ${isOpen ? 'bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`lp-faq-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-[16px] font-semibold text-lp-ink">{f.q}</span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                          isOpen ? 'rotate-45 bg-lp-blue text-white' : 'bg-white text-lp-body'
                        }`}
                      >
                        <Plus size={15} aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`lp-faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-[15px] leading-[1.7] text-lp-body">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LpFaq;
