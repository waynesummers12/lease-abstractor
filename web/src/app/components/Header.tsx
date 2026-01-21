"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-3 w-[95%] max-w-6xl rounded-2xl bg-black px-5 py-3 text-white shadow-lg">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/logo.png"
                alt="SaveOnLease"
                width={28}
                height={28}
              />
              <span className="text-white">SaveOnLease</span>
            </Link>

            {/* Primary nav */}
            <nav className="hidden md:flex items-center gap-5 text-sm text-gray-300">
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
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link
              href="/upload"
              className="hidden md:block rounded-lg bg-gray-800 px-3 py-1.5 text-sm hover:bg-gray-700"
            >
              Upload Lease
            </Link>

            <Link
              href="/upload"
              className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-black hover:bg-gray-200"
            >
              Analyze Lease
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

