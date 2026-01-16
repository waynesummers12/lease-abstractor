// worker/utils/abstractLease.ts
export function abstractLease(text: string) {
  const normalize = (s: string) =>
    s.replace(/\s+/g, " ").toLowerCase();

  const t = normalize(text);

  const extract = (regex: RegExp) => {
    const match = text.match(regex);
    return match?.[1]?.trim() || null;
  };

  return {
    tenant_name: extract(/Tenant[:\s]+(.+)/i),
    landlord_name: extract(/Landlord[:\s]+(.+)/i),
    premises: extract(/Premises[:\s]+(.+)/i),
    lease_start: extract(/Commencement Date[:\s]+(.+)/i),
    lease_end: extract(/Expiration Date[:\s]+(.+)/i),
    base_rent: extract(/\$[\d,]+(?:\.\d{2})?/),
    term_months: extract(/(\d+)\s+months/i),
    raw_text_length: text.length,
    confidence: text.length > 500 ? "high" : "low"
  };
}
