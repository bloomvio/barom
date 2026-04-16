import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  label?: string;
}

export function Panel({ className, id, label, children, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "relative border border-border-strong bg-surface p-6",
        className
      )}
      {...props}
    >
      {/* Corner brackets */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-amber/50" aria-hidden />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber/50" aria-hidden />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-amber/50" aria-hidden />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-amber/50" aria-hidden />

      {(id || label) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          {label && (
            <span className="font-mono text-xs text-text-dim uppercase tracking-widest">
              {label}
            </span>
          )}
          {id && (
            <span className="font-mono text-xs text-text-faint">{id}</span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
