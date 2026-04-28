import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Use CDN in production for read speed; fresh data is served via on-demand
  // revalidation triggered by the Sanity webhook (see /api/revalidate).
  useCdn: true,
  perspective: "published",
  stega: { studioUrl: "/studio" },
});

/**
 * Wrapper around `client.fetch` that integrates with Next.js cache tags.
 * Pass any tags relevant to the query so the webhook can invalidate them.
 *
 * @example
 * const data = await sanityFetch({
 *   query: SPECTACLES_QUERY,
 *   tags: ["spectacle"],
 * });
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600, // fallback: revalidate every hour
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}
