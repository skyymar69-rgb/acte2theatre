import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { sanityFetch } from "@/lib/sanity/client";
import { PARAMETRES_QUERY } from "@/lib/sanity/queries";
import type { Parametres } from "@/lib/sanity/types";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.acte2theatre.fr"
  ),
  title: {
    default: "Acte 2 Théâtre — Lyon",
    template: "%s · Acte 2 Théâtre",
  },
  description:
    "Acte 2 Théâtre, théâtre de proximité à Lyon. Spectacles jeune public, théâtre adulte, ateliers et location de salle.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Acte 2 Théâtre",
  },
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
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter parametres={parametres} />
      </body>
    </html>
  );
}
