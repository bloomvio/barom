import { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { ScorePanel } from "@/components/results/ScorePanel";
import { ResultsDetails } from "@/components/results/ResultsDetails";
import { Button } from "@/components/ui/Button";
import type { ScoreDriver, PivotPath, Band } from "@/lib/types";

const FOUNDING_ERA_LIMIT = 100;

interface Props {
  params: Promise<{ publicId: string }>;
  searchParams: Promise<{ d?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { publicId } = await params;
  return {
    title: `Reading ${publicId} — BAROM`,
    description: "Your calibrated automation-exposure score.",
  };
}

async function getReading(publicId: string) {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.reading.findUnique({
      where: { publicId },
      include: { user: true },
    });
  } catch {
    return null;
  }
}

async function getTotalReadings(): Promise<number> {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.reading.count();
  } catch {
    return 0;
  }
}

export default async function ResultsPage({ params, searchParams }: Props) {
  const { publicId } = await params;
  const { d } = await searchParams;

  const [dbReading, totalReadings] = await Promise.all([
    getReading(publicId),
    getTotalReadings(),
  ]);

  const isFoundingEra = totalReadings <= FOUNDING_ERA_LIMIT;

  let result: {
    score: number;
    band: Band;
    peerPercentile: number;
    drivers: ScoreDriver[];
    pivotPaths: PivotPath[];
  } | null = null;

  let createdAt = new Date().toISOString();
  let serverFullAccess = false;
  let geography = "us";

  if (dbReading) {
    result = {
      score: dbReading.score,
      band: dbReading.band as Band,
      peerPercentile: dbReading.peerPercentile ?? 50,
      drivers: dbReading.drivers as unknown as ScoreDriver[],
      pivotPaths: dbReading.pivotPaths as unknown as PivotPath[],
    };
    createdAt = dbReading.createdAt.toISOString();
    // Determine geography from stored intake
    const intake = dbReading.intake as Record<string, unknown>;
    geography = (intake?.geography as string) ?? "us";
    // Full access for: subscriber, one-time buyer, founding member
    const tier = dbReading.user?.subscriptionTier ?? "free";
    const status = dbReading.user?.subscriptionStatus ?? "none";
    serverFullAccess =
      dbReading.user?.isFoundingMember === true ||
      (tier === "one-time" && status === "active") ||
      (tier === "standard" && status === "active");
  } else if (d) {
    try {
      const base64 = d.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(Buffer.from(base64, "base64").toString("utf8"));
      result = {
        score: decoded.score,
        band: decoded.band as Band,
        peerPercentile: decoded.peerPercentile ?? 50,
        drivers: decoded.drivers as ScoreDriver[],
        pivotPaths: decoded.pivotPaths as PivotPath[],
      };
      geography = (decoded.geography as string) ?? "us";
    } catch {
      result = null;
    }
  }

  if (!result) {
    return (
      <div className="flex flex-col min-h-screen bg-bg text-text">
        <Nav />
        <main className="flex-1 pt-24 pb-20 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
              Reading not found
            </div>
            <h1 className="font-fraunces font-light text-3xl text-text mb-6">
              This reading doesn&apos;t exist or has expired.
            </h1>
            <Link href="/assessment">
              <Button size="lg">Take a new assessment →</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Nav />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {isFoundingEra && !serverFullAccess && (
            <div className="mb-6 border border-amber/30 bg-amber/5 px-5 py-3 flex items-center gap-3">
              <span className="font-mono text-xs text-amber uppercase tracking-widest shrink-0">
                Founding era
              </span>
              <span className="font-mono text-xs text-text-muted">
                You&apos;re among our first {FOUNDING_ERA_LIMIT} users — full access free with email signup.
              </span>
            </div>
          )}

          <div className="mb-8">
            <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-2">
              Automation Exposure Reading · {publicId}
            </div>
            <h1 className="font-fraunces font-light text-3xl sm:text-4xl text-text">
              Your calibrated reading
            </h1>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Score panel */}
            <div className="lg:col-span-2">
              <ScorePanel
                result={result}
                publicId={publicId}
                createdAt={createdAt}
                showPercentile={serverFullAccess}
              />

              <div className="mt-4 space-y-2">
                <Link href="/assessment" className="block">
                  <Button variant="outline" size="sm" fullWidth>
                    Retake assessment
                  </Button>
                </Link>
                {!serverFullAccess && !isFoundingEra && (
                  <Link href="/pricing" className="block">
                    <Button size="sm" fullWidth>
                      Unlock full reading — ₹999 / $19 →
                    </Button>
                  </Link>
                )}
              </div>

              <div className="mt-4 border border-border p-4">
                <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-2">
                  Shareable link
                </div>
                <div className="font-mono text-xs text-text-muted break-all">
                  {process.env.NEXT_PUBLIC_APP_URL}/results/{publicId}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-3 space-y-8">
              <ResultsDetails
                publicId={publicId}
                drivers={result.drivers}
                pivotPaths={result.pivotPaths}
                serverFullAccess={serverFullAccess}
                isFoundingEra={isFoundingEra}
                geography={geography}
              />

              <div className="font-mono text-xs text-text-faint border-t border-border pt-4">
                Score computed by Barom Scoring Model v2.0 ·{" "}
                <Link href="/methodology" className="text-text-dim hover:text-amber">
                  View methodology →
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
