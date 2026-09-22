import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Bike, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  filtersSlot?: React.ReactNode;
  onResetFilters?: () => void;
}

export function ProductGrid({
  products,
  onViewDetails,
  filtersSlot,
  onResetFilters,
}: ProductGridProps) {
  return (
    <div className="w-full">
      {/* Filters Slot */}
      {filtersSlot && <div className="mb-6">{filtersSlot}</div>}

      {/* Product Grid: 2 Columns on Mobile, 3 on Tablet, 4 on Desktop (Strictly zero horizontal overflow) */}
      {products.length > 0 ? (
        <div 
          id="scooter-product-grid"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
        >
          {products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        /* Empty Filter State */
        <div className="py-14 sm:py-20 text-center bg-[#0D0D0D] rounded-2xl border border-dashed border-[#511010] p-6 sm:p-8 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#2C0F12] border border-[#8B1E1E] flex items-center justify-center mx-auto mb-3.5 text-[#F9040C]">
            <Bike className="w-6 h-6" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white font-heading uppercase tracking-wide">
            No matching scooters found
          </h3>
          <p className="text-xs text-[#E8B7B7] mt-1.5 max-w-xs mx-auto leading-relaxed">
            Try loosening your price, range, or brand criteria to see available models in our 39-vehicle inventory.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white font-heading font-black text-xs uppercase tracking-wider transition-colors cursor-pointer active:scale-95 shadow-md shadow-[#D71920]/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
