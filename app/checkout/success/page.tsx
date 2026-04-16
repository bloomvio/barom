import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Nav />
      <main className="flex-1 pt-24 pb-20 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="font-mono text-4xl text-amber mb-6">✓</div>
          <h1 className="font-fraunces font-light text-4xl text-text mb-4">
            You&apos;re in.
          </h1>
          <p className="font-sans text-text-muted mb-8 leading-relaxed">
            Your subscription is active. Check your inbox for your confirmation. Monthly recalibration and full roadmap are now available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/account">
              <Button size="lg">Go to dashboard →</Button>
            </Link>
            <Link href="/assessment">
              <Button variant="outline" size="lg">Retake assessment</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
