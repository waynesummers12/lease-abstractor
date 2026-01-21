// src/app/components/Footer.tsx

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0f2a1d] text-[#d6eadf]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="SaveOnLease"
                width={36}
                height={36}
              />
              <span className="text-lg font-semibold">
                SaveOnLease
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm text-[#b7d8c6]">
              Helping commercial tenants identify CAM and NNN overcharges
              through clear, secure lease audits.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold">
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/what-we-find"
                  className="text-[#b7d8c6] hover:text-white transition"
                >
                  What We Find
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-[#b7d8c6] hover:text-white transition"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-[#b7d8c6] hover:text-white transition"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-sm font-semibold">
              Trust
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/security"
                  className="text-[#b7d8c6] hover:text-white transition"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[#b7d8c6] hover:text-white transition"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#b7d8c6] hover:text-white transition"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#1f4d3a] pt-6 text-sm text-[#9fcab5]">
          © {new Date().getFullYear()} SaveOnLease. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
