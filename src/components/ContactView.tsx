import React, { useState, FormEvent } from 'react';
import { 
  Phone, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Bike, 
  ArrowRight, 
  Instagram, 
  Youtube, 
  Calendar, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ExternalLink,
  Play,
  Sparkles,
  Navigation,
  MessageSquare,
  X
} from 'lucide-react';
import { siteConfig } from '../config/site';
import { PATEL_DIRECTIONS_URL } from '../config/mapConfig';
import { products } from '../data/products';
import { PageView } from '../types';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { SparkleParticles } from './SparkleParticles';
import { RedImagePlaceholder } from './RedImagePlaceholder';
import { getSlotImage } from '../lib/imageSlots';

interface ContactViewProps {
  onNavigate: (page: PageView, brandFilter?: string) => void;
}

export function ContactView({ onNavigate }: ContactViewProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [cityLocation, setCityLocation] = useState('Lailunga');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [scooterModel, setScooterModel] = useState('General Inquiry / Need Advice');
  const [inquiryType, setInquiryType] = useState('Price & Subsidy');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone Call' | 'Instagram'>('WhatsApp');
  const [message, setMessage] = useState('');

  // Form Validation & Submission State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Group products by brand for clean dropdown select
  const zelioModels = products.filter(p => p.brand === 'Zelio');
  const warivoModels = products.filter(p => p.brand === 'Warivo');
  const dynamoModels = products.filter(p => p.brand === 'Dynamo');

  // Validate form fields
  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (at least 2 characters).';
    }

    // Indian mobile number validation: 10 digits starting with 6, 7, 8, or 9
    const cleanPhone = mobileNumber.replace(/[\s\-+]/g, '');
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!cleanPhone) {
      errs.mobileNumber = 'Mobile number is required.';
    } else if (!mobileRegex.test(cleanPhone)) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 9691772124).';
    }

    if (!cityLocation.trim()) {
      errs.cityLocation = 'Please select or enter your city / location.';
    }

    if (!message.trim() || message.trim().length < 5) {
      errs.message = 'Please enter a brief message or question (at least 5 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief network dispatch to showroom desk
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 450, behavior: 'smooth' });
    }, 450);
  };

  // WhatsApp quick trigger
  const handleDirectWhatsApp = () => {
    const text = `Hello Patel Automobiles, I would like to enquire about electric scooters at your Lailunga showroom.`;
    window.open(`https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  // WhatsApp trigger from submitted form
  const handleFollowUpWhatsApp = () => {
    const text = `Hello Patel Automobiles, my name is ${fullName.trim()} from ${cityLocation.trim()}. I submitted an inquiry regarding ${inquiryType} for ${scooterModel}. Mobile: ${mobileNumber}. Message: ${message.trim()}`;
    window.open(`https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="contact-page-wrapper"
      className="w-full min-h-screen text-white pb-24 md:pb-16 relative overflow-hidden bg-[#060608]"
      style={{
        background: 'linear-gradient(180deg, #060608 0%, #0F0305 25%, #180508 50%, #110204 75%, #060608 100%)',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. LARGE CINEMATIC CONTACT HERO */}
      {/* ========================================================================= */}
      <section 
        id="contact-hero-section"
        className="relative min-h-[500px] sm:min-h-[560px] md:min-h-[620px] flex items-center justify-center border-b border-red-950/40 overflow-hidden"
      >
        {/* Cinematic Automotive / Showroom Background Image with Depth Gradient */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          {(() => {
            const contactHeroUrl = getSlotImage('photos/contact/showroom-contact') || getSlotImage('photos/home/home-showroom');
            return contactHeroUrl ? (
              <img 
                src={contactHeroUrl} 
                alt="Patel Automobiles EV Showroom Visual"
                className="w-full h-full object-cover object-center opacity-25 transform scale-105 transition-transform duration-1000"
              />
            ) : null;
          })()}
          {/* Layered cinematic gradients for deep contrast and legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/85 to-[#060608]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060608] via-transparent to-[#060608]" />
        </div>

        {/* Ambient Glows: Deep Crimson, True Red */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div 
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[360px] rounded-full blur-[140px] opacity-25"
            style={{ background: 'radial-gradient(circle, #E50914 0%, #450A0A 60%, transparent 85%)' }}
          />
          <div 
            className="absolute top-1/3 -left-28 w-[450px] h-[320px] rounded-full blur-[130px] opacity-15"
            style={{ background: 'radial-gradient(circle, #991B1B 0%, transparent 70%)' }}
          />
          <div 
            className="absolute top-1/3 -right-28 w-[450px] h-[320px] rounded-full blur-[130px] opacity-15"
            style={{ background: 'radial-gradient(circle, #B91C1C 0%, transparent 70%)' }}
          />
        </div>

        {/* Subtle Sparkles / Particle Layer */}
        <SparkleParticles count={18} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          
          {/* Showroom Desk Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F070A] border border-red-600/40 backdrop-blur-md mb-4 sm:mb-6 shadow-md shadow-red-950/20">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2E3B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2E3B]"></span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#FF2E3B] font-heading">
              PATEL AUTOMOBILES • SHOWROOM CONTACT DESK
            </span>
          </div>

          {/* Main Heading: GET IN TOUCH */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            GET IN <span className="text-[#E50914]">TOUCH</span>
          </h1>

          {/* Coordinated Red Color Line */}
          <div className="flex items-center justify-center gap-1.5 my-4 sm:my-5">
            <span className="h-1 w-14 rounded-full bg-[#E50914]" />
            <span className="h-1 w-3 rounded-full bg-[#B91C1C]" />
            <span className="h-1 w-3 rounded-full bg-[#7F1D1D]" />
          </div>

          {/* Exact Subheading */}
          <p className="font-heading font-bold text-base sm:text-xl md:text-2xl text-neutral-200 max-w-3xl mx-auto leading-snug">
            "Have a question, want to enquire about a scooter, or plan a showroom visit? We're here to assist you."
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto mt-3 leading-relaxed">
            Authorized multi-brand electric scooter dealership in Lailunga, Raigarh, and Kharsia. Speak directly with our showroom team for transparent on-road pricing, RTO subsidy support, and verified manufacturer warranties.
          </p>

          {/* 3 Key Badges / Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0C0C11] border border-red-950/60 text-xs font-semibold text-neutral-200">
              <ShieldCheck className="w-4 h-4 text-[#FF2E3B]" />
              <span>Authorized Multi-Brand Showroom</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0C0C11] border border-red-950/60 text-xs font-semibold text-neutral-200">
              <Bike className="w-4 h-4 text-[#FF2E3B]" />
              <span>39+ Models Available</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0C0C11] border border-red-950/60 text-xs font-semibold text-neutral-200">
              <Clock className="w-4 h-4 text-[#FF2E3B]" />
              <span>Fast Response Guarantee</span>
            </div>
          </div>

          {/* Quick CTA Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#direct-showroom-inquiry"
              className="px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#B91C1C] text-white font-heading font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Direct Inquiry Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#connect-with-us"
              className="px-6 py-3 rounded-xl bg-black/50 hover:bg-[#1F070A] border border-red-950/60 hover:border-red-600/50 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF2E3B]" />
              <span>Showroom Contact Cards</span>
            </a>
          </div>

        </div>
      </section>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 space-y-16 sm:space-y-24">

        {/* ========================================================================= */}
        {/* 2. DIRECT SHOWROOM INQUIRY FORM */}
        {/* ========================================================================= */}
        <section id="direct-showroom-inquiry" className="scroll-mt-24">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#FF2E3B] block mb-1.5 font-heading">
              PERSONALIZED SHOWROOM ASSISTANCE
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              Direct Showroom Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
              Send us your enquiry and our team can help you with scooter details, availability, pricing, or a showroom visit.
            </p>
          </div>

          {/* Desktop Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Form Column (7 cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0C0C11] border border-red-950/50 shadow-2xl relative overflow-hidden">
                
                {/* Form Background Red Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E50914]/5 rounded-full blur-3xl pointer-events-none" />

                {submitted ? (
                  /* Success Confirmation View */
                  <div className="text-center py-8 sm:py-12 animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#1F070A] border border-red-600 flex items-center justify-center mx-auto mb-4 text-[#FF2E3B] shadow-lg shadow-red-600/20">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF2E3B] block mb-1 font-heading">
                      INQUIRY DISPATCHED
                    </span>
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase mb-2">
                      Thank You, {fullName}!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#C5CED6] max-w-md mx-auto leading-relaxed mb-6">
                      Your inquiry regarding <strong className="text-white">{inquiryType}</strong> for <strong className="text-white">{scooterModel}</strong> from <strong className="text-white">{cityLocation}</strong> has been forwarded to our showroom desk. We will connect with you via <strong className="text-[#FF2E3B]">{preferredContact}</strong> at <strong className="text-white">{mobileNumber}</strong> shortly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={handleFollowUpWhatsApp}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#E50914] hover:bg-[#B91C1C] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon className="w-4 h-4 fill-current" />
                        <span>Chat on WhatsApp Now</span>
                      </button>

                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFullName('');
                          setMobileNumber('');
                          setMessage('');
                        }}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                      >
                        <span>Submit Another Inquiry</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Inquiry Form */
                  <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                    
                    {/* Row 1: Full Name & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label 
                          htmlFor="inquiry-full-name"
                          className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5 font-heading"
                        >
                          Full Name <span className="text-[#FF2E3B]">*</span>
                        </label>
                        <input 
                          id="inquiry-full-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors({ ...errors, fullName: '' });
                          }}
                          placeholder="e.g. Ramesh Patel"
                          className={`w-full px-4 py-3 rounded-xl bg-[#060608] border text-sm text-white placeholder:text-neutral-500 transition-all focus:outline-none focus:ring-2 focus:ring-red-600/30 ${
                            errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-red-950/50 focus:border-red-600'
                          }`}
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                        />
                        {errors.fullName && (
                          <p id="error-full-name" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label 
                          htmlFor="inquiry-mobile-number"
                          className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5 font-heading"
                        >
                          Phone Number <span className="text-[#FF2E3B]">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-xs font-bold text-neutral-400 select-none">
                            +91
                          </span>
                          <input 
                            id="inquiry-mobile-number"
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                              setMobileNumber(val);
                              if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: '' });
                            }}
                            placeholder="96917 72124"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl bg-[#060608] border text-sm text-white placeholder:text-neutral-500 transition-all focus:outline-none focus:ring-2 focus:ring-red-600/30 ${
                              errors.mobileNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-red-950/50 focus:border-red-600'
                            }`}
                            aria-invalid={!!errors.mobileNumber}
                            aria-describedby={errors.mobileNumber ? 'error-mobile-number' : undefined}
                          />
                        </div>
                        {errors.mobileNumber ? (
                          <p id="error-mobile-number" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.mobileNumber}</span>
                          </p>
                        ) : (
                          <p className="text-[10px] text-neutral-400 mt-1">
                            10-digit mobile for callback and WhatsApp quotes.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: City / Location & Inquiry Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* City / Location */}
                      <div>
                        <label 
                          htmlFor="inquiry-city-location"
                          className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5 font-heading"
                        >
                          City / Location <span className="text-[#FF2E3B]">*</span>
                        </label>
                        <select
                          id="inquiry-city-location"
                          value={cityLocation}
                          onChange={(e) => setCityLocation(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#060608] border border-red-950/50 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                        >
                          <option value="Lailunga">Lailunga (Showroom Location)</option>
                          <option value="Raigarh">Raigarh District Hub</option>
                          <option value="Kharsia">Kharsia Region</option>
                          <option value="Gharghoda">Gharghoda</option>
                          <option value="Tamnar">Tamnar</option>
                          <option value="Dharamjaigarh">Dharamjaigarh</option>
                          <option value="Other Chhattisgarh / Nearby">Other Chhattisgarh Location</option>
                        </select>
                      </div>

                      {/* Inquiry Type */}
                      <div>
                        <label 
                          htmlFor="inquiry-type-select"
                          className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5 font-heading"
                        >
                          Inquiry Type
                        </label>
                        <select
                          id="inquiry-type-select"
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#060608] border border-red-950/50 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                        >
                          <option value="Price & Subsidy">On-Road Price & Government Subsidy</option>
                          <option value="Test Ride Booking">Showroom Test Ride Booking</option>
                          <option value="Commercial Loaders">Commercial Cargo Loader Inquiry (3XL / Logix)</option>
                          <option value="Battery & Warranty">Battery Specs & Warranty Support</option>
                          <option value="Financing & EMI">Financing & Flexible EMI Options</option>
                          <option value="General Inquiry">General Dealership Inquiry</option>
                        </select>
                      </div>
                    </div>

                    {/* Scooter Brand / Model Selection */}
                    <div>
                      <label 
                        htmlFor="inquiry-scooter-model"
                        className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5 font-heading"
                      >
                        Interested Brand / Model
                      </label>
                      <select
                        id="inquiry-scooter-model"
                        value={scooterModel}
                        onChange={(e) => setScooterModel(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#060608] border border-red-950/50 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                      >
                        <option value="General Inquiry / Need Advice">All Brands / Need Recommendation</option>
                        <option value="Commercial Cargo Loaders">Commercial Cargo Loaders (Zelio 3XL / Logix)</option>
                        
                        <optgroup label="Zelio Electric Models (17 Models)">
                          {zelioModels.map((p) => (
                            <option key={p.id} value={`Zelio - ${p.name}`}>
                              Zelio {p.name} {p.price ? `(${p.priceDisplay})` : ''}
                            </option>
                          ))}
                        </optgroup>

                        <optgroup label="Warivo Motor Models (7 Models)">
                          {warivoModels.map((p) => (
                            <option key={p.id} value={`Warivo - ${p.name}`}>
                              Warivo {p.name} {p.price ? `(${p.priceDisplay})` : ''}
                            </option>
                          ))}
                        </optgroup>

                        <optgroup label="Dynamo Electric Models (15 Models)">
                          {dynamoModels.map((p) => (
                            <option key={p.id} value={`Dynamo - ${p.name}`}>
                              Dynamo {p.name} {p.price ? `(${p.priceDisplay})` : ''}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-2 font-heading">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {/* Option 1: WhatsApp */}
                        <button
                          type="button"
                          onClick={() => setPreferredContact('WhatsApp')}
                          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            preferredContact === 'WhatsApp'
                              ? 'bg-[#1F070A] border-red-600 text-white shadow-sm shadow-red-600/20'
                              : 'bg-[#060608] border-red-950/50 text-neutral-400 hover:text-white hover:border-red-600/40'
                          }`}
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-[#FF2E3B]" />
                          <span>WhatsApp</span>
                        </button>

                        {/* Option 2: Phone Call */}
                        <button
                          type="button"
                          onClick={() => setPreferredContact('Phone Call')}
                          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            preferredContact === 'Phone Call'
                              ? 'bg-[#1F070A] border-red-600 text-[#FF2E3B] shadow-sm shadow-red-600/20'
                              : 'bg-[#060608] border-red-950/50 text-neutral-400 hover:text-white hover:border-red-600/40'
                          }`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Phone Call</span>
                        </button>

                        {/* Option 3: Instagram */}
                        <button
                          type="button"
                          onClick={() => setPreferredContact('Instagram')}
                          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            preferredContact === 'Instagram'
                              ? 'bg-[#1F070A] border-red-600 text-[#FF2E3B] shadow-sm shadow-red-600/20'
                              : 'bg-[#060608] border-red-950/50 text-neutral-400 hover:text-white hover:border-red-600/40'
                          }`}
                        >
                          <Instagram className="w-3.5 h-3.5" />
                          <span>Instagram</span>
                        </button>
                      </div>
                    </div>

                    {/* Message / Details */}
                    <div>
                      <label 
                        htmlFor="inquiry-message"
                        className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5 font-heading"
                      >
                        Message / Details <span className="text-[#FF2E3B]">*</span>
                      </label>
                      <textarea
                        id="inquiry-message"
                        rows={4}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors({ ...errors, message: '' });
                        }}
                        placeholder="Share questions regarding range, battery warranty, on-road pricing, or preferred showroom visit date..."
                        className={`w-full px-4 py-3 rounded-xl bg-[#060608] border text-sm text-white placeholder:text-neutral-500 transition-all focus:outline-none focus:ring-2 focus:ring-red-600/30 ${
                          errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-red-950/50 focus:border-red-600'
                        }`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'error-message' : undefined}
                      />
                      {errors.message && (
                        <p id="error-message" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        id="submit-inquiry-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-[#E50914] hover:bg-[#B91C1C] text-white font-heading font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Showroom Inquiry</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-center text-neutral-400 pt-1">
                      Direct response from Patel Automobiles Lailunga showroom team within business hours.
                    </p>

                  </form>
                )}

              </div>
            </div>

            {/* Desktop Visual Column (5 cols on desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              
              {/* Large EV Showroom Visual Card */}
              <div className="relative rounded-3xl overflow-hidden border border-[#2C0F12] bg-[#0D0D0D] h-[300px] sm:h-[360px] lg:h-auto min-h-[290px] shadow-xl group">
                <div className="w-full h-full min-h-[290px]">
                  <RedImagePlaceholder 
                    style="showroom" 
                    title="Patel Automobiles Showroom" 
                    subtitle="Lailunga • Raigarh • Kharsia" 
                    className="w-full h-full min-h-[290px]"
                  />
                </div>
                
                {/* Visual Overlay Details */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#181818] border border-[#8B1E1E]/60 text-[#F9040C] text-[10px] font-heading font-black uppercase tracking-wider mb-2 backdrop-blur-xs">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Authorized OEM Partner</span>
                  </div>
                  <h3 className="font-heading font-black text-lg sm:text-xl text-white uppercase leading-tight">
                    Visit Our Lailunga Showroom
                  </h3>
                  <p className="text-xs text-[#E8B7B7] mt-1 leading-relaxed">
                    Test ride 39 verified electric scooter models from Zelio, Warivo, and Dynamo with official manufacturer warranty.
                  </p>
                </div>
              </div>

              {/* Quick Showroom Highlights Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#0D0D0D] border border-[#2C0F12] space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#181818] border border-[#8B1E1E]/50 flex items-center justify-center text-[#F9040C] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-white uppercase">
                      Showroom Location & Coverage
                    </h4>
                    <p className="text-xs text-[#E8B7B7] mt-0.5">
                      Lailunga, Chhattisgarh. Serving Lailunga, Raigarh, and Kharsia riders with doorstep support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#2C0F12]">
                  <div className="w-8 h-8 rounded-xl bg-[#181818] border border-[#8B1E1E]/50 flex items-center justify-center text-[#F9040C] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-white uppercase">
                      Showroom Hours & Walk-ins
                    </h4>
                    <p className="text-xs text-[#E8B7B7] mt-0.5">
                      Walk-ins, test rides, and consultations welcome. Contact our showroom desk for current hours.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 3. QUICK CONTACT CARDS */}
        {/* ========================================================================= */}
        <section id="connect-with-us" className="scroll-mt-24">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#FF2E3B] block mb-1.5 font-heading">
              INSTANT CONTACT CHANNELS
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              Quick Contact Cards
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Direct access to our showroom location, phone desk, WhatsApp support, and operating hours.
            </p>
          </div>

          {/* Grid of 4 Required Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* CARD 1 — SHOWROOM ADDRESS */}
            <div
              id="quick-card-address"
              className="group p-6 rounded-3xl bg-[#0C0C11] border border-red-950/50 hover:border-red-600 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-red-600/15 relative overflow-hidden"
              aria-label="Patel Automobiles Showroom Location"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-[#E50914] transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1F070A] border border-red-600/30 flex items-center justify-center text-[#FF2E3B] group-hover:scale-110 group-hover:bg-[#E50914] group-hover:text-white transition-all duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF2E3B] px-2 py-0.5 rounded-md bg-[#1F070A] border border-red-950/60">
                    Location
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight group-hover:text-[#FF2E3B] transition-colors">
                  Showroom Address
                </h3>
                
                <p className="text-xs text-neutral-300 font-medium mt-1.5 leading-relaxed">
                  {siteConfig.address}
                </p>

                <div className="mt-3 py-2 px-3 rounded-xl bg-[#060608] border border-red-950/50 text-[11px] text-neutral-400">
                  <span className="block font-semibold text-white mb-0.5">Coverage:</span>
                  Lailunga • Raigarh • Kharsia Region
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-red-950/40 flex items-center justify-between text-xs font-bold text-[#FF2E3B] group-hover:text-white transition-colors">
                {PATEL_DIRECTIONS_URL ? (
                  <a
                    href={PATEL_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <span>View on Google Maps</span>
                    <Navigation className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <span className="text-neutral-400 text-[11px] font-medium">
                    (Official map link coming soon)
                  </span>
                )}
              </div>
            </div>

            {/* CARD 2 — PHONE / CALL DESK */}
            <a
              id="quick-card-phone"
              href={`tel:${siteConfig.phone}`}
              className="group p-6 rounded-3xl bg-[#0C0C11] border border-red-950/50 hover:border-red-600 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-red-600/15 cursor-pointer relative overflow-hidden"
              aria-label="Call Patel Automobiles primary inquiry phone"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-[#E50914] transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1F070A] border border-red-600/30 flex items-center justify-center text-[#FF2E3B] group-hover:scale-110 group-hover:bg-[#E50914] group-hover:text-white transition-all duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF2E3B] px-2 py-0.5 rounded-md bg-[#1F070A] border border-red-950/60">
                    Call Desk
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight group-hover:text-[#FF2E3B] transition-colors">
                  Phone / Call Desk
                </h3>
                
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Direct call line to our showroom manager for instant inquiry.
                </p>

                <div className="mt-3 py-2 px-3 rounded-xl bg-[#060608] border border-red-950/50 text-center">
                  <span className="font-heading font-black text-base text-[#FF2E3B] tracking-wider block">
                    {siteConfig.phoneDisplay}
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">
                    Available: Mon – Sat (9 AM – 8 PM)
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-red-950/40 flex items-center justify-between text-xs font-bold text-[#FF2E3B] group-hover:text-white transition-colors">
                <span>Click to Call</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* CARD 3 — WHATSAPP DESK */}
            <button
              id="quick-card-whatsapp"
              onClick={handleDirectWhatsApp}
              className="group p-6 rounded-3xl bg-[#0C0C11] border border-red-950/50 hover:border-red-600 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-red-600/15 text-left cursor-pointer relative overflow-hidden"
              aria-label="Start instant WhatsApp chat with Patel Automobiles"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-[#E50914] transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1F070A] border border-red-600/30 flex items-center justify-center text-[#FF2E3B] group-hover:scale-110 group-hover:bg-[#E50914] group-hover:text-white transition-all duration-300">
                    <WhatsAppIcon className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF2E3B] px-2 py-0.5 rounded-md bg-[#1F070A] border border-red-950/60">
                    Fast Assistance
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight group-hover:text-[#FF2E3B] transition-colors">
                  WhatsApp Desk
                </h3>
                
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Fast assistance line with direct chat for photos, price sheets, and catalogs.
                </p>

                <div className="mt-3 py-2 px-3 rounded-xl bg-[#060608] border border-red-950/50 text-center">
                  <span className="font-heading font-black text-base text-white tracking-wider block">
                    +91 {siteConfig.phone}
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">
                    Instant Quote & Model Brochures
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-red-950/40 flex items-center justify-between text-xs font-bold text-[#FF2E3B] group-hover:text-white transition-colors">
                <span>Start WhatsApp Chat</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* CARD 4 — SHOWROOM HOURS */}
            <div
              id="quick-card-hours"
              className="p-6 rounded-3xl bg-[#0C0C11] border border-red-950/50 transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden"
              aria-label="Patel Automobiles Showroom Hours"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-[#E50914]" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1F070A] border border-red-600/30 flex items-center justify-center text-[#FF2E3B]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF2E3B] px-2 py-0.5 rounded-md bg-[#1F070A] border border-red-950/60">
                    Open Weekly
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                  Showroom Timings
                </h3>
                
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Walk-ins, test rides, and consultations welcome across the week.
                </p>

                <div className="mt-3 py-2.5 px-3 rounded-xl bg-[#060608] border border-red-950/50 text-xs text-neutral-300">
                  <span className="block font-semibold text-white mb-0.5">Visits & Inquiries:</span>
                  Call or message our desk for today's operating timings.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-red-950/40 flex items-center justify-between text-xs text-neutral-300 font-semibold">
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <Bike className="w-3.5 h-3.5 text-[#FF2E3B]" />
                  <span>Test Rides Welcome</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FF2E3B]" />
              </div>
            </div>

          </div>

          {/* Social Profiles Row (Instagram Official Handle & YouTube Notice) */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#0C0C11] border border-red-950/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-neutral-300">
              <Instagram className="w-5 h-5 text-[#FF2E3B] shrink-0" />
              <span>
                Follow <strong className="text-white">@{siteConfig.socialLinks.instagram}</strong> on Instagram for customer deliveries and scooter reels.
              </span>
            </div>
            
            <a
              href="https://www.instagram.com/patel_automobile_lailunga/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#1F070A] hover:bg-red-950/60 border border-red-600/40 text-xs font-bold text-white transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Visit Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FF2E3B]" />
            </a>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 4. YOUTUBE / MEDIA SHOWROOM PLACEHOLDER SECTION */}
        {/* ========================================================================= */}
        <section id="youtube-placeholder-section" className="scroll-mt-24">
          <div className="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-br from-[#0C0C11] via-[#150406] to-[#0A0204] border border-red-950/50 shadow-2xl relative overflow-hidden">
            
            {/* Ambient Red Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#E50914]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F070A] border border-red-600/30 text-[#FF2E3B] text-[11px] font-bold uppercase tracking-wider font-heading">
                <Youtube className="w-4 h-4" />
                <span>EXPERIENCE PATEL AUTOMOBILES</span>
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                Showroom Walkthrough & EV Reviews
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                Take a closer look at our multi-brand electric scooter lineup. Watch vehicle walk-arounds, real-world range testing on Chhattisgarh terrain, and battery hygiene guides.
              </p>

              {/* Modern Video Player Card / Placeholder with Play Button Overlay */}
              <div className="mt-8 relative rounded-3xl overflow-hidden border border-[#2C0F12] bg-[#050505] aspect-video max-w-3xl mx-auto group shadow-2xl">
                <div className="w-full h-full">
                  <RedImagePlaceholder 
                    style="tech" 
                    title="Patel Automobiles Dealership Showcase" 
                    subtitle="Zelio • Warivo • Dynamo EV Fleet"
                    className="w-full h-full"
                  />
                </div>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-[#0D0D0D]/90 border border-[#8B1E1E]/60 text-[10px] font-heading font-black uppercase tracking-wider text-[#F9040C] backdrop-blur-md">
                    Official Walkthrough • Model Walkaround
                  </span>
                </div>

                {/* Play Button Overlay */}
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[#D71920] hover:bg-[#F9040C] text-white flex items-center justify-center shadow-2xl shadow-[#D71920]/50 group-hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="Play Showroom Walkaround Video"
                >
                  <Play className="w-7 sm:w-8 h-7 sm:h-8 fill-current ml-1" />
                </button>

                {/* Bottom Video Details */}
                <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 text-left flex flex-col sm:flex-row sm:items-end justify-between gap-2 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent p-4 rounded-b-3xl">
                  <div>
                    <h3 className="font-heading font-black text-base sm:text-xl text-white uppercase">
                      Patel Automobiles Dealership Showcase
                    </h3>
                    <p className="text-xs text-[#E8B7B7] mt-0.5">
                      Zelio, Warivo & Dynamo EV fleet overview in Lailunga showroom
                    </p>
                  </div>

                  <span className="text-[11px] font-heading font-black text-[#F9040C] px-3 py-1 rounded-lg bg-[#181818] border border-[#8B1E1E]/60 self-start sm:self-auto">
                    YouTube Channel Launching Soon
                  </span>
                </div>
              </div>

              {/* Grid of Planned Video Series */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
                
                <div className="p-4 rounded-2xl bg-[#060608] border border-red-950/50">
                  <div className="w-8 h-8 rounded-lg bg-[#1F070A] text-[#FF2E3B] flex items-center justify-center font-black text-xs mb-2">
                    01
                  </div>
                  <h4 className="font-heading font-bold text-xs text-white uppercase">
                    4K Model Walkthroughs
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                    Detailed close-ups on chassis strength, digital clusters, boot storage, and disc brakes across 39 models.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#060608] border border-red-950/50">
                  <div className="w-8 h-8 rounded-lg bg-[#1F070A] text-[#FF2E3B] flex items-center justify-center font-black text-xs mb-2">
                    02
                  </div>
                  <h4 className="font-heading font-bold text-xs text-white uppercase">
                    Real-World Range Tests
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                    Unbiased road testing comparing Lead Acid vs. Lithium-ion batteries across Lailunga, Raigarh, and Kharsia roads.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#060608] border border-red-950/50">
                  <div className="w-8 h-8 rounded-lg bg-[#1F070A] text-[#FF2E3B] flex items-center justify-center font-black text-xs mb-2">
                    03
                  </div>
                  <h4 className="font-heading font-bold text-xs text-white uppercase">
                    EV Battery Care Guide
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                    Practical tips from Pradeep Patel on prolonging battery life, home charging safety, and seasonal maintenance.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Video Preview Modal (When play button clicked) */}
        {videoModalOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setVideoModalOpen(false)}
          >
            <div 
              className="max-w-2xl w-full bg-[#0C0C11] border border-red-950/80 rounded-3xl p-6 sm:p-8 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 cursor-pointer"
                aria-label="Close video modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-[#1F070A] border border-red-600/40 flex items-center justify-center text-[#FF2E3B] mb-4">
                <Youtube className="w-7 h-7" />
              </div>

              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF2E3B] block mb-1">
                YOUTUBE CHANNEL • COMING SOON
              </span>

              <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase mb-2">
                Experience Patel Automobiles on Video
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                Our high-definition video walkthroughs, scooter feature spotlights, and customer delivery reels are in production. The official YouTube channel link will be published here soon. In the meantime, connect with us on WhatsApp or Instagram for instant walkaround videos!
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    setVideoModalOpen(false);
                    handleDirectWhatsApp();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>Request Video on WhatsApp</span>
                </button>

                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. FINAL CTA SECTION */}
        {/* ========================================================================= */}
        <section 
          id="contact-final-cta"
          className="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-r from-[#0C0C11] via-[#1A0508] to-[#0C0C11] border border-red-600/40 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Subtle Red Accent Glows */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#FF2E3B] block font-heading">
              YOUR ELECTRIC JOURNEY STARTS HERE
            </span>

            <h2 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
              Ready to Ride the Electric Revolution?
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
              Book a zero-commitment showroom test ride or visit Patel Automobiles in Lailunga to experience Chhattisgarh's widest electric scooter collection.
            </p>

            {/* High-Contrast Red CTA Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                id="contact-cta-book-test-ride"
                onClick={() => onNavigate('test-ride')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#E50914] hover:bg-[#B91C1C] text-white font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-lg shadow-red-600/25 flex items-center justify-center gap-2"
              >
                <Bike className="w-4 h-4" />
                <span>Book Free Test Ride</span>
              </button>

              <a
                id="contact-cta-call-showroom"
                href={`tel:${siteConfig.phone}`}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-black/50 hover:bg-[#1F070A] border border-red-950/60 hover:border-red-600/50 text-white font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#FF2E3B]" />
                <span>Call Showroom</span>
              </a>

              <button
                id="contact-cta-explore-scooters"
                onClick={() => onNavigate('scooters')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-black/50 hover:bg-[#1F070A] border border-red-950/60 hover:border-red-600/50 text-white font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Explore 39 Scooters</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Showroom Direct Links */}
            <div className="pt-6 border-t border-red-950/40 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-neutral-300">
              <a 
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-1.5 hover:text-[#FF2E3B] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF2E3B]" />
                <span>Call: {siteConfig.phoneDisplay}</span>
              </a>

              <button
                onClick={handleDirectWhatsApp}
                className="flex items-center gap-1.5 hover:text-[#FF2E3B] transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#FF2E3B]" />
                <span>WhatsApp Showroom Desk</span>
              </button>

              <div className="flex items-center gap-1.5 text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-[#FF2E3B]" />
                <span>Showroom Hub: Lailunga • Raigarh • Kharsia</span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
