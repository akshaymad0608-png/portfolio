import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 relative bg-background">
      <div className="container mx-auto px-6 relative z-10 max-w-[1200px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-section border border-border rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
          
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text mb-6">
            Ready to scale your business with AI?
          </h2>
          <p className="text-lg text-textSecondary max-w-2xl mx-auto mb-10">
            Let's discuss how custom AI automation and intelligent web applications can save you time, reduce costs, and accelerate your growth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-[#16a34a] transition-all shadow-[0_4px_14px_0_rgba(34,197,94,0.39)]">
              Book Free Consultation
            </Link>
            <a href="mailto:akshaymad0608@gmail.com" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-cards text-text border border-border font-bold rounded-xl hover:bg-background transition-all">
              Email Me Directly <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
