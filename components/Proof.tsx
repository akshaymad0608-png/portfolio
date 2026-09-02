import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';

/**
 * What replaced the testimonials.
 *
 * The three quotes that used to sit here were written by me, attributed to
 * "E-commerce Founder" and "Marketing Director", and illustrated with stock
 * portraits. Anyone deciding whether to hire a developer recognises that in a
 * second, and once they do they stop believing the true things on the page too
 * — the million Photo Resizer users, the 640-tool directory, all of it.
 *
 * So this section says nothing about me. It lists what is running, with the
 * numbers each product actually reports, and a link on every card. The claim
 * and the way to check it sit next to each other.
 */

/** Live products, most externally verifiable first. */
const PROOF_IDS = [3, 1, 2, 5];

const Proof: React.FC<{ showMore?: boolean }> = ({ showMore = false }) => {
  const items = PROOF_IDS
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p && p.link));

  return (
    <section className="relative border-y border-border bg-panel py-24 md:py-32">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="Proof"
          title="Everything below is live. Go click it."
          align="center"
          className="mb-14"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <SpotlightCard className="flex h-full flex-col p-7">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-wire">
                    {p.stat}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-text">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-textSecondary">
                    {p.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 border-t border-border pt-5 font-mono text-[11.5px] text-muted transition-colors group-hover:text-wire">
                    {p.link?.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </SpotlightCard>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="max-w-xl text-center text-[13.5px] leading-relaxed text-muted">
              I&rsquo;d rather show you working software than quote a client who can&rsquo;t be
              named. Every product here was built solo, end to end &mdash; and I&rsquo;m happy to
              walk you through the code behind any of them.
            </p>
            {showMore && (
              <Link
                to="/work"
                className="group inline-flex min-h-[28px] items-center gap-2 py-1 text-sm font-medium text-textSecondary transition-colors hover:text-wire"
              >
                See how each one was built
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Proof;
