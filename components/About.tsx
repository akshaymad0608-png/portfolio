import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Reveal from './ui/Reveal';
import TiltCard from './ui/TiltCard';
import { availabilityMonth } from '../lib/availability';

const TIMELINE = [
  {
    phase: '2024',
    title: 'Learning what the models can actually do',
    body: 'Prompt engineering, LLM behaviour, and the far less glamorous question of which business problems are worth pointing them at.',
  },
  {
    phase: '2025',
    title: 'Shipping instead of experimenting',
    body: 'Moved from notebooks to production. Designed and built five full-stack web products that real people use daily, one of which crossed a million users.',
  },
  {
    phase: '2026',
    title: 'Building for founders and agencies',
    body: 'Working with founders and agencies to ship websites, web apps and custom tools fast \u2014 with AI, chatbots and automation built in where they earn their keep.',
  },
];

const LANGUAGES = [
  ['English', 'Professional'],
  ['Hindi', 'Native'],
  ['Gujarati', 'Native'],
  ['Marathi', 'Conversational'],
];

const About: React.FC = () => (
  <section id="about" className="relative overflow-hidden pt-8 pb-24 md:pb-32">
    <div className="absolute inset-0 blueprint blueprint-fade pointer-events-none" aria-hidden="true" />

    <div className="container relative z-10 mx-auto max-w-shell px-6">
      {/* intro */}
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-wire/50" />
              <span className="eyebrow">Who you'd be working with</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-[38px] font-bold leading-[1.05] tracking-tightest text-text md:text-[54px]">
              I'm Akshay. I'm the one who
              <br className="hidden md:block" /> actually builds the thing.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 max-w-2xl space-y-5 text-[17px] leading-relaxed text-textSecondary">
              <p>
                No agency layer, no account manager, no handoff to a junior. You talk to me on the
                scoping call and I'm the same person writing the code, wiring up the AI and answering
                the message when something breaks at 9pm.
              </p>
              <p>
                I'm a full-stack developer who builds fast with LLMs — the vibe-coding way. Websites,
                web apps and custom tools, shipped end to end. My background is electronics engineering,
                which mostly means I'm comfortable taking a system apart to find where the signal is
                getting lost.
              </p>
              <p>
                I care more about whether something is worth building than about whether it can be.
                Some things shouldn't be — I'll tell you when that's the case.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[12.5px] text-muted">
              <span className="flex items-center gap-2"><MapPin size={14} className="text-wire" /> Surat, Gujarat, India</span>
              <span>B.E. Electronics &amp; Communication</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-wire pulse-soft" /> Available from {availabilityMonth()}
              </span>
            </div>
          </Reveal>
        </div>

        {/* portrait, framed like a node — tilts toward the cursor */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltCard max={9} className="panel ticked overflow-hidden">
            <div className="flex items-center justify-between border-b border-border bg-frame px-4 py-2.5">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">operator</span>
              <span className="h-1.5 w-1.5 rounded-full bg-wire pulse-soft" />
            </div>
            {/* Cropped from the brand poster, so the card carries the same
                green as the rest of the site. Framed to 4:5 at source rather
                than nudged into place with object-position — the box below is
                the same ratio, so nothing is cropped a second time. */}
            <img
              src="/akshay-about-600.webp"
              srcSet="/akshay-about-400.webp 400w, /akshay-about-600.webp 600w"
              sizes="(min-width: 1024px) 420px, 90vw"
              alt="Akshay Mahajan — full-stack & AI web developer based in Surat, India"
              width={600}
              height={750}
              className="aspect-[4/5] w-full object-cover"
              decoding="async"
            />
            <div className="border-t border-border bg-frame px-4 py-3">
              <p className="font-display text-[15px] font-bold text-text">Akshay Mahajan</p>
              <p className="mt-0.5 font-mono text-[11px] text-muted">Full-stack &amp; AI web developer</p>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* timeline — a real sequence, wired */}
      <div className="mt-24">
        <Reveal>
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-8 bg-wire/50" />
            <span className="eyebrow">How I got here</span>
          </div>
        </Reveal>

        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:h-px md:w-auto" aria-hidden="true" />
          {TIMELINE.map((item, i) => (
            <li key={item.phase} className="relative pl-8 md:pl-0">
              <Reveal delay={i * 0.1}>
                <span className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-wire bg-ink md:relative md:mb-6 md:block" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-wire">{item.phase}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-text">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-textSecondary md:pr-6">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* languages */}
      <Reveal>
        <div className="panel mt-16 p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-wire/50" />
            <span className="eyebrow">Languages I work in</span>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LANGUAGES.map(([lang, level]) => (
              <li key={lang} className="flex items-center justify-between rounded-xl border border-border bg-ink px-4 py-3">
                <span className="text-[15px] font-medium text-text">{lang}</span>
                <span className="font-mono text-[11px] text-muted">{level}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
);

export default About;
