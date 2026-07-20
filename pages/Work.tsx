import React from 'react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/ui/PageHero';
import AISystems from '../components/AISystems';
import Stats from '../components/Stats';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';

const Work: React.FC = () => (
  <PageTransition>
    <SEO
      title="Case Studies | Akshay Mahajan"
      description="Four AI products built end to end — what was broken, what I built, and what changed afterwards. All of them are live."
    />
    <PageHero
      eyebrow="Case studies"
      title={<>Four builds, all live,<br className="hidden md:block" /> all still running.</>}
      lead="Each one started as somebody's repetitive problem. Open them and try them yourself — nothing here is a mockup."
    />
    <Stats />
    <AISystems detailed heading={false} />
    <FinalCTA />
  </PageTransition>
);

export default Work;
