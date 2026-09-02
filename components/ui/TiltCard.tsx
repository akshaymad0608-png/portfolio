import React, { useEffect, useRef } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  max?: number;
}

/**
 * Subtle pointer-follow tilt.
 *
 * Two things were wrong with the first version, and both were visible.
 *
 * It carried `transition-transform duration-300` while it tracked. Every
 * mousemove wrote a new angle and the browser eased toward it over 300ms, so
 * the card was always a third of a second behind the cursor and never caught
 * up — measured mid-sweep, the inline transform read -4.33deg while the
 * rendered one was still flat. A tilt that lags the pointer reads as a slow
 * page, not as depth. The easing belongs on the way back to flat, where there
 * is no pointer to keep up with.
 *
 * And its own comment claimed it was disabled on touch, which it was not: a tap
 * on a phone emits one synthetic mousemove, no mouseleave ever follows, and the
 * card stayed tilted for as long as the page was open. Verified at 375px, where
 * `(hover: hover)` is false and maxTouchPoints is 5. Pointer capability is now
 * actually checked, so a phone gets a flat card, which is the right answer.
 */
const SETTLE_MS = 300;

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', max = 6 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<number | undefined>(undefined);

  /** A mouse, and someone who has not asked for less movement. */
  const canTilt = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !canTilt()) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;

    // No transition while following: the angle should land on the frame it is
    // set, not ease toward a target the cursor has already left.
    window.clearTimeout(settleTimer.current);
    el.style.transition = 'none';
    el.style.willChange = 'transform';
    el.style.transform =
      `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el || !el.style.transform) return;

    // Here the easing earns its keep — nothing is chasing the pointer any more.
    el.style.transition = `transform ${SETTLE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    el.style.transform = '';

    // Drop the compositor layer once it has flattened. transitionend is not
    // reliable here: setting the transition and clearing the transform in the
    // same tick can resolve without a transition at all, and then the event
    // never arrives and will-change stays on for the life of the page.
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      if (ref.current) ref.current.style.willChange = '';
    }, SETTLE_MS + 50);
  };

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </div>
  );
};

export default TiltCard;
