import React from 'react';
import { Sparkles, Zap, Shield, CheckCircle2 } from 'lucide-react';
import { SparkleParticles } from './SparkleParticles';

export function ScootersHero() {
  return (
    <div 
      id="scooters-compact-hero"
      className="relative w-full border-b border-[#2C0F12] py-8 sm:py-14 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #0D0D0D 50%, #111111 100%)',
      }}
    >
      {/* Premium Subtle Sparkle Particles (Red Family) */}
      <SparkleParticles count={14} />

      {/* Atmospheric Red Showroom Lighting */}
      <div 
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Top-Center Deep Crimson Aura */}
        <div 
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-[750px] h-[350px] rounded-full blur-[120px] opacity-30"
          style={{ background: 'radial-gradient(circle, #8B1E1E 0%, #2C0F12 55%, transparent 80%)' }}
        />
        {/* Left Dark Red Accent */}
        <div 
          className="absolute top-1/4 -left-20 w-[420px] h-[260px] rounded-full blur-[100px] opacity-20"
          style={{ background: 'radial-gradient(circle, #D71920 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Dealership Pill with Red Accents */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-[#8B1E1E]/60 shadow-lg shadow-[#2C0F12]/30 mb-3.5 text-[11px] font-bold text-[#FCE9E9]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F9040C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F9040C]"></span>
          </span>
          <span className="uppercase tracking-widest text-[#FCE9E9] font-heading font-black">
            PATEL AUTOMOBILES • AUTHORIZED SHOWROOM
          </span>
        </div>

        {/* Exact Heading */}
        <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
          EXPLORE OUR <span className="text-[#F9040C]">SCOOTERS</span>
        </h1>

        {/* Coordinated Red Accent Bar */}
        <div className="flex items-center justify-center gap-1.5 my-3 sm:my-4">
          <span className="h-1 w-10 rounded-full bg-[#F9040C]" />
          <span className="h-1 w-2.5 rounded-full bg-[#D71920]" />
          <span className="h-1 w-2.5 rounded-full bg-[#8B1E1E]" />
          <span className="h-1 w-2.5 rounded-full bg-[#2C0F12]" />
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-[#E8B7B7] max-w-xl mx-auto font-medium leading-relaxed">
          Find the right electric scooter for your everyday journey across 39 verified models.
        </p>

        {/* Micro Trust Badges in Black + Red */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-[#E8B7B7]">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0D0D0D] border border-[#2C0F12]">
            <Sparkles className="w-3.5 h-3.5 text-[#F9040C]" />
            <span>39 Verified Models</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0D0D0D] border border-[#2C0F12]">
            <Zap className="w-3.5 h-3.5 text-[#F9040C]" />
            <span>100% Electric Commuting</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0D0D0D] border border-[#2C0F12]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D71920]" />
            <span>Zelio • Warivo • Dynamo</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0D0D0D] border border-[#2C0F12]">
            <Shield className="w-3.5 h-3.5 text-[#8B1E1E]" />
            <span>Official Dealership Warranty</span>
          </div>
        </div>
      </div>
    </div>
  );
}
