import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import ProjectShot from './ui/ProjectShot';

interface AISystemsProps {
  limit?: number;
  detailed?: boolean;
  heading?: boolean;
}

/** Case studies: what was broken, what I built, what changed. */
const AISystems: React.FC<AISystemsProps> = ({ limit, detailed = false, heading = true }) => {
  const projects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-shell px-6">
        {heading && (
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Case studies"
              title={<>Things I shipped,<br className="hidden md:block" /> and what they changed.</>}
              lead="Every one of these is live right now. Click through and use them."
            />
            {limit && (
              <Reveal delay={0.15}>
                <Link
                  to="/work"
                  className="group inline-flex min-h-[28px] shrink-0 items-center gap-2 py-1 text-sm font-medium text-textSecondary transition-colors hover:text-wire"
                >
                  All case studies
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            )}
          </div>
        )}

        <div className="space-y-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            const flip = i % 2 === 1;

            return (
              <Reveal key={project.id} delay={0.04}>
                <article
                  id={project.elementId}
                  className="panel ticked group grid scroll-mt-28 overflow-hidden lg:grid-cols-2"
                >
                  {/* screenshot */}
                  <div
                    className={`relative min-h-[260px] overflow-hidden border-border bg-panel lg:min-h-[400px] ${
                      flip ? 'lg:order-2 lg:border-l' : 'lg:border-r'
                    }`}
                  >
                    <ProjectShot src={project.image} link={project.link} title={project.title} icon={Icon} />
                    <span className="absolute bottom-4 left-4 rounded-full border border-wire/35 bg-ink/85 px-3 py-1.5 font-mono text-[11px] tracking-widest text-wire backdrop-blur">
                      {project.stat}
                    </span>
                  </div>

                  {/* the story */}
                  <div className="flex flex-col p-7 md:p-10">
                    <div className="mb-5 flex items-center gap-3">
                      {Icon && (
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-ink text-wire">
                          <Icon size={18} />
                        </span>
                      )}
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                          {project.category} &middot; {project.year}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-text md:text-[28px]">
                      {project.title}
                    </h3>

                    <dl className="mt-6 space-y-4 border-t border-border pt-6">
                      <div className="grid gap-1 sm:grid-cols-[88px_1fr] sm:gap-4">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:pt-1">
                          Problem
                        </dt>
                        <dd className="text-[15px] leading-relaxed text-textSecondary">{project.problem}</dd>
                      </div>
                      <div className="grid gap-1 sm:grid-cols-[88px_1fr] sm:gap-4">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:pt-1">
                          Built
                        </dt>
                        <dd className="text-[15px] leading-relaxed text-textSecondary">{project.solution}</dd>
                      </div>
                      <div className="grid gap-1 sm:grid-cols-[88px_1fr] sm:gap-4">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal sm:pt-1">
                          Result
                        </dt>
                        <dd className="text-[15px] leading-relaxed text-text">{project.results}</dd>
                      </div>
                    </dl>

                    {detailed && (
                      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                        {project.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-[14px] text-textSecondary">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-wire" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-border pt-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border bg-ink px-2.5 py-1 font-mono text-[11px] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 3 }}
                        className="mt-6 inline-flex min-h-[28px] w-fit items-center gap-2 py-1 text-[15px] font-semibold text-wire"
                      >
                        Open {project.title}
                        <ArrowUpRight size={17} />
                      </motion.a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AISystems;
