import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import {
  AI_OPTIONS,
  AUTOMATION_PLANS,
  CONTACT_SERVICE,
  HOSTING_CHOICES,
  INTEGRATION_OPTIONS,
  VOLUME_OPTIONS,
  recommendPlan,
  thirdPartyFor,
  type AiLevel,
  type HostingChoice,
  type Integration,
  type VolumeTier,
} from '../../lib/automationPricing';

/**
 * The estimator.
 *
 * It only ever shows one of the three published plan prices. It does not
 * multiply anything, invent a surcharge, or pretend to know what n8n Cloud,
 * Anthropic or a WhatsApp provider will charge — those are named as separate
 * bills and left unpriced, because they are not mine to quote and a made-up
 * number here is one a client would plan around.
 *
 * What it does do is real: it works out the smallest plan that covers the
 * selections, says so when that is not the plan you picked, and lists which
 * third-party accounts your choices imply. Then it hands the whole summary to
 * the existing contact form so nobody types it twice.
 */

const fieldLabel = 'mb-3 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted';

const Chip: React.FC<{
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  pressed?: boolean;
}> = ({ selected, onClick, children, pressed }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={pressed ?? selected}
    className={`min-h-[40px] rounded-full border px-4 py-2 text-[13.5px] transition-colors ${
      selected
        ? 'border-wire bg-wire/12 text-wire'
        : 'border-border bg-cards text-textSecondary hover:border-wire/40 hover:text-text'
    }`}
  >
    {children}
  </button>
);

const CostEstimator: React.FC = () => {
  const [planId, setPlanId] = useState<'starter' | 'business' | 'premium'>('business');
  const [hosting, setHosting] = useState<HostingChoice>('unsure');
  const [volume, setVolume] = useState<VolumeTier>('100to1000');
  const [ai, setAi] = useState<AiLevel>('basic');
  const [integrations, setIntegrations] = useState<Integration[]>(['Email']);

  const chosen = AUTOMATION_PLANS.find((p) => p.id === planId)!;
  const recommended = useMemo(
    () => recommendPlan({ ai, volume, integrations }),
    [ai, volume, integrations],
  );
  const understated = recommended.id !== chosen.id &&
    AUTOMATION_PLANS.indexOf(recommended) > AUTOMATION_PLANS.indexOf(chosen);

  const thirdParty = useMemo(
    () => thirdPartyFor({ ai, hosting, integrations }),
    [ai, hosting, integrations],
  );

  const toggle = (name: Integration) =>
    setIntegrations((cur) =>
      cur.includes(name) ? cur.filter((i) => i !== name) : [...cur, name],
    );

  /** The summary that lands in the contact form, so the first reply can be useful. */
  const quoteLink = useMemo(() => {
    const lines = [
      `Package: ${chosen.name}`,
      `n8n setup: ${HOSTING_CHOICES.find((h) => h.id === hosting)?.label}`,
      `Monthly leads/orders: ${VOLUME_OPTIONS.find((v) => v.id === volume)?.label}`,
      `AI: ${AI_OPTIONS.find((a) => a.id === ai)?.label}`,
      `Integrations: ${integrations.length ? integrations.join(', ') : 'none selected'}`,
      understated ? `Estimator suggested: ${recommended.name}` : '',
      '',
      'Sent from the automation cost estimator.',
    ].filter(Boolean);
    const params = new URLSearchParams({
      service: CONTACT_SERVICE,
      details: lines.join('\n'),
    });
    return `/contact?${params.toString()}`;
  }, [chosen, hosting, volume, ai, integrations, understated, recommended]);

  return (
    <section id="estimator" className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="Estimator"
          title="Work out roughly what this costs"
          lead="It shows my setup and maintenance fee for the plan that fits. Third-party services are named, not priced — those bills are yours and I do not mark them up."
          className="mb-12"
        />

        <div className="panel grid gap-10 p-6 md:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div className="min-w-0 space-y-8">
            <fieldset>
              <legend className={fieldLabel}>Automation package</legend>
              <div className="flex flex-wrap gap-2">
                {AUTOMATION_PLANS.map((p) => (
                  <Chip key={p.id} selected={planId === p.id} onClick={() => setPlanId(p.id)}>
                    {p.name}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={fieldLabel}>n8n setup preference</legend>
              <div className="flex flex-wrap gap-2">
                {HOSTING_CHOICES.map((h) => (
                  <Chip key={h.id} selected={hosting === h.id} onClick={() => setHosting(h.id)}>
                    {h.label}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={fieldLabel}>Expected monthly leads or orders</legend>
              <div className="flex flex-wrap gap-2">
                {VOLUME_OPTIONS.map((v) => (
                  <Chip key={v.id} selected={volume === v.id} onClick={() => setVolume(v.id)}>
                    {v.label}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={fieldLabel}>AI integration</legend>
              <div className="flex flex-wrap gap-2">
                {AI_OPTIONS.map((a) => (
                  <Chip key={a.id} selected={ai === a.id} onClick={() => setAi(a.id)}>
                    {a.label}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={fieldLabel}>Required integrations — pick any</legend>
              <div className="flex flex-wrap gap-2">
                {INTEGRATION_OPTIONS.map((name) => (
                  <Chip
                    key={name}
                    selected={integrations.includes(name)}
                    onClick={() => toggle(name)}
                  >
                    {name}
                  </Chip>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="min-w-0 lg:border-l lg:border-border lg:pl-9">
            <div aria-live="polite">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Estimated one-time setup
              </p>
              <p className="mt-2 font-display text-[32px] font-bold leading-none text-text">
                {chosen.setup}
              </p>

              <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Estimated monthly maintenance
              </p>
              <p className="mt-2 font-display text-[26px] font-bold leading-none text-text">
                {chosen.monthly.replace(/^\+\s*/, '')}
              </p>

              {understated && (
                <p className="mt-6 border-l-2 border-wire bg-wire/8 px-4 py-3 text-[14px] leading-relaxed text-text">
                  What you have selected needs the <strong>{recommended.name}</strong> plan —{' '}
                  {recommended.setup} setup, {recommended.monthly.replace(/^\+\s*/, '')}. The
                  numbers above are for {chosen.name}.
                </p>
              )}

              {chosen.id === 'premium' && (
                <p className="mt-6 text-[14px] leading-relaxed text-textSecondary">
                  Final pricing may vary based on workflow complexity and integrations.
                </p>
              )}

              <div className="mt-8 border-t border-border pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  Third-party costs
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-textSecondary">
                  Not included — depends on your selected providers and actual usage.
                </p>
                {thirdParty.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {thirdParty.map((t) => (
                      <li key={t} className="flex gap-2.5 text-[14px] text-textSecondary">
                        <Check size={15} className="mt-0.5 shrink-0 text-wire" />
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link
                to={quoteLink}
                className="btn-signal mt-8 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-[15px]"
              >
                Get My Exact Quote <ArrowRight size={17} />
              </Link>
              <p className="mt-3 text-center text-[12.5px] text-muted">
                Your selections travel with you — the form arrives filled in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;
