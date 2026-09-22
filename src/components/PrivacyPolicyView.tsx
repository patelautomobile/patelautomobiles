import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { PageView } from '../types';
import { siteConfig } from '../config/site';

interface PrivacyPolicyViewProps {
  onBack: () => void;
}

export function PrivacyPolicyView({ onBack }: PrivacyPolicyViewProps) {
  return (
    <div className="w-full bg-[#060608] min-h-screen text-white pb-24 md:pb-16">
      <div className="border-b border-red-950/40 py-10 sm:py-14 bg-[#0C0C11]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-[#FF2E3B] mb-4 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#FF2E3B] block mb-1">
            LEGAL & DATA PROTECTION
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            PRIVACY POLICY
          </h1>
          <p className="text-xs text-neutral-400 mt-2">
            Effective Date: {new Date().getFullYear()} • Patel Automobiles Dealership
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-6 text-xs sm:text-sm text-[#C5CED6] leading-relaxed">
        <section className="p-6 rounded-2xl bg-[#0C0C11] border border-red-950/50 space-y-3">
          <h2 className="font-heading font-bold text-base uppercase text-[#FF2E3B]">
            1. Overview & Commitment
          </h2>
          <p>
            Patel Automobiles ("we," "our," or "us"), founded by Pradeep Patel, is committed to safeguarding the privacy and personal information of our website visitors, vehicle buyers, and test ride applicants across Lailunga, Raigarh, and Kharsia.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#0C0C11] border border-red-950/50 space-y-3">
          <h2 className="font-heading font-bold text-base uppercase text-[#FF2E3B]">
            2. Information We Collect
          </h2>
          <p>
            We collect personal information solely when you voluntarily submit it to our dealership through our forms:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-400">
            <li><strong className="text-white">Test Ride Bookings:</strong> Your full name, telephone number, selected electric scooter model, preferred date, and scheduling notes.</li>
            <li><strong className="text-white">Dealership Enquiries:</strong> Your name, contact details (phone/email), and specific inquiries regarding models, subsidy, or financing.</li>
            <li><strong className="text-white">Direct WhatsApp Interactions:</strong> Inquiries initiated through our WhatsApp assistance desk.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[#0C0C11] border border-red-950/50 space-y-3">
          <h2 className="font-heading font-bold text-base uppercase text-[#FF2E3B]">
            3. Purpose of Data Usage
          </h2>
          <p>
            Your information is used strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-400">
            <li>Confirm and schedule authorized test rides at our showroom locations.</li>
            <li>Provide accurate on-road pricing estimates, battery warranty clarification, and financing assistance.</li>
            <li>Respond to customer service requests and provide post-purchase maintenance communication.</li>
          </ul>
          <p className="text-xs text-white">
            We do not sell, lease, or rent your personal contact information to third-party marketing companies.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#0C0C11] border border-red-950/50 space-y-3">
          <h2 className="font-heading font-bold text-base uppercase text-[#FF2E3B]">
            4. Cookies & Client-Side Storage
          </h2>
          <p>
            Our website uses lightweight browser session storage (`sessionStorage`) solely to manage interface states, such as remembering when an introductory video has already been viewed or retaining search filter preferences during your visit. We do not employ tracking cookies without your consent.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#0C0C11] border border-red-950/50 space-y-3">
          <h2 className="font-heading font-bold text-base uppercase text-[#FF2E3B]">
            5. Third-Party Hosting & Integration
          </h2>
          <p>
            This website is hosted via Firebase Hosting infrastructure. Standard, non-identifying server request logs (such as IP addresses and browser user-agent headers) may be logged by hosting infrastructure strictly for operational reliability, security auditing, and DDoS prevention.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#0C0C11] border border-red-950/50 space-y-3">
          <h2 className="font-heading font-bold text-base uppercase text-[#FF2E3B]">
            6. Data Retention & User Rights
          </h2>
          <p>
            Inquiry and test ride details are retained only for the duration necessary to satisfy your vehicle request and fulfill legal documentation requirements. You have the right to request review or deletion of your contact records by visiting the Patel Automobiles showroom or submitting an inquiry note.
          </p>
        </section>

        <div className="text-center pt-4">
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
