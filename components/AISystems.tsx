import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: "AIMasterTools",
    description: "A comprehensive suite of AI tools designed to enhance productivity and streamline digital workflows for content creators and marketers.",
    image: "https://image.thum.io/get/width/1200/crop/800/noanimate/https://aimastertools.space",
    tags: ["React", "Next.js", "OpenAI API", "TailwindCSS"],
    liveUrl: "https://aimastertools.space",
    caseStudyUrl: "/work"
  },
  {
    title: "QuickResume",
    description: "An intelligent resume builder that uses AI to optimize content, match job descriptions, and generate professional layouts instantly.",
    image: "https://image.thum.io/get/width/1200/crop/800/noanimate/https://quickresume.business",
    tags: ["TypeScript", "Node.js", "Claude API", "PostgreSQL"],
    liveUrl: "https://quickresume.business",
    caseStudyUrl: "/work"
  },
  {
    title: "PhotoResizer",
    description: "High-performance image processing tool powered by AI for intelligent cropping, upscaling, and format conversion.",
    image: "https://image.thum.io/get/width/1200/crop/800/noanimate/https://photoresizer.click",
    tags: ["Python", "FastAPI", "React", "AWS"],
    liveUrl: "https://photoresizer.click",
    caseStudyUrl: "/work"
  }
];

const AISystems: React.FC = () => {
  return (
    <section className="py-24 relative bg-background" id="projects">
      <div className="container mx-auto px-6 relative z-10 max-w-[1200px]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs uppercase tracking-widest mb-6 font-mono font-medium inline-block"
            >
              Featured Work
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight text-text"
            >
              Recent Projects
            </motion.h2>
          </div>
          
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
             <Link to="/work" className="inline-flex items-center gap-2 text-textSecondary hover:text-primary transition-colors font-medium">
               View All Projects <ArrowRight size={18} />
             </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-cards border border-border rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-2 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-full aspect-[4/3] overflow-hidden relative border-b border-border">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-text mb-2 font-display">{project.title}</h3>
                <p className="text-textSecondary text-sm mb-6 flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-section border border-border rounded-md text-xs font-mono text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                  <a href={project.liveUrl} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-medium py-2.5 rounded-lg hover:bg-secondary transition-colors">
                    Live Demo <ExternalLink size={14} />
                  </a>
                  <Link to={project.caseStudyUrl} className="flex-1 inline-flex items-center justify-center gap-2 bg-section border border-border text-text text-sm font-medium py-2.5 rounded-lg hover:bg-glass transition-colors">
                    Case Study <FileText size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-16 text-center block sm:hidden"
        >
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all duration-300 w-full">
             Start Your Project
             <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AISystems;
