import { useEffect } from 'react';
import { siteConfig } from '../config/site';
import { Product } from '../types';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  product?: Product | null;
}

export function SEO({ title, description, url, product }: SEOProps) {
  const fullTitle = title 
    ? `${title} | ${siteConfig.businessName}`
    : `${siteConfig.businessName} | Premium Electric Scooters in Lailunga, Raigarh & Kharsia`;

  const metaDesc = description || (
    product 
      ? `Discover ${product.name} by ${product.brand} at Patel Automobiles. ${product.priceDisplay}, range ${product.range || 'optimized'}, ${product.battery || 'EV battery'}. Visit our Lailunga showroom.`
      : siteConfig.description
  );

  useEffect(() => {
    document.title = fullTitle;
    
    // Update meta tags dynamically
    let descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', metaDesc);
    }
    
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', metaDesc);
    }

    // JSON-LD Structured Data insertion
    const jsonLdId = 'structured-data-jsonld';
    let scriptTag = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AutoDealer",
          "@id": `${siteConfig.websiteUrl}/#dealership`,
          "name": siteConfig.businessName,
          "description": siteConfig.description,
          "url": siteConfig.websiteUrl,
          "telephone": siteConfig.phone ? `+91${siteConfig.phone}` : undefined,
          "email": siteConfig.email || undefined,
          "founder": {
            "@type": "Person",
            "name": siteConfig.founder
          },
          "areaServed": siteConfig.serviceLocations.map(loc => ({
            "@type": "AdministrativeArea",
            "name": loc
          })),
          "currenciesAccepted": "INR",
          "paymentAccepted": "Cash, Credit Card, UPI, Bank Finance",
          "priceRange": "₹50,000 - ₹98,000"
        },
        ...(product ? [{
          "@type": "Product",
          "name": `${product.brand} ${product.name} Electric Scooter`,
          "image": [product.images.frontThreeQuarter, product.images.side].filter(Boolean),
          "description": product.description,
          "brand": {
            "@type": "Brand",
            "name": product.brand
          },
          "offers": {
            "@type": "Offer",
            "price": product.price ? product.price.toString() : "0",
            "priceCurrency": "INR",
            "availability": product.availability === 'In Stock' 
              ? "https://schema.org/InStock" 
              : "https://schema.org/PreOrder",
            "seller": {
              "@id": `${siteConfig.websiteUrl}/#dealership`
            }
          }
        }] : [])
      ]
    };

    scriptTag.textContent = JSON.stringify(structuredData);
  }, [fullTitle, metaDesc, product]);

  return null;
}
