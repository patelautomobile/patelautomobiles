import { Bike, Layers, MapPin } from 'lucide-react';

export function Stats() {
  const verifiedStats = [
    {
      value: "39+",
      label: "EV MODELS",
      detail: "Zelio • Warivo • Dynamo Full Range",
      icon: Bike,
    },
    {
      value: "3",
      label: "BRANDS",
      detail: "Authorised Multi-Brand EV Dealership",
      icon: Layers,
    },
    {
      value: "3 Hubs",
      label: "SERVICE LOCATIONS",
      detail: "Lailunga • Raigarh • Kharsia",
      icon: MapPin,
    },
  ];

  return (
    <section 
      id="verified-stats-section"
      aria-label="Verified Dealership Metrics"
      className="w-full bg-[#060608] py-10 sm:py-16 border-b border-red-950/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {verifiedStats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="p-6 rounded-2xl bg-[#0C0C11] border border-red-950/50 flex items-center gap-5 shadow-lg"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#060608] border border-red-600/30 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#FF2E3B]" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm font-heading font-extrabold text-[#FF2E3B] mt-1.5 uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-[#94A3B8] mt-0.5 font-medium">
                    {item.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
