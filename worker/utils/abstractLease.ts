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
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
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
  const parties = text.match(/\bby and between\s+(.+?)\s*\("Landlord"\)\s*,?\s+and\s+(.+?)\s*\("Tenant"\)/i);
  if (parties) return cleanPartyName(parties[2]);
  return extractWithPatterns(text, [
    /Tenant:\s*([A-Z][A-Za-z0-9 &.,'-]{3,})/,
    /Lessee:\s*([A-Z][A-Za-z0-9 &.,'-]{3,})/,
  ]);
}

function extractLandlord(text: string): string | null {
  const parties = text.match(/\bby and between\s+(.+?)\s*\("Landlord"\)\s*,?\s+and\s+(.+?)\s*\("Tenant"\)/i);
  if (parties) return cleanPartyName(parties[1]);
  return extractWithPatterns(text, [
    /Landlord:\s*([A-Z][A-Za-z0-9 &.,'-]{3,})/,
    /Lessor:\s*([A-Z][A-Za-z0-9 &.,'-]{3,})/,
  ]);
}

function cleanPartyName(value: string): string {
  return value.replace(/,\s+an?\s+[A-Za-z ]+\s+(?:limited liability company|corporation|partnership|company)\s*$/i, "").trim();
}

function extractPremises(text: string): string | null {
  const definedPremises = extractWithPatterns(text, [
    /located at:?\s+(.+?)\s+\((?:the\s+)?"Premises"\)/i,
  ]);
  if (definedPremises) return definedPremises.replace(/,\s*$/, "");
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

function extractBaseRentInfo(text: string): { amount: number | null; frequency: Rent["frequency"] } {
  const monthly = extractWithPatterns(text, [
    /Monthly Base Rent:\s*\$([\d,]+)/i,
    /Year\s*1:\s*\$([\d,]+)\s+per\s+month/i,
    /base rent[^.]{0,90}?\$([\d,]+)\s+per\s+month/i,
  ]);
  if (monthly) return { amount: Number(monthly.replace(/,/g, "")), frequency: "monthly" };
  const annual = extractWithPatterns(text, [
    /Annual Base Rent:\s*\$([\d,]+)/i,
    /base rent[^.]{0,90}?\$([\d,]+)\s+per\s+year/i,
  ]);
  if (annual) return { amount: Number(annual.replace(/,/g, "")), frequency: "annual" };
  return { amount: null, frequency: null };
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
    /increase(?:s)?\s+(?:annually|yearly|each year)\s+by\s+(\d+(?:\.\d+)?)%/i,
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

function extractExplicitMonthlyRentSchedule(text: string): RentScheduleRow[] {
  const rows: RentScheduleRow[] = [];
  for (const match of text.matchAll(/Year\s+(\d+):\s*\$([\d,]+)\s+per\s+month/gi)) {
    const monthly = Number(match[2].replace(/,/g, ""));
    if (monthly > 0 && !rows.some((row) => row.year === Number(match[1]))) {
      rows.push({ year: Number(match[1]), annual_rent: monthly * 12, monthly_rent: monthly });
    }
  }
  return rows.sort((a, b) => a.year - b.year);
}

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
  capex_excluded: boolean;
  has_management_fee: boolean;
  cam_cap_percent: number | null;

  // 🔥 CAM escalation exposure
  escalation_low: number | null;
  escalation_high: number | null;

  // 🔥 Capital items amortization (NEW)
  capital_items_low: number | null;
  capital_items_high: number | null;

  // 🔥 Management / admin fee delta (NEW)
  management_fee_low: number | null;
  management_fee_high: number | null;
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
    /pro\s*rata\s*share|tenant's (?:proportionate )?share|proportionate share/i.test(text);

  const includes_capex =
    /capital expenses|capital improvements|replacement of roof|structural/i.test(
      text
    );
  const capex_excluded = /CAM expenses shall not include.{0,140}capital improvements/i.test(text);

  const capPct = extractWithPatterns(text, [
    /CAM cap[^%]*(\d+(?:\.\d+)?)%/i,
    /capped at (\d+(?:\.\d+)?)%/i,
  ]);

  const hasManagementFee = /(?:management|admin(?:istration)?) fee/i.test(text);
  // Only a CAM/NNN amount explicitly stated in the lease is recorded.
  const monthlyAmount = monthlyExplicit
    ? Number(monthlyExplicit.replace(/,/g, ""))
    : null;

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

      // Management fee placeholders
      management_fee_low: null,
      management_fee_high: null,

      is_uncapped,
      reconciliation,
      pro_rata,
      includes_capex,
      capex_excluded,
      has_management_fee: hasManagementFee,
      cam_cap_percent: capPct ? Number(capPct) : null,
    };
  }

  const annualAmount = monthlyAmount * 12;
  const years = termMonths ? termMonths / 12 : 1;
  const totalExposure = annualAmount * years; // Total charge, not an overcharge.

  return {
    monthly_amount: monthlyAmount,
    annual_amount: annualAmount,
    total_exposure: totalExposure,

    is_uncapped,
    reconciliation,
    pro_rata,
    includes_capex,
    capex_excluded,
    cam_cap_percent: capPct ? Number(capPct) : null,

    capital_items_low: null,
    capital_items_high: null,
    escalation_low: null,
    escalation_high: null,
    management_fee_low: null,
    management_fee_high: null,
    has_management_fee: hasManagementFee,
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

export type AuditFinding = {
  category: "CAM Escalation" | "Capital Items" | "Management Fees" | "Pro-Rata";
  issue: string;
  lease_snippet?: string | null;
  estimated_annual_impact: number;
  estimated_term_impact: number;
  confidence: "low" | "medium" | "high";
};

export type LeaseHealth = {
  score: number;
  confidence: number;
  flags: LeaseRiskFlag[];
  findings: AuditFinding[];
};

function computeLeaseHealth(input: {
  lease_start: string | null;
  lease_end: string | null;
  term_months: number | null;
  cam_nnn: CamNnn;
}): LeaseHealth {
  const flags: LeaseRiskFlag[] = [];
  const findings: AuditFinding[] = [];
  let score = 100;
  let confidence = 100;

  if (input.cam_nnn.capex_excluded) {
    flags.push({
      code: "CAPEX_EXCEPTION",
      label: "Capital improvement exclusion with an exception",
      severity: "low",
      recommendation: "Check whether any billed capital item meets the lease's stated amortization exception.",
    });
  } else if (input.cam_nnn.includes_capex) {
    flags.push({
      code: "CAPEX_IN_CAM",
      label: "Capital expense language detected",
      severity: "medium",
      recommendation: "Check whether the lease permits the item and how it must be amortized.",
    });
    score -= 10;
  }

  if (input.cam_nnn.has_management_fee) {
    flags.push({
      code: "MGMT_FEE_WATCH",
      label: "Management or administrative fee language detected",
      severity: "low",
      recommendation: "Compare the lease fee definition and calculation base with the reconciliation.",
    });
  }

  if (input.cam_nnn.pro_rata) {
    flags.push({
      code: "PRO_RATA",
      label: "Pro-rata allocation language detected",
      severity: "low",
      recommendation: "Verify the tenant share and rentable-area denominator against landlord records.",
    });
    score -= 5;
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
    findings,
  };
}

/* -------------------- MAIN EXPORT -------------------- */

export function abstractLease(rawText: string) {
  const text = normalizeText(rawText);

  const lease_start = extractDate("start", text);
  const lease_end = extractDate("end", text);

  const term_months = lease_start && lease_end
    ? Math.round((new Date(lease_end).getTime() - new Date(lease_start).getTime()) /
      (1000 * 60 * 60 * 24 * (365.2425 / 12)))
    : null;

  const escalation = extractEscalation(text);
  const baseRent = extractBaseRentInfo(text);

  const rent: Rent = {
    base_rent: baseRent.amount,
    frequency: baseRent.frequency,
    escalation_type: escalation.escalation_type,
    escalation_value: escalation.escalation_value,
    escalation_interval: escalation.escalation_interval,
  };

  const explicitRentSchedule = extractExplicitMonthlyRentSchedule(text);
  const rent_schedule = explicitRentSchedule.length ? explicitRentSchedule : buildRentSchedule(
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
  tenant: extractTenant(rawText) || extractTenant(text) || null,
  landlord: extractLandlord(rawText) || extractLandlord(text) || null,
  premises: extractPremises(text),

  lease_start,
  lease_end,
  term_months,

  rent,
  rent_schedule,

    cam_nnn,

/* -------------------- FLATTENED NUMERIC FIELDS -------------------- */
escalation_low: cam_nnn.escalation_low ?? 0,
escalation_high: cam_nnn.escalation_high ?? 0,

capital_items_low: cam_nnn.capital_items_low ?? 0,
capital_items_high: cam_nnn.capital_items_high ?? 0,

management_fee_low: cam_nnn.management_fee_low ?? 0,
management_fee_high: cam_nnn.management_fee_high ?? 0,

  /* -------------------- HEALTH (FULL LOGIC) -------------------- */
  health,

  teaser_summary: {
    headline_flags: health.flags.slice(0, 2).map((f) => f.label),
  },

  /* -------------------- DEBUG / PREVIEW -------------------- */
  raw_preview: text.slice(0, 1500),
  };
}
