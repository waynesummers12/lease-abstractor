import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";
import type { PDFPage, PDFFont } from "npm:pdf-lib@1.17.1";

type Flag = { code?: string; label?: string };
type AuditAnalysis = {
  exposureRange?: { low: number; high: number };
  sourcePages?: Array<{ page: number; text: string }> | null;
  audit_id?: string | null;
  tenant?: string | null;
  landlord?: string | null;
  premises?: string | null;
  lease_start?: string | null;
  lease_end?: string | null;
  health?: { flags?: Flag[] | null } | null;
};

const INK = rgb(0.08, 0.13, 0.19);
const MUTED = rgb(0.37, 0.43, 0.49);
const BLUE = rgb(0.08, 0.32, 0.55);
const PALE = rgb(0.93, 0.96, 0.98);
const MARGIN = 48;

function safeText(value: unknown): string {
  return String(value ?? "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014\u2011]/g, "-")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const result: string[] = [];
  let line = "";
  for (const word of safeText(text).split(" ")) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && font.widthOfTextAtSize(candidate, size) > width) {
      result.push(line);
      line = word;
    } else line = candidate;
  }
  if (line) result.push(line);
  return result;
}

function reviewItem(flag: Flag): { title: string; check: string } {
  switch (flag.code) {
    case "CAPEX_IN_CAM":
    case "CAPEX_INCLUDED":
      return { title: "Capital expense language", check: "Check which capital items the lease permits, any amortization requirement, and the actual amounts billed." };
    case "MGMT_FEE_WATCH":
    case "MGMT_FEE_DELTA":
      return { title: "Management or administrative fees", check: "Find the lease's fee definition, percentage and calculation base, then compare them with the reconciliation." };
    case "PRO_RATA":
      return { title: "Pro-rata allocation", check: "Compare the stated tenant share and rentable-area denominator with the landlord's allocation schedule." };
    case "UNCAPPED_CAM":
      return { title: "CAM cap language", check: "Confirm which expense categories have a cap and whether any exceptions apply." };
    case "NO_RECONCILIATION":
      return { title: "Reconciliation procedure", check: "Locate the annual statement, supporting-record, and dispute provisions in the lease." };
    default:
      return { title: safeText(flag.label) || "Lease provision to review", check: "Locate the relevant clause and compare it with the landlord's supporting records." };
  }
}

