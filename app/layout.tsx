import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

// Use --nf-* prefix so Next.js variables don't conflict with Tailwind @theme --font-* variables
const fraunces = Fraunces({
  variable: "--nf-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--nf-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--nf-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "BAROM — Calibrated automation exposure for IT consulting",
  description:
    "A calibrated automation-exposure score for IT consulting roles. Built on earnings-call signals, restructuring filings, and job-posting data. Not opinions.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://barom.ai"
  ),
  openGraph: {
    title: "BAROM — Calibrated automation exposure for IT consulting",
    description:
      "A calibrated automation-exposure score for IT consulting roles. Built on earnings-call signals, restructuring filings, and job-posting data.",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://barom.ai",
    siteName: "BAROM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BAROM — Calibrated automation exposure for IT consulting",
    description:
      "A calibrated automation-exposure score for IT consulting roles.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrainsMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
