import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/icon-192.png"
                alt="SaveOnLease logo"
                className="h-7 w-7"
              />
              <span className="text-lg font-semibold">SaveOnLease</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-gray-600">
              Helping commercial tenants identify CAM and NNN overcharges
              through clear, secure lease audits.
            </p>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <div className="font-medium">Product</div>
              <Link href="/what-we-find" className="block text-gray-600 hover:text-black">
                What We Find
              </Link>
              <Link href="/how-it-works" className="block text-gray-600 hover:text-black">
                How It Works
              </Link>
              <Link href="/pricing" className="block text-gray-600 hover:text-black">
                Pricing
              </Link>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Trust</div>
              <Link href="/security" className="block text-gray-600 hover:text-black">
                Security
              </Link>
              <Link href="/privacy" className="block text-gray-600 hover:text-black">
                Privacy
              </Link>
              <Link href="/terms" className="block text-gray-600 hover:text-black">
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-8 border-t pt-4 text-xs text-gray-500">
          © {new Date().getFullYear()} SaveOnLease. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
