import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://saveonlease.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/marketing/",
          "/app",
        ],
        disallow: [
          "/api/",
          "/_next/",
          "/dashboard/",
          "/private/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}