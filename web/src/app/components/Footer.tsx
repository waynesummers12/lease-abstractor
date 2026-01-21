// src/app/components/Footer.tsx

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-900/30 bg-gradient-to-b from-[#0f2f23] to-[#144a36]">
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
              <span className="text-lg font-semibold text-emerald-50">
                SaveOnLease
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm text-emerald-100/80">
              Helping commercial tenants identify CAM and NNN overcharges
              through clear, secure lease audits.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-emerald-50">
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/what-we-find"
                  className="text-emerald-100/80 hover:text-emerald-50"
                >
                  What We Find
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-emerald-100/80 hover:text-emerald-50"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-emerald-100/80 hover:text-emerald-50"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-sm font-semibold text-emerald-50">
              Trust
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/security"
                  className="text-emerald-100/80 hover:text-emerald-50"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-emerald-100/80 hover:text-emerald-50"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-emerald-100/80 hover:text-emerald-50"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-emerald-800/40 pt-6 text-sm text-emerald-200/70">
          © {new Date().getFullYear()} SaveOnLease. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
