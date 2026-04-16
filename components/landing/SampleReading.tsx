import { Gauge } from "./Gauge";

const SAMPLE_DRIVERS = [
  { label: "Role function exposure", value: 78, weight: 0.35 },
  { label: "Stack maturity risk", value: 72, weight: 0.25 },
  { label: "Project model risk", value: 68, weight: 0.10 },
  { label: "Geography & visa", value: 65, weight: 0.10 },
  { label: "AI tool fluency", value: 40, weight: 0.05 },
];

const SAMPLE_PIVOTS = [
  {
    rank: 1,
    name: "Platform / SRE Engineer",
    delta: "+22%",
    time: "9–18 mo",
    skills: ["Kubernetes", "Terraform", "Prometheus"],
  },
  {
    rank: 2,
    name: "AI Solutions Architect",
    delta: "+35%",
    time: "12–24 mo",
    skills: ["LLM APIs", "RAG patterns", "Cloud AI"],
  },
  {
    rank: 3,
    name: "Senior SDET",
    delta: "+15%",
    time: "6–12 mo",
    skills: ["Playwright", "API testing", "CI/CD"],
  },
];

export function SampleReading() {
  return (
    <section className="py-20 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-3">
            What you receive
          </div>
          <h2 className="font-fraunces font-light text-3xl sm:text-4xl text-text max-w-2xl">
            A reading you could hand to your{" "}
            <em className="italic text-text-muted">spouse</em>, your{" "}
            <em className="italic text-text-muted">mentor</em>, or your{" "}
            <em className="italic text-text-muted">recruiter</em>.
          </h2>
        </div>

        <div className="border border-border-strong bg-surface relative">
          {/* Corner brackets */}
          <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber/60" aria-hidden />
          <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber/60" aria-hidden />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber/60" aria-hidden />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber/60" aria-hidden />

          {/* Reading header */}
          <div className="border-b border-border px-6 py-3 flex items-center justify-between">
            <div className="font-mono text-xs text-text-dim uppercase tracking-widest">
              Automation Exposure Reading
            </div>
            <div className="font-mono text-xs text-text-faint">
              BAR-2026-00742
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-8">
            {/* Score panel */}
            <div className="flex flex-col items-center justify-center py-4">
              <Gauge score={73} size={160} animated={false} band="elevated" />
              <div className="mt-6 w-full font-mono text-xs space-y-2">
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-text-dim">Peer percentile</span>
                  <span className="text-text">76th</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-text-dim">Model version</span>
                  <span className="text-text">v1.0</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-text-dim">Horizon</span>
                  <span className="text-text">18-month</span>
                </div>
              </div>
            </div>

            {/* Drivers */}
            <div>
              <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
                Exposure Drivers
              </div>
              <div className="space-y-3">
                {SAMPLE_DRIVERS.map((driver) => (
                  <div key={driver.label}>
                    <div className="flex justify-between font-mono text-xs mb-1.5">
                      <span className="text-text-muted">{driver.label}</span>
                      <span className="text-text">{driver.value}</span>
                    </div>
                    <div className="h-1.5 bg-surface-2 w-full">
                      <div
                        className="h-full bg-amber/60 transition-all"
                        style={{ width: `${driver.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pivot paths */}
          <div className="border-t border-border p-6">
            <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
              Recommended Pivot Paths
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {SAMPLE_PIVOTS.map((pivot) => (
                <div
                  key={pivot.rank}
                  className="border border-border bg-bg p-4"
                >
                  <div className="font-mono text-xs text-text-faint mb-2">
                    PATH {pivot.rank}
                  </div>
                  <div className="font-fraunces text-base font-medium text-text mb-3">
                    {pivot.name}
                  </div>
                  <div className="font-mono text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-text-dim">Salary delta</span>
                      <span className="text-green-400">{pivot.delta}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-dim">Timeline</span>
                      <span className="text-text-muted">{pivot.time}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {pivot.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs text-text-dim border border-border px-1.5 py-0.5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
