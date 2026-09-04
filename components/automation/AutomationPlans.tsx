import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { AUTOMATION_PLANS, CONTACT_SERVICE } from '../../lib/automationPricing';

/**
 * The three packages. Card shape follows components/Pricing.tsx so the two
 * pricing pages read as one site: panel, hairline rules, the wire border and
 * mono badge on the recommended tier.
 *
 * Every CTA lands on /contact with the service already chosen and the plan
 * named, so the enquiry arrives knowing which one was clicked.
 */
const AutomationPlans: React.FC = () => (
  <section id="plans" className="relative py-24 md:py-32">
    <div className="container mx-auto max-w-shell px-6">
      <SectionHeading
        eyebrow="Packages"
        title="Choose your automation plan"
        lead="A one-time build fee, then a monthly fee to keep it running, watched and fixed. Third-party services are billed by their providers, not by me."
        className="mb-14"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {AUTOMATION_PLANS.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 0.06}>
            <div
              className={`panel flex h-full flex-col p-8 ${
                plan.popular ? 'ticked border-wire/45' : ''
              }`}
            >
              {plan.popular && (
                <span className="mb-5 w-fit rounded-full bg-wire/12 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-wire">
                  Most popular
                </span>
              )}

              <h3 className="font-display text-xl font-bold text-text">{plan.name}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-textSecondary">
                {plan.description}
              </p>

              <div className="mt-6 border-t border-border pt-6">
                <p className="font-display text-[30px] font-bold leading-none text-text">
                  {plan.setup}
                </p>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {plan.setupLabel}
                </p>

                <p className="mt-4 font-display text-[19px] font-bold leading-none text-wire">
                  {plan.monthly}
                </p>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {plan.monthlyLabel}
                </p>
              </div>

              <ul className="mt-7 flex-1 space-y-3 border-t border-border pt-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[14.5px] text-textSecondary">
                    <Check size={16} className="mt-0.5 shrink-0 text-wire" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={`/contact?service=${encodeURIComponent(CONTACT_SERVICE)}&details=${encodeURIComponent(
                  `Interested in the ${plan.name} automation plan (${plan.setup} setup, ${plan.monthly.replace(/^\+\s*/, '')}).`,
                )}`}
                className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] ${
                  plan.popular ? 'btn-signal' : 'btn-ghost'
                }`}
              >
                {plan.cta} <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-[13.5px] text-muted">
        Prices are for my development and maintenance work. n8n hosting, AI APIs and other
        third-party services are billed separately by their providers.
      </p>
    </div>
  </section>
);

export default AutomationPlans;
