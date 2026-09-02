import React from 'react';
import { motion } from 'framer-motion';
import RevealText from './ui/RevealText';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Marquee from './ui/Marquee';
import { availabilityMonth } from '../lib/availability';

const STACK = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind', 'Supabase',
  'GitHub', 'Vercel', 'Google AI Studio', 'Claude', 'OpenAI', 'Gemini',
  'n8n', 'Make', 'Midjourney', 'HeyGen', 'ElevenLabs',
];

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="absolute inset-0 blueprint blueprint-fade pointer-events-none" aria-hidden="true" />
      {/* A rule across the top of the grid, drawn on load — the page setting
          its own baseline before any type lands on it. */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-28 h-px origin-left bg-border"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto max-w-shell px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          {/* ---- proposition ---- */}
          <div>
            <motion.div custom={0} variants={rise} initial="hidden" animate="show"
                        className="mb-7 inline-flex items-center gap-3 rounded-full border border-border bg-cards px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wire opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-wire" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-textSecondary">
                Taking projects for {availabilityMonth()} &middot; Surat, IN
              </span>
            </motion.div>

            <h1 className="font-display text-[40px] font-bold leading-[1.02] tracking-tightest text-text sm:text-[52px] lg:text-[68px]">
              <RevealText onMount delay={0.12}>I build full-stack websites, wired with AI.</RevealText>
            </h1>

            <motion.p custom={2} variants={rise} initial="hidden" animate="show"
                      className="mt-7 max-w-[560px] text-lg leading-relaxed text-textSecondary md:text-xl">
              I'm Akshay Mahajan &mdash; a full-stack developer who ships fast with LLMs. Websites, web
              apps and custom tools, plus the AI agents and automation that make them smarter.
            </motion.p>

            <motion.div custom={3} variants={rise} initial="hidden" animate="show"
                        className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="https://calendly.com/akshaymad0608" target="_blank" rel="noopener noreferrer"
                 className="btn-signal inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px]">
                Book a 20-minute call
                <ArrowRight size={17} />
              </a>
              <Link to="/work"
                    className="btn-ghost inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-medium">
                See what I've built
              </Link>
            </motion.div>

            {/* a call is a big first ask — this is for everyone not ready to book a slot */}
            <motion.p custom={4} variants={rise} initial="hidden" animate="show"
                      className="mt-4 text-[13.5px] text-muted">
              Rather just ask something?{' '}
              <a href="https://wa.me/917600885080" target="_blank" rel="noopener noreferrer"
                 className="font-medium text-textSecondary underline decoration-wire/40 underline-offset-4 transition-colors hover:text-wire">
                WhatsApp me
              </a>{' '}
              or{' '}
              <a href="mailto:akshaymad0608@gmail.com"
                 className="font-medium text-textSecondary underline decoration-wire/40 underline-offset-4 transition-colors hover:text-wire">
                send an email
              </a>
              . I reply within a working day.
            </motion.p>

            <motion.div custom={5} variants={rise} initial="hidden" animate="show"
                        className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-7">
              {[
                ['5', 'web products live in production'],
                ['1M+', 'people using Photo Resizer'],
                ['2–4 wk', 'idea to launched build'],
              ].map(([n, label]) => (
                <div key={label}>
                  <div className="font-display text-2xl font-bold text-text">{n}</div>
                  <div className="mt-0.5 text-[13px] text-muted">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---- the portrait ----
              He points left, across the headline and the two buttons. The
              diagram that used to sit here explained a workflow nobody had
              asked about yet; a face does the introducing this section is
              actually for. */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            /* Bounded by height, not width. At its natural size the portrait is
               952px tall against 634px of copy, and the row centres the shorter
               column against the taller one — which pushed the call to action
               below the fold. Capped, the two columns are near enough the same
               height that centring costs nothing. */
            className="relative mx-auto flex w-full justify-center lg:mx-0 lg:pl-4"
          >
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 h-[72%] w-[62%] -translate-x-1/2 rounded-[4px] bg-frame"
            />
            <img
              src="/akshay-hero-777.webp"
              srcSet="/akshay-hero-480.webp 480w, /akshay-hero-777.webp 777w"
              sizes="(min-width: 1024px) 360px, 260px"
              width={777}
              height={1364}
              alt="Akshay Mahajan"
              className="relative block h-auto w-auto max-h-[440px] select-none sm:max-h-[520px] lg:max-h-[620px]"
              /* This portrait is the largest thing above the fold, so it is
                 almost certainly the LCP element. Without a priority hint the
                 browser queues it behind the stylesheet and the entry chunk. */
              fetchPriority="high"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mt-20 border-y border-border bg-panel/60 py-5">
        <Marquee items={STACK} />
      </div>
    </section>
  );
};

export default Hero;
