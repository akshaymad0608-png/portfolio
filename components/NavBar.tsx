import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const location = useLocation();

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.documentElement.classList.toggle('light-mode', !isLightMode);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services & Pricing', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled ? 'bg-midnight/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'}`}>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric origin-left z-50"
          style={{ scaleX }}
        />
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center relative z-50">
            <Link 
              to="/" 
              aria-label="Home"
              className="text-2xl font-bold tracking-tighter text-white cursor-pointer" 
              onClick={handleLinkClick}
            >
              AKSHAY<span className="text-electric">.AI</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              {navLinks.map((link, i) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  aria-label={`Navigate to ${link.name}`}
                  onClick={handleLinkClick}
                  className={`relative text-sm font-medium transition-colors cursor-pointer group ${location.pathname === link.href ? 'text-electric' : 'text-slate-300 hover:text-white'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-electric transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#00f0ff] ${location.pathname === link.href ? 'w-full' : 'w-0'}`} />
                </Link>
              ))}
              <div className="flex items-center gap-4 ml-4">
                <motion.button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="p-2 rounded-full bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
                </motion.button>
                <Link 
                  to="/contact"
                  onClick={handleLinkClick}
                  className="bg-electric text-midnight px-5 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,245,212,0.3)] hover:shadow-[0_0_25px_rgba(0,245,212,0.5)] transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  Hire Me
                </Link>
              </div>
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
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={handleLinkClick}
                  className={`text-2xl font-bold font-display cursor-pointer py-4 border-b border-white/5 last:border-0 transition-colors ${location.pathname === link.href ? 'text-electric' : 'text-slate-200 hover:text-electric'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;