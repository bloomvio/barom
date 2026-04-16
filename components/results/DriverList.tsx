import type { ScoreDriver } from "@/lib/types";

interface DriverListProps {
  drivers: ScoreDriver[];
  hasFullAccess?: boolean;
}

export function DriverList({ drivers, hasFullAccess = false }: DriverListProps) {
  const visibleDrivers = hasFullAccess ? drivers : drivers.slice(0, 3);
  const hiddenCount = drivers.length - visibleDrivers.length;

  return (
    <div>
      <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
        Exposure Drivers
      </div>
      <div className="space-y-4">
        {visibleDrivers.map((driver, i) => (
          <div key={driver.label}>
            <div className="flex justify-between font-mono text-xs mb-1.5">
              <span className="text-text-muted">
                <span className="text-text-faint mr-2">{String(i + 1).padStart(2, "0")}</span>
                {driver.label}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-text-dim">
                  {Math.round(driver.weight * 100)}% weight
                </span>
                <span className="text-text font-medium w-6 text-right">
                  {Math.round(driver.value)}
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-surface-2 w-full">
              <div
                className="h-full transition-all duration-700"
                style={{
                  width: `${driver.value}%`,
                  background:
                    driver.value >= 70
                      ? "#dc2626"
                      : driver.value >= 50
                      ? "#f59e0b"
                      : "#10b981",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {!hasFullAccess && hiddenCount > 0 && (
        <div className="mt-4 border border-border-strong/50 bg-surface p-4 text-center">
          <div className="font-mono text-xs text-text-dim mb-1">
            +{hiddenCount} more driver{hiddenCount > 1 ? "s" : ""} in full reading
          </div>
          <a href="/pricing" className="font-mono text-xs text-amber hover:text-amber-bright">
            Unlock full breakdown →
          </a>
        </div>
      )}

      <div className="mt-4 font-mono text-xs text-text-faint">
        {hasFullAccess
          ? "Weighted contribution = driver value × weight"
          : "Top 3 drivers shown · Full breakdown available in paid reading"}
      </div>
    </div>
  );
}
