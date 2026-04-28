import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { SPECTACLES_SLUGS_QUERY } from "@/lib/sanity/queries";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.acte2theatre.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await client.fetch<string[]>(SPECTACLES_SLUGS_QUERY);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/spectacles",
    "/ateliers",
    "/location-salle",
    "/soutenir",
    "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const spectacleRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/spectacles/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...spectacleRoutes];
}
