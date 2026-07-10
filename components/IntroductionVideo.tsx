import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import posterImg from '../src/assets/akshay_avatar.png';
import videoFile from '../src/assets/introduction.mp4';

const IntroductionVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("Video play error:", error);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="pt-32 pb-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10 max-w-[1200px]" ref={containerRef}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-sm tracking-widest mb-4 block uppercase font-bold">Meet Akshay</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text mb-6">Building the Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI</span></h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto rounded-[2rem] overflow-hidden glass-card border border-border/50 shadow-2xl group aspect-video bg-slate-200"
        >
          {/* Replace src with your actual video path once uploaded to the public folder */}
          <video 
            ref={videoRef}
            className="w-full h-full object-cover block"
            poster={posterImg}
            onClick={togglePlay}
            onEnded={() => setIsPlaying(false)}
            onError={() => {
              // Silently handle video load errors (e.g., if the uploaded video is corrupted or still processing)
              setIsPlaying(false);
            }}
            playsInline
            muted={isMuted}
            autoPlay={false}
          >
            <source src={videoFile} type="video/mp4" />
          </video>
          
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
            <button 
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-primary/90 text-white flex items-center justify-center hover:bg-primary transition-transform hover:scale-110 shadow-[0_0_30px_rgba(0,245,255,0.3)] backdrop-blur-md"
            >
              {isPlaying ? <Pause size={32} className="ml-0.5" /> : <Play size={32} className="ml-1.5" />}
            </button>
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur-md"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroductionVideo;
