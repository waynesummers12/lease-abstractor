// worker/routes/portfolioleases.ts

import { Router, type Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router();

router.get("/portfolio-leases", async (ctx: Context) => {
  try {
    const { data, error } = await supabase
      .from("portfolio_leases")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      ctx.response.status = 500;
      ctx.response.body = { error: error.message };
      return;
    }

    ctx.response.status = 200;
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