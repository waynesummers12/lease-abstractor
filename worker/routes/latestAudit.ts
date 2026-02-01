// worker/routes/latestAudit.ts
/**
 * WORKER ROUTE (DENO + OAK)
 * - Owns business logic
 * - Owns Supabase access
 * - Owns Stripe logic
 * - NEVER imported by frontend
 */


import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getLatestPaidAudit } from "../utils/getLatestPaidAudit.ts";

const router = new Router();

/**
 * GET /api/audits/latest
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
  const audit = await getLatestPaidAudit();

  ctx.response.status = 200;
  ctx.response.body = { audit };
});

export default router;

