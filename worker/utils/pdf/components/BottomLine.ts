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
    let y = cursorY;

  // Top padding inside box
  y -= padding;


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

  const titleHeight = 20;
    y -= titleHeight;

  // Calculate body height before using it
  const framingText =
    "For this lease, a reasonable, defensible estimate of avoidable CAM / NNN exposure over the next 12 months is:";

  const bodyFontSize = 11;
  const bodyLineHeight = 14;
  const bodyMaxWidth = boxWidth - padding * 2;

  // Estimate wrapped line count
  const words = framingText.split(" ");
  let lines = 1;
  let currentWidth = 0;

  for (const word of words) {
    const wordWidth = font.widthOfTextAtSize(word + " ", bodyFontSize);
    if (currentWidth + wordWidth > bodyMaxWidth) {
      lines += 1;
      currentWidth = wordWidth;
    } else {
      currentWidth += wordWidth;
    }
  }

  const bodyHeight = lines * bodyLineHeight;

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
  // Move inside box padding
  y -= padding;
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
     Framing sentence (dynamic height, no overlap)
  -------------------------------------------------- */

  page.drawText(framingText, {
    x: boxX + padding,
    y,
    size: bodyFontSize,
    font,
    maxWidth: bodyMaxWidth,
    lineHeight: bodyLineHeight,
    color: rgb(0.2, 0.2, 0.2),
  });

  y -= bodyHeight + SPACING.sm;

  /* -------------------------------------------------
     Dollar range (anchor)
  -------------------------------------------------- */
  y -= rangeHeight;

  // Final bottom padding
  y -= padding;

  const totalHeight = cursorY - y;

  /* -------------------------------------------------
     Background surface
  -------------------------------------------------- */

  page.drawRectangle({
    x: boxX,
    y,
    width: boxWidth,
    height: totalHeight,
    color: rgb(0.94, 0.94, 0.94),
  });

  /* -------------------------------------------------
     Accent bar
  -------------------------------------------------- */

  page.drawRectangle({
    x: boxX,
    y,
    width: accentWidth,
    height: totalHeight,
    color: rgb(0.15, 0.15, 0.15),
  });

  page.drawText(`${rangeLow} - ${rangeHigh}`, {
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