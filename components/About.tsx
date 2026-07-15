import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe2, Clock, Terminal } from 'lucide-react';
import TiltCard from './ui/TiltCard';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
             <span className="text-primary font-mono text-sm tracking-widest uppercase bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)] px-4 py-1.5 rounded-full shadow-inner">
               Gen AI Expert & Automation Architect
             </span>
             <span className="text-textSecondary font-mono text-xs flex items-center gap-2 border border-border bg-[rgba(0,0,0,0.02)] px-3 py-1.5 rounded-full">
               <Clock size={14}/> 1 min read
             </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-8 leading-tight font-display">
            Building intelligent workflows and <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">architecting scalable AI systems.</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-32 relative">
          {/* Glowing vertical line */}
          <div className="absolute left-[15px] md:left-[31px] top-4 bottom-4 w-1 bg-gradient-to-b from-accent via-secondary to-primary opacity-50 blur-[2px]" />
          
          <div className="relative border-l-2 border-border pl-10 md:pl-16 ml-4 md:ml-8 space-y-24">
            
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               className="relative group"
            >
              <div className="absolute w-6 h-6 rounded-full bg-background border-4 border-accent -left-[45px] md:-left-[69px] top-0 transition-colors group-hover:scale-125 group-hover:bg-accent duration-300 shadow-[0_0_15px_rgba(225,29,72,0.5)]" />
              <span className="text-textSecondary font-mono text-sm font-semibold tracking-widest mb-3 block">PHASE 01 // 2024</span>
              <h3 className="text-3xl font-bold text-text mb-4 font-display">The Exploration</h3>
              <p className="text-textSecondary text-lg leading-relaxed">Diving deep into Prompt Engineering, Large Language Models, and understanding the core mechanics of how AI can solve real-world operational bottlenecks.</p>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               className="relative group"
            >
              <div className="absolute w-6 h-6 rounded-full bg-background border-4 border-secondary -left-[45px] md:-left-[69px] top-0 transition-colors group-hover:scale-125 group-hover:bg-secondary duration-300 shadow-[0_0_15px_rgba(234,88,12,0.5)]" />
              <span className="text-secondary font-mono text-sm font-semibold tracking-widest mb-3 block">PHASE 02 // 2025</span>
              <h3 className="text-3xl font-bold text-text mb-4 font-display">Product Engineering</h3>
              <p className="text-textSecondary text-lg leading-relaxed">Transitioned from research to full-stack development. Built and deployed custom AI tools, automations, and highly scalable web applications processing real user data.</p>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               className="relative group"
            >
              <div className="absolute w-6 h-6 rounded-full bg-background border-4 border-primary -left-[45px] md:-left-[69px] top-0 transition-colors group-hover:scale-125 group-hover:bg-primary duration-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
              <span className="text-primary font-mono text-sm font-semibold tracking-widest mb-3 block">PHASE 03 // 2026</span>
              <h3 className="text-3xl font-bold text-text mb-4 font-display">Enterprise Integration</h3>
              <p className="text-textSecondary text-lg leading-relaxed">Partnering with founders and agencies to architect custom AI systems into their workflows, driving operational scale and eliminating manual, repetitive tasks.</p>
            </motion.div>

          </div>
        </div>

        {/* Education and Languages */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 relative z-10" style={{ perspective: 1500 }}>
            <TiltCard className="h-full">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-[2rem] p-10 hover:bg-[rgba(0,0,0,0.05)] transition-all group h-full hover-target border border-border hover:border-[rgba(0,0,0,0.2)]"
            >
                <div className="flex flex-col gap-8">
                    <div className="p-5 bg-[rgba(0,0,0,0.02)] border border-border text-accent rounded-2xl w-fit group-hover:scale-110 group-hover:text-text group-hover:bg-accent transition-all duration-300 shadow-[0_0_15px_rgba(225,29,72,0.1)]">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-text mb-6 font-display">Education</h3>
                      <div className="space-y-3">
                        <p className="text-text text-xl font-semibold">Bachelor of Engineering</p>
                        <p className="text-textSecondary text-lg">Electronics & Communication</p>
                        <p className="text-primary font-mono text-sm pt-2">Surat, India</p>
                      </div>
                    </div>
                </div>
            </motion.div>
            </TiltCard>

            <TiltCard className="h-full">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-[2rem] p-10 hover:bg-[rgba(0,0,0,0.05)] transition-all group h-full hover-target border border-border hover:border-[rgba(0,0,0,0.2)]"
            >
                <div className="flex flex-col gap-8">
                    <div className="p-5 bg-[rgba(0,0,0,0.02)] border border-border text-success rounded-2xl w-fit group-hover:scale-110 group-hover:text-text group-hover:bg-success transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                      <Globe2 className="w-8 h-8" />
                    </div>
                    <div className="w-full">
                      <h3 className="text-3xl font-bold text-text mb-8 font-display">Languages</h3>
                      <ul className="space-y-5 w-full">
                          <li className="flex justify-between items-center text-textSecondary border-b border-border pb-3 group/lang">
                            <span className="font-medium text-text text-lg">English</span>
                            <span className="text-primary font-mono text-xs bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)] px-3 py-1.5 rounded-full group-hover/lang:bg-[rgba(245,158,11,0.1)] transition-colors">Professional</span>
                          </li>
                          <li className="flex justify-between items-center text-textSecondary border-b border-border pb-3 group/lang">
                            <span className="font-medium text-text text-lg">Hindi</span>
                            <span className="text-success font-mono text-xs bg-[rgba(34,197,94,0.05)] border border-[rgba(34,197,94,0.2)] px-3 py-1.5 rounded-full group-hover/lang:bg-[rgba(34,197,94,0.1)] transition-colors">Native</span>
                          </li>
                          <li className="flex justify-between items-center text-textSecondary border-b border-border pb-3 group/lang">
                            <span className="font-medium text-text text-lg">Gujarati</span>
                            <span className="text-success font-mono text-xs bg-[rgba(34,197,94,0.05)] border border-[rgba(34,197,94,0.2)] px-3 py-1.5 rounded-full group-hover/lang:bg-[rgba(34,197,94,0.1)] transition-colors">Native</span>
                          </li>
                          <li className="flex justify-between items-center text-textSecondary pb-3 group/lang">
                            <span className="font-medium text-text text-lg">Marathi</span>
                            <span className="text-textSecondary font-mono text-xs bg-[rgba(0,0,0,0.02)] border border-border px-3 py-1.5 rounded-full group-hover/lang:bg-[rgba(0,0,0,0.05)] transition-colors">Conversational</span>
                          </li>
                      </ul>
                    </div>
                </div>
            </motion.div>
            </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default About;
