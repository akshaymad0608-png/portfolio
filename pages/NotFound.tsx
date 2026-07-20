import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const SUGGESTIONS = [
  { label: 'Case studies', to: '/work', note: 'Four products, all live' },
  { label: 'Services', to: '/services', note: 'What I take on, and what it costs' },
  { label: 'Contact', to: '/contact', note: 'Reply within one working day' },
];

/**
 * The router previously had no catch-all, so a typo'd or stale URL rendered the
 * chrome with an empty middle — no heading, no way back, and nothing telling a
 * crawler the page was missing.
 */
const NotFound: React.FC = () => (
  <PageTransition>
    <SEO title="Page not found | Akshay Mahajan" description="That page doesn't exist." noindex />

    <section className="relative flex min-h-[78vh] items-center overflow-hidden py-24">
      <div className="absolute inset-0 blueprint blueprint-fade pointer-events-none" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(169,166,255,0.10), transparent)' }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto max-w-shell px-6">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-wire/50" />
            <span className="eyebrow">Error 404</span>
          </div>

          <h1 className="font-display text-[38px] font-bold leading-[1.05] tracking-tightest text-text md:text-[54px]">
            This wire doesn't
            <br />
            go anywhere.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-textSecondary">
            The page you asked for isn't here — it may have moved, or the link may
            have been mistyped. Here's where most people are heading:
          </p>

          <ul className="mt-9 border-t border-border">
            {SUGGESTIONS.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="group flex items-center justify-between gap-4 border-b border-border py-5 transition-colors hover:bg-cards/40"
                >
                  <span>
                    <span className="font-display text-lg font-semibold text-text">{s.label}</span>
                    <span className="mt-0.5 block text-sm text-muted">{s.note}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-wire"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/"
            className="btn-signal mt-9 inline-flex items-center gap-2 px-6 py-3 text-[15px]"
          >
            Back to the homepage <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  </PageTransition>
);

export default NotFound;
