import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES } from '../../constants';
import { Reveal, SectionHead } from './ui';

const LpServices: React.FC = () => (
  <section id="services" className="relative py-24 md:py-32">
    <div className="mx-auto max-w-[1120px] px-6">
      <SectionHead
        pill="Services"
        icon={<Sparkles size={13} aria-hidden="true" />}
        title="Whatever you need built, end to end."
        lead="Websites and web apps are the core. AI agents, chatbots and automation make them smarter."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.slice(0, 6).map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.id} delay={(i % 3) * 0.06}>
              <div className="flex h-full flex-col rounded-[24px] border border-lp-line bg-white p-7 shadow-[0_1px_0_rgba(15,23,42,0.03)] transition-shadow duration-300 hover:shadow-[0_30px_60px_-34px_rgba(15,23,42,0.35)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lp-tint text-lp-blue">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[19px] font-semibold leading-snug tracking-tight text-lp-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-lp-body">{s.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f} className="rounded-full bg-lp-bg px-2.5 py-1 text-[12px] font-medium text-lp-body">{f}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10 text-center">
        <Link to="/services" className="inline-flex items-center gap-2 text-[15px] font-semibold text-lp-blue hover:text-lp-deep">
          See every service <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default LpServices;
