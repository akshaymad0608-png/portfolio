import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  /** Rendered element. Headings should pass their own tag so outline stays intact. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /**
   * Play on mount instead of waiting to be scrolled into view. Anything above
   * the fold should set this: it is already visible when the page loads, so
   * hanging its first paint on an intersection callback only risks the words
   * sitting hidden if that callback is slow or never arrives.
   */
  onMount?: boolean;
}

/**
 * Type that rises out of its own line box.
 *
 * Each word sits inside an overflow-hidden wrapper, so it is clipped by the
 * line rather than fading in over the page — the letters appear to be pushed up
 * from behind the rule beneath them. Words carry a small stagger, which reads
 * as the sentence being set rather than every glyph arriving at once.
 *
 * Splitting on spaces keeps normal wrapping: each word is still an inline-block
 * the browser can break after, so long headings reflow exactly as plain text.
 */
const RevealText: React.FC<RevealTextProps> = ({
  children, className = '', delay = 0, as = 'span', onMount = false,
}) => {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.span;
  const words = children.split(' ');

  if (reduced) {
    const Plain = as as React.ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      {...(onMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-60px' } })}
      /* The stagger has to live in the parent's own variant. Without `variants`
         here Framer never propagates "hidden"/"show" down, and every word stays
         parked below its clip box. */
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.035, delayChildren: delay } },
      }}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          /* The clipping box. pb/-mb gives descenders room so g and y aren't shaved. */
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              show: { y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
};

export default RevealText;
