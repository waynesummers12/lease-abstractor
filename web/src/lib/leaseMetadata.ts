export type LeaseMetadata = {
  propertyName: string;
  landlord: string;
  squareFeet: number | null;
  leaseType: string;
  renewalDate: string;
};

function field(text: string, labels: string): string {
  const match = text.match(new RegExp(`(?:^|\\n)\\s*(?:${labels})\\s*[:–-]\\s*([^\\n]{1,120})`, "im"));
  return match?.[1]?.trim() ?? "";
}

function dateField(text: string): string {
  const raw = field(text, "renewal date|next renewal date");
  const match = raw.match(/\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|[A-Za-z]+\s+\d{1,2},?\s+\d{4})\b/);
  if (!match) return "";
  const value = match[0];
  let year: number;
  let month: number;
  let day: number;
  if (/^\d{4}-/.test(value)) {
    [year, month, day] = value.split("-").map(Number);
  } else if (/^\d{1,2}\//.test(value)) {
    [month, day, year] = value.split("/").map(Number);
  } else {
    const parts = value.replace(",", "").split(/\s+/);
    const monthIndex = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"].indexOf(parts[0].toLowerCase());
    if (monthIndex < 0) return "";
    month = monthIndex + 1;
    day = Number(parts[1]);
    year = Number(parts[2]);
  }
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() + 1 !== month || date.getUTCDate() !== day) return "";
  return date.toISOString().slice(0, 10);
}

export function extractLeaseMetadata(text: string): LeaseMetadata {
  const normalized = text.replace(/\r\n?/g, "\n");
  const squareFeetMatch = normalized.match(/\b(\d{1,3}(?:,\d{3})+|\d{3,7})\s*(?:square feet|sq\.?\s*ft\.?|sf)\b/i);
  const squareFeet = squareFeetMatch ? Number(squareFeetMatch[1].replace(/,/g, "")) : null;
  const leaseType = /\b(?:triple net|NNN)\b/i.test(normalized)
    ? "NNN"
    : /\bmodified gross\b/i.test(normalized)
      ? "Modified Gross"
      : /\bgross lease\b/i.test(normalized)
        ? "Gross"
        : "";

  return {
    propertyName: field(normalized, "property(?: name| address)?|premises|location"),
    landlord: field(normalized, "landlord|lessor"),
    squareFeet: squareFeet && Number.isFinite(squareFeet) ? squareFeet : null,
    leaseType,
    renewalDate: dateField(normalized),
  };
}
