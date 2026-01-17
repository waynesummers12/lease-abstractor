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

function formatMoney(n: number) {
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

function extractDate(label: string, text: string): string | null {
  return extractWithPatterns(text, [
    new RegExp(`${label}[:\\s]+([A-Za-z]+ \\d{1,2}, \\d{4})`, "i"),
    new RegExp(`\\(${label}\\)[^A-Za-z]*(?:on )?([A-Za-z]+ \\d{1,2}, \\d{4})`, "i"),
    new RegExp(`([A-Za-z]+ \\d{1,2}, \\d{4})\\s*\\(“?${label}”?\\)`, "i"),
    new RegExp(`(?:commence|commencing|expiring)[^A-Za-z]*([A-Za-z]+ \\d{1,2}, \\d{4})`, "i"),
  ]);
}


/* -------------------- RENT & ESCALATION -------------------- */

type Rent = {
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

function extractFrequency(
  text: string | null
): Rent["frequency"] {
  if (!text) return null;

  if (/per\s+month|monthly/i.test(text)) return "monthly";
  if (/per\s+year|annual/i.test(text)) return "annual";
  return null;
}

function extractEscalation(text: string) {
  /* ---- explicit % escalation ---- */
  const pct = extractWithPatterns(text, [
    /increase(?:s)? by (\d+(?:\.\d+)?)%/i,
    /annual increase of (\d+(?:\.\d+)?)%/i,
  ]);

  if (pct) {
    return {
      escalation_type: "fixed_percent" as const,
      escalation_value: Number(pct),
      escalation_interval: "annual" as const,
    };
  }

  /* ---- explicit $ escalation ---- */
  const fixed = extractWithPatterns(text, [
    /increase(?:s)? by \$([\d,]+)/i,
    /annual increase of \$([\d,]+)/i,
  ]);

  if (fixed) {
    return {
      escalation_type: "fixed_amount" as const,
      escalation_value: Number(fixed.replace(/,/g, "")),
      escalation_interval: "annual" as const,
    };
  }

  /* ---- CPI escalation ---- */
  if (/CPI|Consumer Price Index/i.test(text)) {
    return {
      escalation_type: "cpi" as const,
      escalation_value: null,
      escalation_interval: "annual" as const,
    };
  }

  /* ---- IMPLICIT rent ladder (Year 2 / Year 3 / Year 4…) ---- */
  if (/Year\s+2:.*\$|Year\s+3:.*\$|Year\s+4:.*\$/i.test(text)) {
    return {
      escalation_type: "fixed_amount" as const,
      escalation_value: null, // derived later from schedule
      escalation_interval: "annual" as const,
    };
  }

  /* ---- none detected ---- */
  return {
    escalation_type: "none" as const,
    escalation_value: null,
    escalation_interval: null,
  };
}


/* -------------------- RENT SCHEDULE -------------------- */

type RentScheduleRow = {
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
  let annualRent =
    frequency === "monthly" ? baseRent * 12 : baseRent;

  const rows: RentScheduleRow[] = [];

  for (let y = 1; y <= years; y++) {
    if (y > 1) {
      if (escalationType === "fixed_percent" && escalationValue) {
        annualRent *= 1 + escalationValue / 100;
      }
      if (escalationType === "fixed_amount" && escalationValue) {
        annualRent += escalationValue;
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

/* -------------------- LEASE HEALTH + $ IMPACT -------------------- */

type LeaseRiskFlag = {
  code: string;
  label: string;
  severity: "low" | "medium" | "high";
  recommendation: string;
  estimated_impact: string;
};

type LeaseHealth = {
  score: number;
  flags: LeaseRiskFlag[];
};

function computeLeaseHealth(input: {
  lease_start: string | null;
  lease_end: string | null;
  term_months: number | null;
  rent: Rent;
  rent_schedule: RentScheduleRow[];
}): LeaseHealth {
  const flags: LeaseRiskFlag[] = [];
  let score = 100;

  const yearsRemaining = input.term_months
    ? input.term_months / 12
    : 1;

  const yearOneRent =
    input.rent_schedule[0]?.annual_rent ?? 0;

  if (!input.lease_start || !input.lease_end) {
    flags.push({
      code: "MISSING_DATES",
      label: "Lease start or end date missing",
      severity: "high",
      recommendation:
        "Request a fully executed lease or estoppel certificate confirming lease term.",
      estimated_impact:
        "Legal and audit exposure; potential disputes exceeding $25k",
    });
    score -= 25;
  }

  if (input.term_months !== null && input.term_months < 24) {
    flags.push({
      code: "SHORT_TERM",
      label: "Lease term under 24 months",
      severity: "medium",
      recommendation:
        "Begin renewal discussions 9–12 months early to preserve leverage.",
      estimated_impact: `Renewal premium risk of ${formatMoney(
        yearOneRent * 0.05
      )}`,
    });
    score -= 15;
  }

  if (
    input.rent.escalation_type === "fixed_percent" &&
    input.rent.escalation_value
  ) {
    const savings =
      yearOneRent * 0.01 * yearsRemaining;

    flags.push({
      code: "PERCENT_ESCALATION",
      label: "Annual percentage rent escalation",
      severity: "medium",
      recommendation:
        "Negotiate a lower escalation rate or a fixed dollar increase.",
      estimated_impact: `~${formatMoney(
        savings
      )} savings by reducing escalation 1%`,
    });
    score -= 10;
  }

  if (input.rent.escalation_type === "cpi") {
    const exposure =
      yearOneRent * 0.03 * yearsRemaining;

    flags.push({
      code: "CPI_ESCALATION",
      label: "CPI-based rent escalation (unbounded)",
      severity: "high",
      recommendation:
        "Negotiate a CPI cap (e.g. 3–4%) or convert to fixed escalation.",
      estimated_impact: `Estimated exposure ${formatMoney(
        exposure
      )}+`,
    });
    score -= 25;
  }

  if (input.rent.escalation_type === "none") {
    flags.push({
      code: "NO_ESCALATION_DEFINED",
      label: "No rent escalation clause detected",
      severity: "low",
      recommendation:
        "Confirm whether rent remains flat or escalation language is missing.",
      estimated_impact:
        "Billing ambiguity risk of $5k–$15k",
    });
    score -= 5;
  }

  return {
    score: Math.max(score, 0),
    flags,
  };
}

/* -------------------- MAIN EXPORT -------------------- */

export function abstractLease(rawText: string) {
  const text = normalizeText(rawText);

  const tenant = extractTenant(text);
  const landlord = extractLandlord(text);
  const premises = extractPremises(text);
  const lease_start = extractDate("Commencement Date|Lease Start", text);
  const lease_end = extractDate("Expiration Date|Lease End", text);

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
    ...escalation,
  };

  const rent_schedule = buildRentSchedule(
    base_rent,
    frequency,
    escalation.escalation_type,
    escalation.escalation_value,
    term_months
  );

  const health = computeLeaseHealth({
    lease_start,
    lease_end,
    term_months,
    rent,
    rent_schedule,
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
    health,
    confidence: {
      base_rent: confidence(base_rent),
      escalation:
        escalation.escalation_type === "none"
          ? "low"
          : "high",
    },
    raw_preview: text.slice(0, 1500),
  };
}
