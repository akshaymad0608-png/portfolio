import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../constants';
import SectionHeading from './ui/SectionHeading';
import SpotlightCard from './ui/SpotlightCard';
import Reveal from './ui/Reveal';

interface ServicesProps {
  limit?: number;
  showCta?: boolean;
}

const Services: React.FC<ServicesProps> = ({ limit, showCta = true }) => {
  const items = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-shell px-6">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What I build"
            title={<>The work I get asked for<br className="hidden md:block" /> over and over.</>}
            lead="Each one starts as a bottleneck you describe on a call and ends as something running on its own."
          />
          {showCta && (
            <Reveal delay={0.15}>
              <Link
                to="/services"
                className="group inline-flex min-h-[28px] shrink-0 items-center gap-2 py-1 text-sm font-medium text-textSecondary transition-colors hover:text-wire"
              >
                Scope &amp; pricing
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => {
            const Icon = service.icon;
            // first card spans two columns on wide screens — it's the one most people come for
            const wide = i === 0;
            return (
              <Reveal key={service.id} delay={Math.min(i, 5) * 0.05} className={wide ? 'lg:col-span-2' : ''}>
                <SpotlightCard className="group flex h-full flex-col p-7">
                  <div className="mb-6 flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-ink text-wire transition-colors duration-300 group-hover:border-wire/45">
                      <Icon className="h-[21px] w-[21px]" />
                    </span>
                    <span className="font-mono text-[11px] text-muted">
                      {String(service.id).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold leading-snug text-text">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-textSecondary">
                    {service.description}
                  </p>

                  <ul className={`mt-6 flex flex-wrap gap-2 ${wide ? '' : ''}`}>
                    {service.features.slice(0, wide ? 4 : 3).map((f) => (
                      <li
                        key={f}
                        className="rounded-md border border-border bg-ink px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        {showCta && (
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border bg-panel p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="font-display text-lg font-bold text-text">Not sure which one you need?</p>
                <p className="mt-1 text-sm text-textSecondary">
                  Describe the bottleneck on a call and I'll tell you whether it's worth automating.
                </p>
              </div>
              <a
                href="https://calendly.com/akshaymad0608"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-signal inline-flex shrink-0 items-center gap-2 px-6 py-3 text-sm"
              >
                Book a call <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Services;
