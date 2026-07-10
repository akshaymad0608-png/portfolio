import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageSquare, Calendar } from 'lucide-react';

const FloatingWidgets: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Scroll to Top and WhatsApp */}
      <div className="fixed bottom-24 lg:bottom-6 right-6 z-[60] flex flex-col gap-4 items-end pointer-events-none">
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              onClick={scrollToTop}
              className="w-12 h-12 glass-card text-text rounded-full flex items-center justify-center hover:bg-[rgba(0,0,0,0.1)] transition-all shadow-[0_0_15px_rgba(0,0,0,0.05)] pointer-events-auto hover-target"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
        
        <div className="pointer-events-auto flex items-center gap-4">
          <a
            href="https://wa.me/917600885080?text=Hi%20Akshay,%20I'd%20like%20to%20discuss%20a%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#22C55E] text-text rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:bg-[#16a34a] hover:-translate-y-1 transition-all relative hover-target"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
            </span>
          </a>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border z-[50] lg:hidden flex gap-4">
         <a 
           href="https://calendly.com" 
           target="_blank" 
           rel="noopener noreferrer"
           className="flex-1 bg-gradient-to-r from-primary to-accent text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all"
         >
            <Calendar size={18} /> Book Call
         </a>
      </div>
    </>
  );
};

export default FloatingWidgets;
