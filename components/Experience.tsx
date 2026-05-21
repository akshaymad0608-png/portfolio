import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Zap, Globe } from 'lucide-react';

const Experience: React.FC = () => {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only intercept if it's an internal link
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById('contact');
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <section id="work" className="py-16 md:py-24 bg-midnight relative overflow-hidden scroll-mt-32">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-electric font-mono text-sm tracking-widest mb-4 block">DEPLOYED_SOLUTIONS</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4">Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neonLime">Missions</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono text-sm">2024-2026 // PRODUCTION LOGS</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-electric/30 to-transparent transform md:-translate-x-1/2 z-0" />

          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            const isExternal = project.link && project.link.startsWith('http');

            return (
              <motion.div 
                key={project.id}
                id={project.elementId}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-center mb-24 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Spacer */}
                <div className="hidden md:block w-1/2" />

                {/* Connection Point */}
                <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full bg-midnight border-2 border-electric flex items-center justify-center transform -translate-x-1/2 translate-y-1/2 z-10 shadow-[0_0_15px_rgba(0,240,255,0.4)] top-0 md:top-auto">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12 mt-6 md:mt-0">
                   <div className="group relative rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-electric/50 transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                      
                      {/* Image/Icon Section */}
                      <div className="relative h-48 overflow-hidden bg-slate-900 border-b border-white/5 flex flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                        {project.image ? (
                          <motion.img 
                            src={project.image} 
                            alt={project.title} 
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="w-full h-full object-cover"
                          />
                        ) : project.icon ? (
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="relative z-0 p-6 rounded-full bg-electric/10 text-electric border border-electric/20 shadow-[0_0_30px_rgba(0,240,255,0.15)] group-hover:bg-electric group-hover:text-midnight group-hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all duration-500"
                          >
                             {React.createElement(project.icon, { size: 64, strokeWidth: 1.5 })}
                          </motion.div>
                        ) : null}
                        
                        {/* Stat Badge */}
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="absolute top-4 right-4 z-20 bg-midnight/80 backdrop-blur border border-electric/30 px-3 py-1 rounded text-electric font-mono text-xs font-bold flex items-center gap-1 shadow-lg"
                        >
                           <Zap size={12} fill="currentColor" /> {project.stat}
                        </motion.div>
                      </div>

                      {/* Text Content */}
                      <div className="p-5 md:p-8 relative z-20 -mt-10">
                        <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
                            <span className="text-neonLime text-xs font-mono border border-neonLime/20 px-2 py-1 rounded bg-neonLime/5 tracking-wider">{project.year}</span>
                            <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">{project.category}</span>
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-electric transition-colors">{project.title}</h3>
                        
                        <p className="text-slate-300 mb-6 leading-relaxed text-sm border-l-2 border-white/10 pl-4">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((t, i) => (
                            <motion.span 
                              key={t} 
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + (i * 0.05) }}
                              className="text-xs text-slate-400 bg-white/5 border border-white/5 px-2 py-1 rounded hover:bg-white/10 hover:text-white transition-colors cursor-default"
                            >
                              {t}
                            </motion.span>
                          ))}
                        </div>

                        <motion.a 
                          href={project.link || "#contact"}
                          onClick={handleScrollToContact}
                          target={isExternal ? "_blank" : "_self"}
                          rel={isExternal ? "noopener noreferrer" : ""}
                          aria-label={isExternal ? `View live system for ${project.title}` : `Request case study for ${project.title}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full inline-flex items-center justify-center gap-2 py-3 font-bold rounded-lg transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] ${
                            isExternal 
                              ? "bg-electric text-midnight hover:bg-white" 
                              : "bg-white/5 hover:bg-electric text-white hover:text-midnight"
                          }`}
                        >
                          {isExternal ? (
                            <>
                              Live System <Globe size={16} />
                            </>
                          ) : (
                            <>
                              Request Case Study <ExternalLink size={16} />
                            </>
                          )}
                        </motion.a>
                      </div>
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

export default Experience;