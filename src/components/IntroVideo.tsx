import { useState, useEffect, useRef } from 'react';
import { X, Play, VolumeX } from 'lucide-react';

interface IntroVideoProps {
  onDismiss: () => void;
}

export function IntroVideo({ onDismiss }: IntroVideoProps) {
  const [visible, setVisible] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Check if user has already seen the intro this session or prefers reduced motion
    const hasSeenIntro = sessionStorage.getItem('patel_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasSeenIntro && !prefersReducedMotion) {
      setVisible(true);
    } else {
      onDismiss();
    }
  }, [onDismiss]);

  const handleClose = () => {
    sessionStorage.setItem('patel_intro_seen', 'true');
    setVisible(false);
    onDismiss();
  };

  if (!visible) return null;

  return (
    <aside 
      aria-label="Cinematic dealership introduction video"
      className="fixed inset-0 z-50 bg-[#060608] flex items-center justify-center animate-in fade-in duration-300"
    >
      {/* Skip Button */}
      <button
        id="skip-intro-video-btn"
        onClick={handleClose}
        className="absolute top-6 right-6 z-20 px-4 py-2 rounded-xl bg-[#0C0C11]/80 backdrop-blur-md border border-red-950/50 text-white text-xs font-bold uppercase tracking-wider hover:text-[#FF2E3B] hover:border-red-600 transition-all flex items-center gap-1.5 cursor-pointer"
      >
        <span>Skip Intro</span>
        <X className="w-4 h-4" />
      </button>

      {/* Video Container with Fallback */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
        {!videoError ? (
          <video
            ref={videoRef}
            src="/intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleClose}
            onError={() => {
              // Asset not found or failed -> fallback immediately
              setVideoError(true);
              setTimeout(handleClose, 800);
            }}
            className="w-full h-full object-cover max-w-6xl max-h-[85vh] rounded-2xl"
          />
        ) : (
          <div className="text-center p-8 max-w-md">
            <div className="w-16 h-16 rounded-full bg-[#1F070A] border border-red-600/40 flex items-center justify-center mx-auto mb-4 text-[#FF2E3B]">
              <Play className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white uppercase font-heading mb-2">
              PATEL AUTOMOBILES
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Ride the Future Today • Lailunga, Raigarh
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
            >
              Enter Showroom
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
