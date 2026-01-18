// worker/routes/ingestLeasePdf.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { fetchPdfFromStorage } from "../utils/storage.ts";
import { extractTextFromPdf } from "../utils/pdf.ts";
import { abstractLease } from "../utils/abstractLease.ts";

const router = new Router({
  prefix: "/ingest/lease",
});

const WORKER_KEY = Deno.env.get("LEASE_WORKER_KEY");

router.post("/pdf", async (ctx) => {
  try {
    const key = ctx.request.headers.get("x-worker-key");
    if (key !== WORKER_KEY) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized" };
      return;
    }

    // ✅ CORRECT Oak JSON parsing
    const body = ctx.request.body({ type: "json" });
    const value = await body.value;
    const { objectPath } = value as { objectPath?: string };

    if (!objectPath) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing objectPath" };
      return;
    }

    // 1. Load PDF from Supabase Storage
    const pdfBytes = await fetchPdfFromStorage(objectPath);

    // 2. Extract text
    const rawText = await extractTextFromPdf(pdfBytes);

    // 3. Run lease abstraction
    const result = abstractLease(rawText);

    ctx.response.status = 200;
    ctx.response.body = result;
  } catch (err) {
    console.error("❌ Lease PDF ingest failed:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Lease ingest failed" };
  }
});

export default router;
