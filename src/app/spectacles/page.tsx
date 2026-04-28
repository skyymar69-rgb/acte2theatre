import Link from "next/link";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import {
  SPECTACLES_A_VENIR_QUERY,
  SPECTACLES_PAR_CATEGORIE_QUERY,
  CATEGORIES_QUERY,
} from "@/lib/sanity/queries";
import type { SpectaclePreview, Categorie } from "@/lib/sanity/types";
import { SpectacleCard } from "@/components/spectacle-card";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

const CATEGORY_METAS: Record<string, { title: string; description: string }> = {
  "jeune-public": {
    title: "Spectacles jeune public",
    description:
      "Spectacles jeune public à Lyon — dès 18 mois, ateliers à la sortie, tarifs adultes 13€ enfants 12€. Saison 2025-2026 d'Acte 2 Théâtre.",
  },
  theatre: {
    title: "Théâtre adulte",
    description:
      "Théâtre contemporain et classique à Lyon 9 Vaise — saison 2025-2026 d'Acte 2 Théâtre. Compagnies invitées, créations, magie. Réservation en ligne.",
  },
  scolaire: {
    title: "Séances scolaires",
    description:
      "Séances scolaires à Lyon — Monte Cristo dès 12 ans, Sacré Molière dès 11 ans. Réservations groupes : acte2resa@yahoo.fr.",
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}): Promise<Metadata> {
  const { categorie } = await searchParams;
  const meta = categorie ? CATEGORY_METAS[categorie] : null;
  return {
    title: meta?.title ?? "Programmation 2025-2026",
    description:
      meta?.description ??
      "La programmation d'Acte 2 Théâtre Lyon : spectacles jeune public, théâtre adulte, séances scolaires, magie. Saison 2025-2026 — réservation en ligne.",
    alternates: {
      canonical: categorie ? `/spectacles?categorie=${categorie}` : "/spectacles",
    },
  };
}

export default async function SpectaclesPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;

  const [categories, spectacles] = await Promise.all([
    sanityFetch<Categorie[]>({
      query: CATEGORIES_QUERY,
      tags: ["categorie"],
    }),
    sanityFetch<SpectaclePreview[]>({
      query: categorie
        ? SPECTACLES_PAR_CATEGORIE_QUERY
        : SPECTACLES_A_VENIR_QUERY,
      params: categorie ? { categorie } : {},
      tags: ["spectacle"],
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === categorie);
  const heading = activeCategory ? activeCategory.nom : "Programmation";
  const subtitle = activeCategory
    ? `Tous les spectacles ${activeCategory.nom.toLowerCase()} à venir, classés par date.`
    : "Tous les spectacles à venir, classés par date.";

  return (
    <div className="container py-12 md:py-16">
      <nav aria-label="Fil d'Ariane" className="text-xs text-ink-muted mb-4">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link
              href="/"
              className="hover:text-rouge-600 dark:hover:text-or-400"
            >
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-ink">{heading}</li>
        </ol>
      </nav>

      <header className="mb-10 max-w-2xl">
        <h1 className="mb-3 text-balance">{heading}</h1>
        <p className="text-lg text-ink-muted text-pretty">{subtitle}</p>
      </header>

      {/* Filtres catégorie */}
      <nav
        className="mb-6 flex flex-wrap gap-2"
        aria-label="Filtrer par catégorie"
      >
        <Link
          href="/spectacles"
          aria-current={!categorie ? "page" : undefined}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            !categorie
              ? "bg-nuit-950 text-craie-100 dark:bg-or-500 dark:text-nuit-950"
              : "bg-surface-2 text-ink hover:bg-or-500/10"
          )}
        >
          Tous
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/spectacles?categorie=${cat.slug}`}
            aria-current={categorie === cat.slug ? "page" : undefined}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              categorie === cat.slug
                ? "bg-nuit-950 text-craie-100 dark:bg-or-500 dark:text-nuit-950"
                : "bg-surface-2 text-ink hover:bg-or-500/10"
            )}
          >
            {cat.nom}
          </Link>
        ))}
      </nav>

      {/* Compteur dynamique annoncé aux lecteurs d'écran */}
      <p
        aria-live="polite"
        aria-atomic="true"
        className="text-sm text-ink-muted mb-8"
      >
        {spectacles.length === 0
          ? "Aucun spectacle ne correspond à ce filtre."
          : spectacles.length === 1
          ? "1 spectacle à venir."
          : `${spectacles.length} spectacles à venir.`}
      </p>

      {/* Grille */}
      {spectacles.length === 0 ? (
        <div className="py-16 text-center max-w-md mx-auto">
          <p className="text-6xl mb-4 opacity-20" aria-hidden="true">
            ☘
          </p>
          <p className="text-ink-muted mb-4">
            Aucun spectacle à venir dans cette catégorie pour le moment.
          </p>
          <Link
            href="/spectacles"
            className="text-rouge-600 dark:text-or-400 hover:underline font-medium"
          >
            Voir toute la programmation →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spectacles.map((spectacle, i) => (
            <SpectacleCard
              key={spectacle._id}
              spectacle={spectacle}
              priority={i < 3}
            />
          ))}
        </div>
      )}
    </div>
  );
}
