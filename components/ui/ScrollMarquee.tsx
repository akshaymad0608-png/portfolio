import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

interface ScrollMarqueeProps {
  words: string[];
  /** Base drift in percent of one loop per second. Negative runs right. */
  speed?: number;
  className?: string;
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Oversized display type that drifts on its own and is shoved along by the
 * scroll: it speeds up the faster the page moves and turns round when the
 * visitor scrolls back up. Decoration only, so it is hidden from assistive
 * tech and stands still for reduced-motion visitors.
 */
const ScrollMarquee: React.FC<ScrollMarqueeProps> = ({ words, speed = -4, className = '' }) => {
  const reduced = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-6, 0, 6], { clamp: true });
  const direction = useRef(speed < 0 ? -1 : 1);
  const x = useTransform(base, (v) => `${v}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const b = boost.get();
    if (b < -0.2) direction.current = speed < 0 ? 1 : -1;
    else if (b > 0.2) direction.current = speed < 0 ? -1 : 1;
    const step = Math.abs(speed) * (delta / 1000) * (1 + Math.abs(b));
    base.set(wrap(-50, 0, base.get() + direction.current * step));
  });

  const row = [...words, ...words];

  return (
    <div
      aria-hidden="true"
      className={`select-none overflow-hidden border-y border-border bg-section py-6 md:py-8 ${className}`}
    >
      <motion.div style={{ x }} className="flex w-max items-center gap-8 whitespace-nowrap md:gap-12">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8 md:gap-12">
            {row.map((w, i) => (
              <React.Fragment key={`${copy}-${i}`}>
                <span className="font-display text-[56px] font-black uppercase leading-none tracking-tightest text-text md:text-[104px]">
                  {w}
                </span>
                <span className="text-[28px] leading-none text-wire md:text-[44px]">&#10022;</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollMarquee;
