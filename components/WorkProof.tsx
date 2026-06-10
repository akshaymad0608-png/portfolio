import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Zap, Code2, Clock } from 'lucide-react';

const WorkProof: React.FC = () => {
  const stats = [
    { id: 1, label: "Client-Ready Projects", value: "5+", icon: CheckCircle2, color: "text-green-400" },
    { id: 2, label: "AI Tools Researched", value: "150+", icon: Award, color: "text-electric" },
    { id: 3, label: "Automation Ideas", value: "20+", icon: Zap, color: "text-neonLime" },
    { id: 4, label: "Web / SaaS Builds", value: "4+", icon: Code2, color: "text-blue-400" }
  ];

  return (
    <section className="py-12 md:py-20 relative bg-midnight border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-center md:justify-end mb-6 max-w-5xl mx-auto">
            <span className="text-slate-500 font-mono text-xs flex items-center gap-1 border border-white/10 px-3 py-1 rounded-full bg-slate-900/50 backdrop-blur"><Clock size={12}/> client proof page</span>
        </div>
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-electric/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-neonLime/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                  >
                    <Icon className={`w-8 h-8 mb-4 ${stat.color} opacity-80`} strokeWidth={1.5} />
                    <h3 className={`text-4xl md:text-5xl font-black mb-2 tracking-tight ${stat.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                      {stat.value}
                    </h3>
                    <p className="text-sm md:text-base font-bold uppercase tracking-widest text-slate-400 font-mono">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProof;
