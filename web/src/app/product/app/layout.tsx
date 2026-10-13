"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";

export default function ProductLayout({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) router.replace("/login");
  }, [loading, session, router]);

  if (loading || !session) {
    return <div className="min-h-[50vh] bg-[#f5f7f2] px-6 py-20 text-center text-sm text-slate-600">Checking your sign-in…</div>;
  }

  return <div>{children}</div>;
}
