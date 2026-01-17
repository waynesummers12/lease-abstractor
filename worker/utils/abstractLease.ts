// worker/utils/abstractLease.ts

function normalizeText(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .replace(/-\n/g, "")
    .replace(/\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function extractWithPatterns(
  text: string,
  patterns: RegExp[]
): string | null {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) {
      return match[1].trim();
    }
  }
  return null;
}

function extractTenant(text: string): string | null {
  return extractWithPatterns(text, [
    /Tenant[:\s]+([^,.;]+)/i,
    /Lessee[:\s]+([^,.;]+)/i,
    /between .*? and ([^,.;]+)\s+\("Tenant"\)/i,
  ]);
}

function extractLandlord(text: string): string | null {
  return extractWithPatterns(text, [
    /Landlord[:\s]+([^,.;]+)/i,
    /Lessor[:\s]+([^,.;]+)/i,
    /between ([^,.;]+)\s+and .*?Tenant/i,
  ]);
}

function extractPremises(text: string): string | null {
  return extractWithPatterns(text, [
    /Premises[:\s]+([^.;]+)/i,
    /located at ([^.;]+)/i,
  ]);
}

function extractDate(
  label: string,
  text: string
): string | null {
  const patterns = [
    new RegExp(`${label}[:\\s]+([A-Za-z]+ \\d{1,2}, \\d{4})`, "i"),
    new RegExp(`${label}[:\\s]+(\\d{1,2}/\\d{1,2}/\\d{4})`, "i"),
  ];

  return extractWithPatterns(text, patterns);
}

function extractBaseRent(text: string): number | null {
  const patterns = [
    /\$([\d,]+)\s+per\s+month/i,
    /Base Rent[:\s]+\$([\d,]+)/i,
  ];

  const value = extractWithPatterns(text, patterns);
  return value ? Number(value.replace(/,/g, "")) : null;
}

function confidence(value: unknown): "high" | "medium" | "low" {
  if (!value) return "low";
  if (typeof value === "string" && value.length > 6) return "high";
  return "medium";
}

export function abstractLease(rawText: string) {
  const text = normalizeText(rawText);

  const tenant = extractTenant(text);
  const landlord = extractLandlord(text);
  const premises = extractPremises(text);
  const lease_start = extractDate(
    "Commencement Date|Lease Start",
    text
  );
  const lease_end = extractDate(
    "Expiration Date|Lease End",
    text
  );
  const base_rent = extractBaseRent(text);

  const term_months =
    lease_start && lease_end
      ? Math.round(
          (new Date(lease_end).getTime() -
            new Date(lease_start).getTime()) /
            (1000 * 60 * 60 * 24 * 30)
        )
      : null;

  return {
    tenant,
    landlord,
    premises,
    lease_start,
    lease_end,
    base_rent,
    term_months,
    confidence: {
      tenant: confidence(tenant),
      landlord: confidence(landlord),
      premises: confidence(premises),
      lease_start: confidence(lease_start),
      lease_end: confidence(lease_end),
      base_rent: confidence(base_rent),
    },
    raw_preview: text.slice(0, 1500),
  };
}


