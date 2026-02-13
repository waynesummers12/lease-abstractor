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

    // SEO Supporting Pages
    {
      url: `${baseUrl}/marketing/cam-reconciliation`,
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
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing/audit-rights`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
