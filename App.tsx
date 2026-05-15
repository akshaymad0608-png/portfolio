import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Services from './components/Services';
import Experience from './components/Experience';
import Lab from './components/Lab';
import PromptSlider from './components/PromptSlider';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import TechMarquee from './components/TechMarquee';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  return (
    <div className="bg-midnight min-h-[100dvh] text-slate-200 overflow-x-hidden w-full relative">
      <NavBar />
      <main>
        <Hero />
        <TechMarquee />
        <Expertise />
        <Services />
        <PromptSlider />
        <Experience />
        <Lab />
        <Testimonials />
        <Contact />
      </main>
      <AIAssistant />
    </div>
  );
};

export default App;