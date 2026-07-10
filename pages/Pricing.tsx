import PageTransition from '../components/PageTransition';
import React from 'react';import PricingComponent from '../components/Pricing';import SEO from '../components/SEO';const Pricing: React.FC = () => {  return (
    <PageTransition>    <div className="pt-32">      <SEO         title="Pricing | Akshay Mahajan"         description="Transparent pricing for AI automation, web development, and agentic workflows."      />      <PricingComponent />    </div>
    </PageTransition>  );};export default Pricing;
