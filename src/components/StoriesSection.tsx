import React, { useState } from 'react';
import { 
  MessageSquareQuote, 
  Video, 
  Instagram, 
  Youtube, 
  ShieldCheck, 
  Star, 
  Play, 
  Sparkles,
  MapPin,
  Calendar,
  Quote
} from 'lucide-react';
import { SparkleParticles } from './SparkleParticles';
import { RedImagePlaceholder } from './RedImagePlaceholder';
import { getSlotImage } from '../lib/imageSlots';
import { siteConfig } from '../config/site';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export function StoriesSection() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'videos' | 'social'>('reviews');

  const customerReviews = [
    {
      id: 1,
      name: 'Rameshwar Patel',
      location: 'Lailunga Village, Raigarh Dist.',
      scooter: 'Zelio Eeva ZX',
      headline: 'Fuel expense dropped from ₹3,500/month to almost zero.',
      quote: 'I travel 42 km daily between our agricultural center and Lailunga town. Charging at home overnight takes just 4 hours. The reverse gear feature is a blessing in crowded market lanes.',
      verified: '100-Day Owner Checkup',
      badge: 'Daily Commuter',
    },
    {
      id: 2,
      name: 'Dr. Anita Sharma',
      location: 'Raigarh Central',
      scooter: 'Warivo Queen SX',
      headline: 'Smoothest daily clinic commute with zero engine noise.',
      quote: 'I was hesitant about range anxiety until Pradeep ji personally demonstrated the real battery curve on the road. The braking and suspension feel solid even over monsoon potholes.',
      verified: 'Verified Showroom Delivery',
      badge: 'Healthcare Professional',
    },
    {
      id: 3,
      name: 'Sunil Kumar Agrawal',
      location: 'Kharsia Market Hub',
      scooter: 'Dynamo Heavy Loader',
      headline: 'Carrying 140kg grocery goods daily without any power loss.',
      quote: 'We replaced our petrol delivery scooter with the Dynamo Loader. The reinforced rear chassis handles heavy weight effortlessly on the Kharsia highway. Patel Automobiles provided prompt first-service checkup.',
      verified: 'Commercial Operator',
      badge: 'Commercial Cargo',
    },
  ];

  return (
    <section 
      id="stories-section"
      className="w-full bg-[#050505] py-12 sm:py-20 text-white border-b border-[#2C0F12] relative overflow-hidden"
    >
      <SparkleParticles count={12} />

      {/* Atmospheric Deep Crimson Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div 
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-[850px] h-[350px] rounded-full blur-[130px] opacity-25"
          style={{ background: 'radial-gradient(circle, #8B1E1E 0%, #2C0F12 60%, transparent 80%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#2C0F12] border border-[#8B1E1E] text-[#FCE9E9] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-[#F9040C]" />
            <span>COMMUNITY & EXPERIENCES</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            STORIES & <span className="text-[#F9040C]">REVIEWS</span>
          </h1>
          
          <div className="flex items-center justify-center gap-1.5 my-3 sm:my-4">
            <span className="h-1 w-10 rounded-full bg-[#F9040C]" />
            <span className="h-1 w-2.5 rounded-full bg-[#D71920]" />
            <span className="h-1 w-2.5 rounded-full bg-[#8B1E1E]" />
          </div>

          <p className="text-xs sm:text-sm text-[#E8B7B7] font-medium max-w-lg mx-auto leading-relaxed">
            Real ownership stories, verified feedback, and delivery milestones from riders across northern Chhattisgarh.
          </p>
        </div>

        {/* Magazine Tab Switcher */}
        <div className="flex justify-center flex-wrap gap-2.5 mb-10">
          <button
            id="tab-stories-reviews"
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-[#D71920] text-white shadow-lg shadow-[#D71920]/35 border border-[#F9040C]'
                : 'bg-[#0D0D0D] text-[#E8B7B7] border border-[#2C0F12] hover:border-[#8B1E1E] hover:text-white'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>Customer Reviews</span>
          </button>

          <button
            id="tab-stories-videos"
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-[#D71920] text-white shadow-lg shadow-[#D71920]/35 border border-[#F9040C]'
                : 'bg-[#0D0D0D] text-[#E8B7B7] border border-[#2C0F12] hover:border-[#8B1E1E] hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Customer Deliveries & Videos</span>
          </button>

          <button
            id="tab-stories-social"
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'social'
                ? 'bg-[#D71920] text-white shadow-lg shadow-[#D71920]/35 border border-[#F9040C]'
                : 'bg-[#0D0D0D] text-[#E8B7B7] border border-[#2C0F12] hover:border-[#8B1E1E] hover:text-white'
            }`}
          >
            <Instagram className="w-4 h-4" />
            <span>Social & Media</span>
          </button>
        </div>

        {/* Tab 1: Editorial Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerReviews.map((rev) => (
              <div
                key={rev.id}
                className="group p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D] to-[#080808] border border-[#2C0F12] hover:border-[#F9040C] flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#D71920]/20 hover:-translate-y-1 relative"
              >
                <div>
                  {/* Badge & Model */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#2C0F12] border border-[#8B1E1E] text-[10px] font-extrabold uppercase tracking-wider text-[#FCE9E9]">
                      {rev.badge}
                    </span>
                    <span className="text-xs font-black text-[#F9040C] font-heading">
                      {rev.scooter}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-heading font-black text-base text-white mb-3 leading-snug group-hover:text-[#FCE9E9] transition-colors">
                    "{rev.headline}"
                  </h3>

                  {/* Quote Body */}
                  <p className="text-xs text-[#E8B7B7] leading-relaxed italic mb-6">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Footer details */}
                <div className="pt-4 border-t border-[#2C0F12]">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-heading font-black text-white">{rev.name}</div>
                      <div className="text-[10px] text-[#C97C7C] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#F9040C]" />
                        <span>{rev.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-[#F9040C]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Walkaround & Delivery Videos */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#2C0F12] hover:border-[#8B1E1E] flex flex-col justify-between group">
              <div className="relative aspect-video rounded-xl bg-[#050505] overflow-hidden flex items-center justify-center mb-4 border border-[#2C0F12]">
                {(() => {
                  const s1Url = getSlotImage('photos/stories/story-01');
                  return s1Url ? (
                    <img
                      src={s1Url}
                      alt="Customer Delivery Ceremony"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fb = parent.querySelector('.story-fallback-01');
                          if (fb) fb.classList.remove('hidden');
                        }
                      }}
                    />
                  ) : null;
                })()}
                <div className={`story-fallback-01 ${getSlotImage('photos/stories/story-01') ? 'hidden' : 'block'} w-full h-full`}>
                  <RedImagePlaceholder 
                    styleType="showroom"
                    title="CUSTOMER DELIVERY CEREMONY"
                    subtitle="Lailunga Showroom Floor"
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 bg-[#050505]/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#D71920] text-white flex items-center justify-center shadow-lg shadow-[#D71920]/50 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
              <h3 className="font-heading font-black text-base text-white uppercase mb-1">
                Zelio & Warivo Showroom Delivery Moments
              </h3>
              <p className="text-xs text-[#E8B7B7]">
                Key handovers, vehicle walkthrough, and first-mile reviews recorded at Patel Automobiles Lailunga.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#2C0F12] hover:border-[#8B1E1E] flex flex-col justify-between group">
              <div className="relative aspect-video rounded-xl bg-[#050505] overflow-hidden flex items-center justify-center mb-4 border border-[#2C0F12]">
                {(() => {
                  const s2Url = getSlotImage('photos/stories/story-02');
                  return s2Url ? (
                    <img
                      src={s2Url}
                      alt="Electric Scooter Range Run"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fb = parent.querySelector('.story-fallback-02');
                          if (fb) fb.classList.remove('hidden');
                        }
                      }}
                    />
                  ) : null;
                })()}
                <div className={`story-fallback-02 ${getSlotImage('photos/stories/story-02') ? 'hidden' : 'block'} w-full h-full`}>
                  <RedImagePlaceholder 
                    styleType="tech"
                    title="ELECTRIC SCOOTER RANGE RUN"
                    subtitle="Lailunga to Raigarh Highway Test"
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 bg-[#050505]/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#D71920] text-white flex items-center justify-center shadow-lg shadow-[#D71920]/50 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
              <h3 className="font-heading font-black text-base text-white uppercase mb-1">
                Real-World Battery Range Verification
              </h3>
              <p className="text-xs text-[#E8B7B7]">
                Field footage testing hill climbs, passenger load, and battery depletion rates on Chhattisgarh roads.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Social & Media */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#2C0F12] hover:border-[#F9040C] flex items-center gap-5 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#2C0F12] border border-[#8B1E1E] flex items-center justify-center text-[#F9040C] shrink-0">
                <Instagram className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-white uppercase mb-1">
                  Official Instagram
                </h3>
                <p className="text-xs text-[#E8B7B7] mb-2">
                  Follow Patel Automobiles for delivery photos, festive updates, and customer milestones.
                </p>
                <a 
                  href="https://www.instagram.com/patel_automobile_lailunga/"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#F9040C] hover:underline"
                >
                  @{siteConfig.socialLinks.instagram} →
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#2C0F12] hover:border-[#F9040C] flex items-center gap-5 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#2C0F12] border border-[#8B1E1E] flex items-center justify-center text-[#F9040C] shrink-0">
                <WhatsAppIcon className="w-7 h-7 fill-current" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-white uppercase mb-1">
                  Official WhatsApp Desk
                </h3>
                <p className="text-xs text-[#E8B7B7] mb-2">
                  Chat directly with our showroom team for instant price sheets, photos, and model brochures.
                </p>
                <a 
                  href={`https://wa.me/91${siteConfig.phone}?text=Hello%20Patel%20Automobiles,%20I%20would%20like%20to%20inquire%20about%20electric%20scooters.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#F9040C] hover:underline"
                >
                  +91 {siteConfig.phone} →
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
