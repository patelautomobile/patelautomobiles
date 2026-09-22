import React from 'react';
import { ExternalLink, ShieldCheck, MapPin, Phone, Instagram, Clock, Mail } from 'lucide-react';
import { PageView } from '../types';
import { siteConfig } from '../config/site';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { LogoSlot } from './LogoSlot';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: PageView) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-footer"
      className="w-full bg-[#050505] border-t border-[#2C0F12] pt-14 pb-24 md:pb-12 text-[#E8B7B7] relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col items-start">
            {/* Logo Slot */}
            <div id="footer-client-logo-slot" className="mb-3.5">
              <LogoSlot 
                imgClassName="h-8 sm:h-9 w-auto max-w-[140px] sm:max-w-[170px]" 
                showText={true} 
              />
            </div>
            
            <p className="text-xs text-[#E8B7B7] max-w-sm leading-relaxed mb-4">
              Authorized multi-brand electric scooter showroom founded by <strong>{siteConfig.founder}</strong>. Delivering verified EV mobility, transparent specifications, and dedicated service across northern Chhattisgarh.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#FCE9E9] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#F9040C]" />
              <span>Authorized Zelio • Warivo • Dynamo Showroom</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-heading font-black text-white uppercase tracking-wider mb-3.5">
                Explore
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button 
                    onClick={() => handleNav('home')} 
                    className="hover:text-[#F9040C] transition-colors cursor-pointer text-left"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNav('scooters')} 
                    className="hover:text-[#F9040C] transition-colors cursor-pointer text-left"
                  >
                    All 39 Scooters
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNav('test-ride')} 
                    className="hover:text-[#F9040C] transition-colors cursor-pointer text-left"
                  >
                    Book Test Ride
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNav('photos')} 
                    className="hover:text-[#F9040C] transition-colors cursor-pointer text-left"
                  >
                    Photos & Gallery
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNav('stories')} 
                    className="hover:text-[#F9040C] transition-colors cursor-pointer text-left"
                  >
                    Stories & Media
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-heading font-black text-white uppercase tracking-wider mb-3.5">
                Dealership
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button 
                    onClick={() => handleNav('about')} 
                    className="hover:text-[#F9040C] transition-colors cursor-pointer text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNav('contact')} 
                    className="hover:text-[#F9040C] transition-colors cursor-pointer text-left"
                  >
                    Showroom & Hubs
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNav('privacy-policy')} 
                    className="hover:text-[#F9040C] transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Service Locations & Direct Contact */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <h4 className="text-xs font-heading font-black text-white uppercase tracking-wider mb-2.5">
                Authorized Service Network
              </h4>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-[#FCE9E9]">
                <span className="px-2.5 py-1 rounded-md bg-[#0D0D0D] border border-[#2C0F12]">
                  Lailunga (HQ)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#0D0D0D] border border-[#2C0F12]">
                  Raigarh Hub
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#0D0D0D] border border-[#2C0F12]">
                  Kharsia Hub
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F9040C] shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
              {siteConfig.openingHours && (
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#F9040C] shrink-0" />
                  <span>{siteConfig.openingHours}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F9040C] shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.phone} ({siteConfig.founder})
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a 
                href={`https://wa.me/919691772124?text=${encodeURIComponent('Hello Patel Automobiles, I would like to inquire about electric scooters.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0D0D0D] hover:bg-[#2C0F12] border border-[#511010] text-[#F9040C] hover:text-white text-xs font-bold transition-colors"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Desk</span>
              </a>

              {siteConfig.socialLinks.instagram && (
                <a 
                  href={`https://instagram.com/${siteConfig.socialLinks.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0D0D0D] hover:bg-[#2C0F12] border border-[#511010] text-[#FCE9E9] hover:text-white text-xs font-bold transition-colors"
                  title="Follow on Instagram"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#F9040C]" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-[#2C0F12] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#C97C7C]">
          <p>© {new Date().getFullYear()} Patel Automobiles. All rights reserved. Authorized Multi-Brand EV Dealership.</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button 
              onClick={() => handleNav('privacy-policy')}
              className="hover:text-[#F9040C] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <span>Lailunga • Raigarh • Kharsia</span>
            <span>•</span>
            <span>
              Created by{' '}
              <a
                href={siteConfig.creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8B7B7] hover:text-[#F9040C] transition-colors font-semibold"
              >
                {siteConfig.creatorName}
              </a>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
