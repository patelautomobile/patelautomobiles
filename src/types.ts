export type BrandName = 'Zelio' | 'Warivo' | 'Dynamo';

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: BrandName;
  price: number | null;
  priceDisplay: string;
  images: {
    frontThreeQuarter: string;
    side: string;
    rearThreeQuarter: string;
    rear: string;
  };
  battery: string | null;
  batteryType?: 'Lithium-ion' | 'Lead Acid / Gel' | 'Not specified' | null;
  motor: string | null;
  range: string | null;
  rangeKm?: number | null;
  topSpeed: string | null;
  chargingTime: string | null;
  warranty: string | null;
  wheelSize: string | null;
  brakes: string | null;
  suspension: string | null;
  colors: string[];
  features: string[];
  description: string;
  availability: 'In Stock' | 'Available on Order' | 'Coming Soon';
  isLoader?: boolean;
  source: string;
  sourceNotes: string | null;
}

export interface SiteConfig {
  businessName: string;
  tagline: string;
  founder: string;
  websiteUrl: string;
  description: string;
  serviceLocations: string[];
  phone: string | null;
  phoneDisplay: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string;
  openingHours: string | null;
  googleMapsUrl: string | null;
  socialLinks: {
    instagram: string | null;
    youtube: string | null;
    facebook: string | null;
  };
  logo?: string;
  creatorName: string;
  creatorUrl: string;
}

export type PageView = 
  | 'home' 
  | 'scooters' 
  | 'scooter-detail' 
  | 'about' 
  | 'stories' 
  | 'photos'
  | 'test-ride' 
  | 'contact' 
  | 'privacy-policy' 
  | '404';

export interface FilterState {
  searchQuery: string;
  brand: string;
  priceRange: string;
  rangeMin: number;
  batteryType: string;
  motor: string;
  topSpeed: string;
  availability: string;
  wheelSize?: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'range-desc';
}
