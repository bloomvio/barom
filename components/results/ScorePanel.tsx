"use client";

import { Gauge } from "@/components/landing/Gauge";
import { Badge } from "@/components/ui/Badge";
import { getBandLabel } from "@/lib/utils";
import type { ScoreResult } from "@/lib/types";

interface ScorePanelProps {
  result: ScoreResult;
  publicId: string;
  createdAt: string;
  showPercentile?: boolean;
}

export function ScorePanel({ result, publicId, createdAt, showPercentile = false }: ScorePanelProps) {
  const bandVariant =
    result.band === "low"
      ? "green"
      : result.band === "moderate"
      ? "amber"
      : result.band === "elevated"
      ? "amber"
      : "red";

  return (
    <div className="border border-border-strong bg-surface relative p-6">
      <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber/60" aria-hidden />
      <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber/60" aria-hidden />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber/60" aria-hidden />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber/60" aria-hidden />

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="font-mono text-xs text-text-dim uppercase tracking-widest">
          Automation Exposure Reading
        </div>
        <div className="font-mono text-xs text-text-faint">{publicId}</div>
      </div>

      <div className="flex flex-col items-center py-4">
        <Gauge
          score={result.score}
          size={200}
          animated
          band={result.band}
          showLabel
        />
      </div>

      <div className="mt-4 space-y-2 font-mono text-xs">
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-text-dim">Band</span>
          <Badge variant={bandVariant}>{getBandLabel(result.band)}</Badge>
        </div>
        {showPercentile && (
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-dim">Peer percentile</span>
            <span className="text-text">{result.peerPercentile}th</span>
          </div>
        )}
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-text-dim">Model version</span>
          <span className="text-text">v2.0</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-text-dim">Issued</span>
          <span className="text-text">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
