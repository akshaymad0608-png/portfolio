import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled 
            ? 'py-4 glass-effect bg-background/80 backdrop-blur-xl border-b border-border' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 max-w-[1200px] flex justify-between items-center relative z-50">
            <Link 
              to="/" 
              aria-label="Home"
              className="text-2xl font-bold tracking-tight text-text flex items-center gap-2 font-display transition-transform hover:scale-105" 
              onClick={handleLinkClick}
            >
              <span>Akshay<span className="text-primary">.website</span></span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex gap-1 items-center bg-cards rounded-full px-2 py-1.5 border border-border">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={handleLinkClick}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors z-10 ${
                    location.pathname === link.href ? 'text-text' : 'text-textSecondary hover:text-text'
                  }`}
                >
                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-section rounded-full border border-border -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center">
               <Link to="/contact" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-xl bg-accent text-white hover:bg-[#16a34a] transition-all shadow-[0_2px_10px_0_rgba(34,197,94,0.2)]">
                  Hire Me
               </Link>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-4">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="flex items-center justify-center text-text p-2 bg-cards border border-border rounded-lg transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 pt-24 bg-background/95 backdrop-blur-xl lg:hidden z-[50] overflow-y-auto"
          >
            <div className="flex flex-col px-6 pb-12">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.name}
                  >
                    <Link 
                      to={link.href}
                      onClick={handleLinkClick}
                      className={`text-2xl font-bold py-4 block transition-colors font-display ${
                        location.pathname === link.href 
                          ? 'text-primary' 
                          : 'text-text'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: navLinks.length * 0.05 + 0.1 }} 
                className="mt-8"
              >
                <Link 
                  to="/contact"
                  onClick={handleLinkClick}
                  className="block text-center w-full bg-accent text-white px-6 py-4 rounded-xl font-bold text-lg"
                >
                  Hire Me
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
