import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Calendar, Sparkles, Zap, ShieldCheck, ChevronDown } from 'lucide-react';
import { getSlotImage } from '../lib/imageSlots';

interface HeroProps {
  onExplore: () => void;
  onBookTestRide: () => void;
}

const TOTAL_FRAMES = 200;
const FIRST_FRAME_URL = '/hero-scroll/frame_0001.png';

function getFrameUrl(index: number): string {
  // index is 0-based, files are 1-based (frame_0001.png to frame_0200.png)
  const frameNumber = index + 1;
  const padded = String(frameNumber).padStart(4, '0');
  return `/hero-scroll/frame_${padded}.png`;
}

export function Hero({ onExplore, onBookTestRide }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Array storing preloaded HTMLImageElements
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const isRenderingRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Frame drawer with strict portrait aspect ratio preservation & zero cropping of the white strip
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find the requested image, or nearest available loaded frame
    let imgToDraw: HTMLImageElement | null = imagesRef.current[frameIndex] || null;
    if (!imgToDraw || !isLoadedRef.current[frameIndex]) {
      // Find nearest loaded frame
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const lower = frameIndex - offset;
        const higher = frameIndex + offset;
        if (lower >= 0 && imagesRef.current[lower] && isLoadedRef.current[lower]) {
          imgToDraw = imagesRef.current[lower];
          break;
        }
        if (higher < TOTAL_FRAMES && imagesRef.current[higher] && isLoadedRef.current[higher]) {
          imgToDraw = imagesRef.current[higher];
          break;
        }
      }
    }

    if (!imgToDraw || !imgToDraw.naturalWidth) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = rect.width;
    const displayHeight = rect.height;

    if (canvas.width !== Math.round(displayWidth * dpr) || canvas.height !== Math.round(displayHeight * dpr)) {
      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Deep solid black canvas background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    const imgW = imgToDraw.naturalWidth || 480;
    const imgH = imgToDraw.naturalHeight || 864;

    // Mobile vs Desktop Scaling Strategy:
    // On mobile screens (displayWidth <= 768px): Full-bleed vertical Instagram-style cover scaling.
    // - Occupies 100% visible phone viewport width (left edge to right edge, 0 side gaps).
    // - Zero horizontal overflow (canvas is pinned to viewport width).
    // - Crops excess vertically/horizontally without stretching or distorting the scooter.
    // On desktop: contained portrait aspect ratio centered with atmospheric ambient lighting.
    const isMobile = displayWidth <= 768;
    const scale = isMobile
      ? Math.max(displayWidth / imgW, displayHeight / imgH)
      : Math.min(displayWidth / imgW, displayHeight / imgH);

    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const offsetX = (displayWidth - renderW) / 2;
    const offsetY = (displayHeight - renderH) / 2;

    // Draw the image cleanly
    ctx.drawImage(imgToDraw, offsetX, offsetY, renderW, renderH);

    ctx.restore();
  }, []);

  // Intelligent Preloading of ~200 Frames
  useEffect(() => {
    let isCancelled = false;

    // Helper to load a single frame
    const loadFrame = (index: number) => {
      if (imagesRef.current[index] || index >= TOTAL_FRAMES) return;
      const img = new Image();
      img.src = getFrameUrl(index);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[index] = img;
        isLoadedRef.current[index] = true;
        if (index === 0) {
          setFirstFrameLoaded(true);
          drawFrame(0);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        // Try fallback to .jpg or .webp if .png failed
        const altImg = new Image();
        altImg.src = `/hero-scroll/frame_${String(index + 1).padStart(4, '0')}.jpg`;
        altImg.onload = () => {
          if (isCancelled) return;
          imagesRef.current[index] = altImg;
          isLoadedRef.current[index] = true;
          if (index === 0) {
            setFirstFrameLoaded(true);
            drawFrame(0);
          }
        };
        altImg.onerror = () => {
          if (isCancelled) return;
          isLoadedRef.current[index] = false;
        };
      };
    };

    // 1. Immediately load frame 0, initial priority batch, and final frame (frame 200)
    for (let i = 0; i < Math.min(16, TOTAL_FRAMES); i++) {
      loadFrame(i);
    }
    loadFrame(TOTAL_FRAMES - 1);

    // 2. Progressively preload remaining frames in background idle chunks of 12
    let currentPreloadIdx = 16;
    let idleTimer: number | null = null;

    const preloadNextChunk = () => {
      if (isCancelled || currentPreloadIdx >= TOTAL_FRAMES) return;

      const chunkSize = 12;
      const end = Math.min(currentPreloadIdx + chunkSize, TOTAL_FRAMES);

      for (let i = currentPreloadIdx; i < end; i++) {
        loadFrame(i);
      }

      currentPreloadIdx = end;

      if (currentPreloadIdx < TOTAL_FRAMES) {
        const win = window as unknown as {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
          cancelIdleCallback?: (id: number) => void;
        };
        if (typeof win.requestIdleCallback === 'function') {
          idleTimer = win.requestIdleCallback(preloadNextChunk, { timeout: 500 });
        } else {
          idleTimer = window.setTimeout(preloadNextChunk, 50);
        }
      }
    };

    const initialDelay = window.setTimeout(preloadNextChunk, 150);

    return () => {
      isCancelled = true;
      window.clearTimeout(initialDelay);
      if (idleTimer) {
        const win = window as unknown as {
          cancelIdleCallback?: (id: number) => void;
        };
        if (typeof win.cancelIdleCallback === 'function') {
          win.cancelIdleCallback(idleTimer);
        } else {
          window.clearTimeout(idleTimer);
        }
      }
    };
  }, [drawFrame]);

  // Handle Window Resize to update canvas display size
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Scroll Position -> Video Frame Animation Loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      if (current !== target) {
        currentFrameRef.current = target;
        drawFrame(target);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      // Calculate progress strictly from 0 (top of hero) to 1 (end of hero scroll sequence)
      // When at top of hero: progress = 0
      // When scrolling through hero: progress 0 -> 1
      // When user passes hero into Our Scooters: rawProgress > 1, clamped strictly to 1.0
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.min(1, Math.max(0, rawProgress));

      setScrollProgress(progress);

      // Map progress across all 200 frames (Frame 0 to 199):
      // The complete sequence advances from 0.0 to 0.92, holding the FINAL FRAME (Frame 200)
      // from 0.92 to 1.0. This guarantees the user reaches the final frame BEFORE leaving Hero.
      const animProgress = Math.min(1, progress / 0.92);
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(animProgress * (TOTAL_FRAMES - 1)))
      );

      targetFrameRef.current = frameIdx;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', handleScroll);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame, prefersReducedMotion]);

  // If user prefers reduced motion, show a lightweight static hero
  if (prefersReducedMotion) {
    return (
      <section 
        id="hero-section"
        aria-label="Patel Automobiles Cinematic Showcase"
        className="relative w-full bg-[#050505] flex flex-col items-center pt-8 pb-12 overflow-hidden"
      >
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111]/90 border border-[#8B1E1E]/60 shadow-lg backdrop-blur-md mb-4">
            <span className="h-2 w-2 rounded-full bg-[#F9040C]"></span>
            <span className="font-heading font-extrabold text-[11px] uppercase tracking-widest text-[#FCE9E9]">
              PATEL AUTOMOBILES • AUTHORISED EV SHOWROOM
            </span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[0.95]">
            RIDE THE FUTURE IN <br className="hidden sm:inline" />
            <span className="text-[#F9040C]">ELECTRIC POWER</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#E8B7B7] max-w-2xl mx-auto font-medium mt-3">
            39+ verified electric scooters across <strong className="text-white">Zelio</strong>, <strong className="text-white">Warivo</strong>, and <strong className="text-white">Dynamo</strong> in Lailunga, Raigarh & Kharsia.
          </p>
        </div>

        <div className="relative w-full max-w-lg aspect-[941/1671] max-h-[70vh] mx-auto flex items-center justify-center overflow-hidden my-4">
          <img
            src={FIRST_FRAME_URL}
            alt="Patel Automobiles Cinematic Portrait"
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>

        <div className="w-full px-4 pt-4 flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 z-10">
          <button
            id="hero-explore-scooters-btn"
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white font-heading font-black text-sm uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>Explore All 39 Scooters</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-book-test-ride-btn"
            onClick={onBookTestRide}
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl bg-[#0D0D0D] hover:bg-[#2C0F12] text-white border border-[#8B1E1E] hover:border-[#F9040C] font-heading font-black text-sm uppercase tracking-wider transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#F9040C]" />
            <span>Book Test Ride</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      id="hero-section"
      aria-label="Patel Automobiles Scroll-Driven Cinematic Showcase"
      /* Balanced vertical scroll distance: 320vh - 350vh gives approx 10-12px per frame for a smooth ~200 frame sequence */
      className="relative w-full h-[320vh] sm:h-[350vh] bg-[#050505]"
    >
      {/* Pinned Sticky Viewport: Fixed inside the viewport while user scrolls through the hero sequence */}
      <div 
        id="hero-sticky-stage"
        className="sticky top-0 w-full h-[100svh] max-w-[100vw] overflow-hidden flex flex-col justify-between items-center z-10 select-none"
      >
        {/* Fallback image slot in case canvas is initializing or frames are loading */}
        {(() => {
          const fallbackUrl = getSlotImage('photos/home/hero-fallback');
          return fallbackUrl ? (
            <img
              src={fallbackUrl}
              alt="Patel Automobiles Hero Showcase"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-80"
              aria-hidden="true"
            />
          ) : null;
        })()}

        {/* Canvas Rendering Surface for the 200-frame cinematic sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Ambient atmospheric lighting flanking the portrait frame on wider screens */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_#8B1E1E_0%,_#2C0F12_40%,_transparent_75%)] z-0" 
          aria-hidden="true" 
        />

        {/* Top Scrim Gradient for initial text readability */}
        <div 
          className="absolute top-0 inset-x-0 h-32 sm:h-40 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent pointer-events-none z-[1] transition-opacity duration-300" 
          style={{ opacity: Math.max(0, 1 - scrollProgress * 2.5) }}
          aria-hidden="true" 
        />

        {/* NOTE: No bottom scrim gradient is rendered to strictly preserve the clean white bottom strip */}

        {/* TOP EDITORIAL CONTENT: Dealership Badge, Heading & Subtitle */}
        <div 
          className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pt-3 sm:pt-6 transition-opacity duration-300"
          style={{
            /* Smoothly fades top text as user scrolls so the cinematic video sequence takes full focus */
            opacity: Math.max(0, 1 - scrollProgress * 2.5),
            pointerEvents: scrollProgress > 0.3 ? 'none' : 'auto',
          }}
        >
          {/* Dealership Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111]/90 border border-[#8B1E1E]/60 shadow-lg shadow-[#2C0F12]/30 backdrop-blur-md mb-2 sm:mb-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F9040C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F9040C]"></span>
            </span>
            <span className="font-heading font-extrabold text-[10px] sm:text-xs uppercase tracking-widest text-[#FCE9E9]">
              PATEL AUTOMOBILES • AUTHORISED EV SHOWROOM
            </span>
          </div>

          {/* Large Editorial Heading */}
          <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.95]">
            RIDE THE FUTURE IN <br className="hidden sm:inline" />
            <span className="text-[#F9040C] drop-shadow-[0_0_25px_rgba(249,4,12,0.4)]">
              ELECTRIC POWER
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[11px] sm:text-xs md:text-sm text-[#E8B7B7] max-w-2xl mx-auto font-medium mt-1.5 leading-relaxed">
            39+ verified electric scooters across <strong className="text-white">Zelio</strong>, <strong className="text-white">Warivo</strong>, and <strong className="text-white">Dynamo</strong> in Lailunga, Raigarh & Kharsia.
          </p>
        </div>

        {/* CENTER INTERACTIVE SCROLL CUE: Shows prompt initially and fades out as user begins playing */}
        <div 
          className="relative z-10 flex flex-col items-center pointer-events-none transition-opacity duration-300 my-auto"
          style={{
            opacity: scrollProgress < 0.08 ? 1 : Math.max(0, 1 - (scrollProgress - 0.08) * 8),
          }}
        >
          {/* Subtle Dynamic Scrub Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D0D0D]/90 border border-[#8B1E1E]/60 backdrop-blur-md shadow-lg shadow-black/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F9040C] animate-pulse" />
            <span className="font-heading font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-[#FCE9E9]">
              SCROLL DOWN TO PLAY
            </span>
            <ChevronDown className="w-3 h-3 text-[#F9040C] animate-bounce" />
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS & HIGHLIGHTS */}
        {/* Fades out smoothly as soon as user begins scrolling so the bottom white strip stays 100% visible and un-covered */}
        <div 
          className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-3 sm:pb-5 text-center transition-all duration-300"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 3.0),
            transform: `translateY(${scrollProgress * 20}px)`,
            pointerEvents: scrollProgress > 0.2 ? 'none' : 'auto',
          }}
        >
          {/* Action Buttons: high contrast and clickable at the start */}
          <div 
            id="hero-action-buttons"
            className="w-full flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-2.5 sm:mb-3 pointer-events-auto"
          >
            <button
              id="hero-explore-scooters-btn"
              onClick={onExplore}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-[#D71920]/30 hover:shadow-[#F9040C]/50 cursor-pointer group"
            >
              <span>Explore All 39 Scooters</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="hero-book-test-ride-btn"
              onClick={onBookTestRide}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-[#0D0D0D] hover:bg-[#2C0F12] text-white border border-[#8B1E1E] hover:border-[#F9040C] font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 shadow-md hover:shadow-lg hover:shadow-[#D71920]/20 cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-[#F9040C] group-hover:scale-110 transition-transform" />
              <span>Book Test Ride</span>
            </button>
          </div>

          {/* Quick Verified Highlights Pill Grid */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-[#E8B7B7] pointer-events-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0D0D0D]/90 border border-[#2C0F12]">
              <Sparkles className="w-3.5 h-3.5 text-[#F9040C]" />
              <span>39 Verified Models</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0D0D0D]/90 border border-[#2C0F12]">
              <Zap className="w-3.5 h-3.5 text-[#F9040C]" />
              <span>Up to 120km+ Range</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0D0D0D]/90 border border-[#2C0F12]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F9040C]" />
              <span>Lailunga • Raigarh • Kharsia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
