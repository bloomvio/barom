import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { ScorePanel } from "@/components/results/ScorePanel";
import { DriverList } from "@/components/results/DriverList";
import { PivotPaths } from "@/components/results/PivotPaths";
import { EmailCapture } from "@/components/results/EmailCapture";
import { Button } from "@/components/ui/Button";
import type { ScoreDriver, PivotPath } from "@/lib/types";

interface Props {
  params: { publicId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Reading ${params.publicId} — BAROM`,
    description: "Your calibrated automation-exposure score.",
  };
}

export default async function ResultsPage({ params }: Props) {
  const reading = await prisma.reading.findUnique({
    where: { publicId: params.publicId },
    include: { user: true },
  });

  if (!reading) notFound();

  const result = {
    score: reading.score,
    band: reading.band as import("@/lib/types").Band,
    peerPercentile: reading.peerPercentile ?? 50,
    drivers: reading.drivers as unknown as ScoreDriver[],
    pivotPaths: reading.pivotPaths as unknown as PivotPath[],
  };

  const isSubscriber =
    reading.user?.subscriptionTier !== "free" &&
    reading.user?.subscriptionStatus === "active";

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Nav />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-2">
              Automation Exposure Reading · {reading.publicId}
            </div>
            <h1 className="font-fraunces font-light text-3xl sm:text-4xl text-text">
              Your calibrated reading
            </h1>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Score panel — left */}
            <div className="lg:col-span-2">
              <ScorePanel
                result={result}
                publicId={reading.publicId}
                createdAt={reading.createdAt.toISOString()}
              />

              {/* Actions */}
              <div className="mt-4 space-y-2">
                <Link href="/assessment" className="block">
                  <Button variant="outline" size="sm" fullWidth>
                    Retake assessment
                  </Button>
                </Link>
                <Link href="/pricing" className="block">
                  <Button size="sm" fullWidth>
                    Subscribe for 90-day roadmap →
                  </Button>
                </Link>
              </div>

              {/* Share */}
              <div className="mt-4 border border-border p-4">
                <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-2">
                  Shareable link
                </div>
                <div className="font-mono text-xs text-text-muted break-all">
                  {process.env.NEXT_PUBLIC_APP_URL}/results/{reading.publicId}
                </div>
              </div>
            </div>

            {/* Details — right */}
            <div className="lg:col-span-3 space-y-8">
              {/* Email capture (client component) */}
              <EmailCapture publicId={reading.publicId} />

              {/* Drivers */}
              <div className="border border-border bg-surface p-6">
                <DriverList drivers={result.drivers} />
              </div>

              {/* Pivot paths */}
              <div className="border border-border bg-surface p-6">
                <PivotPaths
                  paths={result.pivotPaths}
                  isSubscriber={isSubscriber}
                />
              </div>

              {/* Methodology note */}
              <div className="font-mono text-xs text-text-faint border-t border-border pt-4">
                Score computed by Barom Scoring Model v1.0 ·{" "}
                <Link href="/methodology" className="text-text-dim hover:text-amber-DEFAULT">
                  View full methodology →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
