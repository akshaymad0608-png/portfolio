import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { ExternalLink, PlayCircle, Zap } from 'lucide-react';

const Expertise: React.FC = () => {
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string | undefined) => {
    if (!href) return;
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
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
    <section id="expertise" className="py-16 md:py-32 relative bg-midnight scroll-mt-32">
       {/* Ambient Light */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-electric/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20 text-center"
        >
          <span className="text-electric font-mono text-sm tracking-widest mb-4 block">CORE_COMPETENCIES</span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6">Technological <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neonLime">Arsenal</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SKILLS && SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.05 
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative flex flex-col p-6 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-electric/30 hover:bg-white/[0.05] transition-colors duration-500 backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-electric/20"
              >
                {/* Internal Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-electric/10 blur-[60px] rounded-full group-hover:bg-electric/20 transition-colors duration-500" />
                
                <div className="mb-8 relative">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="inline-flex p-5 rounded-3xl bg-white/5 text-electric group-hover:text-neonLime group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-electric/20"
                  >
                    {Icon && <Icon size={40} strokeWidth={1.2} />}
                  </motion.div>
                  <div className="absolute top-0 right-0 font-mono text-white/10 text-6xl font-black select-none pointer-events-none">
                    0{index + 1}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-electric transition-colors">{skill.name}</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8 flex-grow">{skill.description}</p>

                {/* Progress Visual */}
                <div className="space-y-3 mb-8">
                   <div className="flex justify-between items-end">
                      <span className="text-xs font-mono text-slate-500">EFFICIENCY_RATING</span>
                      <span className="text-sm font-black text-electric">{skill.level}%</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: "circOut" }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-electric to-neonLime shadow-[0_0_10px_#00f0ff]"
                    />
                    </div>
                </div>

                {/* Live Action Button */}
                {skill.demoLink && (
                  <a 
                    href={skill.demoLink}
                    onClick={(e) => handleNavigation(e, skill.demoLink)}
                    aria-label={`Launch demo for ${skill.name}`}
                    className="mt-auto w-full py-4 flex items-center justify-center gap-3 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-widest hover:bg-electric hover:text-midnight hover:border-electric transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]"
                  >
                    <PlayCircle size={20} /> Launch Demo
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Expertise;