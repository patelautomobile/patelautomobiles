import React from 'react';
import { Bike, Zap, ShieldCheck } from 'lucide-react';

export type PlaceholderStyle = 
  | 'silhouette' 
  | 'glow' 
  | 'streaks' 
  | 'showroom' 
  | 'tech'
  | 'velvet';

interface RedImagePlaceholderProps {
  styleType?: PlaceholderStyle;
  style?: PlaceholderStyle;
  title?: string;
  subtitle?: string;
  className?: string;
  badge?: string;
}

export const RedImagePlaceholder: React.FC<RedImagePlaceholderProps> = ({
  styleType,
  style,
  title = 'PATEL AUTOMOBILES',
  subtitle = 'Electric Mobility • Lailunga',
  className = 'w-full h-full min-h-[220px]',
  badge,
}) => {
  const activeStyle = styleType || style || 'silhouette';
  return (
    <div 
      className={`relative overflow-hidden bg-[#080808] border border-[#2C0F12] flex items-center justify-center select-none ${className}`}
      aria-label={`${title} - ${subtitle}`}
    >
      {/* Dynamic Cinematic Background based on styleType */}
      {activeStyle === 'glow' && (
        <>
          <div 
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background: 'radial-gradient(ellipse at center, #8B1E1E 0%, #511010 40%, #080808 85%)'
            }}
          />
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#F9040C]/20 to-transparent pointer-events-none" />
          <div className="absolute -inset-x-10 top-1/2 h-1 bg-gradient-to-r from-transparent via-[#F9040C] to-transparent opacity-30 blur-[1px] pointer-events-none" />
        </>
      )}

      {activeStyle === 'velvet' && (
        <>
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 40%, #6B1E23 0%, #2C0F12 55%, #050505 100%)'
            }}
          />
          <div className="absolute inset-0 border border-[#8B1E1E]/30 rounded-2xl m-3 pointer-events-none" />
        </>
      )}

      {activeStyle === 'streaks' && (
        <>
          <div 
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(circle at 75% 25%, #8B1E1E 0%, #2C0F12 50%, transparent 75%)'
            }}
          />
          {/* Crimson & Bright Red Light Streaks inspired by references */}
          <div 
            className="absolute -inset-x-12 top-1/4 h-1.5 bg-gradient-to-r from-transparent via-[#F9040C] to-transparent opacity-50 transform -rotate-12 blur-[1px] pointer-events-none" 
          />
          <div 
            className="absolute -inset-x-12 top-1/2 h-2.5 bg-gradient-to-r from-transparent via-[#D71920] to-transparent opacity-30 transform -rotate-6 blur-sm pointer-events-none" 
          />
          <div 
            className="absolute -inset-x-12 top-3/4 h-1 bg-gradient-to-r from-transparent via-[#A51E22] to-transparent opacity-40 transform -rotate-12 pointer-events-none" 
          />
        </>
      )}

      {activeStyle === 'showroom' && (
        <>
          <div 
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl opacity-35 bg-[#D71920] pointer-events-none" 
          />
          {/* Floor Reflection Grid with Crimson Lines */}
          <div 
            className="absolute bottom-0 inset-x-0 h-1/2 opacity-25 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #511010 1px, transparent 1px), linear-gradient(to bottom, #511010 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              perspective: '300px',
              transform: 'rotateX(45deg)'
            }}
          />
        </>
      )}

      {activeStyle === 'tech' && (
        <>
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#D71920 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-[#8B1E1E]/25 pointer-events-none" />
        </>
      )}

      {activeStyle === 'silhouette' && (
        <>
          <div 
            className="absolute inset-0 pointer-events-none opacity-45"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #8B1E1E 0%, #2C0F12 55%, #050505 100%)'
            }}
          />
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        </>
      )}

      {/* Center Stylized EV Showcase Details */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-xs">
        
        {badge && (
          <span className="mb-3 px-3 py-0.5 rounded-full bg-[#2C0F12] border border-[#8B1E1E] text-[#FCE9E9] text-[10px] font-extrabold uppercase tracking-widest shadow-md shadow-[#2C0F12]">
            {badge}
          </span>
        )}

        {/* Center Stylized EV Emblem / Silhouette with glowing rim */}
        <div className="relative mb-3.5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-[#2C0F12] via-[#111111] to-[#050505] border border-[#8B1E1E] flex items-center justify-center shadow-xl shadow-[#D71920]/20">
            <Bike className="w-8 h-8 sm:w-10 sm:h-10 text-[#F9040C] stroke-[1.6]" />
          </div>
          {/* Subtle Energy Spark */}
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#511010] border border-[#F9040C] flex items-center justify-center shadow-md shadow-[#F9040C]/30">
            <Zap className="w-2.5 h-2.5 text-[#FCE9E9]" />
          </div>
        </div>

        {/* Text Details in Editorial Hierarchy */}
        <h4 className="font-heading font-black text-sm sm:text-base text-white tracking-wider uppercase">
          {title}
        </h4>
        <p className="text-[11px] text-[#E8B7B7] font-medium mt-0.5 tracking-tight">
          {subtitle}
        </p>

        <div className="mt-3 flex items-center gap-1.5 opacity-75">
          <span className="w-6 h-0.5 bg-[#8B1E1E] rounded-full" />
          <span className="w-1.5 h-1.5 bg-[#F9040C] rounded-full" />
          <span className="w-6 h-0.5 bg-[#8B1E1E] rounded-full" />
        </div>
      </div>
    </div>
  );
};
