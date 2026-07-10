import PageTransition from '../components/PageTransition';
import React from 'react';
import AISystems from '../components/AISystems';
import SEO from '../components/SEO';
import FinalCTA from '../components/FinalCTA';

const Work: React.FC = () => {
  return (
    <PageTransition>
      <div className="pt-32 bg-background min-h-screen">
        <SEO 
          title="AI Automation Portfolio & Case Studies | Akshay Mahajan" 
          description="View my AI projects, custom ChatGPT implementations, lead generation bots, and workflow automations built for real businesses."
        />
        
        <div className="container mx-auto px-6 max-w-[1200px] mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-6 tracking-tight">Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Studies</span></h1>
          <p className="text-lg text-textSecondary max-w-2xl mx-auto">
            Explore a selection of my recent projects where I helped businesses scale using modern web development and AI automation.
          </p>
        </div>

        <AISystems />
        
        <FinalCTA />
      </div>
    </PageTransition>
  );
};

export default Work;
