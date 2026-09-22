import { Bike, Wrench, Award, Headphones } from 'lucide-react';

export function BenefitStrip() {
  const benefits = [
    {
      label: "Wide Range",
      icon: Bike,
    },
    {
      label: "Best Service",
      icon: Wrench,
    },
    {
      label: "Genuine Products",
      icon: Award,
    },
    {
      label: "Expert Support",
      icon: Headphones,
    },
  ];

  return (
    <section 
      id="benefit-panel-strip"
      aria-label="Key Dealership Benefits"
      className="w-full bg-[#060608] px-3 sm:px-6 py-2 pb-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Dark Rounded Feature Panel */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#0C0C11] border border-red-950/50 shadow-xl py-4 sm:py-5 px-3 sm:px-6">
          <div className="grid grid-cols-4 divide-x divide-red-950/40">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.label}
                  className="flex flex-col items-center justify-center text-center px-1 sm:px-3 group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF2E3B]" strokeWidth={2.2} />
                  </div>
                  <span className="font-heading font-bold text-[11px] sm:text-xs md:text-sm text-white tracking-wide leading-tight">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
