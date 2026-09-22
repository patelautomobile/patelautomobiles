import { useState, useRef, TouchEvent, KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, Eye, Bike } from 'lucide-react';
import { Product } from '../types';
import { RedImagePlaceholder } from './RedImagePlaceholder';

interface ProductGalleryProps {
  images: Product['images'];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const angles: { key: keyof Product['images']; label: string }[] = [
    { key: 'frontThreeQuarter', label: 'Front 3/4' },
    { key: 'side', label: 'Side Profile' },
    { key: 'rearThreeQuarter', label: 'Rear 3/4' },
    { key: 'rear', label: 'Rear View' },
  ];

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      // swipe left -> next
      setActiveAngleIndex((prev) => (prev + 1) % angles.length);
    } else if (diff < -50) {
      // swipe right -> prev
      setActiveAngleIndex((prev) => (prev - 1 + angles.length) % angles.length);
    }
    touchStartX.current = null;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setActiveAngleIndex((prev) => (prev + 1) % angles.length);
    } else if (e.key === 'ArrowLeft') {
      setActiveAngleIndex((prev) => (prev - 1 + angles.length) % angles.length);
    }
  };

  const currentKey = angles[activeAngleIndex].key;
  const currentImage = images[currentKey];
  const isCurrentFailed = !currentImage || failedImages[currentKey];

  return (
    <div 
      className="w-full flex flex-col gap-3"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Product image gallery"
    >
      {/* Main Showcase Image */}
      <div 
        className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#0C0C11] border border-red-950/40 shadow-xl group select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {!isCurrentFailed ? (
          <img
            src={currentImage}
            alt={`${productName} - ${angles[activeAngleIndex].label}`}
            referrerPolicy="no-referrer"
            onError={() => setFailedImages((prev) => ({ ...prev, [currentKey]: true }))}
            className="w-full h-full object-contain object-center transition-all duration-300 p-2"
          />
        ) : (
          <RedImagePlaceholder
            styleType="silhouette"
            title={productName}
            subtitle={`${angles[activeAngleIndex].label} Slot Ready`}
            badge="SCOOTER ANGLE SLOT"
            className="w-full h-full"
          />
        )}

        {/* Ambient Dark Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#060608] to-transparent pointer-events-none" />

        {/* Angle Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#060608]/90 backdrop-blur-xs border border-red-950/60 text-[10px] sm:text-xs font-bold text-[#FF2E3B] uppercase tracking-wider flex items-center gap-1.5">
          <Eye className="w-3 h-3 text-[#FF2E3B]" />
          <span>{angles[activeAngleIndex].label}</span>
        </div>

        {/* Mobile Swipe Navigation Arrows */}
        <button
          onClick={() => setActiveAngleIndex((prev) => (prev - 1 + angles.length) % angles.length)}
          aria-label="Previous image angle"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#060608]/80 border border-red-950/60 text-white hover:text-[#FF2E3B] flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveAngleIndex((prev) => (prev + 1) % angles.length)}
          aria-label="Next image angle"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#060608]/80 border border-red-950/60 text-white hover:text-[#FF2E3B] flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Thumbnails (Front 3/4, Side, Rear 3/4, Rear) */}
      <div className="grid grid-cols-4 gap-2">
        {angles.map((ang, idx) => {
          const isActive = idx === activeAngleIndex;
          const imgUrl = images[ang.key];
          const hasImage = Boolean(imgUrl) && !failedImages[ang.key];

          return (
            <button
              key={ang.key}
              onClick={() => setActiveAngleIndex(idx)}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all cursor-pointer bg-[#0A0A0C] ${
                isActive
                  ? 'border-[#E50914] ring-2 ring-red-600/30 shadow-md'
                  : 'border-red-950/40 opacity-70 hover:opacity-100'
              }`}
            >
              {hasImage ? (
                <img
                  src={imgUrl}
                  alt={`${productName} thumbnail ${ang.label}`}
                  referrerPolicy="no-referrer"
                  onError={() => setFailedImages((prev) => ({ ...prev, [ang.key]: true }))}
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#140809] to-[#080808] text-[#8B1E1E]">
                  <Bike className="w-4 h-4 text-[#F9040C]" />
                </div>
              )}
              <span className="absolute bottom-0 inset-x-0 bg-[#060608]/90 text-[9px] py-0.5 text-center font-bold text-[#C5CED6] truncate">
                {ang.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="text-center text-[10px] text-[#94A3B8] md:hidden">
        Swipe left or right to view all 4 angles
      </div>
    </div>
  );
}
