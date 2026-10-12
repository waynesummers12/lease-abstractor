import { reconcileDocumentsV2 } from "./reconcileDocumentsV2.ts";

Deno.test("compares current-year figures, payments, and amended lease terms", () => {
  const statement = [
    { page: 1, text: `2024 Actual 2025 Actual
TOTAL OPERATING EXPENSES - CENTER 518,690.00 806,782.50
Share basis 7,500 / 62,500 (Center GLA) 7,500 / 54,000 (Occupied GLA)
Tenant's share % 12.0000% 13.8889%
Tenant's share of Total Operating Expenses $62,242.80 $112,053.13
Parking lot sweeping - 2025 service 9,200.00 9,600.00
Parking lot sweeping - annual contract - 9,600.00
Administrative fee - 2024: 10% of CAM; 2025: 15% of Total A+B+C 22,190.00 105,232.50` },
    { page: 2, text: `January 2025 $5,100.00 July 2025 $5,100.00
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
  if (!byLabel("Monthly payment ledger")?.result.includes("$5,100.00")) throw new Error("Missing payment was not flagged");
  if (!byLabel("Administrative fee")?.result.includes("10%")) throw new Error("Amended fee was missed");
  if (!byLabel("Controllable CAM cap")?.result.includes("105%")) throw new Error("Amended cap was missed");
  if (byLabel("Possible duplicate CAM line")?.status !== "question") throw new Error("Potential duplicate was missed");
});
