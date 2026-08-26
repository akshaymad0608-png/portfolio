import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import type { NewsItem } from '../lib/news';

/**
 * The output of the news workflow described one section above, read live from
 * the sheet it writes to. The point of putting it here is that the internal
 * builds cannot be clicked — this is the one part of that stack a visitor can
 * actually watch working, so it is deliberately plain: a dated list, no chrome.
 *
 * Renders nothing at all when the feed is empty or unreachable. A section that
 * says "automation running daily" above an empty box argues against itself.
 */
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

  const latest = items[0].date;

  return (
    <section className="relative border-t border-border bg-panel py-20">
      <div className="container mx-auto max-w-shell px-6">
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-wire" />
            <span className="eyebrow">Live output</span>
          </div>
          <h2 className="font-display text-[30px] font-bold tracking-tightest text-text md:text-[38px]">
            What that workflow
            <br className="hidden md:block" /> pulled in this morning.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-textSecondary">
            Five AI blogs, polled at 9am, deduplicated and cut to the day&rsquo;s best. This list is read
            straight from the sheet the workflow writes to &mdash; nobody typed it, and if the run fails
            this section simply isn&rsquo;t here.
          </p>
        </Reveal>

        <ul className="mt-12 border-t border-border">
          {items.map((item, i) => (
            <Reveal key={item.link} delay={0.03 * i}>
              <li>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spotlight group grid gap-2 border-b border-border py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="min-w-0 text-[16px] leading-relaxed text-text transition-colors group-hover:text-wire">
                    {item.title}
                    <ArrowUpRight
                      size={14}
                      className="ml-1.5 inline-block shrink-0 -translate-y-px opacity-0 transition-opacity group-hover:opacity-100"
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

        {latest && (
          <Reveal>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Last collected {latest}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default AINewsFeed;
