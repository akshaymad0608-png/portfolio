import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Bot, Code2, MessageSquare, Globe, PenTool, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Cpu className="w-8 h-8 text-primary" />,
    title: "AI Automation",
    description: "End-to-end automation of repetitive tasks and workflows using intelligent AI systems."
  },
  {
    icon: <Bot className="w-8 h-8 text-secondary" />,
    title: "Agentic AI Solutions",
    description: "Custom autonomous AI agents that can plan, reason, and execute complex multi-step processes."
  },
  {
    icon: <Code2 className="w-8 h-8 text-primary" />,
    title: "Prompt Engineering",
    description: "Advanced prompt design and optimization to maximize LLM accuracy and performance."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-secondary" />,
    title: "AI Chatbot Development",
    description: "Intelligent conversational agents trained on your business data for customer support and sales."
  },
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "AI Website Development",
    description: "High-performance, conversion-optimized websites built with modern frameworks and AI capabilities."
  },
  {
    icon: <PenTool className="w-8 h-8 text-secondary" />,
    title: "AI Content Systems",
    description: "Automated content generation pipelines for blogs, social media, and marketing materials."
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-24 relative bg-section" id="services">
      <div className="container mx-auto px-6 relative z-10 max-w-[1200px]">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs uppercase tracking-widest mb-6 font-mono font-medium inline-block"
          >
            Capabilities
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight text-text mb-6"
          >
            How I Can Help Your Business
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-textSecondary text-base md:text-lg max-w-[600px]"
          >
            Strategic implementation of AI technologies to scale your operations, reduce costs, and accelerate growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-cards border border-border p-8 rounded-2xl hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-background border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-text mb-3 font-display">
                {service.title}
              </h3>
              <p className="text-textSecondary leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-16 text-center"
        >
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all duration-300">
             Discuss Your Requirements
             <ArrowRight size={18} />
          </Link>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Services;
