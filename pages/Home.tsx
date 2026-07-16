import React from 'react';
import Hero from '../components/Hero';
import ServicesComponent from '../components/Services';
import AISystems from '../components/AISystems';
import Testimonials from '../components/Testimonials';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import FAQ, { FAQ_DATA } from '../components/FAQ';
import Stats from '../components/Stats';
import TechStack from '../components/TechStack';



const Home: React.FC = () => {
  const defaultPersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Akshay Mahajan",
    "url": "https://akshay.website",
    "jobTitle": "AI Engineer & Founder",
    "sameAs": [
      "https://github.com/akshay",
      "https://linkedin.com/in/akshay"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <PageTransition>
      <div className="bg-background">
        <SEO 
          schema={[defaultPersonSchema, faqSchema]}

          title="Akshay Mahajan | Premium AI Agency & Automation Architect" 
          description="I build intelligent AI agents, chatbots, automation pipelines, and high-conversion websites that save hundreds of hours of manual work."
        />
        <Hero />
        <Stats />
        <ServicesComponent />
        <TechStack />
        <AISystems />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </div>
    </PageTransition>
  );
};

export default Home;
