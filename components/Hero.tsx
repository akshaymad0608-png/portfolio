import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Zap, Code, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <img 
              src="/akshay_avatar.jpeg" 
              alt="Akshay Mahajan" 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-top shadow-lg border-4 border-white"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=200";
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col items-center gap-3 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white text-textSecondary text-sm font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> 
              Accepting New Projects & Consulting
            </div>
            <div className="text-primary font-mono text-xs sm:text-sm tracking-widest uppercase mt-2 text-center">
              <span className="block sm:inline">Akshay Mahajan</span>
              <span className="hidden sm:inline text-textSecondary mx-2">|</span>
              <span className="block sm:inline mt-1 sm:mt-0">AI Engineer & Automation Architect</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text mb-6 leading-tight"
          >
            Build AI Automation & Intelligent Applications <br className="hidden md:block" />
            <span className="text-primary">for Modern Businesses</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            I build intelligent AI agents, chatbots, automation pipelines, and high-conversion websites that save hundreds of hours of manual work and accelerate business growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link 
              to="/work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-border text-text font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
            >
              View Projects
            </Link>
            <Link 
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
            >
              Book Free Consultation
            </Link>
            <a 
              href="https://wa.me/917600885080?text=Hi%20Akshay,%20I'd%20like%20to%20discuss%20a%20project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-success text-white font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-md"
            >
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 pt-10 border-t border-border w-full grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Code, text: "50+ Projects Completed", title: "Projects" },
              { icon: Bot, text: "15+ AI Technologies", title: "Tech Stack" },
              { icon: Zap, text: "4+ Years Learning AI", title: "Experience" },
              { icon: Award, text: "Top Certifications", title: "Credentials" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-primary mb-2">
                  <stat.icon size={24} />
                </div>
                <span className="text-xl font-bold text-text">{stat.title}</span>
                <span className="text-sm text-textSecondary text-center">{stat.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
