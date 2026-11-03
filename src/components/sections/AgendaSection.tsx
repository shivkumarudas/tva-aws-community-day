import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AGENDA_ITEMS, AgendaItem } from '../../data/agenda';
import { soundManager } from '../../utils/sound';
import { Clock, MapPin, User, ChevronDown, ChevronUp, Sparkles, Activity } from 'lucide-react';

export const AgendaSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', 'Keynote', 'AI & ML', 'Architecture', 'DevOps', 'Security', 'Community'];

  const filteredItems = selectedCategory === 'All'
    ? AGENDA_ITEMS
    : AGENDA_ITEMS.filter((item) => item.category === selectedCategory);

  const toggleExpand = (id: string) => {
    soundManager.playAnalogClick(700, 0.03);
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCategoryFilter = (cat: string) => {
    soundManager.playAnalogClick(800, 0.03);
    setSelectedCategory(cat);
  };

  return (
    <section id="agenda" className="relative py-28 bg-[#14120E] border-t border-[#F07824]/20 overflow-hidden">
      {/* Background terminal grid */}
      <div className="absolute inset-0 bg-tva-terminal opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#F07824]/40 bg-[#1D1A15] text-[#F6C453] text-xs font-mono tracking-widest uppercase mb-4 shadow">
            <Sparkles className="w-3.5 h-3.5 text-[#F07824]" />
            <span>TEMPORAL SEQUENCE PROTOCOL</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-bebas tracking-wider text-[#E8DFCA] text-tva-glow">
            THE SACRED TIMELINE
          </h2>
          <p className="text-sm sm:text-base font-mono text-[#E8DFCA]/75 mt-3 max-w-2xl mx-auto">
            Chronological itinerary of the day. Every milestone marks a critical convergence point in the AWS Student Community Day schedule.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#F07824] text-[#100F0C] border-[#F07824] font-bold shadow-tva-glow'
                    : 'bg-[#181512] text-[#E8DFCA]/70 border-[#42452C] hover:text-[#F6C453] hover:border-[#F07824]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Animated Timeline Spine */}
        <div className="relative mt-12 pl-6 sm:pl-10 border-l-2 border-[#F07824]/40 space-y-8">
          {/* Pulsing illuminated gradient core along the timeline */}
          <div className="absolute top-0 bottom-0 left-[-2px] w-[3px] bg-gradient-to-b from-[#F07824] via-[#F6C453] to-[#10B981] shadow-tva-glow pointer-events-none" />

          {filteredItems.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            const isBranch = item.status === 'BRANCH_ACTIVE';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="relative group"
              >
                {/* Timeline Checkpoint Node */}
                <div
                  className={`absolute -left-[35px] sm:-left-[51px] top-4 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                    isBranch
                      ? 'bg-[#10B981] border-[#E8DFCA] shadow-lg text-[#100F0C]'
                      : 'bg-[#181512] border-[#F07824] text-[#F6C453] group-hover:bg-[#F07824] group-hover:text-[#100F0C]'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-current animate-ping" />
                </div>

                {/* Event Dossier Card */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className={`cursor-pointer p-5 sm:p-6 transition-all duration-300 border relative ${
                    isExpanded
                      ? 'bg-[#1D1A15] border-[#F07824] shadow-tva-glow'
                      : 'bg-[#181512] border-[#42452C] hover:border-[#F07824]/60 hover:bg-[#1A1814]'
                  }`}
                >
                  {/* Card Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-[#F6C453] font-bold">
                        <Clock className="w-3.5 h-3.5 text-[#F07824]" />
                        {item.time}
                      </span>
                      <span className="text-[#42452C]">&bull;</span>
                      <span className="text-[#E8DFCA]/60">{item.id}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#100F0C] border border-[#42452C] text-[#F07824]">
                        {item.badge}
                      </span>
                      {isBranch && (
                        <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#10B981]/20 border border-[#10B981] text-[#10B981]">
                          BRANCH ACTIVE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Presenter */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bebas tracking-wide text-[#E8DFCA] group-hover:text-[#F6C453] transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#E8DFCA]/75 mt-1">
                        <span className="flex items-center gap-1 text-[#F07824]">
                          <User className="w-3.5 h-3.5" />
                          {item.speaker}
                        </span>
                        <span className="flex items-center gap-1 text-[#E8DFCA]/60">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <button
                      className="p-1.5 rounded text-[#E8DFCA]/50 hover:text-[#F6C453] transition-colors"
                      aria-label="Toggle Details"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#F07824]" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Expandable Session Dossier */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-[#42452C]/60 text-xs sm:text-sm font-mono text-[#E8DFCA]/80 space-y-3"
                      >
                        <p className="leading-relaxed bg-[#12100E] p-3.5 border-l-3 border-[#F6C453]">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap items-center justify-between text-xs text-[#E8DFCA]/60 pt-1">
                          <span>PRESENTER DESIGNATION: <strong className="text-[#F6C453]">{item.role}</strong></span>
                          <span className="text-[#10B981] font-bold">STATUS: TIMELINE VERIFIED</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
