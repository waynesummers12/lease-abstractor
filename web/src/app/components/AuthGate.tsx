"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // If logged in and NOT already in app → redirect
    if (session && !pathname.startsWith("/product/app")) {
      router.replace("/product/app/dashboard");
    }
  }, [session, loading, pathname, router]);

  return <>{children}</>;
}