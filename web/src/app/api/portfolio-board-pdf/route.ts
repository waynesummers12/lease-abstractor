import { NextResponse } from "next/server";
import { portfolioAccess } from "@/lib/server/portfolioAccess";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const access = await portfolioAccess(req);
  if (!access) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

  const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;
  if (!workerUrl) return NextResponse.json({ error: "PDF export is unavailable" }, { status: 503 });
  try {
    const result = await fetch(`${workerUrl}/portfolio-board-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY ?? "",
        "Authorization": req.headers.get("authorization") ?? "",
      },
      body: JSON.stringify({ source: "saved_portfolio" }),
      cache: "no-store",
      signal: AbortSignal.timeout(60_000),
    });
    if (!result.ok) {
      const body = await result.json().catch(() => ({}));
      if (result.status === 409 || result.status === 413) {
        return NextResponse.json({ error: body.error || "Unable to export PDF" }, { status: result.status });
      }
      return NextResponse.json({ error: "Unable to generate PDF. Please try again." }, { status: 502 });
    }
    if (!result.headers.get("content-type")?.includes("application/pdf")) {
      return NextResponse.json({ error: "Unable to generate PDF. Please try again." }, { status: 502 });
    }
    const pdf = await result.arrayBuffer();
    if (new TextDecoder().decode(pdf.slice(0, 5)) !== "%PDF-") {
      return NextResponse.json({ error: "Unable to generate PDF. Please try again." }, { status: 502 });
    }
    return new Response(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=portfolio_board_report.pdf",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (cause) {
    console.error("Portfolio PDF export failed", cause);
    return NextResponse.json({ error: "Unable to generate PDF. Please try again." }, { status: 502 });
  }
}
