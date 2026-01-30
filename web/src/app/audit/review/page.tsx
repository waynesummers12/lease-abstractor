"use client";

import { useEffect, useRef, useState } from "react";
import ReviewView from "./view";

export default function ReviewPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [animatedExposure, setAnimatedExposure] =
    useState<number | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [auditId, setAuditId] = useState<string | null>(null);

  const [totalAvoidableExposure, setTotalAvoidableExposure] =
    useState<number | null>(null);
  const [exposureRange, setExposureRange] =
    useState<{ low: number; high: number } | null>(null);
  const [exposureRiskLabel, setExposureRiskLabel] =
    useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  /* ---------- UPLOAD + ANALYZE ---------- */

  async function handleUploadAndAnalyze() {
    if (!file) return;

    setStatus("Preparing audit…");
    setAnalysis(null);

    const newAuditId = crypto.randomUUID();
    setAuditId(newAuditId);

    try {
      setStatus("Uploading lease…");

      const form = new FormData();
      form.append("file", file);
      form.append("auditId", newAuditId);

      const res = await fetch("/api/audit/analyze", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setStatus("Finalizing analysis…");

      const pollRes = await fetch(`/api/audit/${newAuditId}`, {
        cache: "no-store",
      });

      if (pollRes.ok) {
        const data = await pollRes.json();
        if (data?.analysis) {
          setAnalysis(data.analysis);
        }
      }

      setStatus(
        analysis
          ? "Analysis complete ✅"
          : "Analysis processing — refresh shortly"
      );

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error("Analyze failed:", err);
      setStatus(err?.message ?? "Unexpected error");
    }
  }

  /* ---------- DERIVE EXPOSURE ---------- */

  useEffect(() => {
    if (!analysis) {
      setTotalAvoidableExposure(null);
      setExposureRange(null);
      setExposureRiskLabel(null);
      setAnimatedExposure(null);
      return;
    }

    const exposure =
      typeof analysis.cam_total_avoidable_exposure === "number"
        ? analysis.cam_total_avoidable_exposure
        : typeof analysis.avoidable_exposure === "number"
        ? analysis.avoidable_exposure
        : null;

    setTotalAvoidableExposure(exposure);
    setExposureRange(analysis.exposure_range ?? null);
    setExposureRiskLabel(
      typeof analysis.exposure_risk === "string"
        ? analysis.exposure_risk.toLowerCase()
        : typeof analysis.risk_level === "string"
        ? analysis.risk_level.toLowerCase()
        : null
    );

    if (exposure == null) {
      setAnimatedExposure(null);
      return;
    }

    setAnimatedExposure(0);

    let current = 0;
    const step = Math.max(Math.floor(exposure / 40), 1);

    const interval = setInterval(() => {
      current += step;
      if (current >= exposure) {
        setAnimatedExposure(exposure);
        clearInterval(interval);
      } else {
        setAnimatedExposure(current);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [analysis]);

  /* ---------- CHECKOUT ---------- */

  async function handleCheckout() {
    if (isCheckingOut || !auditId) return;

    setIsCheckingOut(true);
    setStatus("Redirecting to secure checkout…");

    try {
      if (analysis) {
        sessionStorage.setItem(
          "latest_analysis",
          JSON.stringify(analysis)
        );
      }

      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId }),
      });

      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error("Checkout creation failed");
      }

      window.location.href = data.url;
    } catch (err: any) {
      console.error("Checkout error:", err);
      setStatus(err?.message ?? "Checkout failed. Please try again.");
      setIsCheckingOut(false);
    }
  }

  return (
    <ReviewView
      file={file}
      setFile={setFile}
      status={status}
      analysis={analysis}
      animatedExposure={animatedExposure}
      totalAvoidableExposure={totalAvoidableExposure}
      exposureRange={exposureRange}
      exposureRiskLabel={exposureRiskLabel}
      isCheckingOut={isCheckingOut}
      resultsRef={resultsRef}
      onUploadAndAnalyze={handleUploadAndAnalyze}
      onCheckout={handleCheckout}
    />
  );
}
