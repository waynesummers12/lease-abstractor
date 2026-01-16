// worker/main.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { fetchPdfFromStorage, saveLeaseAbstract } from "./utils/storage.ts";
import { extractTextFromPdf } from "./utils/pdf.ts";
import { abstractLease } from "./utils/abstractLease.ts";

const WORKER_KEY = Deno.env.get("LEASE_WORKER_KEY");

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (req.headers.get("x-worker-key") !== WORKER_KEY) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { objectPath } = await req.json();

    if (!objectPath) {
      return new Response("Missing objectPath", { status: 400 });
    }

    const pdfBytes = await fetchPdfFromStorage(objectPath);
    const text = await extractTextFromPdf(pdfBytes);
    const result = abstractLease(text);

    await saveLeaseAbstract(objectPath, result);

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
