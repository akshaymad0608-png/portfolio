import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './ui/Reveal';

/**
 * Sits between the hero and the services grid. The page previously went straight
 * from "here's me" to "here's my service list", which asks visitors to self-diagnose.
 * This names the symptom first so they recognise themselves before reading a menu.
 */

const PAINS = [
  {
    pain: 'Someone re-types the same order into three different tools every morning.',
    cost: 'Two hours a day, and a typo nobody catches until the client does.',
  },
  {
    pain: 'Leads sit unread overnight and go cold before anyone replies.',
    cost: 'The fastest reply usually wins the job. Yours arrives at 10am.',
  },
  {
    pain: 'Your best person spends every Friday assembling a report by hand.',
    cost: 'A full day of your most expensive salary, copying numbers between tabs.',
  },
  {
    pain: 'You pay for the AI tools already. Nothing is wired to anything.',
    cost: 'Subscriptions going out, no work coming back.',
  },
];

const Problem: React.FC = () => (
  <section className="relative border-t border-border bg-panel py-24 md:py-32">
    <div className="container mx-auto max-w-shell px-6">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* framing */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-wire/50" />
              <span className="eyebrow">The usual suspects</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[32px] font-bold leading-[1.08] tracking-tightest text-text md:text-[44px]">
              Any of this
              <br />
              sound familiar?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-textSecondary">
              None of these are technology problems. They're the same small task repeating
              until it quietly eats a salary. That's the kind of thing worth wiring up.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-2 font-medium text-wire transition-colors hover:text-signal"
            >
              Tell me which one is yours
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* the symptoms */}
        <ul className="border-t border-border">
          {PAINS.map((item, i) => (
            <Reveal key={item.pain} delay={0.06 * i}>
              <li className="group relative border-b border-border py-7 pl-6 transition-colors duration-300 hover:bg-cards/40 md:pl-8">
                <span
                  className="absolute left-0 top-0 h-full w-[2px] scale-y-0 bg-wire transition-transform duration-300 ease-out group-hover:scale-y-100"
                  style={{ transformOrigin: 'top' }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 font-display text-[19px] font-semibold leading-snug text-text md:text-[21px]">
                  {item.pain}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-textSecondary">{item.cost}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Problem;
