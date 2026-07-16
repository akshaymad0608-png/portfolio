import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Send, Check } from 'lucide-react';
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
                
                <a href="https://linkedin.com/in/akshay-mahajan-95bb86187" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all hover-target hover:-translate-y-1 group hover:border-[#0077b5]/50">
                   <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#0A66C2]" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                
                <a href="https://instagram.com/akshay.website" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all hover-target hover:-translate-y-1 group hover:border-[#E1306C]/50">
                   <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#E1306C]" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
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
                Get weekly AI automation tips. No spam.
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
