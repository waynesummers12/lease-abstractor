// web/src/app/components/Header.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const learnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close Learn dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        setLearnOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
        {/* Brand */}
       <Link href="/marketing" className="flex items-center gap-2">
      <Image
    src="/logo.png"
    alt="SaveOnLease"
    width={24}
    height={44}
    className="h-11 w-auto"
    priority
     />
     <span className="text-lg font-light tracking-tight leading-none">
    SaveOnLease
  </span>
</Link>


        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm relative">
          {/* Learn Dropdown */}
          <div ref={learnRef} className="relative">
            <button
              onMouseEnter={() => setLearnOpen(true)}
              onClick={() => setLearnOpen((v) => !v)}
              className="opacity-80 hover:opacity-100 flex items-center gap-1"
            >
              Learn
              <span className="text-xs">▾</span>
            </button>

            {learnOpen && (
              <div
                onMouseLeave={() => setLearnOpen(false)}
                className="absolute left-0 mt-2 w-64 rounded-lg bg-black border border-white/10 shadow-xl py-2"
              >
                <Link
                  href="/marketing/cam-reconciliation"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  CAM Reconciliation
                </Link>
                <Link
                  href="/marketing/cam-nnn-overcharges"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  CAM / NNN Overcharges
                </Link>
                <Link
                  href="/marketing/nnn-audit-rights"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  NNN Audit Rights
                </Link>
                <Link
                  href="/marketing/audit-rights"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  Audit Rights
                </Link>
                <Link
                  href="/marketing/audit-window-deadlines"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  Audit Window Deadlines
                </Link>
                <Link
                  href="/marketing/cam-expense-caps"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  CAM Expense Caps
                </Link>
                <Link
                  href="/marketing/cam-admin-page"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  CAM Admin Fees
                </Link>
                <Link
                  href="/marketing/cam-vs.nnn"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  CAM vs NNN
                </Link>
                <Link
                  href="/marketing/common-cam-fees"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  Common CAM Fees
                </Link>
                <Link
                  href="/marketing/non-allowable-cam-nnn-expenses"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  Non-Allowable CAM / NNN
                </Link>
                <Link
                  href="/marketing/nnn-expenses-explained"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  NNN Expenses Explained
                </Link>
                <Link
                  href="/marketing/nnn-calculation-examples"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  NNN Calculation Examples
                </Link>
                <Link
                  href="/marketing/nnn-insurance-charges-explained"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  NNN Insurance Charges
                </Link>
                <Link
                  href="/marketing/nnn-property-tax-charges-explained"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  NNN Property Tax Charges
                </Link>
                <Link
                  href="/marketing/nnn-reconcilisation"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  NNN Reconciliation
                </Link>
                <Link
                  href="/marketing/pro-rata-share-explained"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  Pro Rata Share Explained
                </Link>
                <Link
                  href="/marketing/cam-reconciliation-checklist"
                  className="block px-4 py-2 text-sm opacity-90 hover:bg-white/10"
                >
                  CAM Reconciliation Checklist
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/marketing/what-we-find"
            className="opacity-80 hover:opacity-100"
          >
            What We Find
          </Link>

          <Link
            href="/marketing/how-it-works"
            className="opacity-80 hover:opacity-100"
          >
            How It Works
          </Link>

          <Link
            href="/marketing/pricing"
            className="opacity-80 hover:opacity-100"
          >
            Pricing
          </Link>
<Link
  href="/marketing/contact"
  onClick={() => setMenuOpen(false)}
>
  Contact
</Link>
          <Link
  href="/app/step-1-upload"
  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
>
  Start Audit
</Link>

        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden rounded border border-white/40 px-2 py-1 text-sm"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
{menuOpen && (
  <div className="md:hidden bg-black px-6 pb-6 text-white">
    <div className="flex flex-col gap-4 text-sm">
      <span className="uppercase text-xs opacity-60">Learn</span>

      <Link href="/marketing/cam-reconciliation" onClick={() => setMenuOpen(false)}>
        CAM Reconciliation
      </Link>
      <Link href="/marketing/cam-nnn-overcharges" onClick={() => setMenuOpen(false)}>
        CAM / NNN Overcharges
      </Link>
      <Link
        href="/marketing/real-cam-nnn-overcharge-examples"
        onClick={() => setMenuOpen(false)}
      >
        Real CAM / NNN Overcharge Examples
      </Link>
      <Link href="/marketing/nnn-audit-rights" onClick={() => setMenuOpen(false)}>
        NNN Audit Rights
      </Link>
      <Link href="/marketing/audit-rights" onClick={() => setMenuOpen(false)}>
        Audit Rights
      </Link>
      <Link href="/marketing/audit-window-deadlines" onClick={() => setMenuOpen(false)}>
        Audit Window Deadlines
      </Link>
      <Link href="/marketing/cam-expense-caps" onClick={() => setMenuOpen(false)}>
        CAM Expense Caps
      </Link>
      <Link href="/marketing/cam-admin-page" onClick={() => setMenuOpen(false)}>
        CAM Admin Fees
      </Link>
      <Link href="/marketing/cam-vs-nnn" onClick={() => setMenuOpen(false)}>
        CAM vs NNN
      </Link>
      <Link href="/marketing/common-cam-fees" onClick={() => setMenuOpen(false)}>
        Common CAM Fees
      </Link>
      <Link href="/marketing/non-allowable-cam-nnn-expenses" onClick={() => setMenuOpen(false)}>
        Non-Allowable CAM / NNN
      </Link>
      <Link href="/marketing/nnn-expenses-explained" onClick={() => setMenuOpen(false)}>
        NNN Expenses Explained
      </Link>
      <Link href="/marketing/nnn-calculation-examples" onClick={() => setMenuOpen(false)}>
        NNN Calculation Examples
      </Link>
      <Link href="/marketing/nnn-insurance-charges-explained" onClick={() => setMenuOpen(false)}>
        NNN Insurance Charges
      </Link>
      <Link
        href="/marketing/nnn-property-tax-charges-explained"
        onClick={() => setMenuOpen(false)}
      >
        NNN Property Tax Charges
      </Link>
      <Link href="/marketing/nnn-reconcilisation" onClick={() => setMenuOpen(false)}>
        NNN Reconciliation
      </Link>
      <Link href="/marketing/pro-rata-share-explained" onClick={() => setMenuOpen(false)}>
        Pro Rata Share Explained
      </Link>
      <Link href="/marketing/cam-reconciliation-checklist" onClick={() => setMenuOpen(false)}>
        CAM Reconciliation Checklist
      </Link>
      <Link
        href="/marketing/real-cam-nnn-overcharge-examples"
        onClick={() => setMenuOpen(false)}
      >
        Real CAM / NNN Overcharge Examples
      </Link>

      <hr className="border-white/10 my-2" />

      <Link href="/marketing/what-we-find" onClick={() => setMenuOpen(false)}>
        What We Find
      </Link>
      <Link href="/marketing/how-it-works" onClick={() => setMenuOpen(false)}>
        How It Works
      </Link>
      <Link href="/marketing/pricing" onClick={() => setMenuOpen(false)}>
        Pricing
      </Link>

      {/* Contact is now ALWAYS visible on mobile */}
      <Link href="/marketing/contact" onClick={() => setMenuOpen(false)}>
        Contact
      </Link>

      {/* Primary CTA */}
      <Link
        href="/app/step-1-upload"
        onClick={() => setMenuOpen(false)}
        className="mt-2 rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-black hover:bg-gray-200"
      >
        Start Audit            
        </Link>
          </div>
        </div>
      )}
    </header>
  );
}

