import { reconcileDocuments, type Evidence, type Reconciliation } from "./reconcileDocuments.ts";

type Page = { page: number; text: string };
type Line = { page: number; text: string };
const money = (value: number) => "$" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const lines = (pages: Page[]): Line[] => pages.flatMap(({ page, text }) => text.split(/\r?\n/).map((text) => ({ page, text: text.trim() })).filter(({ text }) => text));
const number = (text: string) => Number(text.replace(/[$,()\s]/g, ""));
const amounts = (text: string) => [...text.matchAll(/\(?\$?\d{1,3}(?:,\d{3})+(?:\.\d{2})?\)?|\(?\$?\d+\.\d{2}\)?/g)].map((match) => number(match[0]));
const ev = (line: Line, value: number): Evidence => ({ value, page: line.page, excerpt: line.text.slice(0, 160) });
const row = (items: Line[], pattern: RegExp) => items.find(({ text }) => pattern.test(text));
const lastAmount = (line?: Line): Evidence | null => { const found = line ? amounts(line.text) : []; return line && found.length ? ev(line, found[found.length - 1]) : null; };
const value = (items: Line[], pattern: RegExp) => lastAmount(row(items, pattern));

export function reconcileDocumentsV2(statementName: string, statementPages: Page[], leasePages: Page[], supports: Array<{ name: string; pages: Page[] }>): Reconciliation {
  const s = lines(statementPages), l = lines(leasePages);
  const prior = reconcileDocuments(statementName, statementPages, leasePages, supports);
  const leasePage = (pattern: RegExp) => leasePages.find(({ text }) => pattern.test(text.replace(/\s+/g, " ")));
  const checks: Reconciliation["checks"] = [];
  const check = (label: string, result: string, status: "matches" | "question" | "unverified") => checks.push({ label, result, status });
  const shareRow = row(s, /^tenant(?:'s)? share\s*%/i);
  const percent = [...(shareRow?.text ?? "").matchAll(/(\d+(?:\.\d+)?)\s*%/g)].at(-1);
  const share = shareRow && percent ? ev(shareRow, Number(percent[1])) : prior.statement.share;
  const amendedShare = [...leasePages].reverse().find(({ text }) => /pro rata share remains\s*\d+(?:\.\d+)?%/i.test(text.replace(/\s+/g, " ")));
  const leaseRow = [...l].reverse().find(({ text }) => /pro rata share\s+(?:remains|is)|^1\.4 pro rata share/i.test(text) && /\d+(?:\.\d+)?%/.test(text));
  const leasePercent = amendedShare?.text.replace(/\s+/g, " ").match(/pro rata share remains\s*(\d+(?:\.\d+)?)%/i)
    ?? leaseRow?.text.match(/(?:remains|is|share)\s*(\d+(?:\.\d+)?)\s*%/i);
  const leaseShare = leasePercent && (amendedShare || leaseRow) ? ev({ page: amendedShare?.page ?? leaseRow!.page, text: amendedShare ? "Amendment: Tenant's Pro Rata Share remains " + leasePercent[1] + "%" : leaseRow!.text }, Number(leasePercent[1])) : prior.leaseShare;
  const propertyTotal = value(s, /^total operating expenses\s*[-–]\s*(?:center|property)/i)
    ?? value(s, /^total property expenses(?: billed)?\b/i) ?? prior.statement.propertyTotal;
  const tenantCharge = value(s, /^tenant(?:'s)? share of (?:\d{4} )?total operating expenses\b/i)
    ?? value(s, /^tenant (?:charge|allocation)\b/i) ?? prior.statement.tenantCharge;
  const credits = value(s, /^less:\s*total estimated payments received\b/i)
    ?? value(s, /^estimated payments(?: received)?\s*[:=]/i) ?? prior.statement.credits;
  const balance = value(s, /^(?:balance due(?: from tenant)?|amount due|net due)\b/i) ?? prior.statement.balance;
  const basisLine = row(s, /^share basis\b/i);
  const ratios = [...(basisLine?.text ?? "").matchAll(/([\d,]+)\s*\/\s*([\d,]+)/g)];
  const ratio = ratios.at(-1);
  const numerator = ratio ? Number(ratio[1].replaceAll(",", "")) : null;
  const denominator = ratio ? Number(ratio[2].replaceAll(",", "")) : null;

  if (share && leaseShare) {
    const same = Math.abs(share.value - leaseShare.value) < .005;
    check("Tenant share", `Statement ${share.value}% ${same ? "matches" : "differs from"} lease ${leaseShare.value}% (statement p. ${share.page}; lease p. ${leaseShare.page}).${same ? "" : " Confirm the signed amendment and area basis."}`, same ? "matches" : "question");
  } else check("Tenant share", "A comparable percentage was not reliably extracted from both documents. Check the signed lease, amendments, and area schedule.", "unverified");
  const leaseArea = leasePage(/1\.3 Center GLA\s+[\d,]+\s*RSF/i);
  const leaseDenominator = leaseArea?.text.replace(/\s+/g, " ").match(/1\.3 Center GLA\s+([\d,]+)\s*RSF/i);
  if (denominator && leaseDenominator) {
    const stated = Number(leaseDenominator[1].replaceAll(",", ""));
    check("Share denominator", `Statement uses ${numerator?.toLocaleString()}/${denominator.toLocaleString()} RSF (p. ${basisLine!.page}); lease specifies Center GLA ${stated.toLocaleString()} RSF (p. ${leaseArea!.page}).${denominator === stated ? "" : " Request the area schedule; vacancy alone may not permit changing the denominator."}`, denominator === stated ? "matches" : "question");
  }
  if (share && propertyTotal && tenantCharge) {
    const expected = Math.round(propertyTotal.value * (numerator && denominator ? numerator / denominator : share.value / 100) * 100) / 100;
    const diff = Math.abs(expected - tenantCharge.value);
    check("Statement multiplication", `${money(propertyTotal.value)} times ${numerator && denominator ? `${numerator.toLocaleString()}/${denominator.toLocaleString()}` : `${share.value}%`} = ${money(expected)}; stated charge ${money(tenantCharge.value)} (statement pp. ${propertyTotal.page}, ${share.page}, ${tenantCharge.page}). ${diff > .02 ? `Difference ${money(diff)}.` : "Arithmetic matches; lease entitlement to this share remains separate."}`, diff > .02 ? "question" : "matches");
  } else check("Statement multiplication", "Property total, billed share, or tenant charge was not reliably extracted; calculation remains unverified.", "unverified");
  if (leaseShare && propertyTotal && tenantCharge && Math.abs((share?.value ?? leaseShare.value) - leaseShare.value) > .005) {
    const leaseBasisCharge = Math.round(propertyTotal.value * leaseShare.value) / 100;
    const difference = tenantCharge.value - leaseBasisCharge;
    check("Share-only comparison", `Applying the lease's ${leaseShare.value}% share to the statement's unverified ${money(propertyTotal.value)} total gives ${money(leaseBasisCharge)}, versus ${money(tenantCharge.value)} billed: ${money(difference)} difference. This isolates the share change only; it is not an established refund or a corrected expense total.`, "question");
  }
  if (tenantCharge && credits && balance) {
    const expected = Math.round((tenantCharge.value - credits.value) * 100) / 100, diff = Math.abs(expected - balance.value);
    check("Balance calculation", `${money(tenantCharge.value)} less ${money(credits.value)} stated credits = ${money(expected)}; stated balance ${money(balance.value)} (statement pp. ${tenantCharge.page}, ${credits.page}, ${balance.page}). ${diff > .02 ? `Difference ${money(diff)}.` : "The stated subtraction matches; check the monthly ledger separately."}`, diff > .02 ? "question" : "matches");
  } else check("Balance calculation", "Charge, credits, or balance was not reliably extracted; calculation remains unverified.", "unverified");
  const paymentRows = s.flatMap((line) => [...line.text.matchAll(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2}\s+\$([\d,]+\.\d{2})/gi)].map((match) => ({ page: line.page, value: number(match[1]) })));
  if (credits && paymentRows.length) {
    const total = Math.round(paymentRows.reduce((sum, item) => sum + item.value, 0) * 100) / 100;
    const diff = total - credits.value;
    check("Monthly payment ledger", `${paymentRows.length} listed payments total ${money(total)} (statement p. ${paymentRows[0].page}); stated credits are ${money(credits.value)} (p. ${credits.page}). ${Math.abs(diff) > .02 ? `Difference ${money(Math.abs(diff))}; using the listed payments alone would make the balance ${tenantCharge ? money(tenantCharge.value - total) : "unknown"}. Request the payment ledger.` : "Totals match."}`, Math.abs(diff) > .02 ? "question" : "matches");
  }
  const duplicateRows = s.filter(({ text }) => /parking lot sweeping/i.test(text) && /(?:service|contract)/i.test(text));
  if (duplicateRows.length > 1) {
    const billed = duplicateRows.map((line) => lastAmount(line)?.value);
    if (billed.every((item) => item != null) && new Set(billed).size === 1) {
      check("Possible duplicate CAM line", `Two parking-lot sweeping lines each bill ${money(billed[0]!)} (statement p. ${duplicateRows[0].page}). Request invoices and the ledger to determine whether one service was charged twice.`, "question");
    }
  }
  const feeAmendment = [...leasePages].reverse().find(({ text }) => /administrative fee.*substituting.*percent/i.test(text.replace(/\s+/g, " ")));
  const feeRate = feeAmendment?.text.replace(/\s+/g, " ").match(/substituting.*?\((\d+(?:\.\d+)?)%\)/i);
  const fee = row(s, /^administrative fee\s*[-–]/i);
  const billedRate = fee?.text.match(/20\d{2}:\s*(\d+(?:\.\d+)?)%\s+of\s+Total/i);
  if (feeRate && billedRate && fee) check("Administrative fee", `Amendment limits the fee to ${feeRate[1]}% of eligible CAM (lease p. ${feeAmendment!.page}); statement uses ${billedRate[1]}% of total expenses and bills ${money(lastAmount(fee)!.value)} (p. ${fee.page}). Request the fee-base calculation.`, "question");
  const exclusions: Array<[string, RegExp, RegExp]> = [
    ["Regional management salary", /regional asset management.*salary/i, /personnel above the level of on-site property manager/i],
    ["Lease enforcement legal fees", /legal fees.*lease enforcement/i, /fees incurred in negotiating.{0,100}enforcing or litigating any lease/i],
    ["Roof membrane replacement", /roof membrane replacement/i, /replacement of the roof, roof membrane/i],
    ["Ownership-related assessment", /supplemental assessment.*(?:ownership|financing)/i, /supplemental assessment.{0,100}(?:sale|transfer|refinancing|change in ownership)/i],
    ["Portfolio umbrella premium", /umbrella.*(?:portfolio|premium)/i, /umbrella or excess liability/i],
  ];
  for (const [label, statementPattern, leasePattern] of exclusions) {
    const billed = row(s, statementPattern), clause = leasePage(leasePattern), charge = lastAmount(billed);
    if (charge && clause) check(label, `Statement lists ${money(charge.value)} (p. ${billed!.page}); lease appears to exclude this category (p. ${clause.page}). Confirm invoices and allocation before asserting an overcharge.`, "question");
  }
  const capital = row(s, /(?:led|lighting).*retrofit.*total project cost/i);
  const capitalClause = row(l, /capital expenditures may be included.*only if/i);
  if (capital && capitalClause && lastAmount(capital)) check("Capital cost treatment", `Statement lists ${money(lastAmount(capital)!.value)} for a lighting retrofit (p. ${capital.page}); lease permits only qualifying annual amortization (p. ${capitalClause.page}). Request the project and amortization schedule.`, "question");
  const capAmendment = [...leasePages].reverse().find(({ text }) => /limitation on controllable cam expenses.*substituting/i.test(text.replace(/\s+/g, " ")));
  const capSection = capAmendment?.text.replace(/\s+/g, " ").split(/3\. Limitation on Controllable CAM Expenses\./i)[1]?.split(/4\. Pro Rata Share\./i)[0];
  const cap = capSection?.match(/substituting.*?\((\d+(?:\.\d+)?)%\)/i);
  if (cap) check("Controllable CAM cap", `Amendment sets a ${cap[1]}% non-compounding annual controllable CAM cap (lease p. ${capAmendment!.page}). Request eligible prior- and current-year category totals to calculate it.`, "question");
  const delivery = row(s, /delivered to tenant:\s*[A-Z][a-z]+\s+\d{1,2},\s*20\d{2}/i);
  const deliveryDate = delivery?.text.match(/delivered to tenant:\s*([A-Z][a-z]+\s+\d{1,2},\s*20\d{2})/i);
  const reviewClause = leasePage(/within ninety\s*\(90\)\s*days after receipt of a Reconciliation Statement/i);
  if (deliveryDate && reviewClause) {
    const received = new Date(deliveryDate[1] + " UTC");
    if (!Number.isNaN(received.getTime())) {
      const deadline = new Date(received.getTime() + 90 * 86400000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
      check("Review notice window", `Statement says it was delivered ${deliveryDate[1]} (statement p. ${delivery!.page}); lease gives 90 days after receipt to object in writing and request records (lease p. ${reviewClause.page}). If that delivery date is correct, the calculated 90-day date is ${deadline}. Verify actual receipt and notice requirements promptly.`, "question");
    }
  }
  const support = supports.map(({ name, pages }) => {
    const signals = [["Invoice", /invoice\s*(?:no|number|#|date)/i], ["Area schedule", /rentable area|area schedule|square feet|\bRSF\b/i], ["Fee basis", /management fee|administrative fee|fee base/i], ["Amortization", /amortization|useful life/i]] as const;
    return { name, signals: signals.flatMap(([label, pattern]) => { const page = pages.find((item) => pattern.test(item.text)); return page ? [`${label} (p. ${page.page})`] : []; }) };
  });
  check("Underlying records", support.length ? `${support.length} supporting PDFs received. Text signals do not verify authenticity, eligibility, areas, or amortization.` : "No supporting records supplied. Request invoices, category ledger, area schedule, fee calculations, and amortization where applicable.", "unverified");
  return { version: 1, statementName, supportNames: supports.map((item) => item.name), statement: { share, propertyTotal, tenantCharge, credits, balance }, leaseShare, checks, support };
}
