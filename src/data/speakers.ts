export interface SpeakerVariant {
  id: string;
  variantCode: string;
  name: string;
  designation: string;
  company: string;
  sessionTitle: string;
  sessionTrack: string;
  avatarUrl: string;
  bio: string;
  clearanceLevel: string;
  timelineOrigin: string;
  linkedin: string;
  twitter?: string;
  skills: string[];
}

export const SPEAKER_VARIANTS: SpeakerVariant[] = [
  {
    id: 'spk-01',
    variantCode: 'VAR-L616-AWS',
    name: 'Aarav Deshmukh',
    designation: 'Principal Solutions Architect',
    company: 'Amazon Web Services (AWS)',
    sessionTitle: 'Architecting Resilient Cloud Multiverses at Global Scale',
    sessionTrack: 'Keynote & Architecture',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: '14+ years pioneering hyper-scale cloud deployments, multi-region failovers, and resilient distributed foundations across Asia-Pacific.',
    clearanceLevel: 'LEVEL 5 — HIGH COUNCIL',
    timelineOrigin: 'Sacred Timeline • Sector 04',
    linkedin: 'https://linkedin.com',
    skills: ['AWS CDK', 'Multi-Region Architecture', 'Resilience Hub', 'Distributed Systems'],
  },
  {
    id: 'spk-02',
    variantCode: 'VAR-E774-GENAI',
    name: 'Dr. Tanya Sharma',
    designation: 'Head of Applied AI Research',
    company: 'Cognitive Cloud Labs',
    sessionTitle: 'From Amazon Bedrock to Autonomous Multi-Agent Workflows',
    sessionTrack: 'AI & Machine Learning',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in agentic AI frameworks, Claude 3.5 Sonnet integrations, RAG architectures with pgvector, and low-latency inference on AWS.',
    clearanceLevel: 'LEVEL 4 — NEURAL CORE',
    timelineOrigin: 'Branch Alpha-9',
    linkedin: 'https://linkedin.com',
    skills: ['Amazon Bedrock', 'LangGraph', 'OpenSearch', 'RAG Pipelines'],
  },
  {
    id: 'spk-03',
    variantCode: 'VAR-K892-OPS',
    name: 'Rohan Kulkarni',
    designation: 'Staff DevOps & Cloud Native Engineer',
    company: 'ScaleNexus Infrastructure',
    sessionTitle: 'Kubernetes on AWS (EKS): Karpenter & Multi-Cluster Mastery',
    sessionTrack: 'DevOps & Containers',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Kubernetes contributor and AWS Community Builder passionate about zero-downtime cluster rollouts, eBPF telemetry, and cost optimization.',
    clearanceLevel: 'LEVEL 4 — TEMPORAL OPS',
    timelineOrigin: 'Earth-2026-PUN',
    linkedin: 'https://linkedin.com',
    skills: ['Amazon EKS', 'Karpenter', 'ArgoCD', 'Terraform'],
  },
  {
    id: 'spk-04',
    variantCode: 'VAR-S105-SEC',
    name: 'Ananya Iyer',
    designation: 'Director of Cloud Cybersecurity',
    company: 'Aegis Sentinel Systems',
    sessionTitle: 'Zero-Trust Cloud Governance: Defending the Sacred Infrastructure',
    sessionTrack: 'Cloud Security',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: 'Pioneered automated posture compliance engines, IAM permission boundaries, and zero-day threat interception across 10,000+ AWS accounts.',
    clearanceLevel: 'LEVEL 5 — PRUNING PROTOCOL',
    timelineOrigin: 'Security Sector 09',
    linkedin: 'https://linkedin.com',
    skills: ['AWS IAM', 'GuardDuty', 'Security Hub', 'Zero-Trust'],
  },
  {
    id: 'spk-05',
    variantCode: 'VAR-M420-SRV',
    name: 'Vikramaditya Roy',
    designation: 'AWS Community Hero & Chief Architect',
    company: 'HyperFlow Cloud',
    sessionTitle: 'Serverless Event-Driven Microservices at Millions of TPS',
    sessionTrack: 'Serverless Systems',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'International speaker, book author, and champion of pragmatic serverless patterns, Lambda cold-start elimination, and EventBridge meshes.',
    clearanceLevel: 'LEVEL 4 — TIME ENGINE',
    timelineOrigin: 'Event-Horizon-8',
    linkedin: 'https://linkedin.com',
    skills: ['AWS Lambda', 'EventBridge', 'DynamoDB', 'Step Functions'],
  },
  {
    id: 'spk-06',
    variantCode: 'VAR-C331-STU',
    name: 'Pooja Joshi',
    designation: 'AWS Cloud Captain & Student Founder',
    company: 'Pune Tech Community Guild',
    sessionTitle: 'From Student Hacker to AWS Community Leader: Breaking Ground',
    sessionTrack: 'Community & Growth',
    avatarUrl: 'https://images.unsplash.com/photo-1534751516642-a171edd2521d?auto=format&fit=crop&w=600&q=80',
    bio: 'Winner of national cloud hackathons, mentoring 3,000+ engineering undergraduates in building real-world cloud applications from scratch.',
    clearanceLevel: 'LEVEL 3 — ACADEMY LIAISON',
    timelineOrigin: 'Pune Campus Alpha',
    linkedin: 'https://linkedin.com',
    skills: ['Cloud Foundations', 'Community Building', 'Hackathon Strategy'],
  },
];
