import { Product, FilterState } from '../types';

export const initialFilters: FilterState = {
  searchQuery: '',
  brand: 'All',
  priceRange: 'All',
  rangeMin: 0,
  batteryType: 'All',
  motor: 'All',
  topSpeed: 'All',
  availability: 'All',
  sortBy: 'featured',
};

// Dynamically extract distinct attributes directly from dataset
export function getAvailableBrands(products: Product[]): string[] {
  const brands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));
  return brands.sort();
}

export function getAvailableBatteryTypes(products: Product[]): string[] {
  const types = Array.from(
    new Set(
      products
        .map((p) => p.batteryType)
        .filter((t): t is NonNullable<typeof t> => Boolean(t && t !== 'Not specified'))
    )
  );
  return types.sort();
}

export function getAvailableAvailabilities(products: Product[]): string[] {
  const list = Array.from(new Set(products.map((p) => p.availability).filter(Boolean)));
  return list.sort();
}

// Check how many filters are currently active (excluding defaults)
export function getActiveFilterCount(filters: FilterState): number {
  let count = 0;
  if (filters.searchQuery.trim() !== '') count++;
  if (filters.brand !== 'All') count++;
  if (filters.priceRange !== 'All') count++;
  if (filters.rangeMin > 0) count++;
  if (filters.batteryType !== 'All') count++;
  if (filters.motor !== 'All') count++;
  if (filters.topSpeed !== 'All') count++;
  if (filters.availability !== 'All') count++;
  if (filters.sortBy !== 'featured') count++;
  return count;
}

// Master filter and sort function
export function filterAndSortProducts(products: Product[], filters: FilterState): Product[] {
  const query = filters.searchQuery.trim().toLowerCase();

  const filtered = products.filter((product) => {
    // 1. Search Query (Model, Brand, Description, Features)
    if (query) {
      const matchName = product.name.toLowerCase().includes(query);
      const matchBrand = product.brand.toLowerCase().includes(query);
      const matchDesc = product.description.toLowerCase().includes(query);
      const matchFeatures = product.features.some((f) => f.toLowerCase().includes(query));
      if (!matchName && !matchBrand && !matchDesc && !matchFeatures) {
        return false;
      }
    }

    // 2. Brand Filter
    if (filters.brand !== 'All' && product.brand !== filters.brand) {
      return false;
    }

    // 3. Price Filter
    if (filters.priceRange !== 'All') {
      const p = product.price;
      if (p === null) return false;
      if (filters.priceRange === 'under-65k' && p >= 65000) return false;
      if (filters.priceRange === '65k-80k' && (p < 65000 || p > 80000)) return false;
      if (filters.priceRange === '80k-100k' && (p < 80000 || p > 100000)) return false;
      if (filters.priceRange === 'above-100k' && p <= 100000) return false;
    }

    // 4. Minimum Range Filter
    if (filters.rangeMin > 0) {
      const r = product.rangeKm ?? 0;
      if (r < filters.rangeMin) return false;
    }

    // 5. Battery Type Filter
    if (filters.batteryType !== 'All') {
      const bType = product.batteryType || '';
      const bDesc = product.battery || '';
      if (!bType.toLowerCase().includes(filters.batteryType.toLowerCase()) && 
          !bDesc.toLowerCase().includes(filters.batteryType.toLowerCase())) {
        return false;
      }
    }

    // 6. Motor Power Filter
    if (filters.motor !== 'All') {
      const m = (product.motor || '').toLowerCase();
      if (filters.motor === 'bldc' && !m.includes('bldc')) return false;
      if (filters.motor === 'high-torque' && !m.includes('torque')) return false;
    }

    // 7. Top Speed Filter
    if (filters.topSpeed !== 'All') {
      const s = (product.topSpeed || '').toLowerCase();
      if (filters.topSpeed === 'low-speed') {
        const isLow = s.includes('25') || s.includes('non-rto') || s.includes('low speed');
        if (!isLow) return false;
      } else if (filters.topSpeed === 'high-speed') {
        const isHigh = s.includes('45') || s.includes('55') || s.includes('high speed') || s.includes('rto');
        if (!isHigh) return false;
      }
    }

    // 8. Availability Filter
    if (filters.availability !== 'All' && product.availability !== filters.availability) {
      return false;
    }

    return true;
  });

  // Sorting logic
  return [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc': {
        const priceA = a.price ?? 9999999;
        const priceB = b.price ?? 9999999;
        return priceA - priceB;
      }
      case 'price-desc': {
        const priceA = a.price ?? -1;
        const priceB = b.price ?? -1;
        return priceB - priceA;
      }
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'range-desc': {
        const rangeA = a.rangeKm ?? 0;
        const rangeB = b.rangeKm ?? 0;
        return rangeB - rangeA;
      }
      case 'featured':
      default:
        return 0; // retain dataset order
    }
  });
}
