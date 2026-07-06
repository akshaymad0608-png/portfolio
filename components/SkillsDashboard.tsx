import React from 'react';
import { motion } from 'framer-motion';
import { DASHBOARD_SKILLS } from '../constants';

const SkillsDashboard: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-section relative border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-3xl mx-auto text-center"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-6 inline-block">
            Technical Matrix
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
            Systems & <span className="text-primary">Stack</span>
          </h2>
          <p className="text-textSecondary text-lg leading-relaxed max-w-2xl mx-auto">
            A comprehensive overview of the tools, frameworks, and models I leverage to architect scalable AI platforms and web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DASHBOARD_SKILLS.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-cards border border-border rounded-3xl p-8 hover:shadow-md transition-shadow group"
            >
              <h3 className="text-2xl font-bold text-text mb-8 border-b border-border pb-4">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-sm font-medium font-mono text-textSecondary bg-slate-50 border border-border px-4 py-2.5 rounded-xl transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsDashboard;
