"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default function Header() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-50 w-full bg-white">
        <div className="mx-auto mt-3 w-[95%] max-w-6xl rounded-2xl bg-[#0F3D2E] px-4 py-3 text-white shadow-lg">
          <div className="flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-3">
              {isDashboard && (
                <button
                  className="md:hidden"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                >
                  ☰
                </button>
              )}

              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Image
                  src="/logo.png"
                  alt="SaveOnLease"
                  width={28}
                  height={28}
                />
                <span>SaveOnLease</span>
              </Link>

              {!isDashboard && (
                <nav className="hidden md:flex items-center gap-5 text-sm text-[#CFE7DD]">
                  <Link href="/what-we-find" className="hover:text-white">
                    What We Find
                  </Link>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                  <Link href="/security" className="hover:text-white">
                    Security
                  </Link>
                </nav>
              )}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {!isDashboard && (
                <Link
                  href="/login"
                  className="hidden md:block rounded-lg bg-[#114B3A] px-3 py-1.5 text-sm hover:bg-[#16614A]"
                >
                  Log in
                </Link>
              )}

              <Link
                href={isDashboard ? "/dashboard" : "/upload"}
                className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-[#0F3D2E] hover:bg-gray-100"
              >
                {isDashboard ? "Dashboard" : "Upload Lease"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dashboard drawer */}
      {isDashboard && open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setOpen(false)}
          />

          <aside
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white p-6 shadow-lg md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 font-semibold">SaveOnLease</div>
            <DashboardNav onNavigate={() => setOpen(false)} />
          </aside>
        </>
      )}
    </>
  );
}
