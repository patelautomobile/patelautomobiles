import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { getSlotImage } from '../lib/imageSlots';

interface TestRideCTAProps {
  onBookTestRide: () => void;
}

export function TestRideCTA({ onBookTestRide }: TestRideCTAProps) {
  const featureBgUrl = getSlotImage('photos/home/home-feature');

  return (
    <section
      id="test-ride-billboard-cta"
      className="relative w-full bg-[#060608] overflow-hidden py-14 sm:py-24 border-b border-red-950/40"
    >
      {/* Cinematic Automotive Backdrop */}
      {featureBgUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('${featureBgUrl}')`,
          }}
          aria-hidden="true"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#060608] via-[#060608]/90 to-[#060608]/70 pointer-events-none"
        aria-hidden="true"
      />

      {/* Atmospheric red flare */}
      <div 
        className="absolute -bottom-20 right-10 w-96 h-96 bg-[#E50914]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-2xl text-left">
          
          {/* Small pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C0C11] border border-red-600/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2E3B]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#FF2E3B] uppercase">
              SHOWROOM TEST RIDE
            </span>
          </div>

          {/* Dramatic Dealership Headline */}
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.02] uppercase mb-4">
            EXPERIENCE ELECTRIC. <br />
            <span className="text-[#E50914] drop-shadow-[0_0_25px_rgba(229,9,20,0.4)]">
              TAKE THE RIDE.
            </span>
          </h2>

          <p className="text-xs sm:text-base text-[#C5CED6] font-medium max-w-lg mb-6 leading-relaxed">
            Experience the smooth acceleration, silent ride, and effortless handling firsthand at our Lailunga showroom. No cost, no obligation.
          </p>

          {/* Large Billboard Button */}
          <div>
            <button
              id="billboard-book-ride-btn"
              onClick={onBookTestRide}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-[#E50914] hover:bg-[#B91C1C] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all transform active:scale-95 shadow-xl shadow-red-950/60 group"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>BOOK A TEST RIDE</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
