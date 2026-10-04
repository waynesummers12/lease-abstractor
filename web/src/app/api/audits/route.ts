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
import { auditCapability, setAuditCookie, workerProof } from "@/lib/server/auditAccess";

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
    if (typeof auditId !== "string" || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(auditId) ||
        objectPath !== `leases/${auditId}.pdf`) {
      return NextResponse.json({ error: "Invalid audit reference" }, { status: 400 });
    }
    const capability = await auditCapability(auditId);
    if (!capability) return NextResponse.json({ error: "Audit access is unavailable" }, { status: 503 });

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
      return setAuditCookie(NextResponse.json({ success: true, auditId, capability },
        { headers: { "Cache-Control": "private, no-store" } }), auditId);
    }

    if (portfolioLeaseId) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    const proof = await workerProof("POST", "/audits");
    if (!proof) return NextResponse.json({ error: "Audit access is unavailable" }, { status: 503 });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORKER_URL}/audits`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Audit-Proxy-Proof": proof,
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

    void text;
    return setAuditCookie(NextResponse.json({ success: true, auditId, capability },
      { headers: { "Cache-Control": "private, no-store" } }), auditId);
  } catch (err) {
    console.error("POST /api/audits failed", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
