import type { PivotPath } from "@/lib/types";

interface PivotPathsProps {
  paths: PivotPath[];
  isSubscriber?: boolean;
  isFoundingEra?: boolean;
}

export function PivotPaths({ paths, isSubscriber = false, isFoundingEra = false }: PivotPathsProps) {
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
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="font-mono text-xs text-text-faint mb-1">
                  PATH {path.priorityRank}
                </div>
                <h3 className="font-fraunces text-lg font-medium text-text">
                  {path.name}
                </h3>
              </div>
              <div className="text-right shrink-0">
                <div className="font-fraunces text-lg text-green-400">
                  +{path.salaryDelta.min}–{path.salaryDelta.max}
                  {path.salaryDelta.currency}
                </div>
                <div className="font-mono text-xs text-text-dim mt-0.5">
                  salary delta
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-text-dim">Timeline</span>
                <span className="text-text">
                  {path.timeMonths.min}–{path.timeMonths.max} months
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-text-dim">Destination exposure</span>
                <span className="text-green-400">{path.destinationExposure}/100</span>
              </div>
            </div>

            <div>
              <div className="font-mono text-xs text-text-dim mb-2">
                Required skills
              </div>
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

            {!isSubscriber && path.priorityRank > 1 && (
              <div className="absolute inset-0 bg-bg/80 backdrop-blur-[2px] flex items-center justify-center">
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
                        Full breakdown available for subscribers
                      </div>
                      <a
                        href="/pricing"
                        className="font-mono text-xs text-amber hover:text-amber-bright underline"
                      >
                        Subscribe for $10/mo →
                      </a>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {!isSubscriber && (
        <div className="mt-4 font-mono text-xs text-text-dim border-t border-border pt-4">
          {isFoundingEra
            ? "Sign up above to unlock all paths — free for our first 100 users"
            : "Path 1 shown free · Paths 2 & 3 require subscription · $10/mo or $100/yr"}
        </div>
      )}
    </div>
  );
}
