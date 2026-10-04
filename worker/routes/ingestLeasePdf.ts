// worker/routes/ingestLeasePdf.ts
/**
 * WORKER ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Runtime:
 * - Deno + Oak
 *
 * Responsibilities:
 * - Business logic
 * - Supabase access
 * - PDF processing
 * - Stripe operations
 *
 * Forbidden:
 * - Frontend imports
 * - Next.js APIs
 *
 * This file must NEVER be imported by frontend code.
 */



import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import pdfParse from "npm:pdf-parse@1.1.1";
import { abstractLease } from "../utils/abstractLease.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router({
  prefix: "/ingest/lease",
});

router.post("/pdf", async (ctx) => {
  try {
    const body = ctx.request.body({ type: "form-data" });
    const form = await body.value.read();

    const file = form.files?.[0];
    const auditId = form.fields?.auditId;

    if (!file || !auditId) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing file or auditId" };
      return;
    }

    const secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supplied = ctx.request.headers.get("X-Audit-Capability") ?? "";
    if (!secret || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(auditId)) {
      ctx.response.status = 403;
      ctx.response.body = { error: "Access denied" };
      return;
    }
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(`audit:${auditId}`)));
    const expected = Array.from(signature, (byte) => byte.toString(16).padStart(2, "0")).join("");
    let difference = expected.length ^ supplied.length;
    for (let index = 0; index < expected.length; index++) difference |= expected.charCodeAt(index) ^ (supplied.charCodeAt(index) || 0);
    if (difference !== 0) {
      ctx.response.status = 403;
      ctx.response.body = { error: "Access denied" };
      return;
    }

    const objectPath = `leases/${auditId}.pdf`;

    console.info("[ingest] uploading lease pdf", { objectPath });

    const fileBuffer = file.content
      ? new Uint8Array(file.content)
      : await Deno.readFile(file.filename!);

    // 1️⃣ Upload ORIGINAL lease PDF (input artifact)
    const { error: uploadError } = await supabase.storage
      .from("leases")
      .upload(objectPath, fileBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      throw new Error("Failed to upload lease PDF");
    }

    // 2️⃣ Extract text
    const parsed = await pdfParse(fileBuffer);
    const leaseText = parsed.text;

    if (!leaseText?.trim()) {
      throw new Error("No text extracted from lease PDF");
    }

    console.info("[ingest] extracted lease text", {
      length: leaseText.length,
    });

    // 3️⃣ Analyze lease (RAW — full fidelity)
    const rawAnalysis = abstractLease(leaseText);

    // ❗ IMPORTANT:
    // We persist RAW analysis so cam_nnn + numeric fields survive.
    // Normalization happens later (Stripe / PDF step).

    // 4️⃣ Persist audit + analysis (✅ CORRECT COLUMN)
    const { data: existingAudit } = await supabase.from("lease_audits")
      .select("id").eq("id", auditId).maybeSingle();
    if (!existingAudit) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Audit not found" };
      return;
    }
    const { error: dbError } = await supabase
      .from("lease_audits")
      .update({
        object_path: objectPath, // original uploaded lease
        analysis: rawAnalysis, // 🔥 FIX: persist full analysis
        status: "analyzed",
        created_at: new Date().toISOString(),
      }).eq("id", auditId);

    if (dbError) {
      console.error("❌ DB update failed:", dbError);
      throw new Error("Failed to save analysis");
    }

    console.log("✅ Lease ingest complete:", auditId);

    ctx.response.status = 200;
    ctx.response.body = { success: true, auditId };
  } catch (err) {
  const message =
    err instanceof Error ? err.message : String(err);

  console.error("❌ LEASE INGEST ERROR:", err);

  ctx.response.status = 500;
  ctx.response.body = {
    error: "Lease ingest failed",
    details: message,
  };
}


});

export default router;
