import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const currency = (n: number) => `$${n.toLocaleString()}`;

const ROICalculator: React.FC = () => {
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(50);

  const monthly = hours * rate * 4;
  const yearly = monthly * 12;

  return (
    <section className="relative border-y border-border bg-panel py-24 md:py-32">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="Rough maths"
          title="What the manual version is costing you"
          lead="Move the sliders to your own numbers. This is a back-of-envelope figure, not a quote."
          align="center"
          className="mb-14"
        />

        <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="panel h-full space-y-10 p-8">
              <div>
                <div className="mb-1 flex items-end justify-between">
                  <label htmlFor="roi-hours" className="text-[15px] font-semibold text-text">
                    Hours on manual work
                  </label>
                  <span className="font-mono text-2xl font-bold text-wire">{hours}h</span>
                </div>
                <p className="mb-5 text-[13.5px] text-muted">
                  Per week, across the team — data entry, replies, reporting.
                </p>
                <input
                  id="roi-hours"
                  type="range" min={5} max={100} step={5}
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="range-wire"
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] text-muted">
                  <span>5h</span><span>100h</span>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-end justify-between">
                  <label htmlFor="roi-rate" className="text-[15px] font-semibold text-text">
                    Cost of an hour
                  </label>
                  <span className="font-mono text-2xl font-bold text-wire">${rate}</span>
                </div>
                <p className="mb-5 text-[13.5px] text-muted">
                  Loaded hourly cost of whoever is doing it now.
                </p>
                <input
                  id="roi-rate"
                  type="range" min={15} max={200} step={5}
                  value={rate}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                  className="range-wire"
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] text-muted">
                  <span>$15</span><span>$200</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel ticked flex h-full flex-col p-8">
              <span className="eyebrow">Recovered per year</span>
              <div className="mt-3 font-display text-[46px] font-bold leading-none tracking-tightest text-signal md:text-[56px]">
                {currency(yearly)}
              </div>

              <dl className="mt-8 space-y-3 border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <dt className="text-[14.5px] text-textSecondary">Monthly cost of doing it by hand</dt>
                  <dd className="font-mono text-[15px] font-semibold text-text">{currency(monthly)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[14.5px] text-textSecondary">Hours back per month</dt>
                  <dd className="font-mono text-[15px] font-semibold text-text">{hours * 4} hrs</dd>
                </div>
              </dl>

              <p className="mt-6 rounded-xl border border-border bg-ink p-4 text-[13.5px] leading-relaxed text-muted">
                Automation won't recover all of it — plan on 60–80% for a well-scoped workflow, and
                a build cost paid once against a saving that repeats.
              </p>

              <Link
                to="/contact"
                className="btn-signal mt-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px]"
              >
                Get a real number for your case <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
