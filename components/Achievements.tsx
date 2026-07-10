import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2 } from 'lucide-react';
import TiltCard from './ui/TiltCard';

const ACHIEVEMENTS = [
  "Architected and deployed 4+ AI-powered platforms as an independent developer, handling scale for over 1M+ combined users seamlessly.",
  "Reduced operational content pipelines by 60%+ through autonomous AI workflows and advanced prompt engineering systems.",
  "Scaled 'Photo Resizer' to 1M+ active users as the primary utility for Indian government exams—achieving zero server cost via 100% client-side architecture.",
  "Engineered 'AI Master Tools', a scalable directory indexing 200+ curated AI agents with an automated programmatic SEO pipeline.",
  "Designed robust, multimodal prompt frameworks (text, image, audio, video) integrated directly into production SaaS applications.",
  "Delivered complete end-to-end AI infrastructure, bridging LLMs, database layers, and automation pipelines for global agency clients."
];

const Achievements: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 inline-block">
            Production Milestones
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            Scale & Impact
          </h2>
        </motion.div>

        <TiltCard>
          <div className="max-w-4xl mx-auto glass-card rounded-[2.5rem] p-10 sm:p-16 relative overflow-hidden group hover-target border border-border hover:border-primary/30 transition-colors duration-500">
            {/* Embedded Glow */}
            <div className="absolute -inset-10 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[40px] pointer-events-none" />
            
            <div className="flex items-center gap-6 mb-12 border-b border-border pb-10 relative z-10">
               <div className="p-5 bg-[rgba(0,0,0,0.02)] rounded-2xl border border-border text-primary shadow-inner group-hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] transition-all">
                 <Trophy className="w-10 h-10" />
               </div>
               <h3 className="text-3xl font-bold text-text font-display">Career Highlights</h3>
            </div>
            
            <ul className="space-y-8 relative z-10">
              {ACHIEVEMENTS.map((achievement, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-5 group/item"
                >
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#22C55E] shrink-0 group-hover/item:scale-110 transition-transform" />
                  </div>
                  <p className="text-textSecondary leading-relaxed text-lg group-hover/item:text-text transition-colors">{achievement}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};

export default Achievements;
