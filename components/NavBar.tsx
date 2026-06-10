import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.documentElement.classList.toggle('light-mode', !isLightMode);
  };


  const navLinks = [
    { name: 'Offer', href: '#client-offer' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Systems', href: '#systems' },
    { name: 'Demo', href: '#lab' },
    { name: 'Credentials', href: '#certifications' },
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
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled ? 'bg-midnight/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'}`}>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric origin-left z-50"
          style={{ scaleX }}
        />
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center relative z-50">
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
              <motion.button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-full bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
              </motion.button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-4">
              <motion.button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-full bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
              </motion.button>
              
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)} 
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="flex items-center justify-center text-white p-2 bg-white/5 rounded-full"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="fixed inset-0 pt-24 bg-[#050A15]/95 backdrop-blur-2xl md:hidden z-[50] overflow-y-auto"
          >
            <div className="flex flex-col px-8 py-8 min-h-screen gap-2">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-2xl font-bold font-display text-slate-200 hover:text-electric cursor-pointer py-4 border-b border-white/5 last:border-0 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;