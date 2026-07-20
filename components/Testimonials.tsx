import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';

interface TestimonialsProps {
  /** Adds a link through to the full feedback page. Off on that page itself. */
  showMore?: boolean;
}

/** Shown side by side rather than in a carousel — nothing here is hidden behind an arrow. */
const Testimonials: React.FC<TestimonialsProps> = ({ showMore = false }) => (
  <section className="relative border-y border-border bg-panel py-24 md:py-32">
    <div className="container mx-auto max-w-shell px-6">
      <SectionHeading
        eyebrow="From clients"
        title="What changed on their side"
        align="center"
        className="mb-14"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.08}>
            <SpotlightCard className="flex h-full flex-col p-7">
              <span className="font-display text-5xl leading-none text-wire/30" aria-hidden="true">&ldquo;</span>
              <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-text">{t.content}</p>
              <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-wire/30 bg-ink font-mono text-[13px] text-wire">
                  {t.company.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <div className="text-sm font-semibold text-text">{t.role}</div>
                  <div className="font-mono text-[11.5px] text-muted">{t.company}</div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-center font-mono text-[11.5px] text-muted">
            Names withheld at client request &middot; happy to arrange a reference call
          </p>
          {showMore && (
            <Link
              to="/testimonials"
              className="group inline-flex min-h-[28px] items-center gap-2 py-1 text-sm font-medium text-textSecondary transition-colors hover:text-wire"
            >
              Read more client feedback
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Testimonials;
