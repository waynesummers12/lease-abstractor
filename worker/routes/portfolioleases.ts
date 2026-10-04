// worker/routes/portfolioleases.ts

import { Router, type Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router();

router.get("/portfolio-leases", async (ctx: Context) => {
  try {
    const token = ctx.request.headers.get("authorization")?.match(/^Bearer (\S+)$/i)?.[1];
    if (!token) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Authentication required" };
      return;
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Authentication required" };
      return;
    }

    const { data, error } = await supabase
      .from("portfolio_leases")
      .select("*")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Failed to load leases" };
      return;
    }

    ctx.response.status = 200;
    ctx.response.headers.set("Cache-Control", "private, no-store");
    ctx.response.body = {
      leases: data ?? [],
    };
  } catch (err) {
    console.error("Portfolio route error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Server error" };
  }
});

export default router;
