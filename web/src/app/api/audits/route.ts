// web/src/app/api/audits/route.ts

/**
 * NEXT.JS API ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Purpose:
 * - Thin proxy ONLY
 * - Forward audit creation to Worker
 *
 * Rules:
 * - NO Supabase
 * - NO Stripe
 * - NO business logic
 * - JSON passthrough only
 */

import { NextResponse } from "next/server";
import { portfolioAccess } from "@/lib/server/portfolioAccess";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { auditId, objectPath, portfolioLeaseId } = body ?? {};

    if (!auditId || !objectPath) {
      return NextResponse.json(
        { error: "Missing auditId or objectPath" },
        { status: 400 }
      );
    }

    if (req.headers.has("authorization")) {
      const access = await portfolioAccess(req);
      if (!access) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
      if (portfolioLeaseId) {
        const { data: lease, error } = await access.db.from("portfolio_leases")
          .select("id").eq("id", portfolioLeaseId).eq("user_id", access.userId)
          .is("deleted_at", null).maybeSingle();
        if (error || !lease) return NextResponse.json({ error: "Lease not found" }, { status: 404 });
      }
      const { error } = await access.db.from("lease_audits").insert({
        id: auditId, audit_pdf_path: objectPath, status: "uploaded",
        user_id: access.userId, portfolio_lease_id: portfolioLeaseId || null,
      });
      if (error) return NextResponse.json({ error: "Failed to create audit" }, { status: 500 });
      return NextResponse.json({ success: true, auditId }, { headers: { "Cache-Control": "private, no-store" } });
    }

    if (portfolioLeaseId) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORKER_URL}/audits`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY!,
        },
        body: JSON.stringify({ auditId, objectPath }),
        cache: "no-store",
      }
    );

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        { error: text || "Worker failed to create audit" },
        { status: res.status }
      );
    }

    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("POST /api/audits failed", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
