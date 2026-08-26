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

const FEEDS = ['OpenAI', 'Meta AI', 'Microsoft AI', 'NVIDIA', 'Hugging Face'];

/** Feed box geometry, so the boxes and the wires that meet them cannot drift apart. */
const FEED_X = 196;
const FEED_W = 150;
const FEED_H = 34;
const FEED_TOP = 20;
const FEED_GAP = 72;
const feedCenter = (i: number) => FEED_TOP + i * FEED_GAP + FEED_H / 2;

/** Horizontal S-curve between two node edges, the way n8n draws its own wires. */
const wire = (x1: number, y1: number, x2: number, y2: number) =>
  `M ${x1} ${y1} C ${x1 + 44} ${y1}, ${x2 - 44} ${y2}, ${x2} ${y2}`;

/**
 * The workflow as it exists in n8n, redrawn in the site's own hairlines rather
 * than pasted in as a screenshot of somebody's dashboard: it stays sharp at any
 * width, costs nothing to load, and follows the theme instead of fighting it.
 */
const WorkflowDiagram: React.FC = () => (
  <div className="overflow-x-auto">
    <svg
      viewBox="0 0 900 380"
      className="h-auto w-full min-w-[620px] text-muted"
      role="img"
      aria-label="Workflow diagram: a 9am daily trigger fans out to five AI blog feeds, which merge into a filter and deduplicate step, which writes to Google Sheets and sends a Telegram digest."
    >
      <g fill="none" stroke="var(--wire)" strokeWidth="1.25">
        {FEEDS.map((f, i) => (
          <path key={f} d={wire(126, 188, FEED_X, feedCenter(i))} />
        ))}
        {FEEDS.map((f, i) => (
          <path key={`${f}-out`} d={wire(FEED_X + FEED_W, feedCenter(i), 430, 188)} />
        ))}
        <path d="M 540 188 H 596" />
        <path d={wire(726, 188, 782, 129)} />
        <path d={wire(726, 188, 782, 247)} />
      </g>

      <g fill="none" stroke="var(--line-strong)" strokeWidth="1">
        <rect x="8" y="168" width="118" height="40" />
        {FEEDS.map((f, i) => (
          <rect key={f} x={FEED_X} y={FEED_TOP + i * FEED_GAP} width={FEED_W} height={FEED_H} />
        ))}
        <rect x="430" y="168" width="110" height="40" />
        <rect x="596" y="168" width="130" height="40" />
        <rect x="782" y="112" width="112" height="34" />
        <rect x="782" y="230" width="112" height="34" />
      </g>

      <g
        className="font-mono"
        fill="currentColor"
        fontSize="11"
        letterSpacing="1.4"
        textAnchor="middle"
      >
        <text x="67" y="193">09:00 DAILY</text>
        {FEEDS.map((f, i) => (
          <text key={f} x={FEED_X + FEED_W / 2} y={feedCenter(i) + 4}>
            {f.toUpperCase()}
          </text>
        ))}
        <text x="485" y="193">MERGE</text>
        <text x="661" y="193">24H · DEDUPE</text>
        <text x="838" y="133">SHEET</text>
        <text x="838" y="251">TELEGRAM</text>
      </g>
    </svg>
  </div>
);

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
          <div className="mt-10">
            <WorkflowDiagram />
          </div>
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
