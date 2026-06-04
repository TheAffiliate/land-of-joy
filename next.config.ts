import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserve your existing image configurations
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fra.cloud.appwrite.io',
      },
    ],
  },
  
  // Appwrite Build Memory Optimizations
  productionBrowserSourceMaps: false,
  experimental: {
    webpackBuildWorker: true,
  }
};

export default nextConfig;