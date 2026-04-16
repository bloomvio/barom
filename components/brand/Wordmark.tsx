import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import Link from "next/link";

interface WordmarkProps {
  className?: string;
  logoSize?: number;
  showTagline?: boolean;
}

export function Wordmark({ className, logoSize = 32, showTagline = false }: WordmarkProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 group focus-visible:outline-none", className)}
      aria-label="BAROM — Home"
    >
      <Logo
        size={logoSize}
        className="text-amber transition-colors group-hover:text-amber-bright"
      />
      <span
        className="font-fraunces font-semibold text-text tracking-tight"
        style={{ letterSpacing: "-0.02em", fontSize: logoSize * 0.65 }}
      >
        BAROM
      </span>
      {showTagline && (
        <span className="font-mono text-xs text-text-dim hidden sm:block">
          / calibration instrument
        </span>
      )}
    </Link>
  );
}
