// worker/utils/generateAuditPdf.ts

import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";

/* ------------------------------------------------------------------
   LOCAL TYPES ONLY — NO SHARED CONTRACTS
------------------------------------------------------------------- */

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

/* ------------------------------------------------------------------
   PDF GENERATOR
------------------------------------------------------------------- */

export async function generateAuditPdf(
  analysis: AuditAnalysis
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let page = pdf.addPage([612, 792]); // US Letter
  let y = 740;

  const drawLine = (
    text: string,
    size = 12,
    isBold = false,
    indent = 0
  ) => {
    page.drawText(text, {
      x: 40 + indent,
      y,
      size,
      font: isBold ? bold : font,
      color: rgb(0, 0, 0),
      maxWidth: 520 - indent,
      lineHeight: size + 4,
    });
    y -= size + 8;
  };

  const newPageIfNeeded = () => {
    if (y < 80) {
      page = pdf.addPage([612, 792]);
      y = 740;
    }
  };

  /* ================= TITLE ================= */

  drawLine("CAM / NNN Lease Audit Summary", 20, true);
  drawLine("Automated Lease Risk & Cost Exposure Review", 11);
  y -= 10;

  drawLine("This report is generated from your lease agreement using automated analysis.", 10);
  y -= 20;

  /* ================= LEASE DETAILS ================= */

  drawLine("Lease Details", 14, true);
  y -= 6;

  drawLine(`Tenant: ${analysis.tenant ?? "Not specified"}`);
  drawLine(`Landlord: ${analysis.landlord ?? "Not specified"}`);
  drawLine(`Premises: ${analysis.premises ?? "Not specified"}`);
  drawLine(`Lease Start Date: ${analysis.lease_start ?? "Not specified"}`);
  drawLine(`Lease End Date: ${analysis.lease_end ?? "Not specified"}`);

  y -= 18;

  /* ================= FINDINGS ================= */

  drawLine("Audit Findings", 14, true);
  y -= 6;

  const flags = analysis.health?.flags ?? [];

  if (flags.length === 0) {
    drawLine(
      "No material CAM or NNN risks were detected based on the extracted lease terms.",
      11
    );
  }

  for (const flag of flags) {
    newPageIfNeeded();

    drawLine(`• ${flag.label}`, 12, true);
    drawLine(`Severity: ${flag.severity.toUpperCase()}`, 10, false, 12);

    drawLine(
      flag.recommendation,
      10,
      false,
      12
    );

    if (flag.estimated_impact !== undefined) {
      drawLine(
        `Estimated Financial Impact: ${flag.estimated_impact}`,
        10,
        false,
        12
      );
    }

    y -= 10;
  }

  /* ================= FOOTER ================= */

  newPageIfNeeded();
  y -= 20;

  drawLine("Disclaimer", 12, true);
  drawLine(
    "This audit is provided for informational purposes only and does not constitute legal advice. "
    + "Review findings with a qualified real estate or legal professional before taking action.",
    9
  );

  return await pdf.save();
}
