import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROMPT_SHOWCASE } from '../constants';
import { MoveHorizontal } from 'lucide-react';

const PromptSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const handleInteractionStart = (clientX: number) => {
    setIsDragging(true);
    handleMove(clientX);
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Global Event Listeners for smooth dragging even outside the component
    const handleGlobalMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault(); // Prevent text selection while dragging
        handleMove(e.clientX);
      }
    };

    const handleGlobalUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
        if (isDragging) {
            handleMove(e.touches[0].clientX);
        }
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMove);
      window.addEventListener('mouseup', handleGlobalUp);
      window.addEventListener('touchmove', handleGlobalTouchMove);
      window.addEventListener('touchend', handleGlobalUp);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalUp);
    };
  }, [isDragging]);

  return (
    <section id="showcase" className="py-16 md:py-24 bg-midnight relative scroll-mt-32">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Prompt Alchemy</h2>
          <p className="text-slate-400">Drag to see how I transform vague ideas into precise engineering.</p>
        </motion.div>

        <div 
          ref={containerRef}
          role="slider"
          aria-valuenow={sliderPosition}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Prompt comparison slider"
          tabIndex={0}
          className="relative w-full max-w-4xl mx-auto h-[450px] sm:h-[400px] md:h-[300px] rounded-2xl overflow-hidden cursor-ew-resize border border-white/10 shadow-2xl shadow-electric/10 select-none group bg-slate-900 touch-none"
          onMouseDown={(e) => handleInteractionStart(e.clientX)}
          onTouchStart={(e) => handleInteractionStart(e.touches[0].clientX)}
        >
          {/* BACKGROUND (AFTER) - The High Quality Prompt */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12">
            <div className="w-full">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-neonLime bg-neonLime/10 border border-neonLime/20 rounded">EXPERT PROMPT</span>
              <p className="font-mono text-electric text-xs sm:text-sm md:text-base leading-relaxed break-words">
                {PROMPT_SHOWCASE.after}
              </p>
            </div>
          </div>

          {/* FOREGROUND (BEFORE) - Clipped */}
          <div 
            className="absolute top-0 left-0 bottom-0 bg-slate-800 border-r border-white/50 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
             <div 
                className="h-full flex items-center justify-center p-4 sm:p-8 md:p-12"
                style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
             >
                 <div className="w-full">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-slate-400 bg-slate-700/50 border border-slate-600 rounded">BASIC INPUT</span>
                    <p className="font-mono text-slate-300 text-base md:text-xl">
                      "{PROMPT_SHOWCASE.before}"
                    </p>
                 </div>
             </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
              <MoveHorizontal className="w-4 h-4 text-midnight" />
            </div>
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-30 mix-blend-difference">
             <span className="text-xs text-white/60 uppercase tracking-widest">Interactive Component</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptSlider;