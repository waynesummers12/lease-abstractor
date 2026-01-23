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
 */
router.post("/pdf", async (ctx) => {
  try {
    // deno-lint-ignore no-explicit-any
const body = await (ctx.request as any).body?.json?.()
  ?? (await ctx.request.body().value);
    const { objectPath, auditId } = body ?? {};

    if (!objectPath || !auditId) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing objectPath or auditId" };
      return;
    }

    console.info("[ingest] downloading lease pdf", { objectPath });

    // Download PDF
    const { data, error } = await supabase.storage
      .from("leases")
      .download(objectPath);

    if (error || !data) {
      throw new Error("Failed to download lease PDF");
    }

    const buffer = new Uint8Array(await data.arrayBuffer());

    // Extract text
    const parsed = await pdfParse(buffer);
    const leaseText = parsed.text;

    if (!leaseText?.trim()) {
      throw new Error("No text extracted from lease PDF");
    }

    console.info("[ingest] extracted lease text", {
      length: leaseText.length,
    });

    // Run abstraction
    const analysis = abstractLease(leaseText);

    // ✅ PERSIST ANALYSIS
const { error: updateError } = await supabase
  .from("lease_audits")
  .update({
    analysis,
  })
  .eq("id", auditId);

if (updateError) {
  console.error("❌ Failed to persist analysis", updateError);
  throw new Error("Failed to save analysis");
}


    console.log("🧾 lease_audits analysis saved:", auditId);

    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
    };
  } catch (err) {
    console.error("❌ Lease ingest error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Lease ingest failed" };
  }
});

export default router;
