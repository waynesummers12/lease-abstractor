// worker/utils/generateAuditPdf.ts

import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";

/* ---------- TYPES (LOCAL ONLY, NO SHARED CONTRACT) ---------- */

type AuditFlag = {
  label: string;
  severity: string;
  recommendation: string;
  estimated_impact?: string | number;
};

type AuditAnalysis = {
  tenant?: string;
  landlord?: string;
  premises?: string;
  lease_start?: string;
  lease_end?: string;
  health?: {
    flags?: AuditFlag[];
  };
};

/* ---------- PDF GENERATOR ---------- */

export async function generateAuditPdf(
  analysis: AuditAnalysis
): Promise<Uint8Array> {
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

  /* ---------- HEADER ---------- */

  line("CAM / NNN Lease Audit Summary", 18);
  y -= 12;

  /* ---------- LEASE INFO ---------- */

  line(`Tenant: ${analysis.tenant ?? "—"}`);
  line(`Landlord: ${analysis.landlord ?? "—"}`);
  line(`Premises: ${analysis.premises ?? "—"}`);
  line(`Lease Start: ${analysis.lease_start ?? "—"}`);
  line(`Lease End: ${analysis.lease_end ?? "—"}`);

  y -= 16;
  line("Risk Findings", 14);
  y -= 6;

  /* ---------- FLAGS ---------- */

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

  return await pdf.save();
}
