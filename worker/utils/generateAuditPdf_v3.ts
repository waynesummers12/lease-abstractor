import { PDFDocument, PDFPage, PDFFont, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";

import { drawHero } from "./pdf/components/Hero.ts";
import { drawSummaryTable as _drawSummaryTable } from "./pdf/components/SummaryTable.ts";
import { drawCallout as _drawCallout } from "./pdf/components/Callout.ts";
import { drawExplanationBox } from "./pdf/components/ExplanationBox.ts";
import { drawBottomLine } from "./pdf/components/BottomLine.ts";
import { PAGE } from "./pdf/layout.ts";

/* -----------------------------
   Types
------------------------------ */

type ExposureRange = {
  low: number;
  high: number;
};

type Rollup = {
  camEscalation: {
    low: number;
    high: number;
  };
  capitalItems: {
    low: number;
    high: number;
  };
  managementFees: {
    low: number;
    high: number;
  };
};

type RollupRow = {
  label: string;
  conservative: string;
  aggressive: string;
};

type Cursor = {
  page: PDFPage;
  y: number;
};

type AuditAnalysis = {
  // Nullable metadata (PDF should never crash on missing fields)
  tenant: string | null;
  landlord: string | null;

  audit_id?: string | null;

  // Derived totals used by Hero + BottomLine
  exposureRange: ExposureRange;

  // Canonical rollup (single source of truth)
  rollup: Rollup;
};
/* -----------------------------
   Layout constants
------------------------------ */

const TOP_MARGIN = 72;
const _LEFT_MARGIN = 72;

/* -----------------------------
   Helpers
------------------------------ */

function createNewPage(pdfDoc: PDFDocument): Cursor {
  const page = pdfDoc.addPage();
  const { height } = page.getSize();
  return { page, y: height - TOP_MARGIN };
}

/* -----------------------------
   Main
------------------------------ */

export async function generateAuditPdfV3(
  analysis: AuditAnalysis
): Promise<Uint8Array> {

  const pdfDoc = await PDFDocument.create();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const rollup = analysis.rollup ?? {
  camEscalation: { low: 0, high: 0 },
  capitalItems: { low: 0, high: 0 },
  managementFees: { low: 0, high: 0 },
};

  const totalLow =
    rollup.camEscalation.low +
    rollup.capitalItems.low +
    rollup.managementFees.low;

  const totalHigh =
    rollup.camEscalation.high +
    rollup.capitalItems.high +
    rollup.managementFees.high;

/* =============================
   PAGE 1
============================== */

const cursor: Cursor = createNewPage(pdfDoc);

/* ---------- HERO ---------- */

cursor.y = drawHero(cursor.page, cursor.y, {
  font,
  boldFont,
  low: analysis.exposureRange.low,
  high: analysis.exposureRange.high,
});

cursor.y -= 16;

/* ---------- DERIVATION (STRUCTURED, INSIDE GRAY BOX) ---------- */

const explanationResult = drawExplanationBox(
  pdfDoc,
  cursor.page,
  cursor.y,
  {
    title: "How that number is derived (from your lease)",
    paragraphs: [
      "1. Uncapped CAM / NNN (primary risk)",
      "The lease explicitly states no cap or limitation on CAM / NNN increases. In today’s Denver retail market, uncapped CAM commonly inflates 10–25% year over year due to insurance repricing, tax reassessments, and capital items pushed through CAM.",

      "Avoidable exposure from uncapped escalation:",
      `• Low case (10%): ~$${rollup.camEscalation.low.toLocaleString()}`,
      `• High case (25%): ~$${rollup.camEscalation.high.toLocaleString()}`,

      "2. Capital expenditures passed through CAM",
      "The lease allows roof, HVAC, and structural components to be amortized through CAM “as determined by Landlord”. This is a major red flag. Typical annual tenant exposure for improperly allocated capital items at this lease size:",
      `• ~$${rollup.capitalItems.low.toLocaleString()} – $${rollup.capitalItems.high.toLocaleString()} per year.`,
      "Many of these items are:",
      "• non-recoverable under standard audit interpretations, or",
      "• amortized incorrectly.",

      "3. Management fees (uncapped)",
      "Management fees are included with no stated percentage cap. Industry norms typically limit management fees to 3–5% of CAM.",
      `• Estimated avoidable portion: ~$${rollup.managementFees.low.toLocaleString()} – $${rollup.managementFees.high.toLocaleString()}`,
    ],
  },
  { font, boldFont }
);

cursor.page = explanationResult.page;
cursor.y = explanationResult.cursorY;

// --- Defensibility micro-line ---
cursor.y -= 4;

cursor.page.drawText(
  "Estimates are based on lease language identified and commonly accepted audit interpretations and market norms.",
  {
    x: PAGE.margin + 4,
    y: cursor.y,
    size: 9,
    font,
    color: rgb(0.55, 0.55, 0.55),
    maxWidth: cursor.page.getSize().width - PAGE.margin * 2 - 8,
  }
);

cursor.y -= 14;

/* =============================
   PAGE 2 — ROLL-UP + CONTEXT
============================== */

cursor.page = pdfDoc.addPage();
cursor.y = cursor.page.getSize().height - TOP_MARGIN;

/* ---------------------------------
   Roll-up title
---------------------------------- */

cursor.page.drawText(
  "Estimated Avoidable Exposure — Roll-up (Next 12 Months)",
  {
    x: _LEFT_MARGIN,
    y: cursor.y,
    size: 16,
    font: boldFont,
  }
);

cursor.y -= 28;

/* ---------------------------------
   Roll-up table
---------------------------------- */

const rollupData: RollupRow[] = [
  {
    label: "CAM escalation",
    conservative: `$${rollup.camEscalation.low.toLocaleString()}`,
    aggressive: `$${rollup.camEscalation.high.toLocaleString()}`,
  },
  {
    label: "Capital items",
    conservative: `$${rollup.capitalItems.low.toLocaleString()}`,
    aggressive: `$${rollup.capitalItems.high.toLocaleString()}`,
  },
  {
    label: "Management fees",
    conservative: `$${rollup.managementFees.low.toLocaleString()}`,
    aggressive: `$${rollup.managementFees.high.toLocaleString()}`,
  },
  {
    label: "Total Estimated Avoidable Exposure",
    conservative: `~$${totalLow.toLocaleString()}`,
    aggressive: `~$${totalHigh.toLocaleString()}`,
  },
];

const tableResult = _drawSummaryTable(
  cursor.page,
  cursor.y,
  {
    rows: rollupData.map((r) => [
      r.label,
      r.conservative,
      r.aggressive,
    ]),
  },
  { font, boldFont }
);

cursor.page = tableResult.page;
cursor.y = tableResult.cursorY;

/* ---------------------------------
   Why this matters now
---------------------------------- */

cursor.y = _drawCallout(
  cursor.page,
  cursor.y,
  "Why this matters now",
  "warning",
  [
    "CAM and NNN costs are rising sharply due to insurance repricing, tax reassessments, and landlords pushing capital items through operating expenses.",
    "Most tenants do not realize overcharges until after audit windows close — often 12–24 months later — when recovery is no longer possible.",
    "Addressing these issues now can prevent compounding overcharges and preserve leverage before your next reconciliation or renewal.",
  ],
  font,
  boldFont
);

/* ---------------------------------
   Bottom line (terminal block)
---------------------------------- */

/* --- subtle divider above BottomLine --- */
cursor.page.drawLine({
  start: {
    x: _LEFT_MARGIN,
    y: cursor.y + 12,
  },
  end: {
    x: cursor.page.getSize().width - _LEFT_MARGIN,
    y: cursor.y + 12,
  },
  thickness: 0.75,
});

drawBottomLine(
  pdfDoc,
  cursor.page,
  cursor.y,
  {
    rangeLow: `$${totalLow.toLocaleString()}`,
    rangeHigh: `$${totalHigh.toLocaleString()}`,
  },
  { font, boldFont }
);

drawFooter(cursor.page, analysis.audit_id ?? "N/A", font);

function drawFooter(page: PDFPage, auditId: string, font: PDFFont) {
  const { width } = page.getSize();

  page.drawText(
    `Prepared by SaveOnLease • ${new Date().toLocaleDateString()} • Audit ID: ${auditId}`,
    {
      x: PAGE.margin,
      y: PAGE.bottom - 18,
      size: 8,
      font,
      color: rgb(0.6, 0.6, 0.6),
      maxWidth: width - PAGE.margin * 2,
    }
  );
}
  // BottomLine is terminal — do not advance cursor after this

  return await pdfDoc.save();
}