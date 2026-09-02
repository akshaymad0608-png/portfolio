import React from 'react';
import { Check, Bot, Layers, Workflow, Headphones, Code2, Globe, Search, Image as ImageIcon, Video, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';
import { useCurrency, type Currency } from '../lib/currency';

/**
 * `service` matches an option in the SERVICES list on pages/Contact.tsx, so a
 * card can hand someone to the form with their choice already made.
 *
 * `excludes` keeps the page hero's promise of "an honest note on what each one
 * does and doesn't include". The promise was in the copy and never kept, which
 * left the exclusions to surface halfway through a project instead.
 */
const PACKAGES = [
  {
    title: 'Website development',
    price: 'from $275',
    priceINR: 'from ₹25,000',
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
    excludes: 'Copywriting, photography, and the domain and hosting bill are yours.',
    service: 'Website / web app build',
    popular: false,
  },
  {
    title: 'AI agent or chatbot',
    price: 'from $900',
    priceINR: 'from ₹80,000',
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
    excludes: 'Model usage is billed to your own API account, so you see every token.',
    service: 'AI agent or chatbot',
    popular: true,
  },
  {
    title: 'Full product build',
    price: 'from $1,800',
    priceINR: 'from ₹1,60,000',
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
    excludes: 'Hosting, database and third-party services run on your accounts, not mine.',
    service: 'Custom AI tool or micro-SaaS',
    popular: false,
  },
];

const RETAINERS = [
  {
    title: 'SEO & AI search',
    price: 'from $150 / month',
    priceINR: 'from ₹12,000 / month',
    icon: Search,
    features: ['Technical audit and fixes', 'On-page copy and schema', 'Found by ChatGPT and Perplexity', 'Search Console tracking'],
  },
  {
    title: 'n8n automation build',
    price: 'from $300',
    priceINR: 'from ₹27,000',
    icon: Workflow,
    features: ['n8n, Make or Zapier', 'Up to 3 multi-step workflows', 'API and sheet connections', 'Error alerts that reach you'],
  },
  {
    title: 'AI images',
    price: 'from $75 / batch',
    priceINR: 'from ₹6,500 / batch',
    icon: ImageIcon,
    features: ['20 finished, ready-to-post images', 'Product shots, ads or thumbnails', 'Matched to your brand colours', 'Source files included'],
  },
  {
    title: 'AI video',
    price: 'from $100 / video',
    priceINR: 'from ₹9,000 / video',
    icon: Video,
    features: ['Up to 60 seconds, reel or ad format', 'AI avatar or voiceover', 'Subtitles and background music', 'Two rounds of revisions'],
  },
  {
    title: 'Site audit & rescue',
    price: 'from $175',
    priceINR: 'from ₹15,000',
    icon: ShieldCheck,
    features: ['Indexing and soft-404 fixes', 'Mobile and layout bugs', 'Broken links, assets and previews', 'Written findings you keep'],
  },
  {
    title: 'Local SEO setup',
    price: 'from $120',
    priceINR: 'from ₹10,000',
    icon: MapPin,
    features: ['Name, address and phone made consistent', 'LocalBusiness schema with coordinates', 'Google Business Profile set up', 'Service-area pages'],
  },
  {
    title: 'Advice only',
    price: '$90 / hour',
    priceINR: '₹8,000 / hour',
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

/**
 * The running cost of an automation, said out loud.
 *
 * It is the question every enquiry eventually asks and the one most quotes
 * dodge: fine, but what does it cost me every month after you leave? The
 * figures match /blog/ai-workflow-automation-cost-small-business, which itemises
 * a real bill from a system I run rather than a market average.
 */
const N8N_RUNNING = [
  {
    label: 'n8n itself',
    cost: 'Free, self-hosted',
    note: 'Runs on a ₹400–₹800/month VPS. n8n Cloud starts near ₹2,000/month if you would rather not run a server.',
  },
  {
    label: 'Google Sheets as the database',
    cost: 'Free',
    note: 'Your data stays in your own Drive, in a file you can open, edit and take with you.',
  },
  {
    label: 'The AI step',
    cost: '₹100–₹800 / month',
    note: 'Billed to your own API key. A daily report is one model call a day, not thousands.',
  },
  {
    label: 'Telegram, WhatsApp, email',
    cost: 'Free',
    note: 'Delivery over the channels you already use. No per-message fee on Telegram or Gmail.',
  },
];

const Pricing: React.FC = () => {
  const { currency, setCurrency } = useCurrency();
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

                <p className="mt-4 text-[13px] leading-relaxed text-muted">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    Not included &middot;{' '}
                  </span>
                  {pkg.excludes}
                </p>

                {/* Every card used to end without anything to click. Someone who
                    had decided on a tier had to scroll past the whole page to
                    find the single link at the bottom. */}
                <Link
                  to={`/contact?service=${encodeURIComponent(pkg.service)}`}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3 text-[14.5px] font-medium ${
                    pkg.popular ? 'btn-signal' : 'btn-ghost'
                  }`}
                >
                  Start this <ArrowRight size={15} />
                </Link>
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

      {/* What it costs to keep running, which is the question every quote dodges. */}
      <div className="mt-20">
        <SectionHeading
          eyebrow="Automation, in detail"
          title="What an n8n build costs you after I leave"
          lead="The build is a one-off. This is the bill that arrives every month afterwards — itemised, because it is usually smaller than people expect and nobody says so."
          align="center"
          className="mb-12"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {N8N_RUNNING.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.06}>
              <div className="panel flex h-full flex-col p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[16px] font-bold text-text">{row.label}</h3>
                  <span className="shrink-0 font-mono text-[13px] text-signal">{row.cost}</span>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-textSecondary">{row.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="panel mt-4 p-8">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h3 className="font-display text-lg font-bold text-text">
                  Why n8n rather than Zapier or Make
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-textSecondary">
                  Zapier and Make charge per task, so a workflow that runs often gets more
                  expensive the more useful it becomes. n8n is open source: self-hosted it costs
                  the price of a small server no matter how many times it runs, and the workflows
                  are yours — exportable, readable, and runnable without me. I use Zapier or
                  Make when they genuinely fit better, and I will say so.
                </p>
              </div>
              <ul className="space-y-3 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                {[
                  'Unlimited runs on a fixed server cost',
                  'Workflows export as JSON you own',
                  'Runs in your cloud account if data cannot leave it',
                  'Failures alert you rather than pass silently',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14.5px] text-textSecondary">
                    <Check size={16} className="mt-0.5 shrink-0 text-wire" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[14px] text-muted">
                A worked example, with a real bill:{' '}
                <Link
                  to="/blog/ai-workflow-automation-cost-small-business"
                  className="font-medium text-textSecondary underline decoration-wire/40 underline-offset-4 transition-colors hover:text-wire"
                >
                  what one workflow actually costs in India
                </Link>
              </p>
              <Link
                to="/contact?service=Automation%20setup%20(n8n%20%2F%20Make%20%2F%20Zapier)"
                className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3 text-[14.5px] font-medium"
              >
                Scope an automation <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </Reveal>
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
