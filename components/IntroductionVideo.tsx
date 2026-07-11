import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PlayCircle, VideoOff, Loader2 } from 'lucide-react';

interface IntroductionVideoProps {
  /** Path to video file inside /public, e.g. "/intro.mp4" */
  src: string;
  /** Optional poster image shown before the video loads/plays, e.g. "/new_avatar.png" */
  poster?: string;
  /** Autoplay muted looping background-style video vs a click-to-play video with controls */
  variant?: 'background' | 'player';
  className?: string;
}

/**
 * Drop a real .mp4/.webm file into the /public folder (e.g. /public/intro.mp4)
 * and pass src="/intro.mp4" here. Do NOT paste video files through chat/text —
 * always upload them as raw binary files, otherwise they get corrupted the
 * same way the avatar images did.
 */
const IntroductionVideo: React.FC<IntroductionVideoProps> = ({
  src,
  poster,
  variant = 'player',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px' });
  const videoRef = useRef<HTMLVideoElement>(null);

  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [isPlaying, setIsPlaying] = useState(variant === 'background');

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play().catch(() => setStatus('error'));
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className={`relative w-full aspect-video rounded-[2rem] overflow-hidden glass-card border border-border/50 shadow-2xl bg-slate-900 ${className}`}
    >
      {status === 'error' ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400">
          <VideoOff className="w-10 h-10" />
          <span className="text-sm font-mono">Video unavailable</span>
        </div>
      ) : (
        <>
          {status === 'loading' && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-900/60">
              <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
            </div>
          )}

          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-full object-cover"
            muted={variant === 'background'}
            loop={variant === 'background'}
            autoPlay={variant === 'background'}
            playsInline
            controls={variant === 'player' && isPlaying}
            preload="metadata"
            onCanPlay={() => setStatus('ready')}
            onError={() => setStatus('error')}
          />

          {variant === 'player' && !isPlaying && status === 'ready' && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors z-20"
            >
              <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
            </button>
          )}
        </>
      )}
    </motion.div>
  );
};

export default IntroductionVideo;
