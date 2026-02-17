import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://saveonlease.com";
  const now = new Date();

  return [
    // Core Pages
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/start`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // Product Flow
    {
      url: `${baseUrl}/app/step-1-upload`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // Education Hub
    {
      url: `${baseUrl}/marketing/learn`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Core Authority Pages
    {
      url: `${baseUrl}/marketing/cam-reconciliation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/marketing/cam-reconciliation-errors`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/cam-nnn-overcharges`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/audit-window-deadlines`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/marketing/audit-rights`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // CAM Cluster
    {
      url: `${baseUrl}/marketing/cam-charges`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/cam-fee-meaning`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/cam-fee-calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/marketing/common-area-maintenance`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/common-area-maintenance-cam`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/marketing/common-area-maintenance-charges`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/cam-real-estate`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/cam-commercial-real-estate`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/lease-cam`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // NNN / Lease Cluster
    {
      url: `${baseUrl}/marketing/nnn-lease`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/marketing/triple-net-lease`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/marketing/triple-net-lease-meaning`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/triple-net-lease-vs-gross`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/cam-vs-nnn`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/commercial-lease-audit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/marketing/lease-overcharge`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/cam-reconciliation-checklist`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/marketing/cam-audit-checklist`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/marketing/nnn`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
