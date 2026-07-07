import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    id: 1,
    title: "AI Customer Support Agent",
    description: "An intelligent chatbot that integrates with your knowledge base to provide instant, accurate answers to customer queries, reducing support tickets by 40%.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tech: ["React", "Node.js", "OpenAI", "Pinecone"],
    liveUrl: "/contact",
    githubUrl: "/contact"
  },
  {
    id: 2,
    title: "Automated SEO Content Pipeline",
    description: "A complete automation system that generates SEO-optimized blog posts, meta descriptions, and social media captions based on trending keywords.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tech: ["Python", "Make.com", "ChatGPT API", "Airtable"],
    liveUrl: "/contact",
    githubUrl: "/contact"
  },
  {
    id: 3,
    title: "Enterprise Dashboard Application",
    description: "A comprehensive analytics dashboard for tracking business metrics in real-time, featuring custom data visualization and AI-powered insights.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
    tech: ["Next.js", "Tailwind CSS", "PostgreSQL", "D3.js"],
    liveUrl: "/contact",
    githubUrl: "/contact"
  }
];

const AISystems: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
            AI & Automation <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-lg text-textSecondary leading-relaxed">
            Real-world AI agents, web applications, and workflow automations architected to solve complex business problems.
          </p>
        </div>

        <div className="space-y-12 md:space-y-24">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg group">
                  <div className="aspect-video w-full">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-text mb-4">{project.title}</h3>
                <p className="text-textSecondary text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-slate-100 text-textSecondary text-sm font-medium rounded-md border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Link 
                    to={project.liveUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Request Demo <ExternalLink size={18} />
                  </Link>
                  <Link 
                    to={project.githubUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-border text-text font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    Case Study <Github size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AISystems;
