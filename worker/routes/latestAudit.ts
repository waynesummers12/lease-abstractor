// worker/routes/latestAudit.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getLatestPaidAudit } from "../services/getLatestPaidAudit.ts";

const router = new Router();

/**
 * GET /api/audits/latest
 *
 * Headers:
 *  - x-tenant-id: string
 *
 * Response:
 *  {
 *    audit: null | {
 *      id: string
 *      created_at: string
 *      object_path: string
 *      signed_url: string
 *    }
 *  }
 */
router.get("/api/audits/latest", async (ctx) => {
  const tenantId = ctx.request.headers.get("x-tenant-id");

  if (!tenantId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing x-tenant-id header" };
    return;
  }

  const audit = await getLatestPaidAudit(tenantId);

  ctx.response.status = 200;
  ctx.response.body = { audit };
});

export default router;
