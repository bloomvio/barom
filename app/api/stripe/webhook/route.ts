import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// App Router: body parsing is handled via request.text() / request.arrayBuffer()
async function upsertUserFromCustomer(
  customerId: string,
  email: string | null | undefined,
  data: {
    subscriptionTier?: string;
    subscriptionStatus?: string;
    subscriptionPeriodEnd?: Date | null;
    isFoundingMember?: boolean;
  }
) {
  if (!email) return;
  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      stripeCustomerId: customerId,
      ...data,
    },
    update: {
      stripeCustomerId: customerId,
      ...data,
    },
  });

  if (data.isFoundingMember) {
    const currentCount = await prisma.user.count({
      where: { isFoundingMember: true, id: { not: user.id } },
    });
    if (!user.foundingNumber) {
      await prisma.user.update({
        where: { id: user.id },
        data: { foundingNumber: currentCount + 1 },
      });
    }
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (err) {
    console.error("[webhook] Signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_email ?? session.customer_details?.email;
        const customerId =
          typeof session.customer === "string" ? session.customer : session.customer?.id;
        const plan = session.metadata?.plan ?? "standard-yearly";
        const isFounding = plan === "founding";

        if (customerId) {
          await upsertUserFromCustomer(customerId, email, {
            subscriptionTier: isFounding ? "founding" : "standard",
            subscriptionStatus: isFounding ? "lifetime" : "active",
            subscriptionPeriodEnd: isFounding ? null : new Date(Date.now() + 365 * 86400 * 1000),
            isFoundingMember: isFounding,
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer.id;
        const customer = await stripe.customers.retrieve(customerId);
        const email =
          "email" in customer && typeof customer.email === "string"
            ? customer.email
            : undefined;

        await upsertUserFromCustomer(customerId, email, {
          subscriptionStatus: sub.status,
          subscriptionPeriodEnd: new Date((sub as Stripe.Subscription & { current_period_end: number }).current_period_end * 1000),
        });
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer.id;
        const customer = await stripe.customers.retrieve(customerId);
        const email =
          "email" in customer && typeof customer.email === "string"
            ? customer.email
            : undefined;

        await upsertUserFromCustomer(customerId, email, {
          subscriptionStatus: "canceled",
          subscriptionTier: "free",
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice.customer?.id;
        if (!customerId) break;
        const customer = await stripe.customers.retrieve(customerId);
        const email =
          "email" in customer && typeof customer.email === "string"
            ? customer.email
            : undefined;
        await upsertUserFromCustomer(customerId, email, {
          subscriptionStatus: "past_due",
        });
        break;
      }
    }
  } catch (err) {
    console.error("[webhook] Handler error", err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
