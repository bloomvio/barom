import type { IntakeAnswers, ScoreResult, Band, ScoreDriver } from "@/lib/types";
import {
  ROLE_EXPOSURE,
  STACK_RISK,
  PROJECT_RISK,
  LEVEL_ADJUSTMENT,
  GEO_BASE,
  VISA_ADJUSTMENT,
  AI_RESILIENCE,
  EXPERIENCE_ADJUSTMENT,
  FIRM_RISK,
} from "./lookups";
import { getPivotPaths } from "./pivots";

function computeTaskExposure(a: IntakeAnswers): number {
  const roleBase = ROLE_EXPOSURE[a.roleType] ?? 55;
  const levelAdj = LEVEL_ADJUSTMENT[a.level] ?? 0;
  const expAdj = EXPERIENCE_ADJUSTMENT[a.experienceYears] ?? 0;
  return Math.max(0, Math.min(100, roleBase + levelAdj + expAdj));
}

function computeStackExposure(a: IntakeAnswers): number {
  if (a.primaryStack.length === 0) return 60;
  const roleBase = ROLE_EXPOSURE[a.roleType] ?? 55;
  const multipliers = a.primaryStack.map((s) => STACK_RISK[s] ?? 1.0);
  const avgMultiplier =
    multipliers.reduce((sum, m) => sum + m, 0) / multipliers.length;
  const firmMult = FIRM_RISK[a.firmType] ?? 1.0;
  return Math.max(0, Math.min(100, roleBase * avgMultiplier * firmMult));
}

function computeRoleTrajectory(a: IntakeAnswers): number {
  const roleBase = ROLE_EXPOSURE[a.roleType] ?? 55;
  const levelAdj = LEVEL_ADJUSTMENT[a.level] ?? 0;
  return Math.max(0, Math.min(100, roleBase + levelAdj));
}

function computeProjectModel(a: IntakeAnswers): number {
  return PROJECT_RISK[a.projectType] ?? 50;
}

function computeGeoVisaRisk(a: IntakeAnswers): number {
  const base = GEO_BASE[a.geography] ?? 55;
  const visaAdj = a.visaStatus ? (VISA_ADJUSTMENT[a.visaStatus] ?? 0) : 0;
  return Math.min(100, base + visaAdj);
}

function computeAiResilience(a: IntakeAnswers): number {
  return AI_RESILIENCE[a.aiToolUseAtWork] ?? 0;
}

function bandForScore(s: number): Band {
  if (s < 30) return "low";
  if (s < 55) return "moderate";
  if (s < 75) return "elevated";
  return "high";
}

// Rough percentile based on score, role, and level
function computePeerPercentile(
  score: number,
  roleType: string,
  level: string
): number {
  // Simplified distribution — higher score = higher percentile in "exposure"
  // meaning you're more exposed than your peers
  const base = Math.round((score / 100) * 95);
  return Math.max(5, Math.min(95, base));
}

export function computeScore(a: IntakeAnswers): ScoreResult {
  const taskExposure = computeTaskExposure(a);
  const stackExposure = computeStackExposure(a);
  const roleTrajectory = computeRoleTrajectory(a);
  const projectModel = computeProjectModel(a);
  const geoVisa = computeGeoVisaRisk(a);
  const aiResilience = computeAiResilience(a);

  const raw =
    taskExposure * 0.35 +
    stackExposure * 0.25 +
    roleTrajectory * 0.15 +
    projectModel * 0.1 +
    geoVisa * 0.1 -
    aiResilience * 0.05;

  const score = Math.round(Math.max(0, Math.min(100, raw)));
  const band = bandForScore(raw);
  const peerPercentile = computePeerPercentile(score, a.roleType, a.level);

  const drivers: ScoreDriver[] = [
    {
      label: "Role function exposure",
      value: taskExposure,
      weight: 0.35,
    },
    {
      label: "Stack maturity risk",
      value: stackExposure,
      weight: 0.25,
    },
    {
      label: "Role trajectory",
      value: roleTrajectory,
      weight: 0.15,
    },
    {
      label: "Project model risk",
      value: projectModel,
      weight: 0.1,
    },
    {
      label: "Geography & visa exposure",
      value: geoVisa,
      weight: 0.1,
    },
    {
      label: "AI tool fluency (resilience)",
      value: 100 - aiResilience,
      weight: 0.05,
    },
  ].sort((a, b) => b.value * b.weight - a.value * a.weight);

  const pivotPaths = getPivotPaths(a);

  return { score, band, peerPercentile, drivers, pivotPaths };
}