function textMatch(flag: Flag, sourcePages?: Array<{ page: number; text: string }> | null): { page: number; text: string } | null {
  if (!sourcePages) return null;
  const patterns: Record<string, RegExp> = {
    CAPEX_IN_CAM: /capital (?:expenses|improvements|expenditures)|replacement of roof|structural/i,
    CAPEX_INCLUDED: /capital (?:expenses|improvements|expenditures)|replacement of roof|structural/i,
    MGMT_FEE_WATCH: /(?:management|admin(?:istration)?) fee/i,
    MGMT_FEE_DELTA: /(?:management|admin(?:istration)?) fee/i,
    PRO_RATA: /pro[-\s]?rata|tenant['\u2019]s share/i,
    UNCAPPED_CAM: /no cap|without limitation|all operating expenses/i,
  };
  const pattern = patterns[flag.code ?? ""];
  if (!pattern) return null;
  for (const source of sourcePages) {
    const match = pattern.exec(source.text);
    if (!match || match.index === undefined) continue;
    const start = Math.max(0, match.index - 55);
    const end = Math.min(source.text.length, match.index + match[0].length + 110);
    return { page: source.page, text: safeText(`${start ? "..." : ""}${source.text.slice(start, end)}${end < source.text.length ? "..." : ""}`) };
  }
  return null;
}

export async function generateAuditPdfV4(analysis: AuditAnalysis): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const storedFlags = Array.isArray(analysis.health?.flags)
    ? analysis.health.flags.filter((flag) => typeof flag?.label === "string")
    : [];
  const flags = analysis.sourcePages
    ? storedFlags.filter((flag) => textMatch(flag, analysis.sourcePages))
    : storedFlags;
  const auditId = safeText(analysis.audit_id) || "Reference unavailable";
  let page!: PDFPage;
  let y = 0;

  function addPage() {
    page = pdf.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: height - 12, width, height: 12, color: BLUE });
    page.drawText("SAVEONLEASE  /  LEASE REVIEW", {
      x: MARGIN, y: height - 46, size: 9, font: bold, color: BLUE,
    });
    y = height - 86;
  }

  function ensure(height: number) {
    if (y - height < 68) addPage();
  }

  function heading(text: string) {
    ensure(45);
    page.drawText(safeText(text), { x: MARGIN, y, size: 15, font: bold, color: INK });
    y -= 26;
  }

  function paragraph(text: string, options: { indent?: number; color?: typeof INK; bold?: boolean; gap?: number } = {}) {
    const x = MARGIN + (options.indent ?? 0);
    const face = options.bold ? bold : font;
    const wrapped = wrap(text, face, 10.5, page.getWidth() - x - MARGIN);
    ensure(wrapped.length * 15 + (options.gap ?? 9));
    for (const line of wrapped) {
      page.drawText(line, { x, y, size: 10.5, font: face, color: options.color ?? MUTED });
      y -= 15;
    }
    y -= options.gap ?? 9;
  }

  addPage();
  page.drawText("Your commercial lease review", {
    x: MARGIN, y, size: 25, font: bold, color: INK,
  });
  y -= 30;
  paragraph("CAM / NNN language screening report", { color: BLUE, gap: 16 });

  page.drawRectangle({ x: MARGIN, y: y - 81, width: page.getWidth() - MARGIN * 2, height: 81, color: PALE });
  y -= 20;
  paragraph(`Audit reference: ${auditId}`, { indent: 14, color: INK, gap: 1 });
  paragraph(`Prepared: ${new Date().toISOString().slice(0, 10)}`, { indent: 14, gap: 1 });
  paragraph(`Premises: ${analysis.premises || "Not reliably extracted"}`, { indent: 14, gap: 0 });
  y -= 27;

  heading("At a glance");
  paragraph(`${flags.length} review item${flags.length === 1 ? "" : "s"} ${analysis.sourcePages ? "matched to lease text" : "from the stored analysis"} for manual verification. A finding indicates language to check; it does not establish that the landlord overcharged you.`, { color: INK });
  paragraph("Verified overcharge: Not determined. The lease alone does not provide invoices, reconciliation statements, or actual CAM allocations.", { bold: true, color: INK, gap: 16 });

  heading("Lease details available to the audit");
  paragraph(`Tenant: ${analysis.tenant || "Not reliably extracted"}`);
  paragraph(`Landlord: ${analysis.landlord || "Not reliably extracted"}`);
  paragraph(`Lease dates: ${analysis.lease_start || "Unknown"} to ${analysis.lease_end || "Unknown"}`, { gap: 17 });

  heading("Priority review items");
  if (flags.length === 0) {
    paragraph("No specific review flags were preserved in this analysis. Check the lease and billing records directly before concluding there is no risk.");
  } else {
    for (const [index, flag] of flags.slice(0, 5).entries()) {
      ensure(150);
      const item = reviewItem(flag);
      paragraph(`${index + 1}. ${item.title}`, { bold: true, color: INK, gap: 2 });
      paragraph(item.check, { indent: 15, gap: 8 });
      const excerpt = textMatch(flag, analysis.sourcePages);
      if (excerpt) paragraph(`Lease text match, page ${excerpt.page}: "${excerpt.text}"`, { indent: 15, gap: 12 });
    }
  }

  heading("What to do next");
  paragraph("1. Find the lease clauses for each flagged item and note any exclusions, caps, and audit deadlines.");
  paragraph("2. Compare those clauses with your CAM/NNN statements, invoices, and allocation schedules.");
  paragraph("3. Ask the landlord for supporting calculations before asserting a recoverable amount.");
  heading("How to read this report");
  paragraph("This report screens extracted lease text for CAM and NNN language. It is a starting point for review, not a completed reconciliation audit or legal opinion.", { color: INK });
  paragraph("Automated dollar scenarios may be built from assumed CAM charges and percentage sensitivities. Those inputs are not verified against invoices, so this report does not label them as savings or overcharges.");
  paragraph("Page-numbered text matches come from PDF extraction; they are prompts for checking the original page, not proof that a charge violates the lease. A clause may have exceptions elsewhere.");
  heading("Documents needed to verify a claim");
  paragraph("- The executed lease and amendments");
  paragraph("- Annual CAM/NNN reconciliations and landlord backup");
  paragraph("- Invoices, allocation schedules, and rentable-area calculations");
  paragraph("- Notices and the dates that start any audit or dispute period");
  heading("Questions about this audit?");
  paragraph(`Email audits@saveonlease.com and include audit reference ${auditId}.`);

  const pages = pdf.getPages();
  pages.forEach((current, index) => {
    current.drawLine({ start: { x: MARGIN, y: 50 }, end: { x: current.getWidth() - MARGIN, y: 50 }, thickness: 0.5, color: MUTED });
    current.drawText(`SaveOnLease  |  ${auditId}  |  Page ${index + 1} of ${pages.length}`, {
      x: MARGIN, y: 33, size: 8, font, color: MUTED,
    });
  });
  return pdf.save();
}
