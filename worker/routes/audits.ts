// worker/routes/audits.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getPaidAudits } from "../utils/getPaidAudits.ts";
import { createAuditPdfSignedUrl } from "../utils/createAuditPdfSignedUrl.ts";

const router = new Router();

/* --------------------------------------------------
   GET ALL PAID AUDITS (LIST)
-------------------------------------------------- */
router.get("/audits", async (ctx) => {
  const userId = ctx.state.userId;

  if (!userId) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  const audits = await getPaidAudits();

  const enriched = await Promise.all(
    audits.map(async (audit: any) => ({
      ...audit,
      signedUrl: audit.pdf_path
        ? await createAuditPdfSignedUrl(audit.pdf_path)
        : null,
    }))
  );

  ctx.response.status = 200;
  ctx.response.body = { audits: enriched };
});

/* --------------------------------------------------
   GET LATEST PAID AUDIT (DASHBOARD)
-------------------------------------------------- */
router.get("/audit/latest", async (ctx) => {
  const userId = ctx.state.userId;

  if (!userId) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  const audits = await getPaidAudits(userId);

  // ✅ No audits yet — valid empty state
  if (!audits || audits.length === 0) {
    ctx.response.status = 200;
    ctx.response.body = { audit: null };
    return;
  }

  const latest = audits[0];

  ctx.response.status = 200;
  ctx.response.body = {
    audit: {
      ...latest,
      signedUrl: latest.pdf_path
        ? await createAuditPdfSignedUrl(latest.pdf_path)
        : null,
    },
  };
});

export default router;
