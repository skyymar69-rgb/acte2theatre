import type { NextConfig } from "next";

/**
 * Configuration Next.js — sécurité, perf et cache.
 *
 * Choix CSP : on sépare deux profils.
 *  - `/studio/**` (Sanity Studio) a besoin de `'unsafe-inline'` + `'unsafe-eval'`
 *    pour fonctionner (React + sandbox d'aperçu Vision).
 *  - Toutes les autres routes adoptent une CSP stricte sans eval, qui autorise
 *    uniquement les scripts inline minimaux requis par Next (hydration).
 *    L'inline est tolérée via `'unsafe-inline'` car Next ne pose pas encore de
 *    `nonce` automatique sur les scripts d'hydratation App Router en dev.
 *    À retirer dès que Next 15 stabilise les nonces (suivi : vercel/next.js#43417).
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    taint: true,
    optimizePackageImports: ["lucide-react", "@portabletext/react"],
  },
  async headers() {
    // ── CSP Studio (relax, requis par Sanity Studio) ─────────────────────────
    const studioCsp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity.io https://*.sanity.studio",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com https://*.sanity.io",
      "connect-src 'self' https://*.sanity.io https://*.apicdn.sanity.io wss://*.api.sanity.io",
      "frame-src 'self' https://*.sanity.io https://*.sanity.studio",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; ");

    // ── CSP publique (stricte) ───────────────────────────────────────────────
    const publicCsp = [
      "default-src 'self'",
      // 'unsafe-inline' nécessaire pour les scripts d'hydratation Next 15 ;
      // 'unsafe-eval' RETIRÉ.
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://*.sanity.io https://*.apicdn.sanity.io",
      // Restreint à Maps embed + Mapado, plus rien d'autre
      "frame-src 'self' https://www.google.com/maps/ https://acte2theatre.mapado.com",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    const commonSecurityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value:
          "camera=(), microphone=(), geolocation=(), payment=(), usb=(), midi=(), magnetometer=(), gyroscope=(), accelerometer=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      },
      // Isolation cross-origin (mitige Spectre, fuite via window.opener, etc.)
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Cross-Origin-Resource-Policy", value: "same-site" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
    ];

    return [
      // Studio : noindex + CSP relax
      {
        source: "/studio/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Content-Security-Policy", value: studioCsp },
          ...commonSecurityHeaders.filter(
            (h) => h.key !== "Cross-Origin-Resource-Policy" // Studio embarque des assets cross-origin
          ),
        ],
      },
      // Toutes les autres routes : CSP stricte
      {
        source: "/((?!studio).*)",
        headers: [
          { key: "Content-Security-Policy", value: publicCsp },
          ...commonSecurityHeaders,
        ],
      },
      // Cache long pour les assets immuables WebP/PNG
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/logos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Cache modéré pour les fichiers de discovery (re-crawlés)
      {
        source: "/llms.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
      {
        source: "/humans.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
      {
        source: "/.well-known/security.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
      // Cache moyen pour favicons et icônes PWA
      {
        source:
          "/:icon(favicon|favicon-16x16|favicon-32x32|favicon-48x48|favicon-96x96|apple-touch-icon|android-chrome-192x192|android-chrome-512x512).(ico|png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/og-default.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
