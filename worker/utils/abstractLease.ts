// worker/utils/abstractLease.ts

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

function confidence(value: unknown): "high" | "medium" | "low" {
  if (!value) return "low";
  if (typeof value === "number") return "high";
  if (typeof value === "string" && value.length > 6) return "high";
  return "medium";
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

function extractFrequency(text: string | null): Rent["frequency"] {
  if (!text) return null;
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
    /annual increase of (\d+(?:\.\d+)?)%/i,
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
    /annual increase of \$([\d,]+)/i,
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

/* -------------------- CAM / NNN EXTRACTION -------------------- */

export type CamNnn = {
  monthly_amount: number | null;
  annual_amount: number | null;
  total_exposure: number | null;

  // additive metadata — safe & optional
  is_uncapped: boolean;
  reconciliation: boolean;
  pro_rata: boolean;
  escalation_exposure: number | null;
};

function extractCamNnn(text: string, termMonths: number | null): CamNnn {
  const monthly = extractWithPatterns(text, [
    /NNN charges[^$]*\$([\d,]+)\s+per\s+month/i,
    /CAM charges[^$]*\$([\d,]+)\s+per\s+month/i,
    /estimated NNN charges[^$]*\$([\d,]+)\s+per\s+month/i,
  ]);

  const is_uncapped =
    /no cap|without limitation|all operating expenses/i.test(text);

  const reconciliation =
    /annual reconciliation|subject to reconciliation/i.test(text);

  const pro_rata =
    /pro\s*rata\s*share|tenant['’]s share/i.test(text);

  if (!monthly) {
    return {
      monthly_amount: null,
      annual_amount: null,
      total_exposure: null,
      is_uncapped,
      reconciliation,
      pro_rata,
      escalation_exposure: null,
    };
  }

  const monthlyAmount = Number(monthly.replace(/,/g, ""));
  const annualAmount = monthlyAmount * 12;

  const years =
    termMonths && termMonths > 0 ? termMonths / 12 : 1;

  const totalExposure = annualAmount * years;

  // conservative assumption: 6% CAM growth if uncapped
  const escalationExposure = is_uncapped
    ? annualAmount * 0.06 * years
    : null;

  return {
    monthly_amount: monthlyAmount,
    annual_amount: annualAmount,
    total_exposure: totalExposure,
    is_uncapped,
    reconciliation,
    pro_rata,
    escalation_exposure: escalationExposure,
  };
}


/* -------------------- LEASE HEALTH + $ IMPACT -------------------- */

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
  rent: Rent;
  rent_schedule: RentScheduleRow[];
  cam_nnn: CamNnn;
}): LeaseHealth {
  const flags: LeaseRiskFlag[] = [];
  let score = 100;

  const years =
    input.term_months && input.term_months > 0
      ? input.term_months / 12
      : 1;

  const baseAnnual = input.rent_schedule[0]?.annual_rent ?? 0;

  if (!input.lease_start || !input.lease_end) {
    flags.push({
      code: "MISSING_DATES",
      label: "Lease start or end date missing",
      severity: "high",
      recommendation:
        "Request a fully executed lease or estoppel certificate.",
      estimated_impact: "Dispute exposure $25k+",
    });
    score -= 25;
  }

  if (input.rent.escalation_type === "fixed_percent") {
    flags.push({
      code: "PERCENT_ESCALATION",
      label: "Annual percentage rent escalation",
      severity: "medium",
      recommendation: "Negotiate lower escalation.",
      estimated_impact: `~${formatMoney(
        baseAnnual * 0.01 * years
      )} savings`,
    });
    score -= 10;
  }

  if (input.rent.escalation_type === "cpi") {
    flags.push({
      code: "CPI_ESCALATION",
      label: "CPI-based escalation (uncapped)",
      severity: "high",
      recommendation: "Negotiate CPI cap.",
      estimated_impact: `Exposure ${formatMoney(
        baseAnnual * 0.03 * years
      )}+`,
    });
    score -= 25;
  }

  /* ---- CAM / NNN TOTAL AVOIDABLE EXPOSURE ---- */
  if (input.cam_nnn.monthly_amount) {
    const baseExposure = input.cam_nnn.total_exposure ?? 0;
    const escalationExposure = input.cam_nnn.escalation_exposure ?? 0;
    const totalAvoidable = baseExposure + escalationExposure;

    flags.push({
      code: "CAM_TOTAL_EXPOSURE",
      label: "CAM / NNN charges with escalation risk",
      severity:
        escalationExposure > 0 ? "high" : "medium",
      recommendation:
        "Audit CAM categories, enforce reconciliation rights, and negotiate annual caps (3–6%).",
      estimated_impact: `Total avoidable exposure ${formatMoney(
        totalAvoidable
      )}`,
    });

    // scoring logic
    score -= escalationExposure > 0 ? 25 : 15;
  }

  /* ---- CAM reconciliation risk (secondary) ---- */
  if (input.cam_nnn.reconciliation) {
    flags.push({
      code: "CAM_RECONCILIATION",
      label: "CAM subject to annual reconciliation",
      severity: "medium",
      recommendation:
        "Ensure audit rights and strict reconciliation deadlines.",
      estimated_impact:
        "Reconciliation errors commonly exceed $10k–$50k",
    });

    score -= 5;
  }




  return { score: Math.max(score, 0), flags };
}

/* -------------------- MAIN EXPORT -------------------- */

export function abstractLease(rawText: string) {
  const text = normalizeText(rawText);

  const tenant = extractTenant(text);
  const landlord = extractLandlord(text);
  const premises = extractPremises(text);

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

  const base_rent = extractBaseRent(text);
  const frequency = extractFrequency(text);
  const escalation = extractEscalation(text);

  const rent: Rent = {
    base_rent,
    frequency,
    escalation_type: escalation.escalation_type,
    escalation_value: escalation.escalation_value,
    escalation_interval: escalation.escalation_interval,
  };

  const rent_schedule = buildRentSchedule(
    base_rent,
    frequency,
    rent.escalation_type,
    rent.escalation_value,
    term_months
  );

  const cam_nnn = extractCamNnn(text, term_months);

  const health = computeLeaseHealth({
    lease_start,
    lease_end,
    term_months,
    rent,
    rent_schedule,
    cam_nnn,
  });

    return {
    tenant,
    landlord,
    premises,
    lease_start,
    lease_end,
    term_months,
    rent,
    rent_schedule,
    cam_nnn,

    // ✅ ADD THIS LINE (TOTAL CAM + ESCALATION ROLL-UP)
    cam_total_avoidable_exposure:
      (cam_nnn.total_exposure ?? 0) +
      (cam_nnn.escalation_exposure ?? 0),

    health,
    confidence: {
      base_rent: confidence(base_rent),
      escalation:
        rent.escalation_type === "none" ? "low" : "high",
    },
    raw_preview: text.slice(0, 1500),
  };
}


