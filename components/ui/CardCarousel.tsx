import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CardCarouselProps {
  children: React.ReactNode;
  /** Names the group for assistive tech, e.g. "Projects". */
  label: string;
  /** Grid classes used instead of the carousel when the visitor asks for reduced motion. */
  fallbackClassName?: string;
}

const GAP = 20;
const AUTOPLAY_MS = 3200;

/**
 * Cards slide left on a timer. The one that leaves tips over and sinks behind
 * the next, so the row reads as a stack being dealt rather than a belt. Pauses
 * under the pointer or keyboard focus and only runs while in view;
 * reduced-motion visitors get a plain grid instead.
 */
const CardCarousel: React.FC<CardCarouselProps> = ({
  children,
  label,
  fallbackClassName = 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
}) => {
  const reduced = useReducedMotion();
  const cards = React.Children.toArray(children);
  const viewport = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLLIElement>(null);
  const inView = useInView(viewport, { margin: '-80px' });
  const [step, setStep] = useState(0);
  const [maxIndex, setMaxIndex] = useState(cards.length - 1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !first.current) return;
      const s = first.current.offsetWidth + GAP;
      setStep(s);
      const fit = Math.max(1, Math.floor((viewport.current.offsetWidth + GAP) / s));
      setMaxIndex(Math.max(0, cards.length - fit));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [cards.length, reduced]);

  useEffect(() => setIndex((i) => Math.min(i, maxIndex)), [maxIndex]);

  const next = useCallback(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), [maxIndex]);
  const prev = useCallback(() => setIndex((i) => (i <= 0 ? maxIndex : i - 1)), [maxIndex]);

  useEffect(() => {
    if (reduced || paused || !inView || maxIndex === 0) return;
    const t = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [reduced, paused, inView, maxIndex, next]);

  if (reduced) {
    return (
      <div className={fallbackClassName}>
        {cards.map((c, i) => (
          <div key={i}>{c}</div>
        ))}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div ref={viewport} className="-my-6 overflow-hidden py-6">
        <motion.ul
          className="flex list-none p-0"
          style={{ gap: GAP }}
          animate={{ x: -index * step }}
          transition={{ type: 'spring', stiffness: 140, damping: 24, mass: 0.9 }}
        >
          {cards.map((c, i) => {
            const gone = i < index;
            return (
              <motion.li
                key={i}
                ref={i === 0 ? first : undefined}
                className="w-[78vw] max-w-[360px] shrink-0 sm:w-[340px]"
                style={{ transformOrigin: '0% 100%' }}
                animate={{
                  rotate: gone ? -9 : 0,
                  scale: gone ? 0.94 : 1,
                  y: gone ? 10 : 0,
                  opacity: gone ? 0.55 : 1,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              >
                {c}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      {maxIndex > 0 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label={`Previous ${label.toLowerCase()}`}
            className="flex h-10 w-10 items-center justify-center border border-border text-textSecondary transition-colors hover:border-wire hover:text-wire"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex gap-2" aria-hidden="true">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <span
                key={i}
                className={`h-1.5 transition-all duration-300 ${i === index ? 'w-6 bg-wire' : 'w-1.5 bg-border'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label={`Next ${label.toLowerCase()}`}
            className="flex h-10 w-10 items-center justify-center border border-border text-textSecondary transition-colors hover:border-wire hover:text-wire"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardCarousel;
