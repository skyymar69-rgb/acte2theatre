import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { SPECTACLES_A_VENIR_QUERY } from "@/lib/sanity/queries";
import type { SpectaclePreview } from "@/lib/sanity/types";
import { SpectacleCard } from "./spectacle-card";
import { ArrowRight } from "lucide-react";

/**
 * Bandeau "Pendant ce temps, à l'affiche…" — à coller en bas des pages
 * froides (ateliers, location, soutenir, légales) pour ramener le
 * visiteur vers la conversion principale (réserver un spectacle).
 *
 * Internal linking SEO-friendly + amélioration du parcours.
 */
export async function NextShowsTeaser({
  limit = 3,
  title = "Pendant ce temps, à l'affiche…",
  subtitle = "Quelques rendez-vous à ne pas manquer cette saison.",
}: {
  limit?: number;
  title?: string;
  subtitle?: string;
}) {
  const spectacles = await sanityFetch<SpectaclePreview[]>({
    query: SPECTACLES_A_VENIR_QUERY,
    tags: ["spectacle"],
  });

  if (!spectacles || spectacles.length === 0) return null;

  return (
    <section
      aria-labelledby="next-shows-title"
      className="bg-surface-2/40 border-t border-divider/15 py-14 md:py-20"
    >
      <div className="container">
        <header className="flex flex-wrap items-baseline justify-between gap-3 mb-8">
          <div>
            <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
              Programmation
            </p>
            <h2 id="next-shows-title" className="text-balance">
              {title}
            </h2>
            {subtitle && (
              <p className="text-ink-muted mt-2 max-w-xl">{subtitle}</p>
            )}
          </div>
          <Link
            href="/spectacles"
            className="inline-flex items-center gap-1.5 text-rouge-600 dark:text-or-400 hover:text-rouge-700 dark:hover:text-or-300 font-semibold transition-colors"
          >
            Voir toute la saison
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spectacles.slice(0, limit).map((sp) => (
            <SpectacleCard key={sp._id} spectacle={sp} />
          ))}
        </div>
      </div>
    </section>
  );
}
