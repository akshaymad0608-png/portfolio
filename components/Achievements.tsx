import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2 } from 'lucide-react';

const ACHIEVEMENTS = [
  "Built and deployed 4+ AI-powered web tools and platforms as a solo freelancer, serving 1M+ combined users entirely through remote work.",
  "Reduced content production time by 60%+ through intelligent AI automation and advanced prompt engineering techniques.",
  "Scaled Photo Resizer to 1M+ users as the go-to tool for Indian government exam photo processing—zero server cost, 100% client-side.",
  "Launched AI Master Tools featuring 200+ curated AI tools across 10 categories with strong organic SEO traction.",
  "Developed scalable multi-platform prompt frameworks for text, image, audio, and video generation deployed across freelance projects.",
  "Delivered end-to-end AI solutions integrating LLMs, automation platforms, and multimodal AI tools for global remote clients."
];

const Achievements: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-[#050A15] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-electric font-mono text-sm tracking-widest mb-4 block">MILESTONES</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neonLime">Achievements</span></h2>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-4 sm:pb-6">
             <div className="p-3 bg-neonLime/10 rounded-xl">
               <Trophy className="text-neonLime w-8 h-8" />
             </div>
             <h3 className="text-2xl font-bold text-white">Career Highlights</h3>
          </div>
          
          <ul className="space-y-6">
            {ACHIEVEMENTS.map((achievement, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="mt-1">
                  <CheckCircle2 className="w-6 h-6 text-electric border-black shrink-0" />
                </div>
                <p className="text-slate-300 leading-relaxed text-lg">{achievement}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
