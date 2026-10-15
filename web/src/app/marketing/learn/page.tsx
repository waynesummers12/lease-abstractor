"use client";
// src/app/marketing/learn/page.tsx
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Article = {
  title: string;
  description: string;
  href: string;
};

type Section = {
  label: string;
  articles: Article[];
};

const sections: Section[] = [
  {
    label: "Foundations",
    articles: [
      {
        title: "CAM vs. NNN Explained",
        description:
          "Understand the difference between CAM and NNN charges and how each impacts your lease.",
        href: "/marketing/cam-vs-nnn",
      },
      {
        title: "Pro Rata Share Explained",
        description:
          "How pro rata share is calculated and how small miscalculations can significantly impact tenants.",
        href: "/marketing/pro-rata-share-explained",
      },
      {
        title: "NNN Calculation Examples",
        description:
          "Illustrative NNN calculations for tenant share, admin fees, and the year-end true-up.",
        href: "/marketing/nnn-calculation-examples",
      },
      {
        title: "Triple Net Lease Explained",
        description:
          "A practical breakdown of triple net (NNN) leases, including taxes, insurance, CAM, and how risk shifts to tenants.",
        href: "/marketing/triple-net-lease",
      },
      {
        title: "Triple Net Lease Meaning",
        description:
          "Plain-English definition of a triple net lease and what tenants are actually agreeing to financially.",
        href: "/marketing/triple-net-lease-meaning",
      },
      {
        title: "Triple Net Lease vs Gross Lease",
        description:
          "Compare triple net vs gross leases and understand how operating expense risk differs for tenants.",
        href: "/marketing/triple-net-lease-vs-gross",
      },
      {
        title: "NNN Lease Explained",
        description:
          "How base rent, taxes, insurance, and CAM may fit together under your signed agreement.",
        href: "/marketing/nnn-lease",
      },
    ],
  },
  {
    label: "Audit Rights",
    articles: [
      {
        title: "Audit Rights Explained",
        description:
          "Read the records-access, objection, and audit procedures in your own lease.",
        href: "/marketing/audit-rights",
      },
      {
        title: "NNN Audit Rights Explained",
        description:
          "Specific audit rights related to NNN charges including tax and insurance allocations.",
        href: "/marketing/nnn-audit-rights",
      },
      {
        title: "Audit Window Deadlines Explained",
        description:
          "Learn how CAM and NNN audit windows work, typical 30–120 day deadlines, and what happens if tenants miss them.",
        href: "/marketing/audit-window-deadlines",
      },
    ],
  },
  {
    label: "CAM Topics",
    articles: [
      {
        title: "CAM Reconciliation Explained",
        description:
          "How annual CAM reconciliations work and how tenants identify discrepancies.",
        href: "/marketing/cam-reconciliation",
      },
      {
        title: "CAM Reconciliation Statement Explained",
        description:
          "Trace annual cost categories, tenant share, estimates paid, and the year-end balance.",
        href: "/marketing/cam-reconciliation-statement",
      },
      {
        title: "CAM Expense Caps Explained",
        description:
          "What CAM caps are, how they are structured, and how uncapped leases increase tenant risk.",
        href: "/marketing/cam-expense-caps",
      },
      {
        title: "CAM Admin Fees Explained",
        description:
          "How CAM administrative and management fees work, what is typical, and when they become excessive.",
        href: "/marketing/cam-admin-page",
      },
      {
        title: "Common CAM Fees Explained",
        description:
          "A breakdown of common CAM fees, which charges are typically allowed, and which are frequently disputed.",
        href: "/marketing/common-cam-fees",
      },
      {
        title: "CAM Reconciliation Checklist",
        description:
          "A step-by-step tenant checklist for reviewing CAM reconciliations before audit windows expire.",
        href: "/marketing/cam-reconciliation-checklist",
      },
      {
        title: "Tenant-First CAM Audit Checklist (Free Download)",
        description:
          "Download the full 25-point Tenant-First CAM Audit Checklist used to identify administrative overcharges, capital misclassification, pro rata errors, and audit window risks.",
        href: "/marketing/cam-audit-checklist",
      },
      {
        title: "CAM Charges Explained",
        description:
          "Break a CAM bill into expense categories, allocation, fees, limits, and credits.",
        href: "/marketing/cam-charges",
      },
      {
        title: "Common Area Maintenance (CAM)",
        description:
          "A practical breakdown of Common Area Maintenance in commercial real estate and how shared expenses are allocated.",
        href: "/marketing/common-area-maintenance",
      },
      {
        title: "Common Area Maintenance Charges",
        description:
          "Detailed explanation of common area maintenance charges and how tenants identify over-allocations.",
        href: "/marketing/common-area-maintenance-charges",
      },
      {
        title: "CAM in Real Estate",
        description:
          "How CAM works in commercial real estate and how operating expenses flow through to tenants.",
        href: "/marketing/cam-real-estate",
      },
      {
        title: "CAM in Commercial Real Estate",
        description:
          "Follow shared property costs from vendor invoices to the tenant's annual charge.",
        href: "/marketing/cam-commercial-real-estate",
      },
      {
        title: "Lease CAM Explained",
        description:
          "How CAM provisions are written in leases and how lease language affects tenant exposure.",
        href: "/marketing/lease-cam",
      },
    ],
  },
  {
    label: "NNN Topics",
    articles: [
      {
        title: "NNN (Triple Net) Explained",
        description:
          "A simplified explanation of NNN (triple net) leases and how CAM, taxes, and insurance are passed through to tenants.",
        href: "/marketing/nnn",
      },
      {
        title: "NNN Reconciliation Explained",
        description:
          "How NNN reconciliations work and what tenants should verify each year.",
        href: "/marketing/nnn-reconciliation",
      },
      {
        title: "NNN Insurance Charges Explained",
        description:
          "Compare insurance coverage, premiums, allocation, and the lease's pass-through language.",
        href: "/marketing/nnn-insurance-charges-explained",
      },
      {
        title: "NNN Property Tax Charges Explained",
        description:
          "How property tax increases flow through NNN leases and when reassessments matter.",
        href: "/marketing/nnn-property-tax-charges-explained",
      },
      {
        title: "NNN Expenses Explained",
        description:
          "A breakdown of common NNN expenses, how they are categorized, and which charges tenants should verify annually.",
        href: "/marketing/nnn-expenses-explained",
      },
    ],
  },
  {
    label: "Risk & Overcharges",
    articles: [
      {
        title: "CAM / NNN Overcharges Explained",
        description:
          "Separate the total billed from a specific, document-supported discrepancy.",
        href: "/marketing/cam-nnn-overcharges",
      },
      {
        title: "Non-Allowable CAM / NNN Expenses",
        description:
          "Charges that are frequently disputed and often non-recoverable under standard lease interpretation.",
        href: "/marketing/non-allowable-cam-nnn-expenses",
      },
      {
        title: "CAM / NNN Billing Examples",
        description:
          "Fictional examples showing how to turn a surprising charge into a records question.",
        href: "/marketing/real-cam-nnn-overcharge-examples",
      },
      {
        title: "Lease Overcharge Explained",
        description:
          "Use lease terms, statements, and records to investigate a possible billing discrepancy.",
        href: "/marketing/lease-overcharge",
      },
      {
        title: "CAM Reconciliation Errors",
        description:
          "Common CAM reconciliation errors including allocation mistakes, admin markups, and non-allowable expense pass-throughs.",
        href: "/marketing/cam-reconciliation-errors",
      },
    ],
  },
  {
    label: "Industries",
    articles: [
      {
        title: "Restaurant NNN Overcharges",
        description:
          "Review how restaurant tenants can compare NNN charges with lease terms, annual statements, and payment credits.",
        href: "/marketing/restaurant-nnn-overcharges",
      },
      {
        title: "Retail Lease Audit Hub",
        description:
          "Central resource for retail tenants reviewing CAM reconciliation, NNN charges, audit rights, and occupancy risk exposure.",
        href: "/marketing/retail-lease-hub",
      },
      {
        title: "Burger Restaurant Lease Audit Hub",
        description:
          "Organize each restaurant location's lease, annual statement, CAM, NNN, and review terms.",
        href: "/marketing/burger-lease-hub",
      },
      {
        title: "Franchise CAM Audit Overview",
        description:
          "Portfolio-level CAM and NNN audit strategies for franchisees and multi-location operators.",
        href: "/marketing/franchise-cam-audit",
      },
    ],
  },
  {
    label: "Tools & Analysis",
    articles: [
      {
  title: "Commercial Lease Checklist",
  description:
    "A tenant-first checklist for CAM, NNN, annual statements, and lease-specific review steps.",
  href: "/marketing/commercial-lease-checklist",
},
{
  title: "Commercial Lease Checklist PDF",
  description:
    "Download the free tenant-first worksheet for organizing CAM, NNN, and lease review questions.",
  href: "/marketing/commercial-lease-checklist-pdf",
},
      {
        title: "Commercial Lease Audit Explained",
        description:
          "Connect lease definitions, annual billing, allocation, and notice terms to the records behind them.",
        href: "/marketing/commercial-lease-audit",
      },
      {
        title: "CAM Fee Calculator",
        description:
          "Estimate CAM fee exposure and understand how administrative markups affect tenant costs.",
        href: "/marketing/cam-fee-calculator",
      },
      {
        title: "Lease Score Explained",
        description:
          "Look beyond a score to the CAM and NNN terms, billing questions, and records that matter.",
        href: "/marketing/lease-score-explained",
      },
      {
        title: "Audit Window Language Explained",
        description:
          "Read the trigger, required action, period, and delivery rules in your own lease.",
        href: "/marketing/audit-window-language",
      },
    ],
  },
];

