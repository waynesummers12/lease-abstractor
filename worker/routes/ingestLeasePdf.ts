// worker/routes/ingestLeasePdf.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import pdfParse from "npm:pdf-parse@1.1.1";
import { abstractLease } from "../utils/abstractLease.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router({
  prefix: "/ingest/lease",
});

/**
 * Ingest ORIGINAL lease PDF and persist analysis
 *
 * CRITICAL GUARANTEES:
 * - analysis is generated BEFORE DB insert
 * - lease_audits row ALWAYS has analysis
 * - audit PDFs are blocked
 */
router.post("/pdf", async (ctx) => {
  try {
    /* --------------------
     * 1. Parse request
     * -------------------- */
    const body = await ctx.request.body({ type: "json" }).value;
    const { objectPath } = body ?? {};

    if (!objectPath) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing objectPath" };
      return;
    }

    /* --------------------
     * 2. Block audit PDFs
     * -------------------- */
    if (
      objectPath.includes("audit") ||
      objectPath.endsWith(".audit.pdf")
    ) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Audit PDFs cannot be ingested" };
      return;
    }

    console.info("[ingest] downloading lease pdf", { objectPath });

    /* --------------------
     * 3. Download PDF
     * -------------------- */
    const { data, error } = await supabase.storage
      .from("leases")
      .download(objectPath);

    if (error || !data) {
      throw new Error("Failed to download lease PDF");
    }

    /* --------------------
     * 4. Extract text
     * -------------------- */
    const buffer = new Uint8Array(await data.arrayBuffer());
    const parsed = await pdfParse(buffer);
    const leaseText = parsed.text;

    if (!leaseText || leaseText.trim().length === 0) {
      throw new Error("No text extracted from lease PDF");
    }

    console.info("[ingest] extracted lease text", {
      length: leaseText.length,
    });

    /* --------------------
     * 5. Run abstraction
     * -------------------- */
    const analysis = abstractLease(leaseText);

    if (!analysis) {
      throw new Error("Lease abstraction failed");
    }

    /* --------------------
     * 6. INSERT audit row (WITH analysis)
     * -------------------- */
    const auditId = crypto.randomUUID();

    const { error: insertError } = await supabase
      .from("lease_audits")
      .insert({
        id: auditId,
        analysis,              // ✅ NEVER NULL
        status: "unpaid",
        object_path: null,
      });

    if (insertError) {
      console.error("❌ Failed to insert lease_audits row:", insertError);
      throw new Error("Failed to create audit record");
    }

    console.log("🧾 lease_audits row created:", auditId);

    /* --------------------
     * 7. Respond
     * -------------------- */
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      auditId,
      analysis,
    };
  } catch (err) {
    console.error("❌ Lease ingest error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Lease ingest failed" };
  }
});

export default router;
