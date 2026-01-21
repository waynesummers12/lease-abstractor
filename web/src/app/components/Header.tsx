"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isApp = pathname.startsWith("/app");

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-3 w-[95%] max-w-6xl rounded-2xl bg-black px-5 py-3 text-white shadow-lg">
        <div className="flex items-center justify-between">
          {/* Left */}
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/logo.png" alt="SaveOnLease" width={28} height={28} />
            <span>SaveOnLease</span>
          </Link>

          {/* Center nav */}
          {!isApp && (
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
              <Link href="/what-we-find" className="hover:text-white">
                What We Find
              </Link>
              <Link href="/how-it-works" className="hover:text-white">
                How It Works
              </Link>
              <Link href="/pricing" className="hover:text-white">
                Pricing
              </Link>
            </nav>
          )}

          {/* Right CTA */}
          <Link
            href="/upload"
            className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-black hover:bg-gray-200"
          >
            Upload Lease
          </Link>
        </div>
      </div>
    </div>
  );
}
