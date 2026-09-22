import React from 'react';
import { ArrowRight, Calendar, PhoneCall, Sparkles, Zap } from 'lucide-react';
import { SparkleParticles } from './SparkleParticles';

interface FinalCTAProps {
  onExplore: () => void;
  onBookTestRide: () => void;
  onContact: () => void;
}

export function FinalCTA({ onExplore, onBookTestRide, onContact }: FinalCTAProps) {
  return (
    <section
      id="home-final-cta"
      aria-label="Experience the Future of Electric Mobility"
      className="relative w-full overflow-hidden py-16 sm:py-24 border-t border-[#2C0F12] bg-[#050505]"
    >
      {/* Subtle Ambient Red Sparkles */}
      <SparkleParticles count={14} />

      {/* Atmospheric Red Lighting Glows */}
      <div 
        className="pointer-events-none absolute inset-0 overflow-hidden" 
        aria-hidden="true"
      >
        <div 
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-[140px] opacity-35"
          style={{ background: 'radial-gradient(circle, #8B1E1E 0%, #2C0F12 55%, transparent 80%)' }}
        />
        {/* Subtle Horizontal Red Laser Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F9040C]/50 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
        
        {/* Atmospheric Dealership Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-[#8B1E1E]/60 mb-4 shadow-lg shadow-[#2C0F12]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#F9040C]" />
          <span className="text-[10px] sm:text-xs font-heading font-black tracking-widest text-[#FCE9E9] uppercase">
            PATEL AUTOMOBILES • READY TO RIDE
          </span>
        </div>

        {/* Dramatic Headline */}
        <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05] uppercase mb-4">
          EXPERIENCE THE FUTURE OF <br />
          <span className="text-[#F9040C] drop-shadow-[0_0_30px_rgba(249,4,12,0.45)]">
            ELECTRIC MOBILITY
          </span>
        </h2>

        {/* Coordinated Red Light Bar */}
        <div className="flex items-center justify-center gap-1.5 my-4">
          <span className="h-1 w-10 rounded-full bg-[#F9040C]" />
          <span className="h-1 w-2.5 rounded-full bg-[#D71920]" />
          <span className="h-1 w-2.5 rounded-full bg-[#8B1E1E]" />
        </div>

        <p className="text-xs sm:text-base text-[#E8B7B7] font-medium max-w-xl mx-auto mb-8 leading-relaxed">
          Visit our flagship showroom in Lailunga or connect with our regional teams across Raigarh and Kharsia to test ride all 39 verified EV models.
        </p>

        {/* 3 Prominent Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-2xl mx-auto">
          {/* 1. Explore Scooters */}
          <button
            id="final-cta-explore-btn"
            onClick={onExplore}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 shadow-xl shadow-[#D71920]/30 hover:shadow-[#F9040C]/50 cursor-pointer group"
          >
            <span>Explore Scooters</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* 2. Book a Test Ride */}
          <button
            id="final-cta-test-ride-btn"
            onClick={onBookTestRide}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D0D0D] hover:bg-[#2C0F12] text-white border border-[#8B1E1E] hover:border-[#F9040C] font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 shadow-md hover:shadow-[#D71920]/20 cursor-pointer group"
          >
            <Calendar className="w-4 h-4 text-[#F9040C] group-hover:scale-110 transition-transform" />
            <span>Book a Test Ride</span>
          </button>

          {/* 3. Contact Showroom */}
          <button
            id="final-cta-contact-btn"
            onClick={onContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D0D0D] hover:bg-[#181818] text-[#FCE9E9] hover:text-white border border-[#2C0F12] hover:border-[#8B1E1E] font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 cursor-pointer group"
          >
            <PhoneCall className="w-4 h-4 text-[#E8B7B7] group-hover:text-[#F9040C] transition-colors" />
            <span>Contact Showroom</span>
          </button>
        </div>

      </div>
    </section>
  );
}
