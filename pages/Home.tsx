import React from 'react';
import Hero from '../components/Hero';
import ServicesComponent from '../components/Services';
import AISystems from '../components/AISystems';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div className="bg-background">
      <SEO 
        title="Akshay Mahajan | Premium AI Agency & Automation Architect" 
        description="I build intelligent AI agents, chatbots, automation pipelines, and high-conversion websites that save hundreds of hours of manual work."
      />
      <Hero />
      <ServicesComponent />
      <AISystems />
      <Testimonials />
    </div>
  );
};

export default Home;
