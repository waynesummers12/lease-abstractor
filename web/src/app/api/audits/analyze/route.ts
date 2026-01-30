import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;
    const workerKey = process.env.NEXT_PUBLIC_WORKER_KEY;

    if (!workerUrl || !workerKey) {
      return NextResponse.json(
        { error: "Worker not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(`${workerUrl}/ingest/lease/pdf`, {
      method: "POST",
      headers: {
        "X-Lease-Worker-Key": workerKey,
      },
      body: formData,
    });

    const text = await res.text();

    // Worker always returns JSON (or error JSON)
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    console.error("Analyze proxy error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
