import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RuleProps {
  className?: string;
  delay?: number;
  /** Accent rules mark a section start; plain ones just divide. */
  accent?: boolean;
}

/**
 * A hairline that draws itself across when it scrolls in.
 *
 * The layout is built out of 1px rules rather than shadows or filled cards, so
 * the rules are the thing worth animating — drawing one is the page assembling
 * its own structure. Everything else can stay still.
 */
const Rule: React.FC<RuleProps> = ({ className = '', delay = 0, accent = false }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`h-px w-full origin-left ${accent ? 'bg-wire' : 'bg-border'} ${className}`}
      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduced ? 0 : 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
};

export default Rule;
