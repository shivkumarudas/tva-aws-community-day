import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TECHNICAL_MISSIONS, TechnicalMission } from '../../data/missions';
import { soundManager } from '../../utils/sound';
import { 
  Cloud, 
  Cpu, 
  Infinity as InfinityIcon, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  CheckSquare, 
  ArrowUpRight, 
  X, 
  Terminal,
  Clock,
  ShieldAlert
} from 'lucide-react';

// Animated canvas mini portal for each card
const MiniPortalCanvas: React.FC<{ hue: string }> = ({ hue }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const size = 120;
    canvas.width = size;
    canvas.height = size;

    let t = Math.random() * 10;
    const render = () => {
      t += 0.04;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;

      // Concentric rotating energy rings
      for (let r = 1; r <= 3; r++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * (r % 2 === 0 ? 0.3 : -0.4));
        ctx.strokeStyle = hue;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8 + r * 4, 6]);
        ctx.shadowColor = hue;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, 14 * r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Center glowing core
      ctx.fillStyle = hue;
      ctx.shadowColor = hue;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(cx, cy, 5 + Math.sin(t * 3) * 2, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [hue]);

  return <canvas ref={canvasRef} className="w-16 h-16 pointer-events-none" />;
};

// Icon map matching the asset pack
const missionIcons: Record<string, React.ElementType> = {
  'msn-aws-cloud': Cloud,
  'msn-ai': Cpu,
  'msn-devops': InfinityIcon,
  'msn-cybersecurity': ShieldCheck,
  'msn-genai': Sparkles,
  'msn-serverless': Zap,
};

interface MissionsSectionProps {
  onRegisterMission: () => void;
}

export const MissionsSection: React.FC<MissionsSectionProps> = ({ onRegisterMission }) => {
  const [selectedMission, setSelectedMission] = useState<TechnicalMission | null>(null);

  const handleOpenMission = (mission: TechnicalMission) => {
    soundManager.playAnalogClick(780, 0.04);
    soundManager.playTerminalBeep(1150);
    setSelectedMission(mission);
  };

  return (
    <section id="workshops" className="relative py-28 bg-[#14120E] border-t border-[#F07824]/20 overflow-hidden">
      {/* Background terminal grid */}
      <div className="absolute inset-0 bg-tva-terminal opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#F07824]/40 bg-[#1D1A15] text-[#F6C453] text-xs font-mono tracking-widest uppercase mb-4 shadow">
            <Cpu className="w-3.5 h-3.5 text-[#F07824]" />
            <span>TVA EXPERIMENTAL LABS // TIME ENGINE DECK</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-bebas tracking-wider text-[#E8DFCA] text-tva-glow">
            AUTHORIZED TECHNICAL MISSIONS
          </h2>
          <p className="text-sm sm:text-base font-mono text-[#E8DFCA]/75 mt-3 max-w-2xl mx-auto">
            Interactive, deep-dive sandbox missions conducted in live AWS environments under the guidance of certified architects.
          </p>
        </div>

        {/* 6 Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECHNICAL_MISSIONS.map((mission, idx) => {
            const Icon = missionIcons[mission.id] || Cpu;

            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => handleOpenMission(mission)}
                className="dossier-card bg-[#181512] border border-[#42452C] p-6 relative overflow-hidden group hover:border-[#F07824] hover:shadow-tva-glow transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Header with Mini Portal Effect */}
                  <div className="flex items-center justify-between border-b border-[#42452C]/70 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#100F0C] border border-[#42452C] flex items-center justify-center text-[#F6C453] group-hover:border-[#F07824] transition-colors">
                        <Icon className="w-5 h-5 text-[#F07824]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-[#F07824] uppercase tracking-widest font-bold">
                          {mission.code} // {mission.duration}
                        </div>
                        <h3 className="font-bebas text-2xl sm:text-3xl text-[#E8DFCA] group-hover:text-[#F6C453] transition-colors leading-tight">
                          {mission.title}
                        </h3>
                      </div>
                    </div>

                    {/* Animated Mini Portal */}
                    <div className="rounded-full bg-[#100F0C] border border-[#42452C] p-0.5 flex items-center justify-center shrink-0">
                      <MiniPortalCanvas hue={mission.portalHue} />
                    </div>
                  </div>

                  {/* Briefing Text */}
                  <p className="text-xs font-mono text-[#E8DFCA]/80 leading-relaxed mb-4 min-h-[46px]">
                    {mission.briefing}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-1.5 bg-[#12100D] p-3 border border-[#42452C]/40 mb-4 text-xs font-mono">
                    <div className="text-[10px] font-mono text-[#F6C453] uppercase tracking-wider mb-1 font-bold">
                      MISSION DELIVERABLES:
                    </div>
                    {mission.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-[#E8DFCA]/70 text-[11px]">
                        <CheckSquare className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {mission.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-[#12100E] border border-[#42452C] text-[10px] font-mono text-[#E8DFCA]/75"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  className="w-full py-2.5 px-4 bg-[#29251F] group-hover:bg-[#F07824] text-[#E8DFCA] group-hover:text-[#100F0C] font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 border border-[#42452C] group-hover:border-[#F07824]"
                >
                  <span>INSPECT MISSION DOSSIER</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mission Briefing Detail Modal */}
      <AnimatePresence>
        {selectedMission && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-2xl w-full bg-[#181512] border-2 border-[#F07824] p-6 sm:p-8 shadow-tva-glow-lg"
            >
              <button
                onClick={() => setSelectedMission(null)}
                className="absolute top-4 right-4 p-2 bg-[#29251F] hover:bg-[#F07824] text-[#E8DFCA] hover:text-[#100F0C] transition-colors border border-[#42452C]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-[#42452C] pb-4 mb-4">
                <div className="p-2.5 rounded bg-[#100F0C] border border-[#F07824] text-[#F6C453]">
                  <Terminal className="w-6 h-6 text-[#F07824]" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#F07824] tracking-widest uppercase">
                    {selectedMission.code} // {selectedMission.duration}
                  </div>
                  <h3 className="font-bebas text-3xl sm:text-4xl text-[#E8DFCA] text-tva-glow leading-none">
                    {selectedMission.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-mono text-[#E8DFCA]/80">
                <p className="leading-relaxed bg-[#12100E] p-4 border-l-3 border-[#F6C453]">
                  {selectedMission.briefing}
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-[#14120E] p-4 border border-[#42452C]">
                  <div>
                    <div className="text-[#E8DFCA]/60 text-[10px]">CLEARANCE TIER</div>
                    <div className="text-[#10B981] font-bold">{selectedMission.clearanceRequired}</div>
                  </div>
                  <div>
                    <div className="text-[#E8DFCA]/60 text-[10px]">COMMAND DESK</div>
                    <div className="text-[#F6C453] font-bold">{selectedMission.leadVariant}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-[#F6C453] uppercase font-bold tracking-wider mb-2">
                    CORE DELIVERABLES:
                  </div>
                  <ul className="space-y-2">
                    {selectedMission.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 bg-[#100F0C] p-2.5 border border-[#42452C]/60 text-xs text-[#E8DFCA]/85">
                        <CheckSquare className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-[#42452C]">
                <span className="text-xs font-mono text-[#E8DFCA]/60">
                  STATUS: <strong className="text-[#10B981]">{selectedMission.status}</strong>
                </span>
                <button
                  onClick={() => {
                    setSelectedMission(null);
                    onRegisterMission();
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#F07824] to-[#F6C453] text-[#100F0C] font-bebas text-xl tracking-wider font-bold shadow-tva-glow"
                >
                  SECURE MISSION PASS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
