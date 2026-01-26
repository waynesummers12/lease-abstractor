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
  let y = 760;

  /* ------------------------------------------------------------------
     COLORS
  ------------------------------------------------------------------- */

  const black = rgb(0, 0, 0);
  const gray = rgb(0.45, 0.45, 0.45);
  const lightGray = rgb(0.95, 0.95, 0.95);
  const green = rgb(0.18, 0.6, 0.4);
  const amber = rgb(0.85, 0.65, 0.13);
  const red = rgb(0.75, 0.2, 0.2);

  /* ------------------------------------------------------------------
     HELPERS
  ------------------------------------------------------------------- */

  const newPageIfNeeded = (minY = 100) => {
    if (y < minY) {
      page = pdf.addPage([612, 792]);
      y = 760;
    }
  };

  const drawText = (
    text: string,
    size = 11,
    isBold = false,
    x = 40,
    color = black
  ) => {
    page.drawText(text, {
      x,
      y,
      size,
      font: isBold ? bold : font,
      color,
      maxWidth: 532,
      lineHeight: size + 4,
    });
    y -= size + 6;
  };

  const drawSectionTitle = (text: string) => {
    newPageIfNeeded();
    y -= 6;
    drawText(text, 14, true);
    y -= 4;
  };

  const drawCard = (height: number) => {
    page.drawRectangle({
      x: 36,
      y: y - height + 12,
      width: 540,
      height,
      borderColor: rgb(0.85, 0.85, 0.85),
      borderWidth: 1,
      color: lightGray,
    });
    y -= 16;
  };

  const severityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case "HIGH":
        return red;
      case "MEDIUM":
        return amber;
      default:
        return green;
    }
  };

  /* ------------------------------------------------------------------
     HEADER BAND
  ------------------------------------------------------------------- */

  page.drawRectangle({
    x: 0,
    y: 720,
    width: 612,
    height: 72,
    color: rgb(0.05, 0.05, 0.05),
  });

  page.drawText("SAVEONLEASE", {
    x: 40,
    y: 760,
    size: 12,
    font: bold,
    color: rgb(1, 1, 1),
  });

  page.drawText("CAM / NNN Lease Audit Summary", {
    x: 40,
    y: 738,
    size: 20,
    font: bold,
    color: rgb(1, 1, 1),
  });

  page.drawText("Automated Lease Risk & Cost Exposure Review", {
    x: 40,
    y: 716,
    size: 11,
    font,
    color: rgb(0.85, 0.85, 0.85),
  });

  y = 690;

  /* ------------------------------------------------------------------
     HERO SAVINGS CARD
  ------------------------------------------------------------------- */

  const flags = analysis.health?.flags ?? [];
  const impacts = flags
    .map((f) => Number(f.estimated_impact))
    .filter((v) => !isNaN(v));

  const maxImpact =
    impacts.length > 0
      ? Math.max(...impacts).toLocaleString()
      : null;

  if (maxImpact) {
    drawCard(92);

    drawText("Estimated Annual Savings", 12, true, 52, gray);
    drawText(`$${maxImpact}`, 28, true, 52, green);
    drawText(
      "Based on CAM escalation limits, excluded expenses, and allocation review.",
      10,
      false,
      52,
      gray
    );

    y -= 12;
  }

  /* ------------------------------------------------------------------
     LEASE DETAILS CARD
  ------------------------------------------------------------------- */

  drawSectionTitle("Lease Details");
  drawCard(120);

  const details = [
    ["Tenant", analysis.tenant ?? "Not specified"],
    ["Landlord", analysis.landlord ?? "Not specified"],
    ["Premises", analysis.premises ?? "Not specified"],
    ["Lease Start", analysis.lease_start ?? "Not specified"],
    ["Lease End", analysis.lease_end ?? "Not specified"],
  ];

  for (const [label, value] of details) {
    drawText(label, 10, true, 52, gray);
    drawText(value, 11, false, 180);
  }

  y -= 8;

  /* ------------------------------------------------------------------
     AUDIT FINDINGS
  ------------------------------------------------------------------- */

  drawSectionTitle("Audit Findings");

  if (flags.length === 0) {
    drawText(
      "No material CAM or NNN risks were detected based on the extracted lease terms.",
      11
    );
  }

  for (const flag of flags) {
    newPageIfNeeded(160);

    drawCard(110);

    drawText(flag.label, 12, true, 52);

    drawText(
      `Severity: ${flag.severity.toUpperCase()}`,
      10,
      true,
      52,
      severityColor(flag.severity)
    );

    drawText(flag.recommendation, 10, false, 52, gray);

    if (flag.estimated_impact !== undefined) {
      drawText(
        `Estimated Financial Impact: ${flag.estimated_impact}`,
        10,
        true,
        52
      );
    }

    y -= 6;
  }

  /* ------------------------------------------------------------------
     FOOTER DISCLAIMER
  ------------------------------------------------------------------- */

  newPageIfNeeded(120);

  y = 100;

  page.drawLine({
    start: { x: 40, y },
    end: { x: 572, y },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });

  y -= 18;

  drawText("Disclaimer", 11, true, 40, gray);
  drawText(
    "This audit is provided for informational purposes only and does not constitute legal advice. "
      + "Review findings with a qualified real estate or legal professional before taking action.",
    9,
    false,
    40,
    gray
  );

  return await pdf.save();
}
