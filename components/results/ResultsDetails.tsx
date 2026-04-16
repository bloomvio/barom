"use client";

import { useState } from "react";
import { DriverList } from "./DriverList";
import { PivotPaths } from "./PivotPaths";
import { EmailCapture } from "./EmailCapture";
import type { ScoreDriver, PivotPath } from "@/lib/types";

interface ResultsDetailsProps {
  publicId: string;
  drivers: ScoreDriver[];
  pivotPaths: PivotPath[];
  isSubscriber: boolean;
  isFoundingEra: boolean;
}

export function ResultsDetails({
  publicId,
  drivers,
  pivotPaths,
  isSubscriber,
  isFoundingEra,
}: ResultsDetailsProps) {
  const [emailCaptured, setEmailCaptured] = useState(false);

  const fullyUnlocked = isSubscriber || (isFoundingEra && emailCaptured);

  return (
    <>
      {!emailCaptured && (
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
        <DriverList drivers={drivers} />
      </div>

      <div className="border border-border bg-surface p-6">
        <PivotPaths
          paths={pivotPaths}
          isSubscriber={fullyUnlocked}
          isFoundingEra={isFoundingEra && !emailCaptured}
        />
      </div>
    </>
  );
}
