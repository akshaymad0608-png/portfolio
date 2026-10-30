import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import IntroBanner from '../components/IntroBanner';
import Services from '../components/Services';
import IntroVideoSection, { introVideoSchema } from '../components/IntroVideoSection';
import Process from '../components/Process';
import AISystems from '../components/AISystems';
import Stats from '../components/Stats';
import Playground from '../components/Playground';
// react-github-calendar drags react-activity-calendar and date-fns in with it,
// and BuildLog sits well below the fold. Loading it with the rest of the home
// page put all three in the entry chunk, where they delayed first paint for a
// section most visitors never scroll to.
const BuildLog = lazy(() => import('../components/BuildLog'));
import Proof from '../components/Proof';
import FAQ, { FAQ_DATA } from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import LatestPosts from '../components/LatestPosts';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import ScrollProgress from '../components/ui/ScrollProgress';
import ScrollMarquee from '../components/ui/ScrollMarquee';
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
      schema={[projectsSchema, introVideoSchema]}
    />
    <ScrollProgress />
    <Hero />
    <IntroBanner />
    <IntroVideoSection />
    <Services limit={6} />
    <ScrollMarquee words={['Websites', 'AI agents', 'Automation', 'Chatbots']} />
    <Process />
    <AISystems limit={3} />
    <Playground />
    <Stats />
    {/* Reserves the section's height so nothing below it jumps when the chunk lands. */}
    <Suspense fallback={<div className="min-h-[420px]" aria-hidden="true" />}>
      <BuildLog />
    </Suspense>
    <Proof showMore />
    <ScrollMarquee words={['Ship fast', 'Built solo', 'Live today']} speed={4} />
    <FAQ />
    <LatestPosts />
    <FinalCTA />
  </PageTransition>
);

export default Home;
