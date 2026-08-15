import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import RevealText from './RevealText';

interface PageHeroProps {
  eyebrow: string;
  /** Plain strings get the per-word rise; nodes are rendered as given. */
  title: React.ReactNode;
  lead?: string;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, lead, children }) => {
  const reduced = useReducedMotion();

  return (
    <header className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
      <div className="absolute inset-0 blueprint blueprint-fade pointer-events-none" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-shell px-6">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            {/* The rule draws out from the left, then the label arrives on it. */}
            <motion.span
              className="h-px w-8 origin-left bg-wire"
              initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="eyebrow"
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              {eyebrow}
            </motion.span>
          </div>

          <h1 className="font-display text-[38px] font-bold leading-[1.04] tracking-tightest text-text md:text-[56px]">
            {typeof title === 'string' ? <RevealText onMount delay={0.1}>{title}</RevealText> : title}
          </h1>

          {lead && (
            <Reveal delay={0.22}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-textSecondary">{lead}</p>
            </Reveal>
          )}
          {children && <Reveal delay={0.3}><div className="mt-8">{children}</div></Reveal>}
        </div>
      </div>
    </header>
  );
};

export default PageHero;
