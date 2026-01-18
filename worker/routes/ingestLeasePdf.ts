// worker/routes/ingestLeasePdf.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import pdfParse from "npm:pdf-parse";
import { abstractLease } from "../utils/abstractLease.ts";
import { supabase } from "../lib/supabase.ts"; // adjust path if needed

const router = new Router({
  prefix: "/ingest/lease",
});

router.post("/pdf", async (ctx) => {
  try {
    const body = await ctx.request.body().value;
    const { objectPath } = body ?? {};

    if (!objectPath) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing objectPath" };
      return;
    }

    console.log("📄 Downloading lease PDF:", objectPath);

    // 1️⃣ Download PDF from Supabase
    const { data, error } = await supabase.storage
      .from("leases")
      .download(objectPath);

    if (error || !data) {
      throw new Error("Failed to download PDF");
    }

    // 2️⃣ Convert to buffer
    const buffer = new Uint8Array(await data.arrayBuffer());

    // 3️⃣ Extract text from PDF
    const parsed = await pdfParse(buffer);
    const leaseText = parsed.text;

    console.log("🧠 Extracted text length:", leaseText.length);

    // 4️⃣ Run abstraction
    const analysis = abstractLease(leaseText);

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




