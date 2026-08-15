import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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
 * Short travel and a fast out-ease: content arrives and stops. The earlier
 * 0.7s settle read as languid next to a layout made of hard rules, so this is
 * quicker and lands with less drift.
 */
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 16, className = '', once = true }) => {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-70px' }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
