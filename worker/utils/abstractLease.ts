// worker/utils/abstractLease.ts
/**
 * SHARED UTILITY — SAVEONLEASE V1 (LOCKED)
 *
 * Intended use:
 * - utils/*.ts files
 * - Normalization helpers
 * - Pure calculations
 *
 * Rules:
 * - Pure functions only
 * - No side effects
 * - No network calls
 * - No environment variables
 *
 * Safe to use in:
 * - Worker (Deno + Oak)
 * - Next.js API routes
 *
 * NOT safe for client components unless explicitly reviewed.
 */


/* -------------------- NORMALIZATION -------------------- */

function normalizeText(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .replace(/-\n/g, "")
    .replace(/\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/* -------------------- UTILITIES -------------------- */

function extractWithPatterns(text: string, patterns: RegExp[]): string | null {
  for (const p of patterns) {
    const m = text.match(p);
    if (m?.[1]) return m[1].trim();
  }
  return null;
}

function formatMoney(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}

/* -------------------- CORE FIELDS -------------------- */

function extractTenant(text: string): string | null {
  return extractWithPatterns(text, [
    /Tenant[:\s]+([^,.;]+)/i,
    /Lessee[:\s]+([^,.;]+)/i,
  ]);
}

function extractLandlord(text: string): string | null {
  return extractWithPatterns(text, [
    /Landlord[:\s]+([^,.;]+)/i,
    /Lessor[:\s]+([^,.;]+)/i,
  ]);
}

function extractPremises(text: string): string | null {
  return extractWithPatterns(text, [
    /Premises[:\s]+([^.;]+)/i,
    /located at ([^.;]+)/i,
  ]);
}

/* -------------------- DATE EXTRACTION -------------------- */

function extractDate(type: "start" | "end", text: string): string | null {
  if (type === "start") {
    return extractWithPatterns(text, [
      /commence(?:s|ment)? on ([A-Za-z]+ \d{1,2}, \d{4})/i,
      /commencing on ([A-Za-z]+ \d{1,2}, \d{4})/i,
    ]);
  }

  return extractWithPatterns(text, [
    /expir(?:e|ing) on ([A-Za-z]+ \d{1,2}, \d{4})/i,
    /expiration date[:\s]+([A-Za-z]+ \d{1,2}, \d{4})/i,
  ]);
}

/* -------------------- RENT & ESCALATION -------------------- */

export type Rent = {
  base_rent: number | null;
  frequency: "monthly" | "annual" | null;
  escalation_type: "fixed_percent" | "fixed_amount" | "cpi" | "none";
  escalation_value: number | null;
  escalation_interval: "annual" | null;
};

function extractBaseRent(text: string): number | null {
  const v = extractWithPatterns(text, [
    /\$([\d,]+)\s+per\s+month/i,
    /Base Rent[:\s]+\$([\d,]+)/i,
  ]);
  return v ? Number(v.replace(/,/g, "")) : null;
}

function extractFrequency(text: string): Rent["frequency"] {
  if (/per\s+month|monthly/i.test(text)) return "monthly";
  if (/per\s+year|annual/i.test(text)) return "annual";
  return null;
}

function inferFixedEscalationFromText(text: string): number | null {
  const y1 = extractWithPatterns(text, [/Year\s*1:\s*\$([\d,]+)/i]);
  const y2 = extractWithPatterns(text, [/Year\s*2:\s*\$([\d,]+)/i]);
  if (!y1 || !y2) return null;

  const n1 = Number(y1.replace(/,/g, ""));
  const n2 = Number(y2.replace(/,/g, ""));
  return n2 > n1 ? n2 - n1 : null;
}

function extractEscalation(text: string): Rent {
  const pct = extractWithPatterns(text, [
    /increase(?:s)? by (\d+(?:\.\d+)?)%/i,
  ]);

  if (pct) {
    return {
      base_rent: null,
      frequency: null,
      escalation_type: "fixed_percent",
      escalation_value: Number(pct),
      escalation_interval: "annual",
    };
  }

  const fixed = extractWithPatterns(text, [
    /increase(?:s)? by \$([\d,]+)/i,
  ]);

  if (fixed) {
    return {
      base_rent: null,
      frequency: null,
      escalation_type: "fixed_amount",
      escalation_value: Number(fixed.replace(/,/g, "")),
      escalation_interval: "annual",
    };
  }

  if (/CPI|Consumer Price Index/i.test(text)) {
    return {
      base_rent: null,
      frequency: null,
      escalation_type: "cpi",
      escalation_value: null,
      escalation_interval: "annual",
    };
  }

  const inferred = inferFixedEscalationFromText(text);
  if (inferred !== null) {
    return {
      base_rent: null,
      frequency: null,
      escalation_type: "fixed_amount",
      escalation_value: inferred,
      escalation_interval: "annual",
    };
  }

  return {
    base_rent: null,
    frequency: null,
    escalation_type: "none",
    escalation_value: null,
    escalation_interval: null,
  };
}

/* -------------------- RENT SCHEDULE -------------------- */

export type RentScheduleRow = {
  year: number;
  annual_rent: number;
  monthly_rent: number;
};

function buildRentSchedule(
  baseRent: number | null,
  frequency: Rent["frequency"],
  escalationType: Rent["escalation_type"],
  escalationValue: number | null,
  termMonths: number | null
): RentScheduleRow[] {
  if (!baseRent || !frequency || !termMonths) return [];

  const years = Math.ceil(termMonths / 12);
  let annualRent = frequency === "monthly" ? baseRent * 12 : baseRent;
  const rows: RentScheduleRow[] = [];

  for (let y = 1; y <= years; y++) {
    if (y > 1) {
      if (escalationType === "fixed_percent" && escalationValue) {
        annualRent *= 1 + escalationValue / 100;
      }
      if (escalationType === "fixed_amount" && escalationValue) {
        annualRent += escalationValue * 12;
      }
    }

    rows.push({
      year: y,
      annual_rent: Math.round(annualRent),
      monthly_rent: Math.round(annualRent / 12),
    });
  }

  return rows;
}

/* -------------------- CAM / NNN -------------------- */

export type CamNnn = {
  monthly_amount: number | null;
  annual_amount: number | null;
  total_exposure: number | null;
  is_uncapped: boolean;
  reconciliation: boolean;
  pro_rata: boolean;
  includes_capex: boolean;
  cam_cap_percent: number | null;
  escalation_exposure: number | null;
};

function extractCamNnn(text: string, termMonths: number | null): CamNnn {
  const monthly = extractWithPatterns(text, [
    /NNN charges[^$]*\$([\d,]+)\s+per\s+month/i,
    /CAM charges[^$]*\$([\d,]+)\s+per\s+month/i,
  ]);

  const is_uncapped =
    /no cap|without limitation|all operating expenses/i.test(text);

  const reconciliation =
    /annual reconciliation|subject to reconciliation/i.test(text);

  const pro_rata =
    /pro\s*rata\s*share|tenant['’]s share/i.test(text);

  const includes_capex =
    /capital expenses|capital improvements|replacement of roof|structural/i.test(
      text
    );

  const capPct = extractWithPatterns(text, [
    /CAM cap[^%]*(\d+(?:\.\d+)?)%/i,
    /capped at (\d+(?:\.\d+)?)%/i,
  ]);

  if (!monthly) {
    return {
      monthly_amount: null,
      annual_amount: null,
      total_exposure: null,
      is_uncapped,
      reconciliation,
      pro_rata,
      includes_capex,
      cam_cap_percent: capPct ? Number(capPct) : null,
      escalation_exposure: null,
    };
  }

  const monthlyAmount = Number(monthly.replace(/,/g, ""));
  const annualAmount = monthlyAmount * 12;
  const years = termMonths ? termMonths / 12 : 1;
  const totalExposure = annualAmount * years;

  const assumedGrowth = is_uncapped ? 0.06 : 0.03;
  const escalationExposure = annualAmount * assumedGrowth * years;

  return {
    monthly_amount: monthlyAmount,
    annual_amount: annualAmount,
    total_exposure: totalExposure,
    is_uncapped,
    reconciliation,
    pro_rata,
    includes_capex,
    cam_cap_percent: capPct ? Number(capPct) : null,
    escalation_exposure: escalationExposure,
  };
}

/* -------------------- LEASE HEALTH -------------------- */

export type LeaseRiskFlag = {
  code: string;
  label: string;
  severity: "low" | "medium" | "high";
  recommendation: string;
  estimated_impact?: string;
};

export type LeaseHealth = {
  score: number;
  flags: LeaseRiskFlag[];
};

function computeLeaseHealth(input: {
  lease_start: string | null;
  lease_end: string | null;
  term_months: number | null;
  cam_nnn: CamNnn;
}): LeaseHealth {
  const flags: LeaseRiskFlag[] = [];
  let score = 100;

  const baseCam = input.cam_nnn.total_exposure ?? 0;
  const escCam = input.cam_nnn.escalation_exposure ?? 0;
  const totalCam = baseCam + escCam;

  if (input.cam_nnn.monthly_amount) {
    flags.push({
      code: "CAM_TOTAL",
      label: "CAM / NNN charges with escalation risk",
      severity: input.cam_nnn.is_uncapped ? "high" : "medium",
      recommendation:
        "Audit CAM categories, cap annual growth (3–6%), and exclude capital items.",
      estimated_impact: `Most tenants recover ${formatMoney(
        Math.max(totalCam * 0.25, 10000)
      )}`,
    });

    score -= input.cam_nnn.is_uncapped ? 25 : 15;
  }

  if (input.cam_nnn.includes_capex) {
    flags.push({
      code: "CAPEX_IN_CAM",
      label: "Capital expenses included in CAM",
      severity: "high",
      recommendation:
        "Exclude capital improvements or amortize per lease standards.",
      estimated_impact: "Capital items often add $15k–$50k+",
    });
    score -= 15;
  }

  if (input.cam_nnn.pro_rata) {
    flags.push({
      code: "PRO_RATA",
      label: "Pro-rata CAM allocation risk",
      severity: "medium",
      recommendation:
        "Verify rentable area denominator and co-tenancy adjustments.",
      estimated_impact: "Over-allocations commonly exceed 5–10%",
    });
    score -= 10;
  }

  return { score: Math.max(score, 0), flags };
}

/* -------------------- MAIN EXPORT -------------------- */

export function abstractLease(rawText: string) {
  const text = normalizeText(rawText);

  const lease_start = extractDate("start", text);
  const lease_end = extractDate("end", text);

  const term_months =
    lease_start && lease_end
      ? Math.round(
          (new Date(lease_end).getTime() -
            new Date(lease_start).getTime()) /
            (1000 * 60 * 60 * 24 * 30)
        )
      : null;

  const escalation = extractEscalation(text);

  const rent: Rent = {
    base_rent: extractBaseRent(text),
    frequency: extractFrequency(text),
    escalation_type: escalation.escalation_type,
    escalation_value: escalation.escalation_value,
    escalation_interval: escalation.escalation_interval,
  };

  const rent_schedule = buildRentSchedule(
    rent.base_rent,
    rent.frequency,
    rent.escalation_type,
    rent.escalation_value,
    term_months
  );

  const cam_nnn = extractCamNnn(text, term_months);

  const health = computeLeaseHealth({
    lease_start,
    lease_end,
    term_months,
    cam_nnn,
  });

  return {
    tenant: extractTenant(text),
    landlord: extractLandlord(text),
    premises: extractPremises(text),
    lease_start,
    lease_end,
    term_months,
    rent,
    rent_schedule,
    cam_nnn,
    cam_total_avoidable_exposure:
      (cam_nnn.total_exposure ?? 0) +
      (cam_nnn.escalation_exposure ?? 0),
    health,
    raw_preview: text.slice(0, 1500),
  };
}

