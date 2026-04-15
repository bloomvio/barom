"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "./ProgressBar";
import { Button } from "@/components/ui/Button";
import type { IntakeAnswers } from "@/lib/types";

const STORAGE_KEY = "barom_intake_v1";

const ROLE_OPTIONS = [
  { value: "app-dev", label: "Application Developer" },
  { value: "qa-test", label: "QA / Test Engineer" },
  { value: "devops-platform", label: "DevOps / Platform Engineer" },
  { value: "data-eng-analytics", label: "Data Engineer / Analytics" },
  { value: "erp-functional", label: "ERP Functional Consultant" },
  { value: "erp-technical", label: "ERP Technical Consultant" },
  { value: "business-analyst", label: "Business Analyst" },
  { value: "project-delivery-mgr", label: "Project / Delivery Manager" },
  { value: "cloud-architect", label: "Cloud / Solutions Architect" },
  { value: "support-ops", label: "Support / Operations" },
  { value: "security", label: "Security Engineer" },
  { value: "consultant-strategy", label: "Strategy Consultant" },
  { value: "other", label: "Other" },
];

const EXP_OPTIONS = [
  { value: "0-2", label: "0–2 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "6-10", label: "6–10 years" },
  { value: "11-15", label: "11–15 years" },
  { value: "16+", label: "16+ years" },
];

const LEVEL_OPTIONS = [
  { value: "associate", label: "Associate / Analyst" },
  { value: "consultant", label: "Consultant" },
  { value: "senior-consultant", label: "Senior Consultant" },
  { value: "lead", label: "Lead / Tech Lead" },
  { value: "manager", label: "Manager" },
  { value: "senior-manager", label: "Senior Manager" },
  { value: "principal-director", label: "Principal / Director" },
];

const FIRM_OPTIONS = [
  { value: "big4-tech", label: "Big 4 tech consulting practice" },
  { value: "tier1-si", label: "Tier-1 IT services company" },
  { value: "tier2-si", label: "Tier-2 SI / mid-size consultancy" },
  { value: "boutique-consulting", label: "Boutique consulting firm" },
  { value: "product-co", label: "Software / product company" },
  { value: "in-house-it", label: "In-house IT department" },
  { value: "freelance-contract", label: "Freelance / independent contractor" },
  { value: "other", label: "Other" },
];

const GEO_OPTIONS = [
  { value: "india", label: "India" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "eu", label: "European Union" },
  { value: "middle-east", label: "Middle East" },
  { value: "canada", label: "Canada" },
  { value: "apac-other", label: "APAC (other)" },
  { value: "other", label: "Other" },
];

const VISA_OPTIONS = [
  { value: "citizen-pr", label: "Citizen / Permanent Resident" },
  { value: "h1b", label: "H-1B" },
  { value: "l1", label: "L-1" },
  { value: "student-opt", label: "Student / OPT" },
  { value: "other-work-visa", label: "Other work visa" },
  { value: "na", label: "N/A (India-based)" },
];

const STACK_OPTIONS = [
  "Java", ".NET", "Python", "JavaScript/TS", "SAP-ABAP", "Salesforce-Apex",
  "ServiceNow", "Oracle", "Mainframe-COBOL", "Cloud-AWS", "Cloud-Azure",
  "Cloud-GCP", "Kubernetes", "Terraform", "SQL", "Manual-Test", "Selenium",
  "Playwright", "Cypress", "Workday", "Go/Golang", "Rust", "PHP", "Ruby",
  "React", "Angular", "Vue", "Node.js", "Docker", "Ansible", "CI/CD",
  "Microservices", "GraphQL",
];

const PROJECT_OPTIONS = [
  { value: "tm-staff-aug", label: "T&M / Staff augmentation" },
  { value: "fixed-bid-delivery", label: "Fixed-bid project delivery" },
  { value: "product-development", label: "Product development" },
  { value: "managed-services", label: "Managed services" },
  { value: "advisory-strategy", label: "Advisory / strategy" },
  { value: "mixed", label: "Mixed / varies" },
];

const AI_OPTIONS = [
  { value: "daily", label: "Daily — it's part of my workflow" },
  { value: "weekly", label: "Weekly — I use it sometimes" },
  { value: "occasional", label: "Occasionally — I've tried it" },
  { value: "never-not-allowed", label: "Never — not allowed or not available" },
];

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border font-sans text-sm transition-all ${
        selected
          ? "border-amber-DEFAULT bg-amber-DEFAULT/10 text-text"
          : "border-border bg-surface text-text-muted hover:border-border-strong hover:text-text"
      }`}
    >
      {children}
    </button>
  );
}

function StackToggle({
  value,
  selected,
  onToggle,
}: {
  value: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-3 py-2 border font-mono text-xs transition-all ${
        selected
          ? "border-amber-DEFAULT bg-amber-DEFAULT/10 text-amber-DEFAULT"
          : "border-border bg-surface text-text-dim hover:border-border-strong hover:text-text-muted"
      }`}
    >
      {value}
    </button>
  );
}

const EMPTY: Partial<IntakeAnswers> = {};

