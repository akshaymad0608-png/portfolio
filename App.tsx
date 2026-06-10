import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import WorkProof from './components/WorkProof';
import Experience from './components/Experience';
import Services from './components/Services';
import ClientPitch from './components/ClientPitch';
import TechMarquee from './components/TechMarquee';
import SkillsDashboard from './components/SkillsDashboard';
import AISystems from './components/AISystems';
import Lab from './components/Lab';
import Process from './components/Process';
import About from './components/About';
import Achievements from './components/Achievements';
import Certificates from './components/Certificates';
import TrustFactors from './components/TrustFactors';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import QuickConnect from './components/QuickConnect';
import AIChatBot from './components/AIChatBot';

const App: React.FC = () => {
  return (
    <div className="bg-midnight min-h-[100dvh] text-slate-200 overflow-x-hidden w-full relative">
      <NavBar />
      <main>
        <Hero />
        <TechMarquee />
        <WorkProof />
        <ClientPitch />
        <Services />
        <Experience />
        <AISystems />
        <SkillsDashboard />
        <Lab />
        <Process />
        <About />
        <Achievements />
        <Certificates />
        <TrustFactors />
        <Testimonials />
        <Contact />
      </main>
      <QuickConnect />
      <AIChatBot />
    </div>
  );
};

export default App;