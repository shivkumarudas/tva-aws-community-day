import React from 'react';
import { motion } from 'framer-motion';
import { SPONSOR_PARTNERS, SponsorPartner } from '../../data/sponsors';
import { soundManager } from '../../utils/sound';
import { ExternalLink, Building2, CheckCircle2 } from 'lucide-react';

export const SponsorsSection: React.FC = () => {
  return (
    <section id="sponsors" className="relative py-28 bg-[#100F0C] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-tva-terminal opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#F07824]/40 bg-[#191714] text-[#F6C453] text-xs font-mono tracking-widest uppercase mb-4 shadow">
            <Building2 className="w-3.5 h-3.5 text-[#F07824]" />
            <span>INTER-DIMENSIONAL CLOUD ALLIANCE</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-bebas tracking-wider text-[#E8DFCA] text-tva-glow">
            OFFICIAL PARTNERS OF THE TIMELINE
          </h2>
          <p className="text-sm sm:text-base font-mono text-[#E8DFCA]/75 mt-3 max-w-2xl mx-auto">
            Industry organizations, community alliances, and infrastructure leaders providing computational power, mentorship, and opportunities to student variants.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPONSOR_PARTNERS.map((partner, idx) => {
            const isConfirmed = partner.id === 'spn-aws' || partner.id === 'spn-pune-usergroup';

            return (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="dossier-card bg-[#181512] border border-[#42452C] p-6 relative group hover:border-[#F07824] hover:shadow-tva-glow transition-all flex flex-col justify-between"
              >
                {/* Paperclip top detail */}
                <div className="absolute -top-3 left-6 w-3 h-8 rounded-full border-2 border-[#E8DFCA]/40 bg-[#29251F] pointer-events-none z-20" />

                {/* APPROVED Stamp on confirmed partners */}
                {isConfirmed && (
                  <div className="absolute top-4 right-4 pointer-events-none z-20">
                    <div className="stamp-approved text-[10px] py-0.5 px-2">
                      APPROVED PARTNER
                    </div>
                  </div>
                )}

                <div>
                  {/* Header tier and ref */}
                  <div className="flex items-center justify-between border-b border-[#42452C]/70 pb-3 mb-4 text-xs font-mono">
                    <span
                      className="font-bold tracking-wider uppercase px-2 py-0.5 text-[10px] bg-[#12100E] border"
                      style={{ color: partner.badgeColor, borderColor: partner.badgeColor }}
                    >
                      {partner.tier}
                    </span>
                    <span className="text-[#E8DFCA]/40 text-[10px]">{partner.dossierRef}</span>
                  </div>

                  {/* Partner Name & Description */}
                  <div className="mb-4">
                    <h3 className="font-bebas text-3xl tracking-wide text-[#E8DFCA] group-hover:text-[#F6C453] transition-colors leading-none mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-xs font-mono text-[#E8DFCA]/75 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>

                  {/* Key Benefits / Contributions */}
                  <div className="bg-[#12100D] p-3.5 border border-[#42452C]/40 mb-5 text-xs font-mono">
                    <div className="text-[10px] text-[#F6C453] uppercase tracking-wider mb-1.5 font-bold">
                      ALLIANCE DISPATCH:
                    </div>
                    <ul className="space-y-1.5">
                      {partner.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="text-[#E8DFCA]/70 flex items-center gap-1.5 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F07824]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* External Website Button */}
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playAnalogClick(750, 0.03)}
                  className="w-full py-2.5 px-4 bg-[#14120E] hover:bg-[#29251F] text-[#E8DFCA] hover:text-[#F6C453] border border-[#42452C] hover:border-[#F07824] font-mono text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                >
                  <span>VISIT OFFICIAL PORTAL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
