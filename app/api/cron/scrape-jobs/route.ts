import { NextRequest, NextResponse } from "next/server";

// Verifies CRON_SECRET to prevent unauthorized triggers
function verifyCronSecret(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return auth === `Bearer ${secret}`;
}

export async function POST(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { prisma } = await import("@/lib/prisma");

    // Log pipeline start
    const run = await prisma.pipelineRun.create({
      data: { pipelineId: "job-scraper", status: "running" },
    });

    // TODO: Activate when PROXY_URL env var is set
    // const { scrapeJobs } = await import("@/lib/agents/pipeline/job-scraper");
    // const result = await scrapeJobs();

    const proxyConfigured = !!process.env.PROXY_URL;

    if (!proxyConfigured) {
      await prisma.pipelineRun.update({
        where: { id: run.id },
        data: {
          status: "error",
          completedAt: new Date(),
          errorMessage: "PROXY_URL not configured. See PROXY_SETUP_GUIDE.md to activate job scraping.",
        },
      });
      return NextResponse.json({
        status: "skipped",
        reason: "PROXY_URL not configured",
        message: "Set PROXY_URL in Railway environment variables to activate job scraping.",
      });
    }

    // Active scraping path (activated when proxy is configured)
    const { scrapeJobs } = await import("@/lib/agents/pipeline/job-scraper");
    const result = await scrapeJobs();

    await prisma.pipelineRun.update({
      where: { id: run.id },
      data: {
        status: "success",
        completedAt: new Date(),
        recordsProcessed: result.postingsStored,
        meta: result as object,
      },
    });

    return NextResponse.json({ status: "ok", ...result });
  } catch (error) {
    console.error("[cron/scrape-jobs]", error);
    return NextResponse.json({ error: "Pipeline failed" }, { status: 500 });
  }
}
