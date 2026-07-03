import React from 'react';
import { motion } from 'framer-motion';
import { AI_SYSTEMS } from '../constants';
import { CheckCircle2, Zap } from 'lucide-react';

const AISystems: React.FC = () => {
  return (
    <section id="systems" className="py-20 md:py-32 bg-[#050A15] relative border-t border-white/5 scroll-mt-20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric font-mono text-sm tracking-widest mb-4 block">AVAILABLE_AGENTS</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">AI Systems I Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neonLime">Build</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Custom autonomous agents designed to automate workflows and drive growth.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {AI_SYSTEMS.map((system, index) => {
            const Icon = system.icon;
            return (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl bg-slate-900/40 border border-white/10 hover:border-electric/50 transition-all duration-500 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon size={80} />
                </div>
                
                <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mb-6 border border-electric/20 text-electric">
                  <Icon size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-6 pr-10">{system.title}</h3>
                
                <ul className="space-y-3">
                  {system.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <CheckCircle2 size={16} className="text-neonLime shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-16 text-center z-10 relative">
            <a 
              href="https://wa.me/917600885080?text=Hi%20Akshay,%20I'd%20like%20to%20discuss%20an%20AI/Web%20project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500/10 border border-green-500/30 text-white font-bold text-lg rounded-2xl hover:bg-green-500/20 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,197,94,0.1)]"
            >
              Discuss Your Project on WhatsApp <Zap className="w-5 h-5 text-green-400 font-bold" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default AISystems;
