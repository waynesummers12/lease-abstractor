// worker/routes/ingestLeasePdf.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { abstractLease } from "../utils/abstractLease.ts";

const router = new Router({
  prefix: "/ingest/lease",
});

router.post("/pdf", async (ctx) => {
  try {
    // ✅ Oak v12+ JSON parsing
    const body = await ctx.request.body().value;
    const { objectPath } = body ?? {};

    if (!objectPath) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing objectPath" };
      return;
    }

    console.log("📄 Ingesting lease PDF:", objectPath);

    // 🔑 Run lease abstraction
    const analysis = await abstractLease(objectPath);

    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      analysis,
    };
  } catch (err) {
    console.error("❌ Lease ingest error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Lease ingest failed" };
  }
});

export default router;



