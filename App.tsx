import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AIChatBot from './components/AIChatBot';
import FloatingWidgets from './components/FloatingWidgets';
import CustomCursor from './components/CustomCursor';

// Home ships in the main bundle — it's the landing route and shouldn't wait
// on a second request. Everything else is fetched when it's actually visited.
import Home from './pages/Home';

const Services = lazy(() => import('./pages/Services'));
const Work = lazy(() => import('./pages/Work'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Holds the viewport steady while a route chunk loads, so the footer doesn't jump up. */
const RouteFallback = () => (
  <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-label="Loading">
    <span className="h-1.5 w-1.5 rounded-full bg-wire pulse-soft" />
  </div>
);

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Lenis fights native scrolling for anyone who has asked for less motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // Land at the top of each new route rather than keeping the old scroll position.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-background font-sans text-text">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-signal focus:px-5 focus:py-2.5 focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <NavBar />

      <main id="main" className="relative z-10">
        <Suspense fallback={<RouteFallback />}>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
      <AIChatBot />
      <FloatingWidgets />
      <CustomCursor />
    </div>
  );
};

export default App;
