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

  const lineHeight = (size: number) => size + 5;

  const wrapLines = (
    text: string,
    size: number,
    maxWidth: number,
    useBold = false
  ) => {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let current = "";

    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      const width = (useBold ? bold : font).widthOfTextAtSize(test, size);
      if (width <= maxWidth) {
        current = test;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
    return lines;
  };

  const measureHeight = (
    text: string,
    size: number,
    maxWidth: number,
    useBold = false
  ) => wrapLines(text, size, maxWidth, useBold).length * lineHeight(size);

  const drawWrapped = (
    text: string,
    size: number,
    x: number,
    maxWidth: number,
    color = black,
    useBold = false
  ) => {
    const lines = wrapLines(text, size, maxWidth, useBold);
    for (const line of lines) {
      page.drawText(line, {
        x,
        y,
        size,
        font: useBold ? bold : font,
        color,
      });
      y -= lineHeight(size);
    }
  };

  const ensureSpace = (requiredHeight: number) => {
    if (y - requiredHeight < 60) {
      page = pdf.addPage([612, 792]);
      y = 760;
    }
  };

  const drawSectionTitle = (text: string) => {
    ensureSpace(lineHeight(15) + 18);
    y -= 8;
    drawWrapped(text, 15, 40, 532, black, true);
    y -= 8;
  };

  /* ------------------------------------------------------------------
     HEADER BAND
  ------------------------------------------------------------------- */

  page.drawRectangle({
    x: 0,
    y: 720,
    width: 612,
    height: 72,
    color: lightGray,
  });

  page.drawText("SAVEONLEASE", {
    x: 40,
    y: 760,
    size: 12,
    font: bold,
    color: gray,
  });

  page.drawText("CAM / NNN Lease Audit Summary", {
    x: 40,
    y: 738,
    size: 21,
    font: bold,
    color: black,
  });

  page.drawText("Automated Lease Risk & Cost Exposure Review", {
    x: 40,
    y: 716,
    size: 11,
    font,
    color: gray,
  });

  page.drawLine({
    start: { x: 40, y: 704 },
    end: { x: 572, y: 704 },
    thickness: 1,
    color: rgb(0.82, 0.82, 0.82),
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
    impacts.length > 0 ? Math.max(...impacts).toLocaleString() : null;

  if (maxImpact) {
    const paddingTop = 20;
    const paddingBottom = 16;
    const innerWidth = 508; // 540 - 2*16
    const titleH = measureHeight("Estimated Annual Savings", 12, innerWidth, true);
    const amountH = measureHeight(`$${maxImpact}`, 28, innerWidth, true);
    const bodyH = measureHeight(
      "Based on CAM escalation limits, excluded expenses, and allocation review.",
      11,
      innerWidth
    );
    const spacing = 6 + 6; // between lines
    const cardHeight = paddingTop + titleH + spacing + amountH + spacing + bodyH + paddingBottom;

    ensureSpace(cardHeight + 12);

    const cardTop = y;
    page.drawRectangle({
      x: 36,
      y: cardTop - cardHeight + 14,
      width: 540,
      height: cardHeight,
      borderColor: rgb(0.82, 0.82, 0.82),
      borderWidth: 1.25,
      color: lightGray,
    });

    y = cardTop - paddingTop;
    drawWrapped("Estimated Annual Savings", 12, 52, innerWidth, gray, true);
    y -= 6;
    drawWrapped(`$${maxImpact}`, 28, 52, innerWidth, green, true);
    y -= 6;
    drawWrapped(
      "Based on CAM escalation limits, excluded expenses, and allocation review.",
      11,
      52,
      innerWidth,
      gray
    );

    y = cardTop - cardHeight - 12;
  }

  /* ------------------------------------------------------------------
     LEASE DETAILS CARD
  ------------------------------------------------------------------- */

  drawSectionTitle("Lease Details");

  const details = [
    ["Tenant", analysis.tenant ?? "Not specified"],
    ["Landlord", analysis.landlord ?? "Not specified"],
    ["Premises", analysis.premises ?? "Not specified"],
    ["Lease Start", analysis.lease_start ?? "Not specified"],
    ["Lease End", analysis.lease_end ?? "Not specified"],
  ];

  const detailPaddingTop = 18;
  const detailPaddingBottom = 16;
  const labelWidth = 140;
  const valueWidth = 330;
  const detailSpacing = 6;

  let detailHeight = detailPaddingTop + detailPaddingBottom;
  for (const [label, value] of details) {
    const labelH = measureHeight(label, 10, labelWidth, true);
    const valueH = measureHeight(value, 12, valueWidth);
    detailHeight += labelH + valueH + detailSpacing;
  }

  ensureSpace(detailHeight + 10);

  const detailsTop = y;
  page.drawRectangle({
    x: 36,
    y: detailsTop - detailHeight + 14,
    width: 540,
    height: detailHeight,
    borderColor: rgb(0.82, 0.82, 0.82),
    borderWidth: 1.25,
    color: lightGray,
  });

  y = detailsTop - detailPaddingTop;
  for (const [label, value] of details) {
    drawWrapped(label, 10, 52, labelWidth, gray, true);
    drawWrapped(value, 12, 200, valueWidth);
    y -= detailSpacing;
  }

  y = detailsTop - detailHeight - 10;

  /* ------------------------------------------------------------------
     AUDIT FINDINGS
  ------------------------------------------------------------------- */

  drawSectionTitle("Audit Findings");

  if (flags.length === 0) {
    ensureSpace(
      measureHeight(
        "No material CAM or NNN risks were detected based on the extracted lease terms.",
        11,
        532
      ) + 12
    );
    drawWrapped(
      "No material CAM or NNN risks were detected based on the extracted lease terms.",
      11,
      40,
      532,
      gray
    );
    y -= 4;
  }

  const findingPaddingTop = 18;
  const findingPaddingBottom = 14;
  const findingWidth = 508;
  const findingGap = 12;

  for (const flag of flags) {
    const titleH = measureHeight(flag.label, 13, findingWidth, true);
    const severityH = measureHeight(
      `Severity: ${flag.severity.toUpperCase()}`,
      11,
      findingWidth,
      true
    );
    const recH = measureHeight(flag.recommendation, 11, findingWidth);
    const impactH =
      flag.estimated_impact !== undefined
        ? measureHeight(
            `Estimated Financial Impact: ${flag.estimated_impact}`,
            11,
            findingWidth,
            true
          ) + 2
        : 0;
    const bodySpacing = 4 + 4; // between severity/recommendation
    const cardHeight =
      findingPaddingTop +
      titleH +
      6 +
      severityH +
      bodySpacing +
      recH +
      (impactH ? 6 + impactH : 0) +
      findingPaddingBottom;

    ensureSpace(cardHeight + findingGap);

    const cardTop = y;
    page.drawRectangle({
      x: 36,
      y: cardTop - cardHeight + 14,
      width: 540,
      height: cardHeight,
      borderColor: rgb(0.82, 0.82, 0.82),
      borderWidth: 1.25,
      color: lightGray,
    });

    y = cardTop - findingPaddingTop;
    drawWrapped(flag.label, 13, 52, findingWidth, black, true);
    y -= 6;
    drawWrapped(
      `Severity: ${flag.severity.toUpperCase()}`,
      11,
      52,
      findingWidth,
      severityColor(flag.severity),
      true
    );
    y -= 4;
    drawWrapped(flag.recommendation, 11, 52, findingWidth, gray);
    if (flag.estimated_impact !== undefined) {
      y -= 6;
      drawWrapped(
        `Estimated Financial Impact: ${flag.estimated_impact}`,
        11,
        52,
        findingWidth,
        black,
        true
      );
    }

    y = cardTop - cardHeight - findingGap;
  }

  /* ------------------------------------------------------------------
     FOOTER DISCLAIMER
  ------------------------------------------------------------------- */

  const disclaimerLineH = 1;
  const disclaimerHeadingH = measureHeight("Disclaimer", 11, 532, true);
  const disclaimerBodyH = measureHeight(
    "This audit is provided for informational purposes only and does not constitute legal advice. "
      + "Review findings with a qualified real estate or legal professional before taking action.",
    10,
    532
  );
  const disclaimerSpacing = 20 + 10; // spacing after line + after heading
  const disclaimerTotal =
    disclaimerLineH + disclaimerSpacing + disclaimerHeadingH + disclaimerBodyH + 10;

  ensureSpace(disclaimerTotal + 20);

  y -= 6;
  page.drawLine({
    start: { x: 40, y },
    end: { x: 572, y },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });

  y -= 20;
  drawWrapped("Disclaimer", 11, 40, 532, gray, true);
  drawWrapped(
    "This audit is provided for informational purposes only and does not constitute legal advice. "
      + "Review findings with a qualified real estate or legal professional before taking action.",
    10,
    40,
    532,
    gray
  );

  return await pdf.save();
}
