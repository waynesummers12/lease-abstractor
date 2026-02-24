"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const isAppPage = pathname.startsWith("/app");

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
    "block px-4 py-1.5 text-sm text-white opacity-90 hover:bg-white/10";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        isAppPage
          ? "bg-white border-b border-gray-200"
          : "bg-black shadow-md"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 ${
          isAppPage ? "text-gray-900" : "text-white"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-md"
        >
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

        <nav
          className={`hidden sm:flex items-center gap-6 lg:gap-8 text-sm relative ${
            isAppPage ? "text-gray-900" : "text-white"
          }`}
        >
          <div ref={learnRef} className="relative flex items-center gap-1">
  {/* Clickable label → goes to Learn page */}
          <Link
            href="/marketing/learn"
            className={`relative ${isAppPage ? "text-gray-900" : "text-white"} opacity-80 hover:opacity-100 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full`}
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
            className={`relative ${isAppPage ? "text-gray-900" : "text-white"} opacity-80 hover:opacity-100 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full`}
          >
            What We Find
          </Link>

          <Link
            href="/marketing/how-it-works"
            className={`relative ${isAppPage ? "text-gray-900" : "text-white"} opacity-80 hover:opacity-100 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full`}
          >
            How It Works
          </Link>

          <Link
            href="/marketing/pricing"
            className={`relative ${isAppPage ? "text-gray-900" : "text-white"} opacity-80 hover:opacity-100 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full`}
          >
            Pricing
          </Link>

          <Link
            href="/marketing/contact"
            className={`relative ${isAppPage ? "text-gray-900" : "text-white"} opacity-80 hover:opacity-100 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full`}
          >
            Contact
          </Link>

          <Link
            href="/app/step-1-upload"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-gray-200 transition"
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
  <div className="fixed inset-0 z-[1001] md:hidden bg-black/95 backdrop-blur-sm px-6 pt-24 pb-10 text-white overflow-y-auto">
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
