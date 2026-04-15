import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Text,
} from "@react-email/components";
import * as React from "react";

interface DripDay10Props {
  foundingAvailable: boolean;
  resultsUrl: string;
}

export function DripDay10Email({ foundingAvailable, resultsUrl }: DripDay10Props) {
  return (
    <Html>
      <Head />
      <Preview>Last note on your reading</Preview>
      <Body style={{ backgroundColor: "#0c0a09", fontFamily: "monospace" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 20px" }}>
          <Text style={{ color: "#6b6157", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            BAROM · Final note
          </Text>
          <Heading style={{ color: "#f5f4f2", fontFamily: "Georgia, serif", fontSize: "28px", fontWeight: "300", marginTop: "24px" }}>
            Last note on your reading
          </Heading>
          <Text style={{ color: "#a8a29e", fontSize: "15px", lineHeight: "1.6", marginTop: "16px" }}>
            You completed your Barom assessment 10 days ago. If you&apos;ve been sitting on the results, now&apos;s the time to act on them — or not.
          </Text>
          {foundingAvailable ? (
            <>
              <Text style={{ color: "#f59e0b", fontSize: "15px", lineHeight: "1.6", marginTop: "16px", fontWeight: "600" }}>
                Founding spots are still available.
              </Text>
              <Text style={{ color: "#a8a29e", fontSize: "15px", lineHeight: "1.6" }}>
                $50 globally · ₹1,499 in India. Lifetime access. One quarterly check-in.
                When the 100 spots are gone, they&apos;re gone.
              </Text>
            </>
          ) : (
            <Text style={{ color: "#a8a29e", fontSize: "15px", lineHeight: "1.6", marginTop: "16px" }}>
              Subscribe for the 90-day roadmap, monthly recalibration, and the full breakdown.
              $10/mo or $100/yr. Cancel anytime.
            </Text>
          )}
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
            {foundingAvailable ? "APPLY FOR FOUNDING →" : "SUBSCRIBE NOW →"}
          </Button>
          <Hr style={{ borderColor: "#2a2520", marginTop: "32px" }} />
          <Text style={{ color: "#44403c", fontSize: "11px", marginTop: "16px" }}>
            If this isn&apos;t for you, no further emails. Unsubscribe below.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default DripDay10Email;
