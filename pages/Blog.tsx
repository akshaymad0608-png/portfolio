import PageTransition from '../components/PageTransition';
import React from 'react';
import BlogList from '../components/BlogList';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  return (
    <PageTransition>
    <div className="pt-32">
      <SEO 
        title="Blog & Insights | Akshay Mahajan" 
        description="Read the latest articles on AI engineering, workflow automation, and modern web development."
      />
      <BlogList />
    </div>
    </PageTransition>
  );
};

export default Blog;
