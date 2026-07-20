import React from 'react';
import { Award, Check, ExternalLink } from 'lucide-react';
import { CERTIFICATES } from '../constants';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';

const Certificates: React.FC = () => (
  <section id="certifications" className="relative border-t border-border bg-panel py-24 md:py-32">
    <div className="container mx-auto max-w-shell px-6">
      <SectionHeading
        eyebrow="Credentials"
        title="Where the training came from"
        lead="Certification isn't the point — but it's fair to ask where someone learned this."
        className="mb-14"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {CERTIFICATES.map((cert, i) => (
          <Reveal key={cert.id} delay={(i % 2) * 0.08}>
            <SpotlightCard className="flex h-full flex-col p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-ink text-signal">
                  <Award size={20} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold leading-snug text-text">{cert.title}</h3>
                  <p className="mt-1.5 font-mono text-[11.5px] uppercase tracking-[0.12em] text-muted">
                    {cert.issuer} &middot; {cert.date}
                  </p>
                </div>
              </div>

              <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                {cert.expertise.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14.5px] text-textSecondary">
                    <Check size={15} className="mt-1 shrink-0 text-wire" />
                    {item}
                  </li>
                ))}
              </ul>

              {cert.downloadLink && (
                <a
                  href={cert.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 text-[14.5px] font-semibold text-wire hover:underline"
                >
                  View credential <ExternalLink size={14} />
                </a>
              )}
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Certificates;
