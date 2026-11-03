import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../../utils/sound';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Scene5Props {
  onContinue: () => void;
}

export const Scene5MissMinutesIntro: React.FC<Scene5Props> = ({ onContinue }) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [clockMinute, setClockMinute] = useState(120);

  const dialogues = [
    "WELL, HELLO THERE, VARIANT!",
    "Welcome to the Temporal Cloud Authority. Your timeline starts here!",
  ];

  useEffect(() => {
    soundManager.playTerminalBeep(950);

    // Switch to second dialogue line after 2.4 seconds
    const timer = setTimeout(() => {
      setDialogueIndex(1);
      soundManager.playTerminalBeep(1100);
    }, 2400);

    // Blinking timer
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3200);

    // Clock hands rotating
    const clockInterval = setInterval(() => {
      setClockMinute((prev) => (prev + 15) % 360);
    }, 400);

    return () => {
      clearTimeout(timer);
      clearInterval(blinkInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const handleContinue = () => {
    soundManager.playAnalogClick(800, 0.05);
    onContinue();
  };

  return (
    <div className="absolute inset-0 bg-[#100F0C] flex items-center justify-center overflow-hidden">
      {/* Background TVA Headquarters */}
      <div className="absolute inset-0 opacity-40">
        <img
          src="/assets/headquarters/tva_hq_wide.jpg"
          alt="TVA Headquarters"
          className="w-full h-full object-cover filter blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100F0C] via-[#100F0C]/80 to-[#100F0C]/90" />
      </div>

      <div className="relative z-20 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Animated Miss Minutes Character Bouncing In */}
        <motion.div
          initial={{ x: 120, opacity: 0, scale: 0.6 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 100 }}
          className="relative mb-6 cursor-pointer"
          whileHover={{ scale: 1.08 }}
        >
          {/* Miss Minutes Glow */}
          <div className="absolute inset-0 rounded-full bg-[#F07824] opacity-35 blur-xl animate-pulse" />

          {/* SVG Miss Minutes */}
          <svg
            className="w-36 h-36 sm:w-44 sm:h-44 filter drop-shadow-[0_12px_24px_rgba(240,120,36,0.6)]"
            viewBox="0 0 120 120"
            fill="none"
          >
            {/* Top Bells */}
            <path d="M28 22 C22 14, 38 4, 46 14 Z" fill="#F07824" stroke="#29251F" strokeWidth="2.5" />
            <path d="M92 22 C98 14, 82 4, 74 14 Z" fill="#F07824" stroke="#29251F" strokeWidth="2.5" />
            <rect x="57" y="10" width="6" height="8" rx="2" fill="#F6C453" stroke="#29251F" strokeWidth="2" />

            {/* Legs */}
            <path d="M38 100 L30 114 L24 114" stroke="#F07824" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="24" cy="114" rx="6" ry="3" fill="#29251F" />
            <path d="M82 100 L90 114 L96 114" stroke="#F07824" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="96" cy="114" rx="6" ry="3" fill="#29251F" />

            {/* Arms - Left Waving */}
            <path d="M16 62 Q6 44 12 34" stroke="#F07824" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <ellipse cx="12" cy="34" rx="7" ry="8" fill="#E8DFCA" stroke="#29251F" strokeWidth="2" />
            {/* Right on hip */}
            <path d="M104 62 Q114 72 108 82" stroke="#F07824" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <ellipse cx="107" cy="82" rx="5" ry="6" fill="#E8DFCA" stroke="#29251F" strokeWidth="2" />

            {/* Main Orange Clock Body */}
            <circle cx="60" cy="60" r="46" fill="#F07824" stroke="#29251F" strokeWidth="3.5" />
            {/* Clock Face */}
            <circle cx="60" cy="60" r="38" fill="#FDEBB8" stroke="#F6C453" strokeWidth="2" />

            {/* Dial markers */}
            <circle cx="60" cy="28" r="2" fill="#29251F" />
            <circle cx="92" cy="60" r="2" fill="#29251F" />
            <circle cx="60" cy="92" r="2" fill="#29251F" />
            <circle cx="28" cy="60" r="2" fill="#29251F" />

            {/* Clock hands */}
            <g transform={`rotate(${clockMinute} 60 60)`}>
              <line x1="60" y1="60" x2="60" y2="34" stroke="#29251F" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <line x1="60" y1="60" x2="74" y2="52" stroke="#F07824" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="60" cy="60" r="3.5" fill="#29251F" />

            {/* Eyes */}
            {/* Left Eye */}
            <ellipse cx="48" cy="48" rx="9" ry="13" fill="#FFFFFF" stroke="#29251F" strokeWidth="2" />
            {!isBlinking ? (
              <>
                <ellipse cx="49" cy="49" rx="5" ry="7" fill="#29251F" />
                <circle cx="47" cy="46" r="2" fill="#FFFFFF" />
              </>
            ) : (
              <line x1="39" y1="48" x2="57" y2="48" stroke="#29251F" strokeWidth="2.5" strokeLinecap="round" />
            )}
            <path d="M41 33 Q48 30 55 35" stroke="#29251F" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Right Eye */}
            <ellipse cx="72" cy="48" rx="9" ry="13" fill="#FFFFFF" stroke="#29251F" strokeWidth="2" />
            {!isBlinking ? (
              <>
                <ellipse cx="73" cy="49" rx="5" ry="7" fill="#29251F" />
                <circle cx="71" cy="46" r="2" fill="#FFFFFF" />
              </>
            ) : (
              <line x1="63" y1="48" x2="81" y2="48" stroke="#29251F" strokeWidth="2.5" strokeLinecap="round" />
            )}
            <path d="M65 35 Q72 30 79 33" stroke="#29251F" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Cheeks */}
            <ellipse cx="38" cy="64" rx="4" ry="2.5" fill="#F87171" opacity="0.6" />
            <ellipse cx="82" cy="64" rx="4" ry="2.5" fill="#F87171" opacity="0.6" />

            {/* Smile */}
            <path d="M44 68 Q60 84 76 68" stroke="#29251F" strokeWidth="2.8" strokeLinecap="round" fill="#B91C1C" />
            <rect x="56" y="68" width="8" height="4" rx="1" fill="#FFFFFF" />
          </svg>
        </motion.div>

        {/* Speech Bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={dialogueIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1A1814] border-2 border-[#F07824] p-5 sm:p-6 shadow-tva-glow-lg max-w-lg mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-2 text-xs font-mono text-[#F6C453] font-bold">
              <Sparkles className="w-4 h-4 text-[#F07824]" />
              <span>OFFICIAL WELCOME PROTOCOL</span>
            </div>
            <p className="font-bebas text-2xl sm:text-3xl tracking-wide text-[#E8DFCA] leading-snug">
              "{dialogues[dialogueIndex]}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          onClick={handleContinue}
          className="group px-8 py-3.5 bg-gradient-to-r from-[#F07824] to-[#F6C453] text-[#100F0C] font-bebas text-2xl tracking-widest font-bold shadow-tva-glow hover:shadow-gold-glow transition-all flex items-center gap-3 border border-[#E8DFCA]"
        >
          <span>CONTINUE TO EVENT REVEAL</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>
    </div>
  );
};
