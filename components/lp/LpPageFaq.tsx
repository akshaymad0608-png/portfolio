import React from 'react';
import { HelpCircle, Plus } from 'lucide-react';
import manifest from '../../site.routes.json';
import { Pill, Reveal } from './ui';

type RouteEntry = { path: string; pageFaq?: { q: string; a: string }[] };

/**
 * The questions for a page, read from site.routes.json — the same source the
 * prerender uses for the page's FAQPage JSON-LD and its static HTML, so what a
 * crawler reads in the markup is what a visitor sees here. Structured data has
 * to describe content that is actually on the page.
 *
 * Native <details> keeps every answer in the DOM (nothing is injected on
 * click), works without JavaScript and is keyboard accessible by default.
 */
const LpPageFaq: React.FC<{ path: string }> = ({ path }) => {
  const route = (manifest.routes as RouteEntry[]).find((r) => r.path === path);
  const items = route?.pageFaq ?? [];
  if (!items.length) return null;

  return (
    <section className="relative py-20 md:py-24" aria-labelledby="page-faq-title">
      <div className="mx-auto max-w-[820px] px-6">
        <Reveal>
          <Pill icon={<HelpCircle size={13} aria-hidden="true" />}>FAQ</Pill>
          <h2
            id="page-faq-title"
            className="mt-5 font-lp text-[36px] font-normal leading-[1.05] tracking-[-0.02em] text-lp-ink sm:text-[46px]"
          >
            Frequently asked questions
          </h2>
        </Reveal>
        <div className="mt-9 divide-y divide-lp-line rounded-[24px] border border-lp-line bg-white">
          {items.map((f) => (
            <details key={f.q} className="group px-6 py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-semibold text-lp-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lp-bg text-lp-body transition-transform group-open:rotate-45 group-open:bg-lp-blue group-open:text-white">
                  <Plus size={15} aria-hidden="true" />
                </span>
              </summary>
              <p className="pb-5 text-[15px] leading-[1.7] text-lp-body">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LpPageFaq;
