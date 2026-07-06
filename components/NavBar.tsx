import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-border py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
          style={{ scaleX }}
        />
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center relative z-50">
            <Link 
              to="/" 
              aria-label="Home"
              className="text-xl md:text-2xl font-bold tracking-tight text-text cursor-pointer flex items-center gap-3" 
              onClick={handleLinkClick}
            >
              <span>Akshay <span className="text-primary">Mahajan</span></span>
              <span className="hidden lg:block text-xs font-mono font-medium text-textSecondary border border-border px-2 py-0.5 rounded bg-slate-50">AI Engineer & Automation Architect</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  aria-label={`Navigate to ${link.name}`}
                  onClick={handleLinkClick}
                  className={`text-sm font-medium transition-colors cursor-pointer ${location.pathname === link.href ? 'text-primary font-semibold' : 'text-textSecondary hover:text-primary'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center ml-4">
                <Link 
                  to="/contact"
                  onClick={handleLinkClick}
                  className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-4">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)} 
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="flex items-center justify-center text-text p-2 hover:bg-slate-100 rounded-lg transition-colors"
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
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 0.2 }}
            className="fixed inset-0 pt-24 bg-white md:hidden z-[50] overflow-y-auto"
          >
            <div className="flex flex-col px-8 py-8 min-h-screen gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={handleLinkClick}
                  className={`text-xl font-semibold cursor-pointer py-4 border-b border-border last:border-0 transition-colors ${location.pathname === link.href ? 'text-primary' : 'text-text hover:text-primary'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8">
                <Link 
                  to="/contact"
                  onClick={handleLinkClick}
                  className="block text-center w-full bg-primary text-white px-6 py-4 rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
