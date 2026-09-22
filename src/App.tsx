import { useState, useEffect, useMemo } from 'react';
import { PageView, Product, FilterState, BrandName } from './types';
import { products } from './data/products';
import { siteConfig } from './config/site';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { WhatsAppButton } from './components/WhatsAppButton';
import { SEO } from './components/SEO';
import { Hero } from './components/Hero';
import { ScooterCarousel } from './components/ScooterCarousel';
import { BrandSection } from './components/BrandSection';
import { ProductFilters } from './components/ProductFilters';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailView } from './components/ProductDetailView';
import { WhyPatel } from './components/WhyPatel';
import { Stats } from './components/Stats';
import { FounderSection } from './components/FounderSection';
import { StoriesSection } from './components/StoriesSection';
import { TestRideCTA } from './components/TestRideCTA';
import { TestRideForm } from './components/TestRideForm';
import { ContactView } from './components/ContactView';
import { ContactSection } from './components/ContactSection';
import { VisitPatel } from './components/VisitPatel';
import { ServiceLocations } from './components/ServiceLocations';
import { DynamicHomeBackground } from './components/DynamicHomeBackground';
import { FinalCTA } from './components/FinalCTA';
import { AboutView } from './components/AboutView';
import { ScootersHero } from './components/ScootersHero';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { NotFoundView } from './components/NotFoundView';
import { IntroVideo } from './components/IntroVideo';
import { PhotosPage } from './components/PhotosPage';
import { filterAndSortProducts, initialFilters } from './utils/filterUtils';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [testRideScooter, setTestRideScooter] = useState<string>('');
  const [showIntro, setShowIntro] = useState(false);

  // Sync hash routing for deep links (e.g. #/scooters, #/scooter/eeva-eco, #/about, etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === 'home') {
        setCurrentPage('home');
        setSelectedProduct(null);
      } else if (hash.startsWith('scooter/')) {
        const slug = hash.replace('scooter/', '');
        const found = products.find((p) => p.slug === slug);
        if (found) {
          setSelectedProduct(found);
          setCurrentPage('scooters');
        }
      } else if (hash === 'scooters') {
        setCurrentPage('scooters');
        setSelectedProduct(null);
      } else if (hash === 'about') {
        setCurrentPage('about');
        setSelectedProduct(null);
      } else if (hash === 'stories') {
        setCurrentPage('stories');
        setSelectedProduct(null);
      } else if (hash === 'photos') {
        setCurrentPage('photos');
        setSelectedProduct(null);
      } else if (hash === 'test-ride') {
        setCurrentPage('test-ride');
        setSelectedProduct(null);
      } else if (hash === 'contact') {
        setCurrentPage('contact');
        setSelectedProduct(null);
      } else if (hash === 'privacy-policy') {
        setCurrentPage('privacy-policy');
        setSelectedProduct(null);
      } else {
        setCurrentPage('404');
      }
    };

    handleHashChange();
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  const navigateTo = (page: PageView, productTarget?: Product) => {
    if (productTarget) {
      setSelectedProduct(productTarget);
      setCurrentPage('scooters');
      window.location.hash = `#/scooter/${productTarget.slug}`;
    } else {
      setSelectedProduct(null);
      setCurrentPage(page);
      window.location.hash = `#/${page}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBrandFromSection = (brandName: BrandName) => {
    setFilters({
      ...initialFilters,
      brand: brandName,
    });
    setSelectedProduct(null);
    setCurrentPage('scooters');
    window.location.hash = '#/scooters';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookTestRide = (scooterName?: string) => {
    if (scooterName) {
      setTestRideScooter(scooterName);
    }
    navigateTo('test-ride');
  };

  // Filtered & Sorted Products directly using dynamic filter system
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, filters);
  }, [filters]);

  // Dynamic SEO calculation
  const seoDetails = useMemo(() => {
    if (selectedProduct) {
      return {
        title: `${selectedProduct.brand} ${selectedProduct.name} Price, Range & Specs | Patel Automobiles`,
        description: `Explore the ${selectedProduct.brand} ${selectedProduct.name} electric scooter at Patel Automobiles Lailunga. Price: ${selectedProduct.priceDisplay}, Range: ${selectedProduct.range || 'Authorized'}. Book a test ride today.`,
        product: selectedProduct,
      };
    }

    switch (currentPage) {
      case 'scooters':
        return {
          title: '39+ Electric Scooters Catalogue | Zelio, Warivo, Dynamo | Patel Automobiles',
          description: 'Browse all 39 electric scooters from Zelio, Warivo, and Dynamo at Patel Automobiles. Compare verified prices, ranges, batteries, and book test rides.',
        };
      case 'about':
        return {
          title: 'About Patel Automobiles | Founder Pradeep Patel | Lailunga, Raigarh & Kharsia',
          description: 'Learn about Patel Automobiles, authorized electric two-wheeler dealership founded by Pradeep Patel serving Lailunga, Raigarh, and Kharsia.',
        };
      case 'stories':
        return {
          title: 'Customer Stories & Community | Patel Automobiles EV Experience',
          description: 'Read owner feedback and community experiences from electric scooter riders across northern Chhattisgarh at Patel Automobiles.',
        };
      case 'test-ride':
        return {
          title: 'Book a Test Ride | Patel Automobiles Lailunga & Raigarh',
          description: 'Schedule a hands-on showroom test ride for Zelio, Warivo, or Dynamo electric scooters at Patel Automobiles Lailunga showroom.',
        };
      case 'contact':
        return {
          title: 'Contact Patel Automobiles | Showroom Locations & Enquiries',
          description: 'Visit our electric scooter showroom in Lailunga, Chhattisgarh. Get directions, timing, phone numbers, and submit inquiries for all 39 models.',
        };
      case 'privacy-policy':
        return {
          title: 'Privacy Policy | Patel Automobiles Dealership',
          description: 'Privacy and data protection policy for visitors, test ride bookings, and vehicle inquiries at Patel Automobiles.',
        };
      case '404':
        return {
          title: '404 - Page Not Found | Patel Automobiles',
          description: 'The requested page or electric scooter catalogue link could not be located.',
        };
      default:
        return {
          title: 'Patel Automobiles — Electric Scooters in Lailunga & Raigarh | Zelio, Warivo, Dynamo',
          description: siteConfig.description,
        };
    }
  }, [currentPage, selectedProduct]);

  return (
    <div className="min-h-screen bg-[#050507] text-[#D1D5DB] flex flex-col font-sans selection:bg-[#E50914] selection:text-white">
      {/* Dynamic SEO & JSON-LD Structured Data */}
      <SEO 
        title={seoDetails.title} 
        description={seoDetails.description} 
        product={seoDetails.product} 
      />

      {/* Cinematic Intro Video (If triggered/supported) */}
      {showIntro && <IntroVideo onDismiss={() => setShowIntro(false)} />}

      {/* Top Header */}
      <Header 
        currentPage={currentPage} 
        onNavigate={(p) => navigateTo(p)} 
      />

      {/* Main Content Area */}
      <main className="flex-grow w-full">
        {/* VIEW: Product Detail */}
        {selectedProduct ? (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => {
              setSelectedProduct(null);
              window.location.hash = '#/scooters';
            }}
            onSelectProduct={(p) => navigateTo('scooters', p)}
            onBookTestRide={handleBookTestRide}
            onNavigate={(p) => navigateTo(p)}
          />
        ) : currentPage === 'home' ? (
          /* VIEW: Homepage (Exact Hierarchy: Header -> Hero (Self-contained scroll animation) -> Our Scooters -> Explore Brands -> Why Choose Patel -> Service Locations -> Final CTA -> Footer) */
          <>
            {/* 1. CINEMATIC SCROLL HERO (Contained strictly within the Hero section; finishes completely at Frame 200 before Our Scooters) */}
            <Hero
              onExplore={() => navigateTo('scooters')}
              onBookTestRide={() => navigateTo('test-ride')}
            />

            {/* 2. MAIN WEBSITE CONTENT: Begins immediately after Hero with completely normal website scrolling */}
            <div id="homepage-main-content" className="w-full bg-[#050505] relative z-20">
              <DynamicHomeBackground>
                {/* OUR SCOOTERS - Choose Your Perfect Ride (Horizontal Compact Carousel) */}
                <ScooterCarousel
                  products={products}
                  onViewDetails={(p) => navigateTo('scooters', p)}
                  onViewAll={() => navigateTo('scooters')}
                />

                {/* EXPLORE OUR BRANDS (Zelio 17 / Warivo 7 / Dynamo 15) */}
                <BrandSection onSelectBrand={handleSelectBrandFromSection} />

                {/* WHY CHOOSE PATEL AUTOMOBILES? (Concise, authentic dealership points) */}
                <WhyPatel />

                {/* SERVICE LOCATIONS: LAILUNGA • RAIGARH • KHARSIA ONLY */}
                <ServiceLocations />

                {/* VISIT PATEL AUTOMOBILES — Google Map */}
                <VisitPatel />
              </DynamicHomeBackground>
            </div>
          </>
        ) : currentPage === 'scooters' ? (
          /* VIEW: Full Dedicated Scooters Page */
          <div 
            id="scooters-page-wrapper"
            className="w-full min-h-screen pb-20 bg-[#050505]"
          >
            {/* PART 6: Compact Scooters Hero (EXPLORE OUR SCOOTERS) */}
            <ScootersHero />

            {/* PART 3, 4, 5, 7: Filters + 39-Product Grid with Alternating Scroll Animations */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-5 sm:pt-8">
              <ProductGrid
                products={filteredProducts}
                onViewDetails={(p) => navigateTo('scooters', p)}
                onResetFilters={() => setFilters(initialFilters)}
                filtersSlot={
                  <ProductFilters
                    allProducts={products}
                    filters={filters}
                    onFilterChange={setFilters}
                    totalMatches={filteredProducts.length}
                  />
                }
              />
            </div>
          </div>
        ) : currentPage === 'about' ? (
          <AboutView 
            onNavigate={(page, brand) => {
              if (brand) {
                setFilters({ ...initialFilters, brand });
              }
              navigateTo(page);
            }} 
          />
        ) : currentPage === 'stories' ? (
          <div className="w-full bg-[#050505] min-h-screen">
            <StoriesSection />
          </div>
        ) : currentPage === 'photos' ? (
          <PhotosPage 
            onNavigateToScooters={() => navigateTo('scooters')}
            onNavigateToTestRide={() => navigateTo('test-ride')}
          />
        ) : currentPage === 'test-ride' ? (
          <div className="w-full bg-[#050505] min-h-screen py-10 sm:py-16 px-4">
            <TestRideForm initialScooter={testRideScooter} />
          </div>
        ) : currentPage === 'contact' ? (
          <ContactView 
            onNavigate={(page, brand) => {
              if (brand) {
                setFilters({ ...initialFilters, brand: brand as any });
              }
              navigateTo(page);
            }} 
          />
        ) : currentPage === 'privacy-policy' ? (
          <PrivacyPolicyView onBack={() => navigateTo('home')} />
        ) : (
          <NotFoundView onNavigate={(p) => navigateTo(p)} />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={(p) => navigateTo(p)} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Mobile Fixed Bottom Navigation (Exactly 5 items: Home, Scooters, About Us, Stories, Contact) */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={(p) => navigateTo(p)}
      />
    </div>
  );
}
