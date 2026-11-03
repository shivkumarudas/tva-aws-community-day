import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../../utils/sound';
import { 
  Activity, 
  Database, 
  Users, 
  Mic2, 
  Cpu, 
  MapPin, 
  ExternalLink, 
  Radio, 
  Terminal,
  ShieldCheck
} from 'lucide-react';

// Animated Number Counter Component
const AnimatedNumber: React.FC<{ end: number; duration?: number; suffix?: string }> = ({
  end,
  duration = 1600,
  suffix = '',
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

interface TVADashboardProps {
  onNavigate: (sectionId: string) => void;
}

export const TVADashboard: React.FC<TVADashboardProps> = ({ onNavigate }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards = [
    {
      index: '01',
      title: 'EVENT STATUS',
      subtitle: 'SACRED TIMELINE STATUS',
      isNumeric: false,
      primaryStat: 'OPERATIONAL',
      statColor: '#10B981',
      details: [
        { label: 'Time Stream', val: 'STABLE 99.998%' },
        { label: 'Nexus Variance', val: '0.00% PRUNED' },
        { label: 'Cloud Foundation', val: 'AWS GLOBAL INFRA' },
      ],
      icon: Activity,
      targetSection: 'agenda',
      badgeText: 'TELEMETRY LIVE',
    },
    {
      index: '02',
      title: 'REGISTERED PARTICIPANTS',
      subtitle: 'STUDENT COMMUNITY ENROLLMENT',
      isNumeric: true,
      numericEnd: 850,
      suffix: '+ VARIANTS',
      statColor: '#F07824',
      details: [
        { label: 'Universities', val: '45+ INSTITUTES' },
        { label: 'Pass Issued', val: 'DIGITAL ACCESS BADGE' },
        { label: 'Enrollment', val: 'NOW OPEN // STAGE 1' },
      ],
      icon: Users,
      targetSection: 'register',
      badgeText: 'TVA DATABASE',
    },
    {
      index: '03',
      title: 'SPEAKERS',
      subtitle: 'IDENTIFIED EXPERT VARIANTS',
      isNumeric: true,
      numericEnd: 6,
      suffix: ' TECH LEADERS',
      statColor: '#F6C453',
      details: [
        { label: 'Affiliations', val: 'AWS, HEROES & SRE' },
        { label: 'Focus Areas', val: 'GENAI, BEDROCK, K8S' },
        { label: 'Clearance', val: 'LEVEL 5 COUNCIL' },
      ],
      icon: Mic2,
      targetSection: 'speakers',
      badgeText: 'VARIANT FILE',
    },
    {
      index: '04',
      title: 'WORKSHOPS',
      subtitle: 'AUTHORIZED TECHNICAL MISSIONS',
      isNumeric: true,
      numericEnd: 6,
      suffix: ' MISSIONS',
      statColor: '#10B981',
      details: [
        { label: 'Environment', val: 'AWS SANDBOX TERMINALS' },
        { label: 'Curriculum', val: 'GENAI, CYBER, DEVOPS' },
        { label: 'Seats', val: 'LIMITED CAPACITY' },
      ],
      icon: Cpu,
      targetSection: 'workshops',
      badgeText: 'TIME ENGINE LABS',
    },
    {
      index: '05',
      title: 'TIMELINE RECORD',
      subtitle: 'SESSION CHRONICLE',
      isNumeric: true,
      numericEnd: 10,
      suffix: ' KEY SESSIONS',
      statColor: '#F6C453',
      details: [
        { label: 'Keynotes', val: '2 PRIME ADDRESSES' },
        { label: 'Track Split', val: 'DEV & ARCHITECTURE' },
        { label: 'Total Duration', val: '8.5 HOURS CONTINUOUS' },
      ],
      icon: Database,
      targetSection: 'agenda',
      badgeText: 'SACRED ARCHIVE',
    },
    {
      index: '06',
      title: 'EVENT LOCATION',
      subtitle: 'SPATIAL TEMPORAL COORDINATES',
      isNumeric: false,
      primaryStat: 'PUNE, MAHARASHTRA',
      statColor: '#F07824',
      details: [
        { label: 'Coordinates', val: '18.5204° N, 73.8567° E' },
        { label: 'Facility', val: 'CENTRAL AUDITORIUM' },
        { label: 'Transit Access', val: 'METRO & TRANSIT HUB' },
      ],
      icon: MapPin,
      targetSection: 'about',
      badgeText: 'COORDINATE LOCK',
    },
  ];

  const handleCardClick = (target: string, idx: number) => {
    soundManager.playAnalogClick(700 + idx * 50, 0.04);
    soundManager.playTerminalBeep(950);
    onNavigate(target);
  };

  return (
    <section id="dashboard" className="relative py-28 bg-[#14120E] border-y border-[#F07824]/25 overflow-hidden">
      {/* Background terminal scanlines and grid */}
      <div className="absolute inset-0 bg-tva-terminal opacity-25 pointer-events-none" />
      <div className="absolute inset-0 tva-scanlines opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#F07824]/40 bg-[#1D1A15] text-[#F6C453] text-xs font-mono tracking-widest uppercase mb-4 shadow">
            <Radio className="w-3.5 h-3.5 text-[#F07824] animate-pulse" />
            <span>CENTRAL TELEMETRY FEED // PUNE TIME STREAM</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-bebas tracking-wider text-[#E8DFCA] text-tva-glow">
            WELCOME TO THE TEMPORAL CLOUD AUTHORITY
          </h2>
          <p className="text-sm sm:text-base font-mono text-[#E8DFCA]/75 mt-3 max-w-2xl mx-auto">
            Live operational dashboard showing verified variant attendance, session chronicles, certified speakers, and technical missions.
          </p>
        </div>

        {/* 6 TVA Console Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const isHovered = activeCard === idx;

            return (
              <motion.div
                key={card.index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => {
                  setActiveCard(idx);
                  soundManager.playTerminalBeep(1200 + idx * 40);
                }}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => handleCardClick(card.targetSection, idx)}
                className={`dossier-card cursor-pointer p-6 rounded-none relative overflow-hidden transition-all duration-300 ${
                  isHovered ? 'scale-[1.02] bg-[#1E1B16] border-[#F07824]' : 'bg-[#181512] border-[#42452C]'
                }`}
              >
                {/* Scanning line laser across card on hover */}
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F07824]/12 to-transparent animate-laser-scan pointer-events-none" />
                )}

                {/* Card Header Row */}
                <div className="flex items-center justify-between border-b border-[#42452C]/70 pb-3 mb-4 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bebas text-xl text-[#F07824] tracking-wider">{card.index}</span>
                    <span className="text-[#E8DFCA]/40">&mdash;</span>
                    <span className="text-[#F6C453] font-bold tracking-widest">{card.title}</span>
                  </div>
                  <span className="text-[10px] text-[#E8DFCA]/60 bg-[#100F0C] px-2 py-0.5 border border-[#42452C]">
                    {card.badgeText}
                  </span>
                </div>

                {/* Card Icon & Animated Stat Value */}
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-mono text-[#E8DFCA]/65 uppercase tracking-wider">
                      {card.subtitle}
                    </div>
                    <div
                      className="text-3xl sm:text-4xl font-bebas tracking-wider"
                      style={{ color: card.statColor }}
                    >
                      {card.isNumeric && card.numericEnd !== undefined ? (
                        <AnimatedNumber end={card.numericEnd} suffix={card.suffix} />
                      ) : (
                        card.primaryStat
                      )}
                    </div>
                  </div>

                  <div className="w-13 h-13 rounded bg-[#100F0C] border border-[#F07824]/40 flex items-center justify-center text-[#F07824] shadow-inner group-hover:border-[#F6C453]">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Detailed Key-Value Rows */}
                <div className="space-y-2 bg-[#12100D] p-3 border border-[#42452C]/40 text-xs font-mono">
                  {card.details.map((row, rIdx) => (
                    <div key={rIdx} className="flex items-center justify-between">
                      <span className="text-[#E8DFCA]/60">{row.label}:</span>
                      <span className="text-[#E8DFCA] font-medium">{row.val}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Interactive Prompt */}
                <div className="mt-4 pt-3 border-t border-[#42452C]/50 flex items-center justify-between text-xs font-mono text-[#F07824] group-hover:text-[#F6C453]">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>ACCESS DIRECTIVE</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
