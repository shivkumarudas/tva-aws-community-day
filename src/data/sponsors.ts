export interface SponsorPartner {
  id: string;
  name: string;
  tier: 'Sacred Timeline Partner' | 'Multiverse Alliance' | 'Temporal Node';
  tierCode: string;
  badgeColor: string;
  description: string;
  website: string;
  dossierRef: string;
  benefits: string[];
}

export const SPONSOR_PARTNERS: SponsorPartner[] = [
  {
    id: 'spn-aws',
    name: 'Amazon Web Services',
    tier: 'Sacred Timeline Partner',
    tierCode: 'PRT-TIER-01',
    badgeColor: '#F07824',
    description: 'The primordial cloud foundation enabling builders across all dimensions to create scalable, resilient, and secure technological architectures.',
    website: 'https://aws.amazon.com',
    dossierRef: 'SEC-ARCH-001/AWS',
    benefits: ['Keynote Presentation', 'VIP Variant Lounge', 'Exclusive Workshop Host', 'Grand Hackathon Challenge'],
  },
  {
    id: 'spn-pune-usergroup',
    name: 'AWS User Group Pune',
    tier: 'Sacred Timeline Partner',
    tierCode: 'PRT-TIER-01',
    badgeColor: '#F07824',
    description: 'The pioneering community collective uniting cloud architects, student developers, and enterprise technologists in the Pune region.',
    website: 'https://awsugpune.in',
    dossierRef: 'COMM-ALLIANCE-042',
    benefits: ['Community Hub Stage', 'Mentorship Fast-Track', 'Open Source Showcase'],
  },
  {
    id: 'spn-cloud-resilience',
    name: 'Temporal Cloud Labs',
    tier: 'Multiverse Alliance',
    tierCode: 'PRT-TIER-02',
    badgeColor: '#F6C453',
    description: 'Accelerating AI orchestration and serverless execution pipelines for modern enterprise distributed clouds.',
    website: 'https://aws.amazon.com/solutions',
    dossierRef: 'MLT-RES-771',
    benefits: ['Hands-On Lab Sponsor', 'Talent Recruitment Station', 'Technical Demo Station'],
  },
  {
    id: 'spn-devops-forge',
    name: 'Nexus Cloud Systems',
    tier: 'Multiverse Alliance',
    tierCode: 'PRT-TIER-02',
    badgeColor: '#F6C453',
    description: 'Next-generation container runtime governance, eBPF continuous telemetry, and GitOps workflows for cloud native developers.',
    website: 'https://aws.amazon.com/devops',
    dossierRef: 'OPS-FORGE-209',
    benefits: ['DevOps Challenge Host', 'Technical Swag Vault', 'Lightning Talk Slot'],
  },
  {
    id: 'spn-student-guild',
    name: 'Pune Campus Cloud Council',
    tier: 'Temporal Node',
    tierCode: 'PRT-TIER-03',
    badgeColor: '#42452C',
    description: 'Inter-university alliance fostering grassroots cloud education, student hackathons, and certifications across Maharashtra.',
    website: 'https://aws.amazon.com/education',
    dossierRef: 'ACAD-GUILD-883',
    benefits: ['Student Delegation Passes', 'Career Fair Fast-Track'],
  },
  {
    id: 'spn-cyber-guard',
    name: 'Aegis Sentinel Security',
    tier: 'Temporal Node',
    tierCode: 'PRT-TIER-03',
    badgeColor: '#42452C',
    description: 'Automated IAM privilege boundary compliance, vulnerability pruning, and cloud infrastructure governance.',
    website: 'https://aws.amazon.com/security',
    dossierRef: 'SENTINEL-DEF-124',
    benefits: ['Security CTF Host', 'Community Swag Partner'],
  },
];
