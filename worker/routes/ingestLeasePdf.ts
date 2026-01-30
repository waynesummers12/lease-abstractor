import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import pdfParse from "npm:pdf-parse@1.1.1";
import { abstractLease } from "../utils/abstractLease.ts";
import { normalizeAuditForSuccess } from "../utils/normalizeAuditForSuccess.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router({
  prefix: "/ingest/lease",
});
router.post("/pdf", async (ctx) => {
  console.log("🔥 ingestLeasePdf HIT");

  console.log("🔐 headers:", Object.fromEntries(ctx.request.headers.entries()));

  let body: any;
  try {
    body = await ctx.request.body().value;
  } catch (e) {
    console.error("❌ Body parse failed", e);
  }

  console.log("📦 raw body:", body);

/**
 * Ingest ORIGINAL lease PDF and persist analysis
 * Accepts multipart/form-data from Next.js proxy
 */
router.post("/pdf", async (ctx) => {
  try {
    /* --------------------------------------------------
       PARSE MULTIPART FORM DATA (CORRECT)
    -------------------------------------------------- */
    const body = ctx.request.body({ type: "form-data" });
    const formData = await body.value.read();

    const objectPath = formData.fields?.objectPath;
    const auditId = formData.fields?.auditId;

    if (!objectPath || !auditId) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing objectPath or auditId" };
      return;
    }

    console.info("[ingest] downloading lease pdf", { objectPath, auditId });

    /* --------------------------------------------------
       DOWNLOAD PDF FROM SUPABASE
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
       NORMALIZE OUTPUT (CRITICAL)
    -------------------------------------------------- */
    const normalized = normalizeAuditForSuccess(rawAnalysis);

    /* --------------------------------------------------
       UPSERT ANALYSIS (ID = SOURCE OF TRUTH)
    -------------------------------------------------- */
    const { error: upsertError } = await supabase
      .from("lease_audits")
      .upsert(
        {
          id: auditId,
          audit_pdf_path: objectPath,
          analysis: normalized,
          status: "analyzed",
        },
        { onConflict: "id" }
      );

    if (upsertError) {
      console.error("❌ Failed to upsert analysis", upsertError);
      throw new Error("Failed to save analysis");
    }

    console.log("🧾 lease_audits analysis upserted for:", auditId);

    /* --------------------------------------------------
       FINAL RESPONSE (WHAT UI EXPECTS)
    -------------------------------------------------- */
    ctx.response.status = 200;
    ctx.response.body = {
      auditId,
      analysis: normalized,
    };
  } catch (err: any) {
    console.error("[ingest] error", err);
    ctx.response.status = 500;
    ctx.response.body = { error: err?.message ?? "Unexpected error" };
  }
});

export default router;
