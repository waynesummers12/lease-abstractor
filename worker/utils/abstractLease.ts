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

/**
 * Conservative CAM estimator when leases reference NNN / CAM
 * but do not specify dollar amounts.
 *
 * Uses rent-based heuristics commonly applied in tenant audits.
 */
function estimateCamFromRent(
  text: string,
  annualRent: number | null
): number | null {
  if (!annualRent) return null;

  // Conservative default
  let ratio = 0.15;

  if (/industrial|warehouse/i.test(text)) ratio = 0.08;
  if (/office/i.test(text)) ratio = 0.18;
  if (/retail|shopping center|plaza/i.test(text)) ratio = 0.2;

  return Math.round(annualRent * ratio);
}

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
    /Tenant:\s*([A-Z][A-Za-z0-9 &.,'-]{3,})/,
    /Lessee:\s*([A-Z][A-Za-z0-9 &.,'-]{3,})/,
  ]);
}

function extractLandlord(text: string): string | null {
  return extractWithPatterns(text, [
    /Landlord:\s*([A-Z][A-Za-z0-9 &.,'-]{3,})/,
    /Lessor:\s*([A-Z][A-Za-z0-9 &.,'-]{3,})/,
  ]);
}

function extractPremises(text: string): string | null {
  return extractWithPatterns(text, [
    /Premises:\s*([^.;]+)/i,
    /located at\s+([^.;]+)/i,
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

  // 🔥 CAM escalation exposure
  escalation_low: number | null;
  escalation_high: number | null;

  // 🔥 Capital items amortization (NEW)
  capital_items_low: number | null;
  capital_items_high: number | null;
};

function extractCamNnn(
  text: string,
  termMonths: number | null,
  annualRent?: number | null
): CamNnn {
  const monthlyExplicit = extractWithPatterns(text, [
    /NNN charges[^$]*\$([\d,]+)\s+per\s+month/i,
    /CAM charges[^$]*\$([\d,]+)\s+per\s+month/i,
  ]);

  const referencesCam =
  /(CAM|NNN|operating expenses|common area|pro\s*rata)/i.test(text);

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

  let monthlyAmount: number | null = null;

  // 1️⃣ Explicit CAM / NNN dollar amount
  if (monthlyExplicit) {
    monthlyAmount = Number(monthlyExplicit.replace(/,/g, ""));
  }

  // 2️⃣ Fallback: estimate CAM from rent if referenced but not priced
if (!monthlyAmount && referencesCam && annualRent) {
  const estimatedAnnual = estimateCamFromRent(text, annualRent);
  if (estimatedAnnual) {
    monthlyAmount = Math.round(estimatedAnnual / 12);
  }
}

// 3️⃣ Structural CAM fallback (no rent available)
if (!monthlyAmount && referencesCam) {
  // Conservative baseline monthly CAM by property type
  let assumedMonthly = 2000; // default floor

  if (/retail|shopping center|plaza/i.test(text)) {
    assumedMonthly = 3500;
  } else if (/office/i.test(text)) {
    assumedMonthly = 2800;
  } else if (/industrial|warehouse/i.test(text)) {
    assumedMonthly = 1500;
  }

  monthlyAmount = assumedMonthly;
}

console.log("[CAM DEBUG]", {
  monthlyAmount,
  referencesCam,
  annualRent,
  is_uncapped,
  reconciliation,
  pro_rata,
  includes_capex,
});

  if (!monthlyAmount) {
  return {
    monthly_amount: null,
    annual_amount: null,
    total_exposure: null,

    // Escalation placeholders (required by CamNnn)
    escalation_low: null,
    escalation_high: null,

    // Capital items placeholders
    capital_items_low: null,
    capital_items_high: null,

    is_uncapped,
    reconciliation,
    pro_rata,
    includes_capex,
    cam_cap_percent: capPct ? Number(capPct) : null,
  };
}

  const annualAmount = monthlyAmount * 12;
  /* ---------- CAPITAL ITEMS AMORTIZATION ---------- */
/**
 * Conservative assumption:
 * - 10–20% of annual CAM is capital improperly passed through
 * - Amortized over 10 years
 */
let capitalItemsLow: number | null = null;
let capitalItemsHigh: number | null = null;

if (includes_capex && annualAmount > 0) {
  const capitalPortionLow = annualAmount * 0.10;
  const capitalPortionHigh = annualAmount * 0.20;

  // Annualized exposure (amortized)
  capitalItemsLow = Math.round(capitalPortionLow / 10);
  capitalItemsHigh = Math.round(capitalPortionHigh / 10);
}
  const years = termMonths ? termMonths / 12 : 1;
  const totalExposure = annualAmount * years;

  // 📈 CAM escalation exposure (next 12 months, conservative)
let escalation_low: number | null = null;
let escalation_high: number | null = null;

if (is_uncapped && annualAmount) {
  escalation_low = Math.round(annualAmount * 0.10); // conservative
  escalation_high = Math.round(annualAmount * 0.25); // aggressive
}

return {
  monthly_amount: monthlyAmount,
  annual_amount: annualAmount,
  total_exposure: totalExposure,

  is_uncapped,
  reconciliation,
  pro_rata,
  includes_capex,
  cam_cap_percent: capPct ? Number(capPct) : null,

  capital_items_low: capitalItemsLow,
  capital_items_high: capitalItemsHigh,

  escalation_low,
  escalation_high,
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
  confidence: number;
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
  let confidence = 100;

  const baseCam = input.cam_nnn.annual_amount ?? 0;

  /* ---------- CAPITAL EXPENDITURES ---------- */
  if (input.cam_nnn.includes_capex && baseCam > 0) {
    const capexExposure = baseCam * 0.2;

    flags.push({
      code: "CAPEX_IN_CAM",
      label: "Capital expenditures included in CAM",
      severity: capexExposure > 15000 ? "high" : "medium",
      recommendation:
        "Capital improvements should be excluded from CAM or amortized over useful life per lease standards.",
      estimated_impact: formatMoney(capexExposure),
    });

    score -= capexExposure > 15000 ? 20 : 10;
    confidence -= capexExposure > 15000 ? 15 : 8;
  }

  /* ---------- PRO-RATA ALLOCATION ---------- */
  if (input.cam_nnn.pro_rata && baseCam > 0) {
    const proRataExposure = baseCam * 0.08;

    flags.push({
      code: "PRO_RATA",
      label: "Pro-rata CAM allocation risk",
      severity: proRataExposure > 8000 ? "medium" : "low",
      recommendation:
        "Verify rentable-area denominator, confirm vacant space is excluded, and ensure any gross-up or co-tenancy adjustments are applied correctly.",
      estimated_impact: formatMoney(proRataExposure),
    });

    score -= proRataExposure > 8000 ? 10 : 5;
    confidence -= proRataExposure > 8000 ? 8 : 4;
  }

  /* ---------- STRUCTURAL CONFIDENCE ADJUSTMENTS ---------- */
  if (!input.cam_nnn.annual_amount) confidence -= 25;
  if (!input.term_months) confidence -= 15;
  if (input.cam_nnn.is_uncapped) confidence -= 10;

  /* ---------- FINAL NORMALIZATION ---------- */
  score = Math.max(0, Math.min(100, score));
  confidence = Math.max(30, Math.min(100, confidence));

  return {
    score,
    confidence,
    flags,
  };
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

  const annualRent =
  rent.base_rent && rent.frequency === "monthly"
    ? rent.base_rent * 12
    : rent.base_rent;

const cam_nnn = extractCamNnn(text, term_months, annualRent);

  const health = computeLeaseHealth({
    lease_start,
    lease_end,
    term_months,
    cam_nnn,
  });

  return {
  tenant: extractTenant(text) || null,
  landlord: extractLandlord(text) || null,
  premises: extractPremises,

  lease_start,
  lease_end,
  term_months,

  rent,
  rent_schedule,

  cam_nnn,

  /* -------------------- CORE EXPOSURE -------------------- */
  cam_total_avoidable_exposure:
  (cam_nnn.total_exposure ?? 0) +
  (cam_nnn.escalation_high ?? 0) +
  (cam_nnn.capital_items_high ?? 0),

  /* -------------------- HEALTH (FULL LOGIC) -------------------- */
  health,

  /* -------------------- TEASER SUMMARY (GREEN BOX SAFE) -------------------- */
  teaser_summary:
    cam_nnn.total_exposure
      ? {
          estimated_avoidable_range: {
            low: Math.round(
              (((cam_nnn.total_exposure ?? 0) +
                (cam_nnn.escalation_high ?? 0)) *
                0.15) /
                1000
            ) * 1000,
            high: Math.round(
              (((cam_nnn.total_exposure ?? 0) +
                (cam_nnn.escalation_high ?? 0)) *
                0.35) /
                1000
            ) * 1000,
          },

          headline_flags: health.flags.slice(0, 2).map((f) => f.label),
        }
      : null,

  /* -------------------- DEBUG / PREVIEW -------------------- */
  raw_preview: text.slice(0, 1500),
  };
}

