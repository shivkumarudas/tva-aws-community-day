import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../../utils/sound';
import { Zap } from 'lucide-react';
import { assetUrl } from '../../utils/assets';

export const Scene3TemporalActivation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    soundManager.playPortalWarp();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const cx = width / 2;
    const cy = height / 2;

    // Warp-speed starfield and temporal plasma particles
    const particleCount = 140;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * 1000 + 1,
      speed: 6 + Math.random() * 12,
      size: 1 + Math.random() * 2,
      color: Math.random() > 0.4 ? '#F6C453' : Math.random() > 0.5 ? '#10B981' : '#F07824',
    }));

    let time = 0;

    const render = () => {
      time += 0.025;
      ctx.fillStyle = 'rgba(16, 15, 12, 0.25)';
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Swirling Quantum Vortex Accretion Disk
      const vortexRadius = Math.min(width, height) * 0.28;
      const vortexGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, vortexRadius * 1.4);
      vortexGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      vortexGrad.addColorStop(0.2, 'rgba(246, 196, 83, 0.85)');
      vortexGrad.addColorStop(0.45, 'rgba(240, 120, 36, 0.5)');
      vortexGrad.addColorStop(0.75, 'rgba(16, 185, 129, 0.3)');
      vortexGrad.addColorStop(1, 'rgba(16, 15, 12, 0)');

      ctx.fillStyle = vortexGrad;
      ctx.beginPath();
      ctx.arc(0, 0, vortexRadius * (1 + Math.sin(time * 3) * 0.06), 0, Math.PI * 2);
      ctx.fill();

      // 2. Swirling spiral plasma tendrils
      ctx.globalCompositeOperation = 'screen';
      for (let arm = 0; arm < 6; arm++) {
        const baseAngle = (arm / 6) * Math.PI * 2 + time * 1.5;
        ctx.beginPath();
        for (let r = 20; r < vortexRadius * 1.3; r += 8) {
          const theta = baseAngle + r * 0.035;
          const px = Math.cos(theta) * r;
          const py = Math.sin(theta) * r;
          if (r === 20) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = arm % 2 === 0 ? 'rgba(246, 196, 83, 0.65)' : 'rgba(16, 185, 129, 0.55)';
        ctx.lineWidth = 2.2;
        ctx.stroke();
      }

      // 3. Accelerating Warp-Speed Stars rushing toward the screen
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.z -= p.speed;

        if (p.z <= 0) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * width;
          p.y = (Math.random() - 0.5) * height;
        }

        const k = 400 / p.z;
        const px = p.x * k;
        const py = p.y * k;

        // Previous point for motion stretch
        const prevK = 400 / (p.z + p.speed * 2.5);
        const prevPx = p.x * prevK;
        const prevPy = p.y * prevK;

        if (px >= -cx && px <= cx && py >= -cy && py <= cy) {
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.min(3.5, p.size * k);
          ctx.stroke();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-[#100F0C] flex items-center justify-center overflow-hidden select-none">
      {/* Background Warp Engine Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 tva-scanlines opacity-25 pointer-events-none z-10" />

      {/* TVA Central Timedoor Frame */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.05, 1.0, 3.2], opacity: [0, 1, 1, 0.95] }}
        transition={{ duration: 4.2, times: [0, 0.25, 0.75, 1], ease: 'easeInOut' }}
        className="relative z-20 w-[280px] h-[400px] sm:w-[360px] sm:h-[520px] md:w-[440px] md:h-[620px] border-2 border-[#F07824] rounded-lg shadow-tva-glow-lg flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-sm"
      >
        {/* Timedoor Laser Corner Brackets */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#F6C453]" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#F6C453]" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#F6C453]" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#F6C453]" />

        {/* Timedoor Shimmering Plasma Glass Surface */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F07824]/20 via-[#F6C453]/15 to-[#10B981]/25 animate-pulse" />

        {/* Center Portal Singularity Image with Rotation and Dimensional Scale */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
          className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-[#F6C453] shadow-[0_0_50px_rgba(240,120,36,0.8)]"
        >
          <img
            src={assetUrl('/assets/portal/portal_frame_4.jpg')}
            alt="Temporal Singularity Event Horizon"
            className="w-full h-full object-cover filter contrast-125 brightness-120"
          />
        </motion.div>

        {/* HUD Overlay inside Doorway */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#F6C453] border-t border-[#F07824]/40 pt-2">
          <span>PORTAL: 914-ACTIVE</span>
          <span className="text-[#10B981]">ENGAGED</span>
        </div>
      </motion.div>

      {/* Rotating Astrolabe Holographic Calibration Rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-15">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="w-[480px] h-[480px] sm:w-[720px] sm:h-[720px] md:w-[920px] md:h-[920px] rounded-full border border-dashed border-[#F07824]/60 shadow-tva-glow"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[580px] h-[580px] sm:w-[860px] sm:h-[860px] md:w-[1100px] md:h-[1100px] rounded-full border border-[#10B981]/40"
        />
      </div>

      {/* Final Hyperspace White-Gold Engulfing Light Tunnel Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.2, 1] }}
        transition={{ duration: 4.2, times: [0, 0.7, 0.88, 1], ease: 'easeIn' }}
        className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-[#F6C453] to-[#F07824] pointer-events-none z-30"
      />

      {/* Lower Telemetry Strip */}
      <div className="absolute bottom-10 z-40 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F6C453]/60 bg-[#14120E]/90 text-[#F6C453] text-xs font-mono tracking-widest uppercase shadow-tva-glow"
        >
          <Zap className="w-4 h-4 text-[#10B981] animate-bounce" />
          <span>SEQUENCE 03 // TVA TIMEDOOR ACTIVE &bull; ENTERING CENTRAL TIMEKEEPING ZONE</span>
        </motion.div>
      </div>
    </div>
  );
};