// worker/routes/checklistLeads.ts

import { Router, Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { resend } from "../lib/resend.ts";

const router = new Router();

router.post("/checklist-leads", async (ctx: Context) => {
  try {
    const body = ctx.request.body({ type: "json" });
    const { email } = await body.value;

    if (!email || !email.includes("@")) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Valid email required" };
      return;
    }

    // 🔥 Send notification to you
    await resend.emails.send({
      from: "SaveOnLease <audit@saveonlease.com>",
      to: "waynesummers14@gmail.com", // change if needed
      subject: "New CAM Checklist Download",
      html: `
        <h2>New Checklist Lead</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>Source: CAM Audit Checklist</p>
      `,
    });

    ctx.response.status = 200;
    ctx.response.body = { success: true };
  } catch (error) {
    console.error("Checklist lead error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

export default router;