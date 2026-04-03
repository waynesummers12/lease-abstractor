"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [learnOpen, setLearnOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const learnRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  // ✅ Get session safely
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setUser(newSession?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        setLearnOpen(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const isProUser = false; // TODO: replace with real plan logic

  return (
    <nav className="w-full bg-black text-white px-4 sm:px-6 py-4">
      <div className="flex w-full max-w-full items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-lg font-bold shrink-0">
          SaveOnLease
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 ml-4">
          {/* Learn Dropdown */}
          <div ref={learnRef} className="relative">
            <button
              onClick={() => setLearnOpen(!learnOpen)}
              className="text-sm hover:text-gray-300"
            >
              Learn ▾
            </button>

            {learnOpen && (
              <div className="absolute mt-2 w-56 bg-white text-black rounded-md shadow-lg py-2">
                <Link href="/marketing/what-we-find" className="block px-4 py-2 hover:bg-gray-100">
                  What We Find
                </Link>
                <Link href="/marketing/how-it-works" className="block px-4 py-2 hover:bg-gray-100">
                  How It Works
                </Link>
                <Link href="/pricing" className="block px-4 py-2 hover:bg-gray-100">
                  Pricing
                </Link>
                <Link href="/marketing/contact" className="block px-4 py-2 hover:bg-gray-100">
                  Contact
                </Link>
              </div>
            )}
          </div>

          {/* Referral */}
          <Link href="/marketing/referral" className="text-sm hover:text-gray-300">
            Refer Clients (Earn 20%)
          </Link>

          {/* Divider */}
          <div className="h-5 w-px bg-gray-700" />

          {/* Auth / App */}
          {!user ? (
            <>
              <Link href="/login" className="text-sm text-gray-300 hover:text-white">
                Login
              </Link>
              <Link
                href="/app/step-1-upload"
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
              >
                Run Audit (Free Preview)
              </Link>
            </>
          ) : (
            <div ref={avatarRef} className="flex items-center gap-4 relative">
              {!isProUser && (
                <Link
                  href="/upgrade"
                  className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-semibold"
                >
                  Upgrade
                </Link>
              )}

              <button
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold"
              >
                {user.email?.[0]?.toUpperCase() || "U"}
              </button>

              {avatarOpen && (
                <div className="absolute right-0 mt-10 w-48 bg-white text-black rounded-md shadow-lg py-2">
                  <Link href="/product/app/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileOpen}
        user={user}
        onLogout={handleLogout}
        setOpen={setMobileOpen}
      />
    </nav>
  );
}