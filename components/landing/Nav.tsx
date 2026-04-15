"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-bg/90 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      )}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Wordmark logoSize={28} />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#how-it-works"
            className="font-mono text-xs uppercase tracking-widest text-text-muted hover:text-amber-DEFAULT transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/methodology"
            className="font-mono text-xs uppercase tracking-widest text-text-muted hover:text-amber-DEFAULT transition-colors"
          >
            Inputs
          </Link>
          <Link
            href="/founding"
            className="font-mono text-xs uppercase tracking-widest text-text-muted hover:text-amber-DEFAULT transition-colors"
          >
            Founding
          </Link>
          <Link href="/assessment">
            <Button size="sm">Get My Score →</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden font-mono text-xs text-text-muted uppercase tracking-widest"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-bg border-b border-border px-4 py-4 flex flex-col gap-4"
        >
          <Link
            href="#how-it-works"
            className="font-mono text-xs uppercase tracking-widest text-text-muted"
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/methodology"
            className="font-mono text-xs uppercase tracking-widest text-text-muted"
            onClick={() => setMenuOpen(false)}
          >
            Inputs
          </Link>
          <Link
            href="/founding"
            className="font-mono text-xs uppercase tracking-widest text-text-muted"
            onClick={() => setMenuOpen(false)}
          >
            Founding
          </Link>
          <Link href="/assessment" onClick={() => setMenuOpen(false)}>
            <Button size="sm" fullWidth>
              Get My Score →
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
