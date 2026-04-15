import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Provocation } from "@/components/landing/Provocation";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SampleReading } from "@/components/landing/SampleReading";
import { Inputs } from "@/components/landing/Inputs";
import { Founding } from "@/components/landing/Founding";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Nav />
      <main>
        <Hero />
        <Provocation />
        <HowItWorks />
        <SampleReading />
        <Inputs />
        <Founding />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
