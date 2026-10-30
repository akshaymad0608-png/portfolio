import { useEffect } from 'react';

/**
 * Buttons lean toward the pointer as it nears them and spring back when it
 * leaves. Done once for the whole site by watching the pointer, so no button
 * needs to opt in. Skipped for touch and for reduced motion.
 */
const SELECTOR = '.btn-signal, .btn-ghost';
const REACH = 70; // px around the button where the pull starts

const MagneticButtons: React.FC = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let active: HTMLElement | null = null;
    const release = (el: HTMLElement) => {
      el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
      el.style.transform = '';
      window.setTimeout(() => { if (el !== active) el.style.transition = ''; }, 520);
    };

    const onMove = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.(SELECTOR) as HTMLElement | null;
      let el = target;
      if (!el && active) {
        const r = active.getBoundingClientRect();
        const near = e.clientX > r.left - REACH && e.clientX < r.right + REACH && e.clientY > r.top - REACH && e.clientY < r.bottom + REACH;
        if (near) el = active;
      }
      if (active && el !== active) { release(active); active = null; }
      if (!el) return;
      active = el;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transition = 'transform .15s ease-out';
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (active) release(active);
    };
  }, []);

  return null;
};

export default MagneticButtons;
