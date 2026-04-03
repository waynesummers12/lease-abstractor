"use client";

import Link from "next/link";
import SidebarNav from "@/app/components/SidebarNav";
import Header from "@/app/components/Header";
import { usePathname } from "next/navigation";

export const dynamic = "force-dynamic";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white">
      {pathname.startsWith("/product") && <Header />}

      <div className="flex w-full">
        
        {/* Sidebar */}
        <aside className="w-60 shrink-0 border-r bg-gray-50 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <SidebarNav />
          </div>

          {/* Actions */}
          <div className="px-4 py-3 border-t space-y-2">
            <Link
              href="/product/app/add-lease"
              className="block text-center border border-gray-300 rounded-md px-3 py-1.5 text-[13px] hover:bg-gray-100"
            >
              Add Lease
            </Link>

            <Link
              href="/app/step-1-upload"
              className="block text-center bg-black text-white rounded-md px-3 py-1.5 text-[13px]"
            >
              Run Audit (Free Preview)
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-6 py-4 lg:px-8 lg:py-6 overflow-x-hidden">
          <div className="max-w-[1400px] w-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}