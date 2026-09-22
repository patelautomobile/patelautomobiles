import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/site';

export function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    topic: 'General Showroom Enquiry',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.message) return;
    setSent(true);
  };

  return (
    <section 
      id="contact-section"
      className="w-full bg-[#060608] py-12 sm:py-20 border-b border-red-950/40 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#FF2E3B] mb-1.5 block">
            GET IN TOUCH
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
            VISIT PATEL AUTOMOBILES
          </h2>
          <div className="w-14 h-1 bg-[#E50914] mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm text-neutral-300 mt-3">
            Authorized electric two-wheeler showroom and service center serving Lailunga, Raigarh, and Kharsia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Showroom Details Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0C0C11] border border-red-950/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1F070A] border border-red-600/30 flex items-center justify-center text-[#FF2E3B]">
                  <MapPin className="w-5 h-5 text-[#FF2E3B]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-base">
                    Main Showroom
                  </h3>
                  <span className="text-xs text-neutral-400">Lailunga, Chhattisgarh</span>
                </div>
              </div>
              <p className="text-xs text-[#C5CED6] leading-relaxed">
                {siteConfig.address}
              </p>
              <div className="mt-3 pt-3 border-t border-red-950/40 text-[11px] text-neutral-400">
                Primary coverage: Lailunga • Raigarh • Kharsia.
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 rounded-2xl bg-[#0C0C11] border border-red-950/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#1F070A] border border-red-600/30 flex items-center justify-center text-[#FF2E3B]">
                  <Clock className="w-5 h-5 text-[#FF2E3B]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-base">
                    Showroom Timings
                  </h3>
                  <span className="text-xs text-neutral-400">Walk-ins & Test Rides</span>
                </div>
              </div>
              <p className="text-xs text-[#C5CED6]">
                {siteConfig.openingHours}
              </p>
            </div>

            {/* Verification Note Regarding Contact Records */}
            <div className="p-4 rounded-xl bg-[#0C0C11] border border-red-950/50 text-xs text-neutral-400 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#FF2E3B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Contact Verification Notice:</strong>
                Official telecom numbers and dedicated WhatsApp lines are currently in final registration. You may leave an inquiry below for immediate showroom callback.
              </div>
            </div>
          </div>

          {/* Contact & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0C0C11] border border-red-950/50">
              {sent ? (
                <div className="text-center py-10 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#1F070A] border border-red-600/30 flex items-center justify-center mx-auto mb-3 text-[#FF2E3B]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading mb-1">
                    Message Dispatched to Desk
                  </h3>
                  <p className="text-xs text-[#C5CED6] max-w-sm mx-auto mb-4">
                    Thank you, <strong className="text-white">{form.name}</strong>. Our showroom manager will review your note and get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setForm({ name: '', contact: '', topic: 'General Showroom Enquiry', message: '' });
                      setSent(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#060608] border border-red-950/50 text-xs font-bold text-white hover:border-red-600 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-tight mb-1">
                      DIRECT SHOWROOM ENQUIRY
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Have a query about Zelio, Warivo, or Dynamo models, finance schemes, or battery warranty?
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#C5CED6] uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060608] border border-red-950/50 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF2E3B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#C5CED6] uppercase tracking-wider mb-1">
                      Phone Number or Email *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      placeholder="Mobile number or email address"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060608] border border-red-950/50 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF2E3B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#C5CED6] uppercase tracking-wider mb-1">
                      Enquiry Subject
                    </label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060608] border border-red-950/50 text-sm text-white focus:outline-none focus:border-[#FF2E3B]"
                    >
                      <option value="General Showroom Enquiry">General Showroom Enquiry</option>
                      <option value="Vehicle Pricing & On-Road Estimate">Vehicle Pricing & On-Road Estimate</option>
                      <option value="Battery Replacement & Diagnostics">Battery Replacement & Diagnostics</option>
                      <option value="Commercial Loaders Inquiry (3XL / Logix)">Commercial Loaders Inquiry (3XL / Logix)</option>
                      <option value="Dealership Finance & EMI Details">Dealership Finance & EMI Details</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#C5CED6] uppercase tracking-wider mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write your question or request..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060608] border border-red-950/50 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF2E3B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#E50914] hover:bg-[#B91C1C] text-white font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Showroom Note</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
