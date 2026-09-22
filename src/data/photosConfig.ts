import { getSlotImage } from '../lib/imageSlots';

export interface ShowroomPhoto {
  id: string;
  slot: string; // Slot folder inside src/assets/site-images/photos/
  title: string;
  category: 'Showroom' | 'Scooters' | 'Deliveries' | 'Events' | 'Team';
  location?: string;
  date?: string;
  description?: string;
  featured?: boolean;
}

/**
 * Central Photo Configuration for Patel Automobiles.
 *
 * Folder-based slot architecture:
 * To add a photo, simply place your photo inside:
 *   src/assets/site-images/photos/{category}/{slot}/
 *
 * The uploaded file can have ANY filename (.webp, .jpg, .jpeg, .png, .avif).
 * Vite will automatically discover it at build time.
 */
export const WEBSITE_PHOTOS: ShowroomPhoto[] = [
  {
    id: 'photo-showroom-main',
    slot: 'photos/home/home-showroom',
    title: 'Lailunga Main EV Showroom Arena',
    category: 'Showroom',
    location: 'Main Road Lailunga, Raigarh',
    date: '2026',
    description: 'Main display floor featuring authorized multi-brand electric scooters from Zelio, Warivo, and Dynamo.',
    featured: true,
  },
  {
    id: 'photo-home-scooter-01',
    slot: 'photos/home/home-scooter-01',
    title: 'Sport & Performance EV Showcase',
    category: 'Scooters',
    location: 'Lailunga Showroom',
    date: '2026',
    description: 'Power, Style, and Performance electric scooters engineered for Chhattisgarh terrain.',
    featured: true,
  },
  {
    id: 'photo-home-scooter-02',
    slot: 'photos/home/home-scooter-02',
    title: 'Smart Commuter EV Series',
    category: 'Scooters',
    location: 'Lailunga Showroom',
    date: '2026',
    description: 'Simple, Stylish, and Smart daily commuters with low running costs.',
    featured: false,
  },
  {
    id: 'photo-home-feature',
    slot: 'photos/home/home-feature',
    title: 'Flagship Showcase Banner',
    category: 'Showroom',
    location: 'Lailunga Showroom',
    date: '2026',
    description: 'Flagship electric scooter feature banner.',
    featured: false,
  },
  {
    id: 'photo-about-founder',
    slot: 'photos/about/founder-pradeep-patel',
    title: 'Founder — Pradeep Patel',
    category: 'Team',
    location: 'Patel Automobiles, Lailunga',
    date: '2026',
    description: 'Founder driving the mission to provide accessible, genuine electric mobility.',
    featured: true,
  },
  {
    id: 'photo-about-showroom',
    slot: 'photos/about/showroom',
    title: 'Lailunga EV Center & Facility',
    category: 'Showroom',
    location: 'Main Road Lailunga',
    date: '2026',
    description: 'Modern dealership facility welcoming customer test rides and service visits.',
    featured: false,
  },
  {
    id: 'photo-about-dealership',
    slot: 'photos/about/dealership',
    title: 'Authorized Multi-Brand Dealership',
    category: 'Showroom',
    location: 'Lailunga • Raigarh • Kharsia',
    date: '2026',
    description: 'Direct partnerships with leading Indian electric scooter manufacturers.',
    featured: false,
  },
  {
    id: 'photo-about-team',
    slot: 'photos/about/team',
    title: 'Certified Technical & Service Team',
    category: 'Team',
    location: 'Lailunga Workshop',
    date: '2026',
    description: 'Trained technical crew offering genuine battery diagnostics and routine maintenance.',
    featured: false,
  },
  {
    id: 'photo-story-01',
    slot: 'photos/stories/story-01',
    title: 'Customer Delivery Ceremony 01',
    category: 'Deliveries',
    location: 'Lailunga Showroom',
    date: '2026',
    description: 'New scooter handover and key presentation with verified customer warranty registration.',
    featured: true,
  },
  {
    id: 'photo-story-02',
    slot: 'photos/stories/story-02',
    title: 'Customer Delivery Ceremony 02',
    category: 'Deliveries',
    location: 'Lailunga Showroom',
    date: '2026',
    description: 'Customer celebratory delivery moments at Patel Automobiles.',
    featured: false,
  },
  {
    id: 'photo-story-03',
    slot: 'photos/stories/story-03',
    title: 'Customer Delivery Ceremony 03',
    category: 'Deliveries',
    location: 'Lailunga Showroom',
    date: '2026',
    description: 'Delivering green mobility to local riders and commuters.',
    featured: false,
  },
  {
    id: 'photo-story-04',
    slot: 'photos/stories/story-04',
    title: 'Customer Delivery Ceremony 04',
    category: 'Deliveries',
    location: 'Lailunga Showroom',
    date: '2026',
    description: 'Celebrating eco-friendly electric rides in Chhattisgarh.',
    featured: false,
  },
  {
    id: 'photo-story-05',
    slot: 'photos/stories/story-05',
    title: 'Customer Delivery Ceremony 05',
    category: 'Deliveries',
    location: 'Lailunga Showroom',
    date: '2026',
    description: 'Satisfied owners joining the Patel Automobiles EV family.',
    featured: false,
  },
  {
    id: 'photo-brand-zelio',
    slot: 'photos/brands/zelio',
    title: 'Zelio Motors EV Showcase',
    category: 'Scooters',
    location: 'Showroom Arena',
    date: '2026',
    description: '17 Zelio models on active display for direct comparison.',
    featured: false,
  },
  {
    id: 'photo-brand-warivo',
    slot: 'photos/brands/warivo',
    title: 'Warivo Motor Endurance Lineup',
    category: 'Scooters',
    location: 'Showroom Arena',
    date: '2026',
    description: '7 Warivo endurance models built for heavy-duty regional highways.',
    featured: false,
  },
  {
    id: 'photo-brand-dynamo',
    slot: 'photos/brands/dynamo',
    title: 'Dynamo EV & Cargo Loader Lineup',
    category: 'Scooters',
    location: 'Showroom Arena',
    date: '2026',
    description: '15 Dynamo models including daily commuters and commercial cargo loaders.',
    featured: false,
  },
  {
    id: 'photo-contact-showroom',
    slot: 'photos/contact/showroom-contact',
    title: 'Showroom Facade & Entrance',
    category: 'Showroom',
    location: 'Main Road Lailunga',
    date: '2026',
    description: 'Prominent main road frontage with convenient test ride track.',
    featured: true,
  },
];

/**
 * Resolves the URL of an image slot.
 * Returns null if the slot folder has no image yet.
 */
export function getPhotoUrl(slotPath: string): string | null {
  return getSlotImage(slotPath);
}
