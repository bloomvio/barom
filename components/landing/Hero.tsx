import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Gauge } from "./Gauge";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-block w-2 h-2 rounded-full bg-amber animate-pulse-amber" aria-hidden />
              <span className="font-mono text-xs text-text-dim uppercase tracking-widest">
                Automation Exposure Index · Apr 2026 · Calibration v1
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-fraunces font-light text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-text mb-6">
              Your IT consulting career has a number.{" "}
              <em className="italic text-amber not-italic">
                Find out what it is.
              </em>
            </h1>

            {/* Subhead */}
            <p className="font-sans text-lg text-text-muted leading-relaxed mb-8 max-w-lg">
              A calibrated automation-exposure score for your role at top global consulting firms and IT services companies. Built on earnings-call signals, restructuring filings, and job-posting data.{" "}
              <strong className="text-text font-medium">Not opinions.</strong>
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/assessment">
                <Button size="lg">Get My Score →</Button>
              </Link>
              <span className="font-mono text-xs text-text-dim">
                Free · 5 min · No signup until you see it
              </span>
            </div>

            {/* Decorative rule */}
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-6">
              {[
                ["240+", "firms tracked"],
                ["12M+", "job postings"],
                ["18-mo", "data window"],
              ].map(([stat, label]) => (
                <div key={stat}>
                  <div className="font-fraunces text-2xl font-medium text-amber">
                    {stat}
                  </div>
                  <div className="font-mono text-xs text-text-dim uppercase tracking-widest mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Instrument panel */}
          <div className="relative">
            <div className="border border-border-strong bg-surface p-6 relative">
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber/60" aria-hidden />
              <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber/60" aria-hidden />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber/60" aria-hidden />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber/60" aria-hidden />

              <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Sample Reading</span>
                <span className="text-text-faint">READING-2026-00742</span>
              </div>

              <div className="flex justify-center">
                <Gauge score={73} size={180} animated band="elevated" />
              </div>

              {/* Status line */}
              <div className="mt-4 pt-4 border-t border-border font-mono text-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-dim">BAND</span>
                  <span className="text-orange-400">ELEVATED</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-dim">HORIZON</span>
                  <span className="text-text-muted">18-month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-dim">PIVOT PATHS</span>
                  <span className="text-text-muted">3 available</span>
                </div>
              </div>

              {/* Footer stats */}
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-2">
                {[
                  { value: "+12", label: "vs peer median" },
                  { value: "14mo", label: "runway est." },
                  { value: "3", label: "pivot paths" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="font-fraunces text-lg text-amber">
                      {value}
                    </div>
                    <div className="font-mono text-xs text-text-dim leading-tight mt-0.5">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative label */}
            <div className="mt-3 font-mono text-xs text-text-faint text-right">
              ↑ sample reading · not your data
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
