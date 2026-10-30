/**
 * One set of motion tokens for the site, so every animation shares a rhythm
 * (ui-ux-pro-max: motion-consistency, duration-timing, exit-faster-than-enter).
 *
 * Enter is long enough to read as arrival; exit is about 60-70% of it so the
 * interface feels responsive when the visitor acts.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;   // arrivals: fast start, soft landing
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const; // shutters and other cover moves

export const DUR = {
  fast: 0.2,   // small state changes
  base: 0.6,   // content arriving
  slow: 0.9,   // the page-level move
  exit: 0.3,   // anything leaving: shorter than its entrance
} as const;

/** Gap between items of a staggered group. */
export const STAGGER = 0.06;
