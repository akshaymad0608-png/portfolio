import React from 'react';
import Hero from '../components/Hero';
import IntroductionVideo from '../components/IntroductionVideo';
import ServicesComponent from '../components/Services';
import AISystems from '../components/AISystems';
import Testimonials from '../components/Testimonials';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';

const Home: React.FC = () => {
  return (
    <PageTransition>
      <div className="bg-background">
        <SEO 
          title="Akshay Mahajan | Premium AI Agency & Automation Architect" 
          description="I build intelligent AI agents, chatbots, automation pipelines, and high-conversion websites that save hundreds of hours of manual work."
        />
        <IntroductionVideo />
        <Hero />
        <ServicesComponent />
        <AISystems />
        <Testimonials />
        <FinalCTA />
      </div>
    </PageTransition>
  );
};

export default Home;
