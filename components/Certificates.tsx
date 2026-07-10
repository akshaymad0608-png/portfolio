import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Check, ExternalLink } from 'lucide-react';
import { CERTIFICATES } from '../constants';
import TiltCard from './ui/TiltCard';

const Certificates: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="certifications" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Dynamic light ray background */}
      <motion.div 
        style={{ y }}
        className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-secondary/10 to-transparent blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 inline-block">
            Credentials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            Validated Expertise
          </h2>
          <p className="text-textSecondary text-lg leading-relaxed">
            Continuous learning and rigorous certifications to ensure my AI and automation architectures meet the highest industry standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {CERTIFICATES.map((cert, index) => (
            <TiltCard key={cert.id} className="h-full">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card rounded-[2rem] p-10 hover:bg-[rgba(0,0,0,0.05)] transition-all flex flex-col h-full group relative overflow-hidden hover-target border border-border hover:border-primary/30"
              >
                {/* Internal Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-[40px]" />
                
                <div className="flex flex-col sm:flex-row items-start gap-6 mb-8 relative z-10">
                  <div className="p-5 rounded-2xl shrink-0 text-primary bg-[rgba(0,245,255,0.05)] border border-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all duration-300">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-text mb-2 font-display">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-primary font-medium font-mono uppercase tracking-wide">
                      {cert.issuer} <span className="mx-2 opacity-50 text-textSecondary">•</span> {cert.date}
                    </p>
                  </div>
                </div>
                
                <div className="flex-grow mb-8 relative z-10">
                  <p className="text-xs font-semibold text-textSecondary mb-4 uppercase tracking-widest border-b border-border pb-2">
                    Core Capabilities
                  </p>
                  <ul className="space-y-4">
                    {cert.expertise.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-textSecondary text-sm font-medium group/item">
                        <Check className="w-5 h-5 text-[#22C55E] shrink-0 group-hover/item:scale-125 transition-transform" />
                        <span className="group-hover/item:text-text transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {cert.downloadLink && (
                  <div className="mt-auto pt-6 relative z-10">
                    <a 
                      href={cert.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-text font-semibold hover:text-primary transition-colors group/btn"
                    >
                      <span className="relative">
                        View Credential
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover/btn:w-full transition-all duration-300" />
                      </span>
                      <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                )}
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
