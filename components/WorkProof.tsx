import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Zap, Code2, Clock } from 'lucide-react';

const WorkProof: React.FC = () => {
  const stats = [
    { id: 1, label: "Client Systems Deployed", value: "5+", icon: CheckCircle2, color: "text-success" },
    { id: 2, label: "AI Models Orchestrated", value: "150+", icon: Award, color: "text-primary" },
    { id: 3, label: "Automated Workflows", value: "20+", icon: Zap, color: "text-accent" },
    { id: 4, label: "Full-Stack SaaS Built", value: "4+", icon: Code2, color: "text-secondary" }
  ];

  return (
    <section className="py-20 md:py-24 relative bg-background border-t border-white/5 overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-center md:justify-end mb-8 max-w-6xl mx-auto">
            <span className="text-slate-400 font-mono text-xs flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full glass-card tracking-widest uppercase"><Clock size={14}/> Operational Metrics</span>
        </div>
        
        <div className="max-w-6xl mx-auto rounded-[2.5rem] glass-card p-10 md:p-16 relative overflow-hidden">
            {/* Embedded glows */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 relative z-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                       <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <h3 className={`text-5xl md:text-6xl font-display font-bold mb-3 tracking-tight ${stat.color} drop-shadow-[0_0_20px_rgb(var(--color-white) / 0.1)]`}>
                      {stat.value}
                    </h3>
                    <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 font-mono">
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