export function IntakeForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<IntakeAnswers>>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers ?? {});
        setStep(parsed.step ?? 1);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step }));
    } catch {
      // ignore
    }
  }, [answers, step]);

  function set<K extends keyof IntakeAnswers>(key: K, value: IntakeAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleStack(stack: string) {
    const current = answers.primaryStack ?? [];
    if (current.includes(stack)) {
      set("primaryStack", current.filter((s) => s !== stack));
    } else {
      set("primaryStack", [...current, stack]);
    }
  }

  function canAdvanceStep1() {
    return answers.roleType && answers.experienceYears && answers.level;
  }

  function canAdvanceStep2() {
    return answers.firmType && answers.geography;
  }

  function canSubmit() {
    return (
      answers.primaryStack &&
      answers.primaryStack.length > 0 &&
      answers.projectType &&
      answers.aiToolUseAtWork
    );
  }

  async function handleSubmit() {
    if (!canSubmit()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      if (!res.ok) throw new Error("Scoring failed");
      const data = await res.json();
      // Clear saved state
      localStorage.removeItem(STORAGE_KEY);
      router.push(`/results/${data.publicId}`);
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressBar step={step} totalSteps={3} />

      <div className="mt-8">
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <label className="font-mono text-xs text-text-dim uppercase tracking-widest block mb-3">
                Your primary role
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ROLE_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    selected={answers.roleType === opt.value}
                    onClick={() => set("roleType", opt.value as IntakeAnswers["roleType"])}
                  >
                    {opt.label}
                  </OptionCard>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-text-dim uppercase tracking-widest block mb-3">
                Years of experience
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {EXP_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    selected={answers.experienceYears === opt.value}
                    onClick={() => set("experienceYears", opt.value as IntakeAnswers["experienceYears"])}
                  >
                    {opt.label}
                  </OptionCard>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-text-dim uppercase tracking-widest block mb-3">
                Your current level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LEVEL_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    selected={answers.level === opt.value}
                    onClick={() => set("level", opt.value as IntakeAnswers["level"])}
                  >
                    {opt.label}
                  </OptionCard>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              fullWidth
              disabled={!canAdvanceStep1()}
              onClick={() => setStep(2)}
            >
              Continue →
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div>
              <label className="font-mono text-xs text-text-dim uppercase tracking-widest block mb-3">
                Firm type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FIRM_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    selected={answers.firmType === opt.value}
                    onClick={() => set("firmType", opt.value as IntakeAnswers["firmType"])}
                  >
                    {opt.label}
                  </OptionCard>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-text-dim uppercase tracking-widest block mb-3">
                Geography (where you work)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {GEO_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    selected={answers.geography === opt.value}
                    onClick={() => set("geography", opt.value as IntakeAnswers["geography"])}
                  >
                    {opt.label}
                  </OptionCard>
                ))}
              </div>
            </div>

            {answers.geography && answers.geography !== "india" && (
              <div>
                <label className="font-mono text-xs text-text-dim uppercase tracking-widest block mb-3">
                  Visa / work authorization (optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {VISA_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={answers.visaStatus === opt.value}
                      onClick={() => set("visaStatus", opt.value as IntakeAnswers["visaStatus"])}
                    >
                      {opt.label}
                    </OptionCard>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button
                size="lg"
                fullWidth
                disabled={!canAdvanceStep2()}
                onClick={() => setStep(3)}
              >
                Continue →
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div>
              <label className="font-mono text-xs text-text-dim uppercase tracking-widest block mb-2">
                Primary tech stack / tools{" "}
                <span className="text-text-faint normal-case">(select all that apply)</span>
              </label>
              <div className="flex flex-wrap gap-2 mt-3">
                {STACK_OPTIONS.map((s) => (
                  <StackToggle
                    key={s}
                    value={s}
                    selected={(answers.primaryStack ?? []).includes(s)}
                    onToggle={() => toggleStack(s)}
                  />
                ))}
              </div>
              {(answers.primaryStack ?? []).length === 0 && (
                <p className="font-mono text-xs text-text-dim mt-2">
                  Select at least one
                </p>
              )}
            </div>

            <div>
              <label className="font-mono text-xs text-text-dim uppercase tracking-widest block mb-3">
                Primary project type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PROJECT_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    selected={answers.projectType === opt.value}
                    onClick={() => set("projectType", opt.value as IntakeAnswers["projectType"])}
                  >
                    {opt.label}
                  </OptionCard>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-text-dim uppercase tracking-widest block mb-3">
                AI tool use at work
              </label>
              <div className="grid grid-cols-1 gap-2">
                {AI_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    selected={answers.aiToolUseAtWork === opt.value}
                    onClick={() => set("aiToolUseAtWork", opt.value as IntakeAnswers["aiToolUseAtWork"])}
                  >
                    {opt.label}
                  </OptionCard>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-text-dim uppercase tracking-widest block mb-2">
                Biggest career concern right now{" "}
                <span className="text-text-faint normal-case">(optional)</span>
              </label>
              <textarea
                className="w-full bg-surface border border-border text-text font-sans text-sm p-3 resize-none focus:border-amber-DEFAULT focus:outline-none placeholder:text-text-faint"
                rows={3}
                placeholder="e.g. My Java skills feel less relevant than they used to be..."
                value={answers.topConcern ?? ""}
                onChange={(e) => set("topConcern", e.target.value)}
                maxLength={500}
              />
            </div>

            {error && (
              <div className="font-mono text-xs text-red-400 border border-red-500/30 bg-red-500/10 px-4 py-3">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                ← Back
              </Button>
              <Button
                size="lg"
                fullWidth
                disabled={!canSubmit() || loading}
                onClick={handleSubmit}
              >
                {loading ? "Calibrating..." : "Get My Score →"}
              </Button>
            </div>

            {loading && (
              <div className="text-center font-mono text-xs text-text-dim animate-pulse">
                Calibrating against 240+ firms · 12M+ postings · 18-month window
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
