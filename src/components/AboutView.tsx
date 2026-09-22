import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Bike, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  BatteryCharging, 
  Award, 
  Users, 
  Layers, 
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';
import { siteConfig } from '../config/site';
import { PageView } from '../types';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { LogoSlot } from './LogoSlot';
import { SparkleParticles } from './SparkleParticles';
import { RedImagePlaceholder } from './RedImagePlaceholder';
import { getSlotImage } from '../lib/imageSlots';

interface AboutViewProps {
  onNavigate: (page: PageView, brandFilter?: string) => void;
}

export function AboutView({ onNavigate }: AboutViewProps) {
  const handleWhatsAppChat = () => {
    const msg = `Hello Pradeep ji, I am contacting Patel Automobiles regarding electric scooters and showroom visit.`;
    window.open(`https://wa.me/919691772124?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="about-us-page-wrapper"
      className="w-full min-h-screen text-white pb-24 md:pb-16 bg-[#050505]"
    >
      {/* ========================================================================= */}
      {/* SECTION 1: CINEMATIC BRAND STORY & HERO */}
      {/* ========================================================================= */}
      <section 
        id="about-patel-automobiles-hero"
        className="relative border-b border-[#2C0F12] py-14 sm:py-20 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #050505 0%, #0D0D0D 50%, #111111 100%)',
        }}
      >
        <SparkleParticles count={14} />

        {/* Deep Crimson Ambient Light Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div 
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-[850px] h-[380px] rounded-full blur-[140px] opacity-35"
            style={{ background: 'radial-gradient(circle, #8B1E1E 0%, #2C0F12 60%, transparent 80%)' }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Logo Integration */}
          <div className="flex justify-center mb-5">
            <LogoSlot 
              imgClassName="h-10 sm:h-12 w-auto max-w-[180px] sm:max-w-[220px]" 
              showText={true} 
            />
          </div>

          {/* Editorial Headline */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            ABOUT <span className="text-[#F9040C]">PATEL AUTOMOBILES</span>
          </h1>

          {/* Coordinated Color Line */}
          <div className="flex items-center justify-center gap-1.5 my-4">
            <span className="h-1 w-12 rounded-full bg-[#F9040C]" />
            <span className="h-1 w-2.5 rounded-full bg-[#D71920]" />
            <span className="h-1 w-2.5 rounded-full bg-[#8B1E1E]" />
            <span className="h-1 w-2.5 rounded-full bg-[#2C0F12]" />
          </div>

          {/* Brand Philosophy */}
          <p className="font-heading font-black text-base sm:text-xl md:text-2xl text-[#FCE9E9] max-w-3xl mx-auto leading-snug uppercase">
            "Driving the transition toward practical, accessible electric mobility across Chhattisgarh."
          </p>

          <p className="text-xs sm:text-sm text-[#E8B7B7] max-w-2xl mx-auto mt-3.5 leading-relaxed">
            Founded by <strong className="text-white font-bold">{siteConfig.founder}</strong>, Patel Automobiles is an authorized multi-brand electric scooter dealership headquartered in Lailunga, with regional customer support extending across Raigarh and Kharsia.
          </p>
        </div>
      </section>

      {/* Main Editorial Flow Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 space-y-16 sm:space-y-24">
        
        {/* ========================================================================= */}
        {/* SECTION 2: MISSION, VISION & CORE VALUES */}
        {/* ========================================================================= */}
        <section id="about-mission-vision-values">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] sm:text-xs font-heading font-black uppercase tracking-widest text-[#F9040C] block mb-1">
              FOUNDATIONAL PURPOSE
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              MISSION, VISION & VALUES
            </h2>
            <p className="text-xs sm:text-sm text-[#E8B7B7] mt-2">
              Our operating standards guide every scooter recommendation, battery test, and service handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {/* 1. Mission */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0D0D0D] to-[#080808] border border-[#2C0F12] hover:border-[#F9040C] transition-all shadow-lg hover:shadow-2xl hover:shadow-[#D71920]/20 group">
              <div className="w-11 h-11 rounded-xl bg-[#2C0F12] border border-[#8B1E1E] flex items-center justify-center text-[#F9040C] mb-4 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-wide mb-2">
                Our Mission
              </h3>
              <p className="text-xs text-[#E8B7B7] leading-relaxed">
                To liberate riders in Lailunga and surrounding rural towns from rising fuel expenses by delivering reliable, certified electric two-wheelers supported by genuine manufacturer warranties.
              </p>
            </div>

            {/* 2. Vision */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0D0D0D] to-[#080808] border border-[#2C0F12] hover:border-[#F9040C] transition-all shadow-lg hover:shadow-2xl hover:shadow-[#D71920]/20 group">
              <div className="w-11 h-11 rounded-xl bg-[#2C0F12] border border-[#8B1E1E] flex items-center justify-center text-[#F9040C] mb-4 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-wide mb-2">
                Our Vision
              </h3>
              <p className="text-xs text-[#E8B7B7] leading-relaxed">
                To establish northern Chhattisgarh’s most dependable EV ecosystem, where green transportation is affordable, charging is effortless, and after-sales service is readily accessible.
              </p>
            </div>

            {/* 3. Values */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0D0D0D] to-[#080808] border border-[#2C0F12] hover:border-[#F9040C] transition-all shadow-lg hover:shadow-2xl hover:shadow-[#D71920]/20 group">
              <div className="w-11 h-11 rounded-xl bg-[#2C0F12] border border-[#8B1E1E] flex items-center justify-center text-[#F9040C] mb-4 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-wide mb-2">
                Our Values
              </h3>
              <p className="text-xs text-[#E8B7B7] leading-relaxed">
                Complete data transparency, verified real-world battery ranges, zero aggressive sales tactics, and continuous post-delivery technical support for every owner.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: MULTI-BRAND PARTNERSHIP SHOWCASE */}
        {/* ========================================================================= */}
        <section id="about-brand-partnerships">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] sm:text-xs font-heading font-black uppercase tracking-widest text-[#F9040C] block mb-1">
              AUTHORIZED DEALERSHIP ALLIANCES
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              3 BRAND PARTNERS • 39 MODELS
            </h2>
            <p className="text-xs sm:text-sm text-[#E8B7B7] mt-2">
              We partner directly with leading Indian EV manufacturers to provide comprehensive choice without dealership bias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Zelio */}
            <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#2C0F12] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-black text-xl text-white uppercase">Zelio Motors</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2C0F12] text-[#FCE9E9] text-[10px] font-bold border border-[#8B1E1E]">
                    17 Models
                  </span>
                </div>
                <p className="text-xs text-[#E8B7B7] leading-relaxed mb-4">
                  Renowned for popular daily commuters like the Eeva and Gracy series, offering low running costs, reverse assist, and smart digital meters.
                </p>
              </div>
              <button 
                onClick={() => onNavigate('scooters', 'Zelio')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F9040C] hover:text-white transition-colors cursor-pointer"
              >
                <span>Browse Zelio Lineup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Warivo */}
            <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#2C0F12] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-black text-xl text-white uppercase">Warivo Motors</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2C0F12] text-[#FCE9E9] text-[10px] font-bold border border-[#8B1E1E]">
                    7 Models
                  </span>
                </div>
                <p className="text-xs text-[#E8B7B7] leading-relaxed mb-4">
                  Engineered for robust endurance, long-range batteries, and heavier shock-absorbing suspensions built for regional highways.
                </p>
              </div>
              <button 
                onClick={() => onNavigate('scooters', 'Warivo')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F9040C] hover:text-white transition-colors cursor-pointer"
              >
                <span>Browse Warivo Lineup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dynamo */}
            <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#2C0F12] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-black text-xl text-white uppercase">Dynamo Motors</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2C0F12] text-[#FCE9E9] text-[10px] font-bold border border-[#8B1E1E]">
                    15 Models
                  </span>
                </div>
                <p className="text-xs text-[#E8B7B7] leading-relaxed mb-4">
                  Highly versatile vehicles ranging from non-RTO city rides to high-capacity commercial cargo carriers with heavy payload capacity.
                </p>
              </div>
              <button 
                onClick={() => onNavigate('scooters', 'Dynamo')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F9040C] hover:text-white transition-colors cursor-pointer"
              >
                <span>Browse Dynamo Lineup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: SHOWROOM ATMOSPHERE & REGIONAL HUBS */}
        {/* ========================================================================= */}
        <section id="about-showroom-atmosphere" className="rounded-3xl bg-[#0D0D0D] border border-[#2C0F12] p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full blur-3xl opacity-20 bg-[#D71920] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] sm:text-xs font-heading font-black uppercase tracking-widest text-[#F9040C]">
                VISIT OUR SHOWROOM
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                THE PATEL AUTOMOBILES EXPERIENCE
              </h2>
              <p className="text-xs sm:text-sm text-[#E8B7B7] leading-relaxed">
                Based in Lailunga, our facility welcomes you to inspect vehicles in person, test throttle curves, and receive clear technical answers regarding battery health, running costs, and maintenance schedules.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-[#FCE9E9]">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#F9040C] shrink-0" />
                  <span>{siteConfig.address}</span>
                </div>
                {siteConfig.openingHours ? (
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#F9040C] shrink-0" />
                    <span>{siteConfig.openingHours}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#F9040C] shrink-0" />
                    <span>Showroom visits & test rides welcome daily</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#F9040C] shrink-0" />
                  <span>{siteConfig.phone} • Pradeep Patel (Founder)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0D0D0D] border border-[#2C0F12]">
                {(() => {
                  const showroomUrl = getSlotImage('photos/about/showroom');
                  return showroomUrl ? (
                    <img
                      src={showroomUrl}
                      alt="Patel Automobiles Showroom"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fb = parent.querySelector('.showroom-fallback');
                          if (fb) fb.classList.remove('hidden');
                        }
                      }}
                    />
                  ) : null;
                })()}
                <div className={`showroom-fallback ${getSlotImage('photos/about/showroom') ? 'hidden' : 'block'} w-full h-full`}>
                  <RedImagePlaceholder 
                    styleType="showroom"
                    title="PATEL AUTOMOBILES SHOWROOM"
                    subtitle="Main Road Lailunga • Authorized EV Center"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: CLEAR CONTACT CTA */}
        {/* ========================================================================= */}
        <section id="about-contact-cta" className="text-center py-10 sm:py-14 border-t border-[#2C0F12]">
          <h3 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mb-3">
            READY TO EXPERIENCE ELECTRIC MOBILITY?
          </h3>
          <p className="text-xs sm:text-sm text-[#E8B7B7] max-w-lg mx-auto mb-6">
            Book a test ride, visit our showroom, or speak directly with our team to find the perfect EV scooter for your daily commute.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => onNavigate('test-ride')}
              className="px-6 py-3 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white font-heading font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-[#D71920]/30 cursor-pointer"
            >
              Book a Test Ride
            </button>
            <button
              onClick={handleWhatsAppChat}
              className="px-6 py-3 rounded-xl bg-[#0D0D0D] hover:bg-[#2C0F12] text-white border border-[#8B1E1E] font-heading font-black text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-[#F9040C]" />
              <span>Chat with Founder</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-[#0D0D0D] hover:bg-[#181818] text-[#FCE9E9] border border-[#2C0F12] font-heading font-black text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
            >
              Showroom Locations
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
