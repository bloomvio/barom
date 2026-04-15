import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ScoreCaptureEmailProps {
  score: number;
  band: string;
  publicId: string;
  resultsUrl: string;
}

const BAND_DESCRIPTION: Record<string, string> = {
  low: "Low exposure. Your profile shows structural resilience.",
  moderate: "Moderate exposure. Some areas merit attention over 12–18 months.",
  elevated: "Elevated exposure. Active repositioning is advisable.",
  high: "High exposure. Immediate action on your pivot path is advisable.",
};

export function ScoreCaptureEmail({
  score,
  band,
  publicId,
  resultsUrl,
}: ScoreCaptureEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`Your Barom reading: ${score}/100 — ${band} exposure`}</Preview>
      <Body style={{ backgroundColor: "#0c0a09", fontFamily: "monospace" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 20px" }}>
          <Text style={{ color: "#6b6157", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "24px" }}>
            BAROM · Automation Exposure Reading
          </Text>

          <Heading style={{ color: "#f5f4f2", fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: "300", marginBottom: "8px" }}>
            Your reading: {score}/100
          </Heading>

          <Text style={{ color: "#f59e0b", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "24px" }}>
            {band.toUpperCase()} EXPOSURE
          </Text>

          <Text style={{ color: "#a8a29e", fontSize: "15px", lineHeight: "1.6", marginBottom: "24px" }}>
            {BAND_DESCRIPTION[band] ?? "Your reading is ready."}
          </Text>

          <Section style={{ marginBottom: "32px" }}>
            <Button
              href={resultsUrl}
              style={{
                backgroundColor: "#f59e0b",
                color: "#0c0a09",
                padding: "14px 28px",
                fontFamily: "monospace",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              SEE YOUR FULL READING →
            </Button>
          </Section>

          <Hr style={{ borderColor: "#2a2520", marginBottom: "24px" }} />

          <Text style={{ color: "#6b6157", fontSize: "11px", letterSpacing: "0.06em" }}>
            Reading ID: {publicId}
          </Text>
          <Text style={{ color: "#44403c", fontSize: "11px", marginTop: "8px" }}>
            You&apos;re receiving this because you completed a Barom assessment.
            No company names. No predictions. Public data, calibrated to you.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ScoreCaptureEmail;
