import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIMENTS } from '../constants';
import { FlaskConical, Github, ArrowUpRight } from 'lucide-react';

const Lab: React.FC = () => {
  return (
    <section id="lab" className="py-16 md:py-24 bg-[#050A15] relative border-y border-white/5 scroll-mt-20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div>
            <span className="text-electric font-mono text-sm tracking-widest mb-4 block">LABORATORY</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
              Try My AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neonLime">Experiments</span>
            </h2>
            <p className="text-slate-400">Experimental R&D, Prototypes, and specialized AI tools.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-mono text-slate-500 border border-slate-800 px-3 py-1 rounded-full bg-slate-900/50 backdrop-blur-sm">
            <span>STATUS:</span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-500">ONLINE</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPERIMENTS.map((exp, index) => {
             const hasLink = exp.link && exp.link.startsWith('http');
             return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <a 
                href={hasLink ? exp.link : undefined}
                target={hasLink ? "_blank" : undefined}
                rel={hasLink ? "noopener noreferrer" : undefined}
                className={`block h-full p-6 bg-slate-900/50 border border-white/5 rounded-xl transition-all duration-300 hover:bg-slate-800/50 ${hasLink ? 'hover:border-electric/50 cursor-pointer' : 'hover:border-white/10'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded border ${
                    exp.status === 'Live' ? 'border-green-500/30 text-green-400 bg-green-500/10' : 
                    exp.status === 'Prototype' ? 'border-electric/30 text-electric bg-electric/10' : 
                    'border-slate-600 text-slate-500 bg-slate-700/10'
                  }`}>
                    {exp.status.toUpperCase()}
                  </span>
                  {hasLink ? (
                    <ArrowUpRight className="text-slate-600 group-hover:text-electric transition-colors" size={16} />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-slate-200 mb-2 group-hover:text-white transition-colors flex items-center gap-2 break-words">
                    {exp.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{exp.description}</p>
                
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-neonLime opacity-70">{exp.model}</span>
                  <Github size={14} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
                </div>
              </a>
            </motion.div>
          );
          })}
        </div>
      </div>
    </section>
  );
};

export default Lab;