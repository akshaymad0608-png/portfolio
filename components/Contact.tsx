import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Linkedin, Github, CheckCircle, Instagram, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-midnight relative scroll-mt-32">
       {/* Footer Gradient */}
       <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-electric/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-16 overflow-hidden relative">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-neonLime/10 blur-[80px] rounded-full pointer-events-none -mr-32 -mt-32" />

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 md:mb-6">Let's Build the <span className="text-electric">Future</span></h2>
              <p className="text-slate-400 mb-8">
                Ready to integrate advanced AI into your workflow? I'm currently open for select consultancy projects.
              </p>
              
              <div className="space-y-4">
                <a href="mailto:akshaymad0608@gmail.com" aria-label="Email Akshay Mahajan" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-xl bg-white/5 hover:bg-white/10 break-all">
                  <Mail className="text-electric shrink-0" />
                  <span className="text-sm sm:text-base">akshaymad0608@gmail.com</span>
                </a>
                <a href="https://linkedin.com/in/akshay-mahajan-95bb86187" target="_blank" rel="noopener noreferrer" aria-label="Akshay Mahajan's LinkedIn Profile" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-xl bg-white/5 hover:bg-white/10 break-all">
                  <Linkedin className="text-electric shrink-0" />
                  <span className="text-sm sm:text-base">in/akshay-mahajan-95bb86187</span>
                </a>
                <a href="https://github.com/akshaymad0608" target="_blank" rel="noopener noreferrer" aria-label="Akshay Mahajan's GitHub Profile" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-xl bg-white/5 hover:bg-white/10 break-all">
                  <Github className="text-electric shrink-0" />
                  <span className="text-sm sm:text-base">github.com/akshaymad0608</span>
                </a>
                <a href="https://instagram.com/aiminivlogs4" target="_blank" rel="noopener noreferrer" aria-label="Akshay Mahajan's Instagram Profile" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-xl bg-white/5 hover:bg-white/10 break-all">
                  <Instagram className="text-electric shrink-0" />
                  <span className="text-sm sm:text-base">@aiminivlogs4</span>
                </a>
                <a href="https://youtube.com/@aiminivlogs4" target="_blank" rel="noopener noreferrer" aria-label="Akshay Mahajan's YouTube Channel" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-xl bg-white/5 hover:bg-white/10 break-all">
                  <Youtube className="text-electric shrink-0" />
                  <span className="text-sm sm:text-base">@aiminivlogs4</span>
                </a>
              </div>
            </div>

            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6" 
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Name</label>
                      <motion.input 
                        whileFocus={{ scale: 1.02, borderColor: "#00f0ff", boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)" }}
                        transition={{ duration: 0.2 }}
                        required 
                        type="text" 
                        className="w-full bg-midnight/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none transition-all placeholder:text-slate-700" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email</label>
                      <motion.input 
                        whileFocus={{ scale: 1.02, borderColor: "#00f0ff", boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)" }}
                        transition={{ duration: 0.2 }}
                        required 
                        type="email" 
                        className="w-full bg-midnight/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none transition-all placeholder:text-slate-700" 
                        placeholder="john@company.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Message</label>
                      <motion.textarea 
                        whileFocus={{ scale: 1.02, borderColor: "#00f0ff", boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)" }}
                        transition={{ duration: 0.2 }}
                        required 
                        rows={4} 
                        className="w-full bg-midnight/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none transition-all placeholder:text-slate-700" 
                        placeholder="Tell me about your project..." 
                      />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 240, 255, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isSubmitting}
                      className="w-full py-4 bg-electric text-midnight font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Transmitting...' : 'Send Transmission'} <Send size={18} />
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white/5 rounded-2xl border border-neonLime/20"
                  >
                    <div className="w-16 h-16 bg-neonLime/20 text-neonLime rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Transmission Received</h3>
                    <p className="text-slate-400">Thank you for reaching out. I will analyze your request and respond shortly.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 text-sm text-electric hover:text-white transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 pb-32 md:pb-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Akshay Mahajan. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
              <span className="w-2 h-2 bg-electric rounded-full animate-pulse shadow-[0_0_8px_#00f0ff]"></span>
              SYSTEMS_NOMINAL
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;