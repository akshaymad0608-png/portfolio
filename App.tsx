import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AIChatBot from './components/AIChatBot';
import FloatingWidgets from './components/FloatingWidgets';
import ScrollProgress from './components/ScrollProgress';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <div className="bg-background min-h-[100dvh] text-text overflow-x-hidden w-full relative font-sans">
      <ScrollProgress />
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <AIChatBot />
      <FloatingWidgets />
    </div>
  );
};

export default App;
