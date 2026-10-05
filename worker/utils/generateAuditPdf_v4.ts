import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";
import type { PDFPage, PDFFont } from "npm:pdf-lib@1.17.1";

type Flag = { code?: string; label?: string };
type AuditAnalysis = {
  sourcePages?: Array<{ page: number; text: string }> | null;
  audit_id?: string | null;
  tenant?: string | null;
  landlord?: string | null;
  premises?: string | null;
  lease_start?: string | null;
  lease_end?: string | null;
  health?: { flags?: Flag[] | null } | null;
};

const NAVY = rgb(0.055, 0.12, 0.19);
const BLUE = rgb(0.07, 0.34, 0.56);
const TEAL = rgb(0.03, 0.45, 0.45);
const MUTED = rgb(0.35, 0.41, 0.47);
const LIGHT = rgb(0.92, 0.95, 0.97);
const WHITE = rgb(1, 1, 1);
const MARGIN = 48;
const WIDTH = 595.28;
const HEIGHT = 841.89;
const CONTENT = WIDTH - MARGIN * 2;

type Review = { title: string; reason: string; check: string; request: string };
function reviewItem(flag: Flag): Review {
  switch (flag.code) {
    case "CAPEX_IN_CAM":
    case "CAPEX_INCLUDED":
      return { title: "Capital costs in operating expenses", reason: "A lease may allow some capital work, but recovery can depend on exclusions, useful life, or amortization.", check: "Compare each capital charge with the lease's permitted categories and any amortization terms.", request: "Capital project ledger, invoices, amortization schedule, and allocation calculation." };
    case "MGMT_FEE_WATCH":
    case "MGMT_FEE_DELTA":
      return { title: "Management and administrative fees", reason: "The fee base and percentage can change the amount billed, especially if a fee is applied to excluded costs.", check: "Compare the agreed rate and calculation base with the rate and base on the annual statement.", request: "Fee calculation, expense base detail, and annual reconciliation." };
    case "PRO_RATA":
      return { title: "Tenant share and allocation", reason: "A change in rentable area or the denominator used for allocation can alter the tenant's share.", check: "Recalculate the tenant share using the lease definition and the landlord's area schedule.", request: "Rentable-area schedule, tenant-share calculation, and allocation by expense category." };
    case "UNCAPPED_CAM":
      return { title: "CAM caps and exceptions", reason: "A cap may apply only to certain expense categories or exclude taxes, insurance, utilities, or unusual costs.", check: "Identify the capped categories, base year, annual adjustment, and exceptions before comparing billed amounts.", request: "Year-by-year CAM summary, cap calculation, and category-level expense detail." };
    case "NO_RECONCILIATION":
      return { title: "Reconciliation and review rights", reason: "The timing and procedure for reviewing charges may affect what records are available and when a dispute must be raised.", check: "Read the statement, inspection, notice, and dispute provisions in the executed lease.", request: "Annual reconciliations, delivery dates, notices, and supporting-record access instructions." };
    default:
      return { title: safeText(flag.label) || "Lease provision for review", reason: "This item needs a human reading of the full clause and related definitions.", check: "Compare the complete clause and any amendments with the charge as billed.", request: "Annual statement and the underlying invoices or calculations for this item." };
  }
}

