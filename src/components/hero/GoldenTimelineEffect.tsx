import React, { useEffect, useRef } from 'react';
import { TemporalState } from './GoldenPalmEnergy';

export interface PalmAnchor {
  x: number;
  y: number;
}

interface GoldenTimelineEffectProps {
  leftPalm: PalmAnchor;
  rightPalm: PalmAnchor;
  state: TemporalState;
  surgeTrigger?: number;
  isMobile?: boolean;
  className?: string;
}

interface TimelinePathDef {
  id: string;
  source: 'left' | 'right' | 'both';
  basePoints: (w: number, h: number, lp: PalmAnchor, rp: PalmAnchor) => { x: number; y: number }[];
  branches?: {
    forkRatio: number; // 0..1 along the parent curve
    targetPoint: (w: number, h: number, forkX: number, forkY: number) => { x: number; y: number };
  }[];
  width: number;
  glowWidth: number;
  opacity: number;
  speed: number;
  phase: number;
  freq: number;
  amplitude: number;
  color: string;
}

interface SparkOnPath {
  pathIndex: number;
  progress: number;
  speed: number;
  size: number;
  color: string;
}

interface SurgePacket {
  pathIndex: number;
  progress: number;
  speed: number;
  intensity: number;
}

export const GoldenTimelineEffect: React.FC<GoldenTimelineEffectProps> = ({
  leftPalm,
  rightPalm,
  state,
  surgeTrigger = 0,
  isMobile = false,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Track mouse on desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // 12 Organic Curving Ribbon Definitions (Loki Emerald Green & TVA Gold Multiverse Aesthetic)
    const pathsDefs: TimelinePathDef[] = [
      // 1. Waist Weave Strand: loops between Left Palm and Right Palm across the belt/torso
      {
        id: 'waist_weave',
        source: 'both',
        basePoints: (_w, _h, lp, rp) => {
          const midX = (lp.x + rp.x) / 2;
          const midY = (lp.y + rp.y) / 2 + 35;
          return [
            { x: lp.x, y: lp.y },
            { x: lp.x + 35, y: lp.y + 20 },
            { x: midX, y: midY },
            { x: rp.x - 35, y: rp.y + 20 },
            { x: rp.x, y: rp.y },
          ];
        },
        width: 2.4,
        glowWidth: 12,
        opacity: 0.95,
        speed: 1.2,
        phase: 0,
        freq: 1.4,
        amplitude: 14,
        color: '#10B981',
      },
      // 2. High Arch Left: Leaves Left Palm, arches up & over head toward top-right
      {
        id: 'high_arch_left',
        source: 'left',
        basePoints: (w, h, lp, _rp) => [
          { x: lp.x, y: lp.y },
          { x: lp.x - 60, y: lp.y - 120 },
          { x: w * 0.35, y: h * 0.16 },
          { x: w * 0.58, y: h * 0.12 },
          { x: w * 0.82, y: h * 0.22 },
          { x: w + 20, y: h * 0.28 },
        ],
        branches: [
          {
            forkRatio: 0.65,
            targetPoint: (w, h, fx, fy) => ({ x: w + 10, y: fy - h * 0.08 }),
          },
        ],
        width: 2.0,
        glowWidth: 10,
        opacity: 0.85,
        speed: 1.0,
        phase: 1.2,
        freq: 1.2,
        amplitude: 16,
        color: '#34D399',
      },
      // 3. High Arch Right: Leaves Right Palm, arches up & over toward top-left
      {
        id: 'high_arch_right',
        source: 'right',
        basePoints: (w, h, _lp, rp) => [
          { x: rp.x, y: rp.y },
          { x: rp.x + 60, y: rp.y - 120 },
          { x: w * 0.65, y: h * 0.18 },
          { x: w * 0.42, y: h * 0.15 },
          { x: w * 0.18, y: h * 0.26 },
          { x: -20, y: h * 0.32 },
        ],
        branches: [
          {
            forkRatio: 0.62,
            targetPoint: (_w, h, _fx, fy) => ({ x: -15, y: fy - h * 0.09 }),
          },
        ],
        width: 2.0,
        glowWidth: 10,
        opacity: 0.85,
        speed: 0.9,
        phase: 2.1,
        freq: 1.1,
        amplitude: 15,
        color: '#10B981',
      },
      // 4. Left Lateral Multiverse Flow (Mid): S-curves outward to left screen edge
      {
        id: 'left_lat_mid',
        source: 'left',
        basePoints: (_w, h, lp, _rp) => [
          { x: lp.x, y: lp.y },
          { x: lp.x - 70, y: lp.y - 10 },
          { x: lp.x - 160, y: lp.y + 40 },
          { x: lp.x - 280, y: lp.y - 30 },
          { x: -20, y: h * 0.48 },
        ],
        branches: [
          {
            forkRatio: 0.55,
            targetPoint: (_w, _h, fx, fy) => ({ x: -20, y: fy + 80 }),
          },
        ],
        width: 2.4,
        glowWidth: 12,
        opacity: 0.9,
        speed: 1.4,
        phase: 3.0,
        freq: 1.6,
        amplitude: 18,
        color: '#00FF88',
      },
      // 5. Right Lateral Multiverse Flow (Mid): S-curves outward to right screen edge
      {
        id: 'right_lat_mid',
        source: 'right',
        basePoints: (w, h, _lp, rp) => [
          { x: rp.x, y: rp.y },
          { x: rp.x + 70, y: rp.y - 10 },
          { x: rp.x + 160, y: rp.y + 40 },
          { x: rp.x + 280, y: rp.y - 30 },
          { x: w + 20, y: h * 0.48 },
        ],
        branches: [
          {
            forkRatio: 0.55,
            targetPoint: (w, _h, _fx, fy) => ({ x: w + 20, y: fy + 80 }),
          },
        ],
        width: 2.4,
        glowWidth: 12,
        opacity: 0.9,
        speed: 1.4,
        phase: 0.8,
        freq: 1.6,
        amplitude: 18,
        color: '#00FF88',
      },
      // 6. Left Descending Branch: Cascades downward toward bottom-left
      {
        id: 'left_desc',
        source: 'left',
        basePoints: (_w, h, lp, _rp) => [
          { x: lp.x, y: lp.y },
          { x: lp.x - 40, y: lp.y + 60 },
          { x: lp.x - 120, y: lp.y + 160 },
          { x: lp.x - 220, y: lp.y + 280 },
          { x: -10, y: h + 20 },
        ],
        width: 1.8,
        glowWidth: 9,
        opacity: 0.8,
        speed: 1.1,
        phase: 1.7,
        freq: 1.3,
        amplitude: 12,
        color: '#4ADE80',
      },
      // 7. Right Descending Branch: Cascades downward toward bottom-right
      {
        id: 'right_desc',
        source: 'right',
        basePoints: (w, h, _lp, rp) => [
          { x: rp.x, y: rp.y },
          { x: rp.x + 40, y: rp.y + 60 },
          { x: rp.x + 120, y: rp.y + 160 },
          { x: rp.x + 220, y: rp.y + 280 },
          { x: w + 10, y: h + 20 },
        ],
        width: 1.8,
        glowWidth: 9,
        opacity: 0.8,
        speed: 1.1,
        phase: 2.8,
        freq: 1.3,
        amplitude: 12,
        color: '#4ADE80',
      },
      // 8. Ascending Celestial Spire Left (Golden accent)
      {
        id: 'ascend_left',
        source: 'left',
        basePoints: (_w, _h, lp, _rp) => [
          { x: lp.x, y: lp.y },
          { x: lp.x - 50, y: lp.y - 80 },
          { x: lp.x - 90, y: lp.y - 200 },
          { x: lp.x - 140, y: -20 },
        ],
        width: 1.6,
        glowWidth: 8,
        opacity: 0.75,
        speed: 1.3,
        phase: 4.2,
        freq: 1.8,
        amplitude: 10,
        color: '#F6C453',
      },
      // 9. Ascending Celestial Spire Right (Golden accent)
      {
        id: 'ascend_right',
        source: 'right',
        basePoints: (_w, _h, _lp, rp) => [
          { x: rp.x, y: rp.y },
          { x: rp.x + 50, y: rp.y - 80 },
          { x: rp.x + 90, y: rp.y - 200 },
          { x: rp.x + 140, y: -20 },
        ],
        width: 1.6,
        glowWidth: 8,
        opacity: 0.75,
        speed: 1.3,
        phase: 5.1,
        freq: 1.8,
        amplitude: 10,
        color: '#F6C453',
      },
      // 10. Direct Inter-Palm Braided Harmonic Filament
      {
        id: 'harmonic_filament',
        source: 'both',
        basePoints: (_w, _h, lp, rp) => {
          const midX = (lp.x + rp.x) / 2;
          const midY = (lp.y + rp.y) / 2 - 15;
          return [
            { x: lp.x, y: lp.y },
            { x: lp.x + 40, y: lp.y - 10 },
            { x: midX, y: midY },
            { x: rp.x - 40, y: rp.y - 10 },
            { x: rp.x, y: rp.y },
          ];
        },
        width: 1.8,
        glowWidth: 8,
        opacity: 0.85,
        speed: 2.2,
        phase: 0.5,
        freq: 2.8,
        amplitude: 8,
        color: '#00FF88',
      },
    ];

    // Traveling sparks along each path
    const sparks: SparkOnPath[] = [];
    const sparkCountPerPath = isMobile ? 2 : 4;

    pathsDefs.forEach((_, pIdx) => {
      for (let s = 0; s < sparkCountPerPath; s++) {
        sparks.push({
          pathIndex: pIdx,
          progress: Math.random(),
          speed: 0.0025 + Math.random() * 0.0035,
          size: 1.4 + Math.random() * 1.6,
          color: s % 2 === 0 ? '#FFFFFF' : '#F6C453',
        });
      }
    });

    // Surge Packets list
    const surgePackets: SurgePacket[] = [];

    const fireSurge = () => {
      pathsDefs.forEach((_, pIdx) => {
        surgePackets.push({
          pathIndex: pIdx,
          progress: 0,
          speed: 0.012 + Math.random() * 0.008,
          intensity: 2.8,
        });
      });
    };

    if (surgeTrigger > 0 || state === 'temporal_surge') {
      fireSurge();
    }

    // Helper: Catmull-Rom spline evaluator
    const getCatmullRomPoint = (
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number },
      t: number
    ) => {
      const t2 = t * t;
      const t3 = t2 * t;
      return {
        x:
          0.5 *
          (2 * p1.x +
            (-p0.x + p2.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y:
          0.5 *
          (2 * p1.y +
            (-p0.y + p2.y) * t +
            (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
            (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      };
    };

    const sampleSpline = (points: { x: number; y: number }[], samples = 60) => {
      if (points.length < 2) return points;
      const result: { x: number; y: number }[] = [];
      const numSections = points.length - 1;

      for (let i = 0; i < numSections; i++) {
        const p0 = i > 0 ? points[i - 1] : points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = i < numSections - 1 ? points[i + 2] : p2;

        const steps = Math.floor(samples / numSections);
        for (let s = 0; s < steps; s++) {
          const t = s / steps;
          result.push(getCatmullRomPoint(p0, p1, p2, p3, t));
        }
      }
      result.push(points[points.length - 1]);
      return result;
    };

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Multipliers based on interaction state
      const stateMult =
        state === 'temporal_surge'
          ? 2.2
          : state === 'timeline_control'
          ? 1.6
          : state === 'power_activation'
          ? 1.3
          : 1.0;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active && !isMobile;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const evaluatedPaths: { x: number; y: number }[][] = [];

      // 1. Calculate and Draw Ribbons
      pathsDefs.forEach((pDef) => {
        const rawPts = pDef.basePoints(width, height, leftPalm, rightPalm);

        // Apply harmonic organic undulation to intermediate points
        const undulatingPts = rawPts.map((pt, idx) => {
          // Keep endpoints firmly anchored at the palms!
          if (idx === 0) return { ...pt };
          if (idx === rawPts.length - 1 && pDef.source === 'both') return { ...pt };

          const distFromStart = idx / (rawPts.length - 1);
          const wave =
            Math.sin(time * pDef.speed * pDef.freq + pDef.phase + idx * 0.8) *
            pDef.amplitude *
            stateMult *
            distFromStart;
          const wave2 =
            Math.cos(time * pDef.speed * 1.3 + pDef.phase + idx * 0.6) *
            (pDef.amplitude * 0.75) *
            stateMult *
            distFromStart;

          let px = pt.x + wave2;
          let py = pt.y + wave;

          // Magnetic mouse interaction: bend slightly toward cursor if close
          if (mouseActive) {
            const mdx = mx - px;
            const mdy = my - py;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 180 && mDist > 1) {
              const pull = (1 - mDist / 180) * 22;
              px += (mdx / mDist) * pull;
              py += (mdy / mDist) * pull;
            }
          }

          return { x: px, y: py };
        });

        // Sample smooth spline
        const spline = sampleSpline(undulatingPts, isMobile ? 35 : 70);
        evaluatedPaths.push(spline);

        if (spline.length < 2) return;

        // Draw Pass 1: Luminous Amber Glow
        ctx.beginPath();
        ctx.moveTo(spline[0].x, spline[0].y);
        for (let i = 1; i < spline.length; i++) {
          ctx.lineTo(spline[i].x, spline[i].y);
        }
        ctx.strokeStyle = pDef.color;
        ctx.lineWidth = pDef.glowWidth * (state === 'temporal_surge' ? 1.6 : 1.0);
        ctx.globalAlpha = Math.min(1.0, pDef.opacity * 0.45 * stateMult);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Draw Pass 2: Sharp Incandescent White-Gold Core
        ctx.beginPath();
        ctx.moveTo(spline[0].x, spline[0].y);
        for (let i = 1; i < spline.length; i++) {
          ctx.lineTo(spline[i].x, spline[i].y);
        }
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = pDef.width * (state === 'temporal_surge' ? 1.5 : 1.0);
        ctx.globalAlpha = Math.min(1.0, pDef.opacity * 0.95);
        ctx.stroke();

        // Secondary Branches
        if (pDef.branches && !isMobile) {
          pDef.branches.forEach((b) => {
            const forkIdx = Math.floor(spline.length * b.forkRatio);
            const forkPt = spline[forkIdx] || spline[0];
            const endPt = b.targetPoint(width, height, forkPt.x, forkPt.y);

            const cp1X = forkPt.x + (endPt.x - forkPt.x) * 0.5;
            const cp1Y = forkPt.y + Math.sin(time * 2 + pDef.phase) * 20;

            ctx.beginPath();
            ctx.moveTo(forkPt.x, forkPt.y);
            ctx.quadraticCurveTo(cp1X, cp1Y, endPt.x, endPt.y);
            ctx.strokeStyle = pDef.color;
            ctx.lineWidth = pDef.width * 0.75;
            ctx.globalAlpha = pDef.opacity * 0.55 * stateMult;
            ctx.stroke();
          });
        }
      });

      // 2. Animate Traveling Sparks along Ribbons
      sparks.forEach((sp) => {
        const path = evaluatedPaths[sp.pathIndex];
        if (!path || path.length < 2) return;

        sp.progress += sp.speed * (state === 'temporal_surge' ? 2.5 : stateMult);
        if (sp.progress > 1) sp.progress = 0;

        const targetIdx = Math.floor(sp.progress * (path.length - 1));
        const pt = path[targetIdx];
        if (!pt) return;

        // Draw spark diamond/circle
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, sp.size * (state === 'temporal_surge' ? 1.8 : 1.0), 0, Math.PI * 2);
        ctx.fill();

        // Traveling spark head glow
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, sp.size * 2.2, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 3. Animate Surge High-Velocity Packets
      for (let i = surgePackets.length - 1; i >= 0; i--) {
        const surge = surgePackets[i];
        surge.progress += surge.speed;
        if (surge.progress >= 1) {
          surgePackets.splice(i, 1);
          continue;
        }

        const path = evaluatedPaths[surge.pathIndex];
        if (!path || path.length < 2) continue;

        const targetIdx = Math.floor(surge.progress * (path.length - 1));
        const pt = path[targetIdx];
        if (!pt) continue;

        // Intense plasma flare travelling along the ribbon
        const flareGrad = ctx.createRadialGradient(pt.x, pt.y, 1, pt.x, pt.y, 24);
        flareGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        flareGrad.addColorStop(0.35, 'rgba(246, 196, 83, 0.95)');
        flareGrad.addColorStop(0.7, 'rgba(240, 120, 36, 0.5)');
        flareGrad.addColorStop(1, 'rgba(240, 120, 36, 0)');

        ctx.fillStyle = flareGrad;
        ctx.globalAlpha = 1.0;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 24, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [leftPalm, rightPalm, state, surgeTrigger, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-15 ${className}`}
      style={{
        filter:
          state === 'temporal_surge'
            ? 'drop-shadow(0 0 24px rgba(0, 255, 136, 0.95)) drop-shadow(0 0 45px rgba(16, 185, 129, 0.8))'
            : 'drop-shadow(0 0 14px rgba(16, 185, 129, 0.75)) drop-shadow(0 0 28px rgba(52, 211, 153, 0.5))',
      }}
    />
  );
};