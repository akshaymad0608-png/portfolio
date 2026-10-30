import React from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/** A hairline across the top of the viewport that fills as the page is read. */
const ScrollProgress: React.FC = () => {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-wire"
    />
  );
};

export default ScrollProgress;
