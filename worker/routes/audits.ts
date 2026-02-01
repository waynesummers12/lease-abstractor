// worker/routes/audits.ts
/**
 * WORKER ROUTE (DENO + OAK)
 * - Owns business logic
 * - Owns Supabase access
 * - Owns Stripe logic
 * - NEVER imported by frontend
 */

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getPaidAudits } from "../utils/getPaidAudits.ts";
import { getLatestPaidAudit } from "../utils/getLatestPaidAudit.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router();

/* --------------------------------------------------
   CREATE AUDIT (REQUIRED FOR UPLOAD FLOW)
-------------------------------------------------- */
router.post("/audits", async (ctx) => {
  try {
    const body = await ctx.request.body().value;
    const { auditId, objectPath } = body ?? {};

    if (!auditId || !objectPath) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Missing auditId or objectPath",
      };
      return;
    }

    const { error } = await supabase.from("lease_audits").insert({
      id: auditId,
      audit_pdf_path: objectPath, // ✅ FIXED
      status: "uploaded",
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase insert failed:", error);
      ctx.response.status = 500;
      ctx.response.body = {
        error: "Failed to create audit",
        details: error.message,
      };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { success: true, auditId };
  } catch (err) {
    console.error("Create audit exception:", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Worker failed to create audit",
    };
  }
});

/* --------------------------------------------------
   GET ALL COMPLETE AUDITS
-------------------------------------------------- */
router.get("/audits", async (ctx) => {
  const audits = await getPaidAudits();

  const enriched = await Promise.all(
    audits.map(async (audit) => {
      let signedUrl: string | null = null;

      if (audit.audit_pdf_path) {
        const objectPath = audit.audit_pdf_path.replace(/^audit-pdfs\//, "");
        const { data: signed } = await supabase.storage
          .from("audit-pdfs")
          .createSignedUrl(objectPath, 60 * 60);

        signedUrl = signed?.signedUrl ?? null;
      }

      return {
        ...audit,
        signedUrl,
      };
    })
  );

  ctx.response.status = 200;
  ctx.response.body = { audits: enriched };
});

/* --------------------------------------------------
   GET LATEST COMPLETE AUDIT
-------------------------------------------------- */
router.get("/audit/latest", async (ctx) => {
  const audit = await getLatestPaidAudit();

  if (!audit) {
    ctx.response.status = 404;
    ctx.response.body = { audit: null };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = { audit };
});

export default router;
