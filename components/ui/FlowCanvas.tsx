import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AVATAR_DATA_URI } from '../../lib/avatarImage';

/**
 * The signature element: a live automation canvas.
 * Triggers wire into an agent (Akshay), which wires out to results.
 * Signals travel the wires the way they do in a real run.
 *
 * Two compositions: wide for desktop, stacked for phones — rather than
 * scaling one down until the labels are unreadable.
 */

type Wire = { id: string; d: string; dur: number; delay: number; out?: boolean };

const WIDE_WIRES: Wire[] = [
  { id: 'w1', d: 'M126,96 C186,96 186,206 236,206', dur: 3.1, delay: 0 },
  { id: 'w2', d: 'M126,206 C166,206 196,206 236,206', dur: 2.6, delay: 0.7 },
  { id: 'w3', d: 'M126,316 C186,316 186,206 236,206', dur: 3.4, delay: 1.4 },
  { id: 'w4', d: 'M364,206 C424,206 424,144 480,144', dur: 2.9, delay: 0.35, out: true },
  { id: 'w5', d: 'M364,206 C424,206 424,268 480,268', dur: 3.2, delay: 1.1, out: true },
];

const TALL_WIRES: Wire[] = [
  { id: 'm1', d: 'M180,94 V170', dur: 2.2, delay: 0 },
  { id: 'm2', d: 'M180,340 C180,388 88,388 88,413', dur: 2.8, delay: 0.5, out: true },
  { id: 'm3', d: 'M180,340 C180,388 272,388 272,413', dur: 3.1, delay: 1.2, out: true },
];

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
};

const NodeCard: React.FC<{
  x: number; y: number; w: number; label: string; tag: string; accent: string; delay: number;
}> = ({ x, y, w, label, tag, accent, delay }) => (
  <motion.g
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformOrigin: `${x + w / 2}px ${y}px` }}
  >
    <rect x={x} y={y - 27} width={w} height={54} rx={11} fill="#171922" stroke="rgba(150,155,180,0.22)" />
    <rect x={x} y={y - 27} width={3} height={54} rx={1.5} fill={accent} />
    <text x={x + 15} y={y - 7} fill="#82889D" fontFamily="JetBrains Mono, monospace" fontSize="8.5" letterSpacing="1.6">
      {tag}
    </text>
    <text x={x + 15} y={y + 12} fill="#F2F3F8" fontFamily="Instrument Sans, sans-serif" fontSize="13" fontWeight="500">
      {label}
    </text>
  </motion.g>
);

const Wires: React.FC<{ wires: Wire[]; reduced: boolean }> = ({ wires, reduced }) => (
  <>
    {wires.map((wire, i) => (
      <g key={wire.id}>
        <path d={wire.d} fill="none" stroke="rgba(150,155,180,0.2)" strokeWidth={1.5} />
        <motion.path
          d={wire.d}
          fill="none"
          stroke={wire.out ? '#D6FF3F' : '#A9A6FF'}
          strokeWidth={1.5}
          strokeOpacity={0.55}
          className={reduced ? '' : 'wire-flow'}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 + i * 0.12, ease: 'easeOut' }}
        />
        {!reduced && (
          <circle r={3.4} fill={wire.out ? '#D6FF3F' : '#A9A6FF'}>
            <animateMotion dur={`${wire.dur}s`} repeatCount="indefinite" begin={`${wire.delay}s`} path={wire.d} />
            <animate attributeName="opacity" values="0;1;1;0" dur={`${wire.dur}s`} repeatCount="indefinite" begin={`${wire.delay}s`} />
          </circle>
        )}
      </g>
    ))}
  </>
);

