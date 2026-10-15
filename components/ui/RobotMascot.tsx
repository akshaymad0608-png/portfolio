import React from 'react';

/**
 * The chat assistant's mascot: a small white robot with a dark visor and green
 * eyes. Drawn as SVG so it stays sharp at any size and weighs nothing. The
 * float, blink and antenna wiggle are CSS (see global.css) and switch off under
 * prefers-reduced-motion.
 */
const RobotMascot: React.FC<{ className?: string; animated?: boolean; head?: boolean }> = ({ className = '', animated = true, head = false }) => (
  <svg viewBox={head ? '8 0 104 96' : '0 0 120 150'} className={className} role="img" aria-label="Chat assistant robot">
    <defs>
      <linearGradient id="rb-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#dfe6ee" />
      </linearGradient>
      <linearGradient id="rb-visor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1b2a41" />
        <stop offset="1" stopColor="#0b1220" />
      </linearGradient>
    </defs>

    {/* soft ground glow */}
    <ellipse cx="60" cy="142" rx="26" ry="5" fill="#117a09" opacity=".18" />

    <g className={animated ? 'robot-float' : undefined}>
      {/* antennae */}
      <g className={animated ? 'robot-antenna' : undefined} style={{ transformOrigin: '60px 30px' }}>
        <line x1="44" y1="30" x2="36" y2="12" stroke="#c9d3de" strokeWidth="3" strokeLinecap="round" />
        <line x1="76" y1="30" x2="84" y2="12" stroke="#c9d3de" strokeWidth="3" strokeLinecap="round" />
        <circle cx="35" cy="10" r="5" fill="#117a09" />
        <circle cx="85" cy="10" r="5" fill="#117a09" />
        <circle cx="33.5" cy="8.5" r="1.6" fill="#fff" opacity=".8" />
        <circle cx="83.5" cy="8.5" r="1.6" fill="#fff" opacity=".8" />
      </g>

      {/* ear pods */}
      <rect x="14" y="44" width="12" height="26" rx="6" fill="#117a09" />
      <rect x="94" y="44" width="12" height="26" rx="6" fill="#117a09" />

      {/* head */}
      <rect x="22" y="26" width="76" height="62" rx="30" fill="url(#rb-body)" stroke="#c9d3de" strokeWidth="2" />
      {/* visor */}
      <rect x="31" y="40" width="58" height="34" rx="17" fill="url(#rb-visor)" />
      {/* eyes */}
      <g className={animated ? 'robot-blink' : undefined} style={{ transformOrigin: '60px 57px' }}>
        <circle cx="47" cy="57" r="8.5" fill="#3ddc3a" />
        <circle cx="73" cy="57" r="8.5" fill="#3ddc3a" />
        <circle cx="47" cy="57" r="4.6" fill="#0b3d0a" />
        <circle cx="73" cy="57" r="4.6" fill="#0b3d0a" />
        <circle cx="44.6" cy="54.4" r="2.2" fill="#fff" />
        <circle cx="70.6" cy="54.4" r="2.2" fill="#fff" />
      </g>
      {/* smile */}
      <path d="M52 69 Q60 74 68 69" stroke="#3ddc3a" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".9" />

      {/* neck */}
      <rect x="52" y="86" width="16" height="8" rx="3" fill="#c9d3de" />

      {/* body */}
      <ellipse cx="60" cy="114" rx="29" ry="25" fill="url(#rb-body)" stroke="#c9d3de" strokeWidth="2" />
      <circle cx="60" cy="112" r="9" fill="#117a09" />
      <circle cx="60" cy="112" r="4" fill="#3ddc3a" />
      <path d="M40 100 Q60 108 80 100" stroke="#117a09" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".7" />

      {/* arms */}
      <ellipse cx="28" cy="112" rx="8" ry="15" fill="url(#rb-body)" stroke="#c9d3de" strokeWidth="2" transform="rotate(14 28 112)" />
      <ellipse cx="92" cy="112" rx="8" ry="15" fill="url(#rb-body)" stroke="#c9d3de" strokeWidth="2" transform="rotate(-14 92 112)" />
      <circle cx="25" cy="125" r="5" fill="#117a09" />
      <circle cx="95" cy="125" r="5" fill="#117a09" />
    </g>
  </svg>
);

export default RobotMascot;
