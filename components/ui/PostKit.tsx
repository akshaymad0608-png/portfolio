import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import FinalCTA from '../FinalCTA';
import PageHero from './PageHero';

/**
 * Shared building blocks for blog posts.
 *
 * The first two posts each carry their own copy of these. New posts use this
 * file so the typography stays identical and a change is made once.
 *
 * A post still declares its own `FAQS` array as a plain literal: the
 * prerender script reads it straight out of the source file to emit the
 * FAQPage markup, so it cannot be built from variables here.
 */

export const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="mt-14 font-display text-[26px] font-bold tracking-tightest text-text md:text-[30px]">
    {children}
  </h2>
);

export const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="mt-10 font-display text-[20px] font-bold text-text">{children}</h3>
);

export const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mt-5 text-[17px] leading-[1.75] text-textSecondary">{children}</p>
);

export const UL: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul className="mt-6 space-y-4 text-[17px] leading-[1.7] text-textSecondary">{children}</ul>
);

export const LI: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <li className="border-l border-border pl-5">
    {title && <strong className="font-semibold text-text">{title} </strong>}
    {children}
  </li>
);

/** Inline internal link. Keep the anchor text to two to five words. */
export const A: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link
    className="underline decoration-border underline-offset-4 hover:text-wire hover:decoration-wire"
    to={to}
  >
    {children}
  </Link>
);

export const Callout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <aside className="mt-8 rounded-[4px] border border-border bg-panel px-6 py-5">
    <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-wire">{title}</p>
    <div className="mt-2 text-[16.5px] leading-[1.7] text-textSecondary">{children}</div>
  </aside>
);

export const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="mt-6 overflow-x-auto rounded-[4px] border border-border bg-panel p-5 font-mono text-[13.5px] leading-[1.7] text-text">
    <code>{children}</code>
  </pre>
);

export const Faq: React.FC<{ items: { q: string; a: string }[] }> = ({ items }) => (
  <>
    <H2>Frequently asked questions</H2>
    <dl className="mt-6 border-t border-border">
      {items.map((f) => (
        <div key={f.q} className="border-b border-border py-6">
          <dt className="text-[17px] font-semibold text-text">{f.q}</dt>
          <dd className="mt-2 text-[17px] leading-[1.75] text-textSecondary">{f.a}</dd>
        </div>
      ))}
    </dl>
  </>
);

/** Short anchor labels (two to five words) for the related-reading list. */
const ALL_POSTS: { to: string; label: string; blurb: string }[] = [
  { to: '/blog/ai-workflow-automation-cost-small-business', label: 'Automation cost in India', blurb: 'What one workflow costs to build and to run.' },
  { to: '/blog/llm-optimization-cost-small-businesses-india', label: 'LLM optimization cost', blurb: 'Prompting, fine-tuning and RAG compared.' },
  { to: '/blog/n8n-crm-email-triage-workflow', label: 'n8n email triage build', blurb: 'Classify, log and alert, node by node.' },
  { to: '/blog/ai-agent-that-survives-real-users', label: 'AI agent launch checklist', blurb: 'Seven decisions before real users arrive.' },
  { to: '/blog/generative-ai-in-web-development', label: 'Generative AI in web dev', blurb: 'What it speeds up and what it breaks.' },
  { to: '/blog/website-for-surat-business-local-seo', label: 'Surat local SEO checklist', blurb: 'The basics that get a local business found.' },
];

interface PostShellProps {
  eyebrow: string;
  title: string;
  meta: string;
  lead: string;
  /** Path of this post, so it is left out of the related-reading list. */
  path?: string;
  children: React.ReactNode;
}

/** Article frame: eyebrow, h1, meta line, lead paragraph, body, back link, closing call to action. */
export const PostShell: React.FC<PostShellProps> = ({ eyebrow, title, meta, lead, path, children }) => (
  <>
    <article className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-shell px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-wire" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <h1 className="font-display text-[34px] font-bold leading-[1.15] tracking-tightest text-text md:text-[46px]">
              {title}
            </h1>
            <p className="mt-4 font-mono text-[11.5px] uppercase tracking-[0.16em] text-muted">{meta}</p>
            <p className="mt-8 border-l-2 border-wire pl-6 text-[19px] leading-[1.7] text-text">{lead}</p>
          </Reveal>

          {children}

          <Reveal>
            <H2>Keep reading</H2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {ALL_POSTS.filter((p) => p.to !== path)
                .slice(0, 3)
                .map((p) => (
                  <li key={p.to} className="border-l border-border pl-5">
                    <Link className="font-semibold text-text hover:text-wire" to={p.to}>
                      {p.label}
                    </Link>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-textSecondary">{p.blurb}</p>
                  </li>
                ))}
            </ul>
          </Reveal>

          <Reveal>
            <p className="mt-10 border-t border-border pt-6">
              <Link
                className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-muted hover:text-wire"
                to="/blog"
              >
                ← All writing
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </article>
    <FinalCTA />
  </>
);


interface LandingShellProps {
  eyebrow: string;
  title: string;
  lead: string;
  /** Primary action in the hero, always the same two: book a call and WhatsApp. */
  whatsappText: string;
  children: React.ReactNode;
}

/**
 * Frame for a keyword landing page: the standard page hero with a booking and
 * a WhatsApp button, the body in a reading column, and the closing call to
 * action. Prices and package details are imported from lib/ by the page, never
 * typed into the copy, so they cannot drift from the pricing page.
 */
export const LandingShell: React.FC<LandingShellProps> = ({ eyebrow, title, lead, whatsappText, children }) => (
  <>
    <PageHero eyebrow={eyebrow} title={title} lead={lead}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="https://calendly.com/akshaymad0608"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-signal inline-flex items-center justify-center px-6 py-3 text-[15px]"
        >
          Book a 20-minute call
        </a>
        <a
          href={`https://wa.me/917600885080?text=${encodeURIComponent(whatsappText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost inline-flex items-center justify-center px-6 py-3 text-[15px] font-medium"
        >
          WhatsApp me
        </a>
      </div>
    </PageHero>
    <section className="relative pb-16 md:pb-24">
      <div className="container mx-auto max-w-shell px-6">
        <div className="mx-auto max-w-3xl">{children}</div>
      </div>
    </section>
    <FinalCTA />
  </>
);
