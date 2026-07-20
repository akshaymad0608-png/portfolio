import React from 'react';
import Counter from './ui/Counter';
import Reveal from './ui/Reveal';

const STATS = [
  { value: 4, suffix: '', label: 'Products live in production', note: 'built end to end, solo' },
  { value: 1, suffix: 'M+', label: 'People served by Photo Resizer', note: 'zero server cost, all client-side' },
  { value: 200, suffix: '+', label: 'AI tools indexed on AI Master Tools', note: 'across 10 categories' },
  { value: 60, suffix: '%', label: 'Less time on content pipelines', note: 'after handing them to agents' },
];

const Stats: React.FC = () => (
  <section className="relative border-y border-border bg-panel py-16 md:py-20">
    <div className="container mx-auto max-w-shell px-6">
      <dl className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="lg:border-l lg:border-border lg:pl-6">
              <dd className="font-display text-[42px] font-bold leading-none tracking-tightest text-text md:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-3 text-[15px] font-medium text-text">{stat.label}</dt>
              <p className="mt-1 font-mono text-[11.5px] text-muted">{stat.note}</p>
            </div>
          </Reveal>
        ))}
      </dl>
    </div>
  </section>
);

export default Stats;
