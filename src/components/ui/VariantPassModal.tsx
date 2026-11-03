import React, { useRef } from 'react';
import { AttendeeVariant } from '../../utils/variantId';
import { soundManager } from '../../utils/sound';
import { ShieldCheck, Download, Printer, X, QrCode, Terminal, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VariantPassModalProps {
  variant: AttendeeVariant;
  onClose: () => void;
}

export const VariantPassModal: React.FC<VariantPassModalProps> = ({ variant, onClose }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = () => {
    soundManager.playAnalogClick(600, 0.05);
    window.print();
  };

  const handleDownloadJSON = () => {
    soundManager.playAnalogClick(700, 0.04);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(variant, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${variant.variantCode}_PASS.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  React.useEffect(() => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#F07824', '#F6C453', '#10B981', '#E8DFCA'],
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#14120E] border-2 border-[#F07824] p-6 sm:p-8 shadow-tva-glow-lg my-8">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playAnalogClick(500, 0.04);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-[#29251F] hover:bg-[#F07824] text-[#E8DFCA] hover:text-[#100F0C] rounded-none transition-colors border border-[#42452C]"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header Notification */}
        <div className="text-center mb-6 border-b border-[#42452C] pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#10B981]/20 border border-[#10B981] text-[#10B981] text-xs font-mono font-bold tracking-widest uppercase mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>TEMPORAL ACCESS GRANTED</span>
          </div>
          <h3 className="font-bebas text-3xl sm:text-5xl text-[#E8DFCA] text-tva-glow leading-tight">
            YOUR VARIANT HAS BEEN SUCCESSFULLY REGISTERED.
          </h3>
          <p className="text-xs font-mono text-[#E8DFCA]/75 mt-1">
            Present this credential at the Pune TVA reception desk on event day.
          </p>
        </div>

        {/* THE OFFICIAL TVA DIGITAL ATTENDEE ACCESS CARD (Matching Asset Pack Panel 10) */}
        <div
          ref={cardRef}
          className="bg-gradient-to-br from-[#1C1914] via-[#24201A] to-[#12100D] border-2 border-[#F6C453] p-6 shadow-2xl relative overflow-hidden"
        >
          {/* Top-Right and Bottom-Left Hazard Stripes */}
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
            <div className="w-24 h-4 bg-[#F07824] transform rotate-45 translate-x-6 -translate-y-2 opacity-80" />
            <div className="w-24 h-2 bg-[#F6C453] transform rotate-45 translate-x-4 translate-y-3 opacity-80" />
          </div>
          <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none overflow-hidden">
            <div className="w-24 h-4 bg-[#F07824] transform rotate-45 -translate-x-10 translate-y-4 opacity-80" />
          </div>

          {/* Card Top Strip */}
          <div className="flex items-center justify-between border-b-2 border-[#F07824] pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#F07824] text-[#100F0C] font-bebas text-xl flex items-center justify-center font-bold shadow">
                TVA
              </div>
              <div>
                <div className="font-bebas text-2xl text-[#E8DFCA] tracking-wider leading-none">
                  CHRONOVERSE // TVA
                </div>
                <div className="text-[10px] font-mono text-[#F07824] tracking-widest uppercase">
                  AWS SCD &bull; PUNE 2026
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-[#10B981] font-bold bg-[#100F0C] px-2.5 py-1 border border-[#10B981]">
                OFFICIALLY CLEARED
              </span>
            </div>
          </div>

          {/* Participant Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="sm:col-span-2 space-y-2.5">
              <div>
                <div className="text-[9px] font-mono text-[#E8DFCA]/60 uppercase tracking-wider">
                  VARIANT FULL NAME
                </div>
                <div className="font-bebas text-3xl sm:text-4xl text-[#F6C453] tracking-wide leading-none text-gold-glow">
                  {variant.fullName}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <div className="text-[9px] text-[#E8DFCA]/60">INSTITUTION</div>
                  <div className="text-[#E8DFCA] font-medium truncate">{variant.college}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[#E8DFCA]/60">YEAR / DEPT</div>
                  <div className="text-[#E8DFCA] font-medium truncate">{variant.year} &bull; {variant.department}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <div className="text-[9px] text-[#E8DFCA]/60">CATEGORY ROLE</div>
                  <div className="text-[#F07824] font-bold">{variant.role}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[#E8DFCA]/60">SECTOR DECK</div>
                  <div className="text-[#E8DFCA] font-medium">{variant.temporalSector}</div>
                </div>
              </div>
            </div>

            {/* High-Resolution Verified QR Code */}
            <div className="flex flex-col items-center justify-center p-2.5 bg-[#100F0C] border border-[#42452C]">
              <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="#100F0C" />
                {/* 3 Corner Alignment Markers */}
                <rect x="8" y="8" width="26" height="26" stroke="#F6C453" strokeWidth="4" />
                <rect x="15" y="15" width="12" height="12" fill="#F07824" />
                <rect x="66" y="8" width="26" height="26" stroke="#F6C453" strokeWidth="4" />
                <rect x="73" y="15" width="12" height="12" fill="#F07824" />
                <rect x="8" y="66" width="26" height="26" stroke="#F6C453" strokeWidth="4" />
                <rect x="15" y="73" width="12" height="12" fill="#F07824" />
                {/* Micro timing pattern dots */}
                <rect x="42" y="12" width="6" height="6" fill="#E8DFCA" />
                <rect x="52" y="22" width="6" height="6" fill="#E8DFCA" />
                <rect x="42" y="36" width="6" height="6" fill="#F6C453" />
                <rect x="52" y="46" width="6" height="6" fill="#F07824" />
                <rect x="25" y="44" width="6" height="6" fill="#E8DFCA" />
                <rect x="72" y="44" width="6" height="6" fill="#E8DFCA" />
                <rect x="44" y="64" width="6" height="6" fill="#F6C453" />
                <rect x="64" y="74" width="6" height="6" fill="#E8DFCA" />
                <rect x="82" y="64" width="6" height="6" fill="#F07824" />
              </svg>
              <span className="text-[8px] font-mono text-[#F6C453] mt-1 font-bold">SCAN AT ATRIUM</span>
            </div>
          </div>

          {/* Bottom Variant Code & Barcode */}
          <div className="bg-[#100F0C] p-3 border-t-2 border-[#42452C] flex flex-wrap items-center justify-between text-xs font-mono">
            <div>
              <div className="text-[9px] text-[#E8DFCA]/60">UNIQUE REGISTRATION VARIANT ID</div>
              <div className="text-base font-mono text-[#F07824] font-bold tracking-wider">
                {variant.variantCode}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-[#E8DFCA]/60">AUTH HASH</div>
              <div className="text-[10px] text-[#10B981] font-mono">{variant.securityHash}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-[#42452C]">
          <div className="text-xs font-mono text-[#E8DFCA]/60">
            Registered: {variant.registeredAt}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJSON}
              className="px-3.5 py-2 bg-[#29251F] hover:bg-[#F07824] text-[#E8DFCA] hover:text-[#100F0C] font-mono text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all border border-[#42452C]"
              title="Download Pass JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#29251F] hover:bg-[#F07824] text-[#E8DFCA] hover:text-[#100F0C] font-mono text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all border border-[#42452C]"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / SAVE</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#F07824] hover:bg-[#FFA04D] text-[#100F0C] font-bebas text-xl tracking-wider font-bold transition-all"
            >
              DONE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
