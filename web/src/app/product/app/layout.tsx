import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SidebarNav from "@/app/components/SidebarNav";

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

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