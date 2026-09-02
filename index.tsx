import './styles/global.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        {/*
          Honours the visitor's "reduce motion" setting for every framer-motion
          animation on the site, in one place.

          The global.css rule below the fold of this file's concern already
          neutralises CSS animations and transitions, but framer-motion drives
          its own transforms from JavaScript and never sees it. Nine components
          — the hero, the nav, the FAQ, the chatbot among them — animated
          regardless. Reveal, PageHero, PageTransition and IntroBanner each
          called useReducedMotion by hand; the rest were simply never given the
          check, and a tenth component would have been just as easy to miss.
        */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
