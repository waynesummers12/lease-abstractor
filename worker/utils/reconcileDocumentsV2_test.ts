import { reconcileDocumentsV2 } from "./reconcileDocumentsV2.ts";

Deno.test("reconciles the full fictional Suite 140 fixture", () => {
  const fixture = JSON.parse(Deno.readTextFileSync(new URL("../../test-fixtures/suite140/extracted-pages.json", import.meta.url)));
  const result = reconcileDocumentsV2("statement-2025.pdf", fixture.statement, fixture.lease, [{ name: "occupancy-schedule-2025.pdf", pages: fixture.schedule }]);
  const byLabel = (label: string) => result.checks.find((item) => item.label === label);
  if (!byLabel("Occupancy schedule")?.result.includes("8,500 vacant")) throw new Error("Occupancy evidence was missed");
  if (!byLabel("Controllable CAM cap")?.result.includes("$9,500.00")) throw new Error("Covered CAM cap screen is wrong");
  if (!byLabel("Roof membrane replacement")?.result.includes("even if amortized")) throw new Error("Roof clause was missed");
  if (byLabel("Statement delivery timing")?.result.includes("138 days") !== true) throw new Error("Delivery timing is wrong");
  const screen = result.scenarios?.correctedScreen;
  if (!screen || screen.centerTotal !== 551520 || screen.tenantCharge !== 66182.4 || screen.alternateBalance !== 4982.4 || screen.difference !== 50970.73) throw new Error("Conditional bill screen is wrong");
  if (result.checks.filter((item) => item.status === "matches").length !== 2) throw new Error("Unexpected matches or false positives");
});

Deno.test("compares current-year figures, payments, and amended lease terms", () => {
  const statement = [
    { page: 1, text: `2024 Actual 2025 Actual
TOTAL OPERATING EXPENSES - CENTER 518,690.00 806,782.50
Controllable CAM 190,000.00 355,000.00
Share basis 7,500 / 62,500 (Center GLA) 7,500 / 54,000 (Occupied GLA)
Tenant's share % 12.0000% 13.8889%
Tenant's share of Total Operating Expenses $62,242.80 $112,053.13
Parking lot sweeping - 2025 service 9,200.00 9,600.00
Parking lot sweeping - annual contract - 9,600.00
Administrative fee - 2024: 10% of CAM; 2025: 15% of Total A+B+C 22,190.00 105,232.50
Regional asset management - allocated salary - 14,500.00
Legal fees - lease enforcement - 7,250.00
Roof membrane replacement - 86,400.00` },
    { page: 2, text: `Delivered to Tenant: September 15, 2026
January 2025 $5,100.00 July 2025 $5,100.00
February 2025 $5,100.00 August 2025 $5,100.00
March 2025 $5,100.00 September 2025 $5,100.00
April 2025 $5,100.00 October 2025 $5,100.00
May 2025 $5,100.00 November 2025 $5,100.00
June 2025 $5,100.00 December 2025 $5,100.00
Less: total estimated payments received ($56,100.00)
BALANCE DUE FROM TENANT $55,953.13` },
  ];
  const lease = [
    { page: 1, text: "1.3 Center GLA 62,500 RSF 1.4 Pro Rata Share 12.00%" },
    { page: 2, text: "CAM Expenses exclude personnel above the level of on-site property manager, fees incurred in negotiating, enforcing or litigating any lease, and replacement of the roof, roof membrane. Section 4.4 replacement of the roof, roof membrane shall not be included even if amortized." },
    { page: 3, text: "Section 4.9 applies Tenant's Pro Rata Share whether or not any space in the Center is occupied or leased. Section 4.11 requires an annual reconciliation statement by April 30. No interest accrues before the thirtieth (30th) day after receipt of the statement. Tenant has within ninety (90) days after receipt of a Reconciliation Statement to object. Section 4.12: if the overcharge exceeds three percent (3%), Landlord shall pay reasonable audit costs." },
    { page: 6, text: `2. Administrative Fee. Section 4.5 is amended by deleting "twelve percent (12%)" and substituting
"ten percent (10%)" for all calendar years beginning with 2024.
3. Limitation on Controllable CAM Expenses. Section 4.6 is amended by deleting "one hundred
six percent (106%)" and substituting "one hundred five percent (105%)" for 2024 onward.
4. Pro Rata Share. Tenant's Pro Rata Share remains
12.00%.` },
  ];
  const result = reconcileDocumentsV2("statement.pdf", statement, lease, []);
  const byLabel = (label: string) => result.checks.find((check) => check.label === label);
  if (result.statement.propertyTotal?.value !== 806782.5 || result.statement.tenantCharge?.value !== 112053.13) throw new Error("Wrong year or amount selected");
  if (result.leaseShare?.page !== 6 || result.leaseShare.value !== 12) throw new Error("Amendment was missed");
  if (byLabel("Share denominator")?.status !== "question") throw new Error("Occupied area was not flagged");
  if (!byLabel("Share denominator")?.result.includes("whether or not space is occupied")) throw new Error("Vacancy clause was missed");
  if (!byLabel("Prior-year share comparison")?.result.includes("12%")) throw new Error("Prior-year share was missed");
  if (!byLabel("Monthly payment ledger")?.result.includes("$5,100.00")) throw new Error("Missing payment was not flagged");
  if (!byLabel("Administrative fee")?.result.includes("10%")) throw new Error("Amended fee was missed");
  if (!byLabel("Controllable CAM cap")?.result.includes("105%")) throw new Error("Amended cap was missed");
  if (!byLabel("Controllable CAM cap")?.result.includes("$155,500.00")) throw new Error("Covered CAM subtotal screen was not calculated");
  if (!byLabel("Roof membrane replacement")?.result.includes("even if amortized")) throw new Error("Roof-specific prohibition was missed");
  if (!byLabel("Statement delivery timing")?.result.includes("138 days")) throw new Error("Late statement was missed");
  if (!byLabel("Payment and interest timing")?.result.includes("October 15, 2026")) throw new Error("Interest timing was missed");
  if (!byLabel("Audit cost shifting")?.result.includes("3%")) throw new Error("Audit-cost threshold was missed");
  if (byLabel("Possible duplicate CAM line")?.status !== "question") throw new Error("Potential duplicate was missed");
  if (result.scenarios?.shareOnly.difference !== 15239.23) throw new Error("Share-only scenario is wrong");
  if (result.scenarios?.selectedExclusions?.difference !== 28217.23) throw new Error("Selected-exclusion scenario is wrong");
  if (result.worksheetRows?.find((item) => item.category === "Roof membrane replacement")?.amountBilled !== 86400) throw new Error("Worksheet did not retain the billed roof charge");
  const withSchedule = reconcileDocumentsV2("statement.pdf", statement, lease, [{ name: "occupancy.pdf", pages: [{ page: 1, text: "Center area schedule: Center GLA 62,500 RSF; occupied area 54,000 RSF; vacant area 8,500 RSF." }] }]);
  if (!withSchedule.checks.some((item) => item.label === "Occupancy schedule")) throw new Error("Supporting area schedule was not reconciled");
  if (withSchedule.checks.find((item) => item.label === "Underlying records")?.result.includes("No supporting records supplied")) throw new Error("Supporting record was ignored");
});
