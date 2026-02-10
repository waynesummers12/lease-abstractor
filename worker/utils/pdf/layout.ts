// worker/utils/pdf/layout.ts

import {
  PDFDocument,
  PDFPage,
  PDFFont,
  rgb,
} from "npm:pdf-lib@1.17.1";

/* -------------------------------------------------
   Page geometry (single source of truth)
-------------------------------------------------- */

export const PAGE = {
  margin: 50,
  bottom: 60,
};

export const CONTENT = {
  maxWidth: 612 - PAGE.margin * 2, // US Letter width
};

/* -------------------------------------------------
   Vertical rhythm system
-------------------------------------------------- */

export const SPACING = {
  xs: 6,
  sm: 12,
  md: 20,
  lg: 32,
  xl: 48,
};

export function advanceY(y: number, amount: number): number {
  return y - amount;
}

/* -------------------------------------------------
   Page-break safety
-------------------------------------------------- */

export function ensureSpace(
  pdfDoc: PDFDocument,
  page: PDFPage,
  cursorY: number,
  requiredHeight: number
): { page: PDFPage; cursorY: number } {
  if (cursorY - requiredHeight < PAGE.bottom) {
    const newPage = pdfDoc.addPage();
    const { height } = newPage.getSize();
    return {
      page: newPage,
      cursorY: height - PAGE.margin,
    };
  }
  return { page, cursorY };
}

/* -------------------------------------------------
   Text helpers (NO overlap)
-------------------------------------------------- */

function estimateLineCount(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number
): number {
  const words = text.split(" ");
  let lines = 1;
  let currentWidth = 0;

  for (const word of words) {
    const wordWidth = font.widthOfTextAtSize(word + " ", size);
    if (currentWidth + wordWidth > maxWidth) {
      lines += 1;
      currentWidth = wordWidth;
    } else {
      currentWidth += wordWidth;
    }
  }

  return lines;
}

export function drawParagraph(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size: number,
  maxWidth: number
): number {
  const lineHeight = size * 1.4;

  page.drawText(text, {
    x,
    y,
    size,
    font,
    maxWidth,
    lineHeight,
    color: rgb(0, 0, 0),
  });

  const lines = estimateLineCount(text, font, size, maxWidth);
  return y - lines * lineHeight;
}

export function drawBulletText(
  page: PDFPage,
  font: PDFFont,
  x: number,
  y: number,
  text: string,
  maxWidth: number
): number {
  const bullet = "• ";
  const size = 11;
  const lineHeight = size * 1.4;

  page.drawText(bullet + text, {
    x,
    y,
    size,
    font,
    maxWidth,
    lineHeight,
  });

  const lines = estimateLineCount(bullet + text, font, size, maxWidth);
  return y - lines * lineHeight - SPACING.sm;
}