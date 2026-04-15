interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const STEP_LABELS = ["Role & Level", "Context", "Stack & AI"];

export function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  const pct = Math.round((step / totalSteps) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-xs text-text-dim uppercase tracking-widest">
          Step {step} of {totalSteps} · {STEP_LABELS[step - 1]}
        </span>
        <span className="font-mono text-xs text-amber-DEFAULT">{pct}%</span>
      </div>
      <div className="h-1 bg-surface-2 w-full">
        <div
          className="h-full bg-amber-DEFAULT transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
