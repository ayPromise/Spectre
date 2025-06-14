import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["img.youtube.com"],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
