import { NextResponse } from "next/server";
import { canReadAudit, workerProof } from "@/lib/server/auditAccess";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { auditId, sessionId } = await req.json().catch(() => ({}));
  if (typeof auditId !== "string" || typeof sessionId !== "string" ||
      !(await canReadAudit(req, auditId))) {
    return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  }
  const path = "/checkout/recover";
  const proof = await workerProof("POST", path);
  if (!proof || !process.env.NEXT_PUBLIC_WORKER_URL) {
    return NextResponse.json({ error: "Recovery unavailable" }, { status: 503 });
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Audit-Proxy-Proof": proof },
      body: JSON.stringify({ auditId, sessionId }),
      cache: "no-store",
    });
    const body = await response.json().catch(() => ({}));
    return NextResponse.json(body, {
      status: response.status, headers: { "Cache-Control": "private, no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Recovery unavailable" }, { status: 502 });
  }
}
