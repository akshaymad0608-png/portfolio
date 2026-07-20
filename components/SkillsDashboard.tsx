import React from 'react';
import { DASHBOARD_SKILLS } from '../constants';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';

const SkillsDashboard: React.FC = () => (
  <section id="skills" className="relative border-y border-border bg-panel py-24 md:py-32">
    <div className="container mx-auto max-w-shell px-6">
      <SectionHeading
        eyebrow="Capabilities"
        title="What I can be handed"
        lead="Grouped by the kind of problem, not by the tool. The tools change every few months anyway."
        className="mb-14"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DASHBOARD_SKILLS.map((category, i) => (
          <Reveal key={category.title} delay={i * 0.06}>
            <SpotlightCard className="h-full p-7">
              <h3 className="mb-5 border-b border-border pb-4 font-display text-[17px] font-bold text-text">
                {category.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-border bg-ink px-3 py-1.5 font-mono text-[11.5px] text-textSecondary transition-colors hover:border-wire/35 hover:text-wire"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsDashboard;
