import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { SPECTACLES_SLUGS_QUERY } from "@/lib/sanity/queries";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://acte2theatre.vercel.app";

// Revalidé via le webhook Sanity : tag "spectacle"
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Tolère une indisponibilité Sanity : on rend au moins les routes fixes.
  let slugs: string[] = [];
  try {
    slugs = await sanityFetch<string[]>({
      query: SPECTACLES_SLUGS_QUERY,
      tags: ["spectacle"],
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[sitemap] Sanity indisponible, sitemap partiel.", err);
    }
  }

  const mainRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1.0, freq: "weekly" as const },
    { path: "/spectacles", priority: 0.9, freq: "weekly" as const },
    { path: "/ateliers", priority: 0.8, freq: "weekly" as const },
    { path: "/location-salle", priority: 0.7, freq: "monthly" as const },
    { path: "/entreprise", priority: 0.8, freq: "monthly" as const },
    { path: "/soutenir", priority: 0.6, freq: "monthly" as const },
    { path: "/contact", priority: 0.7, freq: "monthly" as const },
    { path: "/plan-du-site", priority: 0.4, freq: "monthly" as const },
  ].map(({ path, priority, freq }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }));

  const spectacleRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/spectacles/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const legalRoutes: MetadataRoute.Sitemap = [
    "/mentions-legales",
    "/cgu",
    "/cgv",
    "/confidentialite",
    "/cookies",
    "/accessibilite",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.2,
  }));

  return [...mainRoutes, ...spectacleRoutes, ...legalRoutes];
}
