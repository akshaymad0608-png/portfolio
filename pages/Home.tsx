import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import AISystems from '../components/AISystems';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import FAQ, { FAQ_DATA } from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import WireDivider from '../components/ui/WireDivider';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Akshay Mahajan',
  url: 'https://akshay.website',
  jobTitle: 'AI & Automation Engineer',
  address: { '@type': 'PostalAddress', addressLocality: 'Surat', addressRegion: 'Gujarat', addressCountry: 'IN' },
  sameAs: [
    'https://linkedin.com/in/akshay-mahajan-95bb86187',
    'https://instagram.com/akshay.website',
  ],
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
      schema={[personSchema, faqSchema]}
      title="Akshay Mahajan | AI Agents & Automation for Businesses"
      description="I build AI agents, chatbots and automation pipelines that take over repetitive work — lead intake, support replies, content and reporting — and keep running without you."
    />
    <Hero />
    <Services limit={6} />
    <WireDivider />
    <Process />
    <AISystems limit={2} />
    <Stats />
    <Testimonials />
    <FAQ />
    <FinalCTA />
  </PageTransition>
);

export default Home;
