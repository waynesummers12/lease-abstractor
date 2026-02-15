// worker/utils/pdf/components/ExplanationBox.ts

import { PDFDocument, PDFPage, PDFFont, rgb } from "npm:pdf-lib@1.17.1";
import { PAGE, SPACING, ensureSpace } from "../layout.ts";
import { drawParagraph } from "../text.ts";

/**
 * ExplanationBox
 * Enterprise-grade explanatory container.
 *
 * Fixes:
 * - Dynamic height (no more full-page gray fill)
 * - Proper title spacing
 * - Divider sits correctly under title
 * - Paragraphs never bleed outside gray box
 * - Accent bar matches true content height
 */
export function drawExplanationBox(
  pdfDoc: PDFDocument,
  page: PDFPage,
  cursorY: number,
  opts: {
    title: string;
    paragraphs: string[];
  },
  fonts: {
    font: PDFFont;
    boldFont: PDFFont;
  }
): { page: PDFPage; cursorY: number } {
  const { title, paragraphs } = opts;
  const { font, boldFont } = fonts;

  const boxX = PAGE.margin;
  const boxWidth = page.getSize().width - PAGE.margin * 2;
  const padding = 22;
  const accentWidth = 4;

  let y = cursorY;

  /* -------------------------------------------------
     Pre-calc content height (so box wraps content)
  -------------------------------------------------- */

  const titleHeight = 22;
  const dividerGap = SPACING.sm;

  let contentHeight = padding + titleHeight + dividerGap;

  for (const paragraph of paragraphs) {
    const fontSize = 11;
    const lineHeight =
      paragraph.startsWith("•")
        ? fontSize * 1.15
        : paragraph.endsWith(":")
        ? fontSize * 1.25
        : fontSize * 1.3;

    const words = paragraph.split(" ");
    let lines = 1;
    let currentWidth = 0;
    const maxWidth =
      paragraph.startsWith("•")
        ? boxWidth - padding * 2 - 6
        : boxWidth - padding * 2;

    for (const word of words) {
      const wordWidth = font.widthOfTextAtSize(word + " ", fontSize);
      if (currentWidth + wordWidth > maxWidth) {
        lines += 1;
        currentWidth = wordWidth;
      } else {
        currentWidth += wordWidth;
      }
    }

    contentHeight += lines * lineHeight + SPACING.sm;
  }

  contentHeight += padding;

  /* -------------------------------------------------
     Ensure space on page
  -------------------------------------------------- */

  ({ page, cursorY } = ensureSpace(
    pdfDoc,
    page,
    cursorY,
    contentHeight + SPACING.lg
  ));

  y = cursorY;

  /* -------------------------------------------------
     Background + accent
  -------------------------------------------------- */

  page.drawRectangle({
    x: boxX,
    y: y - contentHeight,
    width: boxWidth,
    height: contentHeight,
    color: rgb(0.955, 0.955, 0.955),
  });

  page.drawRectangle({
    x: boxX,
    y: y - contentHeight,
    width: accentWidth,
    height: contentHeight,
    color: rgb(0.85, 0.2, 0.2),
  });

  /* -------------------------------------------------
     Title
  -------------------------------------------------- */

  y -= padding;

  page.drawText(title, {
    x: boxX + padding,
    y,
    size: 15,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  y -= titleHeight;

  /* -------------------------------------------------
     Divider
  -------------------------------------------------- */

  page.drawLine({
    start: { x: boxX + padding, y },
    end: { x: boxX + boxWidth - padding, y },
    thickness: 0.75,
    color: rgb(0.82, 0.82, 0.82),
  });

  y -= dividerGap;

  /* -------------------------------------------------
     Body
  -------------------------------------------------- */

  for (const paragraph of paragraphs) {
    if (paragraph.startsWith("•")) {
      y = drawParagraph({
        page,
        text: paragraph,
        x: boxX + padding + 6,
        y,
        font,
        size: 11,
        maxWidth: boxWidth - padding * 2 - 6,
        lineHeight: 11 * 1.15,
      });
    } else if (paragraph.endsWith(":")) {
      y = drawParagraph({
        page,
        text: paragraph,
        x: boxX + padding,
        y,
        font,
        size: 11,
        maxWidth: boxWidth - padding * 2,
        lineHeight: 11 * 1.25,
      });
    } else {
      y = drawParagraph({
        page,
        text: paragraph,
        x: boxX + padding,
        y,
        font,
        size: 11,
        maxWidth: boxWidth - padding * 2,
        lineHeight: 11 * 1.3,
      });
    }

    y -= SPACING.sm;
  }

  return {
    page,
    cursorY: y - SPACING.lg,
  };
}