import { NextResponse } from "next/server";
import { portfolioAccess } from "@/lib/server/portfolioAccess";
import { workerProof } from "@/lib/server/auditAccess";

export const dynamic = "force-dynamic";

async function forward(req: Request, method: "GET" | "POST") {
  const access = await portfolioAccess(req);
  if (!access) return NextResponse.json({ error: "Sign in to manage referral payouts." }, { status: 401 });
  const path = method === "GET" ? "/referral-payouts/status" : "/referral-payouts/onboard";
  const proof = await workerProof(method, path);
  const worker = process.env.NEXT_PUBLIC_WORKER_URL;
  if (!worker || !proof) return NextResponse.json({ error: "Payout setup is unavailable." }, { status: 503 });
  try {
    const url = `${worker}${path}${method === "GET" ? `?userId=${encodeURIComponent(access.userId)}` : ""}`;
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", "X-Audit-Proxy-Proof": proof },
      ...(method === "POST" ? { body: JSON.stringify({ userId: access.userId }) } : {}),
      cache: "no-store",
    });
    const result = await response.json().catch(() => ({}));
    return NextResponse.json(result, { status: response.status, headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not reach payout setup. Please try again." }, { status: 503 });
  }
}

export async function GET(req: Request) { return forward(req, "GET"); }
export async function POST(req: Request) { return forward(req, "POST"); }
