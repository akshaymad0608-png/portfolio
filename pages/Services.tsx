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
      description="Full-stack web development, custom AI tools, chatbots, agents and automation — what each one involves, what it costs, and how long it takes."
    />
    <PageHero
      eyebrow="Services"
      title={<>Tell me what to build.<br className="hidden md:block" /> I'll ship it fast.</>}
      lead="Twelve kinds of work I take on — from full-stack builds to the AI inside them, plus the search and rescue work on sites that already exist — what each one costs, and a rough calculation of what doing it the slow way is costing you now."
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
