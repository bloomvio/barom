import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BAROM — Calibrated automation exposure for IT consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c0a09",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#2a2520 1px, transparent 1px), linear-gradient(90deg, #2a2520 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.3,
          }}
        />

        {/* Logo gauge SVG */}
        <svg
          width="160"
          height="93"
          viewBox="0 0 120 70"
          fill="none"
          stroke="#f59e0b"
        >
          <path d="M 12 58 A 48 48 0 0 1 108 58" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="12" y1="58" x2="16" y2="53" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="60" y1="10" x2="60" y2="16" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="108" y1="58" x2="104" y2="53" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="60" y1="58" x2="91" y2="27" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="58" r="5" fill="#f59e0b" stroke="none" />
        </svg>

        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            color: "#f5f4f2",
            marginTop: 24,
            letterSpacing: "-0.02em",
          }}
        >
          BAROM
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#a8a29e",
            marginTop: 16,
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.4,
            fontFamily: "sans-serif",
            fontWeight: 300,
          }}
        >
          Your IT consulting career has a number.
        </div>

        <div
          style={{
            fontSize: 14,
            color: "#6b6157",
            marginTop: 24,
            fontFamily: "monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Automation Exposure Index · calibrated · not opinions
        </div>
      </div>
    ),
    { ...size }
  );
}
