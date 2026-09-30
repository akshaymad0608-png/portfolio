import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, CircleHelp, MessageCircle, TriangleAlert, X } from 'lucide-react';
import Reveal from './ui/Reveal';
import type { AuditCheck, AuditResult, CheckStatus } from '../lib/audit';

const fieldClass =
  'w-full rounded-xl border border-border bg-ink px-4 py-3.5 text-[15px] text-text placeholder-muted transition-colors focus:border-wire/50 focus:outline-none';

/**
 * Status is carried by an icon and a word as well as a colour, and the palette
 * has one accent, so "fix" is not red: it is the heaviest treatment, not a
 * different hue.
 */
const STATUS: Record<CheckStatus, { word: string; icon: React.ReactNode; tone: string }> = {
  pass: { word: 'Good', icon: <Check size={15} aria-hidden="true" />, tone: 'text-wire' },
  warn: { word: 'Improve', icon: <TriangleAlert size={15} aria-hidden="true" />, tone: 'text-text' },
  fail: { word: 'Fix', icon: <X size={15} aria-hidden="true" />, tone: 'font-bold text-text' },
  unknown: { word: 'Not measurable', icon: <CircleHelp size={15} aria-hidden="true" />, tone: 'text-muted' },
};

const grade = (score: number) =>
  score >= 80 ? 'A strong foundation' : score >= 55 ? 'Room to grow' : 'Likely losing enquiries';

const hostOf = (r: AuditResult) => {
  try {
    return new URL(r.finalUrl).hostname;
  } catch {
    return r.finalUrl;
  }
};

/**
 * The contact page already accepts `?service=` and `?details=` and shows the
 * details in a box the sender can edit, so the enquiry arrives saying what was
 * found instead of "hi, how much". The service value must match its list
 * exactly or it is ignored there.
 */
const contactHref = (r: AuditResult) => {
  const lines = [
    `Website audit for ${hostOf(r)}${r.score !== null ? `: ${r.score}/100` : ''}.`,
    '',
    'Top issues found:',
    ...r.priorities.map((c) => `- ${c.label}: ${c.evidence}`),
    '',
    "I'd like a quote to fix these.",
  ];
  const service = r.priorities.some((c) => c.id === 'chat') ? 'AI agent or chatbot' : 'Website / web app build';
  return `/contact?${new URLSearchParams({ service, details: lines.join('\n').slice(0, 1150) })}`;
};

const whatsappHref = (r: AuditResult) =>
  `https://wa.me/917600885080?text=${encodeURIComponent(
    `Hi Akshay, I ran the website audit for ${hostOf(r)}${r.score !== null ? ` and got ${r.score}/100` : ''}. Can you help me fix the issues?`,
  )}`;

const StatusTag: React.FC<{ status: CheckStatus }> = ({ status }) => (
  <span className={`inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.12em] ${STATUS[status].tone}`}>
    {STATUS[status].icon}
    {STATUS[status].word}
  </span>
);

const CheckRow: React.FC<{ check: AuditCheck }> = ({ check }) => (
  <details className="group border-b border-border last:border-b-0" open={check.status === 'fail' || check.status === 'warn'}>
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold text-text">{check.label}</span>
        <span className="mt-1 block sm:hidden">
          <StatusTag status={check.status} />
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-5">
        <span className="hidden sm:block">
          <StatusTag status={check.status} />
        </span>
        <span className="w-12 text-right font-mono text-[13px] text-textSecondary">
          {check.status === 'unknown' ? '–' : `${check.earned}/${check.max}`}
        </span>
      </span>
    </summary>
    <div className="space-y-2 pb-5 text-[14.5px] leading-relaxed">
      <p className="text-text">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Found </span>
        {check.evidence}
      </p>
      {check.status !== 'pass' && check.status !== 'unknown' && (
        <>
          <p className="text-textSecondary">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Why it matters </span>
            {check.why}
          </p>
          <p className="text-textSecondary">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Fix </span>
            {check.fix}
          </p>
        </>
      )}
    </div>
  </details>
);

