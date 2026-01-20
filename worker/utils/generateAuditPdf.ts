// worker/utils/generateAuditPdf.ts

import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";
import { supabase } from "../lib/supabase.ts";
import { sendAuditEmail } from "./sendAuditEmail.ts";

/* ---------- TYPES ---------- */

type AuditFlag = {
  label: string;
  severity: string;
  recommendation: string;
  estimated_impact?: string | number;
};

export type AuditAnalysis = {
  tenant?: string;
  landlord?: string;
  premises?: string;
  lease_start?: string;
  lease_end?: string;
  health?: {
    flags?: AuditFlag[];
  };
};

/* ---------- PDF GENERATOR + FINALIZER ---------- */

export async function generateAuditPdf(
  auditId: string,
  analysis: AuditAnalysis,
  recipientEmail?: string
): Promise<string> {
  /* ---------- BUILD PDF ---------- */

  const pdf = await PDFDocument.create();
  let page = pdf.addPage([612, 792]); // US Letter
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  let y = 740;

  function line(text: string, size = 12) {
    page.drawText(text, {
      x: 40,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
    y -= size + 6;
  }

  function newPageIfNeeded() {
    if (y < 80) {
      page = pdf.addPage([612, 792]);
      y = 740;
    }
  }

  /* ---------- CONTENT ---------- */

  line("CAM / NNN Lease Audit Summary", 18);
  y -= 12;

  line(`Tenant: ${analysis.tenant ?? "—"}`);
  line(`Landlord: ${analysis.landlord ?? "—"}`);
  line(`Premises: ${analysis.premises ?? "—"}`);
  line(`Lease Start: ${analysis.lease_start ?? "—"}`);
  line(`Lease End: ${analysis.lease_end ?? "—"}`);

  y -= 16;
  line("Risk Findings", 14);
  y -= 6;

  const flags: AuditFlag[] = analysis.health?.flags ?? [];

  if (flags.length === 0) {
    line("No significant CAM / NNN risks detected.");
  }

  for (const flag of flags) {
    newPageIfNeeded();
    line(`• ${flag.label} (${flag.severity.toUpperCase()})`);
    line(flag.recommendation, 10);

    if (flag.estimated_impact) {
      line(`Estimated impact: ${flag.estimated_impact}`, 10);
    }

    y -= 6;
  }

  const pdfBytes = await pdf.save();

  /* ---------- UPLOAD ---------- */

  const objectPath = `leases/${auditId}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from("leases")
    .upload(objectPath, pdfBytes, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    throw uploadError;
  }

  /* ---------- DB UPDATE ---------- */

  const { error: updateError } = await supabase
    .from("lease_audits")
    .update({ object_path: objectPath })
    .eq("id", auditId);

  if (updateError) {
    throw updateError;
  }

  /* ---------- EMAIL ---------- */

  if (recipientEmail) {
    const { data: signed, error: signError } =
      await supabase.storage
        .from("leases")
        .createSignedUrl(objectPath, 60 * 60);

    if (signError || !signed?.signedUrl) {
      throw signError;
    }

    await sendAuditEmail({
      to: recipientEmail,
      leaseName: "CAM / NNN Lease Audit",
      signedUrl: signed.signedUrl,
    });
  }

  /* ---------- REQUIRED RETURN ---------- */
  return objectPath;
}
