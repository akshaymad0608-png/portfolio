import React from 'react';
import PageTransition from '../components/PageTransition';
import About from '../components/About';
import SkillsDashboard from '../components/SkillsDashboard';
import Achievements from '../components/Achievements';
import Certificates from '../components/Certificates';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';

const AboutPage: React.FC = () => (
  <PageTransition>
    <SEO
    />
    <div className="pt-32 md:pt-40">
      <About />
    </div>
    <SkillsDashboard />
    <Achievements />
    <Certificates />
    <FinalCTA />
  </PageTransition>
);

export default AboutPage;
