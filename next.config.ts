import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let phones/tablets on the local Wi-Fi load the dev server (dev only; ignored in production)
  allowedDevOrigins: ["192.168.1.58", "192.168.*.*", "10.*.*.*"],
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
