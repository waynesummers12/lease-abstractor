// worker/main.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { fetchPdfFromStorage, saveLeaseAbstract } from "./utils/storage.ts";
import { extractTextFromPdf } from "./utils/pdf.ts";
import { abstractLease } from "./utils/abstractLease.ts";

const WORKER_KEY = Deno.env.get("LEASE_WORKER_KEY");

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-lease-worker-key",
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: corsHeaders(),
    });
  }

  if (req.headers.get("x-lease-worker-key") !== WORKER_KEY) {
    return new Response("Unauthorized", {
      status: 401,
      headers: corsHeaders(),
    });
  }

  try {
    const { objectPath } = await req.json();
    if (!objectPath) {
      return new Response("Missing objectPath", {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const pdfBytes = await fetchPdfFromStorage(objectPath);
    const rawText = await extractTextFromPdf(pdfBytes);
    const result = abstractLease(rawText);

    await saveLeaseAbstract(objectPath, result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(),
      },
    });
  } catch (err) {
    console.error("❌ Worker error:", err);
    return new Response("Worker error", {
      status: 500,
      headers: corsHeaders(),
    });
  }
});


