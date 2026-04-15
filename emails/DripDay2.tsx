import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Text,
} from "@react-email/components";
import * as React from "react";

interface DripDay2Props {
  topDriver: string;
  score: number;
  resultsUrl: string;
}

export function DripDay2Email({ topDriver, score, resultsUrl }: DripDay2Props) {
  return (
    <Html>
      <Head />
      <Preview>What your top exposure driver actually means</Preview>
      <Body style={{ backgroundColor: "#0c0a09", fontFamily: "monospace" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 20px" }}>
          <Text style={{ color: "#6b6157", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            BAROM · Day 2 Update
          </Text>
          <Heading style={{ color: "#f5f4f2", fontFamily: "Georgia, serif", fontSize: "28px", fontWeight: "300", marginTop: "24px" }}>
            What &ldquo;{topDriver}&rdquo; actually means for your score
          </Heading>
          <Text style={{ color: "#a8a29e", fontSize: "15px", lineHeight: "1.6", marginTop: "16px" }}>
            Your reading came in at {score}/100. Your top exposure driver is{" "}
            <strong style={{ color: "#f5f4f2" }}>{topDriver}</strong>.
          </Text>
          <Text style={{ color: "#a8a29e", fontSize: "15px", lineHeight: "1.6", marginTop: "12px" }}>
            This means the specific function you perform is one of the categories where AI tooling
            is most actively being deployed to substitute, augment, or eliminate discrete tasks.
            It&apos;s not a verdict — it&apos;s a signal.
          </Text>
          <Text style={{ color: "#a8a29e", fontSize: "15px", lineHeight: "1.6", marginTop: "12px" }}>
            The full methodology page documents the exact data sources behind this classification.
          </Text>
          <Button
            href={resultsUrl}
            style={{
              backgroundColor: "#f59e0b", color: "#0c0a09",
              padding: "14px 28px", fontFamily: "monospace",
              fontSize: "12px", letterSpacing: "0.1em",
              textTransform: "uppercase", textDecoration: "none",
              display: "inline-block", marginTop: "24px",
            }}
          >
            SEE YOUR PIVOT PATHS →
          </Button>
          <Hr style={{ borderColor: "#2a2520", marginTop: "32px" }} />
          <Text style={{ color: "#44403c", fontSize: "11px", marginTop: "16px" }}>
            You&apos;re receiving this because you saved your Barom reading.
            Unsubscribe at any time — link in footer.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default DripDay2Email;
