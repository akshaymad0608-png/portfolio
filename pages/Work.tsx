import React from 'react';
import WorkProof from '../components/WorkProof';
import AISystems from '../components/AISystems';
import Lab from '../components/Lab';
import SEO from '../components/SEO';

const Work: React.FC = () => {
  return (
    <div className="pt-32">
      <SEO 
        title="AI Automation Portfolio & Case Studies | Akshay Mahajan" 
        description="View my AI projects, custom ChatGPT implementations, lead generation bots, and workflow automations built for real businesses."
      />
      <WorkProof />
      <AISystems />
      <Lab />
    </div>
  );
};

export default Work;
