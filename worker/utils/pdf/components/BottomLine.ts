// worker/utils/pdf/components/Callout.ts

import { PDFDocument, PDFPage, PDFFont, rgb } from "npm:pdf-lib@1.17.1";
import { PAGE, SPACING } from "../layout.ts";

export function drawCallout(
  page: PDFPage,
  cursorY: number,
  title: string,
  accent: "warning" | "info",
  lines: string[],
  font: PDFFont,
  boldFont: PDFFont
): number {
  const boxX = PAGE.margin;
  const boxWidth = page.getSize().width - PAGE.margin * 2;
  const padding = 18;
  const accentWidth = 4;

  const titleFontSize = 16;
  const bodyFontSize = 12;
  const bodyLineHeight = 16;

  const contentWidth = boxWidth - padding * 2;

  /* -----------------------------
     Calculate body height first
  ------------------------------ */

  let bodyHeight = 0;

  for (const line of lines) {
    const words = line.split(" ");
    let wrappedLines = 1;
    let currentWidth = 0;

    for (const word of words) {
      const wordWidth = font.widthOfTextAtSize(word + " ", bodyFontSize);
      if (currentWidth + wordWidth > contentWidth) {
        wrappedLines += 1;
        currentWidth = wordWidth;
      } else {
        currentWidth += wordWidth;
      }
    }

    bodyHeight += wrappedLines * bodyLineHeight + SPACING.sm;
  }

  const titleHeight = titleFontSize + SPACING.md;

  const totalHeight =
    padding * 2 +
    titleHeight +
    bodyHeight;

  const boxTop = cursorY;
  const boxBottom = boxTop - totalHeight;

  const accentColor =
    accent === "warning"
      ? rgb(0.85, 0.33, 0.31)
      : rgb(0.75, 0.75, 0.75);

  /* -----------------------------
     Draw background FIRST
  ------------------------------ */

  page.drawRectangle({
    x: boxX,
    y: boxBottom,
    width: boxWidth,
    height: totalHeight,
    color: rgb(0.95, 0.95, 0.95),
  });

  /* Accent bar */
  page.drawRectangle({
    x: boxX,
    y: boxBottom,
    width: accentWidth,
    height: totalHeight,
    color: accentColor,
  });

  /* -----------------------------
     Render content inside box
  ------------------------------ */

  let y = boxTop - padding;

  // Title
  page.drawText(title, {
    x: boxX + padding,
    y,
    size: titleFontSize,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  y -= titleHeight;

  // Body lines
  for (const line of lines) {
    page.drawText(line, {
      x: boxX + padding,
      y,
      size: bodyFontSize,
      font,
      maxWidth: contentWidth,
      lineHeight: bodyLineHeight,
      color: rgb(0.2, 0.2, 0.2),
    });

    const words = line.split(" ");
    let wrappedLines = 1;
    let currentWidth = 0;

    for (const word of words) {
      const wordWidth = font.widthOfTextAtSize(word + " ", bodyFontSize);
      if (currentWidth + wordWidth > contentWidth) {
        wrappedLines += 1;
        currentWidth = wordWidth;
      } else {
        currentWidth += wordWidth;
      }
    }

    y -= wrappedLines * bodyLineHeight + SPACING.sm;
  }

  return boxBottom - SPACING.lg;
}

/**
 * BottomLine
 * Executive takeaway for the lease audit.
 *
 * Clean, non-overlapping, layout-safe implementation.
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

  const titleFontSize = 14;
  const bodyFontSize = 11;
  const bodyLineHeight = 14;
  const rangeFontSize = 28;

  const contentWidth = boxWidth - padding * 2;

  const framingText =
    "For this lease, a reasonable, defensible estimate of avoidable CAM / NNN exposure over the next 12 months is:";

  /* -----------------------------------------
     Calculate wrapped body height FIRST
  ------------------------------------------ */

  const words = framingText.split(" ");
  let wrappedLines = 1;
  let currentWidth = 0;

  for (const word of words) {
    const wordWidth = font.widthOfTextAtSize(word + " ", bodyFontSize);
    if (currentWidth + wordWidth > contentWidth) {
      wrappedLines += 1;
      currentWidth = wordWidth;
    } else {
      currentWidth += wordWidth;
    }
  }

  const titleHeight = titleFontSize + SPACING.sm;
  const bodyHeight = wrappedLines * bodyLineHeight + SPACING.sm;
  const rangeHeight = rangeFontSize + SPACING.md;

  const totalHeight =
    padding * 2 + titleHeight + bodyHeight + rangeHeight;

  const boxTop = cursorY;
  const boxBottom = boxTop - totalHeight;

  /* -----------------------------------------
     Draw background + accent FIRST
  ------------------------------------------ */

  page.drawRectangle({
    x: boxX,
    y: boxBottom,
    width: boxWidth,
    height: totalHeight,
    color: rgb(0.94, 0.94, 0.94),
  });

  page.drawRectangle({
    x: boxX,
    y: boxBottom,
    width: accentWidth,
    height: totalHeight,
    color: rgb(0.15, 0.15, 0.15),
  });

  /* -----------------------------------------
     Render content inside box
  ------------------------------------------ */

  let y = boxTop - padding;

  // Title
  page.drawText("Bottom line", {
    x: boxX + padding,
    y,
    size: titleFontSize,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  y -= titleHeight;

  // Framing sentence
  page.drawText(framingText, {
    x: boxX + padding,
    y,
    size: bodyFontSize,
    font,
    maxWidth: contentWidth,
    lineHeight: bodyLineHeight,
    color: rgb(0.2, 0.2, 0.2),
  });

  y -= bodyHeight;

  // Dollar range
  page.drawText(`${rangeLow} - ${rangeHigh}`, {
    x: boxX + padding,
    y,
    size: rangeFontSize,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  return {
    page,
    cursorY: boxBottom - SPACING.lg,
  };
}