import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe2, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-background relative border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
             <span className="text-primary font-mono text-sm tracking-wider uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
               AI Engineer & Automation Architect
             </span>
             <span className="text-textSecondary font-mono text-xs flex items-center gap-2 border border-border bg-white px-3 py-1.5 rounded-full shadow-sm">
               <Clock size={14}/> 1 min read
             </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-text mb-8 leading-tight">
            Building intelligent workflows and <br className="hidden md:block"/>
            <span className="text-primary">architecting scalable AI systems.</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-24">
          <div className="relative border-l-2 border-border pl-8 md:pl-12 ml-4 md:ml-0 space-y-16">
            
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative group"
            >
              <div className="absolute w-4 h-4 rounded-full bg-white border-4 border-slate-300 -left-[41px] md:-left-[57px] top-1 transition-colors" />
              <span className="text-textSecondary font-mono text-sm font-semibold tracking-wider mb-3 block">PHASE 01 // 2024</span>
              <h3 className="text-2xl font-bold text-text mb-3">The Exploration</h3>
              <p className="text-textSecondary text-lg leading-relaxed">Diving deep into Prompt Engineering, Large Language Models, and understanding the core mechanics of how AI can solve real-world operational bottlenecks.</p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative group"
            >
              <div className="absolute w-4 h-4 rounded-full bg-white border-4 border-blue-400 -left-[41px] md:-left-[57px] top-1 transition-colors" />
              <span className="text-primary font-mono text-sm font-semibold tracking-wider mb-3 block">PHASE 02 // 2025</span>
              <h3 className="text-2xl font-bold text-text mb-3">Product Engineering</h3>
              <p className="text-textSecondary text-lg leading-relaxed">Transitioned from research to full-stack development. Built and deployed custom AI tools, automations, and highly scalable web applications processing real user data.</p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative group"
            >
              <div className="absolute w-4 h-4 rounded-full bg-white border-4 border-success -left-[41px] md:-left-[57px] top-1 transition-colors shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
              <span className="text-success font-mono text-sm font-semibold tracking-wider mb-3 block">PHASE 03 // 2026</span>
              <h3 className="text-2xl font-bold text-text mb-3">Enterprise Integration</h3>
              <p className="text-textSecondary text-lg leading-relaxed">Partnering with founders and agencies to architect custom AI systems into their workflows, driving operational scale and eliminating manual, repetitive tasks.</p>
            </motion.div>

          </div>
        </div>

        {/* Education and Languages */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-cards border border-border shadow-sm rounded-3xl p-8 sm:p-10 hover:shadow-md transition-shadow group"
            >
                <div className="flex flex-col gap-6">
                    <div className="p-4 bg-blue-50 text-primary rounded-2xl w-fit group-hover:scale-110 transition-transform">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text mb-4">Education</h3>
                      <div className="space-y-2">
                        <p className="text-text text-lg font-semibold">Bachelor of Engineering</p>
                        <p className="text-textSecondary">Electronics & Communication</p>
                        <p className="text-primary font-mono text-sm pt-2">Surat, India</p>
                      </div>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-cards border border-border shadow-sm rounded-3xl p-8 sm:p-10 hover:shadow-md transition-shadow group"
            >
                <div className="flex flex-col gap-6">
                    <div className="p-4 bg-green-50 text-success rounded-2xl w-fit group-hover:scale-110 transition-transform">
                      <Globe2 className="w-8 h-8" />
                    </div>
                    <div className="w-full">
                      <h3 className="text-2xl font-bold text-text mb-6">Languages</h3>
                      <ul className="space-y-4 w-full">
                          <li className="flex justify-between items-center text-textSecondary border-b border-border pb-2">
                            <span className="font-medium text-text">English</span>
                            <span className="text-primary font-mono text-sm bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">Professional</span>
                          </li>
                          <li className="flex justify-between items-center text-textSecondary border-b border-border pb-2">
                            <span className="font-medium text-text">Hindi</span>
                            <span className="text-success font-mono text-sm bg-green-50 border border-green-100 px-3 py-1 rounded-full">Native</span>
                          </li>
                          <li className="flex justify-between items-center text-textSecondary border-b border-border pb-2">
                            <span className="font-medium text-text">Gujarati</span>
                            <span className="text-success font-mono text-sm bg-green-50 border border-green-100 px-3 py-1 rounded-full">Native</span>
                          </li>
                          <li className="flex justify-between items-center text-textSecondary pb-2">
                            <span className="font-medium text-text">Marathi</span>
                            <span className="text-textSecondary font-mono text-sm bg-slate-100 border border-border px-3 py-1 rounded-full">Conversational</span>
                          </li>
                      </ul>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
