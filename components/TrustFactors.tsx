import React from 'react';
import { motion } from 'framer-motion';
import { TRUST_FACTORS } from '../constants';

const TrustFactors: React.FC = () => {
  return (
    <section className="py-20 bg-[#050A15] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            >
            <h2 className="text-3xl md:text-5xl font-black text-white">Why Work With Me?</h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
                {TRUST_FACTORS.map((factor, i) => {
                    const Icon = factor.icon;
                    return (
                        <motion.div
                            key={factor.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 bg-slate-900/60 border border-white/10 px-6 py-4 rounded-2xl  hover:border-electric/50 transition-colors"
                        >
                            <div className="p-3 rounded-full bg-electric/10 text-electric border border-electric/20">
                                <Icon size={20} />
                            </div>
                            <span className="text-white font-bold sm:whitespace-nowrap">{factor.title}</span>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    </section>
  );
};

export default TrustFactors;
