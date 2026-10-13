import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { PDFParse } from "npm:pdf-parse@2.4.5";
import { supabase } from "../lib/supabase.ts";
import { readLeasePagesForReport } from "../utils/readLeasePagesForReport.ts";
import { reconcileDocumentsV2 } from "../utils/reconcileDocumentsV2.ts";
import { isGeneratedAuditReport } from "../utils/documentType.ts";

const router = new Router();
const MAX_FILE = 10 * 1024 * 1024;
const MAX_TOTAL = 30 * 1024 * 1024;

router.post("/audit/:auditId/reconcile", async (ctx) => {
  const auditId = ctx.params.auditId ?? "";
  if (!/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(auditId)) { ctx.response.status = 400; return; }
  const secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const supplied = ctx.request.headers.get("X-Audit-Capability") ?? "";
  if (!secret) { ctx.response.status = 503; return; }
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signed = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(`audit:${auditId}`)));
  const expected = Array.from(signed, (byte) => byte.toString(16).padStart(2, "0")).join("");
  let difference = expected.length ^ supplied.length;
  for (let index = 0; index < expected.length; index++) difference |= expected.charCodeAt(index) ^ (supplied.charCodeAt(index) || 0);
  if (difference !== 0) { ctx.response.status = 403; return; }
  const { data: audit, error } = await supabase.from("lease_audits").select("status,analysis").eq("id", auditId).maybeSingle();
  if (error || !audit) { ctx.response.status = 404; return; }
  if (audit.status !== "analyzed" || !audit.analysis) {
    ctx.response.status = 409;
    ctx.response.body = { error: "Add documents before starting checkout. Paid reports cannot be changed." };
    return;
  }
  const body = ctx.request.body({ type: "form-data" });
  const form = await body.value.read({ maxSize: MAX_TOTAL }).catch(() => null);
  if (!form) {
    ctx.response.status = 413;
    ctx.response.body = { error: "The uploaded PDFs exceed the 30 MB total limit." };
    return;
  }
  const files = form.files ?? [];
  if (files.length < 1 || files.length > 5) {
    ctx.response.status = 400; ctx.response.body = { error: "Upload one annual statement and up to four supporting PDFs." }; return;
  }
  const load = async (file: typeof files[number]) => {
    const bytes = file.content ? new Uint8Array(file.content) : await Deno.readFile(file.filename!);
    if (bytes.length > MAX_FILE || bytes.length < 5 || new TextDecoder().decode(bytes.slice(0, 5)) !== "%PDF-") throw new Error("Each document must be a PDF under 10 MB.");
    const pages: Array<{ page: number; text: string }> = [];
    // PDF.js may transfer its input buffer to a worker. Keep the uploaded bytes
    // separate so they remain available when we save the original PDF below.
    const parser = new PDFParse({ data: Uint8Array.from(bytes) });
    try {
      const info = await parser.getInfo();
      if (info.total > 100) throw new Error("Each PDF must have 100 pages or fewer.");
      for (let page = 1; page <= info.total; page++) {
        const result = await parser.getText({ partial: [page] });
        pages.push({ page, text: result.text });
      }
    } finally { await parser.destroy(); }
    if (!pages.some((page) => page.text.trim().length > 30)) throw new Error("A PDF has no readable text. Upload a text-readable copy.");
    return { bytes, pages, name: (file.originalName ?? "document.pdf").replace(/[\x00-\x1f]/g, "").slice(0, 100) };
  };
  try {
    const statement = await load(files[0]);
    const statementText = statement.pages.map((page) => page.text).join(" ");
    if (isGeneratedAuditReport(statementText) || !/(?:reconciliation|annual statement|tenant share|balance due)/i.test(statementText)) {
      throw new Error("This does not look like an annual CAM or NNN statement. Upload the landlord's statement PDF.");
    }
    const supports = await Promise.all(files.slice(1).map(load));
    const leasePages = await readLeasePagesForReport(auditId);
    if (!leasePages?.length) throw new Error("Lease text is unavailable; upload the lease again.");
    const reconciliation = reconcileDocumentsV2(statement.name, statement.pages, leasePages, supports);
    const uploads = [{ path: `reconciliation/${auditId}/statement.pdf`, bytes: statement.bytes }, ...supports.map((item, index) => ({ path: `reconciliation/${auditId}/support-${index + 1}.pdf`, bytes: item.bytes }))];
    for (const upload of uploads) {
      const { error: uploadError } = await supabase.storage.from("leases").upload(upload.path, upload.bytes, { contentType: "application/pdf", upsert: true });
      if (uploadError) throw uploadError;
    }
    const { data: saved, error: updateError } = await supabase.from("lease_audits")
      .update({ analysis: { ...audit.analysis, reconciliation } }).eq("id", auditId).eq("status", "analyzed").select("id").maybeSingle();
    if (updateError || !saved) throw updateError ?? new Error("Checkout started before documents were saved.");
    ctx.response.body = { reconciliation };
  } catch (error) {
    ctx.response.status = 422;
    ctx.response.body = { error: error instanceof Error ? error.message : "Could not analyze documents" };
  }
});

export default router;
