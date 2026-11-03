import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SPEAKER_VARIANTS, SpeakerVariant } from '../../data/speakers';
import { soundManager } from '../../utils/sound';
import { Linkedin, Shield, Fingerprint, Award, ExternalLink } from 'lucide-react';

export const SpeakersSection: React.FC = () => {
  const [hoveredSpeaker, setHoveredSpeaker] = useState<string | null>(null);

  const handleSpeakerHover = (id: string) => {
    setHoveredSpeaker(id);
    soundManager.playTerminalBeep(1400);
  };

  return (
    <section id="speakers" className="relative py-28 bg-[#100F0C] overflow-hidden">
      {/* Background terminal grid */}
      <div className="absolute inset-0 bg-tva-terminal opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#F07824]/40 bg-[#191714] text-[#F6C453] text-xs font-mono tracking-widest uppercase mb-4 shadow">
            <Fingerprint className="w-3.5 h-3.5 text-[#F07824]" />
            <span>TVA BIOMETRIC PERSONNEL REGISTRY</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-bebas tracking-wider text-[#E8DFCA] text-tva-glow">
            IDENTIFIED VARIANTS
          </h2>
          <p className="text-sm sm:text-base font-mono text-[#E8DFCA]/75 mt-3 max-w-2xl mx-auto">
            Authorized keynote speakers, AWS Community Heroes, and Principal Architects cleared to manipulate cloud timelines.
          </p>
        </div>

        {/* Variant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPEAKER_VARIANTS.map((speaker, idx) => {
            const isHovered = hoveredSpeaker === speaker.id;
            const fileNumber = String(idx + 1).padStart(3, '0');

            return (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => handleSpeakerHover(speaker.id)}
                onMouseLeave={() => setHoveredSpeaker(null)}
                className="dossier-card bg-[#181512] rounded-none border border-[#42452C] relative overflow-hidden transition-all duration-300 group hover:border-[#F07824] hover:shadow-tva-glow"
              >
                {/* Orange identification top badge */}
                <div className="bg-[#F07824] px-4 py-2 flex items-center justify-between text-[#100F0C] font-mono text-xs font-bold tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 fill-current" />
                    VARIANT FILE: {fileNumber} // {speaker.variantCode}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase bg-[#100F0C] text-[#F6C453] px-2 py-0.5">
                    CLEARED
                  </span>
                </div>

                <div className="p-6">
                  {/* Photo with active scanning line */}
                  <div className="relative w-full h-60 sm:h-68 mb-5 overflow-hidden bg-[#100F0C] border border-[#42452C]">
                    <img
                      src={speaker.avatarUrl}
                      alt={speaker.name}
                      className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />

                    {/* Laser scanning line */}
                    {isHovered && (
                      <div className="absolute inset-x-0 h-1 bg-[#F07824] shadow-tva-glow animate-laser-scan pointer-events-none z-20" />
                    )}

                    {/* Rubber stamp overlay activated on hover */}
                    {isHovered && (
                      <div className="absolute bottom-3 right-3 z-20 pointer-events-none animate-in fade-in duration-300">
                        <div className="stamp-approved text-xs py-1 px-3">
                          VARIANT CONFIRMED
                        </div>
                      </div>
                    )}

                    {/* Corner badge on photo */}
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#100F0C]/90 border border-[#F07824]/40 text-[#F6C453] text-[10px] font-mono">
                      {speaker.clearanceLevel}
                    </div>
                  </div>

                  {/* Speaker Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bebas text-3xl sm:text-4xl tracking-wide text-[#E8DFCA] group-hover:text-[#F6C453] transition-colors leading-none">
                        {speaker.name}
                      </h3>
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded bg-[#29251F] hover:bg-[#F07824] text-[#E8DFCA] hover:text-[#100F0C] transition-colors"
                        title="LinkedIn Variant Record"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="text-xs font-mono text-[#F07824] font-semibold">
                      {speaker.designation} &bull; <span className="text-[#E8DFCA]/80">{speaker.company}</span>
                    </div>

                    {/* Session Dispatch Box */}
                    <div className="bg-[#12100E] p-3.5 border-l-3 border-[#F6C453] mt-3">
                      <div className="text-[10px] font-mono text-[#F6C453] uppercase tracking-wider mb-1 flex items-center gap-1 font-bold">
                        <Award className="w-3.5 h-3.5 text-[#F07824]" />
                        <span>SESSION DISPATCH:</span>
                      </div>
                      <div className="text-xs sm:text-sm font-mono text-[#E8DFCA] font-medium leading-snug">
                        {speaker.sessionTitle}
                      </div>
                    </div>

                    {/* Bio snippet */}
                    <p className="text-xs font-mono text-[#E8DFCA]/65 pt-2 line-clamp-2 leading-relaxed">
                      {speaker.bio}
                    </p>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#42452C]/50">
                      {speaker.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-[#14120E] border border-[#42452C] text-[10px] font-mono text-[#E8DFCA]/75"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Barcode Strip */}
                <div className="bg-[#12100E] px-6 py-3 border-t border-[#42452C]/70 flex items-center justify-between text-[10px] font-mono text-[#E8DFCA]/60">
                  <span>ORIGIN: {speaker.timelineOrigin}</span>
                  <span className="tracking-widest font-mono">||||| ||| ||||</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
