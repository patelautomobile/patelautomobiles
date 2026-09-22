import { MapPin, Navigation, Compass } from 'lucide-react';
import { PATEL_MAP_EMBED_URL, PATEL_DIRECTIONS_URL } from '../config/mapConfig';

export function VisitPatel() {
  const hasEmbedUrl = Boolean(PATEL_MAP_EMBED_URL && PATEL_MAP_EMBED_URL.trim().length > 0);
  const hasDirectionsUrl = Boolean(PATEL_DIRECTIONS_URL && PATEL_DIRECTIONS_URL.trim().length > 0);

  return (
    <section
      id="visit-patel-section"
      aria-label="Visit Patel Automobiles"
      className="w-full bg-[#050505] py-14 sm:py-20 border-t border-[#2C0F12] relative z-20 text-white overflow-hidden"
    >
      {/* Subtle Red Ambient Glows */}
      <div 
        className="pointer-events-none absolute inset-0 overflow-hidden" 
        aria-hidden="true"
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, #8B1E1E 0%, #2C0F12 55%, transparent 80%)' }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F9040C]/30 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0A0C] border border-[#8B1E1E]/60 text-[#FCE9E9] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 font-heading">
            <MapPin className="w-3.5 h-3.5 text-[#F9040C]" />
            <span>SHOWROOM LOCATION</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight leading-[1.05]">
            VISIT <span className="text-[#F9040C] drop-shadow-[0_0_25px_rgba(249,4,12,0.4)]">PATEL AUTOMOBILES</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#E8B7B7] mt-2 font-medium max-w-md mx-auto">
            Find us and visit our showroom.
          </p>
        </div>

        {/* Large, Prominent, Responsive Google Map Embed Container */}
        <div 
          id="patel-google-maps-wrapper"
          className="w-full rounded-2xl sm:rounded-3xl border border-[#2C0F12] bg-[#0A0A0C] shadow-2xl shadow-black/80 overflow-hidden relative"
        >
          {hasEmbedUrl ? (
            /* ACTIVE GOOGLE MAPS EMBED */
            <div className="w-full h-[280px] sm:h-[380px] md:h-[460px] relative">
              <iframe
                id="patel-google-maps-iframe"
                src={PATEL_MAP_EMBED_URL}
                title="Patel Automobiles Showroom Map"
                className="w-full h-full border-0 block"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            /* GRACEFUL SAFE PLACEHOLDER: Shown until client supplies PATEL_MAP_EMBED_URL */
            <div 
              id="patel-maps-placeholder"
              className="w-full h-[280px] sm:h-[380px] md:h-[460px] flex flex-col items-center justify-center p-6 sm:p-10 text-center relative overflow-hidden bg-gradient-to-b from-[#0D0809] to-[#050507]"
            >
              {/* Decorative Subtle Radar / Grid Motif */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at center, #8B1E1E 1px, transparent 1px), linear-gradient(to right, #2C0F12 1px, transparent 1px), linear-gradient(to bottom, #2C0F12 1px, transparent 1px)`,
                  backgroundSize: '40px 40px, 80px 80px, 80px 80px',
                }}
                aria-hidden="true"
              />

              {/* Central Map Pin with Glow Ring */}
              <div className="relative mb-4 sm:mb-6">
                <div className="absolute -inset-3 bg-[#F9040C]/20 rounded-full blur-md animate-pulse" />
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1A0A0C] border border-[#8B1E1E] flex items-center justify-center text-[#F9040C] shadow-lg shadow-[#D71920]/25">
                  <MapPin className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
              </div>

              {/* Headline & Description */}
              <span className="inline-block px-3 py-0.5 rounded-full bg-[#180B0D] border border-[#511010] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#FCE9E9] mb-2 font-heading">
                OFFICIAL SHOWROOM LOCATION
              </span>

              <h3 className="font-heading font-black text-lg sm:text-2xl text-white uppercase tracking-wide mb-2 max-w-md">
                Google Maps Embed Ready
              </h3>

              <p className="text-xs sm:text-sm text-[#E8B7B7] max-w-md mx-auto leading-relaxed mb-4">
                The interactive map will appear here once the verified Google Maps Embed link is provided.
              </p>

              {/* Service Network Pill */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#0E0607] border border-[#2C0F12] text-[10px] sm:text-xs text-[#A87171]">
                <Compass className="w-3.5 h-3.5 text-[#F9040C]" />
                <span>Authorized Service Network: Lailunga • Raigarh • Kharsia</span>
              </div>
            </div>
          )}
        </div>

        {/* GET DIRECTIONS BUTTON SECTION */}
        <div 
          id="patel-directions-action"
          className="mt-6 sm:mt-8 text-center flex flex-col items-center justify-center gap-2"
        >
          {hasDirectionsUrl ? (
            /* ACTIVE: Client has configured PATEL_DIRECTIONS_URL */
            <a
              id="patel-get-directions-btn"
              href={PATEL_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#D71920]/30 hover:shadow-[#F9040C]/50 transition-all active:scale-95 cursor-pointer group"
            >
              <Navigation className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Get Directions</span>
            </a>
          ) : (
            /* GRACEFUL COMING-SOON STATE: Client has not yet configured PATEL_DIRECTIONS_URL */
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                id="patel-get-directions-btn-disabled"
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl bg-[#140809] border border-[#3D1418] text-[#8C5558] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider cursor-not-allowed opacity-85 select-none"
              >
                <Navigation className="w-4 h-4 text-[#8C5558]" />
                <span>Get Directions</span>
              </button>
              <span className="text-[11px] sm:text-xs text-[#A87171] font-medium">
                (Location link coming soon)
              </span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
