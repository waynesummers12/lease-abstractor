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

  // 🔥 BLOCK CONTENT (not redirect)
  if (!loading && !session && pathname.startsWith("/product/app")) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-medium">Please log in</h1>
        <p className="text-gray-600 mt-2">
          You need to be logged in to access your dashboard.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}