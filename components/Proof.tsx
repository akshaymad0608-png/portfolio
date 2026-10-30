import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
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
 * second, and once they do they stop believing the true things on the page too.
 *
 * The same rule later took out "1M+ users" for Photo Resizer. It appeared ten
 * times across the site and nothing could back it: Search Console showed ~470
 * search clicks a month, the product itself states no figure, and neither does
 * the résumé. A number nobody can check is the first thing an interviewer asks
 * about, and a bad answer takes the true numbers down with it.
 *
 * So this section says nothing about me. It lists what is running, with the
 * numbers each product actually reports, and a link on every card. The claim
 * and the way to check it sit next to each other.
 */

/** Live products, most externally verifiable first. */
const PROOF_IDS = [3, 1, 2, 5];

type ProofItem = NonNullable<ReturnType<typeof PROJECTS.find>>;

const GAP = 20;
const AUTOPLAY_MS = 3200;
/** Card fills, cycled in order. Both are existing palette tokens. */
const TINTS = ['bg-panel', 'bg-wireDim/40', 'bg-section'];

const ProofCard: React.FC<{ p: ProofItem; tint: string }> = ({ p, tint }) => (
  <a href={p.link} target="_blank" rel="noopener noreferrer" className="group block h-full">
    <SpotlightCard className={`flex h-full flex-col p-7 ${tint}`}>
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-wire">{p.stat}</div>
      <h3 className="mt-3 font-display text-lg font-bold text-text">{p.title}</h3>
      <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-textSecondary">{p.description}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 border-t border-border pt-5 font-mono text-[11.5px] text-muted transition-colors group-hover:text-wire">
        {p.link?.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </SpotlightCard>
  </a>
);

/**
 * Cards slide left on a timer. The one that leaves tips over and sinks behind
 * the next, so the row reads as a stack being dealt rather than a belt. Pauses
 * under the pointer or keyboard focus; reduced-motion visitors get the plain
 * grid instead.
 */
const ProofCarousel: React.FC<{ items: ProofItem[] }> = ({ items }) => {
  const viewport = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLLIElement>(null);
  const inView = useInView(viewport, { margin: '-80px' });
  const [step, setStep] = useState(0);
  const [maxIndex, setMaxIndex] = useState(items.length - 1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !card.current) return;
      const s = card.current.offsetWidth + GAP;
      setStep(s);
      const fit = Math.max(1, Math.floor((viewport.current.offsetWidth + GAP) / s));
      setMaxIndex(Math.max(0, items.length - fit));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [items.length]);

  useEffect(() => setIndex((i) => Math.min(i, maxIndex)), [maxIndex]);

  const next = useCallback(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), [maxIndex]);
  const prev = useCallback(() => setIndex((i) => (i <= 0 ? maxIndex : i - 1)), [maxIndex]);

  useEffect(() => {
    if (paused || !inView || maxIndex === 0) return;
    const t = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [paused, inView, maxIndex, next]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div ref={viewport} className="-my-6 overflow-hidden py-6">
        <motion.ul
          className="flex list-none p-0"
          style={{ gap: GAP }}
          animate={{ x: -index * step }}
          transition={{ type: 'spring', stiffness: 140, damping: 24, mass: 0.9 }}
        >
          {items.map((p, i) => {
            const gone = i < index;
            return (
              <motion.li
                key={p.id}
                ref={i === 0 ? card : undefined}
                className="w-[78vw] max-w-[360px] shrink-0 sm:w-[340px]"
                style={{ transformOrigin: '0% 100%' }}
                animate={{
                  rotate: gone ? -9 : 0,
                  scale: gone ? 0.94 : 1,
                  y: gone ? 10 : 0,
                  opacity: gone ? 0.55 : 1,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              >
                <ProofCard p={p} tint={TINTS[i % TINTS.length]} />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      {maxIndex > 0 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous project"
            className="flex h-10 w-10 items-center justify-center border border-border text-textSecondary transition-colors hover:border-wire hover:text-wire"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex gap-2" aria-hidden="true">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <span
                key={i}
                className={`h-1.5 transition-all duration-300 ${i === index ? 'w-6 bg-wire' : 'w-1.5 bg-border'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next project"
            className="flex h-10 w-10 items-center justify-center border border-border text-textSecondary transition-colors hover:border-wire hover:text-wire"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const Proof: React.FC<{ showMore?: boolean }> = ({ showMore = false }) => {
  const reduced = useReducedMotion();
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

        {reduced ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p, i) => (
              <ProofCard key={p.id} p={p} tint={TINTS[i % TINTS.length]} />
            ))}
          </div>
        ) : (
          <ProofCarousel items={items} />
        )}

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
