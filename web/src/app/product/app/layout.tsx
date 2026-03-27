import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import SidebarNav from "@/app/components/SidebarNav";

export const dynamic = "force-dynamic";

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  // Prevent build-time crash when env vars are missing (e.g. during static prerender)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return <div>{children}</div>;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🔒 Server-side route guard
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r p-6 space-y-6 bg-gray-50 text-sm">
        <div>
          <h2 className="text-lg font-semibold">SaveOnLease</h2>
          <p className="text-xs text-gray-500">Lease Intelligence Platform</p>
        </div>

        <SidebarNav />

        <div className="pt-6 border-t space-y-2">
          <Link
            href="/app/add-lease"
            className="block text-center border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100"
          >
            Add Lease
          </Link>
          <Link
            href="/app/step-1-upload"
            className="block text-center bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800"
          >
            Run Audit (Free Preview)
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}