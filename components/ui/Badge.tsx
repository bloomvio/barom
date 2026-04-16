import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "amber" | "red" | "green" | "cyan" | "dim";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-xs uppercase tracking-widest px-2 py-0.5",
        {
          "bg-surface-2 text-text-muted border border-border": variant === "default",
          "bg-amber-glow text-amber border border-amber/30":
            variant === "amber",
          "bg-red-500/10 text-red-400 border border-red-500/30": variant === "red",
          "bg-green-500/10 text-green-400 border border-green-500/30":
            variant === "green",
          "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30": variant === "cyan",
          "text-text-dim border border-border": variant === "dim",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
