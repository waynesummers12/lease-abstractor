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

  /* --------------------------------------------------
     AUTH CHECK (WORKER ↔ SERVER)
  -------------------------------------------------- */
  const workerKey = ctx.request.headers.get("X-Lease-Worker-Key");
  const expectedKey = Deno.env.get("LEASE_WORKER_KEY");

  console.log("🔐 Received worker key:", workerKey);
  console.log("🔐 Expected worker key:", expectedKey);
  console.log("🔐 Key match:", workerKey === expectedKey);

  if (!workerKey || !expectedKey || workerKey !== expectedKey) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  console.log("🔓 Worker authorized");

  /* --------------------------------------------------
     CONTENT TYPE CHECK
  -------------------------------------------------- */
  const contentType = ctx.request.headers.get("content-type") || "";
  console.log("📦 content-type:", contentType);

  if (!contentType.includes("application/json")) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Expected application/json" };
    return;
  }

  /* --------------------------------------------------
     PARSE JSON BODY (Oak v12)
  -------------------------------------------------- */
  let payload: any;
  try {
    const body = ctx.request.body({ type: "json" });
    payload = await body.value;
  } catch (err) {
    console.error("❌ JSON parse failed", err);
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid JSON body" };
    return;
  }

  console.log("📨 raw body:", payload);

  const { auditId, objectPath } = payload ?? {};

  if (!auditId || !objectPath) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing auditId or objectPath" };
    return;
  }

  try {
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

    if (!leaseText || !leaseText.trim()) {
      throw new Error("No text extracted from PDF");
    }

    console.log("🧠 extracted lease text", {
      length: leaseText.length,
    });

    /* --------------------------------------------------
       ANALYZE LEASE
    -------------------------------------------------- */
    const rawAnalysis = abstractLease(leaseText);
    const normalized = normalizeAuditForSuccess(rawAnalysis);

    /* --------------------------------------------------
       UPSERT RESULT
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
      throw upsertError;
    }

    console.log("✅ lease audit saved:", auditId);

    /* --------------------------------------------------
       SUCCESS RESPONSE
    -------------------------------------------------- */
    ctx.response.status = 200;
    ctx.response.body = {
      auditId,
      analysis: normalized,
    };
  } catch (err: any) {
    console.error("❌ ingest error", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: err?.message ?? "Worker ingest failed",
    };
  }
});

export default router;
