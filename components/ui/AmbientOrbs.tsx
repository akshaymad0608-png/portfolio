import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Soft green light that drifts behind a section and leans a little toward the
 * pointer, so the background reads as a lit space rather than a flat wall.
 * Decoration only: pointer-transparent, hidden from assistive tech, and still
 * for reduced-motion visitors.
 */
const ORBS = [
  { cls: '-left-24 top-10 h-[360px] w-[360px]', color: 'rgba(16,120,8,0.13)', depth: 18, delay: '0s' },
  { cls: 'right-0 top-1/3 h-[300px] w-[300px]', color: 'rgba(191,227,184,0.55)', depth: -26, delay: '-2.5s' },
  { cls: 'left-1/3 -bottom-20 h-[320px] w-[320px]', color: 'rgba(16,120,8,0.09)', depth: 34, delay: '-4.5s' },
];

const AmbientOrbs: React.FC = () => {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return;
    const el = root.current;
    if (!el) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty('--ox', String(nx));
        el.style.setProperty('--oy', String(ny));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduced]);

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {ORBS.map((o, i) => (
        <div
          key={i}
          className={`absolute ${o.cls}`}
          style={{ transform: `translate(calc(var(--ox, 0) * ${o.depth}px), calc(var(--oy, 0) * ${o.depth}px))`, transition: 'transform .6s cubic-bezier(.16,1,.3,1)' }}
        >
          <div
            className="float-y h-full w-full rounded-full"
            style={{ background: `radial-gradient(closest-side, ${o.color}, transparent)`, animationDelay: o.delay, animationDuration: `${8 + i * 2}s` }}
          />
        </div>
      ))}
    </div>
  );
};

export default AmbientOrbs;
