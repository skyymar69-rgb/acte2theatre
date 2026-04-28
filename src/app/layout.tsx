import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { sanityFetch } from "@/lib/sanity/client";
import { PARAMETRES_QUERY } from "@/lib/sanity/queries";
import type { Parametres } from "@/lib/sanity/types";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
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
    images: [{ url: "/images/scene-banderole.jpg", width: 1080, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
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
  const parametres = await sanityFetch<Parametres | null>({
    query: PARAMETRES_QUERY,
    tags: ["parametres"],
  });

  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Aller au contenu principal
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter parametres={parametres} />
        </ThemeProvider>
      </body>
    </html>
  );
}
