import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Route change, cut rather than dissolved.
 *
 * The previous transition blurred and scaled the whole page, which is the
 * opposite of what the rest of the design says — nothing here is soft-focus or
 * elastic. This moves the page a few pixels and clears it quickly, so
 * navigation feels like a cut between frames instead of a cross-fade.
 */
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduced = useReducedMotion();

  if (reduced) return <div className="w-full">{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="w-full origin-top"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
