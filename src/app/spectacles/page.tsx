import Link from "next/link";
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

export const metadata = {
  title: "Spectacles",
  description:
    "La programmation d'Acte 2 Théâtre : spectacles jeune public, théâtre adulte, magie, contes musicaux.",
};

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

  return (
    <div className="container py-12 md:py-16">
      <header className="mb-10">
        <h1 className="mb-3">Programmation</h1>
        <p className="text-lg text-curtain-700">
          Tous les spectacles à venir, classés par date.
        </p>
      </header>

      {/* Filtres catégorie */}
      <nav className="mb-10 flex flex-wrap gap-2" aria-label="Filtres">
        <Link
          href="/spectacles"
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            !categorie
              ? "bg-curtain-900 text-curtain-50"
              : "bg-curtain-100 text-curtain-800 hover:bg-curtain-200"
          )}
        >
          Tous
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/spectacles?categorie=${cat.slug}`}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              categorie === cat.slug
                ? "bg-curtain-900 text-curtain-50"
                : "bg-curtain-100 text-curtain-800 hover:bg-curtain-200"
            )}
          >
            {cat.nom}
          </Link>
        ))}
      </nav>

      {/* Grille */}
      {spectacles.length === 0 ? (
        <p className="py-12 text-center text-curtain-600">
          Aucun spectacle à venir dans cette catégorie pour le moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spectacles.map((spectacle) => (
            <SpectacleCard key={spectacle._id} spectacle={spectacle} />
          ))}
        </div>
      )}
    </div>
  );
}
