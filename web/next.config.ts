import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // ensure root is the web/ directory
  },
};

export default nextConfig;
