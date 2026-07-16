import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS_DATA = [
  { value: "40+", label: "Projects delivered" },
  { value: "10,000+", label: "Hours automated" },
  { value: "4+", label: "Years experience" },
  { value: "35", label: "Happy clients" }
];

const StatItem = ({ stat, index }: { stat: typeof STATS_DATA[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const numericValue = parseInt(stat.value.replace(/[^0-9]/g, '')) || 0;
  const suffix = stat.value.replace(/[0-9,]/g, '');
  
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      if (numericValue === 0) return;
      
      const duration = 2000; // 2 seconds
      const steps = Math.min(100, numericValue);
      const stepSize = Math.max(1, Math.floor(numericValue / steps));
      
      let current = 0;
      const timer = setInterval(() => {
        current += stepSize;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center text-center glass-card p-6 md:p-8 rounded-2xl border border-border"
    >
      <span className="text-4xl md:text-5xl font-bold font-display text-text mb-2">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-textSecondary text-sm md:text-base font-medium">
        {stat.label}
      </span>
    </motion.div>
  );
}

const Stats: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative bg-background">
      <div className="container mx-auto px-6 max-w-[1100px] relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS_DATA.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
