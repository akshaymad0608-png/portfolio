import TiltCard from './ui/TiltCard';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

const filters = ["All", "AI Agents", "Automations", "Full-Stack SaaS", "Client-Side Apps"];

const Experience: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const filteredProjects = PROJECTS.filter(p => {
    if (activeFilter === "All") return true;
    return p.category.includes(activeFilter);
  });

  return (
    <section className="py-24 bg-transparent relative border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
            Project <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-lg text-textSecondary mb-8 max-w-2xl mx-auto">
            A selection of my recent work as an Gen AI Expert & Automation Architect.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-colors text-sm ${
                  activeFilter === filter 
                    ? 'bg-gradient-to-r from-accent to-secondary text-white' 
                    : 'bg-[rgba(0,0,0,0.02)] border border-border text-textSecondary hover:bg-[rgba(0,0,0,0.05)]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <TiltCard key={project.id} className="h-full">
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="glass-card bg-background/80 backdrop-blur-xl border border-border shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full"
            >
              {project.image && (
                <div className="aspect-video w-full overflow-hidden relative border-b border-border">
                  <img loading="lazy" src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-text mb-3">{project.title}</h3>
                <p className="text-textSecondary text-sm mb-6 flex-grow">{project.problem}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-xs font-medium bg-[rgba(0,0,0,0.05)] text-textSecondary px-2 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs font-medium bg-[rgba(0,0,0,0.05)] text-textSecondary px-2 py-1 rounded-md">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-3 bg-[rgba(0,0,0,0.02)] border border-border text-text font-semibold rounded-xl hover:bg-[rgba(0,0,0,0.05)] transition-colors shadow-sm"
                >
                  View Details
                </button>
              </div>
            </motion.div>
            </TiltCard>
          ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card bg-background/80 backdrop-blur-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-[rgba(0,0,0,0.02)] rounded-full shadow-md hover:bg-[rgba(0,0,0,0.05)] z-10"
              >
                <X size={20} className="text-text" />
              </button>
              
              {selectedProject.image && (
                <div className="w-full md:w-2/5 shrink-0 bg-[rgba(0,0,0,0.05)] border-b md:border-b-0 md:border-r border-border h-64 md:h-auto">
                  <img loading="lazy" src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="p-8 md:p-10 w-full">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 inline-block">
                  {selectedProject.category}
                </span>
                <h2 className="text-3xl font-bold text-text mb-6">{selectedProject.title}</h2>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-text mb-2 flex items-center gap-2"><Zap size={18} className="text-primary"/> The Challenge</h4>
                    <p className="text-textSecondary text-sm leading-relaxed">{selectedProject.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-text mb-2 flex items-center gap-2"><Globe size={18} className="text-[#22C55E]"/> The Solution</h4>
                    <p className="text-textSecondary text-sm leading-relaxed">{selectedProject.solution}</p>
                  </div>
                  {selectedProject.results && (
                    <div className="bg-[#22C55E]/10 border border-[#22C55E]/20 p-4 rounded-xl">
                       <h4 className="text-sm font-bold text-[#22C55E] mb-1">Impact</h4>
                       <p className="text-[#22C55E] text-sm font-medium">{selectedProject.results}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-text mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-[rgba(0,0,0,0.05)] text-textSecondary text-xs font-medium rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {selectedProject.link && (
                    <div className="pt-4">
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                        Launch Live <ExternalLink size={16} />
                      </a >
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
