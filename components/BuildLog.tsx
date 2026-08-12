import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { GitBranch, Star, GitCommit, ArrowUpRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const GITHUB_USER = 'akshaymad0608-png';

/**
 * The build log: real GitHub activity, pulled live.
 *
 * A portfolio claims things; a contribution graph shows them. Everything here
 * comes from GitHub's own API at request time — nothing is hand-typed, so it
 * cannot drift out of date or overstate the work.
 */

type Summary = { repos: number | null; stars: number | null; contributions: number | null };

const BuildLog: React.FC = () => {
  const [summary, setSummary] = useState<Summary>({ repos: null, stars: null, contributions: null });
  // The public contributions API is rate-limited and goes down now and then.
  // We probe it ourselves and only mount the calendar when it answers —
  // otherwise the widget prints its own raw error onto the page.
  const [calendarOk, setCalendarOk] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
        ]);
        const user = userRes.ok ? await userRes.json() : null;
        const repos = reposRes.ok ? await reposRes.json() : [];
        const stars = Array.isArray(repos)
          ? repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0)
          : null;
        if (!cancelled) {
          setSummary((s) => ({ ...s, repos: user?.public_repos ?? null, stars }));
        }
      } catch {
        /* rate-limited or offline — the tiles just stay quiet */
      }

      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`);
        if (res.ok) {
          const data = await res.json();
          const total =
            data?.total && typeof data.total === 'object'
              ? (Object.values(data.total) as number[]).reduce((a, b) => a + b, 0)
              : null;
          if (!cancelled) {
            setSummary((s) => ({ ...s, contributions: total }));
            setCalendarOk(true);
          }
        } else if (!cancelled) {
          setCalendarOk(false);
        }
      } catch {
        if (!cancelled) setCalendarOk(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const tiles = [
    { icon: GitCommit, value: summary.contributions, label: 'contributions', note: 'last 12 months' },
    { icon: GitBranch, value: summary.repos, label: 'public repos', note: 'shipped and open' },
    { icon: Star, value: summary.stars, label: 'stars earned', note: 'across all repos' },
  ];

  return (
    <section className="relative py-24 md:py-32" aria-labelledby="build-log-heading">
      <div className="container mx-auto max-w-shell px-6">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Build log"
            title={
              <span id="build-log-heading">
                Not a claim.
                <br className="hidden md:block" /> A commit history.
              </span>
            }
            lead="Pulled live from GitHub every time this page loads. Green squares are days something actually shipped."
          />
          <Reveal delay={0.15}>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 py-1 text-sm font-medium text-textSecondary transition-colors hover:text-wire"
            >
              @{GITHUB_USER}
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="panel ticked overflow-hidden">
            {/* window chrome, matching the flow canvas */}
            <div className="flex items-center justify-between border-b border-border bg-frame px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-wire pulse-soft" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-textSecondary">
                  github.activity
                </span>
              </div>
              <span className="font-mono text-[11px] text-wire">live</span>
            </div>

            <div className="overflow-x-auto p-5 md:p-7">
              {calendarOk === false ? (
                <p className="py-6 text-center font-mono text-[12px] text-muted">
                  GitHub is not answering right now — the numbers below are still live.
                </p>
              ) : (
                <div className="min-w-[680px]">
                  <GitHubCalendar
                    username={GITHUB_USER}
                    colorScheme="light"
                    theme={{ light: ['#F1F1F3', '#D9D6F8', '#B3ADF0', '#8078E8', '#4F46E5'] }}
                    fontSize={12}
                    blockSize={11}
                    blockMargin={3}
                    labels={{ totalCount: '{{count}} contributions in the last year' }}
                    errorMessage="GitHub is not answering right now."
                  />
                </div>
              )}
            </div>

            <dl className="grid gap-px border-t border-border bg-border sm:grid-cols-3">
              {tiles.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.label} className="bg-panel px-5 py-5">
                    <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                      <Icon size={13} className="text-wire" aria-hidden="true" />
                      {t.label}
                    </dt>
                    <dd className="mt-2 font-display text-3xl font-bold leading-none text-text">
                      {t.value === null ? <span className="text-muted">—</span> : t.value.toLocaleString()}
                    </dd>
                    <p className="mt-1.5 font-mono text-[11px] text-muted">{t.note}</p>
                  </div>
                );
              })}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default BuildLog;
