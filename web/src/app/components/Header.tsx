"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-4 z-50 w-full flex justify-center">
      <div className="mx-auto max-w-6xl rounded-full bg-black px-6 py-3 text-white shadow-xl shadow-black/20">
        <div className="flex items-center gap-6">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/logo.png" alt="SaveOnLease" width={28} height={28} />
            <span>SaveOnLease</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-sm text-gray-300">
            <Link href="/what-we-find" className="hover:text-white">
              What We Find
            </Link>
            <Link href="/how-it-works" className="hover:text-white">
              How It Works
            </Link>
            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>
            <Link href="/security" className="hover:text-white">
              Security
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
          </nav>

          {/* Right: CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/upload"
              className="hidden md:block rounded-full bg-gray-800 px-4 py-1.5 text-sm hover:bg-gray-700"
            >
              Upload Lease
            </Link>

            <Link
              href="/upload"
              className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black hover:bg-gray-200"
            >
              Analyze Lease
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col justify-center gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span
                className={`h-0.5 w-5 bg-white transition-transform duration-300 ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-white transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-white transition-transform duration-300 ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed left-1/2 top-[88px] w-[90%] -translate-x-1/2 rounded-2xl bg-black px-6 py-4 text-white shadow-xl transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        }`}
      >
        <nav className="flex flex-col gap-4 text-sm text-gray-300">
          <Link href="/what-we-find" onClick={() => setOpen(false)}>
            What We Find
          </Link>
          <Link href="/how-it-works" onClick={() => setOpen(false)}>
            How It Works
          </Link>
          <Link href="/pricing" onClick={() => setOpen(false)}>
            Pricing
          </Link>
          <Link href="/security" onClick={() => setOpen(false)}>
            Security
          </Link>
          <Link href="/privacy" onClick={() => setOpen(false)}>
            Privacy
          </Link>
        </nav>
      </div>
    </div>
  );
}
