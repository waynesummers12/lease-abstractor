// worker/routes/audits.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getPaidAudits } from "../utils/getPaidAudits.ts";
import { createAuditPdfSignedUrl } from "../utils/createAuditPdfSignedUrl.ts";

const router = new Router();

/* --------------------------------------------------
   GET ALL PAID AUDITS
-------------------------------------------------- */
router.get("/audits", async (ctx) => {
  const audits = await getPaidAudits();

  const enriched = await Promise.all(
    audits.map(async (audit) => ({
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
   GET LATEST PAID AUDIT
-------------------------------------------------- */
router.get("/audit/latest", async (ctx) => {
  const audits = await getPaidAudits();

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

