"use client";

import { useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/Button";

const PLANS = [
  {
    key: "one-time",
    name: "One-Time Reading",
    period: "Pay once",
    geo: "India",
    price: "₹999",
    priceNote: "one-time · no subscription",
    description: "Full reading, forever. No recurring charge.",
    features: [
      "Full driver breakdown (all 6 factors)",
      "3 pivot paths with salary & timeline",
      "Peer percentile ranking",
      "Downloadable PDF of reading",
      "1 free re-score at 90 days",
    ],
    cta: "Get full reading",
    founding: false,
    highlight: false,
    geo_key: "india",
  },
  {
    key: "one-time",
    name: "One-Time Reading",
    period: "Pay once",
    geo: "Global",
    price: "$19",
    priceNote: "one-time · no subscription",
    description: "Full reading, forever. No recurring charge.",
    features: [
      "Full driver breakdown (all 6 factors)",
      "3 pivot paths with salary & timeline",
      "Peer percentile ranking",
      "Downloadable PDF of reading",
      "1 free re-score at 90 days",
    ],
    cta: "Get full reading",
    founding: false,
    highlight: false,
    geo_key: "us",
  },
  {
    key: "standard-yearly",
    name: "Standard",
    period: "Annual",
    geo: "India",
    price: "₹2,999",
    priceNote: "per year · PPP-adjusted",
    description: "Monthly re-scoring + 90-day roadmap.",
    features: [
      "Everything in one-time reading",
      "Monthly re-scoring",
      "Personalized 90-day roadmap",
      "Skill tracker",
      "Member newsletter",
      "INR billing · India benchmarks",
    ],
    cta: "Start annual (India)",
    founding: false,
    highlight: true,
    geo_key: "india",
  },
  {
    key: "standard-yearly",
    name: "Standard",
    period: "Annual",
    geo: "Global",
    price: "$100",
    priceNote: "per year · save $20 vs monthly",
    description: "Monthly re-scoring + 90-day roadmap.",
    features: [
      "Everything in one-time reading",
      "Monthly re-scoring",
      "Personalized 90-day roadmap",
      "Skill tracker",
      "Member newsletter",
    ],
    cta: "Start annual",
    founding: false,
    highlight: false,
    geo_key: "us",
  },
  {
    key: "standard-monthly",
    name: "Standard",
    period: "Monthly",
    geo: "Global",
    price: "$10",
    priceNote: "per month",
    description: "Full access, month-to-month.",
    features: [
      "Everything in annual",
      "Cancel anytime",
    ],
    cta: "Start monthly",
    founding: false,
    highlight: false,
    geo_key: "us",
  },
  {
    key: "founding",
    name: "Founding",
    period: "Lifetime",
    geo: "Global",
    price: "$50",
    priceNote: "one-time · first 100 members",
    description: "Lifetime access. Quarterly check-in obligation.",
    features: [
      "Lifetime access, all features",
      "Founding member badge",
      "Input to model calibration",
      "All Phase 2 & 3 features free",
    ],
    cta: "Apply for founding",
    founding: true,
    highlight: false,
    geo_key: "us",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(plan: { key: string; geo_key: string; founding: boolean }) {
    if (plan.founding) {
      window.location.href = "/founding";
      return;
    }

    const loadKey = plan.key + plan.geo_key;
    setLoading(loadKey);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan.key, geography: plan.geo_key }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error ?? "Something went wrong. Please try again.");
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
              Free score, always.
            </h1>
            <p className="font-sans text-text-muted max-w-xl mx-auto">
              See your score and top 3 drivers for free. Unlock the full reading with salary data, all 6 drivers, and your pivot paths — once, no subscription required.
            </p>
          </div>

          {/* Free tier callout */}
          <div className="border border-border bg-bg p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-1">Free forever</div>
              <div className="font-fraunces text-2xl text-text">$0</div>
            </div>
            <div className="font-sans text-sm text-text-muted">
              Score (0–100) · Band · Top 3 exposure drivers · 3 pivot path names · Methodology access
            </div>
            <a href="/assessment">
              <Button variant="outline" size="sm">Take free assessment →</Button>
            </a>
          </div>

          {/* Paid plans */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="font-fraunces text-3xl text-text mb-0.5">{plan.price}</div>
                <div className="font-mono text-xs text-text-dim mb-4">{plan.priceNote}</div>
                <p className="font-sans text-sm text-text-muted mb-4">{plan.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="font-mono text-xs text-text-muted flex gap-2">
                      <span className="text-amber shrink-0">→</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  fullWidth
                  variant={plan.highlight ? "primary" : "outline"}
                  disabled={loading === plan.key + plan.geo_key}
                  onClick={() => handleCheckout(plan)}
                >
                  {loading === plan.key + plan.geo_key ? "Loading..." : plan.cta}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 font-mono text-xs text-text-faint text-center">
            One-time readings include a 14-day refund if not satisfied · Subscriptions cancel anytime
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
