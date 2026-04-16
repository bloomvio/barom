import { NextRequest, NextResponse } from "next/server";

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

    const run = await prisma.pipelineRun.create({
      data: { pipelineId: "filing-checker", status: "running" },
    });

    const anthropicConfigured = !!process.env.ANTHROPIC_API_KEY;

    if (!anthropicConfigured) {
      await prisma.pipelineRun.update({
        where: { id: run.id },
        data: {
          status: "error",
          completedAt: new Date(),
          errorMessage: "ANTHROPIC_API_KEY not configured. Required for filing parsing via Claude Haiku.",
        },
      });
      return NextResponse.json({
        status: "skipped",
        reason: "ANTHROPIC_API_KEY not configured",
        message: "Add ANTHROPIC_API_KEY to Railway environment variables to activate filing analysis.",
      });
    }

    const { checkFilings } = await import("@/lib/agents/pipeline/filing-checker");
    const result = await checkFilings();

    await prisma.pipelineRun.update({
      where: { id: run.id },
      data: {
        status: "success",
        completedAt: new Date(),
        recordsProcessed: result.filingsProcessed,
        meta: result as object,
      },
    });

    return NextResponse.json({ status: "ok", ...result });
  } catch (error) {
    console.error("[cron/check-filings]", error);
    return NextResponse.json({ error: "Pipeline failed" }, { status: 500 });
  }
}
