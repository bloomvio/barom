import { NextRequest, NextResponse } from "next/server";
import { computeScore } from "@/lib/agents/scoring/engine";
import { formatPublicId } from "@/lib/utils";
import type { IntakeAnswers } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const answers = body as IntakeAnswers;

    if (!answers.roleType || !answers.level || !answers.geography) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = computeScore(answers);
    const publicId = formatPublicId();
    const sessionId =
      request.cookies.get("session_id")?.value ??
      `anon_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    // Try to persist to DB — skip gracefully if DB isn't configured yet
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.reading.create({
        data: {
          publicId,
          sessionId,
          intake: answers as object,
          score: result.score,
          band: result.band,
          peerPercentile: result.peerPercentile,
          drivers: result.drivers as object[],
          pivotPaths: result.pivotPaths as object[],
          modelVersion: "v1.0",
        },
      });
    } catch {
      // DB not configured — results still returned, just not persisted
      console.warn("[/api/score] DB unavailable — result not persisted");
    }

    return NextResponse.json({ publicId, ...result });
  } catch (error) {
    console.error("[/api/score]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
