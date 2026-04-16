import type { IntakeAnswers, PivotPath } from "@/lib/types";

// NOTE: PROPRIETARY — server-side only.

const PIVOTS: Array<{
  roleTypes: string[];
  stacks?: string[];
  paths: Omit<PivotPath, "priorityRank">[];
}> = [
  // ── Manual QA ──────────────────────────────────────────────────────────
  {
    roleTypes: ["qa-manual", "qa-test"],
    stacks: ["Manual-Test", "Selenium"],
    paths: [
      {
        id: "sdet-architect",
        name: "Senior SDET / Test Architect",
        destinationExposure: 38,
        salaryIndia:  { min: 4, max: 8,  currency: "INR_LAKH" },
        salaryGlobal: { min: 12, max: 20, currency: "USD_K" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["Playwright", "API testing", "CI/CD", "Test architecture", "Python/JS"],
        difficultyRating: "straightforward",
        description: "Transition from manual validation to engineering-led quality. High demand at all major SIs.",
      },
      {
        id: "quality-eng-lead",
        name: "Quality Engineering Lead",
        destinationExposure: 42,
        salaryIndia:  { min: 6, max: 12, currency: "INR_LAKH" },
        salaryGlobal: { min: 15, max: 25, currency: "USD_K" },
        timeMonths: { min: 12, max: 18 },
        requiredSkills: ["Test strategy", "Team management", "Shift-left testing", "DevOps integration", "Metrics"],
        difficultyRating: "moderate",
        description: "Lead quality engineering practices across teams. Combines technical depth with delivery ownership.",
      },
      {
        id: "ai-test-engineer",
        name: "AI Test Engineer",
        destinationExposure: 28,
        salaryIndia:  { min: 8, max: 15, currency: "INR_LAKH" },
        salaryGlobal: { min: 20, max: 35, currency: "USD_K" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["LLM testing", "AI agent validation", "Prompt testing", "Autonomous test generation", "Adversarial evaluation"],
        difficultyRating: "ambitious",
        description: "Specialize in testing AI systems — the fastest-growing testing niche in enterprise.",
      },
    ],
  },

  // ── QA Automation ──────────────────────────────────────────────────────
  {
    roleTypes: ["qa-automation"],
    paths: [
      {
        id: "sdet-architect",
        name: "Senior SDET / Test Architect",
        destinationExposure: 35,
        salaryIndia:  { min: 5, max: 10, currency: "INR_LAKH" },
        salaryGlobal: { min: 15, max: 25, currency: "USD_K" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["Test architecture", "Multi-framework", "Performance testing", "Contract testing", "API strategy"],
        difficultyRating: "straightforward",
        description: "Deepen from execution to architecture. Shift from writing tests to designing the testing platform.",
      },
      {
        id: "devops-qe",
        name: "DevOps / QE Platform Engineer",
        destinationExposure: 30,
        salaryIndia:  { min: 6, max: 12, currency: "INR_LAKH" },
        salaryGlobal: { min: 18, max: 30, currency: "USD_K" },
        timeMonths: { min: 9, max: 15 },
        requiredSkills: ["CI/CD pipelines", "Kubernetes", "Docker", "Observability", "Infrastructure as code"],
        difficultyRating: "moderate",
        description: "Leverage test automation skills to own the delivery pipeline. Strong market demand.",
      },
      {
        id: "ai-test-engineer",
        name: "AI Test Engineer",
        destinationExposure: 28,
        salaryIndia:  { min: 8, max: 15, currency: "INR_LAKH" },
        salaryGlobal: { min: 22, max: 38, currency: "USD_K" },
        timeMonths: { min: 12, max: 20 },
        requiredSkills: ["LLM API testing", "AI agent validation", "Bias/fairness testing", "Autonomous test gen", "Eval frameworks"],
        difficultyRating: "ambitious",
        description: "Apply automation expertise to the emerging field of AI validation and safety testing.",
      },
    ],
  },

  // ── SDET ───────────────────────────────────────────────────────────────
  {
    roleTypes: ["sdet"],
    paths: [
      {
        id: "platform-sre",
        name: "Platform / SRE Engineer",
        destinationExposure: 28,
        salaryIndia:  { min: 8, max: 16, currency: "INR_LAKH" },
        salaryGlobal: { min: 20, max: 35, currency: "USD_K" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["Kubernetes", "Terraform", "Observability", "Go/Python", "Incident management"],
        difficultyRating: "moderate",
        description: "SDET skills map well to SRE — you already own reliability. Close the infrastructure gap.",
      },
      {
        id: "ai-test-engineer",
        name: "AI Systems Test Lead",
        destinationExposure: 24,
        salaryIndia:  { min: 10, max: 20, currency: "INR_LAKH" },
        salaryGlobal: { min: 25, max: 45, currency: "USD_K" },
        timeMonths: { min: 12, max: 18 },
        requiredSkills: ["LLM evaluation", "Adversarial prompting", "Agentic testing", "Red-teaming", "Safety frameworks"],
        difficultyRating: "ambitious",
        description: "Lead the testing discipline for AI systems. The most senior and best-compensated path from SDET.",
      },
      {
        id: "engineering-manager-qe",
        name: "Engineering Manager — Quality",
        destinationExposure: 26,
        salaryIndia:  { min: 12, max: 22, currency: "INR_LAKH" },
        salaryGlobal: { min: 28, max: 50, currency: "USD_K" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["Team leadership", "Quality strategy", "Hiring", "Stakeholder management", "Program delivery"],
        difficultyRating: "moderate",
        description: "Move into engineering management with a quality engineering specialization.",
      },
    ],
  },

  // ── Legacy App Dev ─────────────────────────────────────────────────────
  {
    roleTypes: ["app-dev-legacy", "app-dev"],
    stacks: ["Java", ".NET", "SAP-ABAP", "Oracle-PLSQL", "Mainframe-COBOL"],
    paths: [
      {
        id: "platform-sre",
        name: "Platform / SRE Engineer",
        destinationExposure: 30,
        salaryIndia:  { min: 5, max: 10, currency: "INR_LAKH" },
        salaryGlobal: { min: 18, max: 30, currency: "USD_K" },
        timeMonths: { min: 12, max: 18 },
        requiredSkills: ["Kubernetes", "Terraform", "Cloud-native", "Observability", "Go/Python"],
        difficultyRating: "moderate",
        description: "Migrate from application delivery to platform ownership. High demand, strong job security.",
      },
      {
        id: "ai-solutions-architect",
        name: "AI Solutions Architect",
        destinationExposure: 24,
        salaryIndia:  { min: 10, max: 20, currency: "INR_LAKH" },
        salaryGlobal: { min: 25, max: 45, currency: "USD_K" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["LLM APIs", "RAG patterns", "Cloud AI services", "System design", "Prompt engineering"],
        difficultyRating: "ambitious",
        description: "Apply domain expertise to designing AI-augmented systems. High leverage, premium compensation.",
      },
      {
        id: "cloud-native-dev",
        name: "Cloud-Native Developer",
        destinationExposure: 48,
        salaryIndia:  { min: 3, max: 6, currency: "INR_LAKH" },
        salaryGlobal: { min: 10, max: 18, currency: "USD_K" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["Spring Boot 3", "Microservices", "Kubernetes", "Cloud deployment", "API design"],
        difficultyRating: "straightforward",
        description: "Modernize your Java skills to cloud-native patterns. Fastest transition, maintains market relevance.",
      },
    ],
  },

  // ── Modern App Dev ─────────────────────────────────────────────────────
  {
    roleTypes: ["app-dev-modern", "fullstack-dev"],
    stacks: ["JavaScript/TS", "React", "Node.js", "Python", "Vue"],
    paths: [
      {
        id: "fullstack-ai",
        name: "Full-Stack AI Product Engineer",
        destinationExposure: 30,
        salaryIndia:  { min: 6, max: 12, currency: "INR_LAKH" },
        salaryGlobal: { min: 20, max: 40, currency: "USD_K" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["LLM API integration", "Streaming UIs", "TypeScript strict", "Vercel AI SDK", "Next.js"],
        difficultyRating: "straightforward",
        description: "Extend your existing skills into AI-integrated products. Natural evolution with minimal reskilling.",
      },
      {
        id: "platform-sre",
        name: "Platform / SRE Engineer",
        destinationExposure: 28,
        salaryIndia:  { min: 6, max: 12, currency: "INR_LAKH" },
        salaryGlobal: { min: 20, max: 35, currency: "USD_K" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["Kubernetes", "Terraform", "Observability", "Incident response", "Cloud cost optimization"],
        difficultyRating: "moderate",
        description: "Shift from feature delivery to infrastructure reliability. Strong compensation, lower automation risk.",
      },
      {
        id: "engineering-manager",
        name: "Engineering Manager",
        destinationExposure: 25,
        salaryIndia:  { min: 10, max: 20, currency: "INR_LAKH" },
        salaryGlobal: { min: 25, max: 50, currency: "USD_K" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["Team leadership", "Delivery management", "Technical roadmap", "Stakeholder management", "Hiring"],
        difficultyRating: "moderate",
        description: "Move into engineering leadership. Judgment and people skills resist automation.",
      },
    ],
  },

  // ── ERP Functional ─────────────────────────────────────────────────────
  {
    roleTypes: ["erp-functional"],
    paths: [
      {
        id: "s4hana-specialist",
        name: "SAP S/4HANA Migration Specialist",
        destinationExposure: 40,
        salaryIndia:  { min: 4, max: 8, currency: "INR_LAKH" },
        salaryGlobal: { min: 12, max: 22, currency: "USD_K" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["S/4HANA", "BTP", "Fiori", "Data migration", "Cutover management"],
        difficultyRating: "straightforward",
        description: "Deep specialization in the active S/4HANA migration wave. Strong project demand through 2028.",
      },
      {
        id: "ai-erp-architect",
        name: "AI-Augmented ERP Architect",
        destinationExposure: 26,
        salaryIndia:  { min: 8, max: 15, currency: "INR_LAKH" },
        salaryGlobal: { min: 22, max: 40, currency: "USD_K" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["SAP AI Core", "Joule", "LLM integration", "Process mining", "BTP advanced"],
        difficultyRating: "ambitious",
        description: "Lead AI integration into ERP systems. Combines rare domain knowledge with emerging technology.",
      },
      {
        id: "enterprise-solution-architect",
        name: "Enterprise Solution Architect",
        destinationExposure: 32,
        salaryIndia:  { min: 6, max: 12, currency: "INR_LAKH" },
        salaryGlobal: { min: 18, max: 35, currency: "USD_K" },
        timeMonths: { min: 12, max: 18 },
        requiredSkills: ["Multi-platform architecture", "Integration design", "Domain expertise", "Pre-sales", "Client advisory"],
        difficultyRating: "moderate",
        description: "Expand from functional specialist to solution architect across ERP and cloud platforms.",
      },
    ],
  },

  // ── ERP Technical ──────────────────────────────────────────────────────
  {
    roleTypes: ["erp-technical"],
    paths: [
      {
        id: "cloud-integration-architect",
        name: "Cloud Integration Architect",
        destinationExposure: 32,
        salaryIndia:  { min: 6, max: 12, currency: "INR_LAKH" },
        salaryGlobal: { min: 18, max: 32, currency: "USD_K" },
        timeMonths: { min: 9, max: 15 },
        requiredSkills: ["SAP BTP", "API management", "MuleSoft/Azure Integration", "Event-driven architecture", "Cloud platforms"],
        difficultyRating: "moderate",
        description: "Evolve from ABAP/PL-SQL to cloud integration patterns. Enterprise integration is growing, not shrinking.",
      },
      {
        id: "ai-erp-developer",
        name: "AI-Augmented ERP Developer",
        destinationExposure: 30,
        salaryIndia:  { min: 7, max: 14, currency: "INR_LAKH" },
        salaryGlobal: { min: 20, max: 36, currency: "USD_K" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["SAP Joule", "AI Core", "Python", "LLM APIs", "Genkit/LangChain"],
        difficultyRating: "moderate",
        description: "Extend ERP technical skills with AI augmentation capabilities.",
      },
      {
        id: "enterprise-solution-architect",
        name: "Enterprise Solution Architect",
        destinationExposure: 30,
        salaryIndia:  { min: 8, max: 16, currency: "INR_LAKH" },
        salaryGlobal: { min: 22, max: 40, currency: "USD_K" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["Architecture frameworks", "Cloud platforms", "Domain expertise", "Client advisory", "Pre-sales"],
        difficultyRating: "ambitious",
        description: "Combine deep technical ERP knowledge with architecture advisory skills.",
      },
    ],
  },

  // ── Salesforce ─────────────────────────────────────────────────────────
  {
    roleTypes: ["salesforce-dev"],
    paths: [
      {
        id: "salesforce-architect",
        name: "Salesforce Technical Architect",
        destinationExposure: 36,
        salaryIndia:  { min: 6, max: 12, currency: "INR_LAKH" },
        salaryGlobal: { min: 20, max: 40, currency: "USD_K" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["Salesforce CTA prep", "Multi-cloud architecture", "Integration patterns", "Governance", "Data architecture"],
        difficultyRating: "moderate",
        description: "Certified Technical Architect is one of the hardest Salesforce certs and one of the highest paid.",
      },
      {
        id: "ai-crm-specialist",
        name: "AI CRM / Einstein Specialist",
        destinationExposure: 30,
        salaryIndia:  { min: 5, max: 10, currency: "INR_LAKH" },
        salaryGlobal: { min: 18, max: 32, currency: "USD_K" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["Salesforce Einstein", "Agentforce", "Prompt Builder", "AI model management", "Data Cloud"],
        difficultyRating: "straightforward",
        description: "Salesforce AI features (Agentforce, Einstein) are the fastest-growing capability demand.",
      },
      {
        id: "platform-product-manager",
        name: "Platform Product Manager",
        destinationExposure: 28,
        salaryIndia:  { min: 8, max: 16, currency: "INR_LAKH" },
        salaryGlobal: { min: 22, max: 42, currency: "USD_K" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["Product strategy", "Agile", "User research", "Roadmap management", "Business cases"],
        difficultyRating: "ambitious",
        description: "Transition technical Salesforce expertise into product management for CRM platforms.",
      },
    ],
  },

  // ── ServiceNow ────────────────────────────────────────────────────────
  {
    roleTypes: ["servicenow"],
    paths: [
      {
        id: "servicenow-architect",
        name: "ServiceNow Platform Architect",
        destinationExposure: 30,
        salaryIndia:  { min: 6, max: 12, currency: "INR_LAKH" },
        salaryGlobal: { min: 20, max: 38, currency: "USD_K" },
        timeMonths: { min: 9, max: 15 },
        requiredSkills: ["Now Platform", "Integration Hub", "Performance analytics", "Governance", "Advanced scripting"],
        difficultyRating: "moderate",
        description: "Platform architects are consistently among the highest-paid ServiceNow roles.",
      },
      {
        id: "ai-itsm-specialist",
        name: "AI-Augmented ITSM Specialist",
        destinationExposure: 28,
        salaryIndia:  { min: 5, max: 10, currency: "INR_LAKH" },
        salaryGlobal: { min: 18, max: 30, currency: "USD_K" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["Virtual Agent", "AI Search", "Predictive Intelligence", "Now Assist", "Agentic workflows"],
        difficultyRating: "straightforward",
        description: "ServiceNow's AI roadmap is robust. AI-augmented ITSM delivery is the near-term market.",
      },
      {
        id: "platform-sre",
        name: "Platform / SRE Engineer",
        destinationExposure: 28,
        salaryIndia:  { min: 6, max: 12, currency: "INR_LAKH" },
        salaryGlobal: { min: 20, max: 35, currency: "USD_K" },
        timeMonths: { min: 12, max: 18 },
        requiredSkills: ["Kubernetes", "Terraform", "Observability", "Incident response", "Cloud platforms"],
        difficultyRating: "moderate",
        description: "Broader infrastructure pivot if you want to exit the ITSM specialization.",
      },
    ],
  },

  // ── DevOps / Platform ─────────────────────────────────────────────────
  {
    roleTypes: ["devops-platform"],
    paths: [
      {
        id: "platform-engineering-lead",
        name: "Platform Engineering Lead",
        destinationExposure: 22,
        salaryIndia:  { min: 10, max: 20, currency: "INR_LAKH" },
        salaryGlobal: { min: 28, max: 50, currency: "USD_K" },
        timeMonths: { min: 12, max: 18 },
        requiredSkills: ["Internal developer platform", "Golden paths", "Team leadership", "FinOps", "Security engineering"],
        difficultyRating: "moderate",
        description: "Lead platform teams building the foundations that every developer depends on.",
      },
      {
        id: "cloud-solutions-architect",
        name: "Cloud Solutions Architect",
        destinationExposure: 24,
        salaryIndia:  { min: 12, max: 22, currency: "INR_LAKH" },
        salaryGlobal: { min: 30, max: 55, currency: "USD_K" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["Multi-cloud architecture", "Well-architected framework", "Enterprise networking", "Security architecture", "Cost optimization"],
        difficultyRating: "ambitious",
        description: "Expand from engineering to architecture. Solutions architects have strong career leverage.",
      },
      {
        id: "ai-platform-engineer",
        name: "AI / ML Platform Engineer",
        destinationExposure: 20,
        salaryIndia:  { min: 12, max: 24, currency: "INR_LAKH" },
        salaryGlobal: { min: 32, max: 60, currency: "USD_K" },
        timeMonths: { min: 12, max: 20 },
        requiredSkills: ["MLOps", "Kubeflow/MLflow", "GPU infrastructure", "Model serving", "Feature stores"],
        difficultyRating: "ambitious",
        description: "Apply platform skills to ML infrastructure — one of the most in-demand specializations.",
      },
    ],
  },

  // ── Cloud Architect ───────────────────────────────────────────────────
  {
    roleTypes: ["cloud-architect"],
    paths: [
      {
        id: "ai-cloud-architect",
        name: "AI-Native Solutions Architect",
        destinationExposure: 18,
        salaryIndia:  { min: 15, max: 30, currency: "INR_LAKH" },
        salaryGlobal: { min: 40, max: 70, currency: "USD_K" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["LLM platform architecture", "AI governance", "Agentic systems design", "MLOps at scale", "Cloud AI services"],
        difficultyRating: "ambitious",
        description: "Extend cloud architecture into AI systems design. The highest-leverage specialization.",
      },
      {
        id: "cto-track",
        name: "VP Engineering / CTO Track",
        destinationExposure: 15,
        salaryIndia:  { min: 30, max: 60, currency: "INR_LAKH" },
        salaryGlobal: { min: 60, max: 120, currency: "USD_K" },
        timeMonths: { min: 24, max: 48 },
        requiredSkills: ["Technical strategy", "P&L ownership", "Executive communication", "Board-level reporting", "Org design"],
        difficultyRating: "ambitious",
        description: "Long-term track to technical executive. Requires strong delivery track record and business acumen.",
      },
      {
        id: "principal-consultant",
        name: "Principal Consultant — Digital",
        destinationExposure: 24,
        salaryIndia:  { min: 18, max: 35, currency: "INR_LAKH" },
        salaryGlobal: { min: 45, max: 80, currency: "USD_K" },
        timeMonths: { min: 18, max: 30 },
        requiredSkills: ["Client advisory", "Thought leadership", "Domain expertise", "Executive engagement", "Practice development"],
        difficultyRating: "ambitious",
        description: "Transition from hands-on architecture to principal consulting. Strong income ceiling, high client leverage.",
      },
    ],
  },

  // ── Security ──────────────────────────────────────────────────────────
  {
    roleTypes: ["security"],
    paths: [
      {
        id: "ai-security-specialist",
        name: "AI Security Specialist",
        destinationExposure: 18,
        salaryIndia:  { min: 10, max: 20, currency: "INR_LAKH" },
        salaryGlobal: { min: 30, max: 55, currency: "USD_K" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["LLM red-teaming", "AI model auditing", "Prompt injection defense", "AI governance", "ML threat modeling"],
        difficultyRating: "moderate",
        description: "Specialize in securing AI systems — a rapidly growing and underserved niche.",
      },
      {
        id: "cloud-security-architect",
        name: "Cloud Security Architect",
        destinationExposure: 20,
        salaryIndia:  { min: 12, max: 22, currency: "INR_LAKH" },
        salaryGlobal: { min: 35, max: 60, currency: "USD_K" },
        timeMonths: { min: 12, max: 18 },
        requiredSkills: ["Zero-trust architecture", "Cloud security posture", "Identity & access", "Compliance frameworks", "DevSecOps"],
        difficultyRating: "moderate",
        description: "Cloud security architects are among the most in-demand and best-compensated security professionals.",
      },
      {
        id: "ciso-track",
        name: "CISO / Head of Security",
        destinationExposure: 14,
        salaryIndia:  { min: 25, max: 50, currency: "INR_LAKH" },
        salaryGlobal: { min: 60, max: 120, currency: "USD_K" },
        timeMonths: { min: 36, max: 60 },
        requiredSkills: ["Risk management", "Board communication", "Regulatory compliance", "Security program ownership", "Executive leadership"],
        difficultyRating: "ambitious",
        description: "Long path to security executive. The most protected role from automation in the entire industry.",
      },
    ],
  },

  // ── Data Engineer ─────────────────────────────────────────────────────
  {
    roleTypes: ["data-engineer", "data-eng-analytics"],
    paths: [
      {
        id: "ml-engineer",
        name: "ML / AI Engineer",
        destinationExposure: 28,
        salaryIndia:  { min: 8, max: 16, currency: "INR_LAKH" },
        salaryGlobal: { min: 25, max: 50, currency: "USD_K" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["Python ML stack", "Model training/fine-tuning", "MLOps", "Feature engineering", "LLM integration"],
        difficultyRating: "moderate",
        description: "Natural adjacent move from data pipelines to model pipelines. Strong demand, premium compensation.",
      },
      {
        id: "data-platform-lead",
        name: "Data Platform / Analytics Engineering Lead",
        destinationExposure: 32,
        salaryIndia:  { min: 6, max: 12, currency: "INR_LAKH" },
        salaryGlobal: { min: 20, max: 38, currency: "USD_K" },
        timeMonths: { min: 9, max: 15 },
        requiredSkills: ["dbt", "Airflow/Dagster", "Snowflake/BigQuery", "Data modeling", "Team leadership"],
        difficultyRating: "straightforward",
        description: "Lead the modern data stack. Analytics engineering is now a standalone discipline.",
      },
      {
        id: "ai-data-architect",
        name: "AI Data Architect",
        destinationExposure: 24,
        salaryIndia:  { min: 10, max: 20, currency: "INR_LAKH" },
        salaryGlobal: { min: 30, max: 55, currency: "USD_K" },
        timeMonths: { min: 12, max: 20 },
        requiredSkills: ["Vector databases", "RAG architecture", "Real-time pipelines", "Data governance for AI", "Feature stores"],
        difficultyRating: "ambitious",
        description: "Design the data infrastructure that powers AI systems. Rare combination, premium pay.",
      },
    ],
  },

  // ── Data Analyst ──────────────────────────────────────────────────────
  {
    roleTypes: ["data-analyst"],
    paths: [
      {
        id: "analytics-engineer",
        name: "Analytics Engineer",
        destinationExposure: 36,
        salaryIndia:  { min: 4, max: 8, currency: "INR_LAKH" },
        salaryGlobal: { min: 15, max: 28, currency: "USD_K" },
        timeMonths: { min: 6, max: 12 },
        requiredSkills: ["dbt", "SQL advanced", "Python", "Data modeling", "Git"],
        difficultyRating: "straightforward",
        description: "Bridge between data engineering and analysis. High demand, growing discipline.",
      },
      {
        id: "product-analyst-pm",
        name: "Product Analyst / PM Track",
        destinationExposure: 30,
        salaryIndia:  { min: 5, max: 10, currency: "INR_LAKH" },
        salaryGlobal: { min: 18, max: 35, currency: "USD_K" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["Product analytics", "A/B testing", "User behavior analysis", "Stakeholder management", "Product thinking"],
        difficultyRating: "moderate",
        description: "Leverage analytical depth to move into product management. Strong career trajectory.",
      },
      {
        id: "ml-engineer",
        name: "ML Engineer",
        destinationExposure: 28,
        salaryIndia:  { min: 7, max: 14, currency: "INR_LAKH" },
        salaryGlobal: { min: 22, max: 42, currency: "USD_K" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["Python ML", "Model deployment", "Feature engineering", "MLOps basics", "Statistical modeling"],
        difficultyRating: "ambitious",
        description: "Extend analytical skills into ML engineering. Requires significant upskilling but high payoff.",
      },
    ],
  },

  // ── Business Analyst ──────────────────────────────────────────────────
  {
    roleTypes: ["business-analyst"],
    paths: [
      {
        id: "product-manager",
        name: "Product Manager",
        destinationExposure: 36,
        salaryIndia:  { min: 5, max: 10, currency: "INR_LAKH" },
        salaryGlobal: { min: 15, max: 30, currency: "USD_K" },
        timeMonths: { min: 12, max: 18 },
        requiredSkills: ["Product discovery", "Agile delivery", "User research", "Data-driven decisions", "Roadmapping"],
        difficultyRating: "moderate",
        description: "Natural career move from requirements analysis to product ownership. Strong growth trajectory.",
      },
      {
        id: "ai-product-manager",
        name: "AI Product Manager",
        destinationExposure: 22,
        salaryIndia:  { min: 8, max: 15, currency: "INR_LAKH" },
        salaryGlobal: { min: 25, max: 45, currency: "USD_K" },
        timeMonths: { min: 12, max: 24 },
        requiredSkills: ["ML product lifecycle", "LLM integration", "Responsible AI", "Prompt engineering", "AI evaluation"],
        difficultyRating: "ambitious",
        description: "Specialize in AI product management. One of the fastest-growing PM specializations.",
      },
      {
        id: "domain-strategy-consultant",
        name: "Domain Strategy Consultant",
        destinationExposure: 38,
        salaryIndia:  { min: 6, max: 12, currency: "INR_LAKH" },
        salaryGlobal: { min: 18, max: 35, currency: "USD_K" },
        timeMonths: { min: 18, max: 24 },
        requiredSkills: ["Industry specialization", "Executive advisory", "Thought leadership", "Proposal development", "P&L understanding"],
        difficultyRating: "moderate",
        description: "Deepen domain expertise into strategy consulting. Differentiates from generalist BA work.",
      },
    ],
  },

  // ── Project / Delivery Manager ─────────────────────────────────────────
  {
    roleTypes: ["project-delivery-mgr"],
    paths: [
      {
        id: "program-director",
        name: "Programme Director / Head of Delivery",
        destinationExposure: 28,
        salaryIndia:  { min: 15, max: 30, currency: "INR_LAKH" },
        salaryGlobal: { min: 35, max: 65, currency: "USD_K" },
        timeMonths: { min: 18, max: 30 },
        requiredSkills: ["Multi-programme governance", "P&L management", "C-suite stakeholder management", "Org transformation", "Risk management"],
        difficultyRating: "ambitious",
        description: "Scale from project delivery to programme and portfolio leadership.",
      },
      {
        id: "ai-transformation-lead",
        name: "AI Transformation Lead",
        destinationExposure: 25,
        salaryIndia:  { min: 12, max: 22, currency: "INR_LAKH" },
        salaryGlobal: { min: 30, max: 55, currency: "USD_K" },
        timeMonths: { min: 12, max: 20 },
        requiredSkills: ["AI change management", "Workforce transformation", "Adoption frameworks", "Executive sponsorship", "Benefits realization"],
        difficultyRating: "moderate",
        description: "Lead AI adoption programs — every major enterprise is running one. High demand, underserved supply.",
      },
      {
        id: "product-delivery-owner",
        name: "Product Owner / Delivery Lead",
        destinationExposure: 32,
        salaryIndia:  { min: 8, max: 16, currency: "INR_LAKH" },
        salaryGlobal: { min: 22, max: 40, currency: "USD_K" },
        timeMonths: { min: 9, max: 15 },
        requiredSkills: ["Agile at scale", "Product thinking", "Outcome ownership", "OKR frameworks", "Cross-functional leadership"],
        difficultyRating: "moderate",
        description: "Shift from project delivery to product ownership. Outcome-focused, higher autonomy, better career ceiling.",
      },
    ],
  },

  // ── Support / Operations ───────────────────────────────────────────────
  {
    roleTypes: ["support-ops"],
    paths: [
      {
        id: "site-reliability",
        name: "Site Reliability Engineer",
        destinationExposure: 28,
        salaryIndia:  { min: 5, max: 10, currency: "INR_LAKH" },
        salaryGlobal: { min: 18, max: 32, currency: "USD_K" },
        timeMonths: { min: 12, max: 20 },
        requiredSkills: ["Linux deep knowledge", "Observability tools", "Incident command", "Automation scripting", "On-call practices"],
        difficultyRating: "moderate",
        description: "Move from reactive support to proactive reliability engineering. Strong market demand.",
      },
      {
        id: "devops-engineer",
        name: "DevOps / Infrastructure Engineer",
        destinationExposure: 30,
        salaryIndia:  { min: 4, max: 8, currency: "INR_LAKH" },
        salaryGlobal: { min: 15, max: 28, currency: "USD_K" },
        timeMonths: { min: 9, max: 15 },
        requiredSkills: ["CI/CD pipelines", "Docker", "Terraform", "Cloud platforms", "Scripting (Bash/Python)"],
        difficultyRating: "straightforward",
        description: "Leverage ops knowledge to move into infrastructure automation. Accessible upskilling path.",
      },
      {
        id: "ai-ops-specialist",
        name: "AIOps / Intelligent Operations Specialist",
        destinationExposure: 25,
        salaryIndia:  { min: 5, max: 10, currency: "INR_LAKH" },
        salaryGlobal: { min: 18, max: 30, currency: "USD_K" },
        timeMonths: { min: 9, max: 18 },
        requiredSkills: ["AIOps platforms", "Anomaly detection", "Event correlation", "Observability", "ML basics"],
        difficultyRating: "moderate",
        description: "Apply ops domain knowledge to AI-driven operations tooling. Unique hybrid specialization.",
      },
    ],
  },
];

// Fallback paths for roles without a specific match
const GENERIC_PATHS: Omit<PivotPath, "priorityRank">[] = [
  {
    id: "platform-sre-generic",
    name: "Platform / SRE Engineer",
    destinationExposure: 28,
    salaryIndia:  { min: 5, max: 12, currency: "INR_LAKH" },
    salaryGlobal: { min: 15, max: 30, currency: "USD_K" },
    timeMonths: { min: 12, max: 18 },
    requiredSkills: ["Kubernetes", "Terraform", "Cloud platforms", "Observability", "Scripting"],
    difficultyRating: "moderate",
    description: "Infrastructure reliability roles show consistent demand growth across all firm types.",
  },
  {
    id: "ai-solutions-architect-generic",
    name: "AI Solutions Architect",
    destinationExposure: 26,
    salaryIndia:  { min: 8, max: 18, currency: "INR_LAKH" },
    salaryGlobal: { min: 22, max: 45, currency: "USD_K" },
    timeMonths: { min: 12, max: 24 },
    requiredSkills: ["LLM APIs", "System design", "Cloud AI services", "Prompt engineering", "Solution documentation"],
    difficultyRating: "ambitious",
    description: "Apply domain expertise to designing AI-augmented solutions. High leverage across all backgrounds.",
  },
  {
    id: "product-manager-generic",
    name: "Product Manager",
    destinationExposure: 34,
    salaryIndia:  { min: 6, max: 14, currency: "INR_LAKH" },
    salaryGlobal: { min: 18, max: 38, currency: "USD_K" },
    timeMonths: { min: 12, max: 20 },
    requiredSkills: ["Product discovery", "Agile", "Data analysis", "Stakeholder management", "User research"],
    difficultyRating: "moderate",
    description: "Product managers own outcomes, not just delivery. Growing demand, especially for AI-adjacent products.",
  },
];

export function getPivotPaths(a: IntakeAnswers): PivotPath[] {
  const role = a.roleType;
  const stacks = a.primaryStack ?? [];

  // Find best matching pivot table entry
  let match = PIVOTS.find((entry) => {
    const roleMatch = entry.roleTypes.includes(role);
    if (!roleMatch) return false;
    if (!entry.stacks) return true; // No stack filter = match any
    return entry.stacks.some((s) => stacks.includes(s));
  });

  // Fall back to role-only match
  if (!match) {
    match = PIVOTS.find((entry) => entry.roleTypes.includes(role));
  }

  const rawPaths = match?.paths ?? GENERIC_PATHS;

  return rawPaths.slice(0, 3).map((p, i) => ({
    ...p,
    priorityRank: i + 1,
  }));
}
