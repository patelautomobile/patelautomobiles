import React from 'react';
import { 
  Layers, 
  Award, 
  Calendar, 
  ShieldCheck, 
  Headphones, 
  Zap 
} from 'lucide-react';

export function WhyPatel() {
  const benefits = [
    {
      title: "Wide EV Scooter Range",
      description: "Explore 39+ electric scooters across Zelio, Warivo, and Dynamo under one roof.",
      icon: Layers,
    },
    {
      title: "Multiple Authorized Brands",
      description: "Compare verified performance, warranty terms, and battery options without showroom bias.",
      icon: Award,
    },
    {
      title: "Hands-On Test Rides",
      description: "Feel real-world throttle response, hill climbing, and brake safety before purchase.",
      icon: Calendar,
    },
    {
      title: "Genuine Brand Backing",
      description: "Direct OEM dealership offering authorized spares, certified batteries, and official warranty.",
      icon: ShieldCheck,
    },
    {
      title: "Dedicated Support Desk",
      description: "Knowledgeable guidance for registration, routine checkups, and post-delivery assistance.",
      icon: Headphones,
    },
    {
      title: "EV-Centric Facility",
      description: "Specialized equipment for battery diagnostic health, rapid charging, and maintenance.",
      icon: Zap,
    },
  ];

  return (
    <section 
      id="why-choose-patel-automobiles"
      className="w-full bg-transparent py-10 sm:py-16 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#2C0F12] border border-[#8B1E1E] text-[#FCE9E9] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 font-heading">
            <span>SHOWROOM ADVANTAGES</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
            WHY CHOOSE <span className="text-[#F9040C]">PATEL AUTOMOBILES?</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#E8B7B7] mt-1.5">
            Authorized multi-brand electric scooter dealership in Lailunga, Chhattisgarh.
          </p>
        </div>

        {/* 6 Concise Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group rounded-2xl bg-gradient-to-b from-[#0D0D0D] to-[#080808] border border-[#2C0F12] hover:border-[#F9040C] p-5 sm:p-6 flex flex-col justify-start transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#D71920]/20 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2C0F12] border border-[#8B1E1E] flex items-center justify-center mb-3.5 text-[#F9040C] group-hover:scale-105 transition-transform shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-white mb-1.5 group-hover:text-[#F9040C] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#E8B7B7] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
