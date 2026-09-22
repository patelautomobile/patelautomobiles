import React, { useState, useId } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Tag, 
  CheckCircle2, 
  FolderPlus 
} from 'lucide-react';
import { WEBSITE_PHOTOS, ShowroomPhoto, getPhotoUrl } from '../data/photosConfig';

interface PhotosPageProps {
  onNavigateToScooters: () => void;
  onNavigateToTestRide: () => void;
}

interface StagedPhoto extends ShowroomPhoto {
  previewUrl: string;
  isStaged?: boolean;
}

export function PhotosPage({ onNavigateToScooters, onNavigateToTestRide }: PhotosPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [stagedPhotos, setStagedPhotos] = useState<StagedPhoto[]>([]);
  const [showDeveloperUpload, setShowDeveloperUpload] = useState<boolean>(false);
  const fileInputId = useId();

  // Combine configured photos that have an uploaded image with any locally uploaded / staged photos
  const configuredPhotos: StagedPhoto[] = WEBSITE_PHOTOS
    .map(p => {
      const url = getPhotoUrl(p.slot);
      return url ? { ...p, previewUrl: url } : null;
    })
    .filter((p): p is StagedPhoto => p !== null);

  const allPhotos: StagedPhoto[] = [
    ...configuredPhotos,
    ...stagedPhotos
  ];

  const filteredPhotos = activeCategory === 'All' 
    ? allPhotos 
    : allPhotos.filter(p => p.category === activeCategory);

  const categories = ['All', 'Showroom', 'Scooters', 'Deliveries', 'Events', 'Team'];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: StagedPhoto[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const previewUrl = URL.createObjectURL(file);
      const category: ShowroomPhoto['category'] = 'Showroom';
      newPhotos.push({
        id: `staged-${Date.now()}-${i}`,
        slot: file.name,
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ').toUpperCase(),
        category,
        location: 'Patel Automobiles Showroom',
        date: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
        description: `Uploaded photo staged in src/assets/site-images/photos/${file.name}`,
        previewUrl,
        isStaged: true
      });
    }

    setStagedPhotos(prev => [...prev, ...newPhotos]);
  };

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div id="photos-page-root" className="min-h-screen bg-[#050505] text-[#FCE9E9] pt-6 sm:pt-10 pb-20">
      
      {/* Background Ambience */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top,_#8B1E1E_0%,_#2C0F12_35%,_transparent_75%)] z-0" 
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111]/90 border border-[#8B1E1E]/60 shadow-lg shadow-[#2C0F12]/30 backdrop-blur-md mb-4">
            <Camera className="w-3.5 h-3.5 text-[#F9040C]" />
            <span className="font-heading font-extrabold text-[10px] sm:text-xs uppercase tracking-widest text-[#FCE9E9]">
              PATEL AUTOMOBILES • GALLERY
            </span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.95] mb-4">
            SHOWROOM & <span className="text-[#F9040C]">MOMENTS</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#E8B7B7] font-medium leading-relaxed max-w-xl mx-auto">
            High-resolution captures from our authorised EV showrooms, customer deliveries, and electric scooter lineup across Lailunga, Raigarh & Kharsia.
          </p>

          {/* Category Filter Pills (rendered only when photos exist) */}
          {allPhotos.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#D71920] text-white shadow-md shadow-[#D71920]/40'
                      : 'bg-[#111111] text-[#E8B7B7] hover:text-white border border-[#2C0F12] hover:border-[#8B1E1E]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* EMPTY STATE: Shown when no photos are placed in public/photos/           */}
        {/* ========================================================================= */}
        {allPhotos.length === 0 ? (
          <div 
            id="photos-empty-state"
            className="max-w-2xl mx-auto rounded-2xl bg-[#0D0D0D]/90 border border-[#2C0F12] p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            {/* Subtle red accent glow */}
            <div 
              className="absolute -top-24 -right-24 w-60 h-60 bg-[#F9040C]/10 rounded-full blur-3xl pointer-events-none" 
              aria-hidden="true" 
            />
            <div 
              className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#8B1E1E]/15 rounded-full blur-3xl pointer-events-none" 
              aria-hidden="true" 
            />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1A0A0C] border border-[#8B1E1E]/50 flex items-center justify-center mb-6 shadow-lg shadow-[#2C0F12]/50">
                <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-[#F9040C] animate-pulse" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0A0C] border border-[#8B1E1E]/40 text-[#F9040C] font-heading font-extrabold text-[11px] uppercase tracking-widest mb-3">
                <Sparkles className="w-3 h-3" />
                OFFICIAL GALLERY
              </span>

              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mb-3">
                PHOTOS COMING SOON
              </h2>

              <p className="text-xs sm:text-sm text-[#E8B7B7] max-w-md mx-auto mb-8 leading-relaxed">
                We are currently photographing our showroom floor, customer delivery keys, and new electric arrivals in Lailunga and Raigarh. Check back shortly!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <button
                  id="empty-state-explore-btn"
                  onClick={onNavigateToScooters}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D71920] hover:bg-[#F9040C] text-white font-heading font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-[#D71920]/30 cursor-pointer"
                >
                  <span>Explore 39+ Scooters</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="empty-state-test-ride-btn"
                  onClick={onNavigateToTestRide}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#111111] hover:bg-[#2C0F12] text-white border border-[#8B1E1E] font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#F9040C]" />
                  <span>Book Test Ride</span>
                </button>
              </div>

              {/* Developer Helper Box: Explains folder src/assets/site-images/photos/ */}
              <div className="mt-10 pt-6 border-t border-[#2C0F12]/80 w-full text-left">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-heading font-bold text-[11px] uppercase tracking-wider text-[#A87171] flex items-center gap-1.5">
                    <FolderPlus className="w-3.5 h-3.5 text-[#F9040C]" />
                    Folder-Based Photo Slots: <code className="text-[#FCE9E9] bg-black/50 px-1.5 py-0.5 rounded text-[10px]">src/assets/site-images/photos/</code>
                  </span>

                  <button
                    onClick={() => setShowDeveloperUpload(!showDeveloperUpload)}
                    className="text-[11px] font-bold text-[#F9040C] hover:underline cursor-pointer"
                  >
                    {showDeveloperUpload ? 'Hide Uploader' : 'Preview Photos Directly'}
                  </button>
                </div>

                {showDeveloperUpload && (
                  <div className="p-4 rounded-xl bg-black/70 border border-[#8B1E1E]/40 text-xs text-[#E8B7B7] space-y-3">
                    <p>
                      Drop your photos (with ANY filename) inside <strong className="text-white">src/assets/site-images/photos/</strong>. You can also test and stage photos directly using the button below to preview them in this layout:
                    </p>
                    <label 
                      htmlFor={fileInputId}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2C0F12] hover:bg-[#8B1E1E] text-white font-bold text-xs cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#F9040C]" />
                      <span>Select Images to Preview</span>
                      <input 
                        id={fileInputId}
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileUpload}
                        className="hidden" 
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* PHOTO GALLERY: Editorial-style responsive layout                           */
          /* ========================================================================= */
          <div className="space-y-6">
            
            {/* Developer photo count bar */}
            <div className="flex items-center justify-between px-2 text-xs text-[#A87171]">
              <span>Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photograph' : 'photographs'} from <code className="text-[#FCE9E9]">src/assets/site-images/photos/</code></span>
              
              <label 
                htmlFor={`${fileInputId}-bar`}
                className="inline-flex items-center gap-1.5 text-xs text-[#F9040C] hover:text-white transition-colors cursor-pointer font-bold"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Add / Preview More Photos</span>
                <input 
                  id={`${fileInputId}-bar`}
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
              </label>
            </div>

            {/* Editorial Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  id={`gallery-photo-card-${photo.id}`}
                  onClick={() => openLightbox(idx)}
                  className="group relative rounded-2xl bg-[#0D0D0D] border border-[#2C0F12] hover:border-[#8B1E1E] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#8B1E1E]/20 flex flex-col"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                    <img
                      src={photo.previewUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Scrim Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Top Category Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#050505]/80 border border-[#8B1E1E]/50 text-[10px] font-heading font-extrabold uppercase tracking-wider text-white backdrop-blur-md">
                        <Tag className="w-2.5 h-2.5 text-[#F9040C]" />
                        {photo.category}
                      </span>
                    </div>

                    {/* Zoom Icon on hover */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-full bg-[#D71920] text-white shadow-lg">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Caption Info */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-black text-base sm:text-lg text-white group-hover:text-[#F9040C] transition-colors leading-tight mb-1.5">
                        {photo.title}
                      </h3>
                      {photo.description && (
                        <p className="text-xs text-[#C99C9C] line-clamp-2 mb-3">
                          {photo.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#A87171] pt-3 border-t border-[#1F0B0E]">
                      {photo.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#F9040C]" />
                          {photo.location}
                        </span>
                      )}
                      {photo.date && (
                        <span>{photo.date}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* LIGHTBOX MODAL: High-resolution full preview                              */}
      {/* ========================================================================= */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div 
          id="photo-lightbox-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-[#1A0A0C] hover:bg-[#8B1E1E] text-white border border-[#8B1E1E] transition-colors cursor-pointer"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          {filteredPhotos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#1A0A0C]/80 hover:bg-[#8B1E1E] text-white border border-[#8B1E1E] transition-all cursor-pointer"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next button */}
          {filteredPhotos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#1A0A0C]/80 hover:bg-[#8B1E1E] text-white border border-[#8B1E1E] transition-all cursor-pointer"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Content Container */}
          <div 
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[selectedPhotoIndex].previewUrl}
              alt={filteredPhotos[selectedPhotoIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-[#2C0F12] shadow-2xl shadow-black"
            />

            <div className="mt-4 text-center max-w-2xl px-4">
              <h3 className="font-heading font-black text-lg sm:text-2xl text-white uppercase tracking-tight">
                {filteredPhotos[selectedPhotoIndex].title}
              </h3>
              {filteredPhotos[selectedPhotoIndex].description && (
                <p className="text-xs sm:text-sm text-[#C99C9C] mt-1">
                  {filteredPhotos[selectedPhotoIndex].description}
                </p>
              )}
              <div className="flex items-center justify-center gap-4 text-xs text-[#A87171] mt-2">
                <span>{filteredPhotos[selectedPhotoIndex].category}</span>
                {filteredPhotos[selectedPhotoIndex].location && <span>• {filteredPhotos[selectedPhotoIndex].location}</span>}
                {filteredPhotos[selectedPhotoIndex].date && <span>• {filteredPhotos[selectedPhotoIndex].date}</span>}
                <span>({selectedPhotoIndex + 1} of {filteredPhotos.length})</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
