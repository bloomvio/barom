import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Text,
} from "@react-email/components";
import * as React from "react";

interface DripDay5Props {
  paths: Array<{ name: string; delta: string; time: string }>;
  resultsUrl: string;
}

export function DripDay5Email({ paths, resultsUrl }: DripDay5Props) {
  return (
    <Html>
      <Head />
      <Preview>The three paths your score recommends</Preview>
      <Body style={{ backgroundColor: "#0c0a09", fontFamily: "monospace" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 20px" }}>
          <Text style={{ color: "#6b6157", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            BAROM · Day 5 Update
          </Text>
          <Heading style={{ color: "#f5f4f2", fontFamily: "Georgia, serif", fontSize: "28px", fontWeight: "300", marginTop: "24px" }}>
            Your three recommended pivot paths
          </Heading>
          <Text style={{ color: "#a8a29e", fontSize: "15px", lineHeight: "1.6", marginTop: "16px" }}>
            Based on your role, stack, and level, these are the three transitions
            with the best combination of feasibility and outcome improvement.
          </Text>
          {paths.map((path, i) => (
            <div key={i} style={{ marginTop: "20px", borderLeft: "2px solid #2a2520", paddingLeft: "16px" }}>
              <Text style={{ color: "#6b6157", fontSize: "11px", letterSpacing: "0.08em", margin: "0 0 4px" }}>
                PATH {i + 1}
              </Text>
              <Text style={{ color: "#f5f4f2", fontSize: "16px", fontFamily: "Georgia, serif", fontWeight: "500", margin: "0 0 4px" }}>
                {path.name}
              </Text>
              <Text style={{ color: "#a8a29e", fontSize: "12px", margin: "0" }}>
                {path.delta} salary · {path.time}
              </Text>
            </div>
          ))}
          <Text style={{ color: "#a8a29e", fontSize: "15px", lineHeight: "1.6", marginTop: "24px" }}>
            Subscribe for the full 90-day roadmap, skill tracker, and monthly recalibration.
          </Text>
          <Button
            href={resultsUrl}
            style={{
              backgroundColor: "#f59e0b", color: "#0c0a09",
              padding: "14px 28px", fontFamily: "monospace",
              fontSize: "12px", letterSpacing: "0.1em",
              textTransform: "uppercase", textDecoration: "none",
              display: "inline-block", marginTop: "16px",
            }}
          >
            LOCK IN YOUR ROADMAP →
          </Button>
          <Hr style={{ borderColor: "#2a2520", marginTop: "32px" }} />
          <Text style={{ color: "#44403c", fontSize: "11px", marginTop: "16px" }}>
            $10/mo or $100/yr globally · ₹2,999/yr in India
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default DripDay5Email;
