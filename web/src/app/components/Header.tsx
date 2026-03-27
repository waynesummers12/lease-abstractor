"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Session } from "@supabase/supabase-js";
import EducationDropdown from "./EducationDropdown";
import AvatarDropdown from "./AvatarDowndown";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const isAppPage = pathname.startsWith("/app");

  const supabase = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      }
    )
  )[0];

  const [session, setSession] = useState<Session | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isProUser = false; // Replace with real plan logic later

  const navTextColor = isAppPage ? "text-gray-900" : "text-white";
  const bgClass = isAppPage
    ? "bg-white border-b border-gray-200"
    : "bg-black shadow-md";

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] ${bgClass}`}>
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 ${navTextColor}`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="SaveOnLease" width={24} height={44} />
          <span className="text-lg font-medium">SaveOnLease</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm relative">
          <EducationDropdown />

          <Link href="/marketing/what-we-find" className="opacity-90 hover:opacity-100 font-medium transition">
            What We Find
          </Link>
          <Link href="/marketing/how-it-works" className="opacity-70 hover:opacity-100 transition">
            How It Works
          </Link>
          <Link href="/marketing/pricing" className="opacity-70 hover:opacity-100 transition">
            Pricing
          </Link>

          <div className="h-5 w-px bg-white/20 mx-2" />

          {!session ? (
            <>
              <Link href="/login" className="opacity-70 hover:opacity-100 transition">
                Login
              </Link>
              <Link
                href="/app/step-1-upload"
                className="rounded-full bg-white px-6 py-2.5 font-semibold text-black hover:bg-gray-200 shadow-md hover:shadow-lg transition-all"
              >
                Run Audit (Free Preview)
              </Link>
            </>
          ) : (
            <AvatarDropdown session={session} isProUser={isProUser} />
          )}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      <MobileMenu
        open={menuOpen}
        session={session}
        onLogout={async () => {
          await supabase.auth.signOut();
          setMenuOpen(false);
        }}
      />
    </header>
  );
}
