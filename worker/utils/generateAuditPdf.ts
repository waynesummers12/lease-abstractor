// worker/utils/generateAuditPdf.ts
/**
 * SHARED UTILITY — SAVEONLEASE V1 (LOCKED)
 *
 * Intended use:
 * - utils/*.ts files
 * - Normalization helpers
 * - Pure calculations
 *
 * Rules:
 * - Pure functions only
 * - No side effects
 * - No network calls
 * - No environment variables
 *
 * Safe to use in:
 * - Worker (Deno + Oak)
 * - Next.js API routes
 *
 * NOT safe for client components unless explicitly reviewed.
 */


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
  teaser_summary?: {
    estimated_avoidable_range?: {
      low: number;
      high: number;
    };
  };
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

  /* ------------------------------------------------------------------
     COLORS
  ------------------------------------------------------------------- */

  const black = rgb(0, 0, 0);
  const gray = rgb(0.45, 0.45, 0.45);
  const lightGray = rgb(0.97, 0.97, 0.97);
  const green = rgb(0.18, 0.6, 0.4);
  const _amber = rgb(0.85, 0.65, 0.13);
  const _red = rgb(0.75, 0.2, 0.2);

  /* ------------------------------------------------------------------
     HELPERS
  ------------------------------------------------------------------- */

  const lineHeight = (size: number) => size + 5;

  const sanitizeText = (text: string) =>
    text
      .replace(/\u2011/g, "-")   // non-breaking hyphen
      .replace(/\u2013|\u2014/g, "-") // en/em dashes
      .replace(/\u2212/g, "-")   // minus sign
      .replace(/\u00A0/g, " "); // non-breaking space

  const wrapLines = (
    text: string,
    size: number,
    maxWidth: number,
    useBold = false
  ) => {
    const words = sanitizeText(text).split(/\s+/);
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
    useBold = false,
    startY?: number
  ) => {
    const lines = wrapLines(text, size, maxWidth, useBold);
    let cursorY = startY ?? y;

    for (const line of lines) {
      page.drawText(line, {
        x,
        y: cursorY,
        size,
        font: useBold ? bold : font,
        color,
      });
      cursorY -= lineHeight(size);
    }

    if (startY === undefined) {
      y = cursorY;
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


  // let page and y are initialized with the Executive Summary page below
  let page: import("npm:pdf-lib@1.17.1").PDFPage;
  let y: number;

/* ------------------------------------------------------------------
   EXECUTIVE SUMMARY (PAGE 1)
------------------------------------------------------------------- */

page = pdf.addPage([612, 792]);
y = 760;

/* ------------------------------------------------------------------
   WHAT THIS REPORT TELLS YOU
------------------------------------------------------------------- */

drawWrapped("What This Report Tells You", 16, 40, 532, black, true);
y -= 10;

drawWrapped(
  "CAM and NNN charges are rarely static. Even when base rent is fixed, operating expenses can increase through reconciliation timing, expense definitions, administrative markups, and allocation methods written into the lease.",
  12,
  40,
  532,
  gray
);

y -= 10;

drawWrapped(
  "This report reviews your lease language to identify where those mechanisms exist and where a formal audit would be most likely to uncover avoidable or recoverable CAM / NNN costs.",
  12,
  40,
  532,
  gray
);

y -= 28;

/* ------------------------------------------------------------------
   EXECUTIVE SUMMARY
------------------------------------------------------------------- */

const range = analysis.teaser_summary?.estimated_avoidable_range;
const execLow = range?.low ?? null;
const execHigh = range?.high ?? null;
const execMid =
  execLow !== null && execHigh !== null
    ? Math.round((execLow + execHigh) / 2)
    : null;

drawWrapped("Executive Summary", 22, 40, 532, black, true);
y -= 16;

drawWrapped(
  `SaveOnLease analyzed the CAM / NNN provisions in the lease for ${analysis.tenant ?? "the tenant"}${analysis.landlord ? ` with ${analysis.landlord}` : ""}. Our review focused on expense caps, reconciliation rights, audit timing, and cost allocation language that directly influence what the tenant may be required to pay each year.`,
  12,
  40,
  532,
  gray
);

y -= 14;

drawWrapped(
  "Even where leases appear standard, these provisions often create compounding cost exposure over time if left unchecked.",
  12,
  40,
  532,
  gray
);

y -= 20;

if (execMid !== null) {
  const boxHeight = 150;

  page.drawRectangle({
    x: 36,
    y: y - boxHeight + 12,
    width: 540,
    height: boxHeight,
    borderColor: rgb(0.82, 0.82, 0.82),
    borderWidth: 1.5,
    color: lightGray,
  });

  y -= 18;

  drawWrapped(
    "Estimated Avoidable CAM / NNN Exposure (Next 12 Months)",
    13,
    52,
    500,
    gray,
    true
  );

  y -= 10;

  drawWrapped(
    `$${execMid.toLocaleString()}`,
    36,
    52,
    500,
    green,
    true
  );

  y -= 8;

  drawWrapped(
    `Estimated range based on lease mechanics: $${execLow!.toLocaleString()} to $${execHigh!.toLocaleString()}`,
    12,
    52,
    500,
    gray
  );

  y -= 14;

  drawWrapped(
    "This estimate reflects conservative, lease-based analysis. Actual recovery depends on documentation, timing, and enforcement of audit rights.",
    11,
    52,
    500,
    gray
  );

  y -= 24;
}

/* ------------------------------------------------------------------
   KEY OBSERVATIONS
------------------------------------------------------------------- */

drawWrapped("Key Observations", 14, 40, 532, black, true);
y -= 8;

const flagSummaries = (analysis.health?.flags ?? [])
  .slice(0, 3)
  .map(f => {
    const impact = f.estimated_impact ? ` (${f.estimated_impact})` : "";
    return `- ${f.label}${impact}`;
  });

drawWrapped(
  flagSummaries.length
    ? flagSummaries.join("\n")
    : "- No high-risk CAM or NNN clauses were identified in the extracted lease language. However, reconciliation timing, audit windows, and allocation provisions still warrant review.",
  12,
  40,
  532,
  gray
);

y -= 28;

/* ------------------------------------------------------------------
   RECOMMENDED NEXT STEP
------------------------------------------------------------------- */

drawWrapped("Recommended Next Step", 14, 40, 532, black, true);
y -= 6;

drawWrapped(
  execMid !== null
    ? `Given the estimated annual exposure of approximately $${execMid.toLocaleString()}, a formal CAM / NNN audit is recommended to validate charges and preserve recovery rights before audit windows expire.`
    : "A formal CAM / NNN audit is recommended to validate charges and preserve recovery rights.",
  12,
  40,
  532,
  gray
);

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
  const rowStartY = y;

  const labelHeight = measureHeight(label, 10, labelWidth, true);
  const valueHeight = measureHeight(value, 12, valueWidth);

  // Draw label and value at the SAME starting Y
  drawWrapped(label, 10, 52, labelWidth, gray, true, rowStartY);
  drawWrapped(value, 12, 200, valueWidth, black, false, rowStartY);

  // Advance Y by the taller of the two
  y = rowStartY - Math.max(labelHeight, valueHeight) - detailSpacing;
}


  y = detailsTop - detailHeight - 10;

  /* ------------------------------------------------------------------
     AUDIT FINDINGS
  ------------------------------------------------------------------- */

  drawSectionTitle("Audit Findings — Key Cost Drivers");

  const flags = analysis.health?.flags ?? [];

if (flags.length === 0) {
  ensureSpace(
    measureHeight(
      "No material CAM or NNN overcharges were identified based on the extracted lease terms. Standard reconciliation, audit timing, and documentation rights still apply.",
      11,
      532
    ) + 12
  );

  drawWrapped(
    "No material CAM or NNN overcharges were identified based on the extracted lease terms. Standard reconciliation, audit timing, and documentation rights still apply.",
    11,
    40,
    532,
    gray
  );

  y -= 8;
} else {
  let index = 1;

  for (const flag of flags) {
    ensureSpace(120);

    drawWrapped(
      `${index}. ${flag.label}`,
      13,
      40,
      532,
      black,
      true
    );
    y -= 6;

    drawWrapped(
      flag.recommendation,
      11,
      40,
      532,
      gray
    );

    if (flag.estimated_impact) {
      y -= 6;
      drawWrapped(
        `Estimated Tenant Impact: ${flag.estimated_impact}`,
        11,
        40,
        532,
        black,
        true
      );
    }

    y -= 18;
    index++;
  }
}

  /* ------------------------------------------------------------------
     SCOPE OF ANALYSIS
  ------------------------------------------------------------------- */

  const scopeHeadingH = measureHeight("About This Analysis", 11, 532, true);
  const scopeBodyH = measureHeight(
    "This report is based on lease language and contractual CAM / NNN provisions. "
      + "A complete financial recovery analysis may also require review of billed statements, reconciliations, and supporting documentation. "
      + "SaveOnLease can extend this analysis if additional materials are provided.",
    10,
    532
  );

  ensureSpace(scopeHeadingH + scopeBodyH + 20);

  drawWrapped("About This Analysis", 11, 40, 532, gray, true);
  drawWrapped(
    "This report is based on lease language and contractual CAM / NNN provisions. "
      + "A complete financial recovery analysis may also require review of billed statements, reconciliations, and supporting documentation. "
      + "SaveOnLease can extend this analysis if additional materials are provided.",
    10,
    40,
    532,
    gray
  );

  y -= 18;

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
