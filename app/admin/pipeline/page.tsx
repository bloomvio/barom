import { Nav } from "@/components/landing/Nav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getAdminSession() {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("admin_session")?.value === "authenticated";
  } catch {
    return false;
  }
}

async function getPipelineStatus() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const [jobRuns, filingRuns, dripRuns, postingCount, filingCount] = await Promise.all([
      prisma.pipelineRun.findMany({
        where: { pipelineId: "job-scraper" },
        orderBy: { startedAt: "desc" },
        take: 5,
      }),
      prisma.pipelineRun.findMany({
        where: { pipelineId: "filing-checker" },
        orderBy: { startedAt: "desc" },
        take: 5,
      }),
      prisma.pipelineRun.findMany({
        where: { pipelineId: "drip-processor" },
        orderBy: { startedAt: "desc" },
        take: 5,
      }),
      prisma.postingSnapshot.count(),
      prisma.filingInsight.count(),
    ]);
    return { jobRuns, filingRuns, dripRuns, postingCount, filingCount };
  } catch {
    return { jobRuns: [], filingRuns: [], dripRuns: [], postingCount: 0, filingCount: 0 };
  }
}

async function getWarnEvents() {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "public", "warn-events.json");
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { lastUpdated: "N/A", events: [] };
  }
}

function StatusDot({ status }: { status: string }) {
  const color = status === "success" ? "bg-green-500"
    : status === "running" ? "bg-amber animate-pulse"
    : status === "error" ? "bg-red-500"
    : "bg-text-faint";
  return <span className={`inline-block w-2 h-2 rounded-full ${color}`} />;
}

export default async function PipelinePage() {
  const isAuthenticated = await getAdminSession();
  if (!isAuthenticated) redirect("/admin");

  const { jobRuns, filingRuns, dripRuns, postingCount, filingCount } = await getPipelineStatus();
  const warnData = await getWarnEvents();

  const envStatus = {
    proxy: !!process.env.PROXY_URL,
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    resend: !!(process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith("re_placeholder")),
    cronSecret: !!process.env.CRON_SECRET,
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Nav />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-2">
              Admin · Pipeline Monitor
            </div>
            <h1 className="font-fraunces font-light text-3xl text-text">Data Pipelines</h1>
          </div>

          {/* Env config status */}
          <div className="border border-border bg-surface p-5 mb-6">
            <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
              Configuration Status
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(envStatus).map(([key, ok]) => (
                <div key={key} className="flex items-center gap-2 font-mono text-xs">
                  <StatusDot status={ok ? "success" : "error"} />
                  <span className={ok ? "text-text-muted" : "text-red-400"}>
                    {key === "proxy" ? "PROXY_URL" :
                     key === "anthropic" ? "ANTHROPIC_API_KEY" :
                     key === "resend" ? "RESEND_API_KEY" : "CRON_SECRET"}
                  </span>
                </div>
              ))}
            </div>
            {!envStatus.proxy && (
              <div className="mt-3 font-mono text-xs text-text-dim border-t border-border pt-3">
                Set PROXY_URL + ANTHROPIC_API_KEY + CRON_SECRET in Railway environment variables to activate pipelines.
              </div>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Job postings stored", value: postingCount.toLocaleString() },
              { label: "Filing insights", value: filingCount.toLocaleString() },
              { label: "Tracked firms", value: "30" },
              { label: "WARN events", value: String(warnData.events?.length ?? 0) },
            ].map((stat) => (
              <div key={stat.label} className="border border-border bg-surface p-4">
                <div className="font-fraunces text-2xl text-text mb-1">{stat.value}</div>
                <div className="font-mono text-xs text-text-dim">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Pipeline status cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { name: "Job Posting Scraper", id: "job-scraper", runs: jobRuns, schedule: "Weekly · Sun 2am UTC", endpoint: "/api/cron/scrape-jobs" },
              { name: "Filings Checker", id: "filing-checker", runs: filingRuns, schedule: "Daily · 6am UTC", endpoint: "/api/cron/check-filings" },
              { name: "Email Drip", id: "drip-processor", runs: dripRuns, schedule: "Every 6 hours", endpoint: "/api/cron/process-drip" },
            ].map((pipeline) => {
              const lastRun = pipeline.runs[0];
              return (
                <div key={pipeline.id} className="border border-border bg-surface p-5">
                  <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-3">
                    {pipeline.name}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <StatusDot status={lastRun?.status ?? "none"} />
                    <span className="font-mono text-xs text-text-muted">
                      {lastRun ? lastRun.status : "Never run"}
                    </span>
                  </div>
                  {lastRun && (
                    <div className="font-mono text-xs text-text-faint mb-2">
                      {new Date(lastRun.startedAt).toLocaleString()}
                      {lastRun.recordsProcessed != null && ` · ${lastRun.recordsProcessed} records`}
                    </div>
                  )}
                  {lastRun?.errorMessage && (
                    <div className="font-mono text-xs text-red-400/80 mt-2 break-words">
                      {lastRun.errorMessage}
                    </div>
                  )}
                  <div className="mt-3 font-mono text-xs text-text-faint border-t border-border pt-3">
                    {pipeline.schedule}
                  </div>
                  <div className="mt-1 font-mono text-xs text-text-faint">
                    {pipeline.endpoint}
                  </div>
                </div>
              );
            })}
          </div>

          {/* WARN events */}
          <div className="border border-border bg-surface p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-xs text-text-dim uppercase tracking-widest">
                WARN / Layoff Events
              </div>
              <div className="font-mono text-xs text-text-faint">
                Last updated: {warnData.lastUpdated}
              </div>
            </div>
            <div className="font-mono text-xs text-text-dim mb-3">
              Edit <code className="text-amber">public/warn-events.json</code> to add events. Deploy to update.
            </div>
            <div className="space-y-2">
              {(warnData.events ?? []).map((event: {
                date: string; firmName: string; firmType: string;
                country: string; headcount: number; aiCited: boolean; notes: string;
              }, i: number) => (
                <div key={i} className="flex items-start gap-4 border-b border-border pb-2 font-mono text-xs">
                  <span className="text-text-faint w-24 shrink-0">{event.date}</span>
                  <span className="text-text-muted flex-1">{event.firmName}</span>
                  <span className="text-text-faint w-20 text-right shrink-0">
                    {event.headcount.toLocaleString()} jobs
                  </span>
                  {event.aiCited && (
                    <span className="text-amber/70 shrink-0">AI cited</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
