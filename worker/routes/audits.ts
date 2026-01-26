// worker/routes/audits.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getPaidAudits } from "../utils/getPaidAudits.ts";
import { getLatestPaidAudit } from "../utils/getLatestPaidAudit.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router();

/* --------------------------------------------------
   GET ALL COMPLETE AUDITS
-------------------------------------------------- */
router.get("/audits", async (ctx) => {
  const audits = await getPaidAudits();

  const enriched = await Promise.all(
    audits.map(async (audit) => {
      let signedUrl: string | null = null;

      if (audit.audit_pdf_path) {
        const { data } = await supabase.storage
          .from("audit-pdfs")
          .createSignedUrl(audit.audit_pdf_path, 60 * 60);
        
        signedUrl = data?.signedUrl ?? null;
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
   GET LATEST COMPLETE AUDIT (with audit PDF)
-------------------------------------------------- */
router.get("/audit/latest", async (ctx) => {
  const audit = await getLatestPaidAudit();

  ctx.response.status = 200;
  ctx.response.body = { audit };
});

export default router;

