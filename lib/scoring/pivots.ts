import type { IntakeAnswers, PivotPath } from "@/lib/types";

const PIVOT_TABLE: Array<{
  roleTypes: string[];
  stacks: string[];
  paths: Omit<PivotPath, "priorityRank">[];
}> = [
  {
    roleTypes: ["app-dev"],
    stacks: ["Java", ".NET", "Spring Boot"],
    paths: [
      {
        id: "platform-sre",
        name: "Platform / SRE Engineer",
        destinationExposure: 28,
        salaryDelta: { min: 15, max: 35, currency: "%" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["Kubernetes", "Terraform", "Prometheus/Grafana", "Go/Python", "Incident Management"],
      },
      {
        id: "ai-solutions-architect",
        name: "AI Solutions Architect",
        destinationExposure: 32,
        salaryDelta: { min: 20, max: 45, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["LLM APIs", "RAG patterns", "Cloud AI services", "Solution design", "Prompt engineering"],
      },
      {
        id: "senior-sdet",
        name: "Senior SDET / Test Architect",
        destinationExposure: 38,
        salaryDelta: { min: 10, max: 25, currency: "%" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["Playwright/Cypress", "Test strategy", "CI/CD integration", "Performance testing", "Contract testing"],
      },
    ],
  },
  {
    roleTypes: ["app-dev"],
    stacks: ["JavaScript/TS", "React", "Node.js", "Angular", "Vue"],
    paths: [
      {
        id: "fullstack-ai",
        name: "Full-Stack AI Product Engineer",
        destinationExposure: 30,
        salaryDelta: { min: 15, max: 40, currency: "%" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["LLM API integration", "Vercel AI SDK", "TypeScript strict", "Next.js", "Streaming UIs"],
      },
      {
        id: "platform-sre",
        name: "Platform / SRE Engineer",
        destinationExposure: 28,
        salaryDelta: { min: 15, max: 35, currency: "%" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["Kubernetes", "Terraform", "Prometheus/Grafana", "Incident response", "Cloud cost optimization"],
      },
      {
        id: "engineering-manager",
        name: "Engineering Manager",
        destinationExposure: 25,
        salaryDelta: { min: 20, max: 50, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["Team leadership", "Delivery management", "Technical roadmap", "Stakeholder management", "Hiring/coaching"],
      },
    ],
  },
  {
    roleTypes: ["qa-test"],
    stacks: ["Manual-Test", "Selenium"],
    paths: [
      {
        id: "senior-sdet",
        name: "Senior SDET",
        destinationExposure: 38,
        salaryDelta: { min: 20, max: 40, currency: "%" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["Playwright", "Cypress", "API testing", "Python/JS", "CI/CD pipelines"],
      },
      {
        id: "test-architect",
        name: "Test Architect",
        destinationExposure: 32,
        salaryDelta: { min: 25, max: 45, currency: "%" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["Test strategy", "Quality engineering", "Toolchain design", "Risk-based testing", "Shift-left practices"],
      },
      {
        id: "quality-eng-lead",
        name: "Quality Engineering Lead",
        destinationExposure: 30,
        salaryDelta: { min: 30, max: 55, currency: "%" },
        timeMonths: { min: 12, max: 20 },
        requiredSkills: ["Team leadership", "Quality metrics", "DevOps integration", "AI-assisted testing", "Customer advocacy"],
      },
    ],
  },
  {
    roleTypes: ["qa-test"],
    stacks: ["Playwright", "Cypress"],
    paths: [
      {
        id: "ai-quality-engineer",
        name: "AI Quality / LLM Testing Engineer",
        destinationExposure: 25,
        salaryDelta: { min: 25, max: 55, currency: "%" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["LLM evaluation", "Evals frameworks", "Python", "Statistical testing", "Red-teaming"],
      },
      {
        id: "test-architect",
        name: "Test Architect",
        destinationExposure: 32,
        salaryDelta: { min: 25, max: 45, currency: "%" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["Test strategy", "Quality engineering", "Toolchain design", "Performance testing", "Observability"],
      },
      {
        id: "devrel-dx",
        name: "Developer Experience / DevRel",
        destinationExposure: 22,
        salaryDelta: { min: 15, max: 40, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["Technical writing", "Developer tools", "Community building", "API design", "Demo engineering"],
      },
    ],
  },
  {
    roleTypes: ["erp-functional"],
    stacks: ["SAP-ABAP", "Oracle", "Workday"],
    paths: [
      {
        id: "ai-integration-architect",
        name: "AI Integration Architect",
        destinationExposure: 30,
        salaryDelta: { min: 20, max: 50, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["ERP-AI integration patterns", "BTP/AI services", "Business process automation", "Change management", "ROI modeling"],
      },
      {
        id: "solution-architect",
        name: "Solution Architect",
        destinationExposure: 35,
        salaryDelta: { min: 25, max: 45, currency: "%" },
        timeMonths: { min: 12, max: 20 },
        requiredSkills: ["Enterprise architecture", "Vendor evaluation", "Technical pre-sales", "Cloud migration", "Governance"],
      },
      {
        id: "industry-domain-lead",
        name: "Industry Domain Lead",
        destinationExposure: 28,
        salaryDelta: { min: 30, max: 60, currency: "%" },
        timeMonths: { min: 18, max: 36 },
        requiredSkills: ["Deep industry expertise", "Product advisory", "Go-to-market", "Executive relationships", "Thought leadership"],
      },
    ],
  },
  {
    roleTypes: ["erp-technical"],
    stacks: ["SAP-ABAP"],
    paths: [
      {
        id: "sap-btp-architect",
        name: "SAP BTP / Cloud Integration Architect",
        destinationExposure: 32,
        salaryDelta: { min: 20, max: 45, currency: "%" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["SAP BTP", "Integration Suite", "CAP framework", "ABAP RAP", "Cloud Foundry"],
      },
      {
        id: "ai-integration-architect",
        name: "AI Integration Architect",
        destinationExposure: 30,
        salaryDelta: { min: 25, max: 50, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["SAP AI Core", "LLM grounding", "Process automation", "API governance", "Enterprise AI security"],
      },
      {
        id: "platform-eng",
        name: "Platform Engineering Lead",
        destinationExposure: 26,
        salaryDelta: { min: 20, max: 40, currency: "%" },
        timeMonths: { min: 12, max: 20 },
        requiredSkills: ["Kubernetes", "IDP design", "DevOps toolchains", "Cloud-native migration", "FinOps"],
      },
    ],
  },
  {
    roleTypes: ["business-analyst"],
    stacks: [],
    paths: [
      {
        id: "product-manager",
        name: "Product Manager",
        destinationExposure: 30,
        salaryDelta: { min: 20, max: 50, currency: "%" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["Product discovery", "Roadmap prioritization", "User research", "Data-driven decisions", "Stakeholder alignment"],
      },
      {
        id: "ai-product-manager",
        name: "AI Product Manager",
        destinationExposure: 22,
        salaryDelta: { min: 30, max: 65, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["LLM product patterns", "Responsible AI", "Evals & feedback loops", "AI product metrics", "Trust & safety"],
      },
      {
        id: "strategy-consultant",
        name: "Strategy / Transformation Consultant",
        destinationExposure: 35,
        salaryDelta: { min: 25, max: 55, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["Executive communication", "Business case modeling", "Org design", "Digital transformation", "Change management"],
      },
    ],
  },
  {
    roleTypes: ["devops-platform"],
    stacks: ["Kubernetes", "Terraform", "Docker", "Ansible"],
    paths: [
      {
        id: "platform-eng-lead",
        name: "Platform Engineering Lead",
        destinationExposure: 22,
        salaryDelta: { min: 25, max: 50, currency: "%" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["IDP design", "Backstage/Port", "FinOps", "Security posture", "Developer productivity"],
      },
      {
        id: "cloud-architect",
        name: "Cloud Architect",
        destinationExposure: 26,
        salaryDelta: { min: 30, max: 55, currency: "%" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["Multi-cloud strategy", "FinOps", "Security architecture", "Migration playbooks", "Well-Architected reviews"],
      },
      {
        id: "engineering-manager",
        name: "Engineering Manager",
        destinationExposure: 25,
        salaryDelta: { min: 25, max: 55, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["Hire/grow SRE teams", "OKR facilitation", "Incident culture", "Vendor management", "Executive reporting"],
      },
    ],
  },
  {
    roleTypes: ["data-eng-analytics"],
    stacks: ["Python", "SQL"],
    paths: [
      {
        id: "ml-engineer",
        name: "ML / AI Engineer",
        destinationExposure: 22,
        salaryDelta: { min: 25, max: 60, currency: "%" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["MLOps", "Feature stores", "Model deployment", "LLM fine-tuning", "Experiment tracking"],
      },
      {
        id: "analytics-engineer",
        name: "Analytics Engineer / dbt Lead",
        destinationExposure: 30,
        salaryDelta: { min: 15, max: 35, currency: "%" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["dbt", "Data modeling", "Semantic layer", "Metrics cataloging", "Data contracts"],
      },
      {
        id: "data-platform-architect",
        name: "Data Platform Architect",
        destinationExposure: 28,
        salaryDelta: { min: 30, max: 55, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["Lakehouse architecture", "Streaming data", "Data governance", "Cost optimization", "Vendor evaluation"],
      },
    ],
  },
  {
    roleTypes: ["cloud-architect"],
    stacks: ["Cloud-AWS", "Cloud-Azure", "Cloud-GCP"],
    paths: [
      {
        id: "enterprise-architect",
        name: "Enterprise / Principal Architect",
        destinationExposure: 20,
        salaryDelta: { min: 30, max: 60, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["Enterprise architecture frameworks", "C-suite advisory", "Technical governance", "Portfolio strategy", "Org-wide standards"],
      },
      {
        id: "ai-infra-architect",
        name: "AI Infrastructure Architect",
        destinationExposure: 18,
        salaryDelta: { min: 35, max: 70, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["GPU/TPU infrastructure", "LLM serving", "Vector databases", "AI FinOps", "Multi-region AI deployment"],
      },
      {
        id: "cto-fractional",
        name: "Fractional CTO / Technical Advisor",
        destinationExposure: 18,
        salaryDelta: { min: 40, max: 120, currency: "%" },
        timeMonths: { min: 18, max: 36 },
        requiredSkills: ["Board-level communication", "M&A due diligence", "Build vs. buy decisions", "Fundraising narratives", "Team scaling"],
      },
    ],
  },
  {
    roleTypes: ["project-delivery-mgr"],
    stacks: [],
    paths: [
      {
        id: "ai-delivery-lead",
        name: "AI Delivery Lead",
        destinationExposure: 28,
        salaryDelta: { min: 15, max: 40, currency: "%" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["AI project governance", "Risk management for AI", "Vendor evaluation", "Change management", "Value realization tracking"],
      },
      {
        id: "transformation-lead",
        name: "Digital Transformation Lead",
        destinationExposure: 30,
        salaryDelta: { min: 20, max: 45, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["OCM", "Stakeholder management", "ROI modeling", "Executive alignment", "Agile at scale"],
      },
      {
        id: "product-manager",
        name: "Product Manager",
        destinationExposure: 30,
        salaryDelta: { min: 20, max: 50, currency: "%" },
        timeMonths: { min: 12, max: 20 },
        requiredSkills: ["Roadmap ownership", "OKR definition", "User research", "Prioritization frameworks", "Delivery execution"],
      },
    ],
  },
  {
    roleTypes: ["consultant-strategy"],
    stacks: [],
    paths: [
      {
        id: "ai-strategy-advisor",
        name: "AI Strategy & Governance Advisor",
        destinationExposure: 20,
        salaryDelta: { min: 30, max: 70, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["AI governance frameworks", "Board-level AI literacy", "Responsible AI", "Business case for AI", "Org capability building"],
      },
      {
        id: "operator-founder",
        name: "Operator / Founder",
        destinationExposure: 15,
        salaryDelta: { min: -20, max: 200, currency: "%" },
        timeMonths: { min: 18, max: 48 },
        requiredSkills: ["Domain expertise monetization", "GTM strategy", "Product thinking", "Fundraising or bootstrap", "Resilience"],
      },
      {
        id: "enterprise-architect",
        name: "Enterprise Architect",
        destinationExposure: 20,
        salaryDelta: { min: 20, max: 50, currency: "%" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["TOGAF / Zachman", "Technology strategy", "Vendor governance", "Innovation roadmap", "C-suite communication"],
      },
    ],
  },
];

// Generic fallback paths
const GENERIC_PATHS: Omit<PivotPath, "priorityRank">[] = [
  {
    id: "ai-product-manager",
    name: "AI Product Manager",
    destinationExposure: 25,
    salaryDelta: { min: 20, max: 55, currency: "%" },
    timeMonths: { min: 12, max: 24 },
    requiredSkills: ["LLM product patterns", "User research", "Roadmap prioritization", "AI ethics", "Stakeholder alignment"],
  },
  {
    id: "platform-engineer",
    name: "Platform / Cloud Engineer",
    destinationExposure: 28,
    salaryDelta: { min: 15, max: 40, currency: "%" },
    timeMonths: { min: 9, max: 18 },
    requiredSkills: ["Kubernetes", "Terraform", "Cloud-native", "Observability", "Security posture"],
  },
  {
    id: "ai-solutions-consultant",
    name: "AI Solutions Consultant",
    destinationExposure: 30,
    salaryDelta: { min: 20, max: 50, currency: "%" },
    timeMonths: { min: 9, max: 18 },
    requiredSkills: ["LLM use-case assessment", "Technical pre-sales", "POC delivery", "Business case modeling", "Change management"],
  },
];

export function getPivotPaths(answers: IntakeAnswers): PivotPath[] {
  const { roleType, primaryStack } = answers;

  // Find best match: role match first, then stack overlap
  let bestMatch = PIVOT_TABLE.find(
    (entry) =>
      entry.roleTypes.includes(roleType) &&
      (entry.stacks.length === 0 ||
        entry.stacks.some((s) => primaryStack.includes(s)))
  );

  // Fall back to role-only match
  if (!bestMatch) {
    bestMatch = PIVOT_TABLE.find((entry) => entry.roleTypes.includes(roleType));
  }

  const rawPaths = bestMatch?.paths ?? GENERIC_PATHS;

  return rawPaths.slice(0, 3).map((path, idx) => ({
    ...path,
    priorityRank: idx + 1,
  }));
}
