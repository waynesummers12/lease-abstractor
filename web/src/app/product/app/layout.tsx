import Link from "next/link";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import SidebarNav from "@/app/components/SidebarNav";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  // Prevent build-time crash when env vars are missing
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
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

  // TEMP: disable auth guard during development
  const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  redirect("/login");
}

  return (
    <div className="min-h-screen bg-white">
      <div className="flex w-full">
        
        {/* Sidebar (LOCKED WIDTH — CRITICAL FIX) */}
        <aside className="w-60 shrink-0 border-r bg-gray-50 flex flex-col">
          
          {/* Nav (NO EXTRA PADDING — SidebarNav handles it) */}
          <div className="flex-1 overflow-y-auto">
            <SidebarNav />
          </div>

          {/* Actions */}
          <div className="px-4 py-3 border-t space-y-2">
            <Link
              href="/product/app/add-lease"
              className="block text-center border border-gray-300 rounded-md px-3 py-1.5 text-[13px] hover:bg-gray-100"
            >
              Add Lease
            </Link>

            <Link
              href="/app/step-1-upload"
              className="block text-center bg-black text-white rounded-md px-3 py-1.5 text-[13px]"
            >
              Run Audit (Free Preview)
            </Link>
          </div>
        </aside>

        {/* Main Content (FIXED OFFSET + FLEX BEHAVIOR) */}
        <main className="flex-1 min-w-0 px-6 py-4 lg:px-8 lg:py-6 overflow-x-hidden">
          <div className="max-w-[1400px] w-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}