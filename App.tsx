import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Services from './components/Services';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Lab from './components/Lab';
import PromptSlider from './components/PromptSlider';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import TechMarquee from './components/TechMarquee';
import QuickConnect from './components/QuickConnect';

import GitHubStats from './components/GitHubStats';

const App: React.FC = () => {
  return (
    <div className="bg-midnight min-h-[100dvh] text-slate-200 overflow-x-hidden w-full relative">
      <NavBar />
      <main>
        <Hero />
        <TechMarquee />
        <Expertise />
        <Services />
        <GitHubStats />
        <PromptSlider />
        <Experience />
        <Certificates />
        <Lab />
        <Testimonials />
        <Contact />
      </main>
      <QuickConnect />
    </div>
  );
};

export default App;