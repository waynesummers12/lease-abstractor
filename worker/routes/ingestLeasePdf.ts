// worker/routes/ingestLeasePdf.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import pdfParse from "npm:pdf-parse@1.1.1";
import { abstractLease } from "../utils/abstractLease.ts";
import { normalizeAuditForSuccess } from "../utils/normalizeAuditForSuccess.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router({
  prefix: "/ingest/lease",
});

/**
 * Ingest ORIGINAL lease PDF and persist analysis
 */
router.post("/pdf", async (ctx) => {
  try {
    /* --------------------------------------------------
       ✅ CORRECT MULTIPART PARSING (Oak v12)
    -------------------------------------------------- */
    const body = ctx.request.body({ type: "form-data" });
    const form = await body.value.read();

    const auditId = form.fields.auditId;
    const objectPath = form.fields.objectPath;
    const file = form.files?.[0];

    if (!auditId || !objectPath || !file) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Missing objectPath or auditId",
      };
      return;
    }

    console.info("[ingest] downloading lease pdf", { objectPath });

    /* --------------------------------------------------
       DOWNLOAD PDF FROM STORAGE
    -------------------------------------------------- */
    const { data, error } = await supabase.storage
      .from("leases")
      .download(objectPath);

    if (error || !data) {
      throw new Error("Failed to download lease PDF");
    }

    const buffer = new Uint8Array(await data.arrayBuffer());

    /* --------------------------------------------------
       EXTRACT TEXT
    -------------------------------------------------- */
    const parsed = await pdfParse(buffer);
    const leaseText = parsed.text;

    if (!leaseText?.trim()) {
      throw new Error("No text extracted from lease PDF");
    }

    console.info("[ingest] extracted lease text", {
      length: leaseText.length,
    });

    /* --------------------------------------------------
       RUN LEASE ABSTRACTION
    -------------------------------------------------- */
    const rawAnalysis = abstractLease(leaseText);

    /* --------------------------------------------------
       NORMALIZE ANALYSIS (CRITICAL)
    -------------------------------------------------- */
    const normalized = normalizeAuditForSuccess(rawAnalysis);

    /* --------------------------------------------------
       PERSIST ANALYSIS
    -------------------------------------------------- */
    const { error: updateError } = await supabase
      .from("lease_audits")
      .update({
        analysis: normalized,
        status: "analyzed",
      })
      .eq("id", auditId);

    if (updateError) {
      console.error("❌ Failed to persist analysis", updateError);
      throw new Error("Failed to save analysis");
    }

    console.log("🧾 lease_audits normalized analysis saved:", auditId);

    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
    };
  } catch (err) {
    console.error("❌ Lease ingest error:", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Lease ingest failed",
    };
  }
});

export default router;
