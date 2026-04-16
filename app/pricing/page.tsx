"use client";

import { useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/Button";

const PLANS = [
  {
    key: "standard-monthly",
    name: "Standard",
    period: "Monthly",
    geo: "Global",
    price: "$10",
    priceNote: "per month",
    description: "Full access, month-to-month.",
    features: [
      "Monthly re-scoring",
      "Full driver breakdown",
      "Personalized 90-day roadmap",
      "Skill tracker",
      "Member newsletter",
      "AI coach (Phase 2)",
    ],
    cta: "Start monthly",
    founding: false,
  },
  {
    key: "standard-yearly",
    name: "Standard",
    period: "Annual",
    geo: "Global",
    price: "$100",
    priceNote: "per year · save $20",
    description: "Best value for committed repositioning.",
    features: [
      "Everything in monthly",
      "Save 17% vs monthly",
      "Priority feature access",
    ],
    cta: "Start annual",
    founding: false,
    highlight: true,
  },
  {
    key: "standard-yearly",
    name: "Standard",
    period: "Annual",
    geo: "India",
    price: "₹2,999",
    priceNote: "per year · PPP-adjusted",
    description: "India pricing. Same full access.",
    features: [
      "Everything in global annual",
      "INR billing",
      "India-calibrated benchmarks",
    ],
    cta: "Start (India)",
    founding: false,
  },
  {
    key: "founding",
    name: "Founding",
    period: "Lifetime",
    geo: "Global",
    price: "$50",
    priceNote: "one-time · first 100 members",
    description: "Lifetime access. One quarterly check-in obligation.",
    features: [
      "Lifetime access, all features",
      "Founding member badge",
      "Quarterly outcome check-in",
      "Input to model calibration",
      "All Phase 2 & 3 features",
    ],
    cta: "Apply for founding",
    founding: true,
    highlight: false,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(plan: { key: string; geo: string; founding: boolean }) {
    if (plan.founding) {
      window.location.href = "/founding";
      return;
    }

    setLoading(plan.key + plan.geo);
    const geography = plan.geo.toLowerCase() === "india" ? "india" : "us";

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan.key, geography }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Nav />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
              Pricing
            </div>
            <h1 className="font-fraunces font-light text-4xl sm:text-5xl text-text mb-4">
              Calibrated pricing.
            </h1>
            <p className="font-sans text-text-muted max-w-xl mx-auto">
              Free score, always. Subscribe for the roadmap, monthly recalibration, and tools.
            </p>
          </div>

          {/* Free tier */}
          <div className="border border-border bg-bg p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-1">
                Free forever
              </div>
              <div className="font-fraunces text-2xl text-text">$0</div>
            </div>
            <div className="font-sans text-text-muted text-sm max-w-sm">
              One-time score · Top 3 drivers · 3 generic pivot path names · Methodology access
            </div>
            <a href="/assessment">
              <Button variant="outline">Take free assessment →</Button>
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`border p-6 flex flex-col ${
                  plan.highlight
                    ? "border-amber bg-amber/5"
                    : "border-border bg-surface"
                }`}
              >
                {plan.highlight && (
                  <div className="font-mono text-xs text-amber uppercase tracking-widest mb-3">
                    ★ Most popular
                  </div>
                )}
                <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-1">
                  {plan.name} · {plan.geo}
                </div>
                <div className="font-fraunces text-3xl text-text mb-1">
                  {plan.price}
                </div>
                <div className="font-mono text-xs text-text-dim mb-4">
                  {plan.priceNote}
                </div>
                <p className="font-sans text-sm text-text-muted mb-4">
                  {plan.description}
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="font-mono text-xs text-text-muted flex gap-2">
                      <span className="text-amber">→</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  fullWidth
                  variant={plan.highlight ? "primary" : "outline"}
                  disabled={loading === plan.key + plan.geo}
                  onClick={() => handleCheckout(plan)}
                >
                  {loading === plan.key + plan.geo ? "Loading..." : plan.cta}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 font-mono text-xs text-text-faint text-center">
            All paid plans include a 14-day refund if you&apos;re not satisfied · Cancel anytime
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
