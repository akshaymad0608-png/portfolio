import React from 'react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/ui/PageHero';
import Pricing from '../components/Pricing';
import ROICalculator from '../components/ROICalculator';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';

const PricingPage: React.FC = () => (
  <PageTransition>
    <SEO
      title="Pricing | Akshay Mahajan"
      description="Project-based pricing for automation setups, AI agents and full builds. Quoted up front, no hourly surprises."
    />
    <PageHero
      eyebrow="Pricing"
      title={<>Quoted up front.<br className="hidden md:block" /> No hourly surprises.</>}
      lead="Three starting points, and an honest note on what each one does and doesn't include."
    />
    <Pricing />
    <ROICalculator />
    <FAQ />
    <FinalCTA />
  </PageTransition>
);

export default PricingPage;
