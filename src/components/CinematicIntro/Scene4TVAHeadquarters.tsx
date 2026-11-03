import React from 'react';
import { motion } from 'framer-motion';
import { Radio, ShieldCheck, Terminal, Compass } from 'lucide-react';

export const Scene4TVAHeadquarters: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-[#100F0C] flex items-center justify-center overflow-hidden">
      {/* Background TVA Headquarters Wide Visual (Panel 3 from Asset Pack) */}
      <motion.div
        initial={{ scale: 1.0, y: 0 }}
        animate={{ scale: 1.14, y: -15 }}
        transition={{ duration: 4.5, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <img
          src="/assets/headquarters/tva_hq_wide.jpg"
          alt="TVA Headquarters Wide Environment"
          className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#100F0C] via-transparent to-[#100F0C]/80" />
      </motion.div>

      {/* Retro CRT Scanlines & HUD */}
      <div className="absolute inset-0 tva-scanlines opacity-25 pointer-events-none z-10" />

      {/* Top Telemetry Header */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-between px-6 border-b border-[#F07824]/30 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
          <span className="text-[#F6C453] font-bold tracking-widest uppercase">
            TVA HEADQUARTERS // CENTRAL TIMELINE CONTROL
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#E8DFCA]/70">
          <span>TIME ENGINE: OPERATIONAL</span>
          <span className="text-[#F07824]">VARIANCE: 0.003%</span>
        </div>
      </div>

      {/* Central Notification */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.5 }}
        className="relative z-20 text-center max-w-2xl px-4 mt-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F07824] bg-[#1A1814]/90 text-[#F6C453] text-xs font-mono tracking-widest uppercase mb-3 shadow-tva-glow">
          <Compass className="w-4 h-4 text-[#F07824] animate-spin-slow" />
          <span>ARRIVED AT TIME VARIANCE AUTHORITY CENTRAL FACILITY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bebas tracking-wider text-[#E8DFCA] text-tva-glow">
          WELCOME TO THE HEART OF TIME
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#E8DFCA]/80 mt-1">
          Observing all branches of cloud development across the multiversal continuum.
        </p>
      </motion.div>
    </div>
  );
};
