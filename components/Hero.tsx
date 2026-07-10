import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden py-20">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.05)_0%,rgba(248,250,252,1)_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-[1200px]">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Side */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full glass-effect border border-primary/20 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs font-medium tracking-wide text-textSecondary uppercase">Available for freelance projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-[38px] md:text-[48px] lg:text-[64px] font-bold tracking-tight text-text mb-6 leading-[1.1] font-display"
            >
              I Build AI Systems That Save Time and Grow Businesses.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-base md:text-[18px] text-textSecondary max-w-[650px] mb-10 leading-relaxed font-sans"
            >
              Prompt Engineer, Agentic AI Engineer and AI Automation Specialist helping businesses automate workflows, build AI products and generate more leads.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
            >
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-[#16a34a] hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_14px_0_rgba(34,197,94,0.39)]">
                Book Free Consultation
              </a>
              <Link to="/work" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-cards text-text font-bold rounded-xl border border-border hover:bg-glass hover:-translate-y-1 transition-all duration-300">
                View My Work
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-sm font-medium text-muted flex flex-wrap items-center gap-x-2 gap-y-1"
            >
              <span>AI Automation</span>
              <span>•</span>
              <span>Agentic AI</span>
              <span>•</span>
              <span>Web Development</span>
              <span>•</span>
              <span>Prompt Engineering</span>
            </motion.div>
          </div>

          {/* Right Side - Lightweight Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative w-full h-full min-h-[400px] flex items-center justify-center hidden lg:flex"
          >
            {/* Dashboard Mockup floating animation */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[500px] aspect-[4/3] glass-card rounded-2xl border border-border overflow-hidden shadow-2xl p-4 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-border" />
                  <div className="w-3 h-3 rounded-full bg-border" />
                  <div className="w-3 h-3 rounded-full bg-border" />
                </div>
                <div className="text-xs font-mono text-muted">AI SYSTEM ACTIVE</div>
              </div>
              
              {/* Content */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex-1 bg-background rounded-lg border border-border p-4">
                     <div className="text-muted text-[10px] mb-2 uppercase">Tasks Automated</div>
                     <div className="text-2xl font-display font-bold text-text">14,230</div>
                     <div className="text-accent text-[10px] mt-1">+92% this week</div>
                  </div>
                  <div className="flex-1 bg-background rounded-lg border border-border p-4">
                     <div className="text-muted text-[10px] mb-2 uppercase">Hours Saved</div>
                     <div className="text-2xl font-display font-bold text-text">380h</div>
                     <div className="text-accent text-[10px] mt-1">+24% this week</div>
                  </div>
                </div>
                
                <div className="flex-1 bg-background rounded-lg border border-border p-4 flex flex-col">
                  <div className="text-muted text-[10px] mb-3 uppercase flex items-center gap-2">
                    <Sparkles size={12} className="text-primary" />
                    Agent Workflow Status
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="w-full h-2 bg-cards rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                    <div className="w-full h-2 bg-cards rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                    <div className="w-full h-2 bg-cards rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "40%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
