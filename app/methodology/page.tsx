import { Metadata } from "next";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methodology — BAROM",
  description:
    "Full documentation of the Barom Scoring Model v1.0 — every weight, every source, every assumption.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Barom Scoring Methodology v1.0",
  description:
    "How the Barom automation-exposure score is computed from role, stack, geography, and AI fluency inputs.",
  step: [
    {
      "@type": "HowToStep",
      name: "Role Function Exposure",
      text: "Base score by role type, adjusted for level and experience years. Weight: 35%.",
    },
    {
      "@type": "HowToStep",
      name: "Stack Maturity Risk",
      text: "Risk multiplier applied to role base score based on primary tech stack. Weight: 25%.",
    },
    {
      "@type": "HowToStep",
      name: "Role Trajectory",
      text: "Role exposure adjusted for seniority level. Weight: 15%.",
    },
    {
      "@type": "HowToStep",
      name: "Project Model Risk",
      text: "Exposure based on project type (T&M vs fixed-bid vs advisory). Weight: 10%.",
    },
    {
      "@type": "HowToStep",
      name: "Geography & Visa Risk",
      text: "Geographic exposure adjusted for visa status. Weight: 10%.",
    },
    {
      "@type": "HowToStep",
      name: "AI Tool Fluency",
      text: "Resilience subtraction based on declared AI tool use at work. Weight: -5%.",
    },
  ],
};

