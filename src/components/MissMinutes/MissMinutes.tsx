import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../../utils/sound';
import { X, ChevronDown, ChevronUp, Compass, Calendar, Users, Cpu, Ticket, Sparkles, Minimize2, Maximize2 } from 'lucide-react';

export type MascotExpression = 'friendly' | 'excited' | 'curious' | 'thinking' | 'wink';

interface MissMinutesProps {
  currentSection?: string;
  onNavigate?: (sectionId: string) => void;
  externalDialogue?: string | null;
}

export const MissMinutes: React.FC<MissMinutesProps> = ({
  currentSection = 'home',
  onNavigate,
  externalDialogue = null,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [dialogue, setDialogue] = useState("Well, hello there, Variant! Welcome to the Temporal Cloud Authority!");
  const [showSpeech, setShowSpeech] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [expression, setExpression] = useState<MascotExpression>('friendly');
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [clockAngle, setClockAngle] = useState({ hour: 45, minute: 180 });
  const clockRef = useRef<HTMLDivElement | null>(null);

  // Section-based dialogues matching user specifications
  const sectionData: Record<string, { text: string; expr: MascotExpression }> = {
    home: {
      text: "Well, hello there, Variant! Welcome to the Temporal Cloud Authority. Your timeline starts here!",
      expr: 'friendly',
    },
    about: {
      text: "Curious about this timeline? Let me show you around the classified archives!",
      expr: 'curious',
    },
    dashboard: {
      text: "This is central telemetry! Keep an eye on that nexus variance, darlin'!",
      expr: 'thinking',
    },
    agenda: {
      text: "Your schedule is waiting, Variant! Check out the Sacred Timeline!",
      expr: 'excited',
    },
    speakers: {
      text: "Meet the brilliant minds and identified variants shaping this timeline!",
      expr: 'friendly',
    },
    workshops: {
      text: "Time to upgrade your technical skills with authorized missions!",
      expr: 'excited',
    },
    sponsors: {
      text: "Our official partners keep the multiversal cloud engines humming!",
      expr: 'wink',
    },
    register: {
      text: "Don't miss your chance to secure temporal access before this timeline prunes!",
      expr: 'excited',
    },
    gallery: {
      text: "Look at all these historic timeline moments declassified just for you!",
      expr: 'curious',
    },
    faq: {
      text: "Got questions? The TVA has answers for all authorized variants!",
      expr: 'friendly',
    },
  };

  // Update dialogue and expression based on current section
  useEffect(() => {
    if (externalDialogue) {
      setDialogue(externalDialogue);
      setExpression('wink');
      setShowSpeech(true);
      return;
    }

    if (currentSection && sectionData[currentSection]) {
      setDialogue(sectionData[currentSection].text);
      setExpression(sectionData[currentSection].expr);
      setShowSpeech(true);
    }
  }, [currentSection, externalDialogue]);

  // Natural blinking timer
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 190);
    }, 3600);
    return () => clearInterval(blinkInterval);
  }, []);

  // Moving clock hands
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setClockAngle((prev) => ({
        minute: (prev.minute + 6) % 360,
        hour: (prev.hour + 0.5) % 360,
      }));
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Eye tracking: calculate angle from clock face to mouse pointer
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!clockRef.current) return;
      const rect = clockRef.current.getBoundingClientRect();
      const clockCenterX = rect.left + rect.width / 2;
      const clockCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - clockCenterX;
      const dy = e.clientY - clockCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxRadius = 4.5; // Max pupil travel distance in pixels

      if (dist === 0) {
        setPupilOffset({ x: 0, y: 0 });
      } else {
        const factor = Math.min(dist / 220, 1) * maxRadius;
        setPupilOffset({
          x: (dx / dist) * factor,
          y: (dy / dist) * factor,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClickMascot = () => {
    soundManager.playAnalogClick(880, 0.04);
    soundManager.playTerminalBeep(1400);
    setExpression('excited');
    setShowMenu(!showMenu);
    setShowSpeech(true);
  };

  const handleMenuSelect = (sectionId: string) => {
    soundManager.playAnalogClick(700, 0.04);
    setShowMenu(false);
    setExpression('friendly');
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playAnalogClick(600, 0.03);
    setIsMinimized(!isMinimized);
    setShowMenu(false);
    setShowSpeech(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none flex flex-col items-end pointer-events-auto">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeech && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.3 }}
            className="mb-3 max-w-xs sm:max-w-sm bg-[#1A1814] border-2 border-[#F07824] p-4 shadow-tva-glow-lg relative text-left"
          >
            {/* Speech bubble pointer arrow */}
            <div className="absolute -bottom-2.5 right-12 w-4 h-4 bg-[#1A1814] border-r-2 border-b-2 border-[#F07824] transform rotate-45" />

            {/* Top controls of bubble */}
            <div className="flex items-center justify-between border-b border-[#42452C] pb-1.5 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F07824] animate-ping" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F6C453] font-bold">
                  MISS MINUTES BROADCAST
                </span>
              </div>
              <button
                onClick={() => setShowSpeech(false)}
                className="text-[#E8DFCA]/60 hover:text-[#F6C453] transition-colors p-0.5"
                aria-label="Dismiss speech"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="font-mono text-xs sm:text-sm text-[#E8DFCA] leading-snug">
              "{dialogue}"
            </p>

            <div className="mt-2.5 pt-2 border-t border-[#42452C]/60 flex items-center justify-between text-[10px] font-mono text-[#F07824]">
              <span className="cursor-pointer hover:underline" onClick={() => setShowMenu(true)}>
                &gt; OPEN DIRECTORY
              </span>
              <span className="text-[#10B981]">FOR ALL TIME. ALWAYS.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Assistant Menu Drawer */}
      <AnimatePresence>
        {showMenu && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="mb-3 w-64 bg-[#14120E] border-2 border-[#F6C453] p-3.5 shadow-panel text-left"
          >
            <div className="flex items-center justify-between border-b border-[#42452C] pb-2 mb-2 text-xs font-mono text-[#F6C453] font-bold">
              <span>TEMPORAL NAVIGATOR</span>
              <button
                onClick={() => setShowMenu(false)}
                className="text-[#E8DFCA]/60 hover:text-[#E8DFCA]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <button
                onClick={() => handleMenuSelect('about')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded hover:bg-[#29251F] text-[#E8DFCA] hover:text-[#F6C453] transition-colors text-left"
              >
                <Compass className="w-4 h-4 text-[#F07824]" />
                <span>Explore Event</span>
              </button>

              <button
                onClick={() => handleMenuSelect('agenda')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded hover:bg-[#29251F] text-[#E8DFCA] hover:text-[#F6C453] transition-colors text-left"
              >
                <Calendar className="w-4 h-4 text-[#F07824]" />
                <span>View Agenda</span>
              </button>

              <button
                onClick={() => handleMenuSelect('speakers')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded hover:bg-[#29251F] text-[#E8DFCA] hover:text-[#F6C453] transition-colors text-left"
              >
                <Users className="w-4 h-4 text-[#F07824]" />
                <span>Meet Speakers</span>
              </button>

              <button
                onClick={() => handleMenuSelect('workshops')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded hover:bg-[#29251F] text-[#E8DFCA] hover:text-[#F6C453] transition-colors text-left"
              >
                <Cpu className="w-4 h-4 text-[#F07824]" />
                <span>Explore Workshops</span>
              </button>

              <button
                onClick={() => handleMenuSelect('register')}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded bg-[#F07824] hover:bg-[#FFA04D] text-[#100F0C] font-bold transition-colors text-left mt-2"
              >
                <Ticket className="w-4 h-4 fill-current" />
                <span>Register Now</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Mascot Body */}
      {isMinimized ? (
        <button
          onClick={toggleMinimize}
          className="px-3 py-1.5 rounded-full bg-[#1A1814] border-2 border-[#F07824] text-xs font-mono text-[#F6C453] flex items-center gap-2 shadow-tva-glow hover:scale-105 transition-all"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#F07824] animate-ping" />
          <span>MISS MINUTES</span>
          <Maximize2 className="w-3.5 h-3.5 text-[#E8DFCA]" />
        </button>
      ) : (
        <div className="relative flex flex-col items-center">
          {/* Minimize button */}
          <button
            onClick={toggleMinimize}
            className="absolute -top-3 -right-1 z-30 p-1 rounded-full bg-[#14120E] border border-[#42452C] hover:border-[#F07824] text-[#E8DFCA]/70 hover:text-[#F6C453] transition-colors shadow"
            title="Minimize Miss Minutes"
          >
            <Minimize2 className="w-3 h-3" />
          </button>

          {/* Character Container with Hover/Click Animations */}
          <motion.div
            ref={clockRef}
            animate={{
              y: [0, -9, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.2,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClickMascot}
            className="relative cursor-pointer group flex items-center justify-center"
          >
            {/* Glow halo */}
            <div className="absolute inset-0 rounded-full bg-[#F07824] opacity-30 blur-xl group-hover:opacity-70 transition-opacity" />

            {/* Miss Minutes Character SVG with Expression Engine */}
            <svg
              className="w-22 h-22 sm:w-24 sm:h-24 filter drop-shadow-[0_8px_18px_rgba(240,120,36,0.55)]"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Retro Top Bells */}
              <path d="M28 22 C22 14, 38 4, 46 14 Z" fill="#F07824" stroke="#29251F" strokeWidth="2.5" />
              <path d="M92 22 C98 14, 82 4, 74 14 Z" fill="#F07824" stroke="#29251F" strokeWidth="2.5" />
              <rect x="57" y="10" width="6" height="8" rx="2" fill="#F6C453" stroke="#29251F" strokeWidth="2" />

              {/* Legs */}
              <path d="M38 100 L30 114 L24 114" stroke="#F07824" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="24" cy="114" rx="6" ry="3" fill="#29251F" />
              <path d="M82 100 L90 114 L96 114" stroke="#F07824" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="96" cy="114" rx="6" ry="3" fill="#29251F" />

              {/* Arms */}
              <path d="M16 62 Q6 48 10 38" stroke="#F07824" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <ellipse cx="10" cy="38" rx="6" ry="7" fill="#E8DFCA" stroke="#29251F" strokeWidth="2" />

              <path d="M104 62 Q114 72 108 82" stroke="#F07824" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <ellipse cx="107" cy="82" rx="5" ry="6" fill="#E8DFCA" stroke="#29251F" strokeWidth="2" />

              {/* Main Orange Clock Body */}
              <circle cx="60" cy="60" r="46" fill="#F07824" stroke="#29251F" strokeWidth="3.5" />

              {/* Inner Cream Clock Face */}
              <circle cx="60" cy="60" r="38" fill="#FDEBB8" stroke="#F6C453" strokeWidth="2" />

              {/* Clock Dial Hour Markers */}
              <circle cx="60" cy="28" r="2" fill="#29251F" />
              <circle cx="92" cy="60" r="2" fill="#29251F" />
              <circle cx="60" cy="92" r="2" fill="#29251F" />
              <circle cx="28" cy="60" r="2" fill="#29251F" />

              {/* Rotating Analog Clock Hands */}
              <g transform={`rotate(${clockAngle.minute} 60 60)`}>
                <line x1="60" y1="60" x2="60" y2="34" stroke="#29251F" strokeWidth="2.5" strokeLinecap="round" />
              </g>
              <g transform={`rotate(${clockAngle.hour} 60 60)`}>
                <line x1="60" y1="60" x2="60" y2="44" stroke="#F07824" strokeWidth="3.5" strokeLinecap="round" />
              </g>
              <circle cx="60" cy="60" r="3.5" fill="#29251F" />

              {/* Left Eye */}
              <g>
                <ellipse cx="48" cy="48" rx="9" ry="13" fill="#FFFFFF" stroke="#29251F" strokeWidth="2" />
                {!isBlinking ? (
                  <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                    <ellipse cx="49" cy="49" rx="5" ry="7" fill="#29251F" />
                    <circle cx="47" cy="46" r="2" fill="#FFFFFF" />
                  </g>
                ) : (
                  <line x1="39" y1="48" x2="57" y2="48" stroke="#29251F" strokeWidth="2.5" strokeLinecap="round" />
                )}
                {/* Eyebrow according to expression */}
                {expression === 'curious' ? (
                  <path d="M41 31 Q48 26 55 33" stroke="#29251F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                ) : (
                  <path d="M41 33 Q48 30 55 35" stroke="#29251F" strokeWidth="2" strokeLinecap="round" fill="none" />
                )}
              </g>

              {/* Right Eye (Handles Wink Expression!) */}
              <g>
                {expression === 'wink' ? (
                  <path d="M63 48 Q72 56 81 48" stroke="#29251F" strokeWidth="3" strokeLinecap="round" fill="none" />
                ) : (
                  <>
                    <ellipse cx="72" cy="48" rx="9" ry="13" fill="#FFFFFF" stroke="#29251F" strokeWidth="2" />
                    {!isBlinking ? (
                      <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                        <ellipse cx="73" cy="49" rx="5" ry="7" fill="#29251F" />
                        <circle cx="71" cy="46" r="2" fill="#FFFFFF" />
                      </g>
                    ) : (
                      <line x1="63" y1="48" x2="81" y2="48" stroke="#29251F" strokeWidth="2.5" strokeLinecap="round" />
                    )}
                  </>
                )}
                <path d="M65 35 Q72 30 79 33" stroke="#29251F" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>

              {/* Rosy Cheeks */}
              <ellipse cx="38" cy="64" rx="4" ry="2.5" fill="#F87171" opacity="0.65" />
              <ellipse cx="82" cy="64" rx="4" ry="2.5" fill="#F87171" opacity="0.65" />

              {/* Mouth expressions */}
              {expression === 'excited' ? (
                // Big joyful open laugh mouth
                <>
                  <path d="M42 66 Q60 88 78 66 Z" fill="#B91C1C" stroke="#29251F" strokeWidth="2.5" />
                  <rect x="54" y="66" width="12" height="5" rx="1.5" fill="#FFFFFF" />
                </>
              ) : expression === 'thinking' ? (
                // Pensive pursed curve
                <path d="M48 72 Q60 70 72 74" stroke="#29251F" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              ) : (
                // Classic sweet cartoon smile
                <>
                  <path d="M44 68 Q60 84 76 68" stroke="#29251F" strokeWidth="2.8" strokeLinecap="round" fill="#B91C1C" />
                  <rect x="56" y="68" width="8" height="4" rx="1" fill="#FFFFFF" />
                </>
              )}
            </svg>

            {/* Small "Miss Minutes" Badge */}
            <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#100F0C] border border-[#F07824] text-[9px] font-mono text-[#F6C453] tracking-widest font-bold shadow whitespace-nowrap">
              MISS MINUTES
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
