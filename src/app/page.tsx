import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import {
  SPECTACLES_VEDETTE_QUERY,
  SPECTACLES_A_VENIR_QUERY,
} from "@/lib/sanity/queries";
import type { SpectaclePreview } from "@/lib/sanity/types";
import { SpectacleCard } from "@/components/spectacle-card";

export const revalidate = 3600;

export default async function HomePage() {
  const [vedettes, aVenir] = await Promise.all([
    sanityFetch<SpectaclePreview[]>({
      query: SPECTACLES_VEDETTE_QUERY,
      tags: ["spectacle"],
    }),
    sanityFetch<SpectaclePreview[]>({
      query: SPECTACLES_A_VENIR_QUERY,
      tags: ["spectacle"],
    }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-curtain-900 text-curtain-50 py-20 md:py-32">
        <div className="container max-w-5xl">
          <p className="text-stage-400 font-medium uppercase tracking-wider text-sm mb-4">
            Théâtre de proximité · Lyon
          </p>
          <h1 className="text-curtain-50 mb-6 max-w-3xl">
            Acte 2 Théâtre
          </h1>
          <p className="text-xl text-curtain-200 max-w-2xl mb-8">
            Une saison riche en émotions : spectacles jeune public, théâtre,
            ateliers et créations. Au cœur de Lyon.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/spectacles"
              className="inline-flex items-center px-6 py-3 bg-stage-600 hover:bg-stage-700 text-white rounded font-medium transition-colors"
            >
              Voir la programmation
            </Link>
            <Link
              href="/ateliers"
              className="inline-flex items-center px-6 py-3 border border-curtain-300 hover:bg-curtain-800 text-curtain-50 rounded font-medium transition-colors"
            >
              Ateliers
            </Link>
          </div>
        </div>
      </section>

      {/* À l'affiche */}
      {vedettes.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="flex items-baseline justify-between mb-8">
              <h2>À l&apos;affiche</h2>
              <Link
                href="/spectacles"
                className="text-stage-700 hover:text-stage-800 font-medium"
              >
                Toute la programmation →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vedettes.map((spectacle) => (
                <SpectacleCard key={spectacle._id} spectacle={spectacle} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prochains spectacles */}
      {aVenir.length > 0 && (
        <section className="py-16 md:py-24 bg-curtain-100">
          <div className="container">
            <h2 className="mb-8">Prochains spectacles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aVenir.slice(0, 8).map((spectacle) => (
                <SpectacleCard key={spectacle._id} spectacle={spectacle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* État vide (utile au démarrage, avant import de contenu) */}
      {vedettes.length === 0 && aVenir.length === 0 && (
        <section className="py-24">
          <div className="container max-w-2xl text-center">
            <h2 className="mb-4">Bienvenue sur le nouveau site</h2>
            <p className="text-lg text-curtain-700 mb-6">
              Aucun spectacle n&apos;a encore été ajouté. Connectez-vous au{" "}
              <Link href="/studio" className="text-stage-700 underline">
                back-office
              </Link>{" "}
              pour créer votre premier spectacle.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
