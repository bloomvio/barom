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
    const resendConfigured = process.env.RESEND_API_KEY &&
      !process.env.RESEND_API_KEY.startsWith("re_placeholder");

    if (!resendConfigured) {
      return NextResponse.json({
        status: "skipped",
        reason: "RESEND_API_KEY not configured",
      });
    }

    // Find email captures that need drip emails (day 2, 5, 10)
    const now = new Date();
    const processed = { day2: 0, day5: 0, day10: 0 };

    const emailCaptures = await prisma.emailEvent.findMany({
      where: { type: "score-capture", status: "delivered" },
      orderBy: { sentAt: "asc" },
    });

    for (const capture of emailCaptures) {
      const daysSince = Math.floor((now.getTime() - capture.sentAt.getTime()) / 86400000);

      for (const [day, key] of [[2, "day2"], [5, "day5"], [10, "day10"]] as const) {
        if (daysSince < day) continue;

        const alreadySent = await prisma.emailEvent.findFirst({
          where: {
            email: capture.email,
            type: `drip-day-${day}`,
          },
        });
        if (alreadySent) continue;

        // TODO: send drip email via Resend
        // await sendDripEmail(capture.email, day);

        await prisma.emailEvent.create({
          data: {
            email: capture.email,
            type: `drip-day-${day}`,
            status: "queued",
          },
        });
        processed[key as keyof typeof processed]++;
      }
    }

    return NextResponse.json({ status: "ok", processed });
  } catch (error) {
    console.error("[cron/process-drip]", error);
    return NextResponse.json({ error: "Drip processing failed" }, { status: 500 });
  }
}
