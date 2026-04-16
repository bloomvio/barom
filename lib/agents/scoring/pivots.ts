import type { IntakeAnswers, PivotPath } from "@/lib/types";
import pivotData from "./pivot-paths.json";

// NOTE: PROPRIETARY — server-side only.

// Maps JSON sourceStackCategory → intake primaryStack values
const STACK_CATEGORY_MAP: Record<string, string[]> = {
  "legacy-testing":        ["Manual-Test", "Selenium"],
  "enterprise-java":       ["Java", "Oracle-PLSQL", "Oracle"],
  "modern-web":            ["JavaScript/TS", "React", "Angular", "Node.js", "Vue", "Playwright", "Cypress"],
  "legacy":                ["Mainframe-COBOL", "VB.NET"],
  "microsoft":             [".NET"],
  "sap":                   ["SAP-ABAP", "SAP-S4HANA"],
  "salesforce-servicenow": ["Salesforce-Apex", "ServiceNow", "Workday"],
  "cloud-infra":           ["Cloud-AWS", "Cloud-Azure", "Cloud-GCP", "Kubernetes", "Terraform", "Docker", "Ansible", "CI/CD"],
  "data":                  ["SQL", "Spark-dbt", "Python", "Power-BI", "Tableau", "MLOps", "LLM-APIs"],
  "general":               [], // matches any — used as fallback
};

// Legacy role aliases: normalise to canonical role names
const ROLE_ALIAS: Record<string, string> = {
  "app-dev":          "app-dev-legacy",
  "qa-test":          "qa-manual",
  "data-eng-analytics": "data-engineer",
};

interface JsonPivotEntry {
  sourceRole: string;
  sourceStackCategory: string;
  sourceBaseExposure: number;
  pivotPaths: Array<{
    id: string;
    rank: number;
    name: string;
    destinationExposure: number;
    salaryDelta: {
      india: { minLakhs: number; maxLakhs: number };
      global: { minUsdK: number; maxUsdK: number };
    };
    timeMonths: { min: number; max: number };
    requiredSkills: string[];
    difficulty: string;
    description: string;
  }>;
}

function mapJsonPath(p: JsonPivotEntry["pivotPaths"][number]): Omit<PivotPath, "priorityRank"> {
  return {
    id: p.id,
    name: p.name,
    destinationExposure: p.destinationExposure,
    salaryIndia: {
      min: p.salaryDelta.india.minLakhs,
      max: p.salaryDelta.india.maxLakhs,
      currency: "INR_LAKH",
    },
    salaryGlobal: {
      min: p.salaryDelta.global.minUsdK,
      max: p.salaryDelta.global.maxUsdK,
      currency: "USD_K",
    },
    timeMonths: p.timeMonths,
    requiredSkills: p.requiredSkills,
    difficultyRating: p.difficulty as "straightforward" | "moderate" | "ambitious",
    description: p.description,
  };
}

const ENTRIES = pivotData.paths as JsonPivotEntry[];

export function getPivotPaths(a: IntakeAnswers): PivotPath[] {
  const role = ROLE_ALIAS[a.roleType] ?? a.roleType;
  const stacks = a.primaryStack ?? [];

  // 1. Best match: role + at least one stack overlap
  let entry = ENTRIES.find((e) => {
    if (e.sourceRole !== role) return false;
    if (e.sourceStackCategory === "general") return false; // defer general
    const categoryStacks = STACK_CATEGORY_MAP[e.sourceStackCategory] ?? [];
    return stacks.some((s) => categoryStacks.includes(s));
  });

  // 2. Role-only match (picks first entry for that role regardless of stack)
  if (!entry) {
    entry = ENTRIES.find((e) => e.sourceRole === role);
  }

  // 3. No entry found → generic fallback paths
  if (!entry) {
    return GENERIC_FALLBACK;
  }

  return entry.pivotPaths
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 3)
    .map((p, i) => ({ ...mapJsonPath(p), priorityRank: i + 1 }));
}

// Fallback for roles not in the JSON (legacy aliases, consultant-strategy, other)
const GENERIC_FALLBACK: PivotPath[] = [
  {
    id: "generic-platform-sre",
    priorityRank: 1,
    name: "Platform / SRE Engineer",
    destinationExposure: 28,
    salaryIndia:  { min: 5,  max: 12, currency: "INR_LAKH" },
    salaryGlobal: { min: 15, max: 30, currency: "USD_K" },
    timeMonths: { min: 12, max: 18 },
    requiredSkills: ["Kubernetes", "Terraform", "Cloud platforms", "Observability", "Scripting"],
    difficultyRating: "moderate",
    description: "Infrastructure reliability roles show consistent demand growth across all firm types.",
  },
  {
    id: "generic-ai-solutions-architect",
    priorityRank: 2,
    name: "AI Solutions Architect",
    destinationExposure: 26,
    salaryIndia:  { min: 8,  max: 18, currency: "INR_LAKH" },
    salaryGlobal: { min: 22, max: 45, currency: "USD_K" },
    timeMonths: { min: 12, max: 24 },
    requiredSkills: ["LLM APIs", "System design", "Cloud AI services", "Prompt engineering", "Solution documentation"],
    difficultyRating: "ambitious",
    description: "Apply domain expertise to designing AI-augmented solutions. High leverage across all backgrounds.",
  },
  {
    id: "generic-product-manager",
    priorityRank: 3,
    name: "Product Manager",
    destinationExposure: 34,
    salaryIndia:  { min: 6,  max: 14, currency: "INR_LAKH" },
    salaryGlobal: { min: 18, max: 38, currency: "USD_K" },
    timeMonths: { min: 12, max: 20 },
    requiredSkills: ["Product discovery", "Agile", "Data analysis", "Stakeholder management", "User research"],
    difficultyRating: "moderate",
    description: "Product managers own outcomes, not just delivery. Growing demand, especially for AI-adjacent products.",
  },
];
