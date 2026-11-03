export interface ArchiveRecord {
  id: string;
  title: string;
  caption: string;
  timestamp: string;
  sector: string;
  imageUrl: string;
  category: 'Keynotes' | 'Workshops' | 'Hackathons' | 'Community';
  clearanceNote: string;
}

export const TIMELINE_ARCHIVES: ArchiveRecord[] = [
  {
    id: 'ARC-2025-01',
    title: 'The Great Multiverse Keynote Assembly',
    caption: 'Over 800 student variants gathered at the Central Amphitheater discussing next-gen cloud architectures.',
    timestamp: '2025.10.14 // 10:15:00 UTC',
    sector: 'Central Time Theater',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    category: 'Keynotes',
    clearanceNote: 'Declassified for variant educational viewing.',
  },
  {
    id: 'ARC-2025-02',
    title: 'Hands-on Cloud Terminal Deployment',
    caption: 'Undergraduate engineers configuring high-availability AWS Lambda microservices during the 2025 hack summit.',
    timestamp: '2025.10.14 // 13:45:12 UTC',
    sector: 'Laboratory Terminal Beta',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    category: 'Workshops',
    clearanceNote: 'Zero syntax anomalies detected.',
  },
  {
    id: 'ARC-2025-03',
    title: 'AI & Machine Learning Deep Dive Session',
    caption: 'Interactive workshop on training transformer models with Amazon Bedrock and OpenSearch vector databases.',
    timestamp: '2025.10.14 // 15:20:00 UTC',
    sector: 'Neural Intelligence Bay',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    category: 'Workshops',
    clearanceNote: 'High neural convergence recorded.',
  },
  {
    id: 'ARC-2025-04',
    title: 'Student Variant Hackathon Finals',
    caption: 'Student finalist teams presenting decentralized cloud disaster recovery systems to the AWS jury panel.',
    timestamp: '2025.10.14 // 17:00:44 UTC',
    sector: 'Evaluation Nexus 03',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    category: 'Hackathons',
    clearanceNote: 'Grand Prize awarded to Variant Team Quantum.',
  },
  {
    id: 'ARC-2025-05',
    title: 'Community Builder Swag & Badge Protocol',
    caption: 'Exclusive AWS Community stickers, retro TVA pins, badges, and developer kits presented to participants.',
    timestamp: '2025.10.14 // 18:30:00 UTC',
    sector: 'Logistics Vault',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    category: 'Community',
    clearanceNote: '100% variant satisfaction logged.',
  },
  {
    id: 'ARC-2025-06',
    title: 'The Sacred Community Collective Photo',
    caption: 'Closing celebration with mentors, speakers, AWS heroes, and student leaders under the golden banner.',
    timestamp: '2025.10.14 // 19:15:30 UTC',
    sector: 'Grand Atrium Deck',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
    category: 'Community',
    clearanceNote: 'Sacred timeline preserved for all time.',
  },
];
