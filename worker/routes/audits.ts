// worker/routes/audits.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getPaidAudits, PaidAudit } from "../utils/getPaidAudits.ts";
import { createAuditPdfSignedUrl } from "../utils/createAuditPdfSignedUrl.ts";

const router = new Router();

router.get("/audits", async (ctx) => {
  const userId = ctx.state.userId as string | undefined;

  if (!userId) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  const audits = await getPaidAudits(userId);

  const enriched = await Promise.all(
    audits.map(async (audit: PaidAudit) => ({
      ...audit,
      signedUrl: audit.pdf_path
        ? await createAuditPdfSignedUrl(audit.pdf_path)
        : null,
    }))
  );

  ctx.response.body = { audits: enriched };
});

export default router;
