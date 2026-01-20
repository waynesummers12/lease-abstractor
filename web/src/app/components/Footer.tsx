import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/icon-512.png"
                alt="SaveOnLease"
                className="h-8 w-8"
              />
              <span className="font-semibold">SaveOnLease</span>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Helping commercial tenants identify CAM and NNN overcharges
              through clear, secure lease audits.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/what-we-find" className="hover:underline">
                  What We Find
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:underline">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:underline">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Trust</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/security" className="hover:underline">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} SaveOnLease. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
