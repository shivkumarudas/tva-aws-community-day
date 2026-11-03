import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoldenPalmEnergy, TemporalState } from './GoldenPalmEnergy';
import { PalmAnchor } from './GoldenTimelineEffect';
import { assetUrl } from '../../utils/assets';

interface TimekeeperCharacterProps {
  state: TemporalState;
  onPalmPositionsUpdate?: (left: PalmAnchor, right: PalmAnchor) => void;
  className?: string;
  isMobile?: boolean;
}

export const TimekeeperCharacter: React.FC<TimekeeperCharacterProps> = ({
  state,
  onPalmPositionsUpdate,
  className = '',
  isMobile = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);

  // Mouse parallax state
  const mouseRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    leftProximity: 0,
    rightProximity: 0,
  });

  const [proximities, setProximities] = useState({ left: 0, right: 0 });

  // Natural Blinking State
  const [blinkState, setBlinkState] = useState<{ isBlinking: boolean; progress: number }>({
    isBlinking: false,
    progress: 0,
  });
  const [eyeGazeOffset, setEyeGazeOffset] = useState({ x: 0, y: 0 });

  // 1. Mouse movement tracking (Desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const charEl = characterRef.current;
      if (!charEl) return;

      const rect = charEl.getBoundingClientRect();
      const normX = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
      const normY = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);

      mouseRef.current.targetX = Math.max(-1, Math.min(1, normX));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, normY));

      // Palm Proximity Calculation
      const leftPalmX = rect.left + rect.width * 0.1055;
      const leftPalmY = rect.top + rect.height * 0.668;
      const rightPalmX = rect.left + rect.width * 0.8945;
      const rightPalmY = rect.top + rect.height * 0.668;

      const distLeft = Math.hypot(e.clientX - leftPalmX, e.clientY - leftPalmY);
      const distRight = Math.hypot(e.clientX - rightPalmX, e.clientY - rightPalmY);

      const maxProximityDist = 240;
      const pLeft = Math.max(0, 1 - distLeft / maxProximityDist);
      const pRight = Math.max(0, 1 - distRight / maxProximityDist);

      mouseRef.current.leftProximity = pLeft;
      mouseRef.current.rightProximity = pRight;
      setProximities({ left: pLeft, right: pRight });

      // Subtle Gaze offset
      setEyeGazeOffset({
        x: Math.max(-1.2, Math.min(1.2, normX * 1.0)),
        y: Math.max(-0.8, Math.min(0.8, normY * 0.8)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // 2. Irregular Natural Blinking Engine
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    let animFrame: number;

    const triggerBlink = (isDouble = false) => {
      const startTime = performance.now();
      const closeDuration = 70; // ms
      const holdDuration = 25; // ms
      const openDuration = 85; // ms
      const totalDuration = closeDuration + holdDuration + openDuration;

      const step = (now: number) => {
        const elapsed = now - startTime;
        if (elapsed < closeDuration) {
          // Closing
          const p = elapsed / closeDuration;
          setBlinkState({ isBlinking: true, progress: p });
          animFrame = requestAnimationFrame(step);
        } else if (elapsed < closeDuration + holdDuration) {
          // Closed
          setBlinkState({ isBlinking: true, progress: 1.0 });
          animFrame = requestAnimationFrame(step);
        } else if (elapsed < totalDuration) {
          // Opening
          const p = 1.0 - (elapsed - closeDuration - holdDuration) / openDuration;
          setBlinkState({ isBlinking: true, progress: Math.max(0, p) });
          animFrame = requestAnimationFrame(step);
        } else {
          // Finished blink
          setBlinkState({ isBlinking: false, progress: 0 });
          if (isDouble) {
            // Short delay before second blink
            blinkTimeout = setTimeout(() => triggerBlink(false), 120);
          } else {
            // Schedule next irregular blink (2.6s to 6.2s)
            scheduleNextBlink();
          }
        }
      };

      animFrame = requestAnimationFrame(step);
    };

    const scheduleNextBlink = () => {
      const randomInterval = 2600 + Math.random() * 3600;
      const isDouble = Math.random() < 0.2; // 20% chance of double-blink
      blinkTimeout = setTimeout(() => triggerBlink(isDouble), randomInterval);
    };

    scheduleNextBlink();

    return () => {
      clearTimeout(blinkTimeout);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // 3. Coordinate Sync for Parent Timeline System
  const syncPalmPositions = useCallback(() => {
    if (!characterRef.current || !onPalmPositionsUpdate) return;
    const rect = characterRef.current.getBoundingClientRect();
    const heroEl = containerRef.current?.closest('section') || containerRef.current?.parentElement;
    const heroRect = heroEl?.getBoundingClientRect() || { left: 0, top: 0 };

    const lp: PalmAnchor = {
      x: rect.left - heroRect.left + rect.width * 0.1055,
      y: rect.top - heroRect.top + rect.height * 0.668,
    };
    const rp: PalmAnchor = {
      x: rect.left - heroRect.left + rect.width * 0.8945,
      y: rect.top - heroRect.top + rect.height * 0.668,
    };

    onPalmPositionsUpdate(lp, rp);
  }, [onPalmPositionsUpdate]);

  useEffect(() => {
    syncPalmPositions();
    window.addEventListener('resize', syncPalmPositions);
    return () => window.removeEventListener('resize', syncPalmPositions);
  }, [syncPalmPositions]);

  // 4. Character Parallax & Smooth Transform Loop
  useEffect(() => {
    let animId: number;
    const charEl = characterRef.current;
    if (!charEl) return;

    let time = 0;

    const animate = () => {
      time += 0.02;

      if (!isMobile) {
        // Damped lerp for mouse parallax
        mouseRef.current.currentX +=
          (mouseRef.current.targetX - mouseRef.current.currentX) * 0.06;
        mouseRef.current.currentY +=
          (mouseRef.current.targetY - mouseRef.current.currentY) * 0.06;
      } else {
        // Ambient sway for mobile
        mouseRef.current.currentX = Math.sin(time * 0.6) * 0.15;
        mouseRef.current.currentY = Math.cos(time * 0.5) * 0.1;
      }

      const rotY = mouseRef.current.currentX * 4.5;
      const rotX = -mouseRef.current.currentY * 3.5;
      const transX = mouseRef.current.currentX * 14;
      const transY = mouseRef.current.currentY * 8;

      // Subtle Idle Floating Animation (Section 1: Powerful and Calm)
      // Smooth vertical float: -6px to +4px
      const floatY = Math.sin(time * 0.85) * 5.0;
      // Very subtle scale variation (scale 1.0 to 1.006)
      const floatScale = 1.0 + Math.sin(time * 0.85) * 0.003;
      const floatTilt = Math.sin(time * 0.45) * 0.35;

      charEl.style.transform = `
        perspective(1000px)
        translate3d(${transX}px, ${transY + floatY}px, 0px)
        rotateX(${rotX}deg)
        rotateY(${rotY}deg)
        rotateZ(${floatTilt}deg)
        scale(${floatScale})
      `;

      // Occasionally sync palm positions when floating/tilting
      if (Math.random() < 0.08) {
        syncPalmPositions();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isMobile, syncPalmPositions]);

  // Character Image Source (resolved via base URL)
  const characterSrc = encodeURI(assetUrl('/assets/hero/Confident Conjurer in Brown Coat(1).png'));

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}
    >
      {/* Character Rigid Transform Hierarchy */}
      <div
        ref={characterRef}
        className="relative flex items-center justify-center will-change-transform"
        style={{
          width: isMobile ? 'min(115vw, 560px)' : 'min(94vw, 1024px)',
          aspectRatio: '2 / 1',
        }}
      >
        {/* Soft bottom edge feathering wrapper so the waist cut-off dissolves into the dark chamber */}
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, rgba(0, 0, 0, 0.3) 93%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 80%, rgba(0, 0, 0, 0.3) 93%, transparent 100%)',
          }}
        >
          {/* 2. BASE CHARACTER: Authentic Pristine PNG (Never distorted, proportions 100% preserved) */}
          <img
            src={characterSrc}
            alt="Loki - The Confident Timekeeper"
            className="absolute inset-0 w-full h-full object-contain filter contrast-105 drop-shadow-[0_15px_40px_rgba(240,120,36,0.35)]"
            style={{ zIndex: 10 }}
          />

          {/* 3. BREATHING EFFECT LAYER (Section 2: Subtle chest & shoulder illusion) */}
          {/* Isolated feathered chest layer rising and falling organically */}
          <img
            src={assetUrl('/assets/hero/character_chest.png')}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none mix-blend-normal"
            style={{
              zIndex: 12,
              animation: 'characterBreathe 4.4s ease-in-out infinite',
              transformOrigin: '50% 60%',
            }}
          />

          {/* 4. HAIR SECONDARY MOVEMENT LAYER (Section 4: Light breeze sway) */}
          <img
            src={assetUrl('/assets/hero/character_hair.png')}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{
              zIndex: 13,
              animation: 'characterHairBreeze 5.6s ease-in-out infinite',
              transformOrigin: '45% 15%',
            }}
          />

          {/* 5. COAT FLAPS SECONDARY MOVEMENT LAYER (Section 4: Subtle fabric float) */}
          <img
            src={assetUrl('/assets/hero/character_coat_flaps.png')}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{
              zIndex: 11,
              animation: 'characterCoatFloat 4.8s ease-in-out infinite 0.4s',
              transformOrigin: '50% 85%',
            }}
          />
        </div>

        {/* 1. TVA Emerald & Golden Temporal Ambient Halo behind silhouette */}
        <div
          className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-1000 -z-10 ${
            state === 'temporal_surge'
              ? 'opacity-90 scale-115 bg-[#00FF88]/40'
              : state === 'power_activation'
              ? 'opacity-70 scale-105 bg-[#10B981]/35'
              : 'opacity-50 scale-100 bg-[#10B981]/25'
          }`}
          style={{
            transform: 'translateY(-5%) scaleX(1.15)',
          }}
        />

        {/* 6. EYE & FACE ANIMATION LAYER (Section 3: Natural irregular blinking with authentic face) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 14 }}
        >
          {/* Left Eye Eyelid (Viewer's left: 47.46%, 15.23%) */}
          <div
            className="absolute rounded-full overflow-hidden"
            style={{
              left: '46.7%',
              top: '14.6%',
              width: '1.7%',
              height: '1.4%',
              opacity: blinkState.progress > 0.05 ? 1 : 0,
            }}
          >
            {/* Natural Eyelid dropping down during blink */}
            <div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-[#7C3F23] via-[#63301B] to-[#25150E] transition-none"
              style={{
                height: `${blinkState.progress * 100}%`,
                borderBottom: blinkState.progress > 0.2 ? '1px solid #1A0E08' : 'none',
              }}
            />
          </div>

          {/* Right Eye Eyelid (Viewer's right: 51.66%, 15.62%) */}
          <div
            className="absolute rounded-full overflow-hidden"
            style={{
              left: '50.9%',
              top: '15.0%',
              width: '1.7%',
              height: '1.4%',
              opacity: blinkState.progress > 0.05 ? 1 : 0,
            }}
          >
            {/* Natural Eyelid dropping down during blink */}
            <div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-[#7C3F23] via-[#63301B] to-[#25150E] transition-none"
              style={{
                height: `${blinkState.progress * 100}%`,
                borderBottom: blinkState.progress > 0.2 ? '1px solid #1A0E08' : 'none',
              }}
            />
          </div>
        </div>

        {/* 7. GOLDEN PALM ENERGY (Section 5: Left Palm & Right Palm) */}
        {/* Left Palm Energy (Positioned exactly at 10.55% width, 66.80% height) */}
        <div
          className="absolute"
          style={{
            left: '10.55%',
            top: '66.80%',
            zIndex: 20,
          }}
        >
          <GoldenPalmEnergy
            side="left"
            state={state}
            cursorProximity={proximities.left}
          />
        </div>

        {/* Right Palm Energy (Positioned exactly at 89.45% width, 66.80% height) */}
        <div
          className="absolute"
          style={{
            left: '89.45%',
            top: '66.80%',
            zIndex: 20,
          }}
        >
          <GoldenPalmEnergy
            side="right"
            state={state}
            cursorProximity={proximities.right}
          />
        </div>

        {/* 8. FINGER FOREGROUND LAYERS (Section 5: "Do not cover the character's fingers") */}
        {/* Crisp finger layers placed at z-index: 25 over the glowing core */}
        <img
          src={assetUrl('/assets/hero/character_left_fingers.png')}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ zIndex: 25 }}
        />
        <img
          src={assetUrl('/assets/hero/character_right_fingers.png')}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ zIndex: 25 }}
        />
      </div>

      {/* Embedded In-line CSS Keyframes for Layered Biological Movement */}
      <style>{`
        @keyframes characterBreathe {
          0%, 100% {
            transform: translateY(0px) scaleY(1.0);
          }
          50% {
            transform: translateY(-1.4px) scaleY(1.008);
          }
        }
        @keyframes characterHairBreeze {
          0%, 100% {
            transform: rotate(0deg) translateX(0px);
          }
          35% {
            transform: rotate(-0.5deg) translateX(-0.8px);
          }
          75% {
            transform: rotate(0.6deg) translateX(0.6px);
          }
        }
        @keyframes characterCoatFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(1.6px) rotate(0.2deg);
          }
        }
      `}</style>
    </div>
  );
};