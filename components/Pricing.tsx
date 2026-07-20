import React from 'react';
import { Check, Bot, Layers, Workflow, Headphones, Code2, ArrowRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';

const PACKAGES = [
  {
    title: 'Automation setup',
    price: 'from $500',
    delivery: '1–2 weeks',
    icon: Workflow,
    desc: 'For the repetitive weekly task that keeps eating someone\u2019s afternoon.',
    features: [
      'n8n, Make or Zapier build',
      'Up to 3 multi-step workflows',
      'API connections configured',
      'Error branches and alerts',
      '30 days of fixes included',
    ],
    popular: false,
  },
  {
    title: 'AI agent or chatbot',
    price: 'from $1,500',
    delivery: '3–4 weeks',
    icon: Bot,
    desc: 'For work that needs judgement, not just steps \u2014 replies, research, routing.',
    features: [
      'OpenAI, Claude or Gemini',
      'Trained on your own documents',
      'Vector database set up',
      'Chat widget or API endpoint',
      'Prompt tuning against real cases',
    ],
    popular: true,
  },
  {
    title: 'Full product build',
    price: 'from $3,000',
    delivery: '4–8 weeks',
    icon: Layers,
    desc: 'For when the thing you need doesn\u2019t exist yet and has to be built.',
    features: [
      'React / Next.js front end',
      'Node.js back end',
      'Database design',
      'Auth and security',
      'Deploy and CI/CD pipeline',
    ],
    popular: false,
  },
];

const RETAINERS = [
  {
    title: 'Advice only',
    price: '$150 / hour',
    icon: Headphones,
    features: ['Architecture review', 'Stack selection', 'Code review', 'AI strategy'],
  },
  {
    title: 'Monthly retainer',
    price: 'quoted per scope',
    icon: Code2,
    features: ['Ongoing maintenance', 'New features', 'Priority response', 'Reserved hours'],
  },
];

const Pricing: React.FC = () => (
  <section id="pricing" className="relative py-24 md:py-32">
    <div className="container mx-auto max-w-shell px-6">
      <SectionHeading
        eyebrow="Pricing"
        title="What things cost"
        lead="Project-based, quoted up front. The number you see on the call is the number on the invoice."
        align="center"
        className="mb-14"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {PACKAGES.map((pkg, i) => {
          const Icon = pkg.icon;
          return (
            <Reveal key={pkg.title} delay={i * 0.08}>
              <SpotlightCard
                className={`flex h-full flex-col p-8 ${
                  pkg.popular ? 'border-wire/45 ticked' : ''
                }`}
              >
                {pkg.popular && (
                  <span className="mb-5 w-fit rounded-full bg-wire/12 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-wire">
                    Most requested
                  </span>
                )}

                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-ink text-wire">
                  <Icon size={22} />
                </span>

                <h3 className="font-display text-xl font-bold text-text">{pkg.title}</h3>
                <div className="mt-2 font-mono text-2xl font-semibold text-signal">{pkg.price}</div>
                <p className="mt-4 text-[15px] leading-relaxed text-textSecondary">{pkg.desc}</p>

                <ul className="mt-7 flex-1 space-y-3 border-t border-border pt-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[14.5px] text-textSecondary">
                      <Check size={16} className="mt-0.5 shrink-0 text-wire" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center justify-between border-t border-border pt-5 font-mono text-[12px]">
                  <span className="text-muted">Typical delivery</span>
                  <span className="text-text">{pkg.delivery}</span>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {RETAINERS.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="panel flex h-full flex-col gap-6 p-8 sm:flex-row sm:items-start">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-ink text-signal">
                  <Icon size={22} />
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-text">{item.title}</h3>
                  <div className="mt-1 font-mono text-[15px] text-signal">{item.price}</div>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-[14px] text-textSecondary">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-wire" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-[15px] text-textSecondary">
          Scope doesn't fit any of these?{' '}
          <a
            href="https://calendly.com/akshaymad0608"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-wire hover:underline"
          >
            Get a quote on a call <ArrowRight size={15} />
          </a>
        </p>
      </Reveal>
    </div>
  </section>
);

export default Pricing;
