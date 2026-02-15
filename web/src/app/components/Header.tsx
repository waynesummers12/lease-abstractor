"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  const [learnOpen, setLearnOpen] = useState(false);
  const learnRef = useRef<HTMLDivElement | null>(null);
  type AuditCTAProps = {
  variant?: "education" | "urgency" | "exposure";
};

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        setLearnOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sectionTitle =
    "block px-4 pt-4 pb-2 text-[11px] font-semibold tracking-wider uppercase text-white/50 border-t border-white/10 mt-2";
  const linkClass =
    "block px-4 py-1.5 text-sm opacity-90 hover:bg-white/10";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
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

        <nav className="hidden md:flex items-center gap-6 text-sm relative">
          <div ref={learnRef} className="relative flex items-center gap-1">
  {/* Clickable label → goes to Learn page */}
  <Link
    href="/marketing/learn"
    className="opacity-80 hover:opacity-100"
  >
    Education
  </Link>

  {/* Separate dropdown toggle */}
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setLearnOpen((v) => !v);
    }}
    onMouseEnter={() => setLearnOpen(true)}
    className="text-3xl leading-none opacity-80 hover:opacity-100 transition-transform duration-200 hover:scale-110"
    aria-label="Toggle education menu"
  >
    ▾
  </button>

  {learnOpen && (
    <div
      onMouseLeave={() => setLearnOpen(false)}
      className="absolute left-0 top-full pt-2 w-80 max-h-[70vh] overflow-y-auto rounded-lg bg-black border border-white/10 shadow-xl py-2"
              >
                <div className="px-4">
                  <div className="h-px bg-white/10 mb-2"></div>
                </div>
                {/* Foundations */}
                <span className={sectionTitle}>Foundations</span>
                <Link href="/marketing/cam-vs-nnn" className={linkClass}>
                  CAM vs NNN
                </Link>
                <Link
                  href="/marketing/triple-net-lease"
                  className={linkClass}
                >
                  Triple Net Lease (NNN)
                </Link>
                <Link
                  href="/marketing/triple-net-lease-meaning"
                  className={linkClass}
                >
                  Triple Net Lease Meaning
                </Link>
                <Link
                  href="/marketing/triple-net-lease-vs-gross"
                  className={linkClass}
                >
                  Triple Net Lease vs Gross
                </Link>
                <Link
                  href="/marketing/pro-rata-share-explained"
                  className={linkClass}
                >
                  Pro Rata Share
                </Link>
                <Link
                  href="/marketing/nnn-calculation-examples"
                  className={linkClass}
                >
                  NNN Calculation Examples
                </Link>
                <div className="px-4">
                  <div className="h-px bg-white/10 my-2"></div>
                </div>

                {/* Audit Rights */}
                <span className={sectionTitle}>Audit Rights</span>
                <Link href="/marketing/audit-rights" className={linkClass}>
                  Audit Rights
                </Link>
                <Link href="/marketing/nnn-audit-rights" className={linkClass}>
                  NNN Audit Rights
                </Link>
                <Link
                  href="/marketing/audit-window-deadlines"
                  className={linkClass}
                >
                  Audit Window Deadlines
                </Link>
                <div className="px-4">
                  <div className="h-px bg-white/10 my-2"></div>
                </div>

                {/* CAM Topics */}
                <span className={sectionTitle}>CAM Topics</span>
                <Link
                  href="/marketing/cam-reconciliation"
                  className={linkClass}
                >
                  CAM Reconciliation
                </Link>
                <Link
                  href="/marketing/common-area-maintenance"
                  className={linkClass}
                >
                  Common Area Maintenance (CAM)
                </Link>
                <Link
                  href="/marketing/cam-fee-meaning"
                  className={linkClass}
                >
                  CAM Fee Meaning
                </Link>
                <Link
                  href="/marketing/cam-expense-caps"
                  className={linkClass}
                >
                  CAM Expense Caps
                </Link>
                <Link
                  href="/marketing/cam-admin-page"
                  className={linkClass}
                >
                  CAM Admin Fees
                </Link>
                <Link
                  href="/marketing/common-cam-fees"
                  className={linkClass}
                >
                  Common CAM Fees
                </Link>
                <Link
                  href="/marketing/cam-reconciliation-checklist"
                  className={linkClass}
                >
                  CAM Reconciliation Checklist
                </Link>
                <div className="px-4">
                  <div className="h-px bg-white/10 my-2"></div>
                </div>

                {/* NNN Topics */}
                <span className={sectionTitle}>NNN Topics</span>
                <Link
                  href="/marketing/nnn-reconciliation"
                  className={linkClass}
                >
                  NNN Reconciliation
                </Link>
                <Link
                  href="/marketing/nnn-insurance-charges-explained"
                  className={linkClass}
                >
                  NNN Insurance Charges
                </Link>
                <Link
                  href="/marketing/nnn-property-tax-charges-explained"
                  className={linkClass}
                >
                  NNN Property Tax Charges
                </Link>
                <div className="px-4">
                  <div className="h-px bg-white/10 my-2"></div>
                </div>

                {/* Risk & Overcharges */}
                <span className={sectionTitle}>Risk & Overcharges</span>
                <Link
                  href="/marketing/cam-nnn-overcharges"
                  className={linkClass}
                >
                  CAM / NNN Overcharges
                </Link>
                <Link
                  href="/marketing/lease-overcharge"
                  className={linkClass}
                >
                  Lease Overcharge
                </Link>
                <Link
                  href="/marketing/cam-reconciliation-errors"
                  className={linkClass}
                >
                  CAM Reconciliation Errors
                </Link>
                <Link
                  href="/marketing/non-allowable-cam-nnn-expenses"
                  className={linkClass}
                >
                  Non-Allowable CAM / NNN
                </Link>
                <Link
                  href="/marketing/real-cam-nnn-overcharge-examples"
                  className={linkClass}
                >
                  Real Overcharge Examples
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
            className="opacity-80 hover:opacity-100"
          >
            Contact
          </Link>

          <Link
            href="/app/step-1-upload"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
          >
            Start Audit (Free Preview)
          </Link>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-white/30 px-3 py-2 text-lg font-medium transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </div>

      
{menuOpen && (
  <div className="fixed inset-0 z-[999] md:hidden bg-black px-6 pt-24 pb-10 text-white overflow-y-auto">
    <div className="flex justify-end mb-6">
      <button
        onClick={() => setMenuOpen(false)}
        className="text-2xl font-light"
        aria-label="Close menu"
      >
        ✕
      </button>
    </div>
    <div className="flex flex-col gap-4 text-sm">
      <span className="uppercase text-xs opacity-60">Education</span>

      <Link href="/marketing/cam-reconciliation" onClick={() => setMenuOpen(false)}>
        CAM Reconciliation
      </Link>
      <Link href="/marketing/cam-nnn-overcharges" onClick={() => setMenuOpen(false)}>
        CAM / NNN Overcharges
      </Link>
      <Link href="/marketing/real-cam-nnn-overcharge-examples" onClick={() => setMenuOpen(false)}>
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
      <Link href="/marketing/triple-net-lease" onClick={() => setMenuOpen(false)}>
        Triple Net Lease (NNN)
      </Link>
      <Link href="/marketing/triple-net-lease-meaning" onClick={() => setMenuOpen(false)}>
        Triple Net Lease Meaning
      </Link>
      <Link href="/marketing/triple-net-lease-vs-gross" onClick={() => setMenuOpen(false)}>
        Triple Net Lease vs Gross
      </Link>
      <Link href="/marketing/lease-overcharge" onClick={() => setMenuOpen(false)}>
        Lease Overcharge
      </Link>
      <Link href="/marketing/cam-reconciliation-errors" onClick={() => setMenuOpen(false)}>
        CAM Reconciliation Errors
      </Link>
      <Link href="/marketing/common-area-maintenance" onClick={() => setMenuOpen(false)}>
        Common Area Maintenance (CAM)
      </Link>
      <Link href="/marketing/cam-fee-meaning" onClick={() => setMenuOpen(false)}>
        CAM Fee Meaning
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
      <Link href="/marketing/nnn-property-tax-charges-explained" onClick={() => setMenuOpen(false)}>
        NNN Property Tax Charges
      </Link>
      <Link href="/marketing/nnn-reconciliation" onClick={() => setMenuOpen(false)}>
        NNN Reconciliation
      </Link>
      <Link href="/marketing/pro-rata-share-explained" onClick={() => setMenuOpen(false)}>
        Pro Rata Share Explained
      </Link>
      <Link href="/marketing/cam-reconciliation-checklist" onClick={() => setMenuOpen(false)}>
        CAM Reconciliation Checklist
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
      <Link href="/marketing/contact" onClick={() => setMenuOpen(false)}>
        Contact
      </Link>

      <Link
        href="/app/step-1-upload"
        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
        onClick={() => setMenuOpen(false)}
      >
        Start Audit
      </Link>
     </div>
  </div>
)}

    </header>
  );
}
