import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router({
  prefix: "/audit",
});

router.post("/save", async (ctx) => {
  try {
    const body = await ctx.request.body().value;

    const {
      analysis,
      stripeSessionId,
      amountPaid,
      objectPath,
      email,
    } = body ?? {};

    if (!analysis) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing analysis" };
      return;
    }

    const { error } = await supabase.from("lease_audits").insert({
      analysis,
      stripe_session_id: stripeSessionId ?? null,
      amount_paid: amountPaid ?? 14999,
      object_path: objectPath ?? null,
      email: email ?? null,
    });

    if (error) {
      throw error;
    }

    ctx.response.status = 200;
    ctx.response.body = { success: true };
  } catch (err) {
    console.error("❌ Save audit failed:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to save audit" };
  }
});

export default router;
