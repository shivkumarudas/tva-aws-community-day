import React from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../../utils/sound';
import { Zap, ArrowRight, Compass, ShieldCheck, Terminal } from 'lucide-react';

interface Scene6Props {
  onEnter: () => void;
}

export const Scene6BrandReveal: React.FC<Scene6Props> = ({ onEnter }) => {
  const handleEnterClick = () => {
    soundManager.playAnalogClick(750, 0.08);
    soundManager.playTerminalBeep(1200);
    onEnter();
  };

  return (
    <div className="absolute inset-0 bg-[#100F0C] flex flex-col items-center justify-between p-6 md:p-12 overflow-hidden z-20">
      {/* Background TVA geometry and concentric timeline rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] md:w-[850px] md:h-[850px] rounded-full border border-[#F07824]/20 flex items-center justify-center">
          <div className="w-[420px] h-[420px] md:w-[700px] md:h-[700px] rounded-full border border-dashed border-[#F6C453]/25 animate-spin-slow flex items-center justify-center">
            <div className="w-[320px] h-[320px] md:w-[540px] md:h-[540px] rounded-full border border-[#42452C]/60 flex items-center justify-center">
              <div className="w-[200px] h-[200px] md:w-[360px] md:h-[360px] rounded-full bg-radial-portal opacity-50 blur-xl" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      {/* Top Telemetry Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-30 w-full flex items-center justify-between border-b border-[#F07824]/30 pb-4 text-xs font-mono"
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#F07824] animate-ping" />
          <span className="text-[#F6C453] font-bold tracking-widest uppercase">
            CHRONOVERSE // PUNE TIMELINE DIVISION
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#E8DFCA]/70">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            CONVERGENCE VERIFIED
          </span>
        </div>
      </motion.div>

      {/* Central Branding */}
      <div className="relative z-30 text-center max-w-4xl my-auto px-4">
        {/* TVA Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#F07824] bg-[#29251F]/90 text-[#F6C453] text-xs md:text-sm font-mono tracking-widest mb-4 shadow-tva-glow"
        >
          <Compass className="w-4 h-4 text-[#F07824] animate-spin-slow" />
          <span>TEMPORAL CLOUD AUTHORITY</span>
        </motion.div>

        {/* Brand Title: CHRONOVERSE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bebas tracking-widest text-[#F6C453] text-gold-glow leading-none mb-2">
            CHRONOVERSE
          </h1>

          <div className="flex items-center justify-center gap-3 md:gap-6 my-2">
            <div className="h-[2px] w-12 md:w-28 bg-gradient-to-r from-transparent to-[#F07824]" />
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bebas tracking-widest text-[#E8DFCA]">
              AWS STUDENT COMMUNITY DAY &bull; PUNE
            </h2>
            <div className="h-[2px] w-12 md:w-28 bg-gradient-to-l from-transparent to-[#F07824]" />
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl font-bebas tracking-widest text-[#F07824] mt-2 mb-8">
            EVERY TIMELINE BUILDS THE CLOUD.
          </p>
        </motion.div>

        {/* ENTER THE TIMELINE BUTTON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6"
        >
          <button
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-4 px-10 py-4 md:px-14 md:py-5 bg-gradient-to-r from-[#F07824] via-[#F6C453] to-[#F07824] text-[#100F0C] font-bebas text-2xl md:text-3xl tracking-widest rounded-none shadow-tva-glow-lg transition-all duration-300 hover:scale-105 hover:shadow-gold-glow active:scale-95 border-2 border-[#E8DFCA]"
          >
            <Zap className="w-6 h-6 text-[#100F0C] fill-current" />
            <span>ENTER THE TIMELINE</span>
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
          </button>
        </motion.div>
      </div>

      {/* Footer Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-30 w-full flex items-center justify-between border-t border-[#42452C]/40 pt-4 text-[11px] font-mono text-[#E8DFCA]/60"
      >
        <span className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#F07824]" />
          CHRONOVERSE 2026 // TIME VARIANCE PROTOCOL
        </span>
        <span className="text-[#F6C453]">CLICK TO STEP INTO THE HEADQUARTERS</span>
      </motion.div>
    </div>
  );
};
