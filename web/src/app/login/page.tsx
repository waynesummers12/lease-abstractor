"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      const msg = (error.message || "").toLowerCase();
      if (msg.includes("rate") || msg.includes("limit")) {
        setMessage("Please wait a moment before requesting another login link.");
      } else {
        setMessage(error.message);
      }
    } else {
      setMessage("Check your email and click the secure login link to access your dashboard.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-start justify-center px-4 pt-32">
      <div className="max-w-md w-full border rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-2">Login</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email and we&apos;ll send you a secure login link (no password required).
        </p>

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
            We&apos;ll email you a one-time secure link to log in instantly.
          </p>
        </form>

        {message && (
          <p className="text-sm text-gray-600 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}