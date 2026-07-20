import React from 'react';

/**
 * The mark: an "A" drawn as a routed circuit trace sitting inside a node.
 * Wire stubs enter left and exit right, so the letter reads as one step in a
 * pipeline rather than a monogram in a box. The apex is a live node — the only
 * place the lime appears, matching how the accent is used everywhere else.
 */
export const LogoMark: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    {/* wire stubs — the signal passes through */}
    <path d="M0 20h5.5M34.5 20H40" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.6" strokeLinecap="round" />

    {/* node body */}
    <rect x="5.5" y="5.5" width="29" height="29" rx="9.5" fill="var(--cards)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.4" />

    {/* the A, as a trace */}
    <path
      d="M11.9 28.4 20 11.4l8.1 17"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* crossbar carries the signal colour */}
    <path d="M15.4 23.1h9.2" stroke="var(--signal)" strokeWidth="2.3" strokeLinecap="round" />

    {/* live apex node */}
    <circle cx="20" cy="11.4" r="3" fill="var(--signal)" />
  </svg>
);

interface LogoProps {
  /** Height of the mark in px. */
  size?: number;
  /** Hide the wordmark and render only the mark. */
  markOnly?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 34, markOnly = false, className = '' }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <LogoMark size={size} className="text-wire transition-colors duration-300 group-hover:text-signal" />
    {!markOnly && (
      <span className="flex items-baseline font-display text-[17px] font-bold tracking-tightest text-text">
        akshay
        <span className="font-mono text-[11px] font-normal tracking-normal text-muted">.website</span>
      </span>
    )}
  </span>
);

export default Logo;
