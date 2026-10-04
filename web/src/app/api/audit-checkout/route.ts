import { NextResponse } from "next/server";
import { canReadAudit, workerProof } from "@/lib/server/auditAccess";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { auditId } = await req.json().catch(() => ({}));
  if (typeof auditId !== "string" || !(await canReadAudit(req, auditId))) {
    return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  }
  const path = "/checkout/create";
  const proof = await workerProof("POST", path);
  if (!proof || !process.env.NEXT_PUBLIC_WORKER_URL) {
    return NextResponse.json({ error: "Checkout unavailable" }, { status: 503 });
  }
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Audit-Proxy-Proof": proof },
      body: JSON.stringify({ auditId }),
      cache: "no-store",
    });
    const body = await result.json().catch(() => ({}));
    return NextResponse.json(result.ok ? { url: body.url } : { error: body.error || "Checkout unavailable" },
      { status: result.status, headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Checkout unavailable" }, { status: 502 });
  }
}
