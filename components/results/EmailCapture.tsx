"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface EmailCaptureProps {
  publicId: string;
  isFoundingEra?: boolean;
  onCaptured?: () => void;
}

export function EmailCapture({ publicId, isFoundingEra = false, onCaptured }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || status === "done") return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, publicId }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      onCaptured?.();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="border border-amber/30 bg-amber/5 p-6 relative">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 font-mono text-xs text-text-faint hover:text-text-muted"
        aria-label="Dismiss"
      >
        ✕
      </button>

      <div className="font-mono text-xs text-amber uppercase tracking-widest mb-3">
        {isFoundingEra ? "Founding member — free access" : "Save your score"}
      </div>
      <h3 className="font-fraunces text-xl font-medium text-text mb-2">
        {isFoundingEra
          ? "Unlock all pivot paths — no payment needed"
          : "Get your reading by email + monthly updates"}
      </h3>
      <p className="font-sans text-sm text-text-muted mb-5">
        {isFoundingEra
          ? "You're among our first 100 users. Sign up with your email to unlock all three pivot paths, free — no credit card, ever."
          : "Your score link is permanent, but email delivers the full breakdown and activates your 10-day drip on pivot paths. No spam."}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 bg-surface border border-border text-text font-sans text-sm px-4 py-2.5 focus:border-amber focus:outline-none placeholder:text-text-faint"
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Save →"}
        </Button>
      </form>

      {status === "error" && (
        <p className="font-mono text-xs text-red-400 mt-2">
          Something went wrong. Try again.
        </p>
      )}

      <p className="font-mono text-xs text-text-faint mt-3">
        Optional · Unsubscribe anytime · No company names ever shared
      </p>
    </div>
  );
}
