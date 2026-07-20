import React from 'react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/ui/PageHero';
import Testimonials from '../components/Testimonials';
import Achievements from '../components/Achievements';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';

const TestimonialsPage: React.FC = () => (
  <PageTransition>
    <SEO
      title="Client Feedback | Akshay Mahajan"
      description="What clients say about the automations, agents and products I built for them."
    />
    <PageHero
      eyebrow="Client feedback"
      title="What people say after the handover"
      lead="Names are withheld where clients asked. I'm happy to set up a reference call before you commit to anything."
    />
    <Testimonials />
    <Achievements />
    <FinalCTA />
  </PageTransition>
);

export default TestimonialsPage;
