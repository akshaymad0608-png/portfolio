import React from 'react';
import AISystems from '../components/AISystems';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const Work: React.FC = () => {
  return (
    <div className="pt-24 bg-background">
      <SEO 
        title="AI Automation Portfolio & Case Studies | Akshay Mahajan" 
        description="View my AI projects, custom ChatGPT implementations, lead generation bots, and workflow automations built for real businesses."
      />
      
      <div className="container mx-auto px-6 max-w-7xl pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">Case <span className="text-primary">Studies</span></h1>
        <p className="text-lg text-textSecondary max-w-2xl mx-auto">
          Explore a selection of my recent projects where I helped businesses scale using modern web development and AI automation.
        </p>
      </div>

      <AISystems />

      <div className="py-24 bg-section text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-text mb-6">Ready to transform your business?</h2>
          <p className="text-lg text-textSecondary mb-8">Let's discuss how we can build a custom solution for your needs.</p>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
          >
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Work;
