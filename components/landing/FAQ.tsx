"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Is this just AI guessing about my career?",
    a: "No. The score is deterministic and rule-based. There is no language model making predictions about your future. The model uses a weighted formula applied to your inputs, calibrated against public data: earnings call transcripts, job posting velocity, restructuring filings, and compensation datasets. Every weight is documented on the methodology page. You can audit it.",
  },
  {
    q: "Will my employer find out I took this?",
    a: "No. We do not ask for your name, your company, or any personally identifying information. The assessment asks about role type, stack, and level — the same information you&apos;d include on a CV. We do not track employer IP addresses or share data with any third party. Your email, if you choose to provide it, is used only for your score delivery and drip sequence.",
  },
  {
    q: "Why don't you name the firms in your commentary?",
    a: "Legal clarity and brand credibility. Naming firms invites defamation risk and turns a calibrated instrument into a hit piece. Our job is to report on the macro signal, not to accuse specific employers. We cite filings and transcripts by source. The instrument speaks; we don't.",
  },
  {
    q: "What if my score is high — what do I actually do?",
    a: "Start with the three pivot paths in your reading. They are ranked by combination of salary improvement potential and transition feasibility from your current role. Each includes required skills and a realistic timeline. The free score gives you the diagnosis. The subscription gives you the 90-day roadmap and monthly recalibration as the landscape shifts.",
  },
  {
    q: "Why $100/year and not free?",
    a: "Because free tools are noise sources that don't get updated. A $100/year commitment means we have to earn renewal. It funds the data infrastructure, model updates, and the researcher keeping the weights calibrated. If you&apos;re on the India pricing at ₹2,999, it&apos;s about the cost of two cups of coffee per month. This is not a casual product.",
  },
  {
    q: "Why should I trust this instead of asking ChatGPT or Claude?",
    a: "General-purpose AI models hallucinate, have no current data, and cannot calibrate to your specific role-level-stack-geography combination. They will give you a confident-sounding answer with no epistemic grounding. Barom uses a documented, versioned, auditable model built on specific public data sources. We publish what we don&apos;t know. That&apos;s the difference.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 border-b border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-3">
            FAQ
          </div>
          <h2 className="font-fraunces font-light text-3xl sm:text-4xl text-text">
            Common questions
          </h2>
        </div>

        <div className="divide-y divide-border">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full text-left py-5 flex items-start justify-between gap-4 group"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
              >
                <span className="font-fraunces text-base font-medium text-text group-hover:text-amber-DEFAULT transition-colors">
                  {faq.q}
                </span>
                <span
                  className={cn(
                    "font-mono text-text-dim mt-0.5 shrink-0 transition-transform duration-200",
                    openIdx === i && "rotate-180"
                  )}
                  aria-hidden
                >
                  ↓
                </span>
              </button>
              {openIdx === i && (
                <div className="pb-5">
                  <p className="font-sans text-text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
