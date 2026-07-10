import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CTO, TechFlow",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    text: "Akshay completely transformed our internal processes. The AI agents he built reduced our manual data processing by 85%. The ROI was apparent within the first two weeks."
  },
  {
    name: "Marcus Chen",
    role: "Founder, ScaleGen",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    text: "Working with Akshay was a game-changer. His understanding of LLMs and how to apply them to real-world business problems is unmatched. A true AI visionary."
  },
  {
    name: "Elena Rodriguez",
    role: "VP Operations, Nexus",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    text: "The automation pipelines built by Akshay are flawless. He didn't just write code; he architected a scalable ecosystem that our entire company relies on daily."
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 relative overflow-hidden bg-section">
      <div className="container mx-auto px-6 relative z-10 max-w-[1200px]">
        <div className="text-center mb-16 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs uppercase tracking-widest mb-6 font-mono font-medium inline-block"
              >
                Endorsements
            </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight text-text mb-6"
          >
            Client Feedback
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-cards border border-border rounded-3xl p-8 md:p-12 text-center relative shadow-lg">
                <Quote className="absolute top-8 left-8 w-12 h-12 text-border" />
                
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-10 text-text font-display">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div className="flex flex-col items-center justify-center">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    loading="lazy"
                    className="w-16 h-16 rounded-full object-cover mb-4 border border-border"
                  />
                  <h4 className="text-lg font-bold font-display text-text">{testimonials[currentIndex].name}</h4>
                  <span className="text-textSecondary text-sm mt-1">{testimonials[currentIndex].role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-10">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full bg-cards border border-border flex items-center justify-center hover:bg-background transition-colors text-text"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full bg-cards border border-border flex items-center justify-center hover:bg-background transition-colors text-text"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
