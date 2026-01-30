"use client";

import { useEffect, useRef, useState } from "react";
import ReviewView from "./View";
import { runAuditPipeline } from "@/lib/audit/runAuditPipeline";

export default function ReviewPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [animatedExposure, setAnimatedExposure] = useState<number | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [auditId, setAuditId] = useState<string | null>(null);
  const [totalAvoidableExposure, setTotalAvoidableExposure] =
    useState<number | null>(null);
  const [exposureRange, setExposureRange] =
    useState<{ low: number; high: number } | null>(null);
  const [exposureRiskLabel, setExposureRiskLabel] =
    useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  async function handleUploadAndAnalyze() {
    if (!file) return;

    setStatus("Preparing audit…");
    setAnalysis(null);

    const newAuditId = crypto.randomUUID();
    setAuditId(newAuditId);

    try {
      setStatus("Uploading lease…");

      const pipelineResult = await runAuditPipeline(file, newAuditId);

      setStatus("Finalizing analysis…");

      if (pipelineResult && "analysis" in pipelineResult) {
        setAnalysis(pipelineResult.analysis);
      } else {
        const res = await fetch(`/api/audits/${newAuditId}`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.analysis) {
            setAnalysis(data.analysis);
          }
        }
      }

      setStatus("Analysis complete ✅");

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error("Analyze failed:", err);
      setStatus(err?.message ?? "Unexpected error");
    }
  }

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

  async function handleCheckout() {
    if (isCheckingOut || !auditId) return;

    setIsCheckingOut(true);
    setStatus("Redirecting to secure checkout…");

    try {
      if (analysis) {
        sessionStorage.setItem("latest_analysis", JSON.stringify(analysis));
      }

      const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;
      const workerKey = process.env.NEXT_PUBLIC_WORKER_KEY;

      if (!workerUrl || !workerKey) {
        throw new Error("Worker not configured");
      }

      const res = await fetch(`${workerUrl}/checkout/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lease-Worker-Key": workerKey,
        },
        body: JSON.stringify({ auditId }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Checkout creation failed");
      }

      const data = await res.json();

      if (!data?.url) {
        throw new Error("Missing checkout URL");
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
