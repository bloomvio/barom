import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

export const PRICE_IDS = {
  onetimeUsd:           process.env.STRIPE_PRICE_ONETIME_USD ?? "",
  onetimeInr:           process.env.STRIPE_PRICE_ONETIME_INR ?? "",
  standardMonthlyUsd:   process.env.STRIPE_PRICE_STANDARD_MONTHLY_USD ?? "",
  standardYearlyUsd:    process.env.STRIPE_PRICE_STANDARD_YEARLY_USD ?? "",
  standardYearlyInr:    process.env.STRIPE_PRICE_STANDARD_YEARLY_INR ?? "",
  foundingUsd:          process.env.STRIPE_PRICE_FOUNDING_USD ?? "",
  foundingInr:          process.env.STRIPE_PRICE_FOUNDING_INR ?? "",
} as const;

export type PlanKey = keyof typeof PRICE_IDS;

export function getPriceId(plan: string, geography: string): string {
  const isIndia = geography === "india";
  switch (plan) {
    case "one-time":
      return isIndia ? PRICE_IDS.onetimeInr : PRICE_IDS.onetimeUsd;
    case "standard-monthly":
      return PRICE_IDS.standardMonthlyUsd;
    case "standard-yearly":
      return isIndia ? PRICE_IDS.standardYearlyInr : PRICE_IDS.standardYearlyUsd;
    case "founding":
      return isIndia ? PRICE_IDS.foundingInr : PRICE_IDS.foundingUsd;
    default:
      return "";
  }
}

export function isOneTimePayment(plan: string): boolean {
  return plan === "one-time" || plan === "founding";
}
