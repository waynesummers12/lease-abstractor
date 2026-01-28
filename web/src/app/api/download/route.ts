// NOTE: Support legacy PDFs stored under `object_path` (leases bucket)
// and newer PDFs stored under `audit_pdf_path` (audit-pdfs bucket)

// src/app/api/download/route.ts

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;

  if (!workerUrl) {
    return NextResponse.json(
      { error: "Worker URL not configured" },
      { status: 500 }
    );
  }

  const auditId = req.nextUrl.searchParams.get("auditId");

  if (!auditId) {
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  const res = await fetch(`${workerUrl}/audits/${auditId}/download`, {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: text || "Failed to fetch download URL" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}



