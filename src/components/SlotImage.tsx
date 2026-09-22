import React, { useState } from 'react';
import { getSlotImage } from '../lib/imageSlots';
import { RedImagePlaceholder, PlaceholderStyle } from './RedImagePlaceholder';

interface SlotImageProps {
  id?: string;
  slot: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  placeholderStyle?: PlaceholderStyle;
  placeholderTitle?: string;
  placeholderSubtitle?: string;
  placeholderBadge?: string;
  objectFit?: 'cover' | 'contain';
}

export const SlotImage: React.FC<SlotImageProps> = ({
  id,
  slot,
  alt,
  className = 'w-full h-full',
  imageClassName = 'w-full h-full object-cover',
  placeholderStyle = 'showroom',
  placeholderTitle,
  placeholderSubtitle,
  placeholderBadge,
}) => {
  const [loadError, setLoadError] = useState(false);
  const imageUrl = getSlotImage(slot);

  if (!imageUrl || loadError) {
    return (
      <div id={id} className={className}>
        <RedImagePlaceholder
          styleType={placeholderStyle}
          title={placeholderTitle || alt.toUpperCase()}
          subtitle={placeholderSubtitle || 'PHOTO SLOT READY'}
          badge={placeholderBadge}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div id={id} className={`relative overflow-hidden ${className}`}>
      <img
        src={imageUrl}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setLoadError(true)}
        className={imageClassName}
      />
    </div>
  );
};
