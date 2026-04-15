import Link from "next/link";
import { Button } from "@/components/ui/Button";

const PRICING_TIERS = [
  {
    name: "Standard",
    geo: "Global",
    price: "$10/mo",
    priceAlt: "or $100/yr",
    highlight: false,
    founding: false,
  },
  {
    name: "Standard",
    geo: "India",
    price: "₹2,999/yr",
    priceAlt: "PPP-adjusted",
    highlight: false,
    founding: false,
  },
  {
    name: "Founding",
    geo: "Global",
    price: "$50",
    priceAlt: "lifetime",
    highlight: true,
    founding: true,
  },
  {
    name: "Founding",
    geo: "India",
    price: "₹1,499",
    priceAlt: "lifetime",
    highlight: true,
    founding: true,
  },
];

export function Founding() {
  return (
    <section className="py-20 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Copy */}
          <div>
            <div className="font-mono text-xs text-amber-DEFAULT uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>⬡</span>
              <span>First 100 · Apply</span>
            </div>
            <h2 className="font-fraunces font-light text-3xl sm:text-4xl text-text mb-6">
              No pitch.{" "}
              <em className="italic text-amber-DEFAULT">A trade.</em>
            </h2>
            <div className="font-sans text-text-muted leading-relaxed space-y-4 mb-8">
              <p>
                The first 100 members get lifetime access. No monthly charges, no annual renewals. Full access to every feature — including the AI coach, skill tracker, and monthly re-scoring — for as long as Barom exists.
              </p>
              <p>
                In exchange: one quarterly check-in. 10 minutes, structured. Your role change, salary data, and outcome update. This data makes the model sharper for every member who comes after you.
              </p>
              <p className="text-text font-medium">
                That&apos;s the trade. Lifetime access for quarterly data. Clean.
              </p>
            </div>
            <Link href="/founding">
              <Button size="lg">Apply for founding cohort →</Button>
            </Link>
          </div>

          {/* Pricing box */}
          <div className="border border-border-strong bg-surface p-6 relative">
            <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-DEFAULT/60" aria-hidden />
            <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-DEFAULT/60" aria-hidden />
            <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-DEFAULT/60" aria-hidden />
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-DEFAULT/60" aria-hidden />

            <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-6">
              Pricing tiers
            </div>

            <div className="space-y-3">
              {PRICING_TIERS.map((tier, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-3 px-4 border ${
                    tier.founding
                      ? "border-amber-DEFAULT/40 bg-amber-DEFAULT/5"
                      : "border-border bg-bg"
                  }`}
                >
                  <div>
                    <div className={`font-mono text-xs uppercase tracking-widest ${tier.founding ? "text-amber-DEFAULT" : "text-text-muted"}`}>
                      {tier.founding ? (
                        <span className="line-through opacity-50 mr-2">{tier.name}</span>
                      ) : (
                        tier.name
                      )}{" "}
                      <span className="text-text-dim">· {tier.geo}</span>
                    </div>
                    {tier.founding && (
                      <div className="font-mono text-xs text-amber-DEFAULT mt-0.5">
                        Founding Member
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className={`font-fraunces text-xl ${tier.founding ? "text-amber-DEFAULT" : "text-text"}`}>
                      {tier.price}
                    </div>
                    <div className="font-mono text-xs text-text-dim">{tier.priceAlt}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 font-mono text-xs text-text-dim border-t border-border pt-4">
              100 founding spots total · 100 global · 100 India · First-come, applied basis
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
