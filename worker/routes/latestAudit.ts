// worker/routes/latestAudit.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getLatestPaidAudit } from "../utils/getLatestPaidAudit.ts";
import { createAuditPdfSignedUrl } from "../utils/createAuditPdfSignedUrl.ts";

const router = new Router();

router.get("/audit/latest", async (ctx) => {
  try {
    const audit = await getLatestPaidAudit();

    if (!audit) {
      ctx.response.status = 200;
      ctx.response.body = { audit: null };
      return;
    }

    // 🔐 object_path is the ONLY source of truth
    let signedUrl: string | null = null;

    if (audit.object_path) {
      signedUrl = await createAuditPdfSignedUrl(audit.object_path);
    }

    ctx.response.status = 200;
    ctx.response.body = {
      audit: {
        ...audit,
        signedUrl,
      },
    };
  } catch (err) {
    console.error("Failed to load latest audit", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

export default router;

