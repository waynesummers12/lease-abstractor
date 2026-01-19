// worker/utils/generateAuditPdf.ts

import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";

export async function generateAuditPdf(
  analysis: Record<string, any>
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]); // US Letter
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

  // ---------- HEADER ----------
  line("CAM / NNN Lease Audit Summary", 18);
  y -= 12;

  // ---------- LEASE INFO ----------
  line(`Tenant: ${analysis.tenant ?? "—"}`);
  line(`Landlord: ${analysis.landlord ?? "—"}`);
  line(`Premises: ${analysis.premises ?? "—"}`);
  line(`Lease Start: ${analysis.lease_start ?? "—"}`);
  line(`Lease End: ${analysis.lease_end ?? "—"}`);

  y -= 16;
  line("Risk Findings", 14);
  y -= 6;

  // ---------- FLAGS ----------
  const flags = analysis.health?.flags ?? [];

  if (flags.length === 0) {
    line("No significant CAM / NNN risks detected.");
  }

  for (const flag of flags) {
    line(`• ${flag.label} (${flag.severity.toUpperCase()})`);
    line(`  ${flag.recommendation}`, 10);

    if (flag.estimated_impact) {
      line(`  Estimated impact: ${flag.estimated_impact}`, 10);
    }

    y -= 6;

    // New page if needed
    if (y < 80) {
      y = 740;
      pdf.addPage([612, 792]);
    }
  }

  return await pdf.save();
}
