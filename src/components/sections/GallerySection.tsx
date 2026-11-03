import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMELINE_ARCHIVES, ArchiveRecord } from '../../data/gallery';
import { soundManager } from '../../utils/sound';
import { Camera, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [crtMode, setCrtMode] = useState<boolean>(true);

  const categories = ['All', 'Keynotes', 'Workshops', 'Hackathons', 'Community'];

  const filteredArchives = selectedCategory === 'All'
    ? TIMELINE_ARCHIVES
    : TIMELINE_ARCHIVES.filter((item) => item.category === selectedCategory);

  const handlePhotoClick = (index: number) => {
    soundManager.playAnalogClick(780, 0.04);
    soundManager.playTerminalBeep(1300);
    setActivePhotoIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playAnalogClick(600, 0.03);
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! > 0 ? prev! - 1 : filteredArchives.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playAnalogClick(600, 0.03);
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! < filteredArchives.length - 1 ? prev! + 1 : 0));
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowLeft') setActivePhotoIndex((prev) => (prev! > 0 ? prev! - 1 : filteredArchives.length - 1));
      if (e.key === 'ArrowRight') setActivePhotoIndex((prev) => (prev! < filteredArchives.length - 1 ? prev! + 1 : 0));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredArchives.length]);

  const activePhoto = activePhotoIndex !== null ? filteredArchives[activePhotoIndex] : null;

  return (
    <section id="gallery" className="relative py-28 bg-[#100F0C] overflow-hidden">
      {/* Background terminal grid */}
      <div className="absolute inset-0 bg-tva-terminal opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#F07824]/40 bg-[#191714] text-[#F6C453] text-xs font-mono tracking-widest uppercase mb-4 shadow">
            <Camera className="w-3.5 h-3.5 text-[#F07824]" />
            <span>TVA HISTORICAL ARCHIVES // SURVEILLANCE FEED</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-bebas tracking-wider text-[#E8DFCA] text-tva-glow">
            ARCHIVES OF THE TIMELINE
          </h2>
          <p className="text-sm sm:text-base font-mono text-[#E8DFCA]/75 mt-3 max-w-2xl mx-auto">
            Declassified visual records of past AWS community assemblies, hands-on workshop terminals, hackathon victories, and variant collaborations.
          </p>

          {/* Filter Chips & CRT Switch */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundManager.playAnalogClick(650, 0.03);
                    setSelectedCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                    selectedCategory === cat
                      ? 'bg-[#F07824] text-[#100F0C] border-[#F07824] font-bold shadow-tva-glow'
                      : 'bg-[#181512] text-[#E8DFCA]/70 border-[#42452C] hover:text-[#F6C453]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* CRT surveillance toggle */}
            <button
              onClick={() => {
                soundManager.playAnalogClick(500, 0.03);
                setCrtMode(!crtMode);
              }}
              className={`px-3.5 py-1.5 text-xs font-mono border transition-all ${
                crtMode
                  ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                  : 'bg-[#181512] border-[#42452C] text-[#E8DFCA]/50'
              }`}
            >
              CRT SURVEILLANCE: {crtMode ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArchives.map((archive, idx) => (
            <motion.div
              key={archive.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
              onClick={() => handlePhotoClick(idx)}
              className="dossier-card bg-[#181512] border border-[#42452C] group cursor-pointer overflow-hidden relative"
            >
              {/* Image Frame */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
                <img
                  src={archive.imageUrl}
                  alt={archive.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />

                {/* CRT Scanline Overlay */}
                {crtMode && (
                  <div className="absolute inset-0 tva-scanlines opacity-40 pointer-events-none" />
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#100F0C] via-[#100F0C]/30 to-transparent opacity-75 group-hover:opacity-40 transition-opacity" />

                {/* Top Corner Metadata */}
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#100F0C]/90 border border-[#F07824]/40 text-[#F6C453] text-[10px] font-mono">
                  {archive.id}
                </div>

                <div className="absolute top-2 right-2 p-1.5 bg-[#100F0C]/80 rounded border border-[#42452C] text-[#E8DFCA] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-[#F6C453]" />
                </div>
              </div>

              {/* Caption Card Body */}
              <div className="p-4 space-y-1">
                <div className="text-[10px] font-mono text-[#F07824]">
                  {archive.sector} &bull; {archive.timestamp}
                </div>
                <h3 className="font-bebas text-2xl text-[#E8DFCA] group-hover:text-[#F6C453] transition-colors leading-none">
                  {archive.title}
                </h3>
                <p className="text-xs font-mono text-[#E8DFCA]/70 pt-1 line-clamp-2">
                  {archive.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Arrows & Keyboard Support */}
      <AnimatePresence>
        {activePhoto && (
          <div
            onClick={() => setActivePhotoIndex(null)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#181512] border-2 border-[#F07824] p-4 sm:p-6 shadow-tva-glow-lg overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="absolute top-4 right-4 p-2 bg-[#29251F] hover:bg-[#F07824] text-[#E8DFCA] hover:text-[#100F0C] transition-colors z-30 border border-[#42452C]"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded bg-[#100F0C]/80 hover:bg-[#F07824] text-[#E8DFCA] hover:text-[#100F0C] transition-colors z-30 border border-[#42452C]"
                title="Previous Record"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded bg-[#100F0C]/80 hover:bg-[#F07824] text-[#E8DFCA] hover:text-[#100F0C] transition-colors z-30 border border-[#42452C]"
                title="Next Record"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Frame */}
              <div className="relative max-h-[60vh] overflow-hidden bg-black mb-4 flex items-center justify-center">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain max-h-[60vh] mx-auto"
                />
                {crtMode && <div className="absolute inset-0 tva-scanlines opacity-30 pointer-events-none" />}
              </div>

              {/* Image Details */}
              <div className="space-y-2 border-t border-[#42452C] pt-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#F07824]">
                  <span>RECORD: {activePhoto.id} &bull; {activePhoto.sector}</span>
                  <span className="text-[#10B981]">{activePhoto.timestamp}</span>
                </div>
                <h3 className="font-bebas text-3xl sm:text-4xl text-[#E8DFCA] text-tva-glow">
                  {activePhoto.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#E8DFCA]/80">
                  {activePhoto.caption}
                </p>
                <div className="text-[11px] font-mono text-[#F6C453] bg-[#12100E] p-2.5 border-l-2 border-[#F6C453]">
                  NOTE: {activePhoto.clearanceNote}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
