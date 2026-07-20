import React from 'react';
import Reveal from './Reveal';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, lead, children }) => (
  <header className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
    <div className="absolute inset-0 blueprint blueprint-fade pointer-events-none" aria-hidden="true" />
    <div
      className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full"
      style={{ background: 'radial-gradient(closest-side, rgba(169,166,255,0.09), transparent)' }}
      aria-hidden="true"
    />
    <div className="container relative z-10 mx-auto max-w-shell px-6">
      <div className="max-w-3xl">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-wire/50" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-[38px] font-bold leading-[1.04] tracking-tightest text-text md:text-[56px]">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-textSecondary">{lead}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.16}><div className="mt-8">{children}</div></Reveal>}
      </div>
    </div>
  </header>
);

export default PageHero;
