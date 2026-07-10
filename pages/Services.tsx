import PageTransition from '../components/PageTransition';
import React from 'react';
import ServicesComponent from '../components/Services';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import ROICalculator from '../components/ROICalculator';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  return (
    <PageTransition>
      <div className="pt-32">
        <SEO 
          title="AI Automation Services & Pricing | Akshay Mahajan" 
          description="Explore my AI automation services, chat bot solutions, custom web development, and clear pricing structure. Calculate your ROI today."
        />
        <ServicesComponent />
        <ROICalculator />
        <Process />
        <Pricing />
      </div>
    </PageTransition>
  );
};
export default Services;
