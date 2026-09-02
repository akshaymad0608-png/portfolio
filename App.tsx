import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

// None of these three can be seen or used until after first paint — the chatbot
// waits on a click, the widgets sit at the edge of the viewport, the cursor is
// pointer-only decoration. In the entry chunk they were costing every visitor
// download time before the page appeared.
const AIChatBot = lazy(() => import('./components/AIChatBot'));
const FloatingWidgets = lazy(() => import('./components/FloatingWidgets'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));

// Home ships in the main bundle — it's the landing route and shouldn't wait
// on a second request. Everything else is fetched when it's actually visited.
import Home from './pages/Home';

const Services = lazy(() => import('./pages/Services'));
const Work = lazy(() => import('./pages/Work'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const AiAutomationCost = lazy(() => import('./pages/posts/AiAutomationCost'));
const LlmOptimizationCost = lazy(() => import('./pages/posts/LlmOptimizationCost'));
const Pricing = lazy(() => import('./pages/Pricing'));
const AIGuide = lazy(() => import('./pages/AIGuide'));
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

    // Fetched after mount rather than bundled with the entry chunk. Smooth
    // scrolling is a refinement of a page that already works; nobody should
    // wait on it to see the page. `cancelled` covers a very fast unmount.
    let cancelled = false;
    let frame = 0;
    let instance: import('lenis').default | null = null;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;

      instance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const raf = (time: number) => {
        instance?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      instance?.destroy();
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
              <Route
                path="/blog/ai-workflow-automation-cost-small-business"
                element={<AiAutomationCost />}
              />
              <Route
                path="/blog/llm-optimization-cost-small-businesses-india"
                element={<LlmOptimizationCost />}
              />
              <Route path="/pricing" element={<Pricing />} />
              {/* The feedback page was built on quotes I wrote myself. It is
                  gone; anyone who has the old link lands on the real work. */}
              <Route path="/testimonials" element={<Navigate to="/work" replace />} />
              <Route path="/ai-guide" element={<AIGuide />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
      <Suspense fallback={null}>
        <AIChatBot />
        <FloatingWidgets />
        <CustomCursor />
      </Suspense>
    </div>
  );
};

export default App;
