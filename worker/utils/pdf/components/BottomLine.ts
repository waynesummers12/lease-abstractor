// worker/utils/pdf/components/BottomLine.ts

import { PDFDocument, PDFPage, PDFFont, rgb } from "npm:pdf-lib@1.17.1";
import { PAGE, SPACING } from "../layout.ts";

/**
 * BottomLine
 * Executive takeaway for the lease audit.
 *
 * Purpose:
 * - Clear, defensible conclusion
 * - Visually distinct, calm, authoritative
 * - Designed to sit at bottom of page without overflow
 */
export function drawBottomLine(
  _pdfDoc: PDFDocument,
  page: PDFPage,
  cursorY: number,
  opts: {
    rangeLow: string;
    rangeHigh: string;
  },
  fonts: {
    font: PDFFont;
    boldFont: PDFFont;
  }
): { page: PDFPage; cursorY: number } {
  const { rangeLow, rangeHigh } = opts;
  const { font, boldFont } = fonts;

  const boxX = PAGE.margin;
  const boxWidth = page.getSize().width - PAGE.margin * 2;
  const padding = 22;
  const accentWidth = 4;

  /* -------------------------------------------------
     Fixed height model (predictable + stable)
  -------------------------------------------------- */

  const titleHeight = 20;
  const bodyHeight = 36;
  const rangeHeight = 42;

  const requiredHeight =
    titleHeight +
    bodyHeight +
    rangeHeight +
    padding * 2 +
    SPACING.md;

  let y = cursorY;

  /* -------------------------------------------------
     Background surface
  -------------------------------------------------- */

  page.drawRectangle({
    x: boxX,
    y: y - requiredHeight,
    width: boxWidth,
    height: requiredHeight,
    color: rgb(0.94, 0.94, 0.94),
  });

  /* -------------------------------------------------
     Accent bar (strong but restrained)
  -------------------------------------------------- */

  page.drawRectangle({
    x: boxX,
    y: y - requiredHeight,
    width: accentWidth,
    height: requiredHeight,
    color: rgb(0.15, 0.15, 0.15),
  });

  /* -------------------------------------------------
     Title
  -------------------------------------------------- */

  page.drawText("Bottom line", {
    x: boxX + padding,
    y,
    size: 14,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  y -= titleHeight;

  /* -------------------------------------------------
     Framing sentence
  -------------------------------------------------- */

  page.drawText(
    "For this lease, a reasonable, defensible estimate of avoidable CAM / NNN exposure over the next 12 months is:",
    {
      x: boxX + padding,
      y,
      size: 11,
      font,
      maxWidth: boxWidth - padding * 2,
      lineHeight: 14,
      color: rgb(0.2, 0.2, 0.2),
    }
  );

  y -= bodyHeight;

  /* -------------------------------------------------
     Dollar range (anchor)
  -------------------------------------------------- */

  page.drawText(`${rangeLow} – ${rangeHigh}`, {
    x: boxX + padding,
    y,
    size: 28,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  return {
    page,
    cursorY: y - rangeHeight - SPACING.lg,
  };
}