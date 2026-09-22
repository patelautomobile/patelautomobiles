import { User, ShieldCheck, MapPin, Award } from 'lucide-react';
import { getSlotImage } from '../lib/imageSlots';

export function FounderSection() {
  const founderImageUrl = getSlotImage('photos/about/founder-pradeep-patel');
  return (
    <section 
      id="founder-section"
      className="w-full bg-[#060608] py-10 sm:py-16 text-white border-b border-red-950/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0C0C11] border border-red-950/50 p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Large Image Area for Founder Photograph Slot */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-[4/5] max-w-[260px] rounded-2xl bg-[#060608] border border-red-900/40 overflow-hidden flex flex-col items-center justify-center shadow-inner group">
                {founderImageUrl ? (
                  <img
                    src={founderImageUrl}
                    alt="Pradeep Patel - Founder of Patel Automobiles"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallback = parent.querySelector('.founder-placeholder-fallback');
                        if (fallback) fallback.classList.remove('hidden');
                      }
                    }}
                  />
                ) : null}
                <div className={`founder-placeholder-fallback ${founderImageUrl ? 'hidden' : 'flex'} p-6 text-center flex-col items-center justify-center`}>
                  <div className="w-16 h-16 rounded-full bg-[#1F070A] border border-red-600/30 flex items-center justify-center mb-3 text-[#FF2E3B]">
                    <User className="w-8 h-8" />
                  </div>
                  <div className="font-heading font-black text-sm uppercase text-white tracking-wide">
                    PRADEEP PATEL
                  </div>
                  <div className="text-[11px] text-[#FF2E3B] font-semibold mt-0.5 uppercase tracking-wider">
                    Founder Photograph Slot
                  </div>
                  <p className="text-[10px] text-[#94A3B8] mt-2 leading-tight">
                    Drop image into photos/about/founder-pradeep-patel
                  </p>
                </div>
              </div>
            </div>

            {/* Founder Details & Dealership Leadership Commitments */}
            <div className="md:col-span-7 flex flex-col justify-center text-left">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold text-[#FF2E3B] mb-1.5 block">
                LEADERSHIP & VISION
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                PRADEEP PATEL
              </h3>
              <div className="text-xs sm:text-sm font-bold text-[#FF2E3B] uppercase tracking-wider mt-0.5">
                Founder, Patel Automobiles
              </div>
              <div className="w-12 h-1 bg-[#E50914] my-3 rounded-full" />

              <p className="text-xs sm:text-sm text-[#C5CED6] leading-relaxed mb-5">
                Patel Automobiles was established with a singular mission: providing genuine, accessible, and economical electric mobility to the residents and businesses of Lailunga, Raigarh, and Kharsia in Chhattisgarh.
              </p>

              {/* Verified Commitments */}
              <div className="space-y-2 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF2E3B] shrink-0" />
                  <span className="text-white font-medium">Committed to authorized OEM EV partnerships</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#FF2E3B] shrink-0" />
                  <span className="text-white font-medium">Transparent customer guidance on battery lifecycle & warranties</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF2E3B] shrink-0" />
                  <span className="text-white font-medium">Based in Lailunga, serving Raigarh & Kharsia</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
