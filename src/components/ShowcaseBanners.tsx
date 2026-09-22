import { getSlotImage } from '../lib/imageSlots';

interface ShowcaseBannersProps {
  onSelectCategory?: (category: string) => void;
}

export function ShowcaseBanners({ onSelectCategory }: ShowcaseBannersProps) {
  const banner1Url = getSlotImage('photos/home/home-scooter-01');
  const banner2Url = getSlotImage('photos/home/home-scooter-02');

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
      
      {/* Banner 1: Power • Style • Performance (Sporty Black/Red EV Scooter) */}
      <div 
        onClick={() => onSelectCategory?.('high-performance')}
        className="relative h-32 sm:h-44 md:h-52 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm cursor-pointer group bg-[#0C1116] border border-red-950/40"
      >
        {/* Background Image of Sporty Scooter */}
        {banner1Url ? (
          <img
            src={banner1Url}
            alt="Power Style Performance Electric Scooter"
            className="absolute inset-0 w-full h-full object-cover object-right opacity-65 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A0A0C] via-[#0E0E12] to-[#060608]" />
        )}
        {/* Dark Left-to-Right Vignette Gradient for Crisp Typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />

        {/* Content: Stacked Typography (Matching Reference Screenshot) */}
        <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-center z-10">
          <div className="font-heading font-black text-sm sm:text-2xl md:text-3xl text-white tracking-tight leading-[1.05] uppercase">
            <span>Power</span> <br />
            <span>Style</span> <br />
            <span className="text-[#FF2E3B]">Performance</span>
          </div>
        </div>
      </div>

      {/* Banner 2: Simple • Stylish • Smart (Retro-Modern Silver EV Scooter) */}
      <div 
        onClick={() => onSelectCategory?.('daily-commute')}
        className="relative h-32 sm:h-44 md:h-52 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm cursor-pointer group bg-[#0C1116] border border-red-950/40"
      >
        {/* Background Image of Retro/City Scooter */}
        {banner2Url ? (
          <img
            src={banner2Url}
            alt="Simple Stylish Smart Electric Scooter"
            className="absolute inset-0 w-full h-full object-cover object-right opacity-65 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#12080A] via-[#0D0D11] to-[#060608]" />
        )}
        {/* Dark Left-to-Right Vignette Gradient for Crisp Typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />

        {/* Content: Stacked Typography (Matching Reference Screenshot) */}
        <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-center z-10">
          <div className="font-heading font-black text-sm sm:text-2xl md:text-3xl text-white tracking-tight leading-[1.05] uppercase">
            <span>Simple</span> <br />
            <span>Stylish</span> <br />
            <span className="text-[#FF2E3B]">Smart</span>
          </div>
        </div>
      </div>

    </div>
  );
}
