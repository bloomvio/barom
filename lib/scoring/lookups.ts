import type {
  RoleType,
  Level,
  ProjectType,
  AiToolUse,
  Geography,
  VisaStatus,
} from "@/lib/types";

export const ROLE_EXPOSURE: Record<RoleType, number> = {
  "qa-test": 82,
  "support-ops": 78,
  "app-dev": 68,
  "business-analyst": 64,
  "erp-functional": 58,
  "erp-technical": 56,
  "data-eng-analytics": 48,
  "project-delivery-mgr": 44,
  "consultant-strategy": 42,
  "devops-platform": 32,
  "cloud-architect": 28,
  security: 26,
  other: 55,
};

export const STACK_RISK: Record<string, number> = {
  "Mainframe-COBOL": 1.2,
  "Manual-Test": 1.18,
  "SAP-ABAP": 1.1,
  Java: 1.05,
  ".NET": 1.05,
  Selenium: 1.05,
  "JavaScript/TS": 0.98,
  Python: 0.95,
  SQL: 1.0,
  "Cloud-AWS": 0.85,
  "Cloud-Azure": 0.85,
  "Cloud-GCP": 0.85,
  Kubernetes: 0.78,
  Terraform: 0.78,
  Playwright: 0.92,
  Cypress: 0.94,
  Salesforce: 1.02,
  "Salesforce-Apex": 1.02,
  ServiceNow: 0.95,
  Oracle: 1.08,
  Workday: 1.0,
  "Go/Golang": 0.88,
  Rust: 0.82,
  Ruby: 1.0,
  PHP: 1.05,
  Angular: 0.98,
  React: 0.95,
  Vue: 0.97,
  "Node.js": 0.95,
  "Spring Boot": 1.03,
  "Microservices": 0.9,
  "REST APIs": 0.98,
  "GraphQL": 0.93,
  Docker: 0.88,
  Ansible: 0.9,
  "CI/CD": 0.88,
};

export const PROJECT_RISK: Record<ProjectType, number> = {
  "tm-staff-aug": 78,
  "managed-services": 62,
  "fixed-bid-delivery": 55,
  mixed: 50,
  "product-development": 38,
  "advisory-strategy": 32,
};

export const LEVEL_ADJUSTMENT: Record<Level, number> = {
  associate: +8,
  consultant: +4,
  "senior-consultant": 0,
  lead: -2,
  manager: -4,
  "senior-manager": -6,
  "principal-director": -10,
};

export const GEO_BASE: Record<Geography, number> = {
  india: 65,
  us: 50,
  uk: 55,
  eu: 50,
  "middle-east": 60,
  canada: 52,
  "apac-other": 58,
  other: 55,
};

export const VISA_ADJUSTMENT: Partial<Record<VisaStatus, number>> = {
  h1b: 12,
  l1: 12,
  "student-opt": 18,
};

export const AI_RESILIENCE: Record<AiToolUse, number> = {
  daily: 60,
  weekly: 40,
  occasional: 20,
  "never-not-allowed": 0,
};

// Experience years affect trajectory — more experience = lower base exposure
export const EXPERIENCE_ADJUSTMENT: Record<string, number> = {
  "0-2": +10,
  "3-5": +5,
  "6-10": 0,
  "11-15": -5,
  "16+": -8,
};

// Firm type risk (T&M shops most at risk)
export const FIRM_RISK: Record<string, number> = {
  "tier1-si": 1.08,
  "big4-tech": 0.95,
  "tier2-si": 1.05,
  "boutique-consulting": 0.92,
  "product-co": 0.82,
  "in-house-it": 1.02,
  "freelance-contract": 0.98,
  other: 1.0,
};
