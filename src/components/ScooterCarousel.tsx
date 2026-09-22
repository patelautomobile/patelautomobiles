import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { ChevronLeft, ChevronRight, ArrowRight, Gauge, Battery, Zap } from 'lucide-react';
import { RedImagePlaceholder } from './RedImagePlaceholder';

interface ScooterCarouselProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onViewAll: () => void;
}

export function ScooterCarousel({ products, onViewDetails, onViewAll }: ScooterCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Check scroll position for arrow buttons
  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  // Smooth scroll handler
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Gentle auto-slide (pauses on user hover or touch)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // If at the end, loop smoothly back to start
        if (scrollLeft >= scrollWidth - clientWidth - 15) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 260, behavior: 'smooth' });
        }
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      id="our-scooters-section"
      className="w-full bg-transparent py-10 sm:py-14 overflow-hidden text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#2C0F12] border border-[#8B1E1E] text-[#FCE9E9] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 font-heading">
              <span>OUR SCOOTERS</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
              CHOOSE YOUR <span className="text-[#F9040C]">PERFECT RIDE</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#E8B7B7] mt-1 max-w-xl">
              Swipe through popular high-efficiency models from Zelio, Warivo, and Dynamo.
            </p>
          </div>

          {/* Controls: View All + Prev/Next buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D0D0D] hover:bg-[#D71920] border border-[#511010] hover:border-[#F9040C] text-xs font-bold text-white transition-all active:scale-95 cursor-pointer mr-1 group shadow-sm"
            >
              <span>View All 39</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F9040C] group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous Scooters"
              className="w-9 h-9 rounded-xl bg-[#0D0D0D] border border-[#2C0F12] hover:border-[#F9040C] flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next Scooters"
              className="w-9 h-9 rounded-xl bg-[#0D0D0D] border border-[#2C0F12] hover:border-[#F9040C] flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="w-full flex gap-3.5 sm:gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {products.map((scooter) => (
            <div
              key={scooter.id}
              onClick={() => onViewDetails(scooter)}
              className="group cursor-pointer relative w-[220px] sm:w-[250px] md:w-[260px] shrink-0 snap-start bg-gradient-to-b from-[#0D0D0D] to-[#080808] border border-[#2C0F12] hover:border-[#F9040C] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#D71920]/25 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Cinematic Light Sweep Overlay on Hover */}
              <div 
                className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(249, 4, 12, 0.15) 50%, transparent 60%)',
                }}
              />

              {/* Scooter Image Container */}
              <div className="relative aspect-[4/3] w-full bg-[#050505] flex items-center justify-center p-3 overflow-hidden">
                {!failedImages[scooter.id] && scooter.images.frontThreeQuarter ? (
                  <img
                    src={scooter.images.frontThreeQuarter}
                    alt={`${scooter.brand} ${scooter.name}`}
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImages((prev) => ({ ...prev, [scooter.id]: true }))}
                  />
                ) : (
                  <RedImagePlaceholder
                    styleType="silhouette"
                    title={scooter.name}
                    subtitle={`${scooter.brand} Electric Scooter`}
                    className="w-full h-full"
                  />
                )}

                {/* Brand Badge */}
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#2C0F12]/95 border border-[#8B1E1E] text-[10px] font-extrabold text-[#FCE9E9] uppercase tracking-wider shadow-sm">
                  {scooter.brand}
                </span>

                {scooter.isLoader && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#8B1E1E] text-white text-[8px] font-extrabold uppercase tracking-wider shadow-xs">
                    Cargo
                  </span>
                )}
              </div>

              {/* Compact Card Content */}
              <div className="p-3.5 flex flex-col flex-grow justify-between gap-2.5">
                <div>
                  <h3 className="font-heading font-black text-sm text-white truncate group-hover:text-[#F9040C] transition-colors">
                    {scooter.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-heading font-black text-sm text-[#F9040C]">
                      {scooter.priceDisplay}
                    </span>
                    <span className="text-[9px] text-[#C97C7C] font-normal">
                      Ex-Showroom
                    </span>
                  </div>
                </div>

                {/* Quick Specs Pill Row */}
                <div className="grid grid-cols-2 gap-1.5 py-1.5 border-t border-[#2C0F12] text-[10px] text-[#E8B7B7]">
                  <div className="flex items-center gap-1">
                    <Battery className="w-3 h-3 text-[#F9040C] shrink-0" />
                    <span className="truncate">{scooter.range || 'Extended Range'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Gauge className="w-3 h-3 text-[#C97C7C] shrink-0" />
                    <span className="truncate">{scooter.topSpeed || 'EV Standard'}</span>
                  </div>
                </div>

                {/* Tap to view button */}
                <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-[#F9040C] group-hover:translate-x-0.5 transition-transform">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
