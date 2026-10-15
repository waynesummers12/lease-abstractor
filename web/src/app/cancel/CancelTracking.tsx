"use client";

import { useEffect } from "react";
import { trackFunnel } from "@/lib/funnelAnalytics";

export default function CancelTracking() {
  useEffect(() => {
    trackFunnel("checkout_canceled");
  }, []);
  return null;
}
