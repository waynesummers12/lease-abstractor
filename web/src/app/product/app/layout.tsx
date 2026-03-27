import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import SidebarNav from "@/app/components/SidebarNav";

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

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
    data: { session },
  } = await supabase.auth.getSession();

  // 🔒 Server-side route guard
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r p-6 space-y-6 bg-gray-50">
        <h2 className="text-lg font-semibold">SaveOnLease</h2>

        <SidebarNav />

        <div className="pt-6 border-t">
          <Link
            href="/app/step-1-upload"
            className="bg-black text-white px-4 py-2 rounded text-sm"
          >
            Upload Lease
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}