"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/providers/AuthProvider";
import EducationDropdown from "./EducationDropdown";
import AvatarDropdown from "./AvatarDowndown";
import MobileMenu from "./MobileMenu";


export default function Header() {
  const pathname = usePathname();
  const isAppPage =
    pathname.startsWith("/app") || pathname.startsWith("/product/app");

  const { session } = useAuth();
  const user = session?.user ?? null;


  const [menuOpen, setMenuOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navTextColor = isAppPage ? "text-gray-900" : "text-white";
  const bgClass = isAppPage
    ? "bg-white border-b border-gray-200"
    : "bg-black shadow-md";
  const navLinkClass = isAppPage
    ? "text-gray-600 hover:text-gray-950 focus-visible:text-gray-950"
    : "text-white/70 hover:text-white focus-visible:text-white";

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] ${bgClass}`}>
      <div
        className={`mx-auto flex w-full max-w-full items-center justify-between px-4 sm:px-6 py-4 ${navTextColor}`}
      >
        {/* Logo */}
        <Link href="/marketing" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="SaveOnLease" width={24} height={44} />
          <span className="text-lg font-medium">SaveOnLease</span>
        </Link>

        <nav className="relative ml-4 hidden items-center gap-6 whitespace-nowrap text-sm xl:flex">
          <Link href="/marketing/what-we-find" className={`${navLinkClass} transition-colors`}>
            What We Find
          </Link>
          <Link href="/marketing/how-it-works" className={`${navLinkClass} transition-colors`}>
            How It Works
          </Link>
          <Link href="/marketing/pricing" className={`${navLinkClass} transition-colors`}>
            Pricing
          </Link>
          <EducationDropdown triggerClassName={navLinkClass} />
          <Link href="/marketing/referral" className={`${navLinkClass} transition-colors`}>
            Refer & Earn 20%
          </Link>
          <Link href="/marketing/contact" className={`${navLinkClass} transition-colors`}>
            Contact
          </Link>
          <div className={`h-5 w-px mx-3 ${isAppPage ? "bg-gray-200" : "bg-white/20"}`} />

          {/* =============================
              NOT LOGGED IN
          ============================= */}
          {!user ? (
            <>
              <Link href="/login" className={`inline-flex items-center gap-2 ${navLinkClass} transition-colors`}>
                Dashboard Leases
                <span className="rounded bg-amber-400 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-black">Free</span>
              </Link>
              <Link href="/login" className={`${navLinkClass} transition-colors`}>
                Login
              </Link>
              <Link
                href="/app/step-1-upload"
                className="rounded-full bg-white px-5 py-2 font-semibold text-black hover:bg-gray-200 shadow-md hover:shadow-lg transition-all ml-2"
              >
                Run Audit (Free Preview)
              </Link>
            </>
          ) : (
            <>
              {/* =============================
                  LOGGED IN
              ============================= */}

              <Link href="/product/app/dashboard" className={`inline-flex items-center gap-2 ${navLinkClass} transition-colors`}>
                Dashboard Leases
                <span className="rounded bg-amber-400 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-black">Free</span>
              </Link>
              <Link
                href="/app/step-1-upload"
                className={`ml-2 rounded-full px-5 py-2 font-semibold shadow-md transition-all hover:shadow-lg ${isAppPage ? "bg-[#102c25] text-white hover:bg-[#1b4a3c]" : "bg-white text-black hover:bg-gray-200"}`}
              >
                Start Free Preview
              </Link>

              {/* Avatar */}
              {session && (
                <AvatarDropdown session={session} triggerClassName={navLinkClass} />
              )}
            </>
          )}
        </nav>

        {/* Mobile */}
        <button
          id="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-current/30 xl:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true" className="text-2xl leading-none">☰</span>
        </button>
      </div>

      <MobileMenu
open={menuOpen}
user={user}
onLogout={async () => {
await supabase.auth.signOut();
}}
setOpen={setMenuOpen}
/>
    </header>
  );
}
