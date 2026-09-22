import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Calendar, ShieldCheck } from 'lucide-react';
import { PageView } from '../types';
import { LogoSlot } from './LogoSlot';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView, brandFilter?: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Scooters', page: 'scooters' },
    { label: 'Photos', page: 'photos' },
    { label: 'About Us', page: 'about' },
    { label: 'Stories', page: 'stories' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNav = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="main-sticky-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050505]/98 backdrop-blur-xl border-b border-[#511010] shadow-xl shadow-black/90 py-2 sm:py-2.5' 
          : 'bg-[#050505]/95 backdrop-blur-md border-b border-[#2C0F12] py-2.5 sm:py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 flex items-center justify-between">
        
        {/* Left: Dedicated Real Patel Automobiles Logo Area with Upload Placeholder */}
        <div className="flex items-center">
          <button
            id="header-logo-container"
            onClick={() => handleNav('home')}
            className="flex items-center focus:outline-none group text-left cursor-pointer"
            title="Patel Automobiles — Electric Scooters Showroom"
          >
            <LogoSlot 
              imgClassName="h-7 sm:h-8 md:h-9 w-auto max-w-[130px] sm:max-w-[160px]" 
              showText={true}
            />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((item) => (
            <button
              key={item.page}
              id={`nav-desktop-${item.page}`}
              onClick={() => handleNav(item.page)}
              className={`text-xs uppercase tracking-wider font-bold transition-all py-1 relative group cursor-pointer ${
                currentPage === item.page
                  ? 'text-[#F9040C]'
                  : 'text-[#E8B7B7] hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              {currentPage === item.page ? (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F9040C] rounded-full shadow-sm shadow-[#F9040C]/80" />
              ) : (
                <span className="absolute -bottom-1 left-1/2 right-1/2 h-0.5 bg-[#8B1E1E]/50 rounded-full transition-all duration-300 group-hover:left-0 group-hover:right-0" />
              )}
            </button>
          ))}

          <button
            id="desktop-book-test-ride"
            onClick={() => handleNav('test-ride')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#D71920] hover:bg-[#F9040C] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm shadow-[#D71920]/30 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Test Ride</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle-btn"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#181818] border border-[#2C0F12] text-white hover:text-[#F9040C] transition-colors focus:outline-none cursor-pointer"
        >
          {mobileMenuOpen ? (
            <>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F9040C]">Close</span>
              <X className="w-4 h-4 text-[#F9040C]" />
            </>
          ) : (
            <>
              <span className="text-[11px] font-extrabold uppercase tracking-wider">Menu</span>
              <div className="w-4 h-3 flex flex-col justify-between items-end">
                <span className="w-4 h-[2px] bg-white rounded-full transition-all" />
                <span className="w-3 h-[2px] bg-[#F9040C] rounded-full transition-all" />
                <span className="w-4 h-[2px] bg-white rounded-full transition-all" />
              </div>
            </>
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#080808]/98 backdrop-blur-xl border-b border-[#511010] shadow-2xl p-5 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col divide-y divide-[#2C0F12]">
            {navLinks.map((item) => (
              <button
                key={item.page}
                id={`drawer-link-${item.page}`}
                onClick={() => handleNav(item.page)}
                className={`flex items-center justify-between py-3 text-left font-bold text-sm tracking-wide transition-colors ${
                  currentPage === item.page
                    ? 'text-[#F9040C]'
                    : 'text-[#FCE9E9] hover:text-[#F9040C]'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C97C7C]" />
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              id="mobile-drawer-test-ride-btn"
              onClick={() => handleNav('test-ride')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Test Ride</span>
            </button>
            <div className="text-[10px] text-center text-[#E8B7B7] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#F9040C]" />
              <span>Authorised Zelio • Warivo • Dynamo Showroom</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
