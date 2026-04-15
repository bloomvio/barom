import { NextRequest, NextResponse } from "next/server";
import { stripe, getPriceId } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { plan, email, geography } = await request.json();

    if (!plan) {
      return NextResponse.json({ error: "Missing plan" }, { status: 400 });
    }

    const priceId = getPriceId(plan, geography ?? "us");
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://barom.ai";
    const isLifetime = plan === "founding";

    // Founding cap check
    if (isLifetime) {
      const foundingCount = await prisma.user.count({
        where: { isFoundingMember: true },
      });
      if (foundingCount >= 100) {
        return NextResponse.json(
          { error: "Founding cohort is full" },
          { status: 400 }
        );
      }
    }

    let customerId: string | undefined;
    if (email) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user?.stripeCustomerId) {
        customerId = user.stripeCustomerId;
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: isLifetime ? "payment" : "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer: customerId,
      customer_email: !customerId ? email : undefined,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      metadata: { plan, geography: geography ?? "us" },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[/api/stripe/checkout]", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
