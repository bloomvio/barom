import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export const PRICE_IDS = {
  standardMonthlyUsd: process.env.STRIPE_PRICE_STANDARD_MONTHLY_USD ?? "",
  standardYearlyUsd: process.env.STRIPE_PRICE_STANDARD_YEARLY_USD ?? "",
  standardYearlyInr: process.env.STRIPE_PRICE_STANDARD_YEARLY_INR ?? "",
  foundingUsd: process.env.STRIPE_PRICE_FOUNDING_USD ?? "",
  foundingInr: process.env.STRIPE_PRICE_FOUNDING_INR ?? "",
} as const;

export type PlanKey = keyof typeof PRICE_IDS;

export function getPriceId(plan: string, geography: string): string {
  const isIndia = geography === "india";
  switch (plan) {
    case "standard-monthly":
      return PRICE_IDS.standardMonthlyUsd;
    case "standard-yearly":
      return isIndia ? PRICE_IDS.standardYearlyInr : PRICE_IDS.standardYearlyUsd;
    case "founding":
      return isIndia ? PRICE_IDS.foundingInr : PRICE_IDS.foundingUsd;
    default:
      return PRICE_IDS.standardYearlyUsd;
  }
}
