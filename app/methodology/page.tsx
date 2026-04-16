import { Metadata } from "next";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methodology — BAROM",
  description:
    "How the Barom Automation Exposure Score is computed — scoring components, data sources, and what the model does not do.",
};

export default function MethodologyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Nav />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
              Methodology · Model v2.0
            </div>
            <h1 className="font-fraunces font-light text-4xl sm:text-5xl text-text mb-4">
              How the score is computed
            </h1>
            <p className="font-sans text-lg text-text-muted leading-relaxed">
              The Barom score is deterministic and rule-based. No AI inference is used in scoring. The model computes a weighted combination of six factors, each grounded in publicly observable data.
            </p>
          </div>

          <div className="space-y-10 font-sans text-text-muted leading-relaxed">

            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">1. Scoring components</h2>
              <p className="mb-6">
                The score is a weighted combination of six components. Below are the approximate relative contributions — exact calibration values are proprietary and updated quarterly.
              </p>
              <div className="space-y-4">
                {[
                  {
                    name: "Role function exposure",
                    weight: "~35%",
                    desc: "Based on the nature of work performed. Roles involving routine, codifiable, or process-driven tasks score higher. Roles requiring judgment, strategy, client relationships, or novel problem-solving score lower.",
                  },
                  {
                    name: "Stack maturity risk",
                    weight: "~25%",
                    desc: "Based on each declared technology's current demand trajectory. Legacy stacks with declining job posting share score higher. Modern stacks in growing demand or critical infrastructure categories score lower.",
                  },
                  {
                    name: "Career trajectory",
                    weight: "~15%",
                    desc: "Based on seniority level and experience. Senior professionals with specialized judgment tend to show lower exposure. Early-career or stagnant trajectories show higher exposure.",
                  },
                  {
                    name: "Project delivery model",
                    weight: "~10%",
                    desc: "T&M staff augmentation scores highest — it is the delivery model most directly disrupted by AI-enabled headcount efficiency. Advisory and product development engagements score lowest.",
                  },
                  {
                    name: "Geography and mobility context",
                    weight: "~10%",
                    desc: "Based on local job market conditions. Offshore delivery centers face structural compression as labor arbitrage — their traditional advantage — narrows. Visa-dependent workers carry additional mobility constraints.",
                  },
                  {
                    name: "AI tool fluency (resilience factor)",
                    weight: "~5% (reduces score)",
                    desc: "Declared daily AI tool use at work is treated as a resilience offset. Workers actively using AI tools are acquiring skills valued by employers shifting to AI-augmented workflows.",
                  },
                ].map((c) => (
                  <div key={c.name} className="border border-border p-5 bg-surface">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-fraunces text-base text-text">{c.name}</h3>
                      <span className="font-mono text-xs text-amber shrink-0">{c.weight}</span>
                    </div>
                    <p className="font-sans text-sm text-text-muted">{c.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">2. Score bands</h2>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { range: "0–29", band: "Low exposure", color: "text-green-400", desc: "Well-positioned relative to AI displacement pressures. Strong market demand for your profile." },
                  { range: "30–54", band: "Moderate exposure", color: "text-amber", desc: "Some structural exposure. Upskilling in specific areas would materially reduce risk." },
                  { range: "55–74", band: "Elevated exposure", color: "text-amber", desc: "Meaningful structural exposure. Active repositioning is advisable within 12–18 months." },
                  { range: "75–100", band: "High exposure", color: "text-red-400", desc: "Significant structural risk. Pivot paths should be evaluated and acted on urgently." },
                ].map((b) => (
                  <div key={b.range} className="flex gap-4 border-b border-border pb-3">
                    <div className="font-mono text-xs text-text w-14 shrink-0">{b.range}</div>
                    <div className={`font-mono text-xs w-40 shrink-0 ${b.color}`}>{b.band}</div>
                    <div className="font-sans text-xs text-text-muted">{b.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">3. Data sources</h2>
              <div className="space-y-4 font-mono text-xs text-text-muted">
                {[
                  {
                    title: "Job posting data",
                    detail: "Weekly scrapes from LinkedIn, Naukri, Indeed, and Glassdoor. Role-level demand, stack frequency, seniority distribution, and salary ranges. India and global markets tracked separately. Rolling 18-month window.",
                    freshness: "Weekly refresh",
                  },
                  {
                    title: "Earnings call transcripts & filings",
                    detail: "Quarterly earnings call transcripts and SEC 8-K / SEBI annual report filings for 30+ publicly-traded IT services and consulting firms. Parsed for headcount guidance, AI displacement language, and restructuring announcements.",
                    freshness: "30+ firms · last 6 quarters",
                  },
                  {
                    title: "Restructuring filings",
                    detail: "WARN Act notices (US Department of Labor), press releases, and annual report disclosures announcing headcount reductions. Aggregated and classified by firm type and geography.",
                    freshness: "18-month rolling record",
                  },
                  {
                    title: "AI tool landscape",
                    detail: "Curated list of 50+ AI tools tracked for direct relevance to IT consulting workflows. Enterprise customer references, capability benchmarks, and adoption data.",
                    freshness: "Monthly update",
                  },
                  {
                    title: "Salary benchmarks",
                    detail: "Public salary data from Glassdoor, AmbitionBox (India), Levels.fyi, and Naukri. Role × geography × seniority level combinations. India figures in INR, global in USD.",
                    freshness: "Quarterly update · public sources",
                  },
                  {
                    title: "Academic and industry research",
                    detail: "Published research on task-level AI substitutability (Acemoglu, Autor, Felten et al.), GitHub Copilot productivity studies, and enterprise AI adoption surveys.",
                    freshness: "Ongoing",
                  },
                ].map((s) => (
                  <div key={s.title} className="border-l-2 border-border-strong pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-text">{s.title}</span>
                      <span className="text-amber/70 text-[10px]">{s.freshness}</span>
                    </div>
                    <div>{s.detail}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">4. Pivot path methodology</h2>
              <p>
                Pivot paths are selected from a library of 50+ career transitions, matched against your declared role type and primary technology stack. Each path includes:
              </p>
              <ul className="mt-4 space-y-2 font-sans text-sm">
                {[
                  "Destination exposure score (lower = better positioned)",
                  "Salary delta — India (₹ lakhs) and Global (USD thousands)",
                  "Realistic timeline in months (min–max range)",
                  "Required skills ranked by priority",
                  "Difficulty rating: straightforward / moderate / ambitious",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-amber shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-sans text-sm text-text-muted">
                Salary data is sourced from the public compensation datasets listed in Section 3. Ranges represent the 25th–75th percentile for qualified candidates making the specified transition.
              </p>
            </section>

            <section>
              <h2 className="font-fraunces text-2xl text-text mb-4">5. What this model does not do</h2>
              <ul className="space-y-2 font-sans text-sm">
                {[
                  "Does not name specific companies in outputs or commentary.",
                  "Does not use large language models for scoring — the model is deterministic and rule-based.",
                  "Does not predict layoffs at specific firms.",
                  "Does not incorporate non-public, insider, or confidential information.",
                  "Does not claim to predict individual outcomes — it scores structural exposure, not personal fate.",
                  "Exact scoring weights, multipliers, and lookup tables are not published — only approximate contributions.",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-text-dim">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="border-t border-border pt-6 font-mono text-xs text-text-faint">
              Model version: v2.0 · Calibrated: April 2026 · Next revision: July 2026 ·{" "}
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
