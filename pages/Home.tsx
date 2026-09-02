import React from 'react';
import Hero from '../components/Hero';
import IntroBanner from '../components/IntroBanner';
import Services from '../components/Services';
import Process from '../components/Process';
import AISystems from '../components/AISystems';
import Stats from '../components/Stats';
import Playground from '../components/Playground';
import BuildLog from '../components/BuildLog';
import Proof from '../components/Proof';
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
    {/* The FAQ is marked up in the prerendered head instead, built from the
        same FAQ_DATA this page renders. Emitting it here as well would leave a
        second FAQPage in the document once Helmet runs, since Helmet appends
        to a head that already carries the static one. */}
    <SEO
      schema={[projectsSchema]}
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
    <Proof showMore />
    <FAQ />
    <FinalCTA />
  </PageTransition>
);

export default Home;
