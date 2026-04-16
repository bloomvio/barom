import type {
  RoleType,
  Level,
  ProjectType,
  AiToolUse,
  Geography,
  VisaStatus,
} from "@/lib/types";

// NOTE: These tables are PROPRIETARY — server-side only.
// Never import this file from client components.
// Never expose values on the methodology page.

export const ROLE_EXPOSURE: Record<RoleType, number> = {
  // V2 roles
  'qa-manual':           88,
  'support-ops':         82,
  'app-dev-legacy':      74,
  'data-analyst':        56,
  'business-analyst':    66,
  'qa-automation':       72,
  'erp-functional':      62,
  'erp-technical':       68,
  'salesforce-dev':      55,
  'servicenow':          54,
  'app-dev-modern':      52,
  'fullstack-dev':       58,
  'data-engineer':       44,
  'project-delivery-mgr': 46,
  'devops-platform':     30,
  'cloud-architect':     26,
  'security':            28,
  'sdet':                48,
  // Legacy aliases
  'app-dev':             68,
  'qa-test':             82,
  'data-eng-analytics':  48,
  'consultant-strategy': 42,
  'other':               55,
};

export const STACK_RISK: Record<string, number> = {
  // High risk — legacy / declining demand
  'Mainframe-COBOL':    1.22,
  'Manual-Test':        1.20,
  'VB.NET':             1.18,
  'SAP-ABAP':           1.12,
  'Oracle':             1.10,
  'Oracle-PLSQL':       1.10,
  'Lotus-Notes':        1.25,
  'Java':               1.06,
  '.NET':               1.02,
  'Selenium':           1.08,
  'PHP':                1.05,
  'SAP-S4HANA':         0.96,
  // Moderate
  'SQL':                1.00,
  'Angular':            0.98,
  'Salesforce-Apex':    0.94,
  'ServiceNow':         0.95,
  'Workday':            0.97,
  'Cypress':            0.94,
  'Power-BI':           0.92,
  'Tableau':            0.92,
  'Ruby':               1.00,
  // Lower risk — modern
  'Python':             0.90,
  'JavaScript/TS':      0.92,
  'React':              0.90,
  'Node.js':            0.92,
  'Vue':                0.97,
  'Angular-Modern':     0.96,
  'Go/Golang':          0.85,
  'Rust':               0.80,
  'Playwright':         0.88,
  'GraphQL':            0.93,
  'Microservices':      0.90,
  // Infrastructure — resilient
  'Cloud-AWS':          0.82,
  'Cloud-Azure':        0.84,
  'Cloud-GCP':          0.83,
  'Kubernetes':         0.76,
  'Terraform':          0.78,
  'Docker':             0.88,
  'Ansible':            0.90,
  'CI/CD':              0.88,
  // AI / emerging — strong resilience
  'LLM-APIs':           0.70,
  'MLOps':              0.72,
  'Data-Engineering':   0.80,
  'Spark-dbt':          0.80,
};

export const PROJECT_RISK: Record<ProjectType, number> = {
  'tm-staff-aug':        78,
  'managed-services':    62,
  'fixed-bid-delivery':  55,
  'mixed':               50,
  'product-development': 38,
  'advisory-strategy':   32,
};

export const LEVEL_ADJUSTMENT: Record<Level, number> = {
  associate:            +8,
  consultant:           +4,
  'senior-consultant':   0,
  lead:                 -2,
  manager:              -4,
  'senior-manager':     -6,
  'principal-director': -10,
};

export const GEO_BASE: Record<Geography, number> = {
  india:         65,
  us:            50,
  uk:            55,
  eu:            50,
  'middle-east': 60,
  canada:        52,
  'apac-other':  58,
  other:         55,
};

export const VISA_ADJUSTMENT: Partial<Record<VisaStatus, number>> = {
  h1b:           12,
  l1:            12,
  'student-opt': 18,
};

export const AI_RESILIENCE: Record<AiToolUse, number> = {
  daily:               60,
  weekly:              40,
  occasional:          20,
  'never-not-allowed':  0,
};

export const EXPERIENCE_ADJUSTMENT: Record<string, number> = {
  '0-2':  +10,
  '3-5':  +5,
  '6-10':  0,
  '11-15': -5,
  '16+':   -8,
};

export const FIRM_RISK: Record<string, number> = {
  'tier1-si':           1.08,
  'big4-tech':          0.95,
  'tier2-si':           1.05,
  'boutique-consulting': 0.92,
  'product-co':         0.82,
  'in-house-it':        1.02,
  'freelance-contract': 0.98,
  other:                1.00,
};