export default function MethodologyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
              Methodology · Model v1.0
            </div>
            <h1 className="font-fraunces font-light text-4xl sm:text-5xl text-text mb-4">
              How the score is computed
            </h1>
            <p className="font-sans text-lg text-text-muted leading-relaxed">
              Every weight, every source, every assumption. The model is deterministic, rule-based, and fully auditable. No AI inference is used in scoring.
            </p>
          </div>

          <div className="space-y-10 font-sans text-text-muted leading-relaxed">
            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">
                1. The formula
              </h2>
              <pre className="bg-surface border border-border p-5 font-mono text-xs text-text-muted overflow-x-auto whitespace-pre-wrap">
{`score = (
  taskExposure    × 0.35 +
  stackExposure   × 0.25 +
  roleTrajectory  × 0.15 +
  projectModel    × 0.10 +
  geoVisa         × 0.10 -
  aiResilience    × 0.05
)
Clamped to [0, 100].`}
              </pre>
              <p className="mt-4">
                Each component is computed on a 0–100 scale. The weighted sum produces the final exposure score. Higher scores indicate higher automation exposure.
              </p>
            </section>

            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">
                2. Role function exposure (35% weight)
              </h2>
              <p>
                Base exposure scores by role type, calibrated against 18 months of job posting velocity data, earnings call transcripts, and academic literature on task-level AI substitutability.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full font-mono text-xs border border-border">
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="text-left p-3 text-text-dim">Role</th>
                      <th className="text-right p-3 text-text-dim">Base score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["QA / Test Engineer", 82],
                      ["Support / Operations", 78],
                      ["Application Developer", 68],
                      ["Business Analyst", 64],
                      ["ERP Functional Consultant", 58],
                      ["ERP Technical Consultant", 56],
                      ["Data Engineer / Analytics", 48],
                      ["Project / Delivery Manager", 44],
                      ["Strategy Consultant", 42],
                      ["DevOps / Platform Engineer", 32],
                      ["Cloud / Solutions Architect", 28],
                      ["Security Engineer", 26],
                    ].map(([role, score]) => (
                      <tr key={role as string} className="border-b border-border">
                        <td className="p-3 text-text-muted">{role}</td>
                        <td className="p-3 text-right text-text">{score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 font-mono text-xs text-text-dim">
                Level adjustment: Associate +8, Consultant +4, Senior Consultant 0, Lead −2, Manager −4, Senior Manager −6, Principal/Director −10
              </p>
            </section>

            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">
                3. Stack maturity risk (25% weight)
              </h2>
              <p>
                A multiplier applied to the role base score. Stacks with higher AI substitution velocity or declining posting share receive multipliers above 1.0. Stacks in high-demand, infrastructure-critical, or emerging categories receive multipliers below 1.0.
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                {[
                  ["Mainframe-COBOL", "1.20"],
                  ["Manual-Test", "1.18"],
                  ["SAP-ABAP", "1.10"],
                  ["Java / .NET", "1.05"],
                  ["Python", "0.95"],
                  ["Cloud-AWS/Azure/GCP", "0.85"],
                  ["Kubernetes", "0.78"],
                  ["Terraform", "0.78"],
                  ["Playwright", "0.92"],
                ].map(([stack, mult]) => (
                  <div key={stack} className="border border-border p-2 flex justify-between">
                    <span className="text-text-muted">{stack}</span>
                    <span className={parseFloat(mult) > 1 ? "text-red-400" : "text-green-400"}>{mult}×</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">
                4. Project model risk (10% weight)
              </h2>
              <p>
                Time-and-materials staffing augmentation carries the highest risk: it is the model most directly disrupted by AI-enabled headcount reduction. Advisory and product development engagements show the lowest displacement signal in posting data.
              </p>
              <div className="mt-4 font-mono text-xs space-y-2">
                {[
                  ["T&M / Staff augmentation", 78],
                  ["Managed services", 62],
                  ["Fixed-bid delivery", 55],
                  ["Mixed", 50],
                  ["Product development", 38],
                  ["Advisory / strategy", 32],
                ].map(([type, score]) => (
                  <div key={type as string} className="flex justify-between border-b border-border pb-2">
                    <span className="text-text-muted">{type}</span>
                    <span className="text-text">{score}/100</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">
                5. Geography & visa risk (10% weight)
              </h2>
              <p>
                Offshore delivery centers face higher structural exposure due to labor arbitrage compression, which was historically their primary value proposition. Visa-dependent workers in the US and UK carry additional exposure due to policy risk and sponsor concentration.
              </p>
              <div className="mt-4 font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-text-muted">India base</span>
                  <span className="text-text">65</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-text-muted">US base</span>
                  <span className="text-text">50</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-text-muted">H-1B / L-1 visa adjustment</span>
                  <span className="text-red-400">+12</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-text-muted">Student / OPT adjustment</span>
                  <span className="text-red-400">+18</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">
                6. AI tool fluency — resilience (−5% weight)
              </h2>
              <p>
                Declared daily AI tool use at work is treated as a resilience factor that partially offsets exposure. Workers actively using AI tools are acquiring the interface skills most valued by employers shifting to AI-augmented workflows.
              </p>
              <div className="mt-4 font-mono text-xs space-y-2">
                {[
                  ["Daily use", 60, "Strongest resilience"],
                  ["Weekly use", 40, "Moderate resilience"],
                  ["Occasional", 20, "Low resilience"],
                  ["Never / not allowed", 0, "No resilience offset"],
                ].map(([label, value, note]) => (
                  <div key={label as string} className="flex justify-between items-center border-b border-border pb-2">
                    <span className="text-text-muted">{label}</span>
                    <div className="text-right">
                      <span className="text-green-400">{value}</span>
                      <span className="text-text-faint ml-3">{note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">
                7. Data sources
              </h2>
              <div className="space-y-3 font-mono text-xs text-text-muted">
                <div className="border-l-2 border-border-strong pl-4">
                  <div className="text-text">Earnings call transcripts</div>
                  <div>Publicly available transcripts from investor relations pages and SEC filings. Analyzed for utilization commentary, AI displacement language, and headcount guidance. Updated quarterly.</div>
                </div>
                <div className="border-l-2 border-border-strong pl-4">
                  <div className="text-text">Job posting velocity data</div>
                  <div>Aggregated role-level posting counts indexed monthly from public job boards. 18-month rolling window. Velocity decline for a role type is a leading displacement indicator.</div>
                </div>
                <div className="border-l-2 border-border-strong pl-4">
                  <div className="text-text">Restructuring filings</div>
                  <div>8-K filings, press releases, and annual report disclosures announcing restructuring programs. Aggregated across 240+ covered firms.</div>
                </div>
                <div className="border-l-2 border-border-strong pl-4">
                  <div className="text-text">Academic and industry research</div>
                  <div>Published research on task-level AI substitutability (Acemoglu, Autor, Felten et al.), GitHub Copilot productivity studies, and enterprise AI adoption surveys.</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">
                8. What this model does not do
              </h2>
              <ul className="space-y-2 font-sans text-text-muted">
                <li className="flex gap-2">
                  <span className="text-text-dim">—</span>
                  Does not name specific companies in outputs or commentary.
                </li>
                <li className="flex gap-2">
                  <span className="text-text-dim">—</span>
                  Does not use large language models for scoring.
                </li>
                <li className="flex gap-2">
                  <span className="text-text-dim">—</span>
                  Does not predict layoffs at specific firms.
                </li>
                <li className="flex gap-2">
                  <span className="text-text-dim">—</span>
                  Does not incorporate non-public information.
                </li>
              </ul>
            </section>

            <div className="border-t border-border pt-6 font-mono text-xs text-text-faint">
              Model version: v1.0 · Calibrated: April 2026 · Next revision: July 2026 ·{" "}
              <Link href="/assessment" className="text-amber hover:text-amber-bright">
                Take the assessment →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
