// worker/routes/latestAudit.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getLatestPaidAudit } from "../utils/getLatestPaidAudit.ts";
import { createAuditPdfSignedUrl } from "../utils/createAuditPdfSignedUrl.ts";

const router = new Router();

router.get("/audit/latest", async (ctx) => {
  const userId = ctx.state.userId;

  if (!userId) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  const audit = await getLatestPaidAudit(userId);

  if (!audit) {
    ctx.response.body = { audit: null };
    return;
  }

  const signedUrl = audit.pdf_path
    ? await createAuditPdfSignedUrl(audit.pdf_path)
    : null;

  ctx.response.body = {
    audit,
    signedUrl,
  };
});

export default router;
