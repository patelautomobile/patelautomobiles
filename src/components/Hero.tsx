import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  ArrowRight,
  Calendar,
  Sparkles,
  Zap,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { getSlotImage } from '../lib/imageSlots';

interface HeroProps {
  onExplore: () => void;
  onBookTestRide: () => void;
}

const TOTAL_FRAMES = 200;
const FIRST_FRAME_URL = '/hero-scroll/frame_0001.png';

function getFrameUrl(index: number): string {
  const frameNumber = index + 1;
  return `/hero-scroll/frame_${String(frameNumber).padStart(4, '0')}.png`;
}

export function Hero({
  onExplore,
  onBookTestRide,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );

  const loadedRef = useRef<boolean[]>(
    new Array(TOTAL_FRAMES).fill(false)
  );

  const loadingRef = useRef<boolean[]>(
    new Array(TOTAL_FRAMES).fill(false)
  );

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const renderFrameRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);

  const [scrollProgress, setScrollProgress] = useState(0);

  /*
   * ---------------------------------------------------------
   * CANVAS DRAWING
   * ---------------------------------------------------------
   */

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    /*
     * First try the exact requested frame.
     */
    let image = imagesRef.current[frameIndex];

    /*
     * If the requested frame isn't ready, find the closest
     * already-loaded frame so the hero never becomes blank.
     */
    if (!image || !loadedRef.current[frameIndex]) {
      for (let distance = 1; distance < TOTAL_FRAMES; distance++) {
        const before = frameIndex - distance;
        const after = frameIndex + distance;

        if (
          before >= 0 &&
          loadedRef.current[before] &&
          imagesRef.current[before]
        ) {
          image = imagesRef.current[before];
          break;
        }

        if (
          after < TOTAL_FRAMES &&
          loadedRef.current[after] &&
          imagesRef.current[after]
        ) {
          image = imagesRef.current[after];
          break;
        }
      }
    }

    if (!image || !image.naturalWidth) {
      return;
    }

    const rect = canvas.getBoundingClientRect();

    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);

    if (
      canvas.width !== pixelWidth ||
      canvas.height !== pixelHeight
    ) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /*
     * Black background.
     */
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    const isMobile = width <= 768;

    /*
     * Preserve the portrait composition.
     *
     * Mobile uses cover so the scooter fills the screen.
     * Desktop uses contain so the full composition remains visible.
     */
    const scale = isMobile
      ? Math.max(
          width / imageWidth,
          height / imageHeight
        )
      : Math.min(
          width / imageWidth,
          height / imageHeight
        );

    const renderWidth = imageWidth * scale;
    const renderHeight = imageHeight * scale;

    const offsetX = (width - renderWidth) / 2;
    const offsetY = (height - renderHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      offsetX,
      offsetY,
      renderWidth,
      renderHeight
    );
  }, []);

  /*
   * ---------------------------------------------------------
   * LOAD ONE FRAME
   * ---------------------------------------------------------
   */

  const loadFrame = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= TOTAL_FRAMES ||
        cancelledRef.current
      ) {
        return;
      }

      if (
        loadedRef.current[index] ||
        loadingRef.current[index]
      ) {
        return;
      }

      loadingRef.current[index] = true;

      const image = new Image();

      /*
       * Helps browsers prioritize decoding the image.
       */
      image.decoding = 'async';

      image.onload = async () => {
        if (cancelledRef.current) return;

        try {
          if ('decode' in image) {
            await image.decode().catch(() => {});
          }
        } catch {
          // Ignore decode failures; normal image rendering can continue.
        }

        if (cancelledRef.current) return;

        imagesRef.current[index] = image;
        loadedRef.current[index] = true;
        loadingRef.current[index] = false;

        /*
         * Immediately draw the first frame.
         */
        if (index === 0) {
          currentFrameRef.current = 0;
          targetFrameRef.current = 0;
          drawFrame(0);
        }

        /*
         * If this is the frame currently requested by scrolling,
         * draw it immediately when it becomes available.
         */
        if (index === targetFrameRef.current) {
          currentFrameRef.current = index;
          drawFrame(index);
        }
      };

      image.onerror = () => {
        loadingRef.current[index] = false;
      };

      /*
       * Firebase absolute-root path.
       */
      image.src = getFrameUrl(index);
    },
    [drawFrame]
  );

  /*
   * ---------------------------------------------------------
   * HERO FRAME PRELOADING
   * ---------------------------------------------------------
   */

  useEffect(() => {
    cancelledRef.current = false;

    /*
     * Load the first frame immediately.
     */
    loadFrame(0);

    /*
     * Load the next few frames immediately so scrolling
     * starts smoothly.
     */
    for (let i = 1; i < 12; i++) {
      loadFrame(i);
    }

    /*
     * Also load the final frame so the end state is available.
     */
    loadFrame(TOTAL_FRAMES - 1);

    let nextIndex = 12;
    let timer: number | null = null;

    const preloadChunk = () => {
      if (
        cancelledRef.current ||
        nextIndex >= TOTAL_FRAMES
      ) {
        return;
      }

      /*
       * Small batches are safer for mobile browsers than
       * attempting to create 200 image requests at once.
       */
      const chunkEnd = Math.min(
        nextIndex + 8,
        TOTAL_FRAMES
      );

      for (let i = nextIndex; i < chunkEnd; i++) {
        loadFrame(i);
      }

      nextIndex = chunkEnd;

      if (nextIndex < TOTAL_FRAMES) {
        timer = window.setTimeout(preloadChunk, 100);
      }
    };

    timer = window.setTimeout(preloadChunk, 100);

    return () => {
      cancelledRef.current = true;

      if (timer !== null) {
        window.clearTimeout(timer);
      }
    };
  }, [loadFrame]);

  /*
   * ---------------------------------------------------------
   * LOAD FRAMES AROUND CURRENT SCROLL POSITION
   * ---------------------------------------------------------
   *
   * This is important for live Firebase:
   * the browser doesn't need every frame loaded before
   * scrolling can start.
   */

  useEffect(() => {
    const handleFrameDemand = () => {
      const target = targetFrameRef.current;

      /*
       * Load a small window around the requested frame.
       */
      for (let offset = -3; offset <= 3; offset++) {
        loadFrame(target + offset);
      }
    };

    const interval = window.setInterval(
      handleFrameDemand,
      80
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [loadFrame]);

  /*
   * ---------------------------------------------------------
   * RESIZE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener(
      'resize',
      handleResize,
      { passive: true }
    );

    window.addEventListener(
      'orientationchange',
      handleResize,
      { passive: true }
    );

    /*
     * Draw once after the page has established layout.
     */
    requestAnimationFrame(() => {
      drawFrame(currentFrameRef.current);
    });

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      );

      window.removeEventListener(
        'orientationchange',
        handleResize
      );
    };
  }, [drawFrame]);

  /*
   * ---------------------------------------------------------
   * SCROLL → FRAME
   * ---------------------------------------------------------
   *
   * IMPORTANT:
   * There is intentionally NO prefers-reduced-motion
   * condition here.
   *
   * That means the live website always gets the scroll
   * animation instead of silently switching to a static hero.
   */

  useEffect(() => {
    const updateFromScroll = () => {
      const container = containerRef.current;

      if (!container) return;

      const rect = container.getBoundingClientRect();

      const scrollableDistance =
        rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const rawProgress =
        -rect.top / scrollableDistance;

      const progress = Math.min(
        1,
        Math.max(0, rawProgress)
      );

      setScrollProgress(progress);

      /*
       * Keep the final part of the hero for the transition
       * into the next section.
       */
      const animationProgress = Math.min(
        1,
        progress / 0.92
      );

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(
          0,
          Math.round(
            animationProgress *
              (TOTAL_FRAMES - 1)
          )
        )
      );

      targetFrameRef.current = frameIndex;

      /*
       * Immediately request the target frame and nearby frames.
       */
      for (let offset = -2; offset <= 2; offset++) {
        loadFrame(frameIndex + offset);
      }
    };

    /*
     * Use a passive listener so mobile scrolling remains smooth.
     */
    window.addEventListener(
      'scroll',
      updateFromScroll,
      { passive: true }
    );

    /*
     * Initial state.
     */
    updateFromScroll();

    return () => {
      window.removeEventListener(
        'scroll',
        updateFromScroll
      );
    };
  }, [loadFrame]);

  /*
   * ---------------------------------------------------------
   * FRAME RENDER LOOP
   * ---------------------------------------------------------
   */

  useEffect(() => {
    let running = true;

    const render = () => {
      if (!running) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      if (target !== current) {
        currentFrameRef.current = target;
        drawFrame(target);
      }

      renderFrameRef.current =
        requestAnimationFrame(render);
    };

    renderFrameRef.current =
      requestAnimationFrame(render);

    return () => {
      running = false;

      if (renderFrameRef.current !== null) {
        cancelAnimationFrame(
          renderFrameRef.current
        );
      }
    };
  }, [drawFrame]);

  /*
   * ---------------------------------------------------------
   * HERO
   * ---------------------------------------------------------
   */

  return (
    <section
      ref={containerRef}
      id="hero-section"
      aria-label="Patel Automobiles Scroll-Driven Cinematic Showcase"
      className="relative w-full h-[320vh] sm:h-[350vh] bg-[#050505]"
    >
      <div
        id="hero-sticky-stage"
        className="sticky top-0 w-full h-[100svh] max-w-[100vw] overflow-hidden flex flex-col justify-between items-center z-10 select-none"
      >
        {(() => {
          const fallbackUrl = getSlotImage(
            'photos/home/hero-fallback'
          );

          return fallbackUrl ? (
            <img
              src={fallbackUrl}
              alt="Patel Automobiles Hero Showcase"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-80"
              aria-hidden="true"
            />
          ) : null;
        })()}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_#8B1E1E_0%,_#2C0F12_40%,_transparent_75%)] z-0"
          aria-hidden="true"
        />

        <div
          className="absolute top-0 inset-x-0 h-32 sm:h-40 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent pointer-events-none z-[1] transition-opacity duration-300"
          style={{
            opacity: Math.max(
              0,
              1 - scrollProgress * 2.5
            ),
          }}
          aria-hidden="true"
        />

        {/* TOP CONTENT */}
        <div
          className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pt-3 sm:pt-6 transition-opacity duration-300"
          style={{
            opacity: Math.max(
              0,
              1 - scrollProgress * 2.5
            ),
            pointerEvents:
              scrollProgress > 0.3
                ? 'none'
                : 'auto',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111]/90 border border-[#8B1E1E]/60 shadow-lg shadow-[#2C0F12]/30 backdrop-blur-md mb-2 sm:mb-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F9040C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F9040C]" />
            </span>

            <span className="font-heading font-extrabold text-[10px] sm:text-xs uppercase tracking-widest text-[#FCE9E9]">
              PATEL AUTOMOBILES • AUTHORISED EV SHOWROOM
            </span>
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.95]">
            RIDE THE FUTURE IN{' '}
            <br className="hidden sm:inline" />
            <span className="text-[#F9040C] drop-shadow-[0_0_25px_rgba(249,4,12,0.4)]">
              ELECTRIC POWER
            </span>
          </h1>

          <p className="text-[11px] sm:text-xs md:text-sm text-[#E8B7B7] max-w-2xl mx-auto font-medium mt-1.5 leading-relaxed">
            39+ verified electric scooters across{' '}
            <strong className="text-white">
              Zelio
            </strong>
            ,{' '}
            <strong className="text-white">
              Warivo
            </strong>
            , and{' '}
            <strong className="text-white">
              Dynamo
            </strong>{' '}
            in Lailunga, Raigarh & Kharsia.
          </p>
        </div>

        {/* SCROLL INDICATOR */}
        <div
          className="relative z-10 flex flex-col items-center pointer-events-none transition-opacity duration-300 my-auto"
          style={{
            opacity:
              scrollProgress < 0.08
                ? 1
                : Math.max(
                    0,
                    1 -
                      (scrollProgress - 0.08) *
                        8
                  ),
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D0D0D]/90 border border-[#8B1E1E]/60 backdrop-blur-md shadow-lg shadow-black/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F9040C] animate-pulse" />

            <span className="font-heading font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-[#FCE9E9]">
              SCROLL DOWN TO PLAY
            </span>

            <ChevronDown className="w-3 h-3 text-[#F9040C] animate-bounce" />
          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div
          className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-3 sm:pb-5 text-center transition-all duration-300"
          style={{
            opacity: Math.max(
              0,
              1 - scrollProgress * 3
            ),
            transform: `translateY(${
              scrollProgress * 20
            }px)`,
            pointerEvents:
              scrollProgress > 0.2
                ? 'none'
                : 'auto',
          }}
        >
          <div
            id="hero-action-buttons"
            className="w-full flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-2.5 sm:mb-3 pointer-events-auto"
          >
            <button
              id="hero-explore-scooters-btn"
              onClick={onExplore}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-[#D71920]/30 hover:shadow-[#F9040C]/50 cursor-pointer group"
            >
              <span>
                Explore All 39 Scooters
              </span>

              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="hero-book-test-ride-btn"
              onClick={onBookTestRide}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-[#0D0D0D] hover:bg-[#2C0F12] text-white border border-[#8B1E1E] hover:border-[#F9040C] font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 shadow-md hover:shadow-lg hover:shadow-[#D71920]/20 cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-[#F9040C] group-hover:scale-110 transition-transform" />

              <span>
                Book Test Ride
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-[#E8B7B7] pointer-events-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0D0D0D]/90 border border-[#2C0F12]">
              <Sparkles className="w-3.5 h-3.5 text-[#F9040C]" />
              <span>
                39 Verified Models
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0D0D0D]/90 border border-[#2C0F12]">
              <Zap className="w-3.5 h-3.5 text-[#F9040C]" />
              <span>
                Up to 120km+ Range
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0D0D0D]/90 border border-[#2C0F12]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F9040C]" />
              <span>
                Lailunga • Raigarh • Kharsia
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}