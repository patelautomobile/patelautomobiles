import React, { useState } from 'react';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { BrandName } from '../types';
import { RedImagePlaceholder } from './RedImagePlaceholder';
import { getSlotImage } from '../lib/imageSlots';

interface BrandSectionProps {
  onSelectBrand: (brand: BrandName) => void;
}

export function BrandSection({ onSelectBrand }: BrandSectionProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const brands = [
    {
      name: 'Zelio' as BrandName,
      modelsLabel: '17 MODELS',
      slot: 'photos/brands/zelio',
      tagline: 'Urban & Commuter EV Series',
      description: 'Popular high-efficiency city commuters featuring smart reverse gear, low running costs, and stylish digital displays.',
    },
    {
      name: 'Warivo' as BrandName,
      modelsLabel: '7 MODELS',
      slot: 'photos/brands/warivo',
      tagline: 'High-Performance & Long Range',
      description: 'Endurance electric two-wheelers built with extended battery range and heavy-duty shock-absorbing suspension.',
    },
    {
      name: 'Dynamo' as BrandName,
      modelsLabel: '15 MODELS',
      slot: 'photos/brands/dynamo',
      tagline: 'Everyday & Heavy Duty Loaders',
      description: 'Versatile electric scooters including non-RTO daily runabouts and high-payload commercial cargo carriers.',
    },
  ];

  return (
    <section 
      id="brands-section"
      className="w-full bg-transparent py-10 sm:py-16 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#2C0F12] border border-[#8B1E1E] text-[#FCE9E9] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 font-heading">
            <span>OFFICIAL SHOWROOM LINEUP</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight font-heading">
            EXPLORE OUR <span className="text-[#F9040C]">BRANDS</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#E8B7B7] mt-1.5">
            Compare trusted electric two-wheelers across our three authorized brand partners.
          </p>
        </div>

        {/* 3 Premium Crimson Velvet Brand Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              id={`brand-card-${brand.name.toLowerCase()}`}
              onClick={() => onSelectBrand(brand.name)}
              className="group cursor-pointer rounded-2xl bg-gradient-to-b from-[#111111] via-[#0D0D0D] to-[#080808] border border-[#2C0F12] hover:border-[#F9040C] p-5 sm:p-6 shadow-xl hover:shadow-2xl hover:shadow-[#D71920]/25 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 relative overflow-hidden"
            >
              {/* Subtle Red Velvet Ambient Accent Glow */}
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-20 bg-[#D71920] pointer-events-none group-hover:opacity-40 transition-opacity" />

              <div>
                {/* Brand Header & Exact Model Count Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#2C0F12] border border-[#8B1E1E] flex items-center justify-center text-[#F9040C] group-hover:scale-110 transition-transform">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-black text-2xl tracking-wider uppercase text-white group-hover:text-[#F9040C] transition-colors">
                      {brand.name}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#2C0F12] border border-[#8B1E1E] text-[#FCE9E9] text-[10px] font-extrabold uppercase tracking-wider shrink-0 shadow-sm">
                    {brand.modelsLabel}
                  </span>
                </div>

                {/* Electric Scooter Product Visual with Fallback to RedImagePlaceholder */}
                <div className="w-full aspect-[16/10] bg-[#050505] rounded-xl overflow-hidden flex items-center justify-center p-3 mb-4 border border-[#2C0F12] group-hover:border-[#8B1E1E] transition-colors">
                  {(() => {
                    const brandImgUrl = getSlotImage(brand.slot);
                    if (brandImgUrl && !failedImages[brand.name]) {
                      return (
                        <img
                          src={brandImgUrl}
                          alt={`${brand.name} Electric Scooter`}
                          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                          onError={() => setFailedImages((prev) => ({ ...prev, [brand.name]: true }))}
                        />
                      );
                    }
                    return (
                      <RedImagePlaceholder
                        styleType="velvet"
                        title={brand.name}
                        subtitle={`${brand.modelsLabel} • Authorized Lineup`}
                        className="w-full h-full"
                      />
                    );
                  })()}
                </div>

                <div className="text-xs font-bold text-[#FCE9E9] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F9040C]" />
                  <span>{brand.tagline}</span>
                </div>

                <p className="text-xs text-[#E8B7B7] leading-relaxed mb-4">
                  {brand.description}
                </p>
              </div>

              {/* Action Button Link */}
              <div className="pt-3 border-t border-[#2C0F12] flex items-center justify-between text-xs font-bold text-[#F9040C] group-hover:translate-x-0.5 transition-transform">
                <span>Explore {brand.name} Models</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