export default function LearnPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/checklist-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");

      // 🔥 GA4 lead tracking event
      if (typeof window !== "undefined") {
        const w = window as unknown as {
          gtag?: (...args: unknown[]) => void;
        };

        w.gtag?.("event", "generate_lead", {
          event_category: "Checklist",
          event_label: "CAM Audit Checklist",
          value: 1,
        });
      }

      setEmail("");
    } catch {
      setStatus("error");
    }
  };
  return (
    <main className="mx-auto max-w-7xl px-6 py-20 space-y-20">
      {/* HERO */}
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight">
          CAM & NNN Lease Education
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-700 leading-relaxed">
          CAM & NNN lease education explained in practical, tenant-first terms:
          clear guidance on CAM reconciliation, NNN charges, audit windows,
          and common overcharges — so commercial tenants can act before
          deadlines expire.
        </p>
      </section>

      {/* Featured Resource */}
      <section className="relative overflow-hidden rounded-[30px] bg-[#102c25] text-white shadow-[0_24px_70px_rgba(16,44,37,0.16)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-44 h-[430px] w-[430px] rounded-full border border-white/10" />
        <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:gap-14 lg:p-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Free tenant field guide</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Make your next CAM question count.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#d9e9df]">
              The Tenant-First CAM Audit Checklist gives you 25 practical checks across fees,
              capital costs, tenant share, expenses, trends, and review rights.
            </p>
            <div className="mt-7 flex flex-wrap gap-2 text-xs font-semibold text-[#d9e9df]">
              {["8-page PDF", "Working worksheet", "Records request draft"].map((item) => (
                <span key={item} className="rounded-full border border-white/20 bg-white/10 px-3 py-2">{item}</span>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-9 max-w-xl">
              <label htmlFor="checklist-email" className="block text-sm font-semibold text-white">Send the checklist to your inbox</label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="checklist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                  className="min-h-12 w-full rounded-xl border border-white/30 bg-white px-4 text-sm text-[#102c25] outline-none focus:border-[#a9e9be] focus:ring-2 focus:ring-[#a9e9be]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] hover:bg-white disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Get the free PDF ↗"}
                </button>
              </div>
            </form>
            {status === "success" && (
              <p role="status" className="mt-4 text-sm text-[#a9e9be]">
                Sent. You can also <a href="/assets/Tenant-First-CAM-Audit-Checklistv1.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">open your checklist now ↗</a>.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="mt-4 text-sm text-[#ffd6d6]">We couldn&apos;t send the email. Please try again.</p>
            )}
            <p className="mt-4 text-xs text-[#b9d1c2]">The guide is educational. Your lease and billing records determine what applies.</p>
            <Link href="/marketing/cam-audit-checklist" className="mt-6 inline-flex text-sm font-semibold text-white underline underline-offset-4 hover:text-[#a9e9be]">
              Explore the online checklist ↗
            </Link>
          </div>
          <div className="mx-auto w-full max-w-[390px] rounded-[25px] border border-white/20 bg-white/10 p-4 shadow-2xl shadow-black/20 sm:p-5">
            <div className="overflow-hidden rounded-[15px] bg-white shadow-lg">
              <Image src="/assets/tenant-first-cam-checklist-cover.png" alt="Cover of the eight-page Tenant-First CAM Audit Checklist" width={1044} height={1350} sizes="(max-width: 1024px) 80vw, 390px" className="h-auto w-full" />
            </div>
            <p className="mt-3 text-center text-xs text-[#d9e9df]">See the actual guide you will receive</p>
          </div>
        </div>
      </section>

      {/* Core Anchor Block */}
      <section className="rounded-2xl border bg-gray-50 p-10 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight">
          Start With CAM Reconciliation
        </h2>

        <p className="mx-auto max-w-3xl text-gray-700 leading-relaxed">
          Most commercial tenant overcharges are discovered during annual{" "}
          <Link href="/marketing/cam-reconciliation" className="underline hover:text-black">
            CAM reconciliation
          </Link>.
          Reconciliation statements are where allocation errors,{" "}
          <Link href="/marketing/non-allowable-cam-nnn-expenses" className="underline hover:text-black">
            non-allowable CAM expenses
          </Link>, administrative markups, and uncapped increases often surface.
        </p>

        <p className="mx-auto max-w-3xl text-gray-700 leading-relaxed">
          If you are reviewing a reconciliation statement or believe your CAM charges
          may be incorrect, begin with our complete{" "}
          <Link href="/marketing/cam-reconciliation" className="underline hover:text-black">
            CAM Reconciliation guide
          </Link>{" "}
          to understand how tenants identify overcharges before audit windows close.
        </p>

        <Link
          href="/marketing/cam-reconciliation"
          className="inline-flex rounded-lg bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Read the CAM Reconciliation Guide →
        </Link>
      </section>

      {/* SECTIONS */}
      {sections.map((section) => (
        <section key={section.label} className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              {section.label}
            </p>
            <div className="mt-2 h-px w-16 bg-gray-200" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {section.articles.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h2 className="text-xl sm:text-2xl font-light tracking-tight group-hover:underline">
                  {article.title}
                </h2>
                <p className="mt-3 text-gray-700 leading-relaxed">
                  {article.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-black">
                  Read article →
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Why This Matters Financially */}
      <section className="mx-auto max-w-4xl text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-light tracking-tight">
          Why This Matters Financially
        </h3>
        <p className="text-gray-700 leading-relaxed">
          A small allocation or classification difference can recur across statement years.
          The financial effect depends on your lease, billed amounts, and supporting records.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Reviewing your lease before{" "}
          <Link
            href="/marketing/audit-window-deadlines"
            className="underline hover:text-black"
          >
            audit windows close
          </Link>{" "}
          preserves leverage, protects your ability to dispute overcharges, and
          helps prevent avoidable costs from becoming permanent.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gray-50 p-10 text-center">
        <h3 className="text-3xl font-light tracking-tight">
          Ready to apply this to your lease?
        </h3>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700">
          Upload your commercial lease and receive a tenant-first CAM & NNN audit
          with clear questions and conditional bill comparisons when the documents support them.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-8 inline-flex rounded-xl bg-black px-10 py-5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Run CAM & NNN Audit (Free Preview)
        </Link>
      </section>
    </main>
  );
}
