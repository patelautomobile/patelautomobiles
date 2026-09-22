import React, { useState, useMemo, ChangeEvent } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  X, 
  Check, 
  Gauge, 
  Battery, 
  Zap, 
  Tag, 
  ArrowUpDown, 
  Sparkles 
} from 'lucide-react';
import { Product, FilterState } from '../types';
import { 
  getAvailableBrands, 
  getAvailableBatteryTypes, 
  getAvailableAvailabilities,
  getActiveFilterCount,
  initialFilters
} from '../utils/filterUtils';

interface ProductFiltersProps {
  allProducts: Product[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalMatches: number;
}

export function ProductFilters({
  allProducts,
  filters,
  onFilterChange,
  totalMatches,
}: ProductFiltersProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [desktopAdvancedOpen, setDesktopAdvancedOpen] = useState(false);

  // Dynamically derived metadata directly from dataset
  const brands = useMemo(() => getAvailableBrands(allProducts), [allProducts]);
  const batteryTypes = useMemo(() => getAvailableBatteryTypes(allProducts), [allProducts]);
  const availabilities = useMemo(() => getAvailableAvailabilities(allProducts), [allProducts]);

  // Brand product counts
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allProducts.length };
    allProducts.forEach((p) => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return counts;
  }, [allProducts]);

  const activeCount = getActiveFilterCount(filters);

  const handleReset = () => {
    onFilterChange(initialFilters);
  };

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* DESKTOP & TABLET FILTER BAR */}
      {/* ========================================================================= */}
      <div className="hidden md:block w-full bg-[#0D0D0D] border border-[#2C0F12] rounded-2xl p-4 sm:p-5 shadow-xl mb-6 text-white">
        {/* Top Row: Search + Sort + Clear */}
        <div className="flex items-center gap-3 justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C97C7C]" />
            <input
              id="desktop-scooter-search"
              type="text"
              value={filters.searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onFilterChange({ ...filters, searchQuery: e.target.value })
              }
              placeholder="Search by model name or keyword (e.g. Eeva, Loader, Legend)..."
              className="w-full pl-9 pr-16 py-2.5 rounded-xl bg-[#050505] border border-[#2C0F12] text-xs sm:text-sm text-white placeholder:text-[#8B1E1E]/80 focus:outline-none focus:border-[#F9040C] transition-colors"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#C97C7C] hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selection */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#E8B7B7] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#F9040C]" />
              <span>Sort:</span>
            </span>
            <select
              id="desktop-scooter-sort"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })
              }
              className="px-3 py-2 rounded-xl bg-[#050505] border border-[#2C0F12] text-xs font-semibold text-white focus:outline-none focus:border-[#F9040C] cursor-pointer"
            >
              <option value="featured">Featured (All 39)</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="range-desc">Range: Highest First</option>
            </select>
          </div>

          {/* Advanced Toggle + Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDesktopAdvancedOpen(!desktopAdvancedOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                desktopAdvancedOpen || activeCount > 0
                  ? 'bg-[#2C0F12] border-[#F9040C] text-[#FCE9E9]'
                  : 'bg-[#050505] border-[#2C0F12] text-[#E8B7B7] hover:text-white hover:border-[#8B1E1E]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#F9040C]" />
              <span>Filters</span>
              {activeCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#F9040C] text-white text-[10px] font-black flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </button>

            {activeCount > 0 && (
              <button
                onClick={handleReset}
                title="Reset all filters"
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-[#181818] hover:bg-[#2C0F12] text-[#E8B7B7] hover:text-white text-xs font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Brand Pills Row */}
        <div className="mt-4 pt-3.5 border-t border-[#2C0F12] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8B7B7] mr-1 flex items-center gap-1">
              <Tag className="w-3 h-3 text-[#F9040C]" />
              Brand:
            </span>

            {/* "All" Brand Button */}
            <button
              onClick={() => onFilterChange({ ...filters, brand: 'All' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filters.brand === 'All'
                  ? 'bg-[#D71920] text-white shadow-md shadow-[#D71920]/30'
                  : 'bg-[#050505] border border-[#2C0F12] text-[#E8B7B7] hover:border-[#8B1E1E]'
              }`}
            >
              All ({brandCounts.All || 39})
            </button>

            {/* Dynamically Rendered Brand Buttons */}
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => onFilterChange({ ...filters, brand: b })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filters.brand === b
                    ? 'bg-[#D71920] text-white shadow-md shadow-[#D71920]/30'
                    : 'bg-[#050505] border border-[#2C0F12] text-[#E8B7B7] hover:border-[#8B1E1E]'
                }`}
              >
                {b} ({brandCounts[b] || 0})
              </button>
            ))}
          </div>

          {/* Results Badge */}
          <div className="text-xs text-[#E8B7B7] font-medium">
            Showing <strong className="text-[#F9040C] font-bold">{totalMatches}</strong> of {allProducts.length} Scooters
          </div>
        </div>

        {/* Desktop Advanced Drawer */}
        {desktopAdvancedOpen && (
          <div className="mt-4 pt-4 border-t border-[#2C0F12] grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* 1. Price Range */}
            <div>
              <label className="font-bold text-[#E8B7B7] mb-1.5 block">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
                className="w-full px-2.5 py-2 rounded-lg bg-[#050505] border border-[#2C0F12] text-slate-200 focus:outline-none focus:border-[#F9040C]"
              >
                <option value="All">All Prices</option>
                <option value="under-65k">Under ₹65,000</option>
                <option value="65k-80k">₹65,000 - ₹80,000</option>
                <option value="80k-100k">₹80,000 - ₹1,00,000</option>
                <option value="above-100k">Above ₹1,00,000</option>
              </select>
            </div>

            {/* 2. Minimum Range */}
            <div>
              <label className="font-bold text-[#E8B7B7] mb-1.5 block">
                Min Range ({filters.rangeMin > 0 ? `${filters.rangeMin}+ km` : 'Any'})
              </label>
              <select
                value={filters.rangeMin}
                onChange={(e) => onFilterChange({ ...filters, rangeMin: Number(e.target.value) })}
                className="w-full px-2.5 py-2 rounded-lg bg-[#050505] border border-[#2C0F12] text-slate-200 focus:outline-none focus:border-[#F9040C]"
              >
                <option value={0}>Any Range</option>
                <option value={60}>60+ km/charge</option>
                <option value={80}>80+ km/charge</option>
                <option value={100}>100+ km/charge</option>
                <option value={120}>120+ km/charge</option>
              </select>
            </div>

            {/* 3. Battery Type */}
            <div>
              <label className="font-bold text-[#E8B7B7] mb-1.5 block">Battery Chemistry</label>
              <select
                value={filters.batteryType}
                onChange={(e) => onFilterChange({ ...filters, batteryType: e.target.value })}
                className="w-full px-2.5 py-2 rounded-lg bg-[#050505] border border-[#2C0F12] text-slate-200 focus:outline-none focus:border-[#F9040C]"
              >
                <option value="All">All Batteries</option>
                {batteryTypes.map((bt) => (
                  <option key={bt} value={bt}>
                    {bt}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Top Speed */}
            <div>
              <label className="font-bold text-[#E8B7B7] mb-1.5 block">Speed Class</label>
              <select
                value={filters.topSpeed}
                onChange={(e) => onFilterChange({ ...filters, topSpeed: e.target.value })}
                className="w-full px-2.5 py-2 rounded-lg bg-[#050505] border border-[#2C0F12] text-slate-200 focus:outline-none focus:border-[#F9040C]"
              >
                <option value="All">All Speeds</option>
                <option value="low-speed">Low Speed (25 km/h Non-RTO)</option>
                <option value="high-speed">High Speed (45+ km/h RTO)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE COMPACT FILTER BAR */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full mb-4">
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#C97C7C]" />
            <input
              id="mobile-scooter-search"
              type="text"
              value={filters.searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onFilterChange({ ...filters, searchQuery: e.target.value })
              }
              placeholder="Search 39 scooters..."
              className="w-full pl-8 pr-12 py-2 rounded-xl bg-[#0D0D0D] border border-[#2C0F12] text-xs text-white placeholder:text-[#8B1E1E]/80 focus:outline-none focus:border-[#F9040C]"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-[#C97C7C]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Compact FILTERS Button */}
          <button
            id="mobile-filters-trigger-btn"
            onClick={() => setMobileDrawerOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer shrink-0 ${
              activeCount > 0
                ? 'bg-[#D71920] text-white border-[#F9040C]'
                : 'bg-[#0D0D0D] text-white border-[#2C0F12]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#D71920] text-[10px] font-black flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* Quick Brand Selector Pills on Mobile */}
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => onFilterChange({ ...filters, brand: 'All' })}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
              filters.brand === 'All'
                ? 'bg-[#D71920] text-white'
                : 'bg-[#0D0D0D] border border-[#2C0F12] text-[#E8B7B7]'
            }`}
          >
            All ({allProducts.length})
          </button>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => onFilterChange({ ...filters, brand: b })}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
                filters.brand === b
                  ? 'bg-[#D71920] text-white'
                  : 'bg-[#0D0D0D] border border-[#2C0F12] text-[#E8B7B7]'
              }`}
            >
              {b} ({brandCounts[b] || 0})
            </button>
          ))}
        </div>

        {/* Dynamic Count Banner */}
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#E8B7B7]">
          <span>
            Showing <strong className="text-[#F9040C] font-bold">{totalMatches}</strong> Scooters
          </span>
          {activeCount > 0 && (
            <button
              onClick={handleReset}
              className="text-[#F9040C] font-semibold underline underline-offset-2"
            >
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE FILTER BOTTOM SHEET / DRAWER */}
      {/* ========================================================================= */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div 
            id="mobile-filter-drawer"
            className="relative z-10 w-full max-h-[88vh] bg-[#0D0D0D] border-t border-[#8B1E1E] rounded-t-3xl p-5 overflow-y-auto flex flex-col shadow-2xl text-white"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2C0F12]">
              <div>
                <h3 className="font-heading font-black text-base uppercase text-white flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-[#F9040C]" />
                  <span>Filter Scooters</span>
                </h3>
                <span className="text-[11px] text-[#E8B7B7]">
                  <strong className="text-[#F9040C] font-bold">{totalMatches} Scooters Found</strong>
                </span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-[#181818] flex items-center justify-center text-[#E8B7B7] hover:text-white"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Options List */}
            <div className="space-y-4 py-4 text-xs">
              {/* 1. Sort Options */}
              <div>
                <label className="font-bold text-[#E8B7B7] mb-2 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  <ArrowUpDown className="w-3 h-3 text-[#F9040C]" />
                  Sort By
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'featured', label: 'Featured (All 39)' },
                    { id: 'price-asc', label: 'Price: Low → High' },
                    { id: 'price-desc', label: 'Price: High → Low' },
                    { id: 'name-asc', label: 'Name: A → Z' },
                    { id: 'range-desc', label: 'Range: High → Low' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() =>
                        onFilterChange({ ...filters, sortBy: s.id as FilterState['sortBy'] })
                      }
                      className={`p-2 rounded-xl text-left font-semibold border transition-all ${
                        filters.sortBy === s.id
                          ? 'bg-[#2C0F12] border-[#F9040C] text-[#FCE9E9]'
                          : 'bg-[#050505] border-[#2C0F12] text-[#E8B7B7]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Brand Filter */}
              <div>
                <label className="font-bold text-[#E8B7B7] mb-2 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  <Tag className="w-3 h-3 text-[#F9040C]" />
                  Brand
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => onFilterChange({ ...filters, brand: 'All' })}
                    className={`px-3 py-1.5 rounded-xl font-bold border transition-colors ${
                      filters.brand === 'All'
                        ? 'bg-[#D71920] text-white border-[#F9040C]'
                        : 'bg-[#050505] border-[#2C0F12] text-[#E8B7B7]'
                    }`}
                  >
                    All ({allProducts.length})
                  </button>
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => onFilterChange({ ...filters, brand: b })}
                      className={`px-3 py-1.5 rounded-xl font-bold border transition-colors ${
                        filters.brand === b
                          ? 'bg-[#D71920] text-white border-[#F9040C]'
                          : 'bg-[#050505] border-[#2C0F12] text-[#E8B7B7]'
                      }`}
                    >
                      {b} ({brandCounts[b] || 0})
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Price Filter */}
              <div>
                <label className="font-bold text-[#E8B7B7] mb-2 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  <Sparkles className="w-3 h-3 text-[#F9040C]" />
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'All', label: 'All Prices' },
                    { id: 'under-65k', label: 'Under ₹65,000' },
                    { id: '65k-80k', label: '₹65,000 - ₹80,000' },
                    { id: '80k-100k', label: '₹80,000 - ₹1,00,000' },
                    { id: 'above-100k', label: 'Above ₹1,00,000' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onFilterChange({ ...filters, priceRange: p.id })}
                      className={`p-2 rounded-xl text-left font-semibold border transition-all ${
                        filters.priceRange === p.id
                          ? 'bg-[#2C0F12] border-[#F9040C] text-[#FCE9E9]'
                          : 'bg-[#050505] border-[#2C0F12] text-[#E8B7B7]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Range Filter */}
              <div>
                <label className="font-bold text-[#E8B7B7] mb-2 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  <Gauge className="w-3 h-3 text-[#F9040C]" />
                  Minimum Range
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 0, label: 'Any Range' },
                    { id: 60, label: '60+ km' },
                    { id: 80, label: '80+ km' },
                    { id: 100, label: '100+ km' },
                    { id: 120, label: '120+ km' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => onFilterChange({ ...filters, rangeMin: r.id })}
                      className={`p-2 rounded-xl text-center font-semibold border transition-all ${
                        filters.rangeMin === r.id
                          ? 'bg-[#2C0F12] border-[#F9040C] text-[#FCE9E9]'
                          : 'bg-[#050505] border-[#2C0F12] text-[#E8B7B7]'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Battery Chemistry */}
              <div>
                <label className="font-bold text-[#E8B7B7] mb-2 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  <Battery className="w-3 h-3 text-[#F9040C]" />
                  Battery Chemistry
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => onFilterChange({ ...filters, batteryType: 'All' })}
                    className={`px-3 py-1.5 rounded-xl font-bold border transition-colors ${
                      filters.batteryType === 'All'
                        ? 'bg-[#D71920] text-white border-[#F9040C]'
                        : 'bg-[#050505] border-[#2C0F12] text-[#E8B7B7]'
                    }`}
                  >
                    All
                  </button>
                  {batteryTypes.map((bt) => (
                    <button
                      key={bt}
                      onClick={() => onFilterChange({ ...filters, batteryType: bt })}
                      className={`px-3 py-1.5 rounded-xl font-bold border transition-colors ${
                        filters.batteryType === bt
                          ? 'bg-[#D71920] text-white border-[#F9040C]'
                          : 'bg-[#050505] border-[#2C0F12] text-[#E8B7B7]'
                      }`}
                    >
                      {bt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-3 border-t border-[#2C0F12] flex items-center gap-2">
              <button
                onClick={handleReset}
                className="py-2.5 px-4 rounded-xl bg-[#181818] hover:bg-[#2C0F12] text-[#E8B7B7] text-xs font-bold cursor-pointer"
              >
                Reset
              </button>

              <button
                id="apply-filters-btn"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white text-xs font-heading font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-[#D71920]/25 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Apply Filters ({totalMatches} Found)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
