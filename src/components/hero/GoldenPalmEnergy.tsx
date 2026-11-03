import React, { useEffect, useRef } from 'react';

export type TemporalState = 'idle' | 'power_activation' | 'timeline_control' | 'temporal_surge';

interface GoldenPalmEnergyProps {
  side: 'left' | 'right';
  state: TemporalState;
  cursorProximity?: number; // 0 (far) to 1 (near)
  className?: string;
}

interface PalmSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  isFingerParticle?: boolean;
}

export const GoldenPalmEnergy: React.FC<GoldenPalmEnergyProps> = ({
  side,
  state,
  cursorProximity = 0,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Fixed internal resolution for consistent physics & rendering
    const W = (canvas.width = 180);
    const H = (canvas.height = 180);
    const cx = W / 2;
    const cy = H / 2 + 6; // slightly lower in the canvas so sparks have room to rise

    const sparks: PalmSpark[] = [];
    const maxSparks = state === 'temporal_surge' ? 55 : state === 'power_activation' ? 42 : 28;

    // Finger stream spawn vectors relative to palm center
    // Left hand fingers point up-left (-X, -Y); Right hand fingers point up-right (+X, -Y)
    const fingerOffsets = side === 'left'
      ? [
          { x: -28, y: -22, dirX: -0.7, dirY: -1.2 }, // index
          { x: -38, y: -14, dirX: -0.9, dirY: -0.9 }, // middle
          { x: -44, y: -2, dirX: -1.1, dirY: -0.6 },  // ring
          { x: -46, y: 12, dirX: -1.2, dirY: -0.3 },  // pinky
          { x: 18, y: -16, dirX: 0.3, dirY: -1.1 },   // thumb tip
        ]
      : [
          { x: 28, y: -22, dirX: 0.7, dirY: -1.2 },  // index
          { x: 38, y: -14, dirX: 0.9, dirY: -0.9 },  // middle
          { x: 44, y: -2, dirX: 1.1, dirY: -0.6 },   // ring
          { x: 46, y: 12, dirX: 1.2, dirY: -0.3 },   // pinky
          { x: -18, y: -16, dirX: -0.3, dirY: -1.1 }, // thumb tip
        ];

    const colors = [
      '#FFFFFF',
      '#FFF4D0',
      '#FCE18B',
      '#F6C453',
      '#F07824',
      '#FFA04D',
    ];

    const spawnSpark = (fromFinger = false) => {
      let sx = cx;
      let sy = cy;
      let svx = 0;
      let svy = 0;

      if (fromFinger) {
        // Pick one finger tip to stream particles
        const f = fingerOffsets[Math.floor(Math.random() * fingerOffsets.length)];
        sx = cx + f.x + (Math.random() - 0.5) * 6;
        sy = cy + f.y + (Math.random() - 0.5) * 6;
        const speed = 0.8 + Math.random() * 1.4;
        svx = f.dirX * speed;
        svy = f.dirY * speed - Math.random() * 0.8;
      } else {
        // Spawn from center palm hollow
        sx = cx + (Math.random() - 0.5) * 14;
        sy = cy + (Math.random() - 0.5) * 12;
        svx = (Math.random() - 0.5) * 1.6;
        svy = -(0.8 + Math.random() * 2.0); // rising upwards
      }

      // Proximity boost
      if (cursorProximity > 0) {
        svy -= cursorProximity * 0.8;
      }

      sparks.push({
        x: sx,
        y: sy,
        vx: svx,
        vy: svy,
        size: fromFinger ? 1.0 + Math.random() * 1.5 : 1.4 + Math.random() * 2.2,
        life: 0,
        maxLife: fromFinger ? 28 + Math.random() * 22 : 40 + Math.random() * 35,
        color: colors[Math.floor(Math.random() * colors.length)],
        isFingerParticle: fromFinger,
      });
    };

    const render = () => {
      time += 0.035;
      ctx.clearRect(0, 0, W, H);

      // Multipliers based on interaction state & mouse proximity
      let stateMult = 1.0;
      let pulseFreq = 3.5;
      let coreScale = 1.0;

      switch (state) {
        case 'power_activation':
          stateMult = 1.55;
          pulseFreq = 6.0;
          coreScale = 1.35;
          break;
        case 'timeline_control':
          stateMult = 1.75;
          pulseFreq = 4.8;
          coreScale = 1.4;
          break;
        case 'temporal_surge':
          stateMult = 2.4;
          pulseFreq = 8.5;
          coreScale = 1.85;
          break;
        case 'idle':
        default:
          stateMult = 1.0 + cursorProximity * 0.45;
          pulseFreq = 3.2 + cursorProximity * 2.5;
          coreScale = 1.0 + cursorProximity * 0.35;
          break;
      }

      // Harmonically oscillating pulse
      const pulse = Math.sin(time * pulseFreq) * 0.18 + Math.cos(time * (pulseFreq * 0.6)) * 0.09;
      const currentRadius = 24 * coreScale * (1 + pulse);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // 1. Wide ambient orange halo (warm atmosphere)
      const outerHaloGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 75 * coreScale);
      outerHaloGrad.addColorStop(0, `rgba(240, 120, 36, ${Math.min(0.55 * stateMult, 0.9)})`);
      outerHaloGrad.addColorStop(0.35, `rgba(246, 196, 83, ${Math.min(0.28 * stateMult, 0.7)})`);
      outerHaloGrad.addColorStop(0.7, `rgba(217, 119, 6, ${Math.min(0.12 * stateMult, 0.4)})`);
      outerHaloGrad.addColorStop(1, 'rgba(16, 15, 12, 0)');

      ctx.fillStyle = outerHaloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 75 * coreScale, 0, Math.PI * 2);
      ctx.fill();

      // 2. Swirling Golden Micro-Tendrils (plasma arcs licking up from palm)
      const numTendrils = state === 'temporal_surge' ? 6 : 4;
      for (let i = 0; i < numTendrils; i++) {
        const tendrilAngle = (i / numTendrils) * Math.PI * 2 + time * (i % 2 === 0 ? 2 : -2.2);
        const tLen = (18 + Math.sin(time * 5 + i * 2) * 8) * coreScale;
        const ex = cx + Math.cos(tendrilAngle) * tLen;
        const ey = cy + Math.sin(tendrilAngle) * (tLen * 0.6) - (12 * coreScale); // biased upward

        const cpX = cx + Math.cos(tendrilAngle + 0.5) * (tLen * 0.7);
        const cpY = cy + Math.sin(tendrilAngle - 0.4) * (tLen * 0.7);

        ctx.strokeStyle = i % 2 === 0 ? 'rgba(252, 225, 139, 0.7)' : 'rgba(240, 120, 36, 0.65)';
        ctx.lineWidth = 1.4 * coreScale;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(cpX, cpY, ex, ey);
        ctx.stroke();
      }

      // 3. Concentrated Intense White-Gold Core (Incandescent heart)
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, currentRadius);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      coreGrad.addColorStop(0.25, 'rgba(255, 244, 208, 0.95)');
      coreGrad.addColorStop(0.55, 'rgba(246, 196, 83, 0.85)');
      coreGrad.addColorStop(0.85, 'rgba(240, 120, 36, 0.4)');
      coreGrad.addColorStop(1, 'rgba(240, 120, 36, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // 4. Update and Render Floating Sparks & Escaping Finger Particles
      // Spawn new particles according to capacity
      if (sparks.length < maxSparks) {
        spawnSpark(false);
        // Also spawn particles streaming off fingertips
        if (Math.random() < 0.65) {
          spawnSpark(true);
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;

        // Slight drag & buoyant lift
        s.vx *= 0.985;
        s.vy -= 0.035;

        const progress = s.life / s.maxLife;
        if (progress >= 1) {
          sparks.splice(i, 1);
          continue;
        }

        const alpha = Math.sin(progress * Math.PI) * (s.isFingerParticle ? 0.85 : 0.95);
        const sz = s.size * (1 - progress * 0.45);

        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, sz, 0, Math.PI * 2);
        ctx.fill();

        // Optional tiny spark glow for larger particles
        if (sz > 1.8) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(s.x, s.y, sz + 1.2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [side, state, cursorProximity]);

  return (
    <div
      className={`absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{ width: '180px', height: '180px' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          filter:
            state === 'temporal_surge'
              ? 'drop-shadow(0 0 18px rgba(246, 196, 83, 0.95)) drop-shadow(0 0 35px rgba(240, 120, 36, 0.8))'
              : 'drop-shadow(0 0 10px rgba(246, 196, 83, 0.6)) drop-shadow(0 0 20px rgba(240, 120, 36, 0.45))',
        }}
      />
    </div>
  );
};