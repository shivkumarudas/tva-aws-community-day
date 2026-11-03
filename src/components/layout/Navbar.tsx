import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/sound';
import { Volume2, VolumeX, RotateCcw, Menu, X, Shield, Clock, Terminal } from 'lucide-react';

interface NavbarProps {
  activeSection?: string;
  onReplayIntro: () => void;
  onNavigateToRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection = 'home', 
  onReplayIntro, 
  onNavigateToRegister 
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timelineVariance, setTimelineVariance] = useState('+0.003%');

  useEffect(() => {
    return soundManager.subscribe((muted) => setIsMuted(muted));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle variance fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      const val = (0.002 + Math.random() * 0.003).toFixed(3);
      setTimelineVariance(`+${val}%`);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    soundManager.playAnalogClick(650, 0.03);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#100F0C]/95 backdrop-blur-md border-b-2 border-[#F07824]/40 shadow-panel py-2.5'
          : 'bg-gradient-to-b from-[#100F0C] via-[#100F0C]/80 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / TVA Control Terminal Emblem */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="group flex items-center gap-3 select-none"
        >
          {/* TVA Medallion */}
          <div className="relative w-10 h-10 rounded-full border-2 border-[#F07824] bg-[#29251F] flex items-center justify-center shadow-tva-glow group-hover:scale-105 transition-transform">
            <span className="font-bebas text-lg text-[#F6C453] tracking-widest font-bold">TVA</span>
            <div className="absolute inset-0 rounded-full border border-dashed border-[#F6C453]/40 animate-spin-slow pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bebas text-xl md:text-2xl tracking-wider text-[#F6C453] group-hover:text-[#FFA04D] transition-colors leading-none">
                CHRONOVERSE
              </span>
              <span className="text-[10px] font-mono text-[#F07824] bg-[#1A1814] px-1.5 py-0.2 border border-[#42452C] rounded">
                TVA
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#E8DFCA]/70">
              <span>AWS SCD PUNE</span>
              <span className="text-[#42452C]">&bull;</span>
              <span className="text-[#10B981] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                SACRED TIMELINE
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Terminal Nav Links with Dynamic Active Indicator */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#14120E] border border-[#42452C] px-3 py-1.5 shadow-inner rounded">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-mono text-xs uppercase tracking-wider transition-all relative px-3 py-1.5 rounded ${
                  isActive
                    ? 'text-[#100F0C] font-bold bg-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.6)]'
                    : 'text-[#E8DFCA]/70 hover:text-[#E8DFCA] hover:bg-[#1A1814]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Terminal Utility Controls & CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Timeline Variance Meter */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161410] border border-[#10B981]/40 text-[10px] font-mono text-[#E8DFCA]/80">
            <Clock className="w-3 h-3 text-[#10B981]" />
            <span>VARIANCE: <strong className="text-[#10B981]">{timelineVariance}</strong></span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={() => soundManager.toggleMute()}
            className={`p-2 rounded border text-xs font-mono transition-all shadow-sm ${
              !isMuted 
                ? 'bg-[#10B981]/20 border-[#10B981] text-[#34D399]' 
                : 'bg-[#191714] border-[#42452C] text-[#E8DFCA]/60 hover:text-[#E8DFCA]'
            }`}
            title={isMuted ? 'Turn Sound On' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#E8DFCA]/50" /> : <Volume2 className="w-4 h-4 text-[#10B981]" />}
          </button>

          {/* Replay Cinematic Intro */}
          <button
            onClick={() => {
              soundManager.playAnalogClick(800, 0.05);
              onReplayIntro();
            }}
            className="p-2 rounded bg-[#191714] border border-[#42452C] hover:border-[#10B981] text-[#E8DFCA]/70 hover:text-[#10B981] transition-all shadow-sm"
            title="Replay Cinematic Intro"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Register CTA Button */}
          <button
            onClick={() => {
              soundManager.playAnalogClick(700, 0.05);
              onNavigateToRegister();
            }}
            className="relative px-5 py-2 bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#059669] text-[#100F0C] font-bebas text-lg tracking-widest font-bold shadow-[0_0_20px_rgba(16,185,129,0.7)] transition-all hover:scale-105 active:scale-95 border border-[#E8DFCA] rounded"
          >
            REGISTER NOW
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => soundManager.toggleMute()}
            className="p-2 rounded bg-[#191714] border border-[#42452C] text-[#E8DFCA]/80"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#F07824]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded bg-[#191714] border border-[#F07824]/40 text-[#E8DFCA]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#F07824]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Terminal Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#100F0C]/98 border-b-2 border-[#F07824] px-6 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-[#42452C]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left font-mono text-xs uppercase tracking-wider py-2 px-2.5 rounded transition-all ${
                    isActive 
                      ? 'bg-[#F07824] text-[#100F0C] font-bold' 
                      : 'text-[#E8DFCA]/80 hover:text-[#F6C453] hover:bg-[#1A1814]'
                  }`}
                >
                  &gt; {link.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded bg-[#191714] border border-[#42452C] text-xs font-mono text-[#F6C453]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>REPLAY CINEMATIC INTRO</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToRegister();
              }}
              className="py-3 bg-gradient-to-r from-[#F07824] to-[#F6C453] text-[#100F0C] font-bebas text-xl tracking-widest font-bold shadow-tva-glow"
            >
              REGISTER NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
