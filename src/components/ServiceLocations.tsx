import React from 'react';
import { MapPin, Navigation, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/site';

export function ServiceLocations() {
  const locations = [
    {
      name: 'LAILUNGA',
      role: 'Main Showroom & Service Hub',
      detail: siteConfig.address,
      badge: 'Headquarters',
    },
    {
      name: 'RAIGARH',
      role: 'Sales & Service Support',
      detail: 'Authorized sales consultations, test ride bookings & battery health checkups.',
      badge: 'Regional Hub',
    },
    {
      name: 'KHARSIA',
      role: 'Authorized Sales & Support',
      detail: 'Model demonstration, booking assistance & rapid spare parts distribution.',
      badge: 'Regional Hub',
    },
  ];

  return (
    <section 
      id="service-locations-section"
      className="relative w-full py-12 sm:py-18 text-white overflow-hidden transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#2C0F12] border border-[#8B1E1E] text-[#FCE9E9] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 font-heading">
            <MapPin className="w-3.5 h-3.5 text-[#F9040C]" />
            <span>REGIONAL NETWORK</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
            SERVICE <span className="text-[#F9040C]">LOCATIONS</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#E8B7B7] mt-1.5 max-w-md mx-auto">
            Authorized multi-brand sales, genuine parts, and verified electric two-wheeler maintenance.
          </p>
        </div>

        {/* 3 Distinct Location Cards: Lailunga, Raigarh, Kharsia */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {locations.map((loc) => (
            <div
              key={loc.name}
              id={`service-location-${loc.name.toLowerCase()}`}
              className="group rounded-2xl bg-gradient-to-b from-[#0D0D0D] to-[#080808] border border-[#2C0F12] hover:border-[#F9040C] p-6 text-center transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#D71920]/25 hover:-translate-y-1 relative flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#2C0F12] border border-[#8B1E1E] flex items-center justify-center mx-auto mb-3.5 text-[#F9040C] group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#181818] border border-[#511010] text-[9px] font-extrabold uppercase tracking-wider text-[#C97C7C] mb-2">
                  {loc.badge}
                </span>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wider uppercase mb-1 group-hover:text-[#F9040C] transition-colors">
                  {loc.name}
                </h3>
                <p className="text-xs text-[#FCE9E9] font-semibold mb-2">
                  {loc.role}
                </p>
                <p className="text-[11px] text-[#E8B7B7] leading-relaxed">
                  {loc.detail}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#2C0F12] flex items-center justify-center gap-1.5 text-[11px] text-[#F9040C] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Center</span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Clean Divider Row: LAILUNGA • RAIGARH • KHARSIA */}
        <div 
          id="service-locations-bullet-list"
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center justify-center flex-wrap gap-2.5 px-6 py-3 rounded-full bg-[#0D0D0D] border border-[#8B1E1E]/50 text-xs sm:text-sm font-heading font-black tracking-widest text-[#F9040C] uppercase shadow-lg shadow-[#2C0F12]/30">
            <span>LAILUNGA</span>
            <span className="text-[#8B1E1E]">•</span>
            <span>RAIGARH</span>
            <span className="text-[#8B1E1E]">•</span>
            <span>KHARSIA</span>
          </div>
        </div>

      </div>
    </section>
  );
}
