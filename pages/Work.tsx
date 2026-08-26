import React from 'react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/ui/PageHero';
import AISystems from '../components/AISystems';
import Stats from '../components/Stats';
import BuildLog from '../components/BuildLog';
import InternalBuilds from '../components/InternalBuilds';
import AINewsFeed from '../components/AINewsFeed';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';

const Work: React.FC = () => (
  <PageTransition>
    <SEO
    />
    <PageHero
      eyebrow="Case studies"
      title="Five builds, all live, all still running."
      lead="Each one started as somebody's repetitive problem. Open them and try them yourself — nothing here is a mockup."
    />
    <Stats />
    <AISystems detailed heading={false} />
    <InternalBuilds />
    <AINewsFeed />
    <BuildLog />
    <FinalCTA />
  </PageTransition>
);

export default Work;
