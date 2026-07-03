import React from 'react';
import { motion } from 'framer-motion';
import { DASHBOARD_SKILLS } from '../constants';

const SkillsDashboard: React.FC = () => {
  const handleSkillClick = (skill: string) => {
    const event = new CustomEvent('filterChange', { detail: { filter: skill } });
    window.dispatchEvent(event);
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-midnight relative border-t border-white/5 scroll-mt-20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-electric font-mono text-sm tracking-widest mb-4 block">CAPABILITIES_MATRIX</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neonLime">Expertise</span></h2>
          <p className="text-slate-400 max-w-xl">A comprehensive dashboard of tools and technologies I use to architect scalable AI solutions. Click on any skill to view related projects.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DASHBOARD_SKILLS.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-electric/30 transition-colors relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-electric/10 rounded-bl-full pointer-events-none group-hover:bg-electric/20 transition-colors" />
              
              <h3 className="text-xl font-bold text-white mb-6 font-mono border-b border-white/10 pb-4">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 relative z-10">
                {category.skills.map((skill, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleSkillClick(skill)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs sm:text-sm font-medium font-mono text-slate-300 bg-midnight/80 border border-white/10 px-3 py-2 rounded-lg hover:bg-electric hover:text-midnight hover:border-electric hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
                  >
                    {skill}
                  </motion.button>
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
