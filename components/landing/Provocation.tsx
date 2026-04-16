export function Provocation() {
  return (
    <section className="bg-bg-warm py-20 border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="font-mono text-xs text-amber uppercase tracking-widest mb-6 flex items-center gap-3">
          <span>▲</span>
          <span>The unsaid part, said plainly</span>
        </div>

        <h2 className="font-fraunces font-light text-4xl sm:text-5xl leading-[1.1] text-text mb-8">
          You already{" "}
          <em className="italic text-amber">sense</em> this.
        </h2>

        <div className="font-fraunces font-light text-xl sm:text-2xl text-text-muted leading-relaxed space-y-5">
          <p>
            The projects are getting smaller. Utilization isn&apos;t what it was two years ago. Juniors are doing — faster, with AI — what used to bill at premium rates.
          </p>
          <p>
            Your stack appears in fewer postings than it did last quarter. The conversation at home has started. The math on runway has been done.
          </p>
          <p className="text-text">
            <strong className="font-medium">What you don&apos;t have is a number.</strong> Calibrated to your role, your level, your stack, your geography, your years. We built that number. It is free. It takes five minutes. What you do with it is yours.
          </p>
        </div>

        <div className="mt-10 font-mono text-xs text-text-dim flex items-center gap-3">
          <span className="w-8 h-px bg-border-strong inline-block" />
          <span>No company names. No accusations. Public data, calibrated to you.</span>
        </div>
      </div>
    </section>
  );
}
