import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Zap, Globe, Github, X } from 'lucide-react';
import { Project } from '../types';

const Experience: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const filters = ['All', 'AI Tools', 'Automation', 'Web Apps', 'SaaS', 'AI Agents'];

  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(project => {
        if (filters.includes(activeFilter)) {
          if (activeFilter === 'AI Tools') return project.category.includes('AI Tools');
          if (activeFilter === 'Automation') return project.category.includes('Automation') || project.title.includes('Automation');
          if (activeFilter === 'Web Apps') return project.category.includes('Web App');
          if (activeFilter === 'SaaS') return project.category.includes('SaaS');
          if (activeFilter === 'AI Agents') return project.category.includes('AI Agent');
          return true;
        }
        
        // Custom search if clicked from skills dashboard
        const search = activeFilter.toLowerCase();
        return (
          project.tech.some(t => t.toLowerCase() === search || t.toLowerCase().includes(search)) || 
          project.category.toLowerCase().includes(search) ||
          project.title.toLowerCase().includes(search) ||
          project.features.some(f => f.toLowerCase().includes(search))
        );
    });

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

  useEffect(() => {
    const handleFilterChange = (e: CustomEvent<{filter: string}>) => {
      setActiveFilter(e.detail.filter);
      
      const element = document.getElementById('work');
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };
    
    window.addEventListener('filterChange', handleFilterChange as EventListener);
    
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('filterChange', handleFilterChange as EventListener);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="work" className="py-16 md:py-24 bg-midnight relative overflow-hidden scroll-mt-32">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-electric font-mono text-sm tracking-widest mb-4 block">DEPLOYED_SOLUTIONS</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neonLime">Missions</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono text-sm mb-12">2024-2026 // PRODUCTION LOGS</p>

          <div className="flex flex-wrap justify-center items-center gap-3 mb-16 relative z-10">
             {filters.map((filter) => (
               <button
                 key={filter}
                 onClick={() => setActiveFilter(filter)}
                 className={`px-5 py-2 rounded-full font-mono text-sm transition-all duration-300 backdrop-blur-md border ${
                   activeFilter === filter 
                     ? "bg-electric text-midnight border-electric shadow-[0_0_15px_rgba(0,240,255,0.4)]" 
                     : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                 }`}
               >
                 {filter}
               </button>
             ))}
             {!filters.includes(activeFilter) && (
               <button
                 onClick={() => setActiveFilter('All')}
                 className="px-5 py-2 rounded-full font-mono text-sm transition-all duration-300 backdrop-blur-md border bg-neonLime text-midnight border-neonLime shadow-[0_0_15px_rgba(189,255,0,0.4)] flex items-center gap-2 group hover:bg-white"
               >
                 {activeFilter} 
                 <div className="bg-midnight/20 rounded-full p-0.5 group-hover:bg-midnight/30 transition-colors">
                   <X size={12} />
                 </div>
               </button>
             )}
          </div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-electric/30 to-transparent transform md:-translate-x-1/2 z-0" />

          <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
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
                className={`relative flex flex-col md:flex-row items-center mb-16 md:mb-24 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Spacer */}
                <div className="hidden md:block w-1/2" />

                {/* Connection Point */}
                <div className="absolute left-4 md:left-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-midnight border-2 border-electric flex items-center justify-center transform -translate-x-1/2 translate-y-1/2 z-10 shadow-[0_0_15px_rgba(0,240,255,0.4)] top-0 md:top-auto">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 mt-4 md:mt-0">
                   <div className="group relative rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-electric/50 transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                      
                      {/* Image/Icon Section */}
                      <div className="relative h-64 sm:h-72 overflow-hidden border-b border-white/5 flex flex-col items-center justify-center project-preview p-0">
                        {project.image ? (
                          <div className="w-full h-full p-0">
                            <motion.img 
                              loading="lazy"
                              src={project.image} 
                              alt={project.title} 
                              whileHover={{ scale: 1.02, y: -5 }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className="w-full h-full object-cover object-top opacity-100 flex-shrink-0"
                            />
                          </div>
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
                      <div className="p-6 md:p-8 relative z-20 bg-midnight">
                        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                            <span className="text-neonLime text-xs font-mono border border-neonLime/20 px-2 py-1 rounded bg-neonLime/5 tracking-wider">{project.year}</span>
                            <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">{project.category}</span>
                        </div>
                        
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-electric transition-colors">{project.title}</h3>
                        
                        <div className="space-y-4 mb-6">
                            <div>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Problem</span>
                                <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-red-500/30 pl-3">{project.problem}</p>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Solution</span>
                                <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-electric/30 pl-3">{project.solution}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Key Features</span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {project.features?.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-electric mt-1.5 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {project.results && (
                           <div className="mb-6 bg-neonLime/5 border border-neonLime/20 rounded-lg p-4">
                             <span className="text-xs font-bold text-neonLime uppercase tracking-widest block mb-1">Result / Benefit</span>
                             <p className="text-slate-300 text-sm">{project.results}</p>
                           </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map((t, i) => (
                            <motion.span 
                              key={t} 
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + (i * 0.05) }}
                              className="text-xs font-mono text-slate-400 bg-white/5 border border-white/5 px-2 py-1 rounded hover:bg-white/10 hover:text-white transition-colors cursor-default"
                            >
                              {t}
                            </motion.span>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <motion.a 
                            href={project.link || "#contact"}
                            onClick={!isExternal ? handleScrollToContact : undefined}
                            target={isExternal ? "_blank" : "_self"}
                            rel={isExternal ? "noopener noreferrer" : ""}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 inline-flex items-center justify-center gap-2 py-3 font-bold rounded-lg bg-electric text-midnight hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                          >
                            Live Demo <Globe size={16} />
                          </motion.a>
                          <motion.button 
                            onClick={() => setSelectedProject(project)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 inline-flex items-center justify-center gap-2 py-3 font-bold rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300"
                          >
                            View Case Study <ExternalLink size={16} />
                          </motion.button>
                        </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
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

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="sticky top-0 right-0 flex justify-end p-4 z-20 pointer-events-none">
                 <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 bg-midnight/50 hover:bg-white/10 text-white rounded-full backdrop-blur pointer-events-auto transition-colors"
                 >
                    <X size={24} />
                 </button>
              </div>

              {selectedProject.image && (
                <div className="w-full bg-slate-800 border-b border-white/10">
                  <div className="w-full h-48 sm:h-80 relative">
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-5 sm:p-8 bg-slate-900">
                     <span className="text-electric font-mono text-xs tracking-widest px-3 py-1 rounded-full border border-electric/30 bg-electric/10 mb-2 sm:mb-4 inline-block">{selectedProject.category}</span>
                     <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">{selectedProject.title}</h2>
                  </div>
                </div>
              )}

              <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
                 <div className="grid md:grid-cols-2 gap-8">
                   <div>
                     <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Zap className="text-red-400" size={20}/> The Problem</h3>
                     <p className="text-slate-400 leading-relaxed">{selectedProject.problem}</p>
                   </div>
                   <div>
                     <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Globe className="text-electric" size={20}/> The Solution</h3>
                     <p className="text-slate-400 leading-relaxed">{selectedProject.solution}</p>
                   </div>
                 </div>

                 <div className="border-t border-white/5 pt-8">
                   <h3 className="text-lg font-bold text-white mb-4">Core Features</h3>
                   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {selectedProject.features.map((feat, i) => (
                       <li key={i} className="flex items-center gap-3 text-slate-300">
                         <div className="w-2 h-2 rounded-full bg-neonLime" />
                         {feat}
                       </li>
                     ))}
                   </ul>
                 </div>

                 {selectedProject.results && (
                   <div className="border-t border-white/5 pt-8">
                     <h3 className="text-lg font-bold text-neonLime mb-3 flex items-center gap-2"><Zap className="text-neonLime" size={20}/> The Result</h3>
                     <p className="text-slate-300 leading-relaxed bg-neonLime/10 p-4 rounded-xl border border-neonLime/20">{selectedProject.results}</p>
                   </div>
                 )}

                 <div className="border-t border-white/5 pt-8">
                   <h3 className="text-lg font-bold text-white mb-4">Tech Stack</h3>
                   <div className="flex flex-wrap gap-2">
                     {selectedProject.tech.map((t, i) => (
                       <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-mono hover:border-white/20 transition-colors">
                         {t}
                       </span>
                     ))}
                   </div>
                 </div>

                 {selectedProject.link && (
                   <div className="mt-8">
                      <a 
                        href={selectedProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-electric text-midnight font-bold rounded-xl hover:bg-white transition-colors"
                      >
                         Launch Project <ExternalLink size={20} />
                      </a>
                   </div>
                 )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;