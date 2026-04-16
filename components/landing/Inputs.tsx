const INPUTS = [
  {
    icon: "◈",
    title: "Earnings Call Transcripts",
    description:
      "Quarterly and annual earnings calls from publicly traded IT services and consulting firms, analyzed for headcount language, utilization commentary, and AI displacement signals.",
  },
  {
    icon: "◈",
    title: "Job Posting Velocity",
    description:
      "Role-specific posting volume indexed monthly across 12M+ job postings. Declining velocity for a specific role is a leading indicator of structural demand reduction.",
  },
  {
    icon: "◈",
    title: "Restructuring Filings",
    description:
      "Public filings, press releases, and 8-K disclosures announcing restructuring programs, headcount reductions, and practice consolidations from major firms.",
  },
  {
    icon: "◈",
    title: "AI Tooling Adoption Data",
    description:
      "Developer survey data, GitHub Copilot adoption statistics, enterprise AI licensing announcements, and productivity research on task-level automation rates.",
  },
  {
    icon: "◈",
    title: "Compensation Signals",
    description:
      "Reported salary bands and offer data for pivot roles versus incumbent roles, segmented by geography and level. Source: public compensation datasets and crowdsourced submissions.",
  },
  {
    icon: "◈",
    title: "Member Outcomes",
    description:
      "Anonymized outcome data contributed by subscribing members (role changes, salary outcomes, timeline accuracy). Available in model v1.1+. Currently seeded.",
  },
];

export function Inputs() {
  return (
    <section className="py-20 bg-bg-warm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-3">
            Calibration inputs · what feeds the instrument
          </div>
          <h2 className="font-fraunces font-light text-3xl sm:text-4xl text-text max-w-2xl">
            Public data.{" "}
            <em className="italic text-amber">Refreshed daily.</em>{" "}
            No vibes.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {INPUTS.map((input) => (
            <div key={input.title} className="bg-bg-warm p-6">
              <div className="font-mono text-amber text-lg mb-3" aria-hidden>
                {input.icon}
              </div>
              <h3 className="font-fraunces text-base font-medium text-text mb-2">
                {input.title}
              </h3>
              <p className="font-sans text-sm text-text-muted leading-relaxed">
                {input.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 font-mono text-xs text-text-dim flex items-start gap-3">
          <span className="text-amber mt-0.5">→</span>
          <span>
            Methodology page documents every weight, every source, every assumption. We name no individual companies in our public commentary. We cite filings and transcripts. The instrument speaks; we don&apos;t.
          </span>
        </div>
      </div>
    </section>
  );
}
