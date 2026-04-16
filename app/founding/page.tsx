"use client";

import { useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/Button";

export default function FoundingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedinUrl: "",
    currentRole: "",
    geography: "",
    whyJoin: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/founding/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-surface border border-border text-text font-sans text-sm px-4 py-3 focus:border-amber focus:outline-none placeholder:text-text-faint";

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Nav />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="font-mono text-xs text-amber uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>⬡</span>
              <span>Founding Cohort · First 100</span>
            </div>
            <h1 className="font-fraunces font-light text-4xl sm:text-5xl text-text mb-4">
              No pitch. A trade.
            </h1>
            <p className="font-sans text-text-muted text-lg leading-relaxed">
              Lifetime access to everything Barom builds — the full score, roadmap, AI coach, skill tracker, and all future features — in exchange for a quarterly 10-minute check-in on your outcome.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {[
              ["$50 global", "Lifetime · First 100 members"],
              ["₹1,499 India", "Lifetime · First 100 India members"],
              ["1 quarterly check-in", "10 minutes · structured · anonymized"],
              ["All Phase 2 & 3 features", "AI coach, skill tracker, community"],
            ].map(([title, sub]) => (
              <div key={title} className="border border-border bg-surface p-5">
                <div className="font-fraunces text-xl text-text mb-1">{title}</div>
                <div className="font-mono text-xs text-text-dim">{sub}</div>
              </div>
            ))}
          </div>

          {status === "done" ? (
            <div className="border border-amber/40 bg-amber/5 p-8 text-center">
              <div className="font-mono text-xs text-amber uppercase tracking-widest mb-3">
                Application received
              </div>
              <h2 className="font-fraunces text-2xl text-text mb-3">
                We&apos;ll be in touch within 48–72 hours.
              </h2>
              <p className="font-sans text-text-muted">
                Check your inbox for a confirmation. If approved, you&apos;ll receive a checkout link directly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
                Apply
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-text-dim block mb-1.5">
                    Name <span className="text-text-faint">(optional)</span>
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-text-dim block mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className={inputClass}
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-text-dim block mb-1.5">
                    LinkedIn <span className="text-text-faint">(optional)</span>
                  </label>
                  <input
                    type="url"
                    className={inputClass}
                    placeholder="linkedin.com/in/..."
                    value={form.linkedinUrl}
                    onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-text-dim block mb-1.5">
                    Current role <span className="text-text-faint">(optional)</span>
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Senior Consultant, QA Lead"
                    value={form.currentRole}
                    onChange={(e) => setForm({ ...form, currentRole: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs text-text-dim block mb-1.5">
                  Geography
                </label>
                <select
                  className={inputClass}
                  value={form.geography}
                  onChange={(e) => setForm({ ...form, geography: e.target.value })}
                >
                  <option value="">Select region</option>
                  <option value="india">India</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="eu">European Union</option>
                  <option value="middle-east">Middle East</option>
                  <option value="canada">Canada</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-xs text-text-dim block mb-1.5">
                  Why do you want founding membership? <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  className={inputClass}
                  rows={4}
                  placeholder="A few sentences on your situation and why the trade makes sense for you..."
                  value={form.whyJoin}
                  onChange={(e) => setForm({ ...form, whyJoin: e.target.value })}
                  maxLength={1000}
                />
              </div>

              {status === "error" && (
                <div className="font-mono text-xs text-red-400 border border-red-500/30 bg-red-500/10 px-4 py-3">
                  Something went wrong. Please try again.
                </div>
              )}

              <Button size="lg" fullWidth type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Submitting..." : "Submit application →"}
              </Button>

              <p className="font-mono text-xs text-text-faint text-center">
                We review applications within 48–72 hours and notify by email.
              </p>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
