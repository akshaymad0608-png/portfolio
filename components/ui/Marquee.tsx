import React from 'react';

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Edge-faded infinite ticker. Pauses on hover so names stay readable. */
const Marquee: React.FC<MarqueeProps> = ({ items, className = '' }) => {
  const doubled = [...items, ...items];
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div className="marquee-track flex w-max items-center gap-3">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 whitespace-nowrap rounded-full border border-border bg-cards px-5 py-2.5 font-mono text-[12px] text-textSecondary"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
