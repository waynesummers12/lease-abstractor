<file name=dashboard/page.tsx path=/Users/waynesmacbookpro13/lease-abstractor/web/src/app/product/app/dashboard/page.tsx>
'use client';

import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="p-6">
        {/* DASHBOARD SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <div className="text-xs text-gray-500">Total Leases</div>
            <div className="text-xl font-semibold mt-1">—</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-xs text-gray-500">Annual Rent Exposure</div>
            <div className="text-xl font-semibold mt-1">—</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-xs text-gray-500">CAM / NNN Exposure</div>
            <div className="text-xl font-semibold mt-1">—</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-xs text-gray-500">Upcoming Renewals</div>
            <div className="text-xl font-semibold mt-1">—</div>
          </div>
        </div>
        {/* PLATFORM NAVIGATION */}
    </div>
  );
}
</file>
