const INPUTS = [
  {
    icon: "◈",
    number: "01",
    title: "Job Posting Data",
    badge: "Weekly refresh · India + US + UK + EU",
    description:
      "Thousands of IT consulting and services postings scraped weekly from LinkedIn, Naukri, Indeed, and Glassdoor. Role demand, stack velocity, seniority skews, geographic shifts.",
  },
  {
    icon: "◈",
    number: "02",
    title: "Earnings & Filings",
    badge: "30+ firms · last 6 quarters",
    description:
      "Quarterly earnings call transcripts and SEC 8-K / SEBI annual filings for 30+ publicly-traded IT services and consulting firms. Parsed for headcount, AI mentions, and restructuring language.",
  },
  {
    icon: "◈",
    number: "03",
    title: "Restructuring Record",
    badge: "Public record · 18 months",
    description:
      "WARN Act notices (US), public layoff announcements, and annual report disclosures. The documented record of what has already happened — not speculation.",
  },
  {
    icon: "◈",
    number: "04",
    title: "AI Tool Adoption",
    badge: "Curated list · monthly update",
    description:
      "50+ AI tools tracked for direct relevance to IT consulting work. Product launches, enterprise customer references, and capability mapping against role-level tasks.",
  },
  {
    icon: "◈",
    number: "05",
    title: "Salary Benchmarks",
    badge: "Public sources · quarterly update",
    description:
      "Salary data from Glassdoor, AmbitionBox, Levels.fyi, and Naukri for relevant role × geography combinations. India and global figures maintained separately.",
  },
  {
    icon: "◈",
    number: "06",
    title: "Member Outcomes",
    badge: "Compounds with scale · launching now",
    description:
      "Self-reported pivot outcomes from Barom members. Role changes, salary outcomes, timeline accuracy. The instrument gets sharper as more readings come in.",
  },
];

export function Inputs() {
  return (
    <section className="py-20 bg-bg-warm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-3">
            Calibration inputs · v1
          </div>
          <h2 className="font-fraunces font-light text-3xl sm:text-4xl text-text max-w-2xl">
            What feeds the instrument{" "}
            <em className="italic text-amber">today.</em>
          </h2>
          <p className="font-sans text-sm text-text-muted mt-3 max-w-xl">
            No inflated numbers. Every claim below is backed by the pipeline that runs it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {INPUTS.map((input) => (
            <div key={input.title} className="bg-bg-warm p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-amber text-sm">{input.number}</span>
                <h3 className="font-fraunces text-base font-medium text-text">
                  {input.title}
                </h3>
              </div>
              <div className="font-mono text-[10px] text-amber/70 uppercase tracking-wider mb-3">
                → {input.badge}
              </div>
              <p className="font-sans text-sm text-text-muted leading-relaxed">
                {input.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 font-mono text-xs text-text-dim flex items-start gap-3">
          <span className="text-amber mt-0.5">→</span>
          <span>
            The methodology page documents every scoring component and its approximate relative weight.
            Exact calibration values are proprietary and updated quarterly.
          </span>
        </div>
      </div>
    </section>
  );
}
