import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS, FAQItem } from '../../data/faq';
import { soundManager } from '../../utils/sound';
import { HelpCircle, ChevronDown, ChevronUp, FileCode2, ShieldAlert } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFAQ = (id: string) => {
    soundManager.playAnalogClick(650, 0.03);
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-24 bg-[#14120E] border-t border-[#F07824]/20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#F07824]/40 bg-[#1D1A15] text-[#F6C453] text-xs font-mono tracking-widest uppercase mb-4 shadow">
            <HelpCircle className="w-3.5 h-3.5 text-[#F07824]" />
            <span>TVA PROTOCOL DIRECTIVES</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bebas tracking-wider text-[#E8DFCA] text-tva-glow">
            FREQUENTLY QUERIED PROTOCOLS
          </h2>
          <p className="text-sm sm:text-base font-mono text-[#E8DFCA]/70 mt-3">
            Essential inquiries regarding student eligibility, equipment clearance, credentials, and venue regulations.
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`border transition-all duration-300 ${
                  isOpen ? 'bg-[#1D1A15] border-[#F07824] shadow-tva-glow' : 'bg-[#181512] border-[#42452C] hover:border-[#F07824]/50'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#F07824] font-bold">[{item.id}]</span>
                    <h3 className="font-bebas text-xl sm:text-2xl tracking-wide text-[#E8DFCA] hover:text-[#F6C453] transition-colors">
                      {item.question}
                    </h3>
                  </div>

                  <span className="p-1 rounded bg-[#100F0C] border border-[#42452C] text-[#F07824] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm font-mono text-[#E8DFCA]/80 border-t border-[#42452C]/40 pt-4"
                    >
                      <p className="leading-relaxed bg-[#12100E] p-4 border-l-2 border-[#10B981]">
                        {item.answer}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-[#E8DFCA]/50 mt-3">
                        <span>TAG: {item.classificationTag}</span>
                        <span className="text-[#10B981]">VERIFIED BY TIMEKEEPERS</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
