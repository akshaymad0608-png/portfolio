import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Terminal, Zap, Globe, Smartphone, Search, Brain } from 'lucide-react';
import { HERO_CONTENT, TECH_STACK } from '../constants';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const xSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const ySpring = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  const xBackground = useTransform(xSpring, [-0.5, 0.5], ["5%", "-5%"]);
  const yBackground = useTransform(ySpring, [-0.5, 0.5], ["5%", "-5%"]);

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('work');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const features = [
    { icon: Brain, label: "AI Tools Built", desc: "Proof that I can build real business tools." },
    { icon: Zap, label: "Automation Workflows", desc: "Lead, report, email and content automation." },
    { icon: Globe, label: "Client Websites", desc: "Portfolio, SaaS and product pages." },
    { icon: Terminal, label: "AI Agents", desc: "Research, support and workflow agents." },
  ];

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-40 md:pt-48 pb-16"
    >
      {/* Background Ambience */}
      <motion.div 
        style={{ x: xBackground, y: yBackground }}
        className="absolute inset-0 bg-midnight pointer-events-none"
      >
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-electric/15 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-neonLime/5 rounded-full blur-[100px] mix-blend-screen" />
      </motion.div>

      {/* Neural Node Visualizer */}
      <motion.div 
        style={{ x: useTransform(xSpring, [-0.5, 0.5], ["10%", "-10%"]), y: useTransform(ySpring, [-0.5, 0.5], ["10%", "-10%"]) }}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-electric rounded-full shadow-[0_0_8px_#00f0ff]"
          />
        ))}
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Content Container */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
            
            {/* Text Content */}
            <motion.div 
               style={{ y: yText, opacity: opacityText }}
               className="flex flex-col items-center"
            >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-8 relative"
                >
                  <div className="absolute inset-0 bg-electric/20 rounded-full blur-[30px] animate-pulse" />
                  <img src={HERO_CONTENT.image} alt="Akshay Mahajan" className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-electric/40 object-cover object-top shadow-[0_0_40px_rgba(0,240,255,0.2)]" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs sm:text-sm font-semibold tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" /> Available for Company & Client Projects
                </motion.div>

                <h1 className="text-[40px] leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 break-words">
                  {HERO_CONTENT.headline.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                      className={`inline-block mx-1 sm:mx-2 md:mx-3 ${(['ai', 'agents', 'automation'].includes(word.toLowerCase().replace(/[^a-z]/g, ''))) ? 'text-transparent bg-clip-text bg-gradient-to-r from-electric to-neonLime' : ''}`}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed px-4 sm:px-0"
                >
                  {HERO_CONTENT.subheadline}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="flex flex-wrap justify-center gap-3 mb-10 max-w-3xl px-4"
                >
                  {HERO_CONTENT.badges?.map((badge, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium flex items-center gap-2 shadow-lg backdrop-blur-md">
                      <Terminal size={14} className="text-electric" /> {badge}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-20 w-full sm:w-auto px-6 sm:px-0"
                >
                  <a 
                    href="#work" 
                    onClick={handleScrollToWork}
                    aria-label="View my work"
                    className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-midnight font-black text-base sm:text-lg rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.3)] w-full sm:w-auto"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-electric via-white to-neonLime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                     <span className="relative z-10 flex items-center gap-3">
                       {HERO_CONTENT.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                     </span>
                  </a>
                  
                  <a 
                    href="https://wa.me/917600885080?text=Hi%20Akshay,%20I'd%20like%20to%20discuss%20an%20AI/Web%20project" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Build With Me"
                    className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-transparent border border-electric/30 text-white font-black text-base sm:text-lg rounded-2xl overflow-hidden transition-all hover:border-electric hover:bg-electric/10 hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                  >
                     <span className="relative z-10 flex items-center gap-3">
                       {HERO_CONTENT.cta2} <Zap className="w-5 h-5 text-neonLime group-hover:text-electric transition-colors" />
                     </span>
                  </a>
                </motion.div>

                {/* Features Grid */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl mx-auto mb-20"
                >
                  {features.map((feature, index) => (
                    <div key={index} className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                      <feature.icon className="w-8 h-8 text-electric mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                      <h3 className="text-white font-bold mb-1 relative z-10 text-base">{feature.label}</h3>
                      <p className="text-xs text-slate-400 relative z-10 leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;