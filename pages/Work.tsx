import React from 'react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/ui/PageHero';
import AISystems from '../components/AISystems';
import Stats from '../components/Stats';
import BuildLog from '../components/BuildLog';
import InternalBuilds from '../components/InternalBuilds';
import AINewsFeed from '../components/AINewsFeed';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';
import { PROJECTS, INTERNAL_BUILDS } from '../constants';

/**
 * The case-study page had no structured data at all, while the home page marked
 * up the same products — so the one URL that exists to describe the work was the
 * one search engines had to infer it from.
 *
 * Both kinds of build are listed, and they are typed differently on purpose: the
 * shipped products carry a url because you can open them, the internal ones do
 * not, because claiming a link that goes nowhere is what the page itself refuses
 * to do.
 */
const workSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Case studies — Akshay Mahajan',
  description:
    'Live AI products built end to end, plus the private automation stack and internal tooling behind them.',
  url: 'https://akshay.website/work',
  about: { '@type': 'Person', name: 'Akshay Mahajan' },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: PROJECTS.length + INTERNAL_BUILDS.length,
    itemListElement: [
      ...PROJECTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: p.title,
          description: p.description,
          url: p.link,
          applicationCategory: 'WebApplication',
          operatingSystem: 'Web',
          author: { '@type': 'Person', name: 'Akshay Mahajan' },
        },
      })),
      ...INTERNAL_BUILDS.map((b, i) => ({
        '@type': 'ListItem',
        position: PROJECTS.length + i + 1,
        item: {
          '@type': 'CreativeWork',
          name: b.title,
          description: b.summary,
          creator: { '@type': 'Person', name: 'Akshay Mahajan' },
        },
      })),
    ],
  },
};

const Work: React.FC = () => (
  <PageTransition>
    <SEO schema={[workSchema]} />
    <PageHero
      eyebrow="Case studies"
      title="Five builds, all live, all still running."
      lead="Each one started as somebody's repetitive problem. Open them and try them yourself — nothing here is a mockup."
    />
    <Stats />
    <AISystems detailed heading={false} />
    <InternalBuilds />
    <AINewsFeed />
    <BuildLog />
    <FinalCTA />
  </PageTransition>
);

export default Work;
