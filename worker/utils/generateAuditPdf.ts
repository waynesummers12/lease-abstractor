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
  const lightGray = rgb(0.97, 0.97, 0.97);
  const green = rgb(0.18, 0.6, 0.4);
  const amber = rgb(0.85, 0.65, 0.13);
  const red = rgb(0.75, 0.2, 0.2);

  /* ------------------------------------------------------------------
     HELPERS
  ------------------------------------------------------------------- */

  const newPageIfNeeded = (minY = 120) => {
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
      lineHeight: size + 5,
    });
    y -= size + 8;
  };

  const drawSectionTitle = (text: string) => {
    newPageIfNeeded();
    y -= 8;
    drawText(text, 15, true);
    y -= 8;
  };

  const drawCard = (height: number) => {
    page.drawRectangle({
      x: 36,
      y: y - height + 14,
      width: 540,
      height,
      borderColor: rgb(0.82, 0.82, 0.82),
      borderWidth: 1.25,
      color: lightGray,
    });
    y -= 18;
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
    size: 21,
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
      11,
      false,
      52,
      gray
    );

    y -= 14;
  }

  /* ------------------------------------------------------------------
     LEASE DETAILS CARD
  ------------------------------------------------------------------- */

  drawSectionTitle("Lease Details");
  drawCard(120);
  y -= 2;

  const details = [
    ["Tenant", analysis.tenant ?? "Not specified"],
    ["Landlord", analysis.landlord ?? "Not specified"],
    ["Premises", analysis.premises ?? "Not specified"],
    ["Lease Start", analysis.lease_start ?? "Not specified"],
    ["Lease End", analysis.lease_end ?? "Not specified"],
  ];

  for (const [label, value] of details) {
    drawText(label, 10, true, 52, gray);
    drawText(value, 12, false, 200);
  }

  y -= 10;

  /* ------------------------------------------------------------------
     AUDIT FINDINGS
  ------------------------------------------------------------------- */

  drawSectionTitle("Audit Findings");

  if (flags.length === 0) {
    drawText(
      "No material CAM or NNN risks were detected based on the extracted lease terms.",
      11,
      false,
      40,
      gray
    );
  }

  for (const flag of flags) {
    newPageIfNeeded(170);

    drawCard(110);
    y -= 4;

    drawText(flag.label, 13, true, 52);

    drawText(
      `Severity: ${flag.severity.toUpperCase()}`,
      11,
      true,
      52,
      severityColor(flag.severity)
    );
    y -= 2;

    drawText(flag.recommendation, 11, false, 52, gray);

    if (flag.estimated_impact !== undefined) {
      y -= 2;
      drawText(
        `Estimated Financial Impact: ${flag.estimated_impact}`,
        11,
        true,
        52
      );
    }

    y -= 8;
  }

  /* ------------------------------------------------------------------
     FOOTER DISCLAIMER
  ------------------------------------------------------------------- */

  newPageIfNeeded(140);

  y = 110;

  page.drawLine({
    start: { x: 40, y },
    end: { x: 572, y },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });

  y -= 20;

  drawText("Disclaimer", 11, true, 40, gray);
  drawText(
    "This audit is provided for informational purposes only and does not constitute legal advice. "
      + "Review findings with a qualified real estate or legal professional before taking action.",
    10,
    false,
    40,
    gray
  );

  return await pdf.save();
}
