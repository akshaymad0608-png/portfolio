import React from 'react';
import { motion } from 'framer-motion';

const TECH_STACK = [
  "n8n", "Make", "Zapier", "LangChain", "OpenAI", 
  "Google Gemini", "Python", "Node.js", "React", 
  "Supabase", "Airtable", "Vector DBs"
];

const TechStack: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative bg-background border-y border-border">
      <div className="container mx-auto px-6 max-w-[900px] relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 inline-block">
            Expertise
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-text mb-4">
            Tools & Platforms I Work With
          </h2>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="px-5 py-2.5 md:px-6 md:py-3 bg-cards border border-border rounded-full text-text font-medium text-sm shadow-sm hover:shadow-md transition-all cursor-default"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
