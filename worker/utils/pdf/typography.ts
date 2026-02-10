import { PDFFont, rgb, PDFPage } from "npm:pdf-lib@1.17.1";

/* ---------------------------------
   Typography scale & helpers
---------------------------------- */

export const FONT_SIZES = {
  h1: 28,
  h2: 20,
  h3: 16,
  body: 11,
  small: 9,
};

export const LINE_HEIGHT = {
  tight: 1.15,
  normal: 1.4,
  loose: 1.65,
};

export const COLORS = {
  text: rgb(0.15, 0.15, 0.15),
  muted: rgb(0.45, 0.45, 0.45),
  subtle: rgb(0.65, 0.65, 0.65),
};

export const SPACING = {
  xs: 6,
  sm: 12,
  md: 20,
  lg: 32,
  xl: 48,
};

/* ---------------------------------
   Text helpers
---------------------------------- */

export function drawHeading(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size: number,
  afterSpacing: number = SPACING.sm
) {
  page.drawText(text, {
    x,
    y,
    size,
    font,
    color: COLORS.text,
  });

  return y - afterSpacing;
}

export function drawParagraph(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  maxWidth: number,
  size = FONT_SIZES.body,
  afterSpacing: number = SPACING.md
) {
  page.drawText(text, {
    x,
    y,
    size,
    font,
    color: COLORS.muted,
    maxWidth,
    lineHeight: size * LINE_HEIGHT.normal,
  });

  return y - afterSpacing;
}

export function advanceY(y: number, amount: number) {
  return y - amount;
}

export function paragraphHeight(text: string, size = FONT_SIZES.body, _maxWidth?: number) {
  const lines = text.split("\n").length || 1;
  return size * LINE_HEIGHT.normal * lines;
}