import React from 'react';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';
import ClientPitch from '../components/ClientPitch';
import TrustFactors from '../components/TrustFactors';
import Testimonials from '../components/Testimonials';
import ROICalculator from '../components/ROICalculator';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div>
      <SEO 
        title="Akshay Mahajan | AI Automation & Web Developer" 
        description="I build intelligent AI agents, chatbots, automation pipelines, and high-conversion websites that save hours of manual work and boost your revenue."
      />
      <Hero />
      <TechMarquee />
      <ClientPitch />
      <ROICalculator />
      <TrustFactors />
      <Testimonials />
    </div>
  );
};

export default Home;
