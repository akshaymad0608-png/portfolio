import React from 'react';
import LpHero from '../components/lp/LpHero';
import LpHow from '../components/lp/LpHow';
import LpWork from '../components/lp/LpWork';
import LpServices from '../components/lp/LpServices';
import LpVideo from '../components/lp/LpVideo';
import LpPricing from '../components/lp/LpPricing';
import LpFaq from '../components/lp/LpFaq';
import LpPosts from '../components/lp/LpPosts';
import LpCta from '../components/lp/LpCta';
import { introVideoSchema } from '../components/IntroVideoSection';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
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

/**
 * The home page, in the light design. The nav and footer for this route are
 * swapped in by App.tsx (LpNav / LpFooter); every other route keeps the dark
 * NavBar and Footer. The FAQ is marked up in the prerendered head, built from
 * the same FAQ_DATA that LpFaq renders, so it is not emitted a second time here.
 */
const Home: React.FC = () => (
  <PageTransition>
    <SEO schema={[projectsSchema, introVideoSchema]} />
    <LpHero />
    <LpHow />
    <LpWork />
    <LpServices />
    <LpVideo />
    <LpPricing />
    <LpFaq />
    <LpPosts />
    <LpCta />
  </PageTransition>
);

export default Home;
