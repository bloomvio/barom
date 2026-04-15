"use client";

import { useEffect, useRef } from "react";
import { getScoreColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface GaugeProps {
  score: number;
  size?: number;
  animated?: boolean;
  className?: string;
  showLabel?: boolean;
  band?: string;
}

export function Gauge({
  score,
  size = 200,
  animated = true,
  className,
  showLabel = true,
  band,
}: GaugeProps) {
  const needleRef = useRef<SVGLineElement>(null);

  // Convert score (0-100) to angle (-90deg to +90deg)
  // Score 0 = left (-90°), Score 100 = right (+90°)
  const scoreToAngle = (s: number) => {
    return -90 + (s / 100) * 180;
  };

  const angle = scoreToAngle(score);
  const color = getScoreColor(score);

  // Needle endpoint calculation
  const cx = 60;
  const cy = 58;
  const length = 40;
  const rad = ((angle - 90) * Math.PI) / 180;
  const nx = cx + length * Math.cos(rad);
  const ny = cy + length * Math.sin(rad);

  useEffect(() => {
    if (!animated || !needleRef.current) return;
    // Animate needle sweep
    const el = needleRef.current;
    el.style.transformOrigin = `${cx}px ${cy}px`;
    el.style.transform = `rotate(-90deg)`;
    el.style.transition = "none";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)";
        el.style.transform = `rotate(${angle}deg)`;
      });
    });
  }, [score, animated, angle]);

  const svgSize = size;
  const scale = size / 120;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg
        viewBox="0 0 120 70"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={svgSize}
        height={svgSize * (70 / 120)}
        aria-label={`Automation exposure gauge showing score of ${score} out of 100`}
        role="img"
      >
        {/* Background arc — full range */}
        <path
          d="M 12 58 A 48 48 0 0 1 108 58"
          stroke="#2a2520"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Colored progress arc */}
        {score > 0 && (
          <path
            d={`M 12 58 A 48 48 0 0 1 ${
              cx + 48 * Math.cos(((angle - 90) * Math.PI) / 180)
            } ${cy + 48 * Math.sin(((angle - 90) * Math.PI) / 180)}`}
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        )}

        {/* Arc outline */}
        <path
          d="M 12 58 A 48 48 0 0 1 108 58"
          stroke="#3d352e"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Calibration ticks */}
        <line x1="12" y1="58" x2="16" y2="53" stroke="#6b6157" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="10" x2="60" y2="16" stroke="#6b6157" strokeWidth="2" strokeLinecap="round" />
        <line x1="108" y1="58" x2="104" y2="53" stroke="#6b6157" strokeWidth="2" strokeLinecap="round" />

        {/* Zone markers */}
        <text x="8" y="68" fill="#10b981" fontSize="5" fontFamily="monospace" textAnchor="middle">0</text>
        <text x="60" y="8" fill="#6b6157" fontSize="4" fontFamily="monospace" textAnchor="middle">50</text>
        <text x="112" y="68" fill="#dc2626" fontSize="5" fontFamily="monospace" textAnchor="middle">100</text>

        {/* Needle — animated */}
        <line
          ref={needleRef}
          x1={cx}
          y1={cy}
          x2={animated ? cx : nx}
          y2={animated ? cy - length : ny}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Pivot hub */}
        <circle cx={cx} cy={cy} r="5" fill={color} stroke="none" />
        <circle cx={cx} cy={cy} r="2.5" fill="#0c0a09" stroke="none" />
      </svg>

      {showLabel && (
        <div className="text-center mt-2">
          <div
            className="font-fraunces font-light leading-none"
            style={{ fontSize: size * 0.44, color }}
          >
            {score}
          </div>
          <div className="font-mono text-xs text-text-dim uppercase tracking-widest mt-1">
            / 100
          </div>
          {band && (
            <div className="font-mono text-xs uppercase tracking-widest mt-2" style={{ color }}>
              {band} exposure
            </div>
          )}
        </div>
      )}
    </div>
  );
}
