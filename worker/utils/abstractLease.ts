// worker/utils/abstractLease.ts

const NUMBER_WORDS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

function normalize(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function extract(regex: RegExp, text: string): string | null {
  const m = text.match(regex);
  return m?.[1]?.trim() ?? null;
}

function parseDate(raw: string | null): string | null {
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

function parseMoney(raw: string | null): number | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const n = Number(cleaned);
  return isNaN(n) ? null : n;
}

function parseTermMonths(text: string): number | null {
  const numeric = text.match(/(\d+)\s*\(?\d*\)?\s*years?/i);
  if (numeric) return parseInt(numeric[1], 10) * 12;

  const word = text.match(
    new RegExp(`(${Object.keys(NUMBER_WORDS).join("|")})\\s*\\(?\\d*\\)?\\s*years?`, "i")
  );
  if (word) return NUMBER_WORDS[word[1].toLowerCase()] * 12;

  return null;
}

export function abstractLease(text: string) {
  const t = normalize(text);

  // Strong section isolation
  const tenant = extract(
    /Tenant:\s*([^,\n]+(?:,?\s*Inc\.|LLC|Ltd)?)/i,
    t
  );

  const landlord = extract(
    /Landlord:\s*([^,\n]+(?:,?\s*LLC|Inc\.|Ltd)?)/i,
    t
  );

  const premises = extract(
    /located at\s*([^()]+)\s*\(“?Premises”?\)/i,
    t
  );

  const commencement = extract(
    /Commencement Date.*?([A-Za-z]+\s+\d{1,2},\s+\d{4})/i,
    t
  );

  const expiration = extract(
    /Expiration Date.*?([A-Za-z]+\s+\d{1,2},\s+\d{4})/i,
    t
  );

  const baseRentRaw = extract(
    /\$([\d,]+(?:\.\d{2})?)\s*per\s*month/i,
    t
  );

  return {
    tenant_name: tenant,
    landlord_name: landlord,
    premises,

    lease_start: parseDate(commencement),
    lease_end: parseDate(expiration),

    base_rent: parseMoney(baseRentRaw),
    term_months: parseTermMonths(t),

    raw_text_length: text.length,
    confidence: text.length > 500 ? "high" : "low",
  };
}
