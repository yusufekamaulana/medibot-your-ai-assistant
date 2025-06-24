import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    domains: ['d2qjkwm11akmwu.cloudfront.net'],
  },
    eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

// next.config.js