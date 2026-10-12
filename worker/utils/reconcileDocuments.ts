export type Evidence = { value: number; page: number; excerpt: string };
export type Reconciliation = {
  version: 1;
  statementName: string;
  supportNames: string[];
  statement: { share: Evidence | null; propertyTotal: Evidence | null; tenantCharge: Evidence | null; credits: Evidence | null; balance: Evidence | null };
  leaseShare: Evidence | null;
  checks: Array<{ label: string; result: string; status: "matches" | "question" | "unverified" }>;
  support: Array<{ name: string; signals: string[] }>;
};

type Page = { page: number; text: string };
const number = (value: string) => Number(value.replace(/[$,%\s,]/g, ""));
function find(pages: Page[], patterns: RegExp[], scale = 1): Evidence | null {
  for (const page of pages) for (const pattern of patterns) {
    const match = page.text.match(pattern);
    if (match?.[1]) {
      const value = number(match[1]) * scale;
      if (Number.isFinite(value) && value >= 0) return {
        value, page: page.page,
        excerpt: page.text.slice(Math.max(0, (match.index ?? 0) - 35), Math.min(page.text.length, (match.index ?? 0) + match[0].length + 35)).replace(/\s+/g, " ").trim().slice(0, 160),
      };
    }
  }
  return null;
}

export function reconcileDocuments(statementName: string, statementPages: Page[], leasePages: Page[], supports: Array<{ name: string; pages: Page[] }>): Reconciliation {
  const share = find(statementPages, [/share billed\s*:?\s*(\d+(?:\.\d+)?)\s*%/i, /(?:stated\s+)?(?:tenant|pro rata|proportionate)\s+share\s*:?\s*(\d+(?:\.\d+)?)\s*%/i]);
  const propertyTotal = find(statementPages, [/total property expenses(?: billed)?\s*:?\s*\$?([\d,]+(?:\.\d{1,2})?)/i, /total (?:cam|operating) expenses\s*:?\s*\$?([\d,]+(?:\.\d{1,2})?)/i]);
  const tenantCharge = find(statementPages, [/\d+(?:\.\d+)?%\s+share of\s+\$[\d,.]+\s+\$([\d,]+(?:\.\d{1,2})?)/i, /(?:tenant charge|tenant's share|tenant share)\s*(?:=|:)\s*\$?([\d,]+(?:\.\d{1,2})?)/i, /(?:tenant|pro rata) allocation\s*:?\s*\$?([\d,]+(?:\.\d{1,2})?)/i]);
  const credits = find(statementPages, [/(?:less )?(?:estimated cam\s*\/\s*nnn payments(?: received)?|estimated payments|payments|credits)\s*\(?\s*\$?([\d,]+(?:\.\d{1,2})?)/i]);
  const balance = find(statementPages, [/(?:balance due|amount due|net due)(?: per this statement)?\s*:?\s*\$?([\d,]+(?:\.\d{1,2})?)/i]);
  const leaseShare = find(leasePages, [/pro rata share is defined as\s+(\d+(?:\.\d+)?)\s*%/i, /pro rata share\s*\((\d+(?:\.\d+)?)\s*%\)/i, /tenant(?:'s|s)? proportionate share\s*(?:is|of|:)\s*(\d+(?:\.\d+)?)\s*%/i]);
  const checks: Reconciliation["checks"] = [];
  if (share && leaseShare) checks.push({ label: "Tenant share", result: Math.abs(share.value - leaseShare.value) < .005 ? `Statement ${share.value}% matches lease ${leaseShare.value}% (statement p. ${share.page}; lease p. ${leaseShare.page}).` : `Statement ${share.value}% differs from lease ${leaseShare.value}% (statement p. ${share.page}; lease p. ${leaseShare.page}). Confirm area definitions, amendments, and category-specific allocations.`, status: Math.abs(share.value - leaseShare.value) < .005 ? "matches" : "question" });
  else checks.push({ label: "Tenant share", result: "A comparable percentage was not reliably extracted from both documents. Check the signed lease, amendments, and area schedule.", status: "unverified" });
  const money = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (share && propertyTotal && tenantCharge) {
    const expected = Math.round(propertyTotal.value * share.value) / 100;
    const difference = Math.abs(expected - tenantCharge.value);
    checks.push({ label: "Statement multiplication", result: `${money(propertyTotal.value)} × ${share.value}% = ${money(expected)}; statement charge ${money(tenantCharge.value)} (statement pp. ${propertyTotal.page}, ${share.page}, ${tenantCharge.page}). ${difference > .02 ? `Difference ${money(difference)} to investigate.` : "Arithmetic matches within rounding."}`, status: difference > .02 ? "question" : "matches" });
  } else checks.push({ label: "Statement multiplication", result: "Property total, billed share, or tenant charge was not reliably extracted; calculation remains unverified.", status: "unverified" });
  if (tenantCharge && credits && balance) {
    const expected = Math.round((tenantCharge.value - credits.value) * 100) / 100;
    const difference = Math.abs(expected - balance.value);
    checks.push({ label: "Balance calculation", result: `${money(tenantCharge.value)} charge less ${money(credits.value)} credits = ${money(expected)}; statement balance ${money(balance.value)} (statement pp. ${tenantCharge.page}, ${credits.page}, ${balance.page}). ${difference > .02 ? `Difference ${money(difference)} to investigate.` : "Arithmetic matches within rounding."}`, status: difference > .02 ? "question" : "matches" });
  } else checks.push({ label: "Balance calculation", result: "Charge, credits, or balance was not reliably extracted; calculation remains unverified.", status: "unverified" });
  const support = supports.map(({ name, pages }) => {
    const signals = [["Invoice", /invoice\s*(?:no|number|#|date)/i], ["Area schedule", /rentable area|area schedule|square feet|\bRSF\b/i], ["Fee basis", /management fee|administrative fee|fee base/i], ["Amortization", /amortization|useful life/i]] as const;
    return { name, signals: signals.flatMap(([label, pattern]) => {
      const page = pages.find((item) => pattern.test(item.text));
      return page ? [`${label} (p. ${page.page})`] : [];
    }) };
  });
  checks.push({ label: "Underlying records", result: support.length ? `${support.length} supporting PDF${support.length === 1 ? "" : "s"} received. Text signals alone do not verify invoice authenticity, cost eligibility, area definitions, or amortization.` : "No supporting records supplied. Request invoices, category ledger, area schedule, fee calculations, and amortization where applicable.", status: "unverified" });
  return { version: 1, statementName, supportNames: supports.map((item) => item.name), statement: { share, propertyTotal, tenantCharge, credits, balance }, leaseShare, checks, support };
}
