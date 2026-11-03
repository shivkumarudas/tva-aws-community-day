import React, { useEffect, useRef } from 'react';
import { TemporalState } from './GoldenPalmEnergy';

interface TemporalParticleSystemProps {
  state: TemporalState;
  surgeTrigger?: number; // increments on each surge trigger
  className?: string;
  isMobile?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
  depth: number; // 0 (far/small) to 1 (near/large)
}

export const TemporalParticleSystem: React.FC<TemporalParticleSystemProps> = ({
  state,
  surgeTrigger = 0,
  className = '',
  isMobile = false,
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

    // Reduced motion media query check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Density of particles: desktop ~ 130, mobile ~ 45
    const count = isMobile ? 45 : prefersReducedMotion ? 30 : 130;
    const particles: Particle[] = [];

    const goldPalette = [
      '#FFFFFF',
      '#FFF8DC',
      '#FCE18B',
      '#F6C453',
      '#F07824',
      '#D97706',
    ];

    const createParticle = (burst = false, originX?: number, originY?: number): Particle => {
      const depth = Math.random();
      const sz = depth * 2.2 + 0.8;
      const col = goldPalette[Math.floor(Math.random() * goldPalette.length)];

      let px = Math.random() * width;
      let py = Math.random() * height;
      let vx = (Math.random() - 0.5) * 0.4 * (depth + 0.2);
      let vy = -(0.3 + Math.random() * 0.7) * (depth + 0.5); // upward temporal drift

      if (burst && originX !== undefined && originY !== undefined) {
        px = originX + (Math.random() - 0.5) * 40;
        py = originY + (Math.random() - 0.5) * 40;
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 5.0;
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
      }

      return {
        x: px,
        y: py,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        size: sz,
        alpha: Math.random() * 0.8 + 0.2,
        maxAlpha: 0.4 + depth * 0.6,
        color: col,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.04,
        depth,
      };
    };

    // Initialize base population
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }

    // Spawn shockwave burst on surge
    const triggerSurgeBurst = () => {
      const burstCount = isMobile ? 25 : 60;
      const leftPalmX = width * 0.38;
      const rightPalmX = width * 0.62;
      const palmY = height * 0.48;

      for (let i = 0; i < burstCount; i++) {
        const ox = i % 2 === 0 ? leftPalmX : rightPalmX;
        particles.push(createParticle(true, ox, palmY));
      }
    };

    if (surgeTrigger > 0 || state === 'temporal_surge') {
      triggerSurgeBurst();
    }

    // Mouse movement listener on desktop
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

    // Animation Loop
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const stateSpeedMult =
        state === 'temporal_surge'
          ? 2.2
          : state === 'power_activation'
          ? 1.5
          : state === 'timeline_control'
          ? 1.3
          : 1.0;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active && !isMobile;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Cursor gentle repulsion & swirl
        if (mouseActive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist && dist > 1) {
            const force = (1 - dist / maxDist) * 35;
            // Repulsion component
            p.vx += (dx / dist) * force * dt;
            p.vy += (dy / dist) * force * dt;
            // Gentle swirl component
            p.vx += (-dy / dist) * (force * 0.4) * dt;
            p.vy += (dx / dist) * (force * 0.4) * dt;
          }
        }

        // Return toward base velocity with damping
        p.vx += (p.baseVx * stateSpeedMult - p.vx) * 0.05;
        p.vy += (p.baseVy * stateSpeedMult - p.vy) * 0.05;

        // Position update
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;

        // Subtle harmonic pulse
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.maxAlpha * (0.65 + Math.sin(p.pulsePhase) * 0.35);

        // Wrap around boundaries for ambient particles, splice excess burst particles
        if (p.y < -20) {
          if (particles.length > count) {
            particles.splice(i, 1);
            continue;
          } else {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [state, surgeTrigger, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${className}`}
    />
  );
};