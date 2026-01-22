// web/src/app/components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-300",
          scrolled ? "bg-white/90 backdrop-blur border-b" : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="font-semibold text-lg">
              SaveOnLease
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/marketing/what-we-find" className="hover:opacity-70">
                What We Find
              </Link>
              <Link href="/marketing/how-it-works" className="hover:opacity-70">
                How It Works
              </Link>
              <Link href="/marketing/pricing" className="hover:opacity-70">
                Pricing
              </Link>
              <Link
                href="/product/app"
                className="rounded-full bg-black px-4 py-2 text-white text-sm hover:bg-gray-800"
              >
                Start Audit
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-sm"
              onClick={() => setMobileOpen((v) => !v)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] bg-white md:hidden">
          <div className="flex flex-col gap-6 px-6 pt-24 text-lg">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/marketing/what-we-find" onClick={() => setMobileOpen(false)}>
              What We Find
            </Link>
            <Link href="/marketing/how-it-works" onClick={() => setMobileOpen(false)}>
              How It Works
            </Link>
            <Link href="/marketing/pricing" onClick={() => setMobileOpen(false)}>
              Pricing
            </Link>
            <Link
              href="/product/app"
              className="mt-4 inline-block rounded-lg bg-black px-4 py-3 text-white"
              onClick={() => setMobileOpen(false)}
            >
              Start Audit
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
