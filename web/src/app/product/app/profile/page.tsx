"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

export default function ProfilePage() {
  const supabase = createClient();

  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email || null);
      setLoading(false);
    };

    getUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Account</h1>
        <p className="text-gray-500 text-sm">
          Manage your account and session
        </p>
      </div>

      {/* Card */}
      <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
        <div>
          <p className="text-sm text-gray-400">Email</p>
          <p className="text-lg font-medium">{email}</p>
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}