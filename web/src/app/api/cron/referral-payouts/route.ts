import { NextResponse } from "next/server";
import { workerProof } from "@/lib/server/auditAccess";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "Payout job is not configured" }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const path = "/referral-payouts/run";
  const proof = await workerProof("POST", path);
  const worker = process.env.NEXT_PUBLIC_WORKER_URL;
  if (!worker || !proof) return NextResponse.json({ error: "Payout job is not configured" }, { status: 503 });
  try {
    const response = await fetch(`${worker}${path}`, {
      method: "POST",
      headers: { "X-Audit-Proxy-Proof": proof },
      cache: "no-store",
    });
    const result = await response.json().catch(() => ({}));
    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Payout worker unavailable" }, { status: 503 });
  }
}
