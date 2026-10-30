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
 * Scroll-triggered reveal, cut like a film frame coming into focus.
 *
 * Content rises a good distance, settles from a slight zoom and pulls out of a
 * soft blur on a long expo-out ease, so it lands rather than just appears.
 * Every section and card on the site goes through this, so the whole page
 * shares one rhythm. The blur is small and short-lived to keep it cheap.
 */
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 56, className = '', once = true }) => {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.97, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
