import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FlowCanvas from './ui/FlowCanvas';
import Marquee from './ui/Marquee';
import { availabilityMonth } from '../lib/availability';

const STACK = [
  'n8n', 'Make', 'Zapier', 'OpenAI', 'Claude', 'Gemini', 'LangChain',
  'React', 'Next.js', 'Node.js', 'Supabase', 'Airtable', 'Midjourney', 'HeyGen', 'ElevenLabs',
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
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(169,166,255,0.10), transparent)' }}
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

            <motion.h1 custom={1} variants={rise} initial="hidden" animate="show"
                       className="font-display text-[40px] font-bold leading-[1.02] tracking-tightest text-text sm:text-[52px] lg:text-[68px]">
              I wire the busywork
              <br />
              out of your business.
            </motion.h1>

            <motion.p custom={2} variants={rise} initial="hidden" animate="show"
                      className="mt-7 max-w-[560px] text-lg leading-relaxed text-textSecondary md:text-xl">
              I'm Akshay Mahajan. I build AI agents, chatbots and automation pipelines that pick up
              the repetitive work &mdash; lead intake, support replies, content, reporting &mdash; and keep
              running it after I've gone.
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
                ['4', 'products live in production'],
                ['1M+', 'people using Photo Resizer'],
                ['200+', 'AI tools indexed & ranked'],
              ].map(([n, label]) => (
                <div key={label}>
                  <div className="font-display text-2xl font-bold text-text">{n}</div>
                  <div className="mt-0.5 text-[13px] text-muted">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---- the canvas ---- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pl-4"
          >
            <FlowCanvas />
            <p className="mt-4 text-center font-mono text-[11px] leading-relaxed text-muted">
              An actual intake flow &mdash; three ways a lead arrives, one agent, two things done about it.
            </p>
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
