import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import NavBar from './components/NavBar';
import AIChatBot from './components/AIChatBot';
import FloatingWidgets from './components/FloatingWidgets';
import CustomCursor from './components/CustomCursor';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Pricing from './pages/Pricing';
import Testimonials from './pages/Testimonials';
import Footer from "./components/Footer";

const App: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-background min-h-[100dvh] text-text overflow-x-hidden w-full relative font-sans selection:bg-primary selection:text-white">
      <NavBar />
      <main className="relative z-10 ">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/testimonials" element={<Testimonials />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <AIChatBot />
      <FloatingWidgets />
      <CustomCursor />
    </div>
  );
};

export default App;
