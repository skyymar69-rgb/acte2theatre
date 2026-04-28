import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  experimental: {
    // Server Actions are enabled by default in Next 15
    taint: true,
  },
  // Sanity Studio is mounted under /studio — keep it out of the sitemap
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