function safeText(value: unknown): string {
  return String(value ?? "").replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014\u2011]/g, "-").replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
}
function wrap(value: string, font: PDFFont, size: number, width: number): string[] {
  const words = safeText(value).split(" ");
  const lines: string[] = [];
  let line = "";
  for (let word of words) {
    if (!word) continue;
    while (font.widthOfTextAtSize(word, size) > width) {
      let cut = word.length - 1;
      while (cut > 1 && font.widthOfTextAtSize(word.slice(0, cut), size) > width) cut--;
      if (line) { lines.push(line); line = ""; }
      lines.push(word.slice(0, cut));
      word = word.slice(cut);
    }
    const next = line ? `${line} ${word}` : word;
    if (line && font.widthOfTextAtSize(next, size) > width) { lines.push(line); line = word; }
    else line = next;
  }
  if (line) lines.push(line);
  return lines;
}
function textMatch(flag: Flag, sourcePages?: AuditAnalysis["sourcePages"]): { page: number; text: string } | null {
  if (!sourcePages) return null;
  const patterns: Record<string, RegExp> = {
    CAPEX_IN_CAM: /capital (?:expenses|improvements|expenditures)|replacement of roof|structural/i,
    CAPEX_INCLUDED: /capital (?:expenses|improvements|expenditures)|replacement of roof|structural/i,
    MGMT_FEE_WATCH: /(?:management|admin(?:istration)?) fee/i,
    MGMT_FEE_DELTA: /(?:management|admin(?:istration)?) fee/i,
    PRO_RATA: /pro[-\s]?rata|tenant['\u2019]s share/i,
    UNCAPPED_CAM: /no cap|without limitation|all operating expenses/i,
    NO_RECONCILIATION: /reconcil(?:e|iation)|audit rights|examin(?:e|ation) of (?:books|records)/i,
  };
  const pattern = patterns[flag.code ?? ""];
  if (!pattern) return null;
  for (const source of sourcePages) {
    const match = pattern.exec(source.text);
    if (!match || match.index === undefined) continue;
    const start = Math.max(0, match.index - 45);
    const end = Math.min(source.text.length, match.index + match[0].length + 115);
    return { page: source.page, text: safeText(`${start ? "..." : ""}${source.text.slice(start, end)}${end < source.text.length ? "..." : ""}`) };
  }
  return null;
}

export async function generateAuditPdfV4(analysis: AuditAnalysis): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const auditId = safeText(analysis.audit_id) || "Reference unavailable";
  const sourcePages = analysis.sourcePages?.filter((p) => Number.isInteger(p.page) && p.page > 0 && !!p.text) ?? [];
  const stored = Array.isArray(analysis.health?.flags) ? analysis.health.flags.filter((f) => typeof f?.label === "string") : [];
  const items = stored.map((flag) => ({ flag, match: textMatch(flag, sourcePages) }))
    .filter((item) => sourcePages.length === 0 || item.match)
    .slice(0, 8);
  let page!: PDFPage;
  let y = 0;
  const addPage = () => {
    page = pdf.addPage([WIDTH, HEIGHT]);
    page.drawRectangle({ x: 0, y: HEIGHT - 12, width: WIDTH, height: 12, color: TEAL });
    page.drawText("SAVEONLEASE  /  COMMERCIAL LEASE REVIEW", { x: MARGIN, y: HEIGHT - 43, size: 8.5, font: bold, color: BLUE });
    y = HEIGHT - 82;
  };
  const ensure = (height: number) => { if (y - height < 73) addPage(); };
  const lines = (value: string, x = MARGIN, size = 10, color = MUTED, face = font, width = CONTENT, leading = 15) => {
    for (const line of wrap(value, face, size, width)) {
      page.drawText(line, { x, y, size, font: face, color });
      y -= leading;
    }
  };
  const heading = (value: string) => {
    ensure(55);
    y -= 13;
    page.drawText(safeText(value), { x: MARGIN, y, size: 16, font: bold, color: NAVY });
    y -= 28;
  };
  const rule = () => { page.drawLine({ start: { x: MARGIN, y }, end: { x: WIDTH - MARGIN, y }, thickness: 0.7, color: LIGHT }); y -= 16; };
  const labelValue = (label: string, value: string, x: number, width: number) => {
    page.drawText(label.toUpperCase(), { x, y, size: 8, font: bold, color: MUTED });
    const valueLines = wrap(value, font, 10, width);
    valueLines.slice(0, 2).forEach((line, index) => page.drawText(line, { x, y: y - 19 - index * 14, size: 10, font, color: NAVY }));
  };

  addPage();
  page.drawText("YOUR LEASE,", { x: MARGIN, y, size: 27, font: bold, color: NAVY }); y -= 34;
  page.drawText("CLEARER NEXT STEPS.", { x: MARGIN, y, size: 27, font: bold, color: NAVY }); y -= 29;
  lines("CAM / NNN language review  |  Prepared " + new Date().toISOString().slice(0, 10), MARGIN, 10, BLUE, bold); y -= 18;
  page.drawRectangle({ x: MARGIN, y: y - 83, width: CONTENT, height: 83, color: LIGHT });
  y -= 24;
  page.drawText(`${items.length} item${items.length === 1 ? "" : "s"} to verify`, { x: MARGIN + 18, y, size: 20, font: bold, color: NAVY }); y -= 26;
  lines("A lease clause is a starting point. Whether a charge was overbilled requires the landlord's statements, calculations, and supporting records.", MARGIN + 18, 10.5, NAVY, font, CONTENT - 36); y -= 20;

  heading("Lease snapshot");
  const half = (CONTENT - 22) / 2;
  labelValue("Tenant", safeText(analysis.tenant) || "Not reliably extracted", MARGIN, half);
  labelValue("Landlord", safeText(analysis.landlord) || "Not reliably extracted", MARGIN + half + 22, half);
  y -= 53;
  labelValue("Premises", safeText(analysis.premises) || "Not reliably extracted", MARGIN, half);
  labelValue("Lease dates", `${safeText(analysis.lease_start) || "Unknown"} to ${safeText(analysis.lease_end) || "Unknown"}`, MARGIN + half + 22, half);
  y -= 58;
  rule();
  heading("What this report can tell you");
  lines("The items below identify lease language for review. Page references point to text extracted from the uploaded PDF; confirm each clause on the original page and read related definitions and amendments."); y -= 15;
  lines("Verified overcharge: not determined. No landlord invoices, reconciliations, or actual allocations were analyzed with this lease.", MARGIN, 10, NAVY, bold); y -= 21;
  heading("Your review path");
  for (const [number, title, detail] of [
    ["01", "Confirm the clause", "Read the full provision, definitions, exclusions, amendments, and any review deadlines."],
    ["02", "Get the billing backup", "Request the annual reconciliation, category detail, invoices, and allocation math."],
    ["03", "Calculate a variance", "Compare the charge billed with the amount permitted by the lease and supporting records."],
  ]) {
    ensure(59);
    page.drawText(number, { x: MARGIN, y, size: 13, font: bold, color: TEAL });
    page.drawText(title, { x: MARGIN + 36, y, size: 11, font: bold, color: NAVY }); y -= 17;
    lines(detail, MARGIN + 36, 9.5, MUTED, font, CONTENT - 36, 14); y -= 5;
  }

  addPage();
  heading("Lease language to investigate");
  if (items.length === 0) {
    lines(sourcePages.length ? "No stored review flags could be linked to extracted lease text. This does not establish that the lease or bills are free of issues." : "Page-referenced lease text was unavailable for this audit. Review the executed lease and billing records directly before drawing a conclusion.", MARGIN, 10.5, NAVY); y -= 20;
  }
  for (const [index, item] of items.entries()) {
    const review = reviewItem(item.flag);
    const excerpt = item.match ? `PAGE ${item.match.page}  /  TEXT MATCH:  "${item.match.text}"` : "Source page unavailable; verify in the original lease.";
    const excerptLines = wrap(excerpt, font, 9, CONTENT - 30);
    const reasonLines = wrap(review.reason, font, 9.5, CONTENT - 30);
    const checkLines = wrap(review.check, font, 9.5, CONTENT - 30);
    const requestLines = wrap(review.request, font, 9.5, CONTENT - 30);
    const cardHeight = 58 + excerptLines.length * 13 + reasonLines.length * 14 + checkLines.length * 14 + requestLines.length * 14 + 22;
    ensure(cardHeight + 13);
    const top = y + 10;
    page.drawRectangle({ x: MARGIN, y: top - cardHeight, width: CONTENT, height: cardHeight, color: LIGHT });
    page.drawRectangle({ x: MARGIN, y: top - cardHeight, width: 4, height: cardHeight, color: TEAL });
    const x = MARGIN + 16;
    y -= 10;
    page.drawText(`${String(index + 1).padStart(2, "0")}  ${review.title}`, { x, y, size: 12, font: bold, color: NAVY }); y -= 21;
    lines(review.reason, x, 9.5, MUTED, font, CONTENT - 30, 14); y -= 8;
    lines(excerpt, x, 9, BLUE, font, CONTENT - 30, 13); y -= 9;
    lines(`CHECK  ${review.check}`, x, 9.5, NAVY, font, CONTENT - 30, 14); y -= 7;
    lines(`REQUEST  ${review.request}`, x, 9.5, NAVY, font, CONTENT - 30, 14);
    y = top - cardHeight - 13;
  }

  ensure(330);
  heading("Billing reconciliation worksheet");
  lines("Use one row per charge category and year. A positive difference is only a question to investigate until the lease basis and records are confirmed."); y -= 16;
  const cols = [MARGIN, MARGIN + 128, MARGIN + 258, MARGIN + 375, WIDTH - MARGIN];
  const headers = ["CATEGORY / YEAR", "AMOUNT BILLED", "LEASE BASIS", "DIFFERENCE"];
  page.drawRectangle({ x: MARGIN, y: y - 31, width: CONTENT, height: 31, color: NAVY });
  headers.forEach((h, i) => page.drawText(h, { x: cols[i] + 6, y: y - 20, size: 7.5, font: bold, color: WHITE }));
  y -= 31;
  for (let i = 0; i < 5; i++) {
    ensure(39);
    page.drawRectangle({ x: MARGIN, y: y - 36, width: CONTENT, height: 36, color: i % 2 ? WHITE : LIGHT });
    cols.slice(1, 4).forEach((x) => page.drawLine({ start: { x, y }, end: { x, y: y - 36 }, thickness: 0.5, color: MUTED }));
    y -= 36;
  }
  y -= 16;
  heading("Records to collect");
  for (const text of ["Executed lease, exhibits, and amendments", "Annual CAM / NNN statements and prior-year reconciliations", "General ledger or category detail, invoices, and capital schedules", "Rentable-area and tenant-share allocation schedules", "Delivery dates and notices relevant to review or dispute rights"]) {
    ensure(25);
    page.drawText("+", { x: MARGIN, y, size: 12, font: bold, color: TEAL });
    lines(text, MARGIN + 18, 9.5, NAVY, font, CONTENT - 18, 14); y -= 10;
  }
  heading("Scope and support");
  lines("This is an automated lease-text screening, not a completed billing reconciliation or legal opinion. OCR and extraction can omit or misread text. A matched excerpt can have exceptions elsewhere in the lease. Confirm every page reference in the original document.", MARGIN, 9.5); y -= 11;
  lines(`Questions? Email audits@saveonlease.com with audit reference ${auditId}.`, MARGIN, 9.5, BLUE, bold);

  pdf.getPages().forEach((current, index, pages) => {
    current.drawLine({ start: { x: MARGIN, y: 50 }, end: { x: WIDTH - MARGIN, y: 50 }, thickness: 0.5, color: MUTED });
    const footer = `SaveOnLease  |  ${auditId}  |  ${index + 1} / ${pages.length}`;
    current.drawText(safeText(footer).slice(0, 100), { x: MARGIN, y: 34, size: 8, font, color: MUTED });
  });
  return pdf.save();
}
