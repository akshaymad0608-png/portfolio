import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe2, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-midnight relative border-t border-white/5 scroll-mt-20">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-4">
             <span className="text-electric font-mono text-sm tracking-widest block">ORIGIN_STORY</span>
             <span className="text-slate-500 font-mono text-xs flex items-center gap-1 border border-white/10 px-3 py-1 rounded-full bg-slate-900/50"><Clock size={12}/> 1 min read</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">From exploring AI tools to <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neonLime">building real AI solutions</span></h2>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-20">
          <div className="relative border-l-2 border-electric/30 pl-8 ml-4 md:ml-0 space-y-12">
            
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative"
            >
              <div className="absolute w-4 h-4 rounded-full bg-electric -left-[41px] top-1 shadow-[0_0_10px_#00f0ff]" />
              <span className="text-electric font-mono text-xs font-bold tracking-widest mb-2 block">2024</span>
              <h3 className="text-xl font-bold text-white mb-2">Started AI Journey</h3>
              <p className="text-slate-400">Diving deep into Prompt Engineering, LLMs, and understanding the core mechanics of how AI can solve real-world problems.</p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative"
            >
              <div className="absolute w-4 h-4 rounded-full bg-electric/50 border-2 border-electric -left-[41px] top-1" />
              <span className="text-neonLime font-mono text-xs font-bold tracking-widest mb-2 block">2025</span>
              <h3 className="text-xl font-bold text-white mb-2">Built AI Products</h3>
              <p className="text-slate-400">Transitioned from research to development. Built and deployed custom AI tools, automations, and scalable web applications.</p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative"
            >
              <div className="absolute w-4 h-4 rounded-full bg-midnight border-2 border-white/30 -left-[41px] top-1" />
              <span className="text-white font-mono text-xs font-bold tracking-widest mb-2 block">2026</span>
              <h3 className="text-xl font-bold text-white mb-2">Helping Businesses with AI</h3>
              <p className="text-slate-400">Partnering with founders and businesses to integrate AI into their operational workflows, driving growth and reducing manual tasks.</p>
            </motion.div>

          </div>
        </div>

        {/* Education and Languages */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-electric/30 transition-colors"
                >
                <div className="flex flex-col gap-4">
                    <div className="p-3 bg-electric/10 rounded-xl w-fit">
                    <BookOpen className="text-electric w-6 h-6" />
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-white mb-2">Education</h3>
                    <p className="text-slate-300 font-bold">Bachelor of Engineering</p>
                    <p className="text-slate-400 mb-1">Electronics & Communication Engineering</p>
                    <p className="text-slate-500 font-mono text-sm">Surat, India</p>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-electric/30 transition-colors"
                >
                <div className="flex flex-col gap-4">
                    <div className="p-3 bg-electric/10 rounded-xl w-fit">
                    <Globe2 className="text-electric w-6 h-6" />
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-white mb-4">Languages</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center text-slate-300">
                        <span>English</span>
                        <span className="text-electric font-mono text-sm">Professional</span>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                        <span>Hindi</span>
                        <span className="text-neonLime font-mono text-sm">Native</span>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                        <span>Gujarati</span>
                        <span className="text-neonLime font-mono text-sm">Native</span>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                        <span>Marathi</span>
                        <span className="text-slate-500 font-mono text-sm">Conversational</span>
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
