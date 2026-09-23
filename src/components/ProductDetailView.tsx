import React, { useState, FormEvent } from 'react';
import { Product, PageView } from '../types';
import { products } from '../data/products';
import { ProductGallery } from './ProductGallery';
import { SpecificationGrid } from './SpecificationGrid';
import { Breadcrumbs } from './Breadcrumbs';
import { Calendar, Send, ArrowLeft, ShieldCheck, Zap, Phone, CheckCircle2, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/site';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { RedImagePlaceholder } from './RedImagePlaceholder';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (p: Product) => void;
  onBookTestRide: (scooterName: string) => void;
  onNavigate: (page: PageView) => void;
}

export function ProductDetailView({
  product,
  onBack,
  onSelectProduct,
  onBookTestRide,
  onNavigate,
}: ProductDetailViewProps) {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: '', phone: '', message: '' });

  // Related scooters from same brand
  const relatedScooters = products
    .filter((p) => p.brand === product.brand && p.id !== product.id)
    .slice(0, 4);

  const handleEnquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    setEnquirySent(true);
  };

  const handleDirectWhatsApp = () => {
    const msg = `Hello Patel Automobiles, I am interested in ${product.brand} ${product.name} (${product.priceDisplay}). Please share on-road pricing and showroom availability in Lailunga.`;
    window.open(`https://wa.me/919691772124?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-[#050505] min-h-screen text-white pb-24 md:pb-16">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#2C0F12] bg-[#080808]">
        <Breadcrumbs
          items={[
            { label: 'Home', onClick: () => onNavigate('home') },
            { label: 'Scooters', onClick: () => onNavigate('scooters') },
            { label: product.brand, onClick: () => onNavigate('scooters') },
            { label: product.name },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8">
        {/* Back Button */}
        <button
          id="product-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-heading font-black uppercase tracking-wider text-[#E8B7B7] hover:text-[#F9040C] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </button>

        {/* Product Showcase Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left: 4-Angle Interactive Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={`${product.brand} ${product.name}`} />
          </div>

          {/* Right: Key Commercial Data & Instant CTAs */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D0D0D] to-[#080808] border border-[#2C0F12] shadow-2xl space-y-5">
              {/* Brand & Availability Badges */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md bg-[#2C0F12] border border-[#8B1E1E] text-[#FCE9E9] text-xs font-extrabold uppercase tracking-wider">
                  {product.brand} Motors
                </span>
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                  product.availability === 'In Stock'
                    ? 'bg-[#181818] text-[#FCE9E9] border border-[#511010]'
                    : 'bg-[#050505] text-[#C97C7C] border border-[#2C0F12]'
                }`}>
                  {product.availability}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h1 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#E8B7B7] mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Block */}
              <div className="pt-3 border-t border-[#2C0F12]">
                <div className="text-[11px] text-[#C97C7C] uppercase tracking-wider font-semibold">
                  Ex-Showroom Price
                </div>
                <div className="font-heading font-black text-3xl sm:text-4xl text-[#F9040C]">
                  {product.priceDisplay}
                </div>
                {product.price && (
                  <div className="text-[11px] text-[#C97C7C] mt-1">
                    * Subsidies, regional RTO registration & road taxes may apply.
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  id="product-book-test-ride-btn"
                  onClick={() => onBookTestRide(`${product.brand} ${product.name}`)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#D71920]/30 active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Test Ride</span>
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    id="product-direct-inquiry-btn"
                    onClick={() => setEnquiryModalOpen(true)}
                    className="py-3 px-3 rounded-xl bg-[#0D0D0D] hover:bg-[#2C0F12] border border-[#2C0F12] hover:border-[#8B1E1E] text-white font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#F9040C]" />
                    <span>Send Enquiry</span>
                  </button>

                  <button
                    id="product-whatsapp-inquiry-btn"
                    onClick={handleDirectWhatsApp}
                    className="py-3 px-3 rounded-xl bg-[#0D0D0D] hover:bg-[#2C0F12] border border-[#2C0F12] hover:border-[#8B1E1E] text-[#F9040C] hover:text-white font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Dealership Assurance Notes */}
              <div className="pt-3 border-t border-[#2C0F12] space-y-2 text-xs text-[#E8B7B7]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#F9040C] shrink-0" />
                  <span>Authorized warranty support & battery testing at Lailunga Hub</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#F9040C] shrink-0" />
                  <span>Available with flexible installment options & transparent pricing</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full Specifications Section */}
        <div className="mb-14">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D0D0D] border border-[#2C0F12]">
            <SpecificationGrid product={product} />
          </div>
        </div>

        {/* Related Scooters from Same Brand */}
        {relatedScooters.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] uppercase font-heading font-black text-[#F9040C] tracking-widest block">
                  EXPLORE ALTERNATIVES
                </span>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                  MORE FROM {product.brand}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('scooters')}
                className="text-xs font-bold text-[#F9040C] hover:underline cursor-pointer"
              >
                View All {product.brand} Models →
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {relatedScooters.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectProduct(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer rounded-2xl bg-[#0D0D0D] border border-[#2C0F12] hover:border-[#F9040C] p-3 flex flex-col justify-between transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#050505] mb-2.5 p-2 flex items-center justify-center">
                    <img
                      src={rel.images.frontThreeQuarter}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-white truncate group-hover:text-[#F9040C] transition-colors">
                      {rel.name}
                    </h4>
                    <div className="text-xs font-heading font-black text-[#F9040C] mt-1">
                      {rel.priceDisplay}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enquiry Modal */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#0D0D0D] border border-[#8B1E1E] rounded-2xl p-6 text-left shadow-2xl">
            {enquirySent ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#F9040C] mx-auto mb-3" />
                <h4 className="text-lg font-heading font-black text-white uppercase">
                  Enquiry Transmitted
                </h4>
                <p className="text-xs text-[#E8B7B7] mt-2 mb-6">
                  Thank you, <strong className="text-white">{enquiryForm.name}</strong>. Your inquiry for {product.brand} {product.name} has been received. Our sales desk in Lailunga will contact you at {enquiryForm.phone}.
                </p>
                <button
                  onClick={() => {
                    setEnquirySent(false);
                    setEnquiryModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white font-heading font-black text-xs uppercase tracking-wider cursor-pointer"
                >
                  Close
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
                <h4 className="font-heading font-black text-lg text-white uppercase">
                  Vehicle Enquiry: {product.brand} {product.name}
                </h4>
                <p className="text-xs text-[#E8B7B7]">
                  Inquire about showroom availability, on-road prices, battery warranty, and financing.
                </p>

                <div>
                  <label className="text-xs font-bold text-[#FCE9E9] block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 rounded-xl bg-[#050505] border border-[#2C0F12] focus:border-[#F9040C] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#FCE9E9] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 rounded-xl bg-[#050505] border border-[#2C0F12] focus:border-[#F9040C] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#FCE9E9] block mb-1">Inquiry Details (Optional)</label>
                  <textarea
                    rows={2}
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    placeholder="Test ride date, financing query, exchange request..."
                    className="w-full px-3 py-2 rounded-xl bg-[#050505] border border-[#2C0F12] focus:border-[#F9040C] text-white text-xs outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setEnquiryModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[#181818] text-[#E8B7B7] hover:text-white text-xs font-bold uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white text-xs font-heading font-black uppercase tracking-wider cursor-pointer"
                  >
                    Submit Enquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
