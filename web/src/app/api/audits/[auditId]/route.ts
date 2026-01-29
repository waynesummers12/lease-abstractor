import { Context } from "oak";
import { supabase } from "../lib/supabase.ts";

export async function auditById(ctx: Context) {
  const auditId = ctx.params.auditId;

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing auditId" };
    return;
  }

  const { data, error } = await supabase
    .from("lease_audits")
    .select("analysis")
    .eq("id", auditId)
    .maybeSingle(); // ← important

  if (error) {
    console.error("❌ auditById query error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Query failed" };
    return;
  }

  if (!data || !data.analysis) {
    console.warn("⚠️ Audit not found:", auditId);
    ctx.response.status = 404;
    ctx.response.body = { error: "Audit not found" };
    return;
  }

  console.log("🔥 auditById hit:", auditId);

  ctx.response.status = 200;
  ctx.response.body = {
    analysis: data.analysis,
  };
}
