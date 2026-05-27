import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Download } from 'lucide-react';
import { CERTIFICATES } from '../constants';

const Certificates: React.FC = () => {
  return (
    <section id="certifications" className="py-16 md:py-24 bg-slate-900 border-t border-white/5 relative overflow-hidden scroll-mt-32">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-electric font-mono text-sm tracking-widest mb-4 block">CREDENTIALS</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Certificates of <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neonLime">Mastery</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono text-sm">VALIDATED EXPERTISE // BE10X ACCELERATOR</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-midnight border border-white/10 rounded-2xl p-6 md:p-8 hover:border-electric/50 transition-colors group relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award size={100} className="text-electric transform rotate-12 group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="relative z-10 flex flex-col flex-grow h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-electric/10 rounded-xl">
                    <Award className="text-electric w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight">{cert.title}</h3>
                    <p className="text-sm text-slate-400 font-mono mt-1">{cert.issuer} • {cert.date}</p>
                  </div>
                </div>

                <div className="mt-4 flex-grow mb-6">
                  <p className="text-sm text-electric mb-3 font-semibold uppercase tracking-wider">Core Expertise Gained:</p>
                  <ul className="space-y-2">
                    {cert.expertise.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-neonLime shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {cert.downloadLink && (
                  <div className="mt-auto pt-4 border-t border-white/5">
                     <a 
                      href={cert.downloadLink} 
                      download
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/5 hover:bg-electric/20 hover:text-electric px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
