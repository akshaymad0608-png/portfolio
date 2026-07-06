import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../constants';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-32 bg-background relative border-t border-border scroll-mt-20">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-mono text-sm tracking-widest mb-4 block uppercase font-semibold">Pipeline</span>
          <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">How I Architect <span className="text-primary">AI & Automation</span></h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-0.5 bg-border md:-translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-24">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;
              
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`hidden md:block w-1/2 ${isEven ? 'pl-16' : 'pr-16 text-right'}`}>
                    <h3 className="text-2xl font-bold text-text mb-4">{step.title}</h3>
                    <p className="text-textSecondary">{step.description}</p>
                  </div>
                  
                  <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-white border-2 border-primary flex items-center justify-center transform md:-translate-x-1/2 z-10 text-primary shadow-sm">
                    <Icon size={24} />
                  </div>
                  
                  <div className="ml-20 md:hidden pb-4">
                    <span className="text-primary font-mono text-sm mb-2 block font-semibold uppercase">Step {step.id}</span>
                    <h3 className="text-xl font-bold text-text mb-3">{step.title}</h3>
                    <p className="text-textSecondary text-sm">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
