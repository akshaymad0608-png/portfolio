import React from 'react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/ui/PageHero';
import Services from '../components/Services';
import ROICalculator from '../components/ROICalculator';
import Process from '../components/Process';
import TechStack from '../components/TechStack';
import Pricing from '../components/Pricing';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';

const ServicesPage: React.FC = () => (
  <PageTransition>
    <SEO
      title="Services & Pricing | Akshay Mahajan"
      description="AI agents, chatbots, workflow automation and custom builds — what each one involves, what it costs, and how long it takes."
    />
    <PageHero
      eyebrow="Services"
      title={<>Pick the bottleneck.<br className="hidden md:block" /> I'll take it from there.</>}
      lead="Eight kinds of work I take on, what each one costs, and a rough calculation of what the manual version is costing you now."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href="https://calendly.com/akshaymad0608" target="_blank" rel="noopener noreferrer"
           className="btn-signal inline-flex items-center justify-center px-6 py-3 text-[15px]">
          Book a scoping call
        </a>
        <a href="#pricing" className="btn-ghost inline-flex items-center justify-center px-6 py-3 text-[15px] font-medium">
          Jump to pricing
        </a>
      </div>
    </PageHero>
    <Services showCta={false} />
    <ROICalculator />
    <Process />
    <TechStack />
    <Pricing />
    <FinalCTA />
  </PageTransition>
);

export default ServicesPage;
