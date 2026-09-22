import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Product } from '../types';
import { Battery, Gauge, ArrowRight, Zap, MessageSquare } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { RedImagePlaceholder } from './RedImagePlaceholder';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  index?: number;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0, onViewDetails }) => {
  const shouldReduceMotion = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);

  // Alternating slide direction based on index:
  // Card 1 -> slide from left, Card 2 -> slide from right, Card 3 -> slide from left, etc.
  // with fade + slight upward movement + staggered timing
  const isEven = index % 2 === 0;
  const initialX = shouldReduceMotion ? 0 : isEven ? -28 : 28;
  const staggerDelay = shouldReduceMotion ? 0 : (index % 4) * 0.08;

  // Key specifications (authentic data only)
  const rangeDisplay = product.range || (product.rangeKm ? `${product.rangeKm} km/charge` : null);
  const batteryDisplay = product.batteryType || product.battery || null;
  const speedDisplay = product.topSpeed || null;

  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello Patel Automobiles, I am inquiring about the ${product.brand} ${product.name} (${product.priceDisplay}). Please share test ride and showroom availability in Lailunga.`;
    window.open(`https://wa.me/919691772124?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article
      id={`product-card-${product.slug}`}
      initial={{ opacity: 0, x: initialX, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.45,
        delay: staggerDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => onViewDetails(product)}
      className="group cursor-pointer relative rounded-2xl border border-[#2C0F12] hover:border-[#F9040C] bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D] to-[#080808] text-white shadow-lg hover:shadow-2xl hover:shadow-[#D71920]/25 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 select-none"
    >
      {/* 
        CINEMATIC LIGHT SWEEP EFFECT:
        Passes diagonally through the card when the user hovers over it
      */}
      <div 
        className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
        style={{
          background: 'linear-gradient(115deg, transparent 35%, rgba(249, 4, 12, 0.18) 48%, rgba(255, 255, 255, 0.08) 50%, rgba(249, 4, 12, 0.18) 52%, transparent 65%)',
          animation: 'light-sweep 1.1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        }}
      />

      {/* 1. Large Scooter Image Area with Natural Photo Preservation & Red Placeholder Fallback */}
      <div className="relative aspect-[4/3] w-full bg-[#050505] overflow-hidden">
        {!imageFailed && product.images.frontThreeQuarter ? (
          <img
            src={product.images.frontThreeQuarter}
            alt={`${product.brand} ${product.name} Electric Scooter`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-108 p-2"
          />
        ) : (
          <RedImagePlaceholder 
            styleType="silhouette" 
            title={product.name} 
            subtitle={`${product.brand} Electric Scooter`}
            className="w-full h-full"
          />
        )}

        {/* Brand Tag in Red Family */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex items-center gap-1.5 z-10">
          <span 
            className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md bg-[#2C0F12]/95 text-[#FCE9E9] border border-[#8B1E1E] shadow-sm"
          >
            {product.brand}
          </span>
        </div>

        {/* Cargo / Loader Tag if applicable */}
        {product.isLoader && (
          <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10">
            <span className="px-1.5 py-0.5 rounded bg-[#8B1E1E] text-white font-black text-[8px] sm:text-[9px] uppercase tracking-wide shadow-xs">
              Cargo
            </span>
          </div>
        )}
      </div>

      {/* 2. Card Body */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between bg-transparent relative z-20">
        <div>
          {/* Model Title */}
          <h3 className="font-heading font-black text-sm sm:text-base text-white tracking-tight leading-snug truncate group-hover:text-[#F9040C] transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base md:text-lg font-black text-[#F9040C] font-heading">
              {product.priceDisplay}
            </span>
            {product.price && (
              <span className="text-[9px] sm:text-[10px] text-[#C97C7C] font-medium">
                Ex-Showroom
              </span>
            )}
          </div>

          {/* 1–3 Verified Key Specifications */}
          <div className="mt-2.5 space-y-1.5 text-[10px] sm:text-xs text-[#E8B7B7]">
            {rangeDisplay ? (
              <div className="flex items-center gap-1.5 truncate">
                <Gauge className="w-3 h-3 text-[#F9040C] shrink-0" />
                <span className="truncate">{rangeDisplay}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 truncate text-[#C97C7C] italic">
                <Gauge className="w-3 h-3 shrink-0" />
                <span>Range: Contact showroom</span>
              </div>
            )}

            {batteryDisplay && (
              <div className="flex items-center gap-1.5 truncate">
                <Battery className="w-3 h-3 text-[#D71920] shrink-0" />
                <span className="truncate">{batteryDisplay}</span>
              </div>
            )}

            {speedDisplay && (
              <div className="flex items-center gap-1.5 truncate text-[9px] sm:text-[11px] text-[#C97C7C]">
                <Zap className="w-3 h-3 text-[#8B1E1E] shrink-0" />
                <span className="truncate">{speedDisplay}</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. Action Buttons: Red View Details + Enquire (WhatsApp) */}
        <div className="mt-3.5 pt-2.5 border-t border-[#2C0F12] flex items-center gap-1.5 sm:gap-2">
          {/* View Details CTA */}
          <button
            id={`view-details-btn-${product.slug}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="flex-grow py-2 px-2.5 sm:px-3 rounded-lg bg-[#D71920] hover:bg-[#F9040C] text-white text-[10px] sm:text-xs font-heading font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-md shadow-[#D71920]/25"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Enquire on WhatsApp */}
          <button
            id={`enquire-btn-${product.slug}`}
            type="button"
            onClick={handleWhatsAppEnquiry}
            title="Enquire on WhatsApp"
            className="py-2 px-2.5 sm:px-3 rounded-lg bg-[#111111] hover:bg-[#2C0F12] text-[#F9040C] border border-[#511010] hover:border-[#F9040C] text-[10px] sm:text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-xs"
          >
            <WhatsAppIcon className="w-3 h-3 fill-current" />
            <span className="hidden xs:inline">Enquire</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
};
