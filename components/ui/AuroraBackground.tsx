import React from 'react';

/**
 * Slow-moving coloured light fixed behind the whole site. Three big radial
 * gradients drift on long loops (plain gradients, no blur filter, so it stays
 * cheap). Sections with a solid fill sit over it; open sections let it show.
 * Still for reduced motion via the global animation rule.
 */
const AuroraBackground: React.FC = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div
      className="aurora-a absolute -left-[15%] -top-[20%] h-[75vh] w-[75vw] rounded-full"
      style={{ background: 'radial-gradient(closest-side, rgba(57,255,136,0.20), transparent)' }}
    />
    <div
      className="aurora-b absolute -right-[20%] top-[10%] h-[80vh] w-[70vw] rounded-full"
      style={{ background: 'radial-gradient(closest-side, rgba(139,92,246,0.24), transparent)' }}
    />
    <div
      className="aurora-c absolute -bottom-[25%] left-[10%] h-[70vh] w-[75vw] rounded-full"
      style={{ background: 'radial-gradient(closest-side, rgba(34,211,238,0.16), transparent)' }}
    />
  </div>
);

export default AuroraBackground;
