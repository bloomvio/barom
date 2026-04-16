import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import { ScoreCaptureEmail } from "@/emails/ScoreCapture";

export async function POST(request: NextRequest) {
  try {
    const { email, publicId } = await request.json();

    if (!email || !publicId) {
      return NextResponse.json({ error: "Missing email or publicId" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Get reading
    const reading = await prisma.reading.findUnique({ where: { publicId } });
    if (!reading) {
      return NextResponse.json({ error: "Reading not found" }, { status: 404 });
    }

    // Upsert user
    const user = await prisma.user.upsert({
      where: { email },
      create: {
        email,
        geography: reading.intake
          ? (reading.intake as { geography?: string }).geography
          : null,
      },
      update: {},
    });

    // Link reading to user
    await prisma.reading.update({
      where: { publicId },
      data: { userId: user.id },
    });

    // Send Day 0 email — optional, does not block success
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://barom.ai";
    const emailUrl = `${appUrl}/results/${publicId}`;
    let emailStatus = "skipped";

    const resendConfigured = process.env.RESEND_API_KEY &&
      !process.env.RESEND_API_KEY.startsWith("re_placeholder");

    if (resendConfigured) {
      try {
        await getResend().emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: `Your Barom reading: ${reading.score}/100`,
          react: ScoreCaptureEmail({
            score: reading.score,
            band: reading.band,
            publicId,
            resultsUrl: emailUrl,
          }),
        });
        emailStatus = "sent";
      } catch (emailErr) {
        const msg = emailErr instanceof Error ? emailErr.message : String(emailErr);
        console.error("[/api/email-capture] email send failed:", msg);
        emailStatus = `failed: ${msg}`;
      }
    }

    await prisma.emailEvent.create({
      data: {
        userId: user.id,
        email,
        type: "score-capture",
        status: emailStatus,
        metadata: { publicId },
      },
    });

    return NextResponse.json({ success: true, resultsUrl: emailUrl, emailStatus });
  } catch (error) {
    console.error("[/api/email-capture]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
