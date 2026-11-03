import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../../utils/sound';
import { FileText, Bookmark, Globe2, Award, Code, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'directive' | 'community' | 'why' | 'learning'>('directive');
  const [scanning, setScanning] = useState(false);

  const tabs = [
    { id: 'directive', label: '01 // MISSION DIRECTIVE', title: 'MISSION DIRECTIVE' },
    { id: 'community', label: '02 // COMMUNITY COLLECTIVE', title: 'TVA COMMUNITY' },
    { id: 'why', label: '03 // VARIANT BENEFITS', title: 'WHY ATTEND?' },
    { id: 'learning', label: '04 // SYLLABUS TRACKS', title: 'LEARNING HORIZONS' },
  ] as const;

  const handleTabChange = (tabId: typeof activeTab) => {
    soundManager.playAnalogClick(720, 0.04);
    soundManager.playTerminalBeep(1200);
    setScanning(true);
    setActiveTab(tabId);
    setTimeout(() => setScanning(false), 800);
  };

  return (
    <section id="about" className="relative py-28 bg-[#100F0C] overflow-hidden">
      {/* Background terminal grid */}
      <div className="absolute inset-0 bg-tva-terminal opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#F07824]/40 bg-[#191714] text-[#F6C453] text-xs font-mono tracking-widest uppercase mb-4 shadow">
            <FileText className="w-3.5 h-3.5 text-[#F07824]" />
            <span>CLASSIFIED DOSSIER // DECLASSIFIED FOR VARIANTS</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-bebas tracking-wider text-[#E8DFCA] text-tva-glow">
            YOUR TIMELINE STARTS HERE.
          </h2>
          <p className="text-sm sm:text-base font-mono text-[#E8DFCA]/75 mt-3 max-w-2xl mx-auto">
            AWS Student Community Day brings together students, developers, cloud enthusiasts and technology professionals to explore cloud computing, artificial intelligence, DevOps and emerging technologies.
          </p>
        </div>

        {/* TVA Classified Folder Container */}
        <div className="bg-[#181612] border-2 border-[#42452C] rounded-none shadow-2xl relative overflow-hidden">
          {/* Top Brass Paperclip Visual */}
          <div className="absolute -top-3 left-8 w-4 h-10 rounded-full border-2 border-[#E8DFCA]/50 bg-[#29251F] pointer-events-none z-30 shadow" />

          {/* Top Folder Tab Header */}
          <div className="bg-[#12100E] border-b-2 border-[#42452C] flex flex-wrap items-center justify-between px-6 py-4 gap-3">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#E8DFCA]/70">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F07824] animate-ping" />
              <span className="text-[#F6C453] font-bold">CASE FILE:</span>
              <span className="text-[#E8DFCA] font-mono">TVA-PUN-AWS-2026 // SEC-04</span>
            </div>

            {/* Folder Tab Switches */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                    activeTab === tab.id
                      ? 'bg-[#29251F] border-[#F07824] text-[#F6C453] font-bold shadow-tva-glow'
                      : 'bg-[#14120E] border-transparent text-[#E8DFCA]/60 hover:text-[#E8DFCA] hover:bg-[#1A1814]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Laser Scanning Line Animation */}
          {scanning && (
            <div className="absolute inset-x-0 h-1 bg-[#F07824] shadow-tva-glow animate-laser-scan pointer-events-none z-30" />
          )}

          {/* Dossier Body with Rubber Stamps and Sequential Reveal */}
          <div className="p-6 sm:p-10 relative min-h-[440px]">
            {/* Rubber Stamp in top-right */}
            <div className="absolute top-6 right-6 pointer-events-none hidden md:block">
              <div className="stamp-classified">
                CONFIDENTIAL // LEVEL 4
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* TAB 1: MISSION DIRECTIVE */}
              {activeTab === 'directive' && (
                <motion.div
                  key="tab-directive"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-[#29251F] border border-[#F07824] flex items-center justify-center text-[#F6C453] shadow">
                      <Bookmark className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bebas tracking-wide text-[#E8DFCA] leading-none">
                        THE SACRED MISSION OF CLOUD BUILDERS
                      </h3>
                      <p className="text-xs font-mono text-[#F07824] tracking-wider mt-1">DIRECTIVE: FORGE THE FUTURE OF DISTRIBUTED SYSTEMS</p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-mono text-[#E8DFCA]/85 leading-relaxed max-w-3xl">
                    Across all dimensions of software engineering, cloud computing stands as the foundational timeline weaving our digital world. AWS Student Community Day Pune unites 800+ student variants with world-class cloud architects, AWS heroes, and technology leaders.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                    <div className="bg-[#12100D] p-5 border-l-4 border-[#F07824]">
                      <div className="text-base font-bebas tracking-wider text-[#F6C453] mb-1">
                        EVENT OBJECTIVE 01: EMPOWERMENT
                      </div>
                      <p className="text-xs font-mono text-[#E8DFCA]/75 leading-relaxed">
                        Democratize enterprise-grade cloud knowledge, opening avenues for undergraduates to build, deploy, and scale real-world cloud architectures.
                      </p>
                    </div>
                    <div className="bg-[#12100D] p-5 border-l-4 border-[#10B981]">
                      <div className="text-base font-bebas tracking-wider text-[#10B981] mb-1">
                        EVENT OBJECTIVE 02: MULTIVERSE ACCELERATION
                      </div>
                      <p className="text-xs font-mono text-[#E8DFCA]/75 leading-relaxed">
                        Accelerate student careers with real industry connections, direct mentorship, resume reviews by AWS community veterans, and hackathon showcases.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: THE COMMUNITY */}
              {activeTab === 'community' && (
                <motion.div
                  key="tab-community"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-[#29251F] border border-[#F07824] flex items-center justify-center text-[#F6C453] shadow">
                      <Globe2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bebas tracking-wide text-[#E8DFCA] leading-none">
                        AWS USER GROUP PUNE &amp; STUDENT GUILD
                      </h3>
                      <p className="text-xs font-mono text-[#F07824] tracking-wider mt-1">GRASSROOTS CLOUD MOVEMENT ACROSS MAHARASHTRA</p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-mono text-[#E8DFCA]/85 leading-relaxed max-w-3xl">
                    The AWS Community in Pune is an independent, non-profit community of cloud professionals, researchers, developers, and students passionate about sharing real-world cloud computing knowledge.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-center">
                    <div className="bg-[#12100D] p-6 border border-[#42452C]">
                      <div className="font-bebas text-5xl text-[#F07824]">5,000+</div>
                      <div className="text-xs font-mono text-[#E8DFCA]/70 mt-1 uppercase tracking-wider">COMMUNITY MEMBERS</div>
                    </div>
                    <div className="bg-[#12100D] p-6 border border-[#42452C]">
                      <div className="font-bebas text-5xl text-[#F6C453]">120+</div>
                      <div className="text-xs font-mono text-[#E8DFCA]/70 mt-1 uppercase tracking-wider">TECHNICAL SESSIONS HELD</div>
                    </div>
                    <div className="bg-[#12100D] p-6 border border-[#42452C]">
                      <div className="font-bebas text-5xl text-[#10B981]">100%</div>
                      <div className="text-xs font-mono text-[#E8DFCA]/70 mt-1 uppercase tracking-wider">COMMUNITY-DRIVEN &amp; RUN</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: WHY ATTEND? */}
              {activeTab === 'why' && (
                <motion.div
                  key="tab-why"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-[#29251F] border border-[#F07824] flex items-center justify-center text-[#F6C453] shadow">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bebas tracking-wide text-[#E8DFCA] leading-none">
                        WHY EVERY VARIANT MUST ATTEND
                      </h3>
                      <p className="text-xs font-mono text-[#F07824] tracking-wider mt-1">CLEARANCE PRIVILEGES &amp; EXCLUSIVE PERKS</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 bg-[#12100D] p-4 border border-[#42452C]">
                      <CheckCircle2 className="w-5 h-5 text-[#F07824] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bebas text-xl text-[#F6C453]">HANDS-ON CLOUD TERMINALS</div>
                        <p className="text-xs font-mono text-[#E8DFCA]/75 mt-0.5">Step-by-step technical labs on Amazon Bedrock, Kubernetes on EKS, Serverless Lambda, and CloudWatch.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#12100D] p-4 border border-[#42452C]">
                      <CheckCircle2 className="w-5 h-5 text-[#F07824] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bebas text-xl text-[#F6C453]">AWS CREDITS &amp; SWAG KITS</div>
                        <p className="text-xs font-mono text-[#E8DFCA]/75 mt-0.5">Free AWS promotional credits for cloud sandboxes, official TVA theme badges, stickers, and t-shirts.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#12100D] p-4 border border-[#42452C]">
                      <CheckCircle2 className="w-5 h-5 text-[#F07824] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bebas text-xl text-[#F6C453]">MEET AWS HEROES &amp; ARCHITECTS</div>
                        <p className="text-xs font-mono text-[#E8DFCA]/75 mt-0.5">Interact face-to-face with AWS Solutions Architects, industry hiring managers, and developer advocates.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#12100D] p-4 border border-[#42452C]">
                      <CheckCircle2 className="w-5 h-5 text-[#F07824] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bebas text-xl text-[#F6C453]">VERIFIED DIGITAL CERTIFICATION</div>
                        <p className="text-xs font-mono text-[#E8DFCA]/75 mt-0.5">Receive an official verifiable digital credential issued by the AWS Student Community for your LinkedIn portfolio.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: LEARNING TRACKS */}
              {activeTab === 'learning' && (
                <motion.div
                  key="tab-learning"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-[#29251F] border border-[#F07824] flex items-center justify-center text-[#F6C453] shadow">
                      <Code className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bebas tracking-wide text-[#E8DFCA] leading-none">
                        CURRICULUM &amp; KNOWLEDGE HORIZONS
                      </h3>
                      <p className="text-xs font-mono text-[#F07824] tracking-wider mt-1">MULTI-DISCIPLINARY TECHNICAL RIGOR</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-[#12100D] border border-[#F07824]/50 p-5">
                      <Sparkles className="w-7 h-7 text-[#F6C453] mx-auto mb-2" />
                      <div className="font-bebas text-xl text-[#E8DFCA]">GENERATIVE AI</div>
                      <div className="text-[11px] font-mono text-[#E8DFCA]/70 mt-1">Bedrock &bull; Claude 3.5 &bull; Agents &bull; RAG</div>
                    </div>
                    <div className="bg-[#12100D] border border-[#F07824]/50 p-5">
                      <Code className="w-7 h-7 text-[#10B981] mx-auto mb-2" />
                      <div className="font-bebas text-xl text-[#E8DFCA]">SERVERLESS</div>
                      <div className="text-[11px] font-mono text-[#E8DFCA]/70 mt-1">Lambda &bull; EventBridge &bull; Step Functions</div>
                    </div>
                    <div className="bg-[#12100D] border border-[#F07824]/50 p-5">
                      <Globe2 className="w-7 h-7 text-[#38BDF8] mx-auto mb-2" />
                      <div className="font-bebas text-xl text-[#E8DFCA]">DEVOPS &amp; K8S</div>
                      <div className="text-[11px] font-mono text-[#E8DFCA]/70 mt-1">EKS &bull; Karpenter &bull; ArgoCD &bull; GitOps</div>
                    </div>
                    <div className="bg-[#12100D] border border-[#F07824]/50 p-5">
                      <ShieldAlert className="w-7 h-7 text-[#EF4444] mx-auto mb-2" />
                      <div className="font-bebas text-xl text-[#E8DFCA]">SECURITY</div>
                      <div className="text-[11px] font-mono text-[#E8DFCA]/70 mt-1">GuardDuty &bull; IAM Zero-Trust &bull; KMS</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dossier Footer Strip */}
          <div className="bg-[#12100E] border-t-2 border-[#42452C] px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#E8DFCA]/65">
            <div className="flex items-center gap-3">
              <span className="text-[#F6C453] font-bold">CLASSIFICATION:</span>
              <span>PUBLIC BROADCAST FOR STUDENT BUILDERS</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="tracking-widest">||| | ||||| || ||| ||||||| |</span>
              <span className="text-[#10B981] font-bold">TIMELINE SECURED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
