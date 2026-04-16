import { NextRequest, NextResponse } from "next/server";

// Accepted outcome types
const VALID_TYPES = [
  "pivoted-role",        // changed job title/role
  "salary-change",       // salary went up/down
  "left-consulting",     // moved out of consulting entirely
  "upskilled",           // completed a key skill from pivot path
  "no-change",           // stayed same role, outcome update
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { publicId, reportType, data } = body;

    if (!publicId || !reportType || !data) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!VALID_TYPES.includes(reportType)) {
      return NextResponse.json({ error: "Invalid reportType" }, { status: 400 });
    }

    const { prisma } = await import("@/lib/prisma");

    // Look up reading to get userId
    const reading = await prisma.reading.findUnique({
      where: { publicId },
      select: { userId: true, score: true, band: true },
    });

    if (!reading) {
      return NextResponse.json({ error: "Reading not found" }, { status: 404 });
    }

    if (!reading.userId) {
      return NextResponse.json({ error: "Sign up to submit an outcome" }, { status: 403 });
    }

    // Prevent duplicate reports of same type for same reading
    const existing = await prisma.outcomeReport.findFirst({
      where: {
        userId: reading.userId,
        reportType,
        data: { path: ["publicId"], equals: publicId },
      },
    });
    if (existing) {
      return NextResponse.json({ success: true, duplicate: true });
    }

    await prisma.outcomeReport.create({
      data: {
        userId: reading.userId,
        reportType,
        data: {
          publicId,
          originalScore: reading.score,
          originalBand: reading.band,
          ...data,
          submittedAt: new Date().toISOString(),
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/outcomes]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Public aggregate stats only — no PII
  try {
    const { prisma } = await import("@/lib/prisma");

    const [total, byType] = await Promise.all([
      prisma.outcomeReport.count(),
      prisma.outcomeReport.groupBy({
        by: ["reportType"],
        _count: { reportType: true },
      }),
    ]);

    return NextResponse.json({
      total,
      byType: Object.fromEntries(byType.map((r) => [r.reportType, r._count.reportType])),
    });
  } catch {
    return NextResponse.json({ total: 0, byType: {} });
  }
}
