// Variant Registry & Access Pass Generator

export interface AttendeeVariant {
  id: string;
  variantCode: string;
  fullName: string;
  email: string;
  college: string;
  year: string;
  department: string;
  phone: string;
  role: string;
  registeredAt: string;
  classification: string;
  temporalSector: string;
  securityHash: string;
  qrPayload: string;
}

const STORAGE_KEY = 'TVA_REGISTERED_VARIANT_2026';

export function generateVariantCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VAR-2026-PUN-${rand}`;
}

export function saveVariantLocally(data: Omit<AttendeeVariant, 'id' | 'variantCode' | 'registeredAt' | 'classification' | 'temporalSector' | 'securityHash' | 'qrPayload'>): AttendeeVariant {
  const variantCode = generateVariantCode();
  const id = `VAR_${Date.now()}`;
  const now = new Date();
  const registeredAt = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  
  const sectors = ['Sector Alpha-01', 'Sector Beta-04', 'Sector Gamma-07', 'Neural Deck 02', 'Time Engine Deck'];
  const temporalSector = sectors[Math.floor(Math.random() * sectors.length)];
  
  const classifications = [
    'CLASS-A // TEMPORAL CLOUD BUILDER',
    'CLASS-B // AUTONOMOUS VARIANT',
    'CLASS-A // RESEARCH FELLOW',
    'CLASS-S // HIGH ARCHITECT'
  ];
  const classification = classifications[Math.floor(Math.random() * classifications.length)];

  // Simple deterministic temporal security checksum
  const securityHash = `TVA-${Math.random().toString(16).substring(2, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  const qrPayload = JSON.stringify({
    variant: variantCode,
    name: data.fullName,
    event: 'AWS-SCD-PUNE-2026',
    role: data.role,
    sector: temporalSector,
    auth: securityHash
  });

  const record: AttendeeVariant = {
    ...data,
    id,
    variantCode,
    registeredAt,
    classification,
    temporalSector,
    securityHash,
    qrPayload
  };

  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    }
  } catch {}

  return record;
}

export function getSavedVariant(): AttendeeVariant | null {
  try {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as AttendeeVariant;
      }
    }
  } catch {}
  return null;
}
