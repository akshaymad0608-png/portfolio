import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Credentials', href: '#certifications' },
    { name: 'Transformation', href: '#showcase' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-midnight/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
          <a 
            href="#" 
            aria-label="Home"
            className="text-2xl font-bold tracking-tighter text-white cursor-pointer" 
            onClick={(e) => handleScroll(e, '#')}
          >
            AKSHAY<span className="text-electric">.AI</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link, i) => (
              <motion.a 
                key={link.name} 
                href={link.href}
                aria-label={`Navigate to ${link.name}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={(e) => handleScroll(e, link.href)}
                className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#00f0ff]" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)} 
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="md:hidden flex items-center justify-center text-white p-3 -mr-3 bg-white/5 rounded-full"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-full mt-2 left-4 right-4 p-6 bg-midnight/95 backdrop-blur-2xl border border-white/10 rounded-2xl md:hidden z-50 overflow-hidden shadow-2xl shadow-electric/10"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-lg font-medium text-slate-200 hover:text-electric cursor-pointer py-2 block border-b border-white/5 last:border-0"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;