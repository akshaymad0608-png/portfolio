import React from 'react';
import { INTERNAL_BUILDS } from '../constants';
import Reveal from './ui/Reveal';

/**
 * The builds with no public URL, listed as ruled rows rather than the big
 * screenshot cards used for the shipped products. The layout difference is the
 * point: these are described, not demonstrated, and nothing here pretends to be
 * a link you can follow.
 */
const InternalBuilds: React.FC = () => (
  <section className="relative py-20">
    <div className="container mx-auto max-w-shell px-6">
      <Reveal>
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-wire" />
          <span className="eyebrow">Not public</span>
        </div>
        <h2 className="font-display text-[30px] font-bold tracking-tightest text-text md:text-[38px]">
          Built and running, just not
          <br className="hidden md:block" /> somewhere you can click.
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-textSecondary">
          Internal tooling and private stacks. No demo link, because there isn&rsquo;t an honest one to
          give — here&rsquo;s what they are and what they run on instead.
        </p>
      </Reveal>

      <div className="mt-12 border-t border-border">
        {INTERNAL_BUILDS.map((build, i) => {
          const Icon = build.icon;
          return (
            <Reveal key={build.id} delay={0.04 * i}>
              <article className="spotlight grid gap-6 border-b border-border py-9 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-12">
                <div className="min-w-0">
                  <div className="flex items-start gap-3">
                    {Icon && (
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border text-wire">
                        <Icon size={17} />
                      </span>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-bold text-text">{build.title}</h3>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                        {build.kind}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 inline-block border border-border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-textSecondary">
                    {build.status}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-[16px] leading-relaxed text-text">{build.summary}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-textSecondary">{build.detail}</p>

                  <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {build.facts.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[14.5px] text-textSecondary">
                        <span className="mt-[9px] h-1 w-1 shrink-0 bg-wire" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {build.tech.map((t) => (
                      <li
                        key={t}
                        className="border border-border px-2.5 py-1 font-mono text-[11px] text-textSecondary"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default InternalBuilds;
