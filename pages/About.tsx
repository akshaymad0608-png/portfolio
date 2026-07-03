import React from 'react';
import Experience from '../components/Experience';
import SkillsDashboard from '../components/SkillsDashboard';
import AboutComponent from '../components/About';
import Achievements from '../components/Achievements';
import Certificates from '../components/Certificates';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <div className="pt-32">
      <SEO 
        title="About Akshay Mahajan | AI Engineer & Developer" 
        description="Learn about my journey in AI automation, technical skills, certifications, and experience in building robust digital systems."
      />
      <AboutComponent />
      <Experience />
      <SkillsDashboard />
      <Achievements />
      <Certificates />
    </div>
  );
};

export default About;
