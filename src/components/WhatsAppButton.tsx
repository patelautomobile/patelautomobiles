import React from 'react';
import { siteConfig } from '../config/site';

export function WhatsAppButton() {
  const whatsappNumber = siteConfig.whatsapp || '919691772124';
  const message = 'Hello Patel Automobiles, I would like to inquire about electric scooter models.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside 
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 flex items-center"
    >
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly on WhatsApp with Patel Automobiles (+91 9691772124)"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-[#25D366]/35 hover:shadow-[#25D366]/60 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {/* Official WhatsApp Logo Vector */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.09 19.11L7.79 18.94L4.66 19.76L5.5 16.71L5.31 16.41C4.55 15.2 4.14 13.58 4.14 11.92C4.14 7.38 7.84 3.67 12.04 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.69C7.02 10.9 7.9 12.06 8.03 12.23C8.15 12.4 9.74 14.86 12.18 15.91C12.76 16.16 13.21 16.31 13.57 16.42C14.15 16.61 14.68 16.58 15.1 16.52C15.57 16.45 16.55 15.93 16.75 15.35C16.96 14.77 16.96 14.28 16.9 14.18C16.83 14.07 16.67 14.01 16.42 13.88C16.18 13.76 14.98 13.17 14.75 13.09C14.53 13.01 14.36 12.97 14.2 13.21C14.03 13.46 13.56 14.01 13.41 14.18C13.27 14.34 13.12 14.36 12.88 14.24C12.63 14.11 11.83 13.85 10.88 13C10.14 12.34 9.64 11.53 9.5 11.28C9.35 11.03 9.48 10.9 9.61 10.77C9.72 10.66 9.85 10.49 9.98 10.34C10.1 10.2 10.15 10.09 10.23 9.93C10.31 9.76 10.27 9.62 10.21 9.5C10.15 9.37 9.66 8.16 9.45 7.67C9.25 7.19 9.05 7.25 8.9 7.25C8.75 7.24 8.58 7.24 8.41 7.24L8.53 7.33Z" />
        </svg>
        
        {/* Tooltip on desktop */}
        <span className="hidden md:group-hover:block absolute right-16 bg-[#0D0D0D] text-white text-xs font-heading font-bold px-3 py-1.5 rounded-lg whitespace-nowrap border border-[#2C0F12] shadow-xl">
          Chat on WhatsApp: +91 96917 72124
        </span>
      </a>
    </aside>
  );
}
