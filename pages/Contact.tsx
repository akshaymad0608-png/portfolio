import React from 'react';
import ContactComponent from '../components/Contact';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  return (
    <div className="pt-32">
      <SEO 
        title="Contact Akshay Mahajan | Hire an AI Developer" 
        description="Ready to automate your workflows and scale your business with AI? Contact me today to discuss your next project."
      />
      <ContactComponent />
    </div>
  );
};

export default Contact;
