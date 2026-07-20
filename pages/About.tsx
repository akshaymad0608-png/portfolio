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
      title="About | Akshay Mahajan"
      description="AI and automation engineer in Surat, India. No agency layer — the person you talk to is the person who builds it."
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
