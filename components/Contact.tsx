import TiltCard from './ui/TiltCard';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MessageSquare, Calendar, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-section relative border-t border-border scroll-mt-24" style={{ perspective: 1500 }}>
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <TiltCard>
        <div className="bg-cards border border-border shadow-sm rounded-3xl p-8 md:p-16">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            
            {/* Left side */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-6">
                Ready to <span className="text-primary">Automate</span>?
              </h2>
              <p className="text-textSecondary text-lg leading-relaxed mb-10 max-w-md">
                As an AI Engineer & Automation Architect, I help businesses integrate advanced AI workflows to save hours of manual work and scale revenue. Let's discuss your project.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="https://wa.me/917600885080?text=Hi%20Akshay,%20I'd%20like%20to%20discuss%20a%20project" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-white hover:bg-green-50 transition-colors group shadow-sm"
                >
                  <div className="p-3 bg-green-100 rounded-lg text-success group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-bold text-text">WhatsApp</span>
                    <span className="text-sm text-textSecondary">Fastest response</span>
                  </div>
                </a>
                
                <a 
                  href="mailto:akshaymad0608@gmail.com" 
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-white hover:bg-slate-50 transition-colors group shadow-sm"
                >
                  <div className="p-3 bg-blue-50 rounded-lg text-primary group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-bold text-text">Email</span>
                    <span className="text-sm text-textSecondary">akshaymad0608@gmail.com</span>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com/in/akshay-mahajan-95bb86187" target="_blank" rel="noopener noreferrer" 
                   
                   
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-white hover:bg-slate-50 transition-colors group shadow-sm"
                >
                  <div className="p-3 bg-blue-50 rounded-lg text-primary group-hover:scale-110 transition-transform">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-bold text-text">LinkedIn</span>
                    <span className="text-sm text-textSecondary">Connect professionally</span>
                  </div>
                </a>
                
                <a 
                  href="mailto:akshaymad0608@gmail.com" 
                   
                   
                  className="flex items-center gap-4 p-4 rounded-xl border border-primary bg-primary hover:bg-blue-700 transition-colors group shadow-md"
                >
                  <div className="p-3 bg-white/20 rounded-lg text-text group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-bold text-text">Book a Call</span>
                    <span className="text-sm text-blue-100">Schedule 30-min strategy session</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-text mb-6">What are you looking for?</h3>
              <div className="grid gap-4">
                {[
                  { title: "Build Custom AI Tool", desc: "Intelligent web applications and LLM wrappers" },
                  { title: "Workflow Automation", desc: "Connect tools and automate repetitive tasks" },
                  { title: "AI Chatbots & Agents", desc: "Customer support or lead generation bots" },
                  { title: "Website Development", desc: "High-performance, SEO-optimized business websites" }
                ].map((option, i) => (
                  <motion.a
                    href={`https://wa.me/917600885080?text=Hi%20Akshay,%20I'm%20interested%20in%20${encodeURIComponent(option.title)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex flex-col p-6 rounded-xl border border-border bg-white hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-text font-bold text-lg group-hover:text-primary transition-colors">{option.title}</span>
                      <ArrowRight className="text-border group-hover:text-primary transition-colors" size={20} />
                    </div>
                    <span className="text-textSecondary text-sm">{option.desc}</span>
                  </motion.a>
                ))}
              </div>
            </div>

          </div>
        </div>

        </TiltCard>
        {/* Footer Area */}
        <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <div className="text-left hidden md:block">
            <p className="text-text font-bold mb-1">Akshay Mahajan</p>
            <p className="text-textSecondary text-sm">AI Engineer & Automation Architect</p>
          </div>
          
          <p className="text-textSecondary text-sm">
            © {new Date().getFullYear()} Akshay Mahajan. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-textSecondary font-mono">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> 
            Available for New Projects
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
