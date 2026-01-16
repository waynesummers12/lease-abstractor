// worker/main.ts
import { fetchLeasePdf } from "./utils/storage.ts";
import { extractTextFromPdf } from "./utils/pdf.ts";
import { abstractLease } from "./utils/abstractLease.ts";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const key = req.headers.get("x-worker-key");
  if (key !== Deno.env.get("LEASE_WORKER_KEY")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { objectPath } = await req.json();

  if (!objectPath) {
    return new Response("Missing objectPath", { status: 400 });
  }

  const pdfBytes = await fetchLeasePdf(objectPath);
  const text = await extractTextFromPdf(pdfBytes);
  const lease = abstractLease(text);

  return Response.json({
    status: "parsed",
    objectPath,
    lease
  });
});

