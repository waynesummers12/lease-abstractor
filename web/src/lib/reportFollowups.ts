export type FollowUpTask = {
  key: string;
  group: "First actions" | "Statement questions" | "Lease terms";
  title: string;
  detail: string;
};

type Analysis = {
  health?: { flags?: Array<{ label?: string; recommendation?: string }> };
  reconciliation?: { checks?: Array<{ label?: string; result?: string }> };
};

const clean = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim() ? value.trim().slice(0, 1200) : fallback;

export function reportFollowUpTasks(value: unknown): FollowUpTask[] {
  const analysis = value && typeof value === "object" ? value as Analysis : {};
  const tasks: FollowUpTask[] = [
    {
      key: "first:deadline",
      group: "First actions",
      title: "Confirm the review deadline",
      detail: "Read the signed lease and amendments. Confirm the statement delivery date, notice method, and any objection or audit window before relying on a calculated date.",
    },
    {
      key: "first:records",
      group: "First actions",
      title: "Request the supporting records",
      detail: "Use the records request list in your PDF. Keep the landlord's response, invoices, allocation schedules, and payment ledger with this report.",
    },
  ];

  if (Array.isArray(analysis.reconciliation?.checks)) {
    analysis.reconciliation.checks.slice(0, 100).forEach((check, index) => {
      tasks.push({
        key: `statement:${index}`,
        group: "Statement questions",
        title: clean(check.label, `Statement question ${index + 1}`),
        detail: clean(check.result, "Compare this question with the cited statement and lease pages in the PDF, then verify it against source records."),
      });
    });
  }

  if (Array.isArray(analysis.health?.flags)) {
    analysis.health.flags.slice(0, 100).forEach((flag, index) => {
      tasks.push({
        key: `lease:${index}`,
        group: "Lease terms",
        title: clean(flag.label, `Lease term ${index + 1}`),
        detail: clean(flag.recommendation, "Check the cited lease clause and amendments, then compare it with the billing records."),
      });
    });
  }

  return tasks;
}
