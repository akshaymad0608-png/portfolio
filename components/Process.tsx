import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PROCESS_STEPS } from '../constants';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

/** A real sequence, so it earns its numbering — and the wire that draws through it. */
const Process: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 55%'],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="process" className="relative scroll-mt-24 border-y border-border bg-panel py-24 md:py-32">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="How a project runs"
          title={<>Five steps, two to four weeks,<br className="hidden md:block" /> no mystery in between.</>}
          lead="You always know which step we're on and what comes out of it."
          align="center"
          className="mb-16"
        />

        <div ref={ref} className="relative">
          {/* the wire: horizontal on desktop, vertical on mobile */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-border md:hidden" aria-hidden="true">
            <motion.div style={{ scaleY: drawn }} className="h-full w-full origin-top bg-wire" />
          </div>
          <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-border md:block" aria-hidden="true">
            <motion.div style={{ scaleX: drawn }} className="h-full w-full origin-left bg-wire" />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.id} className="relative pl-[68px] md:pl-0">
                  <Reveal delay={i * 0.08}>
                    <span className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-ink text-wire md:relative md:mb-6">
                      <Icon size={21} />
                    </span>

                    <div className="md:pr-4">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-muted">
                        STEP {String(step.id).padStart(2, '0')}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold text-text">{step.title}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-textSecondary">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Process;
