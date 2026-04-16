"use client";

import { useState } from "react";

interface OutcomeFormProps {
  publicId: string;
}

const OUTCOME_OPTIONS = [
  { value: "pivoted-role",    label: "I changed to a different role" },
  { value: "salary-change",   label: "My salary changed significantly" },
  { value: "left-consulting", label: "I moved out of consulting entirely" },
  { value: "upskilled",       label: "I completed a key skill from my pivot path" },
  { value: "no-change",       label: "No change yet — checking in" },
] as const;

type OutcomeType = typeof OUTCOME_OPTIONS[number]["value"];

export function OutcomeForm({ publicId }: OutcomeFormProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<OutcomeType | null>(null);
  const [salaryChangePct, setSalaryChangePct] = useState("");
  const [newRole, setNewRole] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function submit() {
    if (!selected) return;
    setStatus("submitting");

    const data: Record<string, string | number> = { notes };
    if (selected === "salary-change" && salaryChangePct) {
      data.salaryChangePct = parseFloat(salaryChangePct);
    }
    if (selected === "pivoted-role" || selected === "left-consulting") {
      data.newRole = newRole;
    }

    try {
      const res = await fetch("/api/outcomes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId, reportType: selected, data }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-border bg-surface p-5 font-mono text-xs text-text-muted">
        <span className="text-amber mr-2">✓</span>
        Outcome recorded. Thank you — it helps calibrate scores for everyone.
      </div>
    );
  }

  if (!open) {
    return (
      <div className="border border-dashed border-border p-5 flex items-center justify-between">
        <div>
          <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-1">
            Report your outcome
          </div>
          <div className="font-mono text-xs text-text-faint">
            Did you pivot? Upskill? Nothing yet? Tell us — it improves the model.
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="ml-6 shrink-0 border border-border px-4 py-2 font-mono text-xs text-text-muted hover:border-amber hover:text-amber transition-colors"
        >
          Report →
        </button>
      </div>
    );
  }

  return (
    <div className="border border-border bg-surface p-5">
      <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
        What happened since your reading?
      </div>

      <div className="space-y-2 mb-4">
        {OUTCOME_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSelected(opt.value)}
            className={`w-full text-left px-4 py-3 border font-mono text-xs transition-colors ${
              selected === opt.value
                ? "border-amber text-amber bg-amber/5"
                : "border-border text-text-muted hover:border-border-strong"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {selected === "salary-change" && (
        <input
          type="number"
          placeholder="Salary change % (e.g. +25 or -10)"
          value={salaryChangePct}
          onChange={(e) => setSalaryChangePct(e.target.value)}
          className="w-full bg-bg border border-border text-text font-mono text-xs px-4 py-3 mb-3 focus:border-amber focus:outline-none"
        />
      )}

      {(selected === "pivoted-role" || selected === "left-consulting") && (
        <input
          type="text"
          placeholder="New role title (optional)"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="w-full bg-bg border border-border text-text font-mono text-xs px-4 py-3 mb-3 focus:border-amber focus:outline-none"
        />
      )}

      <textarea
        placeholder="Any context you want to share (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        className="w-full bg-bg border border-border text-text font-mono text-xs px-4 py-3 mb-4 focus:border-amber focus:outline-none resize-none"
      />

      <div className="flex gap-3">
        <button
          onClick={submit}
          disabled={!selected || status === "submitting"}
          className="bg-amber text-bg font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-amber-bright disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {status === "submitting" ? "Submitting…" : "Submit outcome →"}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="border border-border font-mono text-xs text-text-faint px-4 py-3 hover:border-border-strong transition-colors"
        >
          Cancel
        </button>
      </div>

      {status === "error" && (
        <div className="mt-3 font-mono text-xs text-red-400">
          Something went wrong. Try again.
        </div>
      )}
    </div>
  );
}
