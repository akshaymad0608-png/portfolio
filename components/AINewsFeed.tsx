import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import type { NewsItem } from '../lib/news';

/**
 * The output of the news workflow described one section above, read live from
 * the sheet it writes to. The internal builds cannot be clicked, so this is the
 * one part of that stack a visitor can actually check — which only works if the
 * checking is obvious:
 *
 *  - the pipeline strip says what ran, so the list reads as output and not as a
 *    hand-picked reading list;
 *  - the freshness line is stated up top, in words, because "2026-08-26" in
 *    small type at the bottom proves nothing to someone skimming;
 *  - every row is visibly a link, arrow always shown. The arrow used to appear
 *    on hover, which meant it never appeared on a phone at all.
 *
 * Renders nothing when the feed is empty or unreachable. A section that says
 * "automation running daily" above an empty box argues against itself.
 */

const STEPS = ['5 AI blogs', 'last 24h', 'deduplicated', 'top 8', 'sheet + Telegram'];

/** "2026-08-26" -> "today" / "yesterday" / "on 26 Aug". */
function describeCollected(date: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;

  const then = new Date(`${date}T00:00:00`);
  if (Number.isNaN(then.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Math.round((today.getTime() - then.getTime()) / 86_400_000);
  if (days <= 0) return 'this morning';
  if (days === 1) return 'yesterday morning';

  return `on ${then.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
}

const AINewsFeed: React.FC = () => {
  const [items, setItems] = useState<NewsItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/news')
      .then((res) => (res.ok ? res.json() : { items: [] }))
      .then((data) => {
        if (!cancelled) setItems(Array.isArray(data?.items) ? data.items : []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // null = still loading, [] = nothing to show. Neither deserves a heading.
  if (!items || items.length === 0) return null;

  const collected = describeCollected(items[0].date);

  return (
    <section className="relative border-t border-border bg-panel py-20">
      <div className="container mx-auto max-w-shell px-6">
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-wire" />
            <span className="eyebrow">Live output</span>
          </div>
          <h2 className="font-display text-[30px] font-bold tracking-tightest text-text md:text-[38px]">
            Not a screenshot.
            <br className="hidden md:block" /> This ran {collected ?? 'today'}.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-textSecondary">
            One of the workflows above wakes at 9am, reads five AI blogs, throws out anything older
            than a day or already seen, and files what is left. The headlines below are pulled from
            the sheet it wrote to &mdash; open any of them and check. Nobody typed this list, and if
            the run fails, this section is simply not here.
          </p>
        </Reveal>

        {/* What ran, in order. Without it the list reads as a reading list. */}
        <Reveal delay={0.05}>
          <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="text-wire">&rarr;</span>}
                <span className="border border-border px-2.5 py-1 text-textSecondary">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <ul className="mt-10 border-t border-border">
          {items.map((item, i) => (
            <Reveal key={item.link} delay={0.03 * i}>
              <li>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spotlight group grid gap-1.5 border-b border-border py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="min-w-0 text-[16px] leading-relaxed text-text underline decoration-border underline-offset-[6px] transition-colors group-hover:text-wire group-hover:decoration-wire">
                    {item.title}
                    <ArrowUpRight
                      size={14}
                      className="ml-1.5 inline-block shrink-0 -translate-y-px text-wire"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:text-right">
                    {item.source}
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AINewsFeed;
