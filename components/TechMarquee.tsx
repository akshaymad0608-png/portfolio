import React from 'react';
import { motion } from 'framer-motion';
import { TECH_STACK } from '../constants';

const TechMarquee: React.FC = () => {
  return (
    <div className="relative py-8 md:py-12 bg-midnight border-y border-white/5 overflow-hidden w-full">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-midnight to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-midnight to-transparent z-10" />
      
      <motion.div 
        className="flex whitespace-nowrap gap-12 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
          <motion.span 
            key={i} 
            whileHover={{ 
              scale: 1.1, 
              color: "#00f0ff",
              textShadow: "0 0 20px rgba(0, 240, 255, 0.5)"
            }}
            transition={{ duration: 0.2 }}
            className="text-4xl md:text-6xl font-black text-white/10 transition-colors cursor-default uppercase tracking-tighter select-none"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;