import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getResend, FROM_EMAIL } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const { email, name, linkedinUrl, whyJoin, currentRole, geography } =
      await request.json();

    if (!email || !whyJoin) {
      return NextResponse.json(
        { error: "Email and whyJoin are required" },
        { status: 400 }
      );
    }

    const application = await prisma.foundingApplication.create({
      data: {
        email,
        name,
        linkedinUrl,
        whyJoin,
        currentRole,
        geography,
        status: "pending",
      },
    });

    // Send confirmation to applicant
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Founding cohort application received — BAROM",
      html: `
        <p style="font-family: monospace; color: #a8a29e;">
          We received your founding cohort application.<br><br>
          We review applications on a rolling basis and will be in touch within 48–72 hours.<br><br>
          Application ID: ${application.id}<br><br>
          — BAROM
        </p>
      `,
    });

    // Notify admin
    if (process.env.ADMIN_EMAIL) {
      await getResend().emails.send({
        from: FROM_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: `New founding application: ${email}`,
        html: `
          <pre style="font-family: monospace;">
New founding application
Email: ${email}
Name: ${name ?? "N/A"}
LinkedIn: ${linkedinUrl ?? "N/A"}
Role: ${currentRole ?? "N/A"}
Geography: ${geography ?? "N/A"}
Why Join: ${whyJoin}
          </pre>
        `,
      });
    }

    return NextResponse.json({ success: true, id: application.id });
  } catch (error) {
    console.error("[/api/founding/apply]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
