import React from 'react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/ui/PageHero';
import BlogList from '../components/BlogList';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';

const Blog: React.FC = () => (
  <PageTransition>
    <SEO
      title="Blog | Akshay Mahajan"
      description="Notes on AI engineering, workflow automation and building products with LLMs."
    />
    <PageHero
      eyebrow="Writing"
      title="Notes from the build"
      lead="What worked, what cost me a weekend, and the workflows you can copy straight into your own stack."
    />
    <BlogList />
    <FinalCTA />
  </PageTransition>
);

export default Blog;
