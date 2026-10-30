import React, { useRef } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface ScrubTextProps {
  text: string;
  className?: string;
}

const Word: React.FC<{ word: string; i: number; n: number; progress: MotionValue<number> }> = ({ word, i, n, progress }) => {
  const start = (i / n) * 0.8;
  const opacity = useTransform(progress, [start, start + 0.2], [0.35, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
};

/**
 * A paragraph that lights up word by word as it is scrolled into view, so
 * reading speed and scroll speed are tied together. Fully legible once the
 * visitor has scrolled past; plain text for reduced motion.
 */
const ScrubText: React.FC<ScrubTextProps> = ({ text, className = '' }) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'start 45%'] });

  if (reduced) return <p className={className}>{text}</p>;

  const words = text.split(' ');
  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} />
        ))}
      </span>
    </p>
  );
};

export default ScrubText;
