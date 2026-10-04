export type AnalysisWaitResult<T> =
  | { status: "ready"; analysis: T }
  | { status: "timeout" | "not-found" | "unavailable" };

function pause(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (ms <= 0 || signal.aborted) return resolve();
    const finish = () => {
      clearTimeout(timer);
      signal.removeEventListener("abort", finish);
      resolve();
    };
    const timer = setTimeout(finish, ms);
    signal.addEventListener("abort", finish, { once: true });
  });
}

export async function waitForAnalysis<T>(
  auditId: string,
  signal: AbortSignal,
  maxDurationMs = 60_000
): Promise<AnalysisWaitResult<T>> {
  const deadline = Date.now() + maxDurationMs;

  while (!signal.aborted && Date.now() < deadline) {
    const remainingMs = deadline - Date.now();
    const request = new AbortController();
    const abortRequest = () => request.abort();
    const requestTimer = setTimeout(abortRequest, Math.min(10_000, remainingMs));
    signal.addEventListener("abort", abortRequest, { once: true });

    try {
      const response = await fetch(`/api/audits/${encodeURIComponent(auditId)}`, {
        cache: "no-store",
        signal: request.signal,
      });
      if (response.status === 404) return { status: "not-found" };
      if (response.status === 401 || response.status === 403) return { status: "unavailable" };
      if (response.ok) {
        const result = await response.json();
        if (result?.status === "failed" || result?.status === "error") {
          return { status: "unavailable" };
        }
        if (result?.analysis && typeof result.analysis === "object") {
          return { status: "ready", analysis: result.analysis as T };
        }
      }
    } catch {
      // A slow request or transient network error can be retried until the deadline.
    } finally {
      clearTimeout(requestTimer);
      signal.removeEventListener("abort", abortRequest);
    }

    await pause(Math.min(2_000, deadline - Date.now()), signal);
  }

  return { status: "timeout" };
}
