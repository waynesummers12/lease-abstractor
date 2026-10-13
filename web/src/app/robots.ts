import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.saveonlease.com";

  return {
    rules: {
      userAgent: "*",
      // Guests can read the dashboard overview; the rest is account-specific.
      allow: ["/", "/product/app/dashboard$"],
      disallow: [
        "/api/",
        "/app/",
        "/auth/",
        "/product/app/",
        "/login",
        "/success",
        "/cancel",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
