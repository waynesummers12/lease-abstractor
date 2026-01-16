// worker/utils/abstractLease.ts

function normalize(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

function extract(text: string, regex: RegExp): string | null {
  const match = text.match(regex);
  return match?.[1]?.trim() ?? null;
}

function parseDate(raw: string | null): string | null {
  if (!raw) return null;

  // Attempt native date parsing (e.g. "January 31, 2028")
  const d = new Date(raw);
  if (isNaN(d.getTime())) return null;

  // Return ISO date for Postgres DATE column
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function parseMoney(raw: string | null): number | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const value = Number(cleaned);
  return isNaN(value) ? null : value;
}

function parseIntSafe(raw: string | null): number | null {
  if (!raw) return null;
  const value = parseInt(raw, 10);
  return isNaN(value) ? null : value;
}

export function abstractLease(text: string) {
  const normalized = normalize(text);

  const tenant = extract(normalized, /Tenant[:\s]+(.+?)(?:Landlord|Premises)/i);
  const landlord = extract(normalized, /Landlord[:\s]+(.+?)(?:Tenant|Premises)/i);
  const premises = extract(normalized, /Premises[:\s]+(.+?)(?:Lease Term|Term)/i);

  const leaseStartRaw = extract(
    normalized,
    /Commencement Date[:\s]+([A-Za-z]+\s+\d{1,2},\s+\d{4})/i
  );

  const leaseEndRaw = extract(
    normalized,
    /Expiration Date[:\s]+([A-Za-z]+\s+\d{1,2},\s+\d{4})/i
  );

  const baseRentRaw = extract(
    normalized,
    /\$([\d,]+(?:\.\d{2})?)/i
  );

  const termMonthsRaw = extract(
    normalized,
    /(\d+)\s+(?:year|years)/i
  );

  return {
    tenant_name: tenant,
    landlord_name: landlord,
    premises,

    lease_start: parseDate(leaseStartRaw),
    lease_end: parseDate(leaseEndRaw),

    base_rent: parseMoney(baseRentRaw),
    term_months: termMonthsRaw
      ? parseIntSafe(termMonthsRaw) * 12
      : null,

    raw_text_length: text.length,
    confidence: text.length > 500 ? "high" : "low",
  };
}
