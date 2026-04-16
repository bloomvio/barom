"use client";

import { useState } from "react";
import { DriverList } from "./DriverList";
import { PivotPaths } from "./PivotPaths";
import { EmailCapture } from "./EmailCapture";
import { OutcomeForm } from "./OutcomeForm";
import type { ScoreDriver, PivotPath } from "@/lib/types";

interface ResultsDetailsProps {
  publicId: string;
  drivers: ScoreDriver[];
  pivotPaths: PivotPath[];
  serverFullAccess: boolean;  // subscriber / one-time / founding member
  isFoundingEra: boolean;     // first 100 users
  geography: string;
}

export function ResultsDetails({
  publicId,
  drivers,
  pivotPaths,
  serverFullAccess,
  isFoundingEra,
  geography,
}: ResultsDetailsProps) {
  const [emailCaptured, setEmailCaptured] = useState(false);

  const hasFullAccess = serverFullAccess || (isFoundingEra && emailCaptured);

  return (
    <>
      {!emailCaptured && !serverFullAccess && (
        <EmailCapture
          publicId={publicId}
          isFoundingEra={isFoundingEra}
          onCaptured={() => setEmailCaptured(true)}
        />
      )}

      {emailCaptured && isFoundingEra && (
        <div className="border border-amber/30 bg-amber/5 px-5 py-4 font-mono text-xs text-amber">
          Founding access activated — all pivot paths unlocked.
        </div>
      )}

      <div className="border border-border bg-surface p-6">
        <DriverList drivers={drivers} hasFullAccess={hasFullAccess} />
      </div>

      <div className="border border-border bg-surface p-6">
        <PivotPaths
          paths={pivotPaths}
          hasFullAccess={hasFullAccess}
          isFoundingEra={isFoundingEra && !emailCaptured && !serverFullAccess}
          geography={geography}
        />
      </div>

      {/* Only show outcome form to users who have signed up (email captured or subscriber) */}
      {(emailCaptured || serverFullAccess) && (
        <OutcomeForm publicId={publicId} />
      )}
    </>
  );
}
