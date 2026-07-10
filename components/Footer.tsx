import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Send, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="relative overflow-hidden pt-32 pb-10 bg-background border-t border-border">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-accent/10 via-secondary/5 to-transparent blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          
          <div className="lg:col-span-4">
             <Link to="/" className="text-3xl font-bold tracking-tight text-text mb-6 inline-block font-display group hover-target">
               <span>AKSHAY<span className="text-primary">_</span></span>
             </Link>
             <p className="text-textSecondary text-lg max-w-md mb-8 leading-relaxed">
               Architecting intelligent automation systems and high-conversion digital experiences for forward-thinking brands.
             </p>
             <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-textSecondary hover:text-primary hover:border-primary/50 transition-all hover-target hover:-translate-y-1">
                   <Github size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-textSecondary hover:text-primary hover:border-primary/50 transition-all hover-target hover:-translate-y-1">
                   <Linkedin size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-textSecondary hover:text-primary hover:border-primary/50 transition-all hover-target hover:-translate-y-1">
                   <Twitter size={20} />
                </a>
             </div>
          </div>

          <div className="lg:col-span-2">
             <h4 className="text-text font-bold font-display mb-6">Navigation</h4>
             <ul className="space-y-4">
                <li><Link to="/about" className="text-textSecondary hover:text-primary transition-colors hover-target inline-flex items-center gap-1 group">About <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"/></Link></li>
                <li><Link to="/work" className="text-textSecondary hover:text-primary transition-colors hover-target inline-flex items-center gap-1 group">Projects <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"/></Link></li>
                <li><Link to="/services" className="text-textSecondary hover:text-primary transition-colors hover-target inline-flex items-center gap-1 group">Services <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"/></Link></li>
                <li><Link to="/contact" className="text-textSecondary hover:text-primary transition-colors hover-target inline-flex items-center gap-1 group">Contact <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"/></Link></li>
             </ul>
          </div>

          <div className="lg:col-span-2">
             <h4 className="text-text font-bold font-display mb-6">Resources</h4>
             <ul className="space-y-4">
                <li><Link to="/blog" className="text-textSecondary hover:text-primary transition-colors hover-target inline-flex items-center gap-1 group">Blog <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"/></Link></li>
                <li><Link to="/pricing" className="text-textSecondary hover:text-primary transition-colors hover-target inline-flex items-center gap-1 group">Pricing <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"/></Link></li>
             </ul>
          </div>
          
          <div className="lg:col-span-4">
             <h4 className="text-text font-bold font-display mb-6">Subscribe to AI Insights</h4>
             <p className="text-textSecondary mb-4">
               Get actionable AI workflows and automation tips delivered to your inbox every week.
             </p>
             <form onSubmit={handleSubscribe} className="relative flex items-center">
               <input 
                 type="email" 
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="your@email.com"
                 className="w-full bg-[rgba(0,0,0,0.03)] border border-border rounded-xl pl-4 pr-12 py-3 text-sm text-text placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-[rgba(0,0,0,0.05)] transition-all font-sans"
               />
               <button 
                 type="submit"
                 className="absolute right-2 p-2 text-primary hover:text-accent transition-colors disabled:opacity-50"
                 disabled={subscribed}
               >
                 {subscribed ? <Check size={18} className="text-success" /> : <Send size={18} />}
               </button>
             </form>
             <p className="text-xs text-textSecondary mt-3 font-mono">
                Join 5,000+ subscribers. No spam.
             </p>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-textSecondary text-sm">
             © {new Date().getFullYear()} Akshay Mahajan. All rights reserved.
           </p>
           <div className="flex items-center gap-2 text-sm text-textSecondary">
             <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
             Systems fully operational
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
