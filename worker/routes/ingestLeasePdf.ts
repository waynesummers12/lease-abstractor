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
    // Parse body safely (Oak-compatible)
    // deno-lint-ignore no-explicit-any
    const body =
      (await (ctx.request as any).body?.json?.()) ??
      (await ctx.request.body().value);

    const { objectPath, auditId } = body ?? {};

    if (!objectPath || !auditId) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing objectPath or auditId" };
      return;
    }

    console.info("[ingest] downloading lease pdf", { objectPath });

    /* --------------------------------------------------
       DOWNLOAD PDF
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
       NORMALIZE EARLY (critical for UI + checkout)
    -------------------------------------------------- */
    const normalized = normalizeAuditForSuccess(rawAnalysis);

/* --------------------------------------------------
   🔑 UPSERT ANALYSIS (CREATE OR UPDATE)
-------------------------------------------------- */
const { error: upsertError } = await supabase
  .from("lease_audits")
  .upsert(
    {
      id: auditId,                // 🔑 make auditId the PK
      audit_pdf_path: objectPath, // 🔑 canonical lookup key
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
   🔍 PROVE ROW EXISTS (THIS WILL NOW WORK)
-------------------------------------------------- */
const { data: debugRow } = await supabase
  .from("lease_audits")
  .select("id, audit_pdf_path, status")
  .eq("id", auditId)
  .single();

console.log("🧪 DEBUG lease_audits row:", debugRow);


    /* --------------------------------------------------
   🔍 FINAL DIAGNOSTIC: FIND ROW BY UUID ANYWHERE
-------------------------------------------------- */
const { data: anyRow, error: anyError } = await supabase
  .from("lease_audits")
  .select("*")
  .ilike("object_path", `%${auditId}%`)
  .limit(1);

if (anyError) {
  console.error("❌ Diagnostic query error:", anyError);
} else {
  console.log("🧪 FULL lease_audits row (diagnostic):", anyRow);
}

  } catch (err: any) {
    console.error("[ingest] error", err);
    ctx.response.status = 500;
    ctx.response.body = { error: err?.message ?? "Unexpected error" };
  }
});

export default router;
