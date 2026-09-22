import { Product } from '../types';
import { Battery, Zap, Gauge, Clock, ShieldCheck, Disc, CircleDot, Award, AlertCircle } from 'lucide-react';

interface SpecificationGridProps {
  product: Product;
}

export function SpecificationGrid({ product }: SpecificationGridProps) {
  const keySpecs = [
    { label: 'Ex-Showroom Price', value: product.priceDisplay, icon: Award, highlight: true },
    { label: 'Certified Range', value: product.range || 'Not specified', icon: Gauge },
    { label: 'Battery Capacity', value: product.battery || 'Not specified', icon: Battery },
    { label: 'Motor Rating', value: product.motor || 'Not specified', icon: Zap },
    { label: 'Top Speed', value: product.topSpeed || 'Not specified', icon: Gauge },
    { label: 'Charging Time', value: product.chargingTime || 'Not specified', icon: Clock },
    { label: 'Braking System', value: product.brakes || 'Not specified', icon: Disc },
    { label: 'Wheel / Rim Size', value: product.wheelSize || 'Not specified', icon: CircleDot },
    { label: 'Official Warranty', value: product.warranty || 'Not specified', icon: ShieldCheck },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Conflicting spec notice if applicable (e.g., Warivo CRX) */}
      {product.sourceNotes && (
        <div className="p-3.5 rounded-xl bg-[#1F070A] border border-red-700/40 text-xs text-red-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#FF2E3B]" />
          <div>
            <span className="font-bold block text-white">Official Specification Note:</span>
            <span>{product.sourceNotes}</span>
          </div>
        </div>
      )}

      {/* Key Specifications Grid */}
      <div>
        <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#FF2E3B] mb-3 font-heading">
          Key Technical Specifications
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {keySpecs.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.label}
                className="p-3 rounded-xl bg-[#0C0C11] border border-red-950/40 flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mb-1">
                  <Icon className="w-3.5 h-3.5 text-[#FF2E3B]" />
                  <span className="text-[11px] truncate">{spec.label}</span>
                </div>
                <div className={`text-xs sm:text-sm font-bold truncate ${spec.highlight ? 'text-[#FF2E3B]' : 'text-white'}`}>
                  {spec.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Body Colors */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#FF2E3B] mb-2.5 font-heading">
            Showroom Color Options
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-lg bg-[#0C0C11] border border-red-950/40 text-xs font-semibold text-[#C5CED6]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Key Features List */}
      {product.features && product.features.length > 0 && (
        <div>
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#FF2E3B] mb-2.5 font-heading">
            Equipped Features & Technology
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#C5CED6]">
            {product.features.map((feat) => (
              <div key={feat} className="flex items-center gap-2 p-2 rounded-lg bg-[#0C0C11]/80 border border-red-950/40">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF2E3B]" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Source Transparency */}
      <div className="pt-2 text-[10px] text-[#94A3B8]">
        Catalog Source: <span className="text-[#C5CED6]">{product.source}</span>. Technical values verified against authorized dealership manifests.
      </div>
    </div>
  );
}
