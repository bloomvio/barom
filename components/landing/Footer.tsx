import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

export function Footer() {
  return (
    <footer className="py-10 border-t border-border bg-bg-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Wordmark logoSize={24} />
          <p className="font-mono text-xs text-text-dim">
            An instrument for career exposure.
          </p>
        </div>

        <nav aria-label="Footer links">
          <div className="flex flex-wrap gap-6">
            {[
              { href: "/methodology", label: "Methodology" },
              { href: "/founding", label: "Founding" },
              { href: "/pricing", label: "Pricing" },
              { href: "/privacy", label: "Privacy" },
              {
                href: "mailto:hello@barom.ai",
                label: "Contact",
              },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-mono text-xs text-text-dim hover:text-amber-DEFAULT transition-colors uppercase tracking-widest"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="font-mono text-xs text-text-faint">
          v1.0 · Apr 2026
        </div>
      </div>
    </footer>
  );
}
