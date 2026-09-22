import { Building2, ShieldCheck, CheckCircle2, Headphones } from 'lucide-react';

export function TrustFeatureStrip() {
  const features = [
    {
      title: "Trusted Showroom",
      subtitle: "Lailunga & Raigarh",
      icon: Building2,
    },
    {
      title: "Quality Products",
      subtitle: "Certified EV Standards",
      icon: ShieldCheck,
    },
    {
      title: "Genuine Products",
      subtitle: "100% OEM Components",
      icon: CheckCircle2,
    },
    {
      title: "Expert Support",
      subtitle: "Service & Guidance",
      icon: Headphones,
    },
  ];

  return (
    <section 
      id="trust-feature-strip"
      aria-label="Dealership Core Commitments"
      className="w-full bg-[#0C0C11] border-b border-red-950/40 py-3.5 sm:py-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-red-950/30">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title} 
                className={`flex items-center gap-3 py-1.5 sm:py-0 ${
                  idx === 0 
                    ? 'pr-2 sm:pr-4' 
                    : idx === 1 
                    ? 'pl-2 sm:px-4' 
                    : idx === 2 
                    ? 'pr-2 sm:px-4' 
                    : 'pl-2 sm:pl-4'
                }`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#060608] border border-red-600/30 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#FF2E3B]" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-heading font-extrabold text-white tracking-wide truncate">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-[#94A3B8] font-medium truncate">
                    {item.subtitle}
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
