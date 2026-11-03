export interface TechnicalMission {
  id: string;
  code: string;
  title: string;
  badge: string;
  category: string;
  duration: string;
  clearanceRequired: string;
  leadVariant: string;
  briefing: string;
  deliverables: string[];
  techStack: string[];
  portalHue: string; // CSS color / hue for animated canvas portal
  status: 'CLEARANCE_GRANTED' | 'CLASSIFIED' | 'LIMITED_SEATS';
}

export const TECHNICAL_MISSIONS: TechnicalMission[] = [
  {
    id: 'msn-aws-cloud',
    code: 'MSN-OP-01',
    title: 'AWS CLOUD',
    badge: 'MISSION 01 // FOUNDATION',
    category: 'Cloud Infrastructure & High Availability',
    duration: '90 Minutes',
    clearanceRequired: 'Level 2+',
    leadVariant: 'Ops Command Desk',
    briefing: 'Master cloud monitoring, AWS CloudWatch Logs Insights, real-time alert correlation, and AWS Systems Manager automated patch baselines.',
    deliverables: [
      'Zero-touch automated patching baseline',
      'Synthetics canaries with automated rollback',
      'CloudWatch dashboards with anomaly alarms'
    ],
    techStack: ['AWS Systems Manager', 'CloudWatch', 'EventBridge', 'SNS'],
    portalHue: '#F07824',
    status: 'CLEARANCE_GRANTED',
  },
  {
    id: 'msn-ai',
    code: 'MSN-AI-02',
    title: 'ARTIFICIAL INTELLIGENCE',
    badge: 'MISSION 02 // COGNITIVE CORE',
    category: 'Machine Learning & Predictive Systems',
    duration: '100 Minutes',
    clearanceRequired: 'Level 3+',
    leadVariant: 'Neural Research Div',
    briefing: 'Train and deploy deep learning models with Amazon SageMaker, setup endpoint auto-scaling, and leverage MLflow for multiversal experiment tracking.',
    deliverables: [
      'Trained computer vision classifier endpoint',
      'Hyperparameter tuning job with automated early stopping',
      'Real-time inference pipeline with latency tracking'
    ],
    techStack: ['Amazon SageMaker', 'PyTorch', 'AWS Trainium', 'S3'],
    portalHue: '#F6C453',
    status: 'CLEARANCE_GRANTED',
  },
  {
    id: 'msn-devops',
    code: 'MSN-DO-03',
    title: 'DEVOPS',
    badge: 'MISSION 03 // PIPELINE CONTINUUM',
    category: 'CI/CD & GitOps Automation',
    duration: '90 Minutes',
    clearanceRequired: 'Level 2+',
    leadVariant: 'Temporal Pipeline Unit',
    briefing: 'Construct an unbreakable GitOps pipeline deploying containerized microservices to Amazon EKS using ArgoCD, GitHub Actions, and AWS CodeBuild.',
    deliverables: [
      'Multi-stage canary deployment workflow',
      'Automated security scanning with Trivy in CI',
      'Self-healing GitOps sync with ArgoCD'
    ],
    techStack: ['Amazon EKS', 'ArgoCD', 'GitHub Actions', 'Docker'],
    portalHue: '#10B981',
    status: 'LIMITED_SEATS',
  },
  {
    id: 'msn-cybersecurity',
    code: 'MSN-SEC-04',
    title: 'CYBERSECURITY',
    badge: 'MISSION 04 // DEFENSE & PRUNING',
    category: 'Zero-Trust Defense & Governance',
    duration: '90 Minutes',
    clearanceRequired: 'Level 4+',
    leadVariant: 'Minutemen Security Unit',
    briefing: 'Investigate synthetic breach attempts in real-time, execute AWS GuardDuty playbooks, and enforce least-privilege IAM policies with automated pruning.',
    deliverables: [
      'Automated threat remediation with Lambda',
      'AWS IAM Access Analyzer policy validation',
      'GuardDuty finding containment sandbox'
    ],
    techStack: ['AWS GuardDuty', 'IAM Identity Center', 'AWS KMS', 'WAF'],
    portalHue: '#EF4444',
    status: 'CLASSIFIED',
  },
  {
    id: 'msn-genai',
    code: 'MSN-GAI-05',
    title: 'GENERATIVE AI',
    badge: 'MISSION 05 // MULTIVERSE INTELLIGENCE',
    category: 'Foundation Models & Agents',
    duration: '120 Minutes',
    clearanceRequired: 'Level 3+',
    leadVariant: 'Autonomous Agent Bureau',
    briefing: 'Harness Amazon Bedrock to build context-aware autonomous agents, vector embeddings in OpenSearch Serverless, and dynamic function-calling pipelines.',
    deliverables: [
      'Interactive enterprise assistant powered by Claude 3.5',
      'RAG system with semantic hybrid chunking',
      'Bedrock Agent executing real AWS API actions'
    ],
    techStack: ['Amazon Bedrock', 'Claude 3.5', 'OpenSearch Serverless', 'LangChain'],
    portalHue: '#A855F7',
    status: 'LIMITED_SEATS',
  },
  {
    id: 'msn-serverless',
    code: 'MSN-SRV-06',
    title: 'SERVERLESS',
    badge: 'MISSION 06 // QUANTUM EXECUTION',
    category: 'Event-Driven Architectures',
    duration: '120 Minutes',
    clearanceRequired: 'Level 2+',
    leadVariant: 'Time Engine Facility',
    briefing: 'Engineer fully asynchronous, high-throughput microservices using AWS Lambda SnapStart, Amazon DynamoDB Single-Table Design, and EventBridge pipes.',
    deliverables: [
      'Sub-20ms p99 latency serverless endpoint',
      'DynamoDB single-table schema with global secondary index',
      'Step Functions visual workflow with saga compensation'
    ],
    techStack: ['AWS Lambda', 'DynamoDB', 'EventBridge', 'Step Functions'],
    portalHue: '#F07824',
    status: 'CLEARANCE_GRANTED',
  },
];
