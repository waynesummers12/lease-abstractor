// worker/main.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { fetchPdfFromStorage } from "./utils/storage.ts";
import { extractTextFromPdf } from "./utils/pdf.ts";
import { abstractLease } from "./utils/abstractLease.ts";

const WORKER_KEY = Deno.env.get("LEASE_WORKER_KEY");

serve(async (req: Request) => {
  try {
    const url = new URL(req.url);

    if (req.method !== "POST" || url.pathname !== "/ingest/lease/pdf") {
      return new Response("Not found", { status: 404 });
    }

    const key = req.headers.get("x-worker-key");
    if (!key || key !== WORKER_KEY) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { objectPath } = body;

    if (!objectPath) {
      return new Response("Missing objectPath", { status: 400 });
    }

    // 1️⃣ Download PDF
    const pdfBytes = await fetchPdfFromStorage(objectPath);

    // 2️⃣ Extract text
    const text = await extractTextFromPdf(pdfBytes);

    // 3️⃣ Abstract lease
    const result = await abstractLease(text);

    return Response.json({
      success: true,
      objectPath,
      result,
    });
  } catch (err) {
    console.error("❌ Worker error:", err);
    return new Response("Worker error", { status: 500 });
  }
});
