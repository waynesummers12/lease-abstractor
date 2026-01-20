// worker/routes/ingestLeasePdf.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import pdfParse from "npm:pdf-parse@1.1.1";
import { abstractLease } from "../utils/abstractLease.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router({
  prefix: "/ingest/lease",
});

/**
 * Ingest ORIGINAL lease PDF and return structured analysis
 *
 * IMPORTANT:
 * - This route processes SOURCE lease PDFs only
 * - It does NOT generate audit PDFs
 * - It does NOT write to lease_audits
 */
router.post("/pdf", async (ctx) => {
  try {
    // --------------------
    // 1. Parse request body (JSON ONLY)
    // --------------------
    const body = await ctx.request.body({ type: "json" }).value;
    const { objectPath } = body ?? {};

    if (!objectPath) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing objectPath" };
      return;
    }

    // --------------------
    // 2. Guard: prevent ingesting audit PDFs
    // --------------------
    if (objectPath.startsWith("leases/") && objectPath.endsWith(".pdf")) {
      // OK — but block audit PDFs by convention
      if (objectPath.includes("/audit") || objectPath.includes("audit")) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Audit PDFs cannot be ingested" };
        return;
      }
    }

    console.log("📄 Downloading lease PDF:", objectPath);

    // --------------------
    // 3. Download PDF from Supabase Storage
    // --------------------
    const { data, error } = await supabase.storage
      .from("leases")
      .download(objectPath);

    if (error || !data) {
      throw new Error("Failed to download lease PDF");
    }

    // --------------------
    // 4. Convert to buffer
    // --------------------
    const buffer = new Uint8Array(await data.arrayBuffer());

    // --------------------
    // 5. Extract text
    // --------------------
    const parsed = await pdfParse(buffer);
    const leaseText = parsed.text;

    if (!leaseText || leaseText.trim().length === 0) {
      throw new Error("No text extracted from lease PDF");
    }

    console.log("🧠 Extracted text length:", leaseText.length);

    // --------------------
    // 6. Run abstraction
    // --------------------
    const analysis = abstractLease(leaseText);

    // --------------------
    // 7. Respond
    // --------------------
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      analysis,
    };
  } catch (err) {
    console.error("❌ Lease ingest error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Lease ingest failed" };
  }
});

export default router;
