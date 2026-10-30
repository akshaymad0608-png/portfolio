import { useEffect, useRef } from 'react';

/**
 * A soft pool of light that trails the pointer across the whole page.
 * Pointer-only decoration: skipped on touch and for reduced motion.
 */
const CursorGlow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current;
    if (!el) return;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2, x = tx, y = ty, raf = 0;
    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; el.style.opacity = '1'; };
    const tick = () => {
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[520px] w-[520px] rounded-full opacity-0 transition-opacity duration-500 md:block"
      style={{ background: 'radial-gradient(closest-side, rgba(57,255,136,0.12), rgba(139,92,246,0.06) 55%, transparent)' }}
    />
  );
};

export default CursorGlow;
