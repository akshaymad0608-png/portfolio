import React, { useRef } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

/** Card that lights up under the cursor. Pointer position drives a CSS radial gradient. */
const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight panel transition-colors duration-300 hover:border-wire/35 ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
