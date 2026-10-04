export type PortfolioLeaseForAlerts = {
  id: string;
  property_name: string;
  renewal_date: string | null;
};

export type PortfolioAlert = {
  id: string;
  leaseId: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  daysUntil: number;
};

export function daysUntilSavedDate(value: string | null | undefined, today = new Date()): number | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const dateUtc = Date.parse(`${value}T00:00:00Z`);
  if (Number.isNaN(dateUtc)) return null;
  if (new Date(dateUtc).toISOString().slice(0, 10) !== value) return null;
  return Math.round((dateUtc - todayUtc) / 86_400_000);
}

export function getPortfolioAlerts(leases: PortfolioLeaseForAlerts[], today = new Date()): PortfolioAlert[] {
  const alerts: PortfolioAlert[] = [];

  for (const lease of leases) {
    const daysUntil = daysUntilSavedDate(lease.renewal_date, today);
    if (daysUntil === null) continue;
    if (daysUntil > 180) continue;

    const severity = daysUntil <= 30 ? "high" : daysUntil <= 90 ? "medium" : "low";
    const title = daysUntil < 0
      ? "Saved renewal date has passed"
      : daysUntil === 0
        ? "Saved renewal date is today"
        : "Saved renewal date approaching";
    const description = `${lease.property_name || "Unnamed lease"}: saved renewal date ${lease.renewal_date} (${daysUntil < 0 ? `${Math.abs(daysUntil)} days ago` : daysUntil === 0 ? "today" : `in ${daysUntil} days`}). Review the lease terms and confirm any notice deadlines separately.`;

    alerts.push({ id: lease.id, leaseId: lease.id, title, description, severity, daysUntil });
  }

  return alerts.sort((a, b) => a.daysUntil - b.daysUntil);
}
