import type { PivotPath } from "@/lib/types";

interface PivotPathsProps {
  paths: PivotPath[];
  hasFullAccess?: boolean;
  isFoundingEra?: boolean;
  geography?: string;
}

function formatSalary(path: PivotPath, geography: string): string {
  const isIndia = geography === "india";

  if (isIndia && path.salaryIndia) {
    return `+₹${path.salaryIndia.min}–${path.salaryIndia.max}L`;
  }
  if (!isIndia && path.salaryGlobal) {
    return `+$${path.salaryGlobal.min}–${path.salaryGlobal.max}K`;
  }
  // Legacy format fallback
  if (path.salaryDelta) {
    return `+${path.salaryDelta.min}–${path.salaryDelta.max}${path.salaryDelta.currency}`;
  }
  return "";
}

function DifficultyBadge({ rating }: { rating?: string }) {
  if (!rating) return null;
  const colors = {
    straightforward: "text-green-400 border-green-400/30",
    moderate: "text-amber border-amber/30",
    ambitious: "text-red-400 border-red-400/30",
  } as Record<string, string>;
  return (
    <span className={`font-mono text-[10px] border px-1.5 py-0.5 ${colors[rating] ?? "text-text-dim border-border"}`}>
      {rating}
    </span>
  );
}

export function PivotPaths({
  paths,
  hasFullAccess = false,
  isFoundingEra = false,
  geography = "us",
}: PivotPathsProps) {
  return (
    <div>
      <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
        Recommended Pivot Paths
      </div>
      <div className="space-y-4">
        {paths.map((path) => (
          <div
            key={path.id}
            className="border border-border bg-bg p-5 relative"
          >
            {/* Always visible: path name + rank */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1">
                <div className="font-mono text-xs text-text-faint mb-1">
                  PATH {path.priorityRank}
                </div>
                <h3 className="font-fraunces text-lg font-medium text-text">
                  {path.name}
                </h3>
                {hasFullAccess && path.description && (
                  <p className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
                    {path.description}
                  </p>
                )}
              </div>
              {hasFullAccess && (
                <div className="text-right shrink-0">
                  <div className="font-fraunces text-lg text-green-400">
                    {formatSalary(path, geography)}
                  </div>
                  <div className="font-mono text-xs text-text-dim mt-0.5">
                    salary delta
                  </div>
                </div>
              )}
            </div>

            {/* Full content — only when access granted */}
            {hasFullAccess && (
              <>
                <div className="grid sm:grid-cols-3 gap-3 mb-4 font-mono text-xs mt-3">
                  <div className="flex justify-between py-1.5 border-b border-border">
                    <span className="text-text-dim">Timeline</span>
                    <span className="text-text">{path.timeMonths.min}–{path.timeMonths.max} mo</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border">
                    <span className="text-text-dim">Dest. exposure</span>
                    <span className="text-green-400">{path.destinationExposure}/100</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-border">
                    <span className="text-text-dim">Difficulty</span>
                    <DifficultyBadge rating={path.difficultyRating} />
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs text-text-dim mb-2">Required skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {path.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs border border-border text-text-muted px-2 py-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Paywall overlay — only on paths 2 & 3 when not full access */}
            {!hasFullAccess && path.priorityRank > 1 && (
              <div className="absolute inset-0 bg-bg/85 backdrop-blur-[2px] flex items-center justify-center">
                <div className="text-center px-4">
                  {isFoundingEra ? (
                    <>
                      <div className="font-mono text-xs text-amber uppercase tracking-widest mb-1">
                        Founding access
                      </div>
                      <div className="font-mono text-xs text-text-muted">
                        Sign up above to unlock all paths — free
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-mono text-xs text-text-dim mb-2">
                        Full breakdown in paid reading
                      </div>
                      <a href="/pricing" className="font-mono text-xs text-amber hover:text-amber-bright underline">
                        Unlock for ₹999 / $19 →
                      </a>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Path 1 teaser for free users — show destination exposure */}
            {!hasFullAccess && path.priorityRank === 1 && (
              <div className="mt-3 font-mono text-xs text-text-dim border-t border-border pt-3 flex justify-between">
                <span>Destination exposure</span>
                <span className="text-green-400">{path.destinationExposure}/100</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {!hasFullAccess && (
        <div className="mt-4 font-mono text-xs text-text-dim border-t border-border pt-4">
          {isFoundingEra
            ? "Sign up above to unlock all paths — free for our first 100 users"
            : "Path names shown free · Salary, timeline & skills in paid reading · ₹999 / $19"}
        </div>
      )}
    </div>
  );
}
