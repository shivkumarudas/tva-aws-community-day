import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scene1Void } from './Scene1Void';
import { Scene2LokiTimelines } from './Scene2LokiTimelines';
import { Scene3TemporalActivation } from './Scene3TemporalActivation';
import { soundManager } from '../../utils/sound';
import { Volume2, VolumeX, FastForward, RotateCcw } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    return soundManager.subscribe((muted) => setIsMuted(muted));
  }, []);

  // Smooth, streamlined 3-step sequence: VOID -> LOKI -> PORTAL -> ENTER CHRONOVERSE!
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (currentScene === 1) {
      // Scene 1: Void (3.4 seconds)
      timer = setTimeout(() => {
        setCurrentScene(2);
        soundManager.playTerminalBeep(880);
      }, 3400);
    } else if (currentScene === 2) {
      // Scene 2: Timekeeper Loki & Multiverse Timelines (5.5 seconds)
      timer = setTimeout(() => {
        setCurrentScene(3);
        soundManager.playPortalWarp();
      }, 5500);
    } else if (currentScene === 3) {
      // Scene 3: Dimensional Portal Warp (4.2 seconds) -> Direct Entry into CHRONOVERSE!
      timer = setTimeout(() => {
        soundManager.playAccessGranted();
        onComplete();
      }, 4200);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [currentScene, onComplete]);

  // Progress bar updater across the 3 cinematic scenes (~13.1s total)
  useEffect(() => {
    const totalDuration = 13100;
    const intervalTime = 50;
    const increment = (intervalTime / totalDuration) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, prev + increment);
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    soundManager.playAnalogClick(500, 0.05);
    onComplete();
  };

  const handleToggleSound = () => {
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
  };

  const handleRestart = () => {
    soundManager.playAnalogClick(700, 0.05);
    setProgress(0);
    setCurrentScene(1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#100F0C] select-none overflow-hidden">
      {/* Top Floating Controls Bar */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        {/* Replay Button */}
        <button
          onClick={handleRestart}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1A1814]/80 hover:bg-[#29251F] border border-[#10B981]/40 text-[#E8DFCA] hover:text-[#10B981] text-xs font-mono transition-all backdrop-blur-md shadow"
          title="Restart Cinematic Sequence"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">RESTART</span>
        </button>

        {/* Audio Toggle Button */}
        <button
          onClick={handleToggleSound}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono transition-all backdrop-blur-md shadow ${
            !isMuted
              ? 'bg-[#10B981]/20 border-[#10B981] text-[#34D399]'
              : 'bg-[#1A1814]/80 border-[#42452C] text-[#E8DFCA]/60 hover:text-[#E8DFCA]'
          }`}
          title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
        >
          {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-[#10B981]" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{!isMuted ? 'AUDIO ON' : 'AUDIO OFF'}</span>
        </button>

        {/* Skip Intro Button */}
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#059669] hover:brightness-110 text-[#100F0C] font-mono font-bold text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.7)]"
        >
          <span>ENTER CHRONOVERSE</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress Timeline Indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A1814] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#00FF88] transition-all duration-75 shadow-[0_0_12px_rgba(0,255,136,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Streamlined Scene Navigation Pill Indicators (01 VOID, 02 LOKI, 03 PORTAL) */}
      <div className="absolute bottom-4 left-6 z-50 flex items-center gap-1.5 text-[10px] font-mono text-[#E8DFCA]/60">
        {[
          { id: 1, label: '01 VOID' },
          { id: 2, label: '02 LOKI' },
          { id: 3, label: '03 PORTAL' },
        ].map((s, idx) => (
          <React.Fragment key={s.id}>
            {idx > 0 && <span className="text-[#42452C]">&bull;</span>}
            <button
              onClick={() => {
                soundManager.playAnalogClick(600, 0.04);
                setCurrentScene(s.id);
              }}
              className={`px-2.5 py-1 rounded transition-all pointer-events-auto ${
                currentScene === s.id
                  ? 'bg-[#10B981] text-[#100F0C] font-bold shadow-[0_0_15px_rgba(16,185,129,0.7)]'
                  : 'border border-[#42452C] hover:border-[#10B981] hover:text-[#10B981]'
              }`}
            >
              {s.label}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Active Scene Transition Container */}
      <AnimatePresence mode="wait">
        {currentScene === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Scene1Void />
          </motion.div>
        )}

        {currentScene === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Scene2LokiTimelines />
          </motion.div>
        )}

        {currentScene === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Scene3TemporalActivation />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
