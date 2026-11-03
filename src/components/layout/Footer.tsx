import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/sound';
import { 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  MapPin, 
  Terminal, 
  RotateCcw, 
  ShieldCheck, 
  Clock, 
  Compass, 
  Radio 
} from 'lucide-react';

interface FooterProps {
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = () => {
    soundManager.playAnalogClick(700, 0.03);
  };

  return (
    <footer id="contact" className="relative bg-[#0E0D0A] border-t-2 border-[#F07824] pt-16 pb-12 overflow-hidden text-xs font-mono">
      {/* Background terminal scanlines */}
      <div className="absolute inset-0 tva-scanlines opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Terminal Header */}
        <div className="bg-[#14120E] border border-[#42452C] p-6 mb-12 flex flex-wrap items-center justify-between gap-6 shadow-panel">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#10B981] animate-ping" />
            <div>
              <div className="text-[#F6C453] font-bold tracking-widest text-sm uppercase">
                TVA MAIN TERMINAL CONSOLE // SYSTEM ONLINE
              </div>
              <div className="text-[11px] text-[#E8DFCA]/60 flex items-center gap-2 mt-0.5">
                <Clock className="w-3 h-3 text-[#F07824]" />
                <span>SACRED TIME SYNC: {currentTime || 'CALIBRATING...'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Replay Intro CTA */}
            <button
              onClick={() => {
                soundManager.playAnalogClick(750, 0.05);
                onReplayIntro();
              }}
              className="px-4 py-2 bg-[#29251F] hover:bg-[#F07824] text-[#E8DFCA] hover:text-[#100F0C] font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-all border border-[#42452C] hover:border-[#F07824]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>REPLAY CINEMATIC INTRO</span>
            </button>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & TVA Inscriptions */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#F07824] bg-[#29251F] flex items-center justify-center font-bebas text-lg text-[#F6C453]">
                TVA
              </div>
              <div>
                <h3 className="font-bebas text-3xl text-[#E8DFCA] text-tva-glow tracking-wider leading-none">
                  TEMPORAL CLOUD AUTHORITY
                </h3>
                <h4 className="font-bebas text-xl text-[#F6C453] tracking-widest leading-none mt-1">
                  AWS STUDENT COMMUNITY DAY – PUNE
                </h4>
              </div>
            </div>

            <p className="font-bebas text-xl text-[#F07824] tracking-widest pt-1">
              EVERY TIMELINE BUILDS THE CLOUD.
            </p>

            <p className="text-[#E8DFCA]/70 text-xs leading-relaxed max-w-md">
              A flagship initiative driven by student cloud enthusiasts, AWS Heroes, and community leaders in Pune. Dedicated to expanding knowledge in distributed systems, AI &amp; ML, DevOps, and cloud architectures.
            </p>
          </div>

          {/* Quick Channels / Socials */}
          <div className="space-y-3">
            <div className="text-[#F6C453] font-bold uppercase tracking-wider border-b border-[#42452C] pb-2">
              COMMUNICATION CHANNELS
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 text-[#E8DFCA]/75 hover:text-[#F6C453] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#F07824]" />
                  <span>LinkedIn Community</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 text-[#E8DFCA]/75 hover:text-[#F6C453] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#F07824]" />
                  <span>Instagram @awscd.pune</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 text-[#E8DFCA]/75 hover:text-[#F6C453] transition-colors"
                >
                  <Youtube className="w-4 h-4 text-[#F07824]" />
                  <span>YouTube Sessions</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:variants@awsscdpune.in"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 text-[#E8DFCA]/75 hover:text-[#F6C453] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#F07824]" />
                  <span>Email: variants@awsscdpune.in</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Coordinates */}
          <div className="space-y-3">
            <div className="text-[#F6C453] font-bold uppercase tracking-wider border-b border-[#42452C] pb-2">
              PHYSICAL SECTOR
            </div>
            <div className="text-[#E8DFCA]/75 space-y-2 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F07824] shrink-0 mt-0.5" />
                <span>
                  Pune Metropolitan Convention Auditorium<br />
                  Pune, Maharashtra 411005, India
                </span>
              </div>
              <div className="text-[11px] text-[#F07824] pt-1">
                COORDINATES: 18.5204° N, 73.8567° E
              </div>
              <div className="text-[10px] text-[#10B981] pt-1">
                TRANSIT LINK: METRO LINE 1 &bull; PUNE JUNCTION
              </div>
            </div>
          </div>
        </div>

        {/* Bottom TVA Copyright Strip */}
        <div className="border-t border-[#42452C]/60 pt-6 flex flex-wrap items-center justify-between gap-4 text-[#E8DFCA]/50 text-[11px]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#F07824]" />
            <span>&copy; 2026 AWS Student Community Day Pune &bull; Temporal Cloud Authority. For All Time. Always.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#F6C453]">AN INDEPENDENT COMMUNITY EVENT</span>
            <span className="tracking-widest">|||| || ||||| ||</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
