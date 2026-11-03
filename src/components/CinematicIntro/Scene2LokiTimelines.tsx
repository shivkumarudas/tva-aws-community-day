import React from 'react';
import { ArchitectOfTimeHero } from '../hero/ArchitectOfTimeHero';
import { Activity } from 'lucide-react';

export const Scene2LokiTimelines: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-[#100F0C] overflow-hidden">
      {/* The Architect of Time 3D cinematic scene */}
      <ArchitectOfTimeHero isIntroScene={true} />

      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 tva-scanlines opacity-25 pointer-events-none z-30" />

      {/* Anamorphic Cinematic Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-12 md:h-16 bg-black/85 backdrop-blur-sm z-40 flex items-center justify-between px-6 border-b border-[#F07824]/30">
        <div className="flex items-center gap-3 text-xs font-mono text-[#F6C453]">
          <Activity className="w-4 h-4 text-[#F07824] animate-pulse" />
          <span>TEMPORAL HARNESS: ACTIVE // WEAVING 14,000,605 STRANDS</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#10B981]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          <span>GOD OF STORIES // TIMELINE STABILIZER</span>
        </div>
      </div>
    </div>
  );
};
