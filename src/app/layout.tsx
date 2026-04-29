import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { sanityFetch } from "@/lib/sanity/client";
import { PARAMETRES_QUERY } from "@/lib/sanity/queries";
import type { Parametres } from "@/lib/sanity/types";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieBanner } from "@/components/cookie-banner";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AccessibilityToggle } from "@/components/accessibility-toggle";
import { ToastHost } from "@/components/toast";
import {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/components/json-ld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://acte2theatre.vercel.app"
  ),
  title: {
    default: "Acte 2 Théâtre — Happy Culture · Lyon",
    template: "%s · Acte 2 Théâtre",
  },
  description:
    "Acte 2 Théâtre, théâtre de proximité à Lyon 9 (Vaise). Spectacles jeune public, théâtre adulte, séances scolaires, ateliers et location de salle. Saison 2025-2026 — billetterie en ligne.",
  applicationName: "Acte 2 Théâtre",
  keywords: [
    "théâtre Lyon",
    "Acte 2 Théâtre",
    "spectacle jeune public Lyon",
    "théâtre Vaise",
    "stage théâtre Lyon",
    "Happy Culture",
    "salle de spectacle Lyon",
    "location salle Lyon 9",
  ],
  authors: [{ name: "Acte 2 Théâtre" }],
  creator: "Acte 2 Théâtre",
  publisher: "Acte 2 Théâtre",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Acte 2 Théâtre — Happy Culture",
    title: "Acte 2 Théâtre — Happy Culture · Lyon",
    description:
      "Théâtre de proximité à Lyon 9 (Vaise) — programmation jeune public, théâtre adulte, ateliers, location de salle. Saison 2025-2026.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Acte 2 Théâtre — Happy Culture · Théâtre à Lyon 9 Vaise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acte 2 Théâtre — Happy Culture · Lyon",
    description:
      "Théâtre indépendant à Lyon 9 — saison 2025-2026, ateliers, location de salle.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#F5C518",
      },
    ],
  },
  other: {
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#0a0a0a",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffbec" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Le layout doit rester résilient : si Sanity est indisponible (placeholder
  // de dev, panne réseau, dataset vide), on rend tout de même la page avec un
  // fallback `null` plutôt que de propager un 500 sur l'intégralité du site.
  let parametres: Parametres | null = null;
  try {
    parametres = await sanityFetch<Parametres | null>({
      query: PARAMETRES_QUERY,
      tags: ["parametres"],
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[layout] Sanity indisponible — fallback parametres=null", err);
    }
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://acte2theatre.vercel.app";

  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Performance — preconnect aux origines critiques */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://acte2theatre.mapado.com" />

        {/* Pré-chargement de l'image hero pour LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/hero.webp"
          fetchPriority="high"
        />

        {/* Données structurées globales */}
        <JsonLd data={organizationJsonLd(siteUrl)} />
        <JsonLd data={websiteJsonLd(siteUrl)} />
      </head>
      <body className="min-h-screen flex flex-col">
        <noscript>
          <div className="bg-or-500 text-nuit-950 text-sm text-center py-2 px-4 font-medium">
            Ce site fonctionne mieux avec JavaScript activé. Toutes les
            informations restent accessibles, mais certaines interactions
            (carte, formulaires, animations) seront limitées.
          </div>
        </noscript>
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Aller au contenu principal
          </a>
          <ScrollProgress />
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <SiteFooter parametres={parametres} />
          <ScrollToTop />
          <AccessibilityToggle />
          <ToastHost />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
