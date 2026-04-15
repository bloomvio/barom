import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";

export default function CheckoutCancelPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Nav />
      <main className="flex-1 pt-24 pb-20 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
            Checkout cancelled
          </div>
          <h1 className="font-fraunces font-light text-4xl text-text mb-4">
            No problem.
          </h1>
          <p className="font-sans text-text-muted mb-8">
            Your free score is still available. Come back when you&apos;re ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/pricing">
              <Button size="lg">View pricing →</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">Back to home</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
