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
  const sharePercents = [...(shareRow?.text ?? "").matchAll(/(\d+(?:\.\d+)?)\s*%/g)];
  const percent = sharePercents.at(-1);
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
  const worksheetRows: NonNullable<Reconciliation["worksheetRows"]> = [];
  let scenarios: Reconciliation["scenarios"];
  let listedPayments: number | null = null;
  let capScreen: { prior: number; current: number; limit: number } | null = null;

  if (share && leaseShare) {
    const same = Math.abs(share.value - leaseShare.value) < .005;
    check("Tenant share", `Statement ${share.value}% ${same ? "matches" : "differs from"} lease ${leaseShare.value}% (statement p. ${share.page}; lease p. ${leaseShare.page}).${same ? "" : " Confirm the signed amendment and area basis."}`, same ? "matches" : "question");
  } else check("Tenant share", "A comparable percentage was not reliably extracted from both documents. Check the signed lease, amendments, and area schedule.", "unverified");
  if (shareRow && sharePercents.length >= 2) {
    const priorShare = Number(sharePercents[0][1]);
    if (Math.abs(priorShare - share!.value) > .005) check("Prior-year share comparison", `The same statement shows ${priorShare}% for the prior year and ${share!.value}% for the current year (statement p. ${shareRow.page}). Request the dated area and allocation schedules explaining the change.`, "question");
  }
  const leaseArea = leasePage(/1\.3 Center GLA\s+[\d,]+\s*RSF/i);
  const leaseDenominator = leaseArea?.text.replace(/\s+/g, " ").match(/1\.3 Center GLA\s+([\d,]+)\s*RSF/i);
  if (denominator && leaseDenominator) {
    const stated = Number(leaseDenominator[1].replaceAll(",", ""));
    const vacancyClause = leasePage(/whether or not any space.{0,45}occupied or leased/i);
    check("Share denominator", `Statement uses ${numerator?.toLocaleString()}/${denominator.toLocaleString()} RSF (p. ${basisLine!.page}); lease specifies Center GLA ${stated.toLocaleString()} RSF (p. ${leaseArea!.page}).${denominator === stated ? "" : vacancyClause ? ` The lease applies the share whether or not space is occupied or leased (lease p. ${vacancyClause.page}); request the area schedule and explanation for the smaller denominator.` : " Request the area schedule and lease basis for the smaller denominator."}`, denominator === stated ? "matches" : "question");
    for (const support of supports) {
      const schedule = support.pages.find(({ text }) => /(?:center|total).{0,50}(?:GLA|area|RSF)|(?:occupied|vacant)/i.test(text.replace(/\s+/g, " ")));
      const content = schedule?.text.replace(/\s+/g, " ") ?? "";
      const hasCenter = new RegExp(`\\b${stated.toLocaleString("en-US")}\\b`).test(content);
      const hasOccupied = new RegExp(`\\b${denominator.toLocaleString("en-US")}\\b`).test(content);
      const vacant = stated - denominator;
      const hasVacant = vacant > 0 && new RegExp(`\\b${vacant.toLocaleString("en-US")}\\b`).test(content);
      if (schedule && hasCenter && hasOccupied && hasVacant) {
        check("Occupancy schedule", `${support.name} p. ${schedule.page} lists ${stated.toLocaleString()} RSF total, ${denominator.toLocaleString()} occupied, and ${vacant.toLocaleString()} vacant. The occupied-area denominator on the statement is consistent with this schedule, but Section 4.9 may still require the full Center GLA for tenant share. Confirm dates and area definitions.`, "question");
        break;
      }
    }
  }
  if (share && propertyTotal && tenantCharge) {
    const expected = Math.round(propertyTotal.value * (numerator && denominator ? numerator / denominator : share.value / 100) * 100) / 100;
    const diff = Math.abs(expected - tenantCharge.value);
    check("Statement multiplication", `${money(propertyTotal.value)} times ${numerator && denominator ? `${numerator.toLocaleString()}/${denominator.toLocaleString()}` : `${share.value}%`} = ${money(expected)}; stated charge ${money(tenantCharge.value)} (statement pp. ${propertyTotal.page}, ${share.page}, ${tenantCharge.page}). ${diff > .02 ? `Difference ${money(diff)}.` : "Arithmetic matches; lease entitlement to this share remains separate."}`, diff > .02 ? "question" : "matches");
  } else check("Statement multiplication", "Property total, billed share, or tenant charge was not reliably extracted; calculation remains unverified.", "unverified");
  if (leaseShare && propertyTotal && tenantCharge && Math.abs((share?.value ?? leaseShare.value) - leaseShare.value) > .005) {
    const leaseBasisCharge = Math.round(propertyTotal.value * leaseShare.value) / 100;
    const difference = Math.round((tenantCharge.value - leaseBasisCharge) * 100) / 100;
    check("Share-only comparison", `Applying the lease's ${leaseShare.value}% share to the statement's unverified ${money(propertyTotal.value)} total gives ${money(leaseBasisCharge)}, versus ${money(tenantCharge.value)} billed: ${money(difference)} difference. This isolates the share change only; it is not an established refund or a corrected expense total.`, "question");
    scenarios = { shareOnly: { charge: leaseBasisCharge, difference } };
    worksheetRows.push({ category: "Tenant share", amountBilled: tenantCharge.value, leaseBasis: `${leaseShare.value}% of stated total`, difference: money(difference), statementPage: tenantCharge.page, leasePage: leaseShare.page });
  }
  if (tenantCharge && credits && balance) {
    const expected = Math.round((tenantCharge.value - credits.value) * 100) / 100, diff = Math.abs(expected - balance.value);
    check("Balance calculation", `${money(tenantCharge.value)} less ${money(credits.value)} stated credits = ${money(expected)}; stated balance ${money(balance.value)} (statement pp. ${tenantCharge.page}, ${credits.page}, ${balance.page}). ${diff > .02 ? `Difference ${money(diff)}.` : "The stated subtraction matches; check the monthly ledger separately."}`, diff > .02 ? "question" : "matches");
  } else check("Balance calculation", "Charge, credits, or balance was not reliably extracted; calculation remains unverified.", "unverified");
  const paymentRows = s.flatMap((line) => [...line.text.matchAll(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2}\s+\$([\d,]+\.\d{2})/gi)].map((match) => ({ page: line.page, value: number(match[1]) })));
  if (credits && paymentRows.length) {
    const total = Math.round(paymentRows.reduce((sum, item) => sum + item.value, 0) * 100) / 100;
    if (paymentRows.length === 12) listedPayments = total;
    const diff = total - credits.value;
    check("Monthly payment ledger", `${paymentRows.length} listed payments total ${money(total)} (statement p. ${paymentRows[0].page}); stated credits are ${money(credits.value)} (p. ${credits.page}). ${diff > .02 ? `The statement may be short-crediting ${money(diff)} if every listed payment was received; using those payments would make the balance ${tenantCharge ? money(tenantCharge.value - total) : "unknown"}. Request the payment ledger.` : diff < -.02 ? `Stated credits exceed the listed payments by ${money(-diff)}; request the payment ledger.` : "Totals match."}`, Math.abs(diff) > .02 ? "question" : "matches");
    if (Math.abs(diff) > .02) {
      worksheetRows.push({ category: "Payment credits", amountBilled: credits.value, leaseBasis: "Listed monthly payments", difference: money(Math.abs(diff)), statementPage: credits.page });
      if (scenarios && diff > .02) scenarios.paymentCredit = { listed: total, stated: credits.value, difference: diff };
    }
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
  if (feeRate && billedRate && fee) {
    check("Administrative fee", `Amendment limits the fee to ${feeRate[1]}% of eligible CAM (lease p. ${feeAmendment!.page}); statement uses ${billedRate[1]}% of total expenses and bills ${money(lastAmount(fee)!.value)} (p. ${fee.page}). Request the fee-base calculation.`, "question");
    worksheetRows.push({ category: "Administrative fee", amountBilled: lastAmount(fee)!.value, leaseBasis: `${feeRate[1]}% of eligible CAM`, difference: "Base unverified", statementPage: fee.page, leasePage: feeAmendment!.page });
  }
  const exclusions: Array<[string, RegExp, RegExp]> = [
    ["Regional management salary", /regional asset management.*salary/i, /personnel above the level of on-site property manager/i],
    ["Lease enforcement legal fees", /legal fees.*lease enforcement/i, /fees incurred in negotiating.{0,100}enforcing or litigating any lease/i],
    ["Roof membrane replacement", /roof membrane replacement/i, /replacement of the roof, roof membrane/i],
    ["Ownership-related assessment", /supplemental assessment.*(?:ownership|financing)/i, /supplemental assessment.{0,100}(?:sale|transfer|refinancing|change in ownership)/i],
    ["Portfolio umbrella premium", /umbrella.*(?:portfolio|premium)/i, /umbrella or excess liability/i],
  ];
  const selected: Array<{ label: string; amount: number }> = [];
  for (const [label, statementPattern, leasePattern] of exclusions) {
    const billed = row(s, statementPattern), clause = leasePage(leasePattern), charge = lastAmount(billed);
    if (charge && clause) {
      const roofClause = label === "Roof membrane replacement" ? leasePage(/replacement of the roof.{0,250}(?:even if|whether or not|amortiz|not be included)/i) : null;
      check(label, label === "Roof membrane replacement" && roofClause
        ? `Statement lists ${money(charge.value)} (p. ${billed!.page}); the lease separately bars roof replacement even if amortized (lease p. ${roofClause.page}). Confirm the invoice and allocation before calculating a tenant-level difference.`
        : `Statement lists ${money(charge.value)} (p. ${billed!.page}); lease appears to exclude this category (p. ${clause.page}). Confirm invoices and allocation before asserting an overcharge.`, "question");
      worksheetRows.push({ category: label, amountBilled: charge.value, leaseBasis: "Excluded; verify", difference: leaseShare ? money(Math.round(charge.value * leaseShare.value) / 100) : "Pending", statementPage: charge.page, leasePage: clause.page });
      if (["Regional management salary", "Lease enforcement legal fees", "Roof membrane replacement"].includes(label)) selected.push({ label, amount: charge.value });
    }
  }
  if (scenarios && selected.length === 3 && propertyTotal && tenantCharge && leaseShare) {
    const centerAmount = selected.reduce((sum, item) => sum + item.amount, 0);
    const charge = Math.round((propertyTotal.value - centerAmount) * leaseShare.value) / 100;
    scenarios.selectedExclusions = { categories: selected.map((item) => item.label), centerAmount, charge, difference: Math.round((tenantCharge.value - charge) * 100) / 100 };
  }
  const capital = row(s, /(?:led|lighting).*retrofit.*total project cost/i);
  const capitalClause = row(l, /capital expenditures may be included.*only if/i);
  if (capital && capitalClause && lastAmount(capital)) check("Capital cost treatment", `Statement lists ${money(lastAmount(capital)!.value)} for a lighting retrofit (p. ${capital.page}); lease permits only qualifying annual amortization (p. ${capitalClause.page}). Request the project and amortization schedule.`, "question");
  const capAmendment = [...leasePages].reverse().find(({ text }) => /limitation on controllable cam expenses.*substituting/i.test(text.replace(/\s+/g, " ")));
  const capSection = capAmendment?.text.replace(/\s+/g, " ").split(/3\. Limitation on Controllable CAM Expenses\./i)[1]?.split(/4\. Pro Rata Share\./i)[0];
  const cap = capSection?.match(/substituting.*?\((\d+(?:\.\d+)?)%\)/i);
  if (cap) {
    const subtotal = row(s, /^(?:total\s+)?controllable\s+(?:cam|operating expenses)\b/i);
    const totals = subtotal ? amounts(subtotal.text) : [];
    const coveredPatterns = [
      /landscap/i, /parking lot sweeping.*(?:service|contract)/i, /janitorial/i,
      /(?:general.*(?:repair|maintenance)|repairs?\s*&\s*maintenance\s*-\s*general)/i, /lighting.*repair/i,
      /security/i, /trash/i, /on.site (?:property )?manager/i,
    ];
    const coveredRows = coveredPatterns.map((pattern) => s.find((item) => pattern.test(item.text) && amounts(item.text).length >= 2));
    const leaseCategories = leasePage(/landscap.{0,200}(?:sweep|janitorial)/i);
    const categoryTotals = coveredRows.every(Boolean) && leaseCategories ? {
      prior: coveredRows.reduce((sum, item) => sum + amounts(item!.text).at(-2)!, 0),
      current: coveredRows.reduce((sum, item) => sum + amounts(item!.text).at(-1)!, 0),
      page: coveredRows[0]!.page,
    } : null;
    if ((subtotal && totals.length >= 2) || categoryTotals) {
      const priorTotal = categoryTotals?.prior ?? totals[totals.length - 2];
      const currentTotal = categoryTotals?.current ?? totals[totals.length - 1];
      const statementPage = categoryTotals?.page ?? subtotal!.page;
      const limit = Math.round(priorTotal * Number(cap[1])) / 100;
      capScreen = { prior: priorTotal, current: currentTotal, limit };
      const variance = Math.round((currentTotal - limit) * 100) / 100;
      check("Controllable CAM cap", `Amendment states a ${cap[1]}% non-compounding limit (lease p. ${capAmendment!.page}). ${categoryTotals ? "Eight identifiable covered lines total" : "Statement subtotal is"} ${money(priorTotal)} in the prior year and ${money(currentTotal)} in the current year (statement p. ${statementPage}); ${cap[1]}% of the prior base is ${money(limit)}. ${variance > .02 ? `The current amount exceeds that screen by ${money(variance)} center-wide.` : "The current amount is within that screen."} This excludes apparent duplicate and expressly excepted lines. Confirm category mapping, base-year treatment, and exceptions before asserting a tenant overcharge.`, variance > .02 ? "question" : "unverified");
      worksheetRows.push({ category: "Controllable CAM cap", amountBilled: currentTotal, leaseBasis: `${cap[1]}% of ${money(priorTotal)}`, difference: variance > .02 ? money(variance) : "Within screen", statementPage, leasePage: capAmendment!.page });
    } else check("Controllable CAM cap", `Amendment sets a ${cap[1]}% non-compounding annual controllable CAM cap (lease p. ${capAmendment!.page}). The statement does not identify a reliable covered-CAM subtotal in both years; request category mapping and calculate the cap from eligible lines.`, "question");
  }
  const snow = value(s, /^snow\s*&\s*ice removal/i);
  const utilities = value(s, /^common area utilities/i);
  const taxes = value(s, /^real property taxes\s*-/i);
  const insurance = value(s, /^property\s*&\s*commercial general liability\s*-/i);
  const feeBaseClause = leasePage(/administrative fee.{0,350}excluding from the fee base all Taxes/i);
  const capExceptionClause = leasePage(/Controllable CAM Expenses.{0,550}(?:snow|utilities|taxes|insurance)/i);
  const amortizationClause = leasePage(/ten\s*\(10\)\s*years for lighting and electrical improvements/i);
  const capitalAmount = lastAmount(capital)?.value;
  if (scenarios && capScreen && snow && utilities && taxes && insurance && feeRate && feeBaseClause && capExceptionClause && amortizationClause && capitalAmount && leaseShare && listedPayments != null && balance) {
    const amortizedCapital = Math.round(capitalAmount / 10 * 100) / 100;
    const covered = Math.min(capScreen.current, capScreen.limit);
    const admin = Math.round((covered + snow.value) * Number(feeRate[1])) / 100;
    const centerTotal = Math.round((covered + snow.value + utilities.value + amortizedCapital + admin + taxes.value + insurance.value) * 100) / 100;
    const tenantCharge = Math.round(centerTotal * leaseShare.value) / 100;
    const alternateBalance = Math.round((tenantCharge - listedPayments) * 100) / 100;
    scenarios.correctedScreen = { centerTotal, tenantCharge, listedPayments, alternateBalance, billedBalance: balance.value, difference: Math.round((balance.value - alternateBalance) * 100) / 100, capBase: capScreen.prior, capLimit: capScreen.limit, amortizedCapital };
    check("Conditional corrected bill screen", `If the eight covered CAM lines are eligible, the 105% cap applies, excluded and duplicate charges are removed, the LED project qualifies for ten-year amortization, and all 12 listed payments cleared, the center pool would be ${money(centerTotal)}, the ${leaseShare.value}% tenant charge ${money(tenantCharge)}, and the alternate balance ${money(alternateBalance)} versus ${money(balance.value)} billed. The ${money(balance.value - alternateBalance)} difference combines overlapping issues and is not a verified refund. Obtain invoices, amortization schedule, area records, and payment ledger before relying on it.`, "question");
  }
  const delivery = row(s, /delivered to tenant:\s*[A-Z][a-z]+\s+\d{1,2},\s*20\d{2}/i);
  const deliveryDate = delivery?.text.match(/delivered to tenant:\s*([A-Z][a-z]+\s+\d{1,2},\s*20\d{2})/i);
  const reviewClause = leasePage(/within ninety\s*\(90\)\s*days after receipt of a Reconciliation Statement/i);
  if (deliveryDate && reviewClause) {
    const received = new Date(deliveryDate[1] + " UTC");
    if (!Number.isNaN(received.getTime())) {
      const yearHeader = [...statementPages.map(({ text }) => text).join(" ").matchAll(/\b(20\d{2})\s+(?:Actual|annual|operating expense|CAM)\b/gi)].at(-1);
      const statementYear = Number(statementName.match(/20\d{2}/)?.[0] ?? yearHeader?.[1]);
      const timingClause = leasePage(/(?:April\s+30|one hundred twenty\s*\(120\)\s*days).{0,120}(?:statement|reconciliation)|(?:statement|reconciliation).{0,120}(?:April\s+30|one hundred twenty\s*\(120\)\s*days)/i);
      if (timingClause && Number.isFinite(statementYear)) {
        const due = /April\s+30/i.test(timingClause.text)
          ? new Date(Date.UTC(statementYear + 1, 3, 30))
          : new Date(Date.UTC(statementYear, 11, 31) + 120 * 86400000);
        const dueLabel = due.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
        const lateDays = Math.round((received.getTime() - due.getTime()) / 86400000);
        if (lateDays > 0) check("Statement delivery timing", `The statement says it was delivered ${deliveryDate[1]} (p. ${delivery!.page}), ${lateDays} days after ${dueLabel}. The lease appears to require delivery by that date (lease p. ${timingClause.page}). Verify actual receipt and the signed clause; ask the landlord to explain the delay.`, "question");
      }
      const interestClause = leasePage(/(?:interest|late charge).{0,160}(?:thirtieth|\(30\)|30th|30\s+days).{0,100}(?:receipt|statement)|(?:thirtieth|\(30\)|30th|30\s+days).{0,100}(?:receipt|statement).{0,120}interest/i);
      if (interestClause) {
        const due = new Date(received.getTime() + 30 * 86400000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
        check("Payment and interest timing", `The lease appears to delay interest until 30 days after statement receipt (lease p. ${interestClause.page}). If receipt was ${deliveryDate[1]}, that date is ${due}. Confirm the actual receipt date and exact payment language before relying on it.`, "question");
      }
      const deadline = new Date(received.getTime() + 90 * 86400000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
      check("Review notice window", `Statement says it was delivered ${deliveryDate[1]} (statement p. ${delivery!.page}); lease gives 90 days after receipt to object in writing and request records (lease p. ${reviewClause.page}). If that delivery date is correct, the calculated 90-day date is ${deadline}. Verify actual receipt and notice requirements promptly.`, "question");
    }
  }
  const auditCostClause = leasePage(/(?:overcharge|overstatement).{0,90}(?:three\s+percent|3%).{0,130}(?:audit|cost)|(?:audit|cost).{0,130}(?:overcharge|overstatement).{0,90}(?:three\s+percent|3%)/i);
  if (auditCostClause) {
    const threshold = /(?:3%|three\s+percent).{0,25}(?:or more|or greater)|(?:at least|equal to or greater than).{0,25}(?:3%|three\s+percent)/i.test(auditCostClause.text) ? "is 3% or more" : "exceeds 3%";
    check("Audit cost shifting", `The lease appears to shift reasonable audit costs to the landlord when the proven overcharge ${threshold} (lease p. ${auditCostClause.page}). The threshold cannot be tested from the statement alone; confirm the exact clause and substantiated overcharge.`, "question");
  }
  const support = supports.map(({ name, pages }) => {
    const signals = [["Invoice", /invoice\s*(?:no|number|#|date)/i], ["Area schedule", /rentable area|area schedule|square feet|\bRSF\b/i], ["Fee basis", /management fee|administrative fee|fee base/i], ["Amortization", /amortization|useful life/i]] as const;
    return { name, signals: signals.flatMap(([label, pattern]) => { const page = pages.find((item) => pattern.test(item.text)); return page ? [`${label} (p. ${page.page})`] : []; }) };
  });
  check("Underlying records", support.length ? `${support.length} supporting PDFs received. Text signals do not verify authenticity, eligibility, areas, or amortization.` : "No supporting records supplied. Request invoices, category ledger, area schedule, fee calculations, and amortization where applicable.", "unverified");
  const leaseTerms = {
    ...(feeRate && feeAmendment ? { adminFeeRate: ev({ page: feeAmendment.page, text: "Amended administrative fee " + feeRate[1] + "%" }, Number(feeRate[1])) } : {}),
    ...(cap && capAmendment ? { camCapMultiplier: ev({ page: capAmendment.page, text: "Amended controllable CAM limit " + cap[1] + "%" }, Number(cap[1])) } : {}),
  };
  return { version: 1, statementName, supportNames: supports.map((item) => item.name), statement: { share, propertyTotal, tenantCharge, credits, balance }, leaseShare, leaseTerms, checks, support, worksheetRows, scenarios };
}
