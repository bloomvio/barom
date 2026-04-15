export type RoleType =
  | 'app-dev'
  | 'qa-test'
  | 'devops-platform'
  | 'data-eng-analytics'
  | 'erp-functional'
  | 'erp-technical'
  | 'business-analyst'
  | 'project-delivery-mgr'
  | 'cloud-architect'
  | 'support-ops'
  | 'security'
  | 'consultant-strategy'
  | 'other';

export type ExperienceYears = '0-2' | '3-5' | '6-10' | '11-15' | '16+';

export type Level =
  | 'associate'
  | 'consultant'
  | 'senior-consultant'
  | 'lead'
  | 'manager'
  | 'senior-manager'
  | 'principal-director';

export type FirmType =
  | 'big4-tech'
  | 'tier1-si'
  | 'tier2-si'
  | 'boutique-consulting'
  | 'product-co'
  | 'in-house-it'
  | 'freelance-contract'
  | 'other';

export type Geography =
  | 'india'
  | 'us'
  | 'uk'
  | 'eu'
  | 'middle-east'
  | 'apac-other'
  | 'canada'
  | 'other';

export type VisaStatus =
  | 'citizen-pr'
  | 'h1b'
  | 'l1'
  | 'student-opt'
  | 'other-work-visa'
  | 'na';

export type ProjectType =
  | 'tm-staff-aug'
  | 'fixed-bid-delivery'
  | 'product-development'
  | 'managed-services'
  | 'advisory-strategy'
  | 'mixed';

export type AiToolUse = 'daily' | 'weekly' | 'occasional' | 'never-not-allowed';

export type Band = 'low' | 'moderate' | 'elevated' | 'high';

export interface IntakeAnswers {
  roleType: RoleType;
  experienceYears: ExperienceYears;
  level: Level;
  firmType: FirmType;
  geography: Geography;
  visaStatus?: VisaStatus;
  primaryStack: string[];
  projectType: ProjectType;
  aiToolUseAtWork: AiToolUse;
  topConcern?: string;
}

export interface ScoreDriver {
  label: string;
  value: number;
  weight: number;
}

export interface PivotPath {
  id: string;
  name: string;
  destinationExposure: number;
  salaryDelta: { min: number; max: number; currency: string };
  timeMonths: { min: number; max: number };
  requiredSkills: string[];
  priorityRank: number;
}

export interface ScoreResult {
  score: number;
  band: Band;
  peerPercentile: number;
  drivers: ScoreDriver[];
  pivotPaths: PivotPath[];
}
