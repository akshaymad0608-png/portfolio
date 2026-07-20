import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** A soft ring that trails the pointer and snaps wider over anything clickable. */
const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 400, damping: 32, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setActive(Boolean(el.closest('a, button, input, textarea, select, [role="button"], .hover-target')));
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
    >
      <motion.div
        animate={{
          width: active ? 40 : 20,
          height: active ? 40 : 20,
          opacity: active ? 1 : 0.6,
          borderColor: active ? '#D6FF3F' : '#A9A6FF',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
      />
    </motion.div>
  );
};

export default CustomCursor;
