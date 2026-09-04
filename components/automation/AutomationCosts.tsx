import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import {
  COST_FORMULA,
  CONTACT_SERVICE,
  HOSTING_OPTIONS,
  THIRD_PARTY_COSTS,
  WORKED_EXAMPLE,
} from '../../lib/automationPricing';

const contactHref = (details: string) =>
  `/contact?service=${encodeURIComponent(CONTACT_SERVICE)}&details=${encodeURIComponent(details)}`;

/** Self-hosted vs Cloud, the third-party bills, the formula, and a worked example. */
const AutomationCosts: React.FC = () => (
  <>
    <section id="setup" className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="Hosting"
          title="Choose your n8n setup"
          lead="Where the automation actually runs. This is the one decision that changes your ongoing bill the most."
          className="mb-14"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {HOSTING_OPTIONS.map((opt, i) => (
            <Reveal key={opt.id} delay={i * 0.06}>
              <div className="panel flex h-full flex-col p-8">
                <h3 className="font-display text-xl font-bold text-text">{opt.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-textSecondary">
                  {opt.description}
                </p>

                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  Best for
                </p>
                <ul className="mt-4 flex-1 space-y-3">
                  {opt.bestFor.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[14.5px] text-textSecondary">
                      <Check size={16} className="mt-0.5 shrink-0 text-wire" />
                      {b}
                    </li>
                  ))}
                </ul>

                <p className="mt-7 border-l-2 border-wire bg-wire/8 px-4 py-3 text-[13.5px] leading-relaxed text-text">
                  {opt.note}
                </p>

                <Link
                  to={contactHref(`I'd like to discuss the ${opt.name} option for n8n.`)}
                  className="btn-ghost mt-7 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px]"
                >
                  {opt.cta} <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section id="third-party" className="relative bg-section py-24 md:py-32">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="Not included"
          title="Additional third-party costs"
          lead="These are billed by their providers, directly to you. I have deliberately not put a price on any of them — I do not resell them, and a number I invented here is one you would plan around."
          className="mb-14"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {THIRD_PARTY_COSTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <div className="panel h-full p-6">
                <span aria-hidden className="text-[22px] leading-none">
                  {c.emoji}
                </span>
                <h3 className="mt-4 font-display text-[17px] font-bold text-text">{c.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-textSecondary">{c.what}</p>
                <p className="mt-3 border-t border-border pt-3 text-[13.5px] leading-relaxed text-muted">
                  {c.driver}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="The maths"
          title="Your total monthly automation cost"
          className="mb-14"
        />

        <Reveal>
          <div className="panel p-8 md:p-10">
            <ul className="flex flex-col items-stretch gap-0">
              {COST_FORMULA.map((line, i) => (
                <li key={line}>
                  <div
                    className={`border px-5 py-4 text-center text-[15.5px] ${
                      i === 0
                        ? 'border-wire/45 bg-wire/8 font-bold text-text'
                        : 'border-border bg-cards text-textSecondary'
                    }`}
                  >
                    {line}
                  </div>
                  {i < COST_FORMULA.length - 1 && (
                    <div className="flex justify-center py-2" aria-hidden>
                      <Plus size={15} className="text-wire" />
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <p className="mt-8 border-t border-border pt-6 text-[15px] leading-relaxed text-textSecondary">
              My development and maintenance fees are clearly separate from third-party service
              charges. Wherever possible, clients maintain their own third-party accounts and
              subscriptions for better transparency and control.
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="relative bg-section py-24 md:py-32">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading eyebrow="Worked example" title={WORKED_EXAMPLE.heading} className="mb-14" />

        <Reveal>
          <div className="panel grid gap-8 p-8 md:grid-cols-2 md:p-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {WORKED_EXAMPLE.setupLabel}
              </p>
              <p className="mt-2 font-display text-[32px] font-bold leading-none text-text">
                {WORKED_EXAMPLE.setup}
              </p>

              <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {WORKED_EXAMPLE.monthlyLabel}
              </p>
              <p className="mt-2 font-display text-[26px] font-bold leading-none text-wire">
                {WORKED_EXAMPLE.monthly}
              </p>
            </div>

            <div className="md:border-l md:border-border md:pl-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Additional costs
              </p>
              <p className="mt-2 text-[14px] text-textSecondary">
                Depends on actual requirements and usage:
              </p>
              <ul className="mt-4 space-y-2.5">
                {WORKED_EXAMPLE.additional.map((a) => (
                  <li key={a} className="flex gap-2.5 text-[14.5px] text-textSecondary">
                    <span className="mt-[9px] h-1 w-1 shrink-0 bg-wire" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
                {WORKED_EXAMPLE.note}
              </p>
            </div>

            <div className="md:col-span-2">
              <Link
                to={contactHref(
                  'I saw the AI lead generation example and would like a cost estimate for something similar.',
                )}
                className="btn-signal inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px]"
              >
                Get My Custom Cost Estimate <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

export default AutomationCosts;
