import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center min-h-[100vh] bg-background overflow-hidden pb-20 pt-32 lg:pt-40">
      <div className="container mx-auto px-6 relative z-10 max-w-[1300px] mt-auto mb-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Side */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 inline-flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-text tracking-tight font-display">
                Akshay Mahajan
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-[42px] md:text-[56px] lg:text-[72px] font-bold tracking-tight text-text mb-6 leading-[1.05] font-display"
            >
              AI-powered automation <br className="hidden md:block" /> for work
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-[22px] text-textSecondary max-w-[600px] mb-10 leading-relaxed font-sans"
            >
              Prompt Engineer and AI Automation Specialist helping businesses automate workflows, build intelligent products, and generate more leads with AI.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a 
                href="https://calendly.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#1a73e8] text-white font-medium rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg"
              >
                Book Consultation
              </a>
              <Link 
                to="/work" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-background text-[#1a73e8] border border-gray-200 font-medium rounded-full hover:bg-gray-50 transition-colors duration-300 text-lg shadow-sm"
              >
                View My Work
              </Link>
            </motion.div>
          </div>

          {/* Right Side - Image Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center lg:pl-10 mt-10 lg:mt-0"
          >
            <div className="relative w-full aspect-[4/3] max-w-[650px]">
              
              {/* Floating Header Tag */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 left-10 z-20 bg-background px-4 py-2 rounded-full shadow-lg border border-border flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <Play className="w-3 h-3 text-blue-600 fill-current" />
                </div>
                <span className="text-sm font-medium text-text">
                  <span className="text-blue-600 font-semibold">Hello, User.</span> Let's automate.
                </span>
              </motion.div>

              {/* Main Avatar Image */}
              <div className="absolute inset-0 top-10 rounded-3xl overflow-hidden shadow-2xl border border-border bg-cards flex items-center justify-center">
                <img 
                  src="/akshay_avatar.png?v=2" 
                  alt="Akshay Mahajan" 
                  className="w-full h-full object-contain md:object-cover"
                />
              </div>

              {/* Floating UI Widget (Transcript/Stats mockup) */}
              <motion.div 
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-6 lg:-left-12 z-20 bg-background rounded-2xl shadow-xl border border-border p-4 w-[280px]"
              >
                <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquareText className="w-4 h-4 text-textSecondary" />
                    <span className="text-sm font-semibold text-text">Automations</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">Active</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs text-textSecondary leading-relaxed">
                    Let's take a look at how the workflow is structured. Tasks are <span className="bg-blue-100 text-blue-800 px-1 rounded">prioritized</span> and assigned to specific agents to keep everything moving <span className="bg-[#1a73e8] text-white px-1.5 py-0.5 rounded shadow-sm">efficiently</span>.
                  </p>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Bottom Nav Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-background rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border px-8 py-4 hidden md:flex items-center gap-8 z-30"
      >
        <span className="text-sm font-semibold text-text cursor-pointer hover:text-[#1a73e8] transition-colors">Use cases</span>
        <span className="text-sm font-medium text-textSecondary cursor-pointer hover:text-[#1a73e8] transition-colors">Create</span>
        <span className="text-sm font-medium text-textSecondary cursor-pointer hover:text-[#1a73e8] transition-colors">Automate</span>
        <span className="text-sm font-medium text-textSecondary cursor-pointer hover:text-[#1a73e8] transition-colors">Generate</span>
        <span className="text-sm font-medium text-textSecondary cursor-pointer hover:text-[#1a73e8] transition-colors">Customise</span>
        <span className="text-sm font-medium text-textSecondary cursor-pointer hover:text-[#1a73e8] transition-colors">Collaborate</span>
        <span className="text-sm font-medium text-textSecondary cursor-pointer hover:text-[#1a73e8] transition-colors">FAQ</span>
      </motion.div>
    </section>
  );
};

export default Hero;
