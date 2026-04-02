"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true, // 🔥 CRITICAL for OAuth redirect handling
      },
    }
  );

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/product/app/dashboard`,
      },
    });

    if (error) {
      const msg = (error.message || "").toLowerCase();

      if (msg.includes("rate") || msg.includes("limit")) {
        setMessage("Please wait a moment before requesting another login link.");
      } else if (msg.includes("expired") || msg.includes("invalid")) {
        setMessage("Your login link expired. Please request a new one and click it right away.");
      } else {
        setMessage(error.message);
      }
    } else {
      setMessage("Check your email and click the secure login link to access your dashboard.");
    }

    setLoading(false);
  }

  async function handleGoogleLogin() {
    setLoading(true);

    console.log("Starting Google OAuth...");

    // 🔥 Clear any existing session (prevents instant redirect loop)
    await supabase.auth.signOut();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}`,
        queryParams: {
          prompt: "select_account", // 🔥 forces Google screen
        },
      },
    });

    if (error) {
      console.error("OAuth error:", error);
      setMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center px-4 pt-32">
      <div className="max-w-md w-full border rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-2">Login</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email and we&apos;ll send you a secure login link (no password required).
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.9-6.9C35.68 2.68 30.2 0 24 0 14.82 0 6.94 5.24 2.98 12.86l8.06 6.26C12.9 13.1 17.96 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.7-.15-3.33-.43-4.9H24v9.27h12.7c-.55 2.96-2.23 5.47-4.76 7.16l7.32 5.7C43.93 37.9 46.5 31.7 46.5 24.5z"/>
            <path fill="#FBBC05" d="M11.04 28.62a14.5 14.5 0 010-9.24l-8.06-6.26A23.94 23.94 0 000 24c0 3.9.93 7.59 2.98 10.88l8.06-6.26z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2.04 15.2-5.55l-7.32-5.7c-2.03 1.36-4.64 2.17-7.88 2.17-6.04 0-11.1-3.6-12.96-8.62l-8.06 6.26C6.94 42.76 14.82 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="flex-1 h-px bg-gray-200" />
          OR
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            {loading ? "Sending..." : "Email Me Login Link"}
          </button>
          <p className="text-xs text-gray-500 text-center">
            We&apos;ll email you a one-time secure link. Open it immediately (links expire quickly).
          </p>
        </form>

        {message && (
          <p className="text-sm text-gray-600 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}