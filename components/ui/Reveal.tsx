import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DUR, EASE_OUT } from '../../lib/motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/**
 * Scroll-triggered reveal.
 *
 * Content rises, settles from a slight zoom and fades up on a long
 * ease-out, so it lands rather than just appears. Only transform and opacity
 * move, which keeps it on the compositor (an earlier version also animated a
 * blur filter, which repaints and cost frames on long pages). Every section
 * and card on the site goes through this, so the whole page shares one rhythm.
 */
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 40, className = '', once = true }) => {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: DUR.slow, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
