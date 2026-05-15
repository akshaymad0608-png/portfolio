import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-midnight relative border-b border-white/5">
       {/* Ambient Light */}
       <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-electric/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Client <span className="text-slate-500">Intel</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px -10px rgba(0, 240, 255, 0.1)" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/5 shadow-2xl flex flex-col group hover:border-electric/30 transition-colors"
            >
              <div className="absolute top-6 right-8 text-white/10 group-hover:text-electric/20 transition-colors">
                <Quote size={40} />
              </div>

              <p className="text-slate-300 leading-relaxed mb-8 relative z-10 italic">"{t.content}"</p>
              
              <div className="mt-auto flex items-center gap-4">
                <motion.img 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full border-2 border-electric/20 object-cover group-hover:border-electric transition-colors"
                />
                <div>
                  <h4 className="text-white font-bold group-hover:text-electric transition-colors">{t.name}</h4>
                  <p className="text-xs text-electric uppercase tracking-wider">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;