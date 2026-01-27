// web/src/app/components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
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
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/marketing/learn" className="opacity-80 hover:opacity-100">
            Learn
          </Link>
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
          <Link href="/marketing/pricing" className="opacity-80 hover:opacity-100">
            Pricing
          </Link>
          <Link
            href="/marketing/cam-reconciliation"
            className="opacity-80 hover:opacity-100"
          >
            CAM Reconciliation
          </Link>
          <Link
            href="/marketing/nnn-audit-rights"
            className="opacity-80 hover:opacity-100"
          >
            NNN Audit Rights
          </Link>
          <Link
            href="/marketing/cam-expense-caps"
            className="opacity-80 hover:opacity-100"
          >
            CAM Expense Caps
          </Link>
          <Link
            href="/marketing/cam-admin-page"
            className="opacity-80 hover:opacity-100"
          >
            CAM Admin
          </Link>
          <Link
            href="/product/app"
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
        <div className="md:hidden bg-black px-6 pb-4 text-white">
          <div className="flex flex-col gap-4 text-sm">
            <Link href="/marketing/learn" onClick={() => setMenuOpen(false)}>
              Learn
            </Link>
            <Link
              href="/marketing/what-we-find"
              onClick={() => setMenuOpen(false)}
            >
              What We Find
            </Link>
            <Link
              href="/marketing/how-it-works"
              onClick={() => setMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link href="/marketing/pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
            <Link
              href="/marketing/cam-reconciliation"
              onClick={() => setMenuOpen(false)}
            >
              CAM Reconciliation
            </Link>
            <Link
              href="/marketing/nnn-audit-rights"
              onClick={() => setMenuOpen(false)}
            >
              NNN Audit Rights
            </Link>
            <Link
              href="/marketing/cam-expense-caps"
              onClick={() => setMenuOpen(false)}
            >
              CAM Expense Caps
            </Link>
            <Link
              href="/marketing/cam-admin-page"
              onClick={() => setMenuOpen(false)}
            >
              CAM Admin
            </Link>
            <Link
              href="/product/app"
              className="mt-2 rounded bg-white px-4 py-2 text-black"
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
