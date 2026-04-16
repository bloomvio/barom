import { Metadata } from "next";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Account — BAROM",
};

export default function AccountPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Nav />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-3">
              Dashboard
            </div>
            <h1 className="font-fraunces font-light text-3xl text-text">
              Your account
            </h1>
          </div>

          <div className="border border-amber/30 bg-amber/5 p-6 mb-8">
            <div className="font-mono text-xs text-amber uppercase tracking-widest mb-2">
              Phase 2 — Coming soon
            </div>
            <p className="font-sans text-text-muted">
              The subscriber dashboard with monthly recalibration, skill tracker, and AI coach launches in Phase 2. Subscribe now to be notified at launch.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/assessment">
              <Button size="lg" fullWidth>Take or retake assessment →</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" fullWidth>View subscription options →</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
