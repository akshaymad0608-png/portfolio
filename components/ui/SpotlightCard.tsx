import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card that lights up under the cursor and tips toward it in 3D.
 * Pointer position drives a CSS radial gradient for the light and a pair of
 * springs for the tilt. Touch has no hover, and reduced motion keeps only the
 * light, so neither gets the tilt.
 */
const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness: 220, damping: 20 });
  const springY = useSpring(ry, { stiffness: 220, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
    if (reduced) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 9);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 9);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? undefined : { rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      className={`spotlight panel transition-colors duration-300 hover:border-wire/35 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default SpotlightCard;
