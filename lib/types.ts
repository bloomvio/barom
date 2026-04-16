export type RoleType =
  | 'app-dev-legacy'
  | 'app-dev-modern'
  | 'fullstack-dev'
  | 'qa-manual'
  | 'qa-automation'
  | 'sdet'
  | 'erp-functional'
  | 'erp-technical'
  | 'salesforce-dev'
  | 'servicenow'
  | 'devops-platform'
  | 'cloud-architect'
  | 'security'
  | 'data-engineer'
  | 'data-analyst'
  | 'project-delivery-mgr'
  | 'business-analyst'
  | 'support-ops'
  // legacy aliases kept for backward compat with stored readings
  | 'app-dev'
  | 'qa-test'
  | 'data-eng-analytics'
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

// Salary delta: absolute values (INR lakhs / USD thousands)
export interface SalaryRange {
  min: number;
  max: number;
  currency: string; // 'INR_LAKH' | 'USD_K' | '%'
}

export interface PivotPath {
  id: string;
  name: string;
  destinationExposure: number;
  // New V2: separate India and Global salary
  salaryIndia?: SalaryRange;    // e.g. { min: 4, max: 8, currency: 'INR_LAKH' }
  salaryGlobal?: SalaryRange;   // e.g. { min: 12, max: 20, currency: 'USD_K' }
  // Legacy V1 format kept for stored readings
  salaryDelta?: { min: number; max: number; currency: string };
  timeMonths: { min: number; max: number };
  requiredSkills: string[];
  priorityRank: number;
  difficultyRating?: 'straightforward' | 'moderate' | 'ambitious';
  description?: string;
}

export interface ScoreResult {
  score: number;
  band: Band;
  peerPercentile: number;
  drivers: ScoreDriver[];
  pivotPaths: PivotPath[];
  dataFreshness?: {
    jobPostings?: string;
    filings?: string;
    lastUpdated: string;
  };
}

// Access tiers for results paywall
export type AccessTier = 'free' | 'one-time' | 'standard' | 'founding';
