import { useState, FormEvent } from 'react';
import { Calendar, Clock, Bike, User, Phone, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { products } from '../data/products';

interface TestRideFormProps {
  initialScooter?: string;
  onSuccess?: () => void;
}

export function TestRideForm({ initialScooter = '' }: TestRideFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    scooterModel: initialScooter || (products[0] ? `${products[0].brand} ${products[0].name}` : ''),
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.scooterModel) {
      setError('Please fill in your name, mobile number, and chosen scooter model.');
      return;
    }
    if (formData.mobile.trim().length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0D0D0D] border border-[#2C0F12] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl">
      {submitted ? (
        <div className="text-center py-8 px-4 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#8B1E1E] flex items-center justify-center mx-auto mb-4 text-[#F9040C]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-heading uppercase mb-2">
            Test Ride Request Logged
          </h3>
          <p className="text-xs sm:text-sm text-[#E8B7B7] max-w-md mx-auto leading-relaxed mb-6">
            Thank you, <strong className="text-white">{formData.name}</strong>. Your test ride interest for{' '}
            <strong className="text-[#F9040C]">{formData.scooterModel}</strong> has been received by our showroom team. A representative will contact you via <strong className="text-white">{formData.mobile}</strong> to confirm slot and battery readiness.
          </p>

          <div className="p-3.5 rounded-xl bg-[#050505] border border-[#2C0F12] text-xs text-[#E8B7B7] max-w-md mx-auto mb-6 text-left">
            <span className="text-[#F9040C] font-bold block mb-1">Showroom Verification Note:</span>
            Please remember to carry a valid government ID or driving license when visiting the showroom for your test ride.
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-[#181818] hover:bg-[#2C0F12] border border-[#2C0F12] hover:border-[#8B1E1E] text-white text-xs font-heading font-black uppercase tracking-wider transition-colors cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form
  action="https://formsubmit.co/patelautomobile0@gmail.com"
  method="POST"
  className="space-y-4"
>
  <input type="hidden" name="_subject" value="New Enquiry - Patel Automobiles" />
  <input type="hidden" name="_template" value="table" />
          <div className="text-left mb-6">
            <span className="text-[11px] uppercase tracking-widest font-heading font-black text-[#F9040C] mb-1 block">
              SCHEDULE YOUR RIDE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-heading">
              BOOK A SHOWROOM TEST RIDE
            </h2>
            <p className="text-xs text-[#E8B7B7] mt-1">
              Experience zero-noise electric acceleration firsthand at Patel Automobiles Lailunga.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-[#2C0F12] border border-[#8B1E1E] text-[#FCE9E9] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#F9040C]" />
              <span>{error}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="test-ride-name" className="block text-xs font-bold text-[#FCE9E9] uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C97C7C]" />
              <input
                id="test-ride-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050505] border border-[#2C0F12] text-sm text-white placeholder:text-[#8B1E1E]/80 focus:outline-none focus:border-[#F9040C]"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="test-ride-mobile" className="block text-xs font-bold text-[#FCE9E9] uppercase tracking-wider mb-1.5">
              Mobile Contact Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C97C7C]" />
              <input
                id="test-ride-mobile"
                type="tel"
                required
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                placeholder="10-digit mobile number"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050505] border border-[#2C0F12] text-sm text-white placeholder:text-[#8B1E1E]/80 focus:outline-none focus:border-[#F9040C]"
              />
            </div>
          </div>

          {/* Scooter Model Selection */}
          <div>
            <label htmlFor="test-ride-scooter-model" className="block text-xs font-bold text-[#FCE9E9] uppercase tracking-wider mb-1.5">
              Preferred Electric Scooter *
            </label>
            <div className="relative">
              <Bike className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C97C7C]" />
              <select
                id="test-ride-scooter-model"
                value={formData.scooterModel}
                onChange={(e) => setFormData({ ...formData, scooterModel: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050505] border border-[#2C0F12] text-sm text-white focus:outline-none focus:border-[#F9040C]"
              >
                {products.map((p) => (
                  <option key={p.id} value={`${p.brand} ${p.name}`}>
                    {p.brand} {p.name} ({p.priceDisplay})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="test-ride-date" className="block text-xs font-bold text-[#FCE9E9] uppercase tracking-wider mb-1.5">
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C97C7C]" />
                <input
                  id="test-ride-date"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050505] border border-[#2C0F12] text-sm text-white focus:outline-none focus:border-[#F9040C]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="test-ride-time" className="block text-xs font-bold text-[#FCE9E9] uppercase tracking-wider mb-1.5">
                Preferred Time Window
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C97C7C]" />
                <select
                  id="test-ride-time"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050505] border border-[#2C0F12] text-sm text-white focus:outline-none focus:border-[#F9040C]"
                >
                  <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                  <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Optional Message */}
          <div>
            <label htmlFor="test-ride-message" className="block text-xs font-bold text-[#FCE9E9] uppercase tracking-wider mb-1.5">
              Specific Requirements / Questions (Optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-[#C97C7C]" />
              <textarea
                id="test-ride-message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Ask about finance options, subsidy, battery warranty..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050505] border border-[#2C0F12] text-sm text-white placeholder:text-[#8B1E1E]/80 focus:outline-none focus:border-[#F9040C]"
              />
            </div>
          </div>

          <button
            id="submit-test-ride-form"
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white font-heading font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#D71920]/30 cursor-pointer active:scale-98"
          >
            Confirm Test Ride Request
          </button>

          <p className="text-[11px] text-center text-[#E8B7B7] pt-1">
            * Test rides are subject to slot availability and vehicle battery charging readiness at the dealership.
          </p>
        </form>
      )}
    </div>
  );
}
