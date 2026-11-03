import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, Terminal, Zap, Shield, Waves, Radio } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { TimekeeperCharacter } from './TimekeeperCharacter';
import { GoldenTimelineEffect, PalmAnchor } from './GoldenTimelineEffect';
import { TemporalParticleSystem } from './TemporalParticleSystem';
import { TemporalState } from './GoldenPalmEnergy';

interface ArchitectOfTimeHeroProps {
  onRegisterClick?: () => void;
  onExploreClick?: () => void;
  isIntroScene?: boolean; // If true, used in cinematic intro
}

// 1. Astrolabe Roman Numeral Clock Dial (Centered behind Timekeeper)
const RomanNumeralLoomDial: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const romanNumerals = [
    'XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 overflow-hidden select-none">
      <div className="relative w-[480px] h-[480px] sm:w-[680px] sm:h-[680px] md:w-[860px] md:h-[860px] -translate-y-8 sm:-translate-y-12 md:-translate-y-16">
        {/* Soft radial emerald ambient backglow */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.22)_0%,rgba(16,185,129,0.06)_45%,transparent_70%)] blur-3xl pointer-events-none" />

        {/* Outer Rotating Astrolabe Ring with Roman Numerals */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-[#10B981]/30"
        >
          {romanNumerals.map((num, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const radius = 46.5; // percentage
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            return (
              <span
                key={num}
                className="absolute font-cinzel text-[11px] sm:text-xs md:text-sm text-[#10B981]/75 font-bold -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                }}
              >
                {num}
              </span>
            );
          })}
        </motion.div>

        {/* Outer Gear Teeth / Radial Ticks */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[4%] rounded-full border border-dashed border-[#F6C453]/20"
        />

        {/* Middle Dashed Chrono Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[10%] rounded-full border border-dotted border-[#10B981]/25"
        />

        {/* Inner Compass Cardinals and Astrolabe Geometry */}
        <div className="absolute inset-[18%] rounded-full border border-[#10B981]/15 flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#10B981]/30 to-transparent absolute" />
          <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-[#10B981]/30 to-transparent absolute" />
          <div className="absolute inset-[25%] rounded-full border border-[#F6C453]/15" />
        </div>
      </div>
    </div>
  );
};

// 2. Holographic Clock Target Reticle inside the 'O' of CHRONOVERSE
const HolographicClockTarget: React.FC = () => {
  return (
    <span className="inline-flex items-center justify-center relative w-[0.88em] h-[0.88em] mx-[0.05em] align-middle -translate-y-[0.06em]">
      {/* Outer target reticle with tick marks */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-[#00FF88] filter drop-shadow-[0_0_12px_rgba(0,255,136,0.9)] animate-spin-slow"
        style={{ animationDuration: '35s' }}
      >
        {/* Outer Circle */}
        <circle cx="50" cy="50" r="44" stroke="#00FF88" strokeWidth="3" fill="none" opacity="0.95" />
        {/* Middle Dashed Ring */}
        <circle cx="50" cy="50" r="36" stroke="#34D399" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.8" />
        {/* Cardinal Tick Marks */}
        <line x1="50" y1="2" x2="50" y2="10" stroke="#00FF88" strokeWidth="3.5" />
        <line x1="50" y1="90" x2="50" y2="98" stroke="#00FF88" strokeWidth="3.5" />
        <line x1="2" y1="50" x2="10" y2="50" stroke="#00FF88" strokeWidth="3.5" />
        <line x1="90" y1="50" x2="98" y2="50" stroke="#00FF88" strokeWidth="3.5" />
        {/* 12-hour dots */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={50 + 40 * Math.cos(a)}
              cy={50 + 40 * Math.sin(a)}
              r="1.8"
              fill="#FFFFFF"
            />
          );
        })}
      </svg>
      {/* Center Clock Hands (Ticking/Rotating) */}
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Hour Hand */}
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[2px] h-[30%] bg-[#FFFFFF] rounded origin-bottom mb-[30%] shadow-[0_0_8px_#FFFFFF]"
        />
        {/* Minute Hand */}
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[1.5px] h-[40%] bg-[#00FF88] rounded origin-bottom mb-[40%] shadow-[0_0_10px_#00FF88]"
        />
        {/* Center Pivot */}
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF] shadow-[0_0_10px_#00FF88]" />
      </span>
    </span>
  );
};

export const ArchitectOfTimeHero: React.FC<ArchitectOfTimeHeroProps> = ({
  onRegisterClick,
  onExploreClick,
  isIntroScene = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mobile detection
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Temporal State Management (Section 8: Default 'timeline_control' as in reference screenshot)
  const [temporalState, setTemporalState] = useState<TemporalState>('timeline_control');
  const [surgeTrigger, setSurgeTrigger] = useState<number>(0);
  const [autoCycle, setAutoCycle] = useState<boolean>(true);

  // Palm positions tracked in hero container coordinate space
  const [palmPositions, setPalmPositions] = useState<{ left: PalmAnchor; right: PalmAnchor }>({
    left: { x: 300, y: 350 },
    right: { x: 724, y: 350 },
  });

  const handlePalmPositionsUpdate = useCallback((left: PalmAnchor, right: PalmAnchor) => {
    setPalmPositions({ left, right });
  }, []);

  // Auto-Cycle through character interaction states (Section 8)
  useEffect(() => {
    if (!autoCycle) return;

    let timeoutId: NodeJS.Timeout;

    if (temporalState === 'idle') {
      timeoutId = setTimeout(() => {
        setTemporalState('power_activation');
        soundManager.playTerminalBeep(520);
      }, 6500);
    } else if (temporalState === 'power_activation') {
      timeoutId = setTimeout(() => {
        setTemporalState('timeline_control');
        soundManager.playTerminalBeep(840);
      }, 4500);
    } else if (temporalState === 'timeline_control') {
      timeoutId = setTimeout(() => {
        setTemporalState('temporal_surge');
        setSurgeTrigger((prev) => prev + 1);
        soundManager.playPortalWarp();
      }, 6000);
    } else if (temporalState === 'temporal_surge') {
      timeoutId = setTimeout(() => {
        // Return smoothly to timeline_control or idle
        setTemporalState('timeline_control');
        soundManager.playAnalogClick(400, 0.04);
      }, 3500);
    }

    return () => clearTimeout(timeoutId);
  }, [temporalState, autoCycle]);

  const handleStateSelect = (state: TemporalState) => {
    setAutoCycle(false);
    setTemporalState(state);
    if (state === 'temporal_surge') {
      setSurgeTrigger((prev) => prev + 1);
      soundManager.playPortalWarp();
    } else if (state === 'power_activation') {
      soundManager.playTerminalBeep(520);
    } else if (state === 'timeline_control') {
      soundManager.playTerminalBeep(840);
    } else {
      soundManager.playAnalogClick(620, 0.05);
    }
  };

  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 59,
    seconds: 14,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Three.js Background Architectural Rings & Deep Chamber Ambience
  useEffect(() => {
    const canvas = threeCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x100f0c, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5));

    // TVA Chamber Ambient & Emerald Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0x19251f, 1.2);
    scene.add(ambientLight);

    const domeLight = new THREE.PointLight(0x10b981, 2.5, 20);
    domeLight.position.set(0, 5, -2);
    scene.add(domeLight);

    // Chamber Circular Architecture (Background Rings)
    const ringGroup = new THREE.Group();
    const ringMat1 = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.18,
    });
    const ringMat2 = new THREE.LineDashedMaterial({
      color: 0xf6c453,
      transparent: true,
      opacity: 0.14,
      dashSize: 0.4,
      gapSize: 0.2,
    });

    const ringCount = isMobile ? 2 : 4;
    for (let r = 0; r < ringCount; r++) {
      const radius = 3.8 + r * 1.8;
      const ringGeo = new THREE.BufferGeometry();
      const points = [];
      const segs = isMobile ? 40 : 80;
      for (let s = 0; s <= segs; s++) {
        const theta = (s / segs) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, -4 - r * 1.5));
      }
      ringGeo.setFromPoints(points);
      const ring = new THREE.Line(ringGeo, r % 2 === 0 ? ringMat1 : ringMat2);
      if (r % 2 !== 0) ring.computeLineDistances();
      ringGroup.add(ring);
    }
    scene.add(ringGroup);

    let animId: number;
    let time = 0;

    const animate = () => {
      time += 0.015;
      ringGroup.rotation.z = time * 0.02;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleWindowResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleWindowResize);
      renderer.dispose();
      ringGroup.children.forEach((c) => {
        if (c instanceof THREE.Line) {
          c.geometry.dispose();
        }
      });
    };
  }, [isMobile]);

  const handleRegister = () => {
    soundManager.playAnalogClick(750, 0.05);
    if (onRegisterClick) onRegisterClick();
  };

  const handleExplore = () => {
    soundManager.playAnalogClick(600, 0.05);
    if (onExploreClick) onExploreClick();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden select-none bg-[#100F0C] flex flex-col justify-between"
    >
      {/* 1. Deep Atmospheric TVA Chamber Background (Architectural Lighting & Gradients) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#100F0C]/85 via-transparent to-[#100F0C] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(16,185,129,0.22)_0%,rgba(16,15,12,0.95)_75%)] z-0" />
      </div>

      {/* 2. Three.js Background Architectural Rings Canvas */}
      <canvas
        ref={threeCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 3. Background Temporal Loom Astrolabe Clock Dial with Roman Numerals */}
      <RomanNumeralLoomDial isMobile={isMobile} />

      {/* 4. Temporal Particle System (Cosmic golden embers, mouse reactive, mobile throttled) */}
      <TemporalParticleSystem
        state={temporalState}
        surgeTrigger={surgeTrigger}
        isMobile={isMobile}
        className="z-5"
      />

      {/* 5. Golden & Emerald Timeline Strands (Emerging directly from both palms, curving & branching into edges) */}
      <GoldenTimelineEffect
        leftPalm={palmPositions.left}
        rightPalm={palmPositions.right}
        state={temporalState}
        surgeTrigger={surgeTrigger}
        isMobile={isMobile}
        className="z-10"
      />

      {/* 6. Central Living Timekeeper Character (Exact image, idle float, breathing, blinking, glowing palms) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none pt-4 sm:pt-6 md:pt-8">
        <TimekeeperCharacter
          state={temporalState}
          onPalmPositionsUpdate={handlePalmPositionsUpdate}
          isMobile={isMobile}
          className="translate-y-[-10px] sm:translate-y-[-16px] md:translate-y-[-24px]"
        />
      </div>

      {/* 7. Top Telemetry Pill & Interaction State Bar */}
      <div className="relative z-30 pt-12 sm:pt-14 px-4 text-center flex flex-col items-center gap-2">
        {!isIntroScene && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#10B981]/50 bg-[#141814]/90 backdrop-blur-md text-[#34D399] text-[11px] font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.35)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span>TEMPORAL CLOUD AUTHORITY // TIMEKEEPER ONLINE</span>
          </motion.div>
        )}

        {/* Section 8: Interactive Character State Switcher HUD */}
        {!isIntroScene && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-1 sm:gap-1.5 p-1 rounded-lg border border-[#10B981]/30 bg-[#141814]/90 backdrop-blur-md shadow-panel text-[9px] sm:text-[10px] font-mono tracking-wider pointer-events-auto max-w-[95vw] overflow-x-auto"
          >
            <span className="text-[#E8DFCA]/60 px-1.5 sm:px-2 flex items-center gap-1 uppercase whitespace-nowrap">
              <Radio className="w-3 h-3 text-[#10B981] animate-pulse" />
              <span className="hidden sm:inline">CHRONO MODE:</span>
              <span className="sm:hidden">MODE:</span>
            </span>

            <button
              onClick={() => handleStateSelect('idle')}
              className={`px-2 sm:px-2.5 py-1 rounded transition-all flex items-center gap-1 whitespace-nowrap ${
                temporalState === 'idle'
                  ? 'bg-[#10B981] text-[#100F0C] font-bold shadow-[0_0_15px_rgba(16,185,129,0.7)]'
                  : 'text-[#E8DFCA]/70 hover:text-[#34D399] hover:bg-[#25211A]'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span>IDLE</span>
            </button>

            <button
              onClick={() => handleStateSelect('power_activation')}
              className={`px-2 sm:px-2.5 py-1 rounded transition-all flex items-center gap-1 whitespace-nowrap ${
                temporalState === 'power_activation'
                  ? 'bg-[#10B981] text-[#100F0C] font-bold shadow-[0_0_15px_rgba(16,185,129,0.7)]'
                  : 'text-[#E8DFCA]/70 hover:text-[#34D399] hover:bg-[#25211A]'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>POWER</span>
            </button>

            <button
              onClick={() => handleStateSelect('timeline_control')}
              className={`px-2 sm:px-2.5 py-1 rounded transition-all flex items-center gap-1 whitespace-nowrap ${
                temporalState === 'timeline_control'
                  ? 'bg-[#10B981] text-[#100F0C] font-bold shadow-[0_0_18px_rgba(16,185,129,0.85)]'
                  : 'text-[#E8DFCA]/70 hover:text-[#34D399] hover:bg-[#25211A]'
              }`}
            >
              <Waves className="w-3 h-3" />
              <span>TIMELINES</span>
            </button>

            <button
              onClick={() => handleStateSelect('temporal_surge')}
              className={`px-2 sm:px-2.5 py-1 rounded transition-all flex items-center gap-1 whitespace-nowrap ${
                temporalState === 'temporal_surge'
                  ? 'bg-[#00FF88] text-[#100F0C] font-bold shadow-[0_0_20px_rgba(0,255,136,0.95)] animate-pulse'
                  : 'text-[#E8DFCA]/70 hover:text-[#34D399] hover:bg-[#25211A]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>SURGE</span>
            </button>

            <button
              onClick={() => setAutoCycle(!autoCycle)}
              title="Toggle automatic state cycling"
              className={`px-1.5 sm:px-2 py-1 rounded transition-all ml-0.5 sm:ml-1 text-[8px] sm:text-[9px] border whitespace-nowrap ${
                autoCycle
                  ? 'border-[#10B981]/50 text-[#10B981] bg-[#10B981]/10'
                  : 'border-[#E8DFCA]/20 text-[#E8DFCA]/40'
              }`}
            >
              {autoCycle ? 'AUTO' : 'MANUAL'}
            </button>
          </motion.div>
        )}
      </div>

      {/* 8. Lower Third Typography & CTA Actions (Positioned strictly below character) */}
      <div className="relative z-30 pb-5 sm:pb-7 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center mt-auto pointer-events-auto">
        {isIntroScene ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-1.5 mb-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#141814]/90 border border-[#10B981]/40 text-[#34D399] text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.35)]">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span>HOLDING THE INFINITE MULTIVERSE TOGETHER</span>
            </div>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bebas tracking-widest text-[#E8DFCA] text-tva-glow">
              EVERY STRAND. EVERY LIFE. EVERY CLOUD.
            </h3>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="space-y-1"
          >
            <div className="text-[11px] sm:text-xs font-mono text-[#E8DFCA]/75 tracking-widest uppercase font-semibold">
              TEMPORAL CLOUD AUTHORITY
            </div>

            {/* CHRON(O)VERSE Title with Holographic Target Clock in the letter 'O' */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bebas tracking-wider text-[#FFFFFF] drop-shadow-[0_0_35px_rgba(0,255,136,0.85)] leading-none inline-flex items-center justify-center">
              <span>CHRON</span>
              <HolographicClockTarget />
              <span>VERSE</span>
            </h1>

            <div className="flex items-center justify-center gap-3 sm:gap-6 my-0.5">
              <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#10B981]" />
              <h2 className="text-base sm:text-xl md:text-2xl font-bebas tracking-widest text-[#E8DFCA]">
                AWS STUDENT COMMUNITY DAY — PUNE
              </h2>
              <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#10B981]" />
            </div>

            <p className="text-base sm:text-xl font-bebas tracking-widest text-[#10B981] pt-0.5 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]">
              EVERY TIMELINE BUILDS THE CLOUD.
            </p>
          </motion.div>
        )}

        {/* Action Buttons & Countdown */}
        {!isIntroScene && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-4"
          >
            <button
              onClick={handleRegister}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#059669] text-[#100F0C] font-bebas text-xl sm:text-2xl tracking-widest font-bold shadow-[0_0_30px_rgba(16,185,129,0.75)] hover:shadow-[0_0_50px_rgba(52,211,153,0.95)] transition-all hover:scale-105 active:scale-95 border-2 border-[#E8DFCA] flex items-center justify-center gap-3 rounded"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-5 h-5 text-[#100F0C]" />
            </button>

            <button
              onClick={handleExplore}
              className="w-full sm:w-auto px-7 py-3 bg-[#161410]/85 hover:bg-[#201D17] text-[#E8DFCA] hover:text-[#34D399] font-bebas text-xl sm:text-2xl tracking-widest border border-[#10B981]/50 backdrop-blur-md transition-all hover:border-[#34D399] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.25)] rounded"
            >
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span>EXPLORE THE EVENT</span>
            </button>
          </motion.div>
        )}

        {/* Live Countdown Row */}
        {!isIntroScene && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#E8DFCA]/70"
          >
            <div className="flex items-center gap-2 px-3 py-1 bg-[#14120E] border border-[#10B981]/40 rounded">
              <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
              <span>&gt; CONVERGENCE IN: <strong className="text-[#10B981]">{timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M {timeLeft.seconds}S</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#14120E] border border-[#10B981]/40 rounded">
              <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
              <span>PUNE, MAHARASHTRA</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};