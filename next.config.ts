import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // local /uploads/* works from public folder by default
  },
};

export default nextConfig;
