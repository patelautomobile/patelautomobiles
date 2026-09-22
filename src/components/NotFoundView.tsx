import { AlertOctagon, Home, Bike, Calendar } from 'lucide-react';
import { PageView } from '../types';

interface NotFoundViewProps {
  onNavigate: (page: PageView) => void;
}

export function NotFoundView({ onNavigate }: NotFoundViewProps) {
  return (
    <div className="w-full min-h-[70vh] bg-[#060608] flex items-center justify-center p-4 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#0C0C11] border border-red-950/50 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#1F070A] border border-red-600/40 flex items-center justify-center mx-auto mb-4 text-[#FF2E3B]">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-bold text-[#FF2E3B] uppercase tracking-widest block mb-1">
          404 ERROR • ROUTE NOT FOUND
        </span>

        <h1 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
          PAGE UNAVAILABLE
        </h1>

        <p className="text-xs text-neutral-400 leading-relaxed mb-6">
          The vehicle catalogue item or page you are searching for might have moved or is temporarily unavailable.
        </p>

        <div className="space-y-2.5">
          <button
            onClick={() => onNavigate('home')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#E50914] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Showroom Home</span>
          </button>

          <button
            onClick={() => onNavigate('scooters')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#060608] border border-red-950/50 text-white hover:border-red-600 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Bike className="w-4 h-4 text-[#FF2E3B]" />
            <span>Explore All 39 Scooters</span>
          </button>

          <button
            onClick={() => onNavigate('test-ride')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#060608] border border-red-950/50 text-white hover:border-red-600 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#FF2E3B]" />
            <span>Book a Test Ride</span>
          </button>
        </div>
      </div>
    </div>
  );
}
