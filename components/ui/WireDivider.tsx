import React from 'react';

/** Section joint drawn as a wire junction — the same visual language as the hero canvas. */
const WireDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full ${className}`} aria-hidden="true">
    <svg viewBox="0 0 1200 40" className="w-full h-8" preserveAspectRatio="none">
      <path d="M0,20 H520 C548,20 552,6 580,6 H620 C648,6 652,20 680,20 H1200"
            fill="none" stroke="rgba(150,155,180,0.18)" strokeWidth="1" />
      <path d="M0,20 H520 C548,20 552,6 580,6 H620 C648,6 652,20 680,20 H1200"
            fill="none" stroke="#A9A6FF" strokeWidth="1" strokeOpacity="0.4" className="wire-flow" />
      <circle cx="600" cy="6" r="3" fill="#A9A6FF" fillOpacity="0.75" />
    </svg>
  </div>
);

export default WireDivider;
