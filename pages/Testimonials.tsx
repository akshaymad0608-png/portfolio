import PageTransition from '../components/PageTransition';
import React from 'react';import TestimonialsComponent from '../components/Testimonials';import SEO from '../components/SEO';const Testimonials: React.FC = () => {  return (
    <PageTransition>    <div className="pt-32">      <SEO         title="Testimonials | Akshay Mahajan"         description="Read what clients have to say about my AI automation and web development services."      />      <TestimonialsComponent />    </div>
    </PageTransition>  );};export default Testimonials;
