import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../../utils/sound';
import { saveVariantLocally, getSavedVariant, AttendeeVariant } from '../../utils/variantId';
import { VariantPassModal } from '../ui/VariantPassModal';
import { UserCheck, Shield, AlertCircle, ArrowRight, CheckCircle2, Ticket, Terminal, Loader2 } from 'lucide-react';

export const RegistrationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: 'Computer Science & Engineering',
    year: '3rd Year (Junior)',
    role: 'Student Cloud Builder',
  });

  const [existingVariant, setExistingVariant] = useState<AttendeeVariant | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [diagnosticLog, setDiagnosticLog] = useState<string>('');

  useEffect(() => {
    const saved = getSavedVariant();
    if (saved) {
      setExistingVariant(saved);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    soundManager.playAnalogClick(1200, 0.015);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playAnalogClick(800, 0.05);

    // Form Validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.college.trim()) {
      setErrorMsg('MISSING MANDATORY DIRECTIVE: All fields are required for clearance.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('INVALID COMMUNICATOR FORMAT: Please provide a valid email address.');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 8) {
      setErrorMsg('INVALID COMMUNICATOR CODE: Please provide a valid telephone number.');
      return;
    }

    setIsSubmitting(true);
    setDiagnosticLog('[TVA-OS] ENCRYPTING VARIANT BIOMETRICS...');

    // Progressive real diagnostic steps
    setTimeout(() => {
      setDiagnosticLog('[TVA-OS] ALLOCATING SECTOR CLEARANCE & RUNNING TEMPORAL AUDIT...');
    }, 450);

    setTimeout(() => {
      setDiagnosticLog('[TVA-OS] COMMITTING CREDENTIALS TO THE SACRED RECORD...');
    }, 850);

    setTimeout(() => {
      const variant = saveVariantLocally(formData);
      setExistingVariant(variant);
      setIsSubmitting(false);
      setDiagnosticLog('');
      soundManager.playAccessGranted();
      setShowModal(true);
    }, 1300);
  };

  return (
    <section id="register" className="relative py-28 bg-[#14120E] border-t border-[#F07824]/20 overflow-hidden">
      {/* Background terminal grid */}
      <div className="absolute inset-0 bg-tva-terminal opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#F07824]/40 bg-[#1D1A15] text-[#F6C453] text-xs font-mono tracking-widest uppercase mb-4 shadow">
            <UserCheck className="w-3.5 h-3.5 text-[#F07824]" />
            <span>VARIANT ADMISSION PROTOCOL</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-bebas tracking-wider text-[#E8DFCA] text-tva-glow">
            REQUEST TEMPORAL ACCESS
          </h2>
          <p className="text-sm sm:text-base font-mono text-[#E8DFCA]/75 mt-3">
            Submit your credentials to be enrolled into the official Pune Time Registry and receive your digital variant access badge.
          </p>

          {/* Already Registered Alert Pill */}
          {existingVariant && (
            <div className="mt-6 p-4 bg-[#1A1814] border border-[#10B981] flex flex-wrap items-center justify-between gap-3 text-left">
              <div>
                <div className="text-xs font-mono text-[#10B981] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ACTIVE VARIANT DETECTED IN LOCAL STORAGE</span>
                </div>
                <div className="text-sm font-mono text-[#E8DFCA] mt-0.5">
                  {existingVariant.fullName} &bull; <span className="text-[#F6C453]">{existingVariant.variantCode}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundManager.playAnalogClick(700, 0.04);
                  setShowModal(true);
                }}
                className="px-4 py-2 bg-[#F07824] hover:bg-[#FFA04D] text-[#100F0C] font-bebas text-lg tracking-wider font-bold flex items-center gap-2 shadow"
              >
                <Ticket className="w-4 h-4" />
                <span>VIEW ACCESS PASS</span>
              </button>
            </div>
          )}
        </div>

        {/* TVA Terminal Registration Form */}
        <div className="bg-[#181512] border-2 border-[#42452C] p-6 sm:p-10 relative shadow-2xl">
          {/* Classified corner markers */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#F07824]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#F07824]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#F07824]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#F07824]" />

          <div className="border-b border-[#42452C] pb-4 mb-6 flex items-center justify-between text-xs font-mono text-[#E8DFCA]/60">
            <span className="text-[#F6C453] font-bold">TERMINAL: REG-PUN-01</span>
            <span>CLEARANCE: LEVEL 1 ADMISSIONS</span>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 bg-[#DC2626]/20 border border-[#DC2626] text-[#FCA5A5] text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#E8DFCA]/80 mb-2">
                  01. FULL NAME <span className="text-[#F07824]">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Loki Laufeyson"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-[#12100E] border border-[#42452C] focus:border-[#F07824] px-4 py-3 text-sm font-mono text-[#E8DFCA] focus:outline-none focus:ring-1 focus:ring-[#F07824] transition-all"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#E8DFCA]/80 mb-2">
                  02. EMAIL ADDRESS <span className="text-[#F07824]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="variant@cloudbuilders.in"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#12100E] border border-[#42452C] focus:border-[#F07824] px-4 py-3 text-sm font-mono text-[#E8DFCA] focus:outline-none focus:ring-1 focus:ring-[#F07824] transition-all"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#E8DFCA]/80 mb-2">
                  03. PHONE NUMBER <span className="text-[#F07824]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#12100E] border border-[#42452C] focus:border-[#F07824] px-4 py-3 text-sm font-mono text-[#E8DFCA] focus:outline-none focus:ring-1 focus:ring-[#F07824] transition-all"
                />
              </div>

              {/* College / University */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#E8DFCA]/80 mb-2">
                  04. COLLEGE / UNIVERSITY <span className="text-[#F07824]">*</span>
                </label>
                <input
                  type="text"
                  name="college"
                  required
                  placeholder="e.g. Pune Institute of Computer Technology (PICT)"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full bg-[#12100E] border border-[#42452C] focus:border-[#F07824] px-4 py-3 text-sm font-mono text-[#E8DFCA] focus:outline-none focus:ring-1 focus:ring-[#F07824] transition-all"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#E8DFCA]/80 mb-2">
                  05. DEPARTMENT / BRANCH <span className="text-[#F07824]">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-[#12100E] border border-[#42452C] focus:border-[#F07824] px-4 py-3 text-sm font-mono text-[#E8DFCA] focus:outline-none focus:ring-1 focus:ring-[#F07824] transition-all"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                  <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                  <option value="Mechanical / Electrical">Mechanical / Electrical</option>
                  <option value="Other Engineering / BCA / MCA">Other Engineering / BCA / MCA</option>
                </select>
              </div>

              {/* Year of Study */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#E8DFCA]/80 mb-2">
                  06. YEAR OF STUDY <span className="text-[#F07824]">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full bg-[#12100E] border border-[#42452C] focus:border-[#F07824] px-4 py-3 text-sm font-mono text-[#E8DFCA] focus:outline-none focus:ring-1 focus:ring-[#F07824] transition-all"
                >
                  <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                  <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                  <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                  <option value="Final Year (Senior)">Final Year (Senior)</option>
                  <option value="Postgraduate / Master's">Postgraduate / Master's</option>
                  <option value="Recent Graduate (2025/2026)">Recent Graduate (2025/2026)</option>
                </select>
              </div>
            </div>

            {/* Participant Category Role */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#E8DFCA]/80 mb-2">
                07. PARTICIPANT CATEGORY ROLE <span className="text-[#F07824]">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-[#12100E] border border-[#42452C] focus:border-[#F07824] px-4 py-3 text-sm font-mono text-[#E8DFCA] focus:outline-none focus:ring-1 focus:ring-[#F07824] transition-all"
              >
                <option value="Student Cloud Builder">Student Cloud Builder (Primary Track)</option>
                <option value="AI & ML Researcher">AI & ML Researcher</option>
                <option value="DevOps & Systems Enthusiast">DevOps & Systems Enthusiast</option>
                <option value="Competitive Programmer / Hackathon Variant">Competitive Programmer / Hackathon Variant</option>
                <option value="Community Volunteer Candidate">Community Volunteer Candidate</option>
              </select>
            </div>

            {/* Diagnostic Log Output */}
            {isSubmitting && (
              <div className="p-3 bg-[#12100E] border border-[#F07824] text-[#F6C453] text-xs font-mono flex items-center gap-2 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-[#F07824]" />
                <span>{diagnosticLog}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#F07824] via-[#F6C453] to-[#F07824] text-[#100F0C] font-bebas text-2xl tracking-widest font-bold shadow-tva-glow hover:shadow-gold-glow transition-all active:scale-[0.99] flex items-center justify-center gap-3 border-2 border-[#E8DFCA]"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING CREDENTIALS TO TVA TIME VAULT...</span>
                ) : (
                  <>
                    <Shield className="w-5 h-5 fill-current" />
                    <span>REQUEST TEMPORAL ACCESS &amp; GENERATE PASS</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Digital Attendee Access Card Modal */}
      {showModal && existingVariant && (
        <VariantPassModal
          variant={existingVariant}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
};
