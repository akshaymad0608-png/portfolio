import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { Check } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-midnight relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
           <span className="text-electric font-mono text-sm tracking-widest mb-4 block">VALUE_PROPOSITION</span>
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neonLime">Solutions</span></h2>
           <p className="text-slate-400 max-w-2xl mx-auto">Going beyond code to deliver scalable, enterprise-grade AI architecture.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-electric/50 hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-electric/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 rounded-2xl bg-electric/10 text-electric group-hover:bg-electric group-hover:text-midnight transition-colors duration-300 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                  >
                    <Icon size={32} strokeWidth={1.5} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-electric transition-colors break-words">{service.title}</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed text-sm">{service.description}</p>
                    
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (i * 0.1) }}
                          className="flex items-center gap-3 text-sm text-slate-300"
                        >
                          <div className="w-5 h-5 rounded-full bg-neonLime/10 flex items-center justify-center">
                            <Check size={12} className="text-neonLime" />
                          </div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;