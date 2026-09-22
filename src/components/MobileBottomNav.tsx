import { Home, Bike, Info, MessageSquareQuote, PhoneCall } from 'lucide-react';
import { PageView } from '../types';

interface MobileBottomNavProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export function MobileBottomNav({ currentPage, onNavigate }: MobileBottomNavProps) {
  // Exactly 5 items as strictly required: Home, Scooters, About Us, Stories, Contact
  const navItems: { label: string; page: PageView; icon: any }[] = [
    { label: 'Home', page: 'home', icon: Home },
    { label: 'Scooters', page: 'scooters', icon: Bike },
    { label: 'About Us', page: 'about', icon: Info },
    { label: 'Stories', page: 'stories', icon: MessageSquareQuote },
    { label: 'Contact', page: 'contact', icon: PhoneCall },
  ];

  const handleSelect = (page: PageView) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      id="mobile-bottom-navigation"
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/98 backdrop-blur-lg border-t border-[#2C0F12] pb-safe shadow-2xl"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          // When in scooter-detail, highlight Scooters
          const isActive = currentPage === item.page || (item.page === 'scooters' && currentPage === 'scooter-detail');

          return (
            <button
              key={item.page}
              id={`bottom-nav-${item.page}`}
              onClick={() => handleSelect(item.page)}
              className={`flex flex-col items-center justify-center h-full w-full transition-colors relative py-1 ${
                isActive ? 'text-[#F9040C]' : 'text-[#C97C7C] hover:text-white'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-[#F9040C] rounded-full shadow-sm shadow-[#F9040C]" />
              )}
              <Icon 
                className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#F9040C]' : 'text-[#C97C7C]'}`} 
                strokeWidth={isActive ? 2.3 : 1.8}
              />
              <span className={`text-[10px] tracking-tight mt-1 font-medium ${
                isActive ? 'text-[#F9040C] font-bold' : 'text-[#C97C7C]'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