const Results: React.FC<{ result: AuditResult }> = ({ result }) => {
  const partial = result.measurableMax < 100;
  return (
    <div className="mt-10 space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="panel ticked p-8">
          <p className="eyebrow">Score for {hostOf(result)}</p>
          {result.score !== null ? (
            <>
              <p className="mt-5 font-display text-[72px] font-bold leading-none tracking-tightest text-text">
                {result.score}
                <span className="ml-1 text-[28px] text-muted">/100</span>
              </p>
              <p className={`mt-3 text-lg font-semibold ${result.score >= 80 ? 'text-wire' : 'text-text'}`}>{grade(result.score)}</p>
            </>
          ) : (
            <p className="mt-5 text-lg font-semibold text-text">Not enough of this page could be measured to give a score.</p>
          )}
          <p className="mt-5 font-mono text-[12px] leading-relaxed text-muted">
            HTTP {result.httpStatus} · page arrived in {result.responseMs} ms · {result.htmlKb} KB of HTML
            {partial && (
              <>
                <br />
                Scored on {result.measurableMax} of 100 points; the rest could not be measured.
              </>
            )}
          </p>
        </div>

        <div className="panel p-8">
          <h3 className="eyebrow">Where the points went</h3>
          <ul className="mt-6 space-y-5">
            {result.categories.map((c) => (
              <li key={c.id}>
                <div className="mb-2 flex items-baseline justify-between gap-3 text-[14.5px]">
                  <span className="font-semibold text-text">{c.label}</span>
                  <span className="font-mono text-[13px] text-textSecondary">
                    {c.measurable === 0 ? 'not measurable' : `${c.earned}/${c.measurable}`}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-frame" role="img" aria-label={`${c.label}: ${c.earned} of ${c.measurable} points`}>
                  <div className="h-full bg-wire" style={{ width: `${c.measurable ? (c.earned / c.measurable) * 100 : 0}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="panel p-8">
        <h3 className="eyebrow">Fix these first</h3>
        {result.priorities.length > 0 ? (
          <ol className="mt-6 space-y-6">
            {result.priorities.map((c, i) => (
              <li key={c.id} className="grid grid-cols-[2.25rem_1fr] gap-x-2">
                <span className="font-mono text-2xl font-bold text-wire">{i + 1}</span>
                <div>
                  <p className="text-[17px] font-semibold text-text">{c.label}</p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-text">{c.evidence}</p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-textSecondary">
                    <span className="font-semibold text-text">Fix: </span>
                    {c.fix}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-5 text-[15px] text-textSecondary">Nothing urgent on the pages I could check. The full list is below.</p>
        )}
      </div>

      <div className="panel ticked flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h3 className="font-display text-2xl font-bold tracking-tightest text-text">Want these fixed?</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-textSecondary">
            Send me this report. I reply within one working day with a fixed quote, or tell you plainly if a fix is not worth paying for.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link to={contactHref(result)} className="btn-signal inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px]">
            Send me this audit <ArrowRight size={17} />
          </Link>
          <a
            href={whatsappHref(result)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-medium"
          >
            <MessageCircle size={17} /> WhatsApp me
          </a>
        </div>
      </div>

      <div className="panel px-8 pt-8 pb-3">
        <h3 className="eyebrow">Every check, with what I found</h3>
        <div className="mt-4">
          {result.categories.map((cat) => (
            <section key={cat.id} className="mt-6 first:mt-0">
              <h4 className="mb-1 border-b border-text pb-2 font-display text-[17px] font-bold text-text">{cat.label}</h4>
              {result.checks
                .filter((c) => c.category === cat.id)
                .map((c) => (
                  <CheckRow key={c.id} check={c} />
                ))}
            </section>
          ))}
        </div>
      </div>

      <ul className="space-y-1.5 px-1 text-[13.5px] leading-relaxed text-muted">
        {result.limitations.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
};

const AuditTool: React.FC = () => {
  const [address, setAddress] = useState('');
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === 'loading' || !address.trim()) return;
    setPhase('loading');
    setError(null);

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 25_000);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: address.trim() }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) {
        setError(data?.error || 'The audit did not go through. Please try again.');
        setPhase('error');
        return;
      }
      setResult(data as AuditResult);
      setPhase('done');
      requestAnimationFrame(() => headingRef.current?.focus());
    } catch {
      setError(
        ctrl.signal.aborted
          ? 'That took too long. The site may be slow or blocking me. Try again, or message me and I will audit it by hand.'
          : 'The audit did not go through. Check your connection and try again.',
      );
      setPhase('error');
    } finally {
      clearTimeout(timer);
    }
  };

  return (
    <section className="relative pb-24" aria-labelledby="audit-heading">
      <div className="container mx-auto max-w-shell px-6">
        <Reveal>
          <form onSubmit={run} className="panel ticked p-6 md:p-8" noValidate>
            <h2 id="audit-heading" className="font-display text-2xl font-bold tracking-tightest text-text">
              Check your website
            </h2>
            <label htmlFor="audit-url" className="mt-5 mb-2 block text-[14px] font-medium text-textSecondary">
              Your website address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="audit-url"
                name="url"
                type="text"
                inputMode="url"
                autoCapitalize="none"
                autoComplete="url"
                spellCheck={false}
                placeholder="yourbusiness.com"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                aria-describedby="audit-note audit-error"
                aria-invalid={phase === 'error'}
                className={fieldClass}
              />
              <button
                type="submit"
                disabled={phase === 'loading' || !address.trim()}
                className="btn-signal inline-flex shrink-0 items-center justify-center gap-2 px-7 py-3.5 text-[15px] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {phase === 'loading' ? 'Checking…' : 'Run free audit'}
                {phase !== 'loading' && <ArrowRight size={17} />}
              </button>
            </div>
            <p id="audit-note" className="mt-3 text-[13px] leading-relaxed text-muted">
              I request your public homepage once, plus robots.txt and sitemap.xml. Nothing is stored. Takes about ten seconds.
            </p>
            <div id="audit-error" aria-live="polite">
              {phase === 'loading' && (
                <p role="status" className="mt-4 flex items-center gap-2.5 text-[14.5px] text-textSecondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-wire pulse-soft" /> Checking your site…
                </p>
              )}
              {phase === 'error' && error && (
                <p role="alert" className="mt-4 border-l-2 border-text pl-3 text-[14.5px] text-text">
                  {error}
                </p>
              )}
            </div>
          </form>
        </Reveal>

        {phase === 'done' && result && (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="sr-only">
              Audit results for {hostOf(result)}
            </h2>
            <Results result={result} />
          </>
        )}
      </div>
    </section>
  );
};

export default AuditTool;
