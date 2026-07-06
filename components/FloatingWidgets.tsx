import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageSquare } from 'lucide-react';

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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-white border border-border text-textSecondary rounded-full flex items-center justify-center hover:bg-slate-50 hover:text-primary transition-all shadow-md pointer-events-auto"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="pointer-events-auto">
        <a
          href="https://wa.me/917600885080?text=Hi%20Akshay,%20I'd%20like%20to%20discuss%20a%20project"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-success text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors relative"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
          </span>
        </a>
      </div>
    </div>
  );
};

export default FloatingWidgets;
