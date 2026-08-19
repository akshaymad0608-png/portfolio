import React from 'react';
import Hero from '../components/Hero';
import IntroBanner from '../components/IntroBanner';
import Services from '../components/Services';
import Process from '../components/Process';
import AISystems from '../components/AISystems';
import Stats from '../components/Stats';
import Playground from '../components/Playground';
import BuildLog from '../components/BuildLog';
import Testimonials from '../components/Testimonials';
import FAQ, { FAQ_DATA } from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import WireDivider from '../components/ui/WireDivider';
import { PROJECTS } from '../constants';


// Structured data for the shipped products — helps search engines surface the work.
const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Products built by Akshay Mahajan',
  itemListElement: PROJECTS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'CreativeWork',
      name: p.title,
      description: p.description,
      url: p.link,
      creator: { '@type': 'Person', name: 'Akshay Mahajan' },
    },
  })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const Home: React.FC = () => (
  <PageTransition>
    <SEO
      schema={[faqSchema, projectsSchema]}
      title="Akshay Mahajan | Full-Stack & AI Web Developer"
      description="I'm Akshay Mahajan, a full-stack web developer who ships fast with AI. Websites, web apps and custom tools, plus the AI chatbots, agents and automation that make them smarter."
    />
    <Hero />
    <IntroBanner />
    <Services limit={6} />
    <WireDivider />
    <Process />
    <AISystems limit={3} />
    <Playground />
    <Stats />
    <BuildLog />
    <Testimonials />
    <FAQ />
    <FinalCTA />
  </PageTransition>
);

export default Home;
