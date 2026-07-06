import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2 } from 'lucide-react';

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
    <section className="py-24 bg-section border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-6 inline-block">
            Production Milestones
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
            Scale & <span className="text-primary">Impact</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-cards border border-border rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-5 mb-10 border-b border-border pb-8 relative z-10">
             <div className="p-4 bg-slate-50 rounded-2xl border border-border">
               <Trophy className="text-primary w-8 h-8" />
             </div>
             <h3 className="text-3xl font-bold text-text">Career Highlights</h3>
          </div>
          
          <ul className="space-y-6 relative z-10">
            {ACHIEVEMENTS.map((achievement, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 group"
              >
                <div className="mt-1">
                  <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
                </div>
                <p className="text-textSecondary leading-relaxed text-lg">{achievement}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
