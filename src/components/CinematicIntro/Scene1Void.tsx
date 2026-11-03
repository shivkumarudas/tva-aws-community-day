import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const Scene1Void: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating golden particles & embryonic timeline threads
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.8 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.2 - Math.random() * 0.5,
      alpha: 0.1 + Math.random() * 0.7,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Drifting embryonic timeline strands
    const strands = [
      { y: height * 0.42, amp: 45, speed: 0.012, color: 'rgba(240, 120, 36, 0.45)' },
      { y: height * 0.52, amp: 65, speed: 0.009, color: 'rgba(246, 196, 83, 0.4)' },
      { y: height * 0.48, amp: 85, speed: 0.018, color: 'rgba(74, 222, 128, 0.35)' },
    ];

    let t = 0;
    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric orange glowing core slowly emerging
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        15,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.6
      );
      grad.addColorStop(0, 'rgba(240, 120, 36, 0.32)');
      grad.addColorStop(0.3, 'rgba(246, 196, 83, 0.14)');
      grad.addColorStop(0.7, 'rgba(41, 37, 31, 0.25)');
      grad.addColorStop(1, 'rgba(16, 15, 12, 1)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw drifting strands
      strands.forEach((s, idx) => {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 18;
        ctx.beginPath();
        for (let x = 0; x < width; x += 10) {
          const y = s.y + Math.sin(x * 0.005 + t * s.speed * 20 + idx) * s.amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Draw golden dust particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentAlpha = Math.max(0, (Math.sin(p.pulse) * 0.4 + 0.6) * p.alpha);
        ctx.fillStyle = `rgba(246, 196, 83, ${currentAlpha})`;
        ctx.shadowColor = 'rgba(240, 120, 36, 0.85)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-[#100F0C] flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="relative z-20 text-center px-6"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded border border-[#F07824]/40 bg-[#100F0C]/90 text-[#F6C453] text-xs font-mono tracking-widest uppercase mb-4 shadow-tva-glow">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F07824] animate-ping" />
          <span>INITIALIZING TEMPORAL SYSTEM...</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bebas tracking-widest text-[#E8DFCA] text-tva-glow mb-2">
          THE TEMPORAL VOID
        </h2>
        <p className="text-xs md:text-sm font-mono tracking-wider text-[#E8DFCA]/60 max-w-md mx-auto">
          IN THE SILENCE OF THE VOID, COUNTLESS UNGUIDED TIMELINES DRIFT UNTIL A TIMEKEEPER AWAKENS.
        </p>
      </motion.div>
    </div>
  );
};
