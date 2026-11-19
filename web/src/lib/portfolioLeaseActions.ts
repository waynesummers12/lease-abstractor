export type PortfolioLeaseAction = {
  id: string;
  lease_id: string;
  title: string;
  owner_name: string;
  due_date: string | null;
  source_note: string | null;
  category: "renewal" | "billing" | "insurance" | "maintenance" | "other";
  completed_at: string | null;
  created_at: string;
};

export function actionDateLabel(value: string | null) {
  if (!value) return "Date to confirm";
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function actionTiming(value: string | null, today = new Date()) {
  if (!value) return "Date to confirm";
  const [year, month, day] = value.split("-").map(Number);
  const dueDay = Date.UTC(year, month - 1, day);
  const todayDay = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const days = Math.round((dueDay - todayDay) / 86_400_000);
  if (days < 0) return `${Math.abs(days)} day${days === -1 ? "" : "s"} past saved date`;
  if (days === 0) return "Saved date is today";
  return `${days} day${days === 1 ? "" : "s"} until saved date`;
}
