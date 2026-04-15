import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="py-28 text-center border-b border-border">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-6">
          Begin calibration
        </div>
        <h2 className="font-fraunces font-light text-4xl sm:text-5xl text-text leading-tight mb-4">
          Get the{" "}
          <em className="italic text-amber-DEFAULT">number</em>. Decide what
          to do with it.
        </h2>
        <p className="font-sans text-text-muted mb-10">
          Free · 5 minutes · No signup until you see your score.
        </p>
        <Link href="/assessment">
          <Button size="lg">Begin calibration →</Button>
        </Link>
        <div className="mt-6 font-mono text-xs text-text-faint">
          Built on public data · Auditable methodology · No company named
        </div>
      </div>
    </section>
  );
}
