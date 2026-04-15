import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPublicId(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, "0");
  return `BAR-${year}-${num}`;
}

export function getBandColor(band: string): string {
  switch (band) {
    case "low":
      return "text-green-400";
    case "moderate":
      return "text-amber-400";
    case "elevated":
      return "text-orange-400";
    case "high":
      return "text-red-400";
    default:
      return "text-text-muted";
  }
}

export function getBandLabel(band: string): string {
  switch (band) {
    case "low":
      return "Low Exposure";
    case "moderate":
      return "Moderate Exposure";
    case "elevated":
      return "Elevated Exposure";
    case "high":
      return "High Exposure";
    default:
      return "Unknown";
  }
}

export function getScoreColor(score: number): string {
  if (score < 30) return "#10b981";
  if (score < 55) return "#f59e0b";
  if (score < 75) return "#f97316";
  return "#dc2626";
}
