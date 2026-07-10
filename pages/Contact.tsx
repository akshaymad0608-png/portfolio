import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageSquare, MapPin } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000); // Simulate send
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-24 relative min-h-screen bg-background">
        <SEO title="Contact | Akshay Mahajan" description="Get in touch for AI consulting and automation projects." />
        
        <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 tracking-tight text-white"
            >
              Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Great</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-textSecondary"
            >
              Ready to automate your workflows or build a custom AI solution? Fill out the form below.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="bg-cards border border-border rounded-2xl p-8 flex flex-col gap-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textSecondary">Name *</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textSecondary">Email *</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textSecondary">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-textSecondary">Service Required</label>
                    <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                      <option value="">Select a service</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="AI Agents">AI Agents</option>
                      <option value="Chatbots">Chatbots</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-textSecondary">Project Budget</label>
                  <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                    <option value="">Select a budget range</option>
                    <option value="< $1000">&lt; $1,000</option>
                    <option value="$1000 - $5000">$1,000 - $5,000</option>
                    <option value="$5000 - $10000">$5,000 - $10,000</option>
                    <option value="$10000+">$10,000+</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-textSecondary">Project Details *</label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all resize-none"
                    placeholder="Tell me about your business and what you want to achieve..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-white font-bold py-4 rounded-xl mt-2 flex justify-center items-center gap-2 hover:bg-[#16a34a] transition-all shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Project Request'}
                  {!isSubmitting && <Send size={18} />}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
               <a href="mailto:akshaymad0608@gmail.com" className="bg-cards border border-border p-6 rounded-2xl flex items-center gap-6 group hover:border-primary/50 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                     <Mail size={24} />
                  </div>
                  <div>
                     <h3 className="text-textSecondary font-medium text-sm mb-1">Email Me</h3>
                     <p className="text-lg font-bold font-display text-white">akshaymad0608@gmail.com</p>
                  </div>
               </a>
               
               <a href="https://wa.me/917600885080" target="_blank" rel="noopener noreferrer" className="bg-cards border border-border p-6 rounded-2xl flex items-center gap-6 group hover:border-primary/50 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                     <MessageSquare size={24} />
                  </div>
                  <div>
                     <h3 className="text-textSecondary font-medium text-sm mb-1">WhatsApp Me</h3>
                     <p className="text-lg font-bold font-display text-white">+91 76008 85080</p>
                  </div>
               </a>

               <div className="bg-cards border border-border p-6 rounded-2xl flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                     <MapPin size={24} />
                  </div>
                  <div>
                     <h3 className="text-textSecondary font-medium text-sm mb-1">Location</h3>
                     <p className="text-lg font-bold font-display text-white">Global / Remote</p>
                  </div>
               </div>

               <div className="mt-8 bg-section border border-border p-8 rounded-2xl text-center">
                 <h3 className="text-xl font-bold font-display text-white mb-3">Prefer a face-to-face chat?</h3>
                 <p className="text-textSecondary mb-6">Book a free 30-minute discovery call to discuss your business needs.</p>
                 <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="inline-block w-full bg-background border border-border text-white font-bold py-3 rounded-xl hover:bg-cards transition-colors">
                    Book Free Consultation
                 </a>
               </div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
