type FunnelEvent =
  | "free_preview_started"
  | "upload_submitted"
  | "lease_uploaded"
  | "lease_upload_failed"
  | "lease_preview_viewed"
  | "statement_analysis_started"
  | "statement_analysis_completed"
  | "statement_analysis_failed"
  | "checkout_clicked"
  | "begin_checkout"
  | "checkout_start_failed"
  | "checkout_canceled";

type FunnelParams = Record<string, string | number | boolean>;

export function trackFunnel(event: FunnelEvent, params: FunnelParams = {}) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as typeof window & { dataLayer?: unknown[][] };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push(["event", event, params]);
}
