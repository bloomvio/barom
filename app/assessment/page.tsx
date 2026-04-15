import { Metadata } from "next";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { IntakeForm } from "@/components/assessment/IntakeForm";

export const metadata: Metadata = {
  title: "Assessment — BAROM",
  description:
    "Complete your 10-question intake assessment to receive your calibrated automation-exposure score.",
};

export default function AssessmentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Nav />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-3">
              Calibration · Step 1 of 3
            </div>
            <h1 className="font-fraunces font-light text-3xl sm:text-4xl text-text mb-3">
              Your intake assessment
            </h1>
            <p className="font-sans text-text-muted">
              10 questions · ~5 minutes · No personally identifying information required.
              Your progress is saved locally.
            </p>
          </div>
          <IntakeForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
