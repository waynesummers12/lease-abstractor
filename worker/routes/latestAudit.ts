// worker/routes/latestAudit.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getLatestPaidAudit } from "../utils/getLatestPaidAudit.ts";
import { createAuditPdfSignedUrl } from "../utils/createAuditPdfSignedUrl.ts";

const router = new Router();

router.get("/audit/latest", async (ctx) => {
  try {
    const audit = await getLatestPaidAudit();

    // No audit found — not an error
    if (!audit) {
      ctx.response.status = 200;
      ctx.response.body = { audit: null };
      return;
    }

    // Generate signed PDF URL if PDF exists
    const signedUrl = audit.object_path
      ? await createAuditPdfSignedUrl(audit.object_path)
      : null;

    ctx.response.status = 200;
    ctx.response.body = {
      audit: {
        ...audit,
        signedUrl,
      },
    };
  } catch (err) {
    console.error("Failed to load latest audit:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

export default router;
