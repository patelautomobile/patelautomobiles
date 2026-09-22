import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { siteConfig } from '../config/site';

interface LogoSlotProps {
  className?: string;
  imgClassName?: string;
  showText?: boolean;
}

export const LogoSlot: React.FC<LogoSlotProps> = ({
  className = '',
  imgClassName = 'h-8 sm:h-9 md:h-10 w-auto max-w-[140px] sm:max-w-[170px]',
  showText = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Path from siteConfig or default standard upload path
  const logoPath = siteConfig.logo || '/images/logo/patel-automobiles-logo.webp';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* 
        CLEARLY DEFINED LOGO UPLOAD PLACEHOLDER
        Replace or upload your official logo asset to:
        ${logoPath}
        Supports .webp, .png, or .svg.
      */}
      <div 
        id="patel-automobiles-logo-slot"
        className="relative flex items-center justify-center shrink-0"
      >
        {!imageError && (
          <img
            id="patel-automobiles-official-logo"
            src={logoPath}
            alt="Patel Automobiles Official Logo"
            className={`${imgClassName} object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100 block' : 'opacity-0 hidden'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Clean, premium placeholder shown when the image file is not yet uploaded */}
        {(!imageLoaded || imageError) && (
          <div 
            id="logo-upload-placeholder-badge"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#24060A] to-[#0D0507] border border-[#DC2626]/40 flex items-center justify-center shadow-md shadow-[#E50914]/15 group-hover:border-[#E50914] transition-colors"
            title="Upload official logo to /images/logo/patel-automobiles-logo.webp"
          >
            <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#FF2E3B] group-hover:scale-110 transition-transform" />
          </div>
        )}
      </div>

      {/* Brand Name Typography: PATEL AUTOMOBILES */}
      {showText && (
        <div className="flex flex-col select-none min-w-0">
          <span className="font-heading font-black tracking-tight text-sm xs:text-base sm:text-lg md:text-xl text-white group-hover:text-[#FF2E3B] transition-colors uppercase leading-tight whitespace-nowrap">
            PATEL <span className="text-[#E50914]">AUTOMOBILES</span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-slate-400 uppercase leading-tight hidden xs:block">
            Electric Scooters Showroom • Lailunga
          </span>
        </div>
      )}
    </div>
  );
};
