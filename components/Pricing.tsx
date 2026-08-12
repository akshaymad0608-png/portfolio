import React, { useState } from 'react';
import { Check, Bot, Layers, Workflow, Headphones, Code2, Globe, Search, Image as ImageIcon, Video, ArrowRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';

type Currency = 'USD' | 'INR';

/** Indian clients think in rupees; everyone else in dollars. Default to whichever
 *  the visitor's own device suggests, and let them switch either way. */
const detectCurrency = (): Currency => {
  if (typeof window === 'undefined') return 'USD';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const locale = navigator.language || '';
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta' || /-IN$/i.test(locale)) return 'INR';
  } catch {
    /* fall through to USD */
  }
  return 'USD';
};

const PACKAGES = [
  {
    title: 'Website development',
    price: 'from $450',
    priceINR: 'from ₹40,000',
    delivery: '1–2 weeks',
    icon: Globe,
    desc: 'A business site that loads fast, reads well on a phone, and is built to be found.',
    features: [
      'Up to 6 pages, designed and built',
      'Responsive down to small phones',
      'SEO structure, metadata and sitemap',
      'Contact form and analytics wired in',
      'Live on your own domain',
    ],
    popular: false,
  },
  {
    title: 'AI agent or chatbot',
    price: 'from $1,500',
    priceINR: 'from ₹1,40,000',
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
    priceINR: 'from ₹2,80,000',
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
    title: 'SEO & AI search',
    price: 'from $250 / month',
    priceINR: 'from ₹20,000 / month',
    icon: Search,
    features: ['Technical audit and fixes', 'On-page copy and schema', 'Found by ChatGPT and Perplexity', 'Search Console tracking'],
  },
  {
    title: 'Automation setup',
    price: 'from $500',
    priceINR: 'from ₹45,000',
    icon: Workflow,
    features: ['n8n, Make or Zapier build', 'Up to 3 multi-step workflows', 'API connections configured', 'Error alerts that reach you'],
  },
  {
    title: 'AI images',
    price: 'from $120 / batch',
    priceINR: 'from ₹10,000 / batch',
    icon: ImageIcon,
    features: ['20 finished, ready-to-post images', 'Product shots, ads or thumbnails', 'Matched to your brand colours', 'Source files included'],
  },
  {
    title: 'AI video',
    price: 'from $175 / video',
    priceINR: 'from ₹15,000 / video',
    icon: Video,
    features: ['Up to 60 seconds, reel or ad format', 'AI avatar or voiceover', 'Subtitles and background music', 'Two rounds of revisions'],
  },
  {
    title: 'Advice only',
    price: '$150 / hour',
    priceINR: '₹14,000 / hour',
    icon: Headphones,
    features: ['Architecture review', 'Stack selection', 'Code review', 'AI strategy'],
  },
  {
    title: 'Monthly retainer',
    price: 'quoted per scope',
    priceINR: 'quoted per scope',
    icon: Code2,
    features: ['Ongoing maintenance', 'New features', 'Priority response', 'Reserved hours'],
  },
];

const Pricing: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>(detectCurrency);
  const amount = (item: { price: string; priceINR: string }) =>
    currency === 'INR' ? item.priceINR : item.price;

  return (
  <section id="pricing" className="relative py-24 md:py-32">
    <div className="container mx-auto max-w-shell px-6">
      <SectionHeading
        eyebrow="Pricing"
        title="What things cost"
        lead="Project-based, quoted up front. The number you see on the call is the number on the invoice."
        align="center"
        className="mb-8"
      />

      <Reveal>
        <div className="mb-12 flex justify-center">
          <div
            role="group"
            aria-label="Currency"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-panel p-1"
          >
            {(['INR', 'USD'] as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                aria-pressed={currency === c}
                className={`min-h-[40px] rounded-full px-5 py-2 font-mono text-[12.5px] tracking-wider transition-colors ${
                  currency === c
                    ? 'bg-signal text-ink'
                    : 'text-textSecondary hover:text-text'
                }`}
              >
                {c === 'INR' ? '₹ INR' : '$ USD'}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

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
                <div className="mt-2 font-mono text-2xl font-semibold text-signal">{amount(pkg)}</div>
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
                  <div className="mt-1 font-mono text-[15px] text-signal">{amount(item)}</div>
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
};

export default Pricing;
