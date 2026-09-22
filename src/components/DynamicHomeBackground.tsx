import React, { useEffect, useState } from 'react';

interface DynamicHomeBackgroundProps {
  children: React.ReactNode;
}

export function DynamicHomeBackground({ children }: DynamicHomeBackgroundProps) {
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const ratio = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
          setScrollRatio(ratio);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      id="homepage-dynamic-flow-wrapper"
      className="relative w-full overflow-hidden bg-[#050505]"
      style={{
        /* Continuous flowing background: Strict Blacks (#050505 to #181818) with deep Burgundy (#2C0F12) undertones */
        background: `linear-gradient(
          180deg,
          #050505 0%,
          #080808 15%,
          #0D0D0D 35%,
          #111111 55%,
          #181818 75%,
          #0D0D0D 90%,
          #050505 100%
        )`,
      }}
    >
      {/* 
        Scroll-reactive ambient automotive lighting layers:
        - Deep Crimson (#511010, #8B1E1E) dynamic flowing mid-glow
        - True Red (#D71920) and Bright Red (#F9040C) soft atmospheric sweeps
      */}
      <div 
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Top: Deep Burgundy & Crimson Ambient Glow behind Hero */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[140px] opacity-30 transition-transform duration-300 ease-out"
          style={{
            background: 'radial-gradient(circle, #8B1E1E 0%, #2C0F12 55%, transparent 80%)',
            transform: `translate(-50%, ${scrollRatio * 160}px)`,
          }}
        />

        {/* Mid-Page: True Red & Crimson Atmospheric Sweep behind Brands & Scooters */}
        <div 
          className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[1100px] h-[750px] rounded-full blur-[160px] opacity-25 transition-transform duration-300 ease-out"
          style={{
            background: 'radial-gradient(circle, #D71920 0%, #511010 50%, transparent 80%)',
            transform: `translate(-50%, ${(scrollRatio - 0.3) * 160}px)`,
          }}
        />

        {/* Lower Page: Dark Crimson Luminous Horizon */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full blur-[180px] transition-opacity duration-500 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(139, 30, 30, 0.25) 0%, rgba(44, 15, 18, 0.2) 45%, rgba(5, 5, 5, 0.8) 80%, transparent 95%)',
            opacity: 0.3 + scrollRatio * 0.4,
          }}
        />
      </div>

      {/* Actual Content Flow */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
