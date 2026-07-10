import React from 'react';
import { motion } from 'framer-motion';
import { DASHBOARD_SKILLS } from '../constants';
import TiltCard from './ui/TiltCard';

const SkillsDashboard: React.FC = () => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background Holographic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 max-w-3xl mx-auto text-center"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 inline-block">
            Technical Matrix
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            Systems & Stack
          </h2>
          <p className="text-textSecondary text-lg leading-relaxed max-w-2xl mx-auto">
            A comprehensive overview of the tools, frameworks, and models I leverage to architect scalable AI platforms and web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {DASHBOARD_SKILLS.map((category, index) => (
            <TiltCard key={index} className="h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="glass-card rounded-[2rem] p-10 h-full relative overflow-hidden group hover-target"
              >
                {/* Internal Glow on Hover */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <h3 className="text-2xl font-bold text-text mb-8 border-b border-border pb-6 font-display">
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <div 
                      key={i} 
                      className="relative overflow-hidden group/skill"
                    >
                      <span className="relative z-10 text-sm font-medium font-mono text-textSecondary group-hover/skill:text-text px-4 py-2.5 rounded-xl border border-border bg-[rgba(0,0,0,0.02)] transition-all flex items-center justify-center">
                        {skill}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/40 to-primary/40 opacity-0 group-hover/skill:opacity-100 transition-opacity blur-md" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsDashboard;
