const STEPS = [
  {
    number: "01",
    title: "Calibrate",
    description:
      "Answer 10 questions about your role, stack, experience level, firm type, and AI exposure. No personally identifying information required.",
    meta: "~5 minutes · saved locally",
  },
  {
    number: "02",
    title: "Read",
    description:
      "Receive a 0–100 score with band classification, your top exposure drivers, peer percentile, and three ranked pivot paths with salary deltas.",
    meta: "instant · shareable link",
  },
  {
    number: "03",
    title: "Act",
    description:
      "Free score shows your situation clearly. Subscribe for monthly re-scoring, a personalized 90-day roadmap, and a skill tracker as the landscape shifts.",
    meta: "$10/mo · $100/yr · ₹2,999/yr",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-3">
            Process
          </div>
          <h2 className="font-fraunces font-light text-3xl sm:text-4xl text-text">
            How it works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-bg p-8 flex flex-col gap-4"
            >
              <div className="font-mono text-3xl font-light text-text-faint">
                {step.number}
              </div>
              <h3 className="font-fraunces text-2xl font-medium text-text">
                {step.title}
              </h3>
              <p className="font-sans text-text-muted leading-relaxed flex-1">
                {step.description}
              </p>
              <div className="font-mono text-xs text-text-dim border-t border-border pt-4">
                {step.meta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
