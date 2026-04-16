import { NextRequest, NextResponse } from "next/server";
import { getStripe, getPriceId, isOneTimePayment } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { plan, email, geography } = await request.json();

    if (!plan) {
      return NextResponse.json({ error: "Missing plan" }, { status: 400 });
    }

    const priceId = getPriceId(plan, geography ?? "us");
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan or price not configured" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://barom.ai";
    const isLifetime = isOneTimePayment(plan);

    // Founding cap check
    if (plan === "founding") {
      try {
        const { prisma } = await import("@/lib/prisma");
        const foundingCount = await prisma.user.count({
          where: { isFoundingMember: true },
        });
        if (foundingCount >= 100) {
          return NextResponse.json({ error: "Founding cohort is full" }, { status: 400 });
        }
      } catch {
        // DB unavailable — allow checkout to proceed
      }
    }

    let customerId: string | undefined;
    if (email) {
      try {
        const { prisma } = await import("@/lib/prisma");
        const user = await prisma.user.findUnique({ where: { email } });
        if (user?.stripeCustomerId) customerId = user.stripeCustomerId;
      } catch {
        // DB unavailable
      }
    }

    const session = await getStripe().checkout.sessions.create({
      mode: isLifetime ? "payment" : "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer: customerId,
      customer_email: !customerId ? email : undefined,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      metadata: { plan, geography: geography ?? "us" },
      ...(plan === "one-time" && {
        payment_intent_data: {
          metadata: { plan, geography: geography ?? "us" },
        },
      }),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[/api/stripe/checkout]", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
