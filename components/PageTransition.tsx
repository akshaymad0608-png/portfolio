import React from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { DUR, EASE_IN_OUT, EASE_OUT } from '../lib/motion';

/**
 * Cinematic cut between routes.
 *
 * Two black shutters close over the screen from the top and bottom, hold on
 * the wordmark for a beat, then part again on the new page — the same move
 * that opens the site on first load, because the page you land on mounts with
 * the shutters shut. They are portalled to <body> so no transformed ancestor
 * can shrink them, and sit above the nav so the whole frame goes dark.
 *
 * Reduced-motion visitors get the plain page and no shutters.
 */
const EASE = EASE_IN_OUT;

const Shutters: React.FC = () =>
  createPortal(
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-text"
        initial={{ y: '0%' }}
        animate={{ y: '-101%', transition: { duration: 0.6, delay: 0.15, ease: EASE } }}
        exit={{ y: '0%', transition: { duration: 0.35, ease: EASE } }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-text"
        initial={{ y: '0%' }}
        animate={{ y: '101%', transition: { duration: 0.6, delay: 0.15, ease: EASE } }}
        exit={{ y: '0%', transition: { duration: 0.35, ease: EASE } }}
      />
      {/* the seam, drawn out across the middle as the shutters part */}
      <motion.span
        className="absolute inset-x-0 top-1/2 h-px origin-center bg-wire"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0, transition: { scaleX: { duration: 0.3, ease: EASE }, opacity: { duration: 0.25, delay: 0.15 } } }}
        exit={{ scaleX: 1, opacity: 1, transition: { duration: 0.25, delay: 0.05, ease: EASE } }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, transition: { duration: 0.2, delay: 0.05 } }}
        exit={{ opacity: 1, transition: { duration: 0.2, delay: 0.1 } }}
      >
        <span className="font-display text-2xl font-bold tracking-tightest text-white md:text-4xl">
          akshay<span className="font-mono text-[0.55em] font-normal text-wireDim">.website</span>
        </span>
      </motion.div>
    </div>,
    document.body,
  );

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduced = useReducedMotion();

  if (reduced) return <div className="w-full">{children}</div>;

  return (
    <>
      <Shutters />
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: DUR.base, delay: 0.2, ease: EASE_OUT } }}
        exit={{ opacity: 0, transition: { duration: DUR.exit } }}
        className="w-full origin-top"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