/** Agent node. `cx`/`top` place the 128×172 card; the portrait is cropped to the subject. */
const AgentNode: React.FC<{ cx: number; top: number; clipId: string }> = ({ cx, top, clipId }) => {
  const cy = top + 80;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <circle cx={cx} cy={cy} r={104} fill="url(#agentGlow)" />
      <rect x={cx - 64} y={top} width={128} height={172} rx={18} fill="#171922" stroke="rgba(169,166,255,0.4)" />
      <clipPath id={clipId}>
        <rect x={cx - 52} y={top + 26} width={104} height={104} rx={52} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <svg x={cx - 52} y={top + 26} width={104} height={104} viewBox="55 25 320 320" preserveAspectRatio="xMidYMid slice">
          <image href={AVATAR_DATA_URI} x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid slice" />
        </svg>
      </g>
      <circle cx={cx} cy={top + 78} r={53} fill="none" stroke="rgba(169,166,255,0.45)" strokeWidth={1.2} />
      <text x={cx} y={top + 22} textAnchor="middle" fill="#A9A6FF" fontFamily="JetBrains Mono, monospace" fontSize="8.5" letterSpacing="1.8">
        AGENT
      </text>
      <text x={cx} y={top + 155} textAnchor="middle" fill="#F2F3F8" fontFamily="Instrument Sans, sans-serif" fontSize="13.5" fontWeight="600">
        Akshay
      </text>
    </motion.g>
  );
};

const Defs = () => (
  <defs>
    <radialGradient id="agentGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#A9A6FF" stopOpacity="0.28" />
      <stop offset="100%" stopColor="#A9A6FF" stopOpacity="0" />
    </radialGradient>
  </defs>
);

const FlowCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const reduced = useReducedMotion();
  const [runs, setRuns] = useState(1284);

  // the counter ticks while you read — the canvas is doing work
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setRuns((r) => r + 1), 4200);
    return () => clearInterval(t);
  }, [reduced]);

  const label = 'Automation canvas: incoming leads wire into an AI agent, which wires out to completed actions';

  return (
    <div className={`panel overflow-hidden ticked ${className}`}>
      <div className="flex items-center justify-between border-b border-border bg-[#0D0E14] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-wire pulse-soft" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-textSecondary">
            lead-intake.flow
          </span>
        </div>
        <span className="font-mono text-[11px] text-wire">running</span>
      </div>

      {/* wide composition */}
      <svg viewBox="0 0 600 420" className="hidden h-auto w-full sm:block" role="img" aria-label={label}>
        <Defs />
        <Wires wires={WIDE_WIRES} reduced={reduced} />
        {[
          { y: 96, label: 'Form submit' },
          { y: 206, label: 'New email' },
          { y: 316, label: 'WhatsApp msg' },
        ].map((t, i) => (
          <NodeCard key={t.label} x={12} y={t.y} w={114} label={t.label} tag="TRIGGER" accent="#A9A6FF" delay={0.15 + i * 0.1} />
        ))}
        <AgentNode cx={300} top={126} clipId="avatarClipWide" />
        {[
          { y: 144, label: 'CRM updated' },
          { y: 268, label: 'Reply drafted' },
        ].map((o, i) => (
          <NodeCard key={o.label} x={480} y={o.y} w={108} label={o.label} tag="ACTION" accent="#D6FF3F" delay={0.55 + i * 0.1} />
        ))}
      </svg>

      {/* stacked composition for narrow screens */}
      <svg viewBox="0 0 360 500" className="h-auto w-full sm:hidden" role="img" aria-label={label}>
        <Defs />
        <Wires wires={TALL_WIRES} reduced={reduced} />
        <NodeCard x={100} y={67} w={160} label="New lead arrives" tag="TRIGGER" accent="#A9A6FF" delay={0.15} />
        <AgentNode cx={180} top={170} clipId="avatarClipTall" />
        <NodeCard x={8} y={440} w={160} label="CRM updated" tag="ACTION" accent="#D6FF3F" delay={0.55} />
        <NodeCard x={192} y={440} w={160} label="Reply drafted" tag="ACTION" accent="#D6FF3F" delay={0.65} />
      </svg>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-border bg-[#0D0E14] px-4 py-3 font-mono text-[11px] text-muted">
        <span><span className="text-wire">{runs.toLocaleString()}</span> runs</span>
        <span><span className="text-wire">0</span> errors</span>
        <span>avg <span className="text-wire">1.4s</span></span>
        <span className="hidden sm:inline">last <span className="text-wire">just now</span></span>
      </div>
    </div>
  );
};

export default FlowCanvas;
