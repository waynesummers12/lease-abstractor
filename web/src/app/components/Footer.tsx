// src/app/components/Footer.tsx

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-700/30 bg-gradient-to-b from-[#1f5f48] to-[#2b7a5e]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="SaveOnLease"
                width={36}
                height={36}
              />
              <span className="text-lg font-semibold text-[#4aa3ff]">
                SaveOnLease
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm text-emerald-50/80">
              Helping commercial tenants identify CAM and NNN overcharges
              through clear, secure lease audits.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-[#4aa3ff]">
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/what-we-find"
                  className="text-[#4aa3ff]/80 hover:text-[#4aa3ff]"
                >
                  What We Find
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-[#4aa3ff]/80 hover:text-[#4aa3ff]"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-[#4aa3ff]/80 hover:text-[#4aa3ff]"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-sm font-semibold text-[#4aa3ff]">
              Trust
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/security"
                  className="text-[#4aa3ff]/80 hover:text-[#4aa3ff]"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[#4aa3ff]/80 hover:text-[#4aa3ff]"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#4aa3ff]/80 hover:text-[#4aa3ff]"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-emerald-600/40 pt-6 text-sm text-emerald-50/70">
          © {new Date().getFullYear()} SaveOnLease. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
