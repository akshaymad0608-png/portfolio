import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram, MessageSquare, Globe, Calendar, Zap } from 'lucide-react';

const Contact: React.FC = () => {

  return (
    <section id="contact" className="py-16 md:py-24 bg-midnight relative scroll-mt-32">
       {/* Footer Gradient */}
       <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-electric/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-16 overflow-hidden relative">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-neonLime/10 blur-[80px] rounded-full pointer-events-none -mr-32 -mt-32" />

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 md:mb-6">Have an <span className="text-electric">idea</span>? Let's turn it into AI.</h2>
              <p className="text-slate-400 mb-8 max-w-sm">
                Ready to integrate advanced AI into your workflow, or build something new from scratch?
              </p>
              
              <div className="space-y-4">
                <a href="https://wa.me/917600885080?text=Hi%20Akshay,%20I'd%20like%20to%20discuss%20an%20AI/Web%20project" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Akshay Mahajan" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 break-all">
                  <MessageSquare className="text-green-400 shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-green-400">WhatsApp</span>
                </a>
                <a href="mailto:akshaymad0608@gmail.com" aria-label="Email Akshay Mahajan" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-xl bg-white/5 hover:bg-white/10 break-all">
                  <Mail className="text-electric shrink-0" />
                  <span className="text-sm sm:text-base">Email</span>
                </a>
                <a href="https://linkedin.com/in/akshay-mahajan-95bb86187" target="_blank" rel="noopener noreferrer" aria-label="Akshay Mahajan's LinkedIn Profile" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-xl bg-white/5 hover:bg-white/10 break-all">
                  <Linkedin className="text-electric shrink-0" />
                  <span className="text-sm sm:text-base">LinkedIn</span>
                </a>
                <a href="https://wa.me/917600885080?text=Hi%20Akshay,%20I'd%20like%20to%20schedule%20a%20consultation%20call" target="_blank" rel="noopener noreferrer" aria-label="Schedule Call" className="w-full flex items-center justify-center gap-4 text-midnight hover:text-midnight transition-colors p-4 rounded-xl bg-electric hover:bg-white break-all shadow-[0_0_20px_rgba(0,240,255,0.2)] font-bold">
                  <Calendar className="shrink-0" />
                  <span className="text-sm sm:text-base">Schedule a Call</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <h3 className="text-xl font-bold text-white mb-6">What are you looking for?</h3>
              <div className="grid gap-4">
                  {[
                      { title: "Build AI Tool", desc: "Custom AI web applications" },
                      { title: "Create Automation", desc: "Save hours with n8n / Zapier" },
                      { title: "Develop Website", desc: "High conversion fast websites" },
                      { title: "AI Consulting", desc: "Strategic AI roadmapping" }
                  ].map((option, i) => (
                      <motion.a
                        href={`https://wa.me/917600885080?text=Hi%20Akshay,%20I'm%20interested%20in%20${option.title}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex flex-col p-4 sm:p-6 rounded-xl border border-white/10 bg-slate-900/50 hover:bg-electric/10 hover:border-electric/50 transition-all cursor-pointer"
                      >
                          <span className="text-white font-bold text-lg mb-1 group-hover:text-electric transition-colors">{option.title}</span>
                          <span className="text-slate-400 text-sm">{option.desc}</span>
                      </motion.a>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center z-10 relative">
            <a 
              href="https://wa.me/917600885080?text=Hi%20Akshay,%20I'd%20like%20to%20discuss%20an%20AI/Web%20project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500/10 border border-green-500/30 text-white font-bold text-lg rounded-2xl hover:bg-green-500/20 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,197,94,0.1)]"
            >
              Discuss Your Project on WhatsApp <Zap className="w-5 h-5 text-green-400 font-bold" />
            </a>
        </div>
        
        <div className="mt-20 pt-8 pb-32 md:pb-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <div className="text-left hidden md:block">
              <p className="text-slate-300 font-bold mb-1">Akshay Mahajan</p>
              <p className="text-slate-500 text-sm max-w-[200px]">AI Generalist & Builder</p>
            </div>
            
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Akshay Mahajan. All rights reserved.</p>
            
            <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
                <span className="w-2 h-2 rounded-full bg-neonLime animate-pulse" /> OPERATIONAL
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
