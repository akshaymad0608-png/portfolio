import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Tag } from 'lucide-react';
import { PACKAGES } from '../../lib/pricing';
import { useCurrency } from '../../lib/currency';
import { Reveal, SectionHead } from './ui';

const LpPricing: React.FC = () => {
  const { currency, setCurrency } = useCurrency();
  const amount = (p: { price: string; priceINR: string }) => (currency === 'INR' ? p.priceINR : p.price);

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-6">
        <SectionHead
          pill="Pricing"
          icon={<Tag size={13} aria-hidden="true" />}
          title="A fixed price, before we start."
          lead="Per project, not per hour. You see the number first, and every project includes 30 days of bug fixes."
        />

        <Reveal className="mt-8 flex justify-center">
          <div role="group" aria-label="Currency" className="inline-flex rounded-full border border-lp-line bg-white p-1">
            {(['USD', 'INR'] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={currency === c}
                onClick={() => setCurrency(c)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                  currency === c ? 'bg-lp-ink text-white' : 'text-lp-body hover:text-lp-ink'
                }`}
              >
                {c === 'USD' ? '$ USD' : '₹ INR'}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => {
            const hot = pkg.popular;
            return (
              <Reveal key={pkg.title} delay={i * 0.06} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-[26px] p-7 ${
                    hot
                      ? 'bg-lp-blue text-white shadow-[0_40px_80px_-36px_rgba(31,91,255,0.7)]'
                      : 'border border-lp-line bg-white text-lp-ink'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[15px] font-semibold">{pkg.title}</p>
                    {hot && (
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold">Popular</span>
                    )}
                  </div>
                  <p className="mt-6 font-lp text-[54px] leading-none tracking-[-0.02em]">{amount(pkg)}</p>
                  <p className={`mt-2 text-[13.5px] ${hot ? 'text-white/75' : 'text-lp-muted'}`}>Delivery {pkg.delivery}</p>
                  <p className={`mt-4 text-[15px] leading-[1.6] ${hot ? 'text-white/85' : 'text-lp-body'}`}>{pkg.desc}</p>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[14.5px] leading-snug">
                        <Check size={16} className={`mt-0.5 shrink-0 ${hot ? 'text-white' : 'text-lp-blue'}`} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <p className={`mt-6 text-[12.5px] leading-[1.5] ${hot ? 'text-white/70' : 'text-lp-muted'}`}>{pkg.excludes}</p>
                  <Link
                    to={`/contact?service=${encodeURIComponent(pkg.service)}`}
                    className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-all hover:-translate-y-0.5 ${
                      hot ? 'bg-white text-lp-ink hover:bg-lp-tint' : 'bg-lp-blue text-white hover:bg-lp-deep'
                    }`}
                  >
                    Start this project <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-9 text-center">
          <Link to="/pricing" className="inline-flex items-center gap-2 text-[15px] font-semibold text-lp-blue hover:text-lp-deep">
            Full pricing, retainers and automation plans <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default LpPricing;
