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
import { SeoBody } from "@/components/seo-body";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

const CATEGORY_METAS: Record<string, { title: string; description: string }> = {
  "jeune-public": {
    title: "Spectacles jeune public",
    description:
      "Spectacles jeune public à Lyon — dès 18 mois, ateliers à la sortie, tarifs adultes 13€ enfants 12€. Saison 2025-2026 de L'Acte 2.",
  },
  theatre: {
    title: "Théâtre adulte",
    description:
      "Théâtre contemporain et classique à Lyon 9 Vaise — saison 2025-2026 de L'Acte 2. Compagnies invitées, créations, magie. Réservation en ligne.",
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
      "La programmation de L'Acte 2 Lyon : spectacles jeune public, théâtre adulte, séances scolaires, magie. Saison 2025-2026 — réservation en ligne.",
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
            "px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page",
            !categorie
              ? "bg-nuit-950 text-craie-100 dark:bg-or-500 dark:text-nuit-950 shadow-sm"
              : "bg-surface-2 text-ink hover:bg-or-500/10 hover:scale-[1.02] motion-reduce:hover:scale-100"
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
              "px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page",
              categorie === cat.slug
                ? "bg-nuit-950 text-craie-100 dark:bg-or-500 dark:text-nuit-950 shadow-sm"
                : "bg-surface-2 text-ink hover:bg-or-500/10 hover:scale-[1.02] motion-reduce:hover:scale-100"
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

      {/* ─────────── BLOC ÉDITORIAL SEO (~ 800 mots) ─────────── */}
      <SeoBody
        kicker="Saison 2025-2026"
        titre="Une programmation de théâtre indépendant à Lyon"
        accroche="À L'Acte 2, la saison s'invente comme un voyage : on commence dès 18 mois avec les tout-petits, on traverse les âges du jeune public, et on prolonge la nuit avec du théâtre contemporain ou classique pour adultes. Trente spectacles environ, des compagnies invitées de toute la France, et la promesse d'une vraie proximité avec les artistes."
        sections={[
          {
            titre: "Un théâtre éclectique, fidèle à la philosophie Happy Culture",
            paragraphes: [
              "Notre <strong>programmation</strong> revendique un éclectisme assumé. Une semaine, c'est un conte musical pour enfants ; la suivante, un vaudeville d'Eugène Labiche ; le mois d'après, une création de magie ou une adaptation littéraire pour les classes de collège. Nous croyons que la culture devient vraiment <em>happy</em> quand elle ne se laisse enfermer ni dans une chapelle artistique, ni dans une niche d'âge.",
              "Cette diversité repose sur un travail patient de repérage : nous suivons les festivals d'Avignon Off, de Charleville, du Furet ou d'Aurillac, nous lisons les dossiers de compagnies indépendantes, et nous accueillons régulièrement des créations en résidence dans la salle. Plus de la moitié des spectacles à l'affiche sont signés par des <strong>compagnies émergentes</strong> qui ne trouvent pas toujours leur place dans les théâtres institutionnels lyonnais.",
            ],
          },
          {
            titre: "Spectacles jeune public — dès 18 mois et pendant les vacances",
            paragraphes: [
              "Une grande partie de notre saison est dédiée aux <strong>spectacles jeune public à Lyon</strong>. Nous proposons des formats courts, calibrés pour la concentration des plus petits (35 à 45 minutes), avec une attention particulière aux 18 mois - 5 ans qui découvrent souvent leur tout premier théâtre chez nous.",
              "Pendant les vacances scolaires de la zone A — Toussaint, Noël, hiver, printemps, été — la programmation s'intensifie : matinées en semaine pour les familles disponibles, créneaux scolaires pour les crèches et écoles, séances tout public le week-end. Les tarifs <strong>adultes 13 € / enfants 12 €</strong> font partie des plus accessibles de l'agglomération.",
              "Côté contenus : <em>Bubulle, le poisson volant</em> (Cie Les P'tites Dames, dès 3 ans), <em>Loup y es-tu ? Conte musical</em> (Cie Tous à la musique, 6-10 ans), <em>Monsieur Maxence au pays des 5 sens</em> (Cie Les 3 Coups Occitanie, 18 mois - 5 ans), <em>La boîte à histoires découvre le monde</em> (même compagnie, 18 mois - 5 ans), <em>La Fée Toquée</em> (Cie Dose, 3-9 ans).",
            ],
          },
          {
            titre: "Théâtre adulte — créations contemporaines et grands classiques",
            paragraphes: [
              "Le soir, la salle change d'atmosphère. <strong>Théâtre contemporain</strong>, vaudeville classique, magie, conférence-spectacle : nous explorons les formats que les grandes scènes lyonnaises proposent rarement, parce qu'ils s'adressent à des jauges intimes — et que 100 places en cabaret, c'est précisément la bonne distance pour entendre les nuances d'une comédienne ou voir le déclic d'un tour de magie.",
              "Cette saison, vous pourrez découvrir <em>À la mienne</em> de Nicolas Bret-Morel par la compagnie Les Pendrillons Rouges (une romancière dialogue avec ses personnages — humour grinçant garanti), un diptyque <em>L'Affaire de la rue de Lourcine / Le Mystère de la rue Rousselet</em> d'après Eugène Labiche par la compagnie Les Grandes Personnes, et le spectacle de magie <em>Pêle-Mêle</em> de Magic David. Les tarifs adultes oscillent entre <strong>15 € (réduit) et 18 € (plein)</strong>.",
            ],
          },
          {
            titre: "Séances scolaires — accueillir les classes au théâtre",
            paragraphes: [
              "L'Acte 2 travaille étroitement avec les enseignants des écoles, collèges et lycées de Lyon et du Grand Lyon. Nous organisons des <strong>séances scolaires</strong> sur demande, avec une programmation adaptée aux niveaux : <em>Sacré Molière !</em> (Cie 2 Trois Bricoles) pour le cycle 3 et le collège, <em>Monte Cristo ou la Loi du Talion</em> (Cie Histoire de Voir) à partir de 12 ans.",
              "Chaque représentation scolaire peut être enrichie d'un dossier pédagogique préparé par la compagnie, ainsi que d'une rencontre avec les comédiens à l'issue du spectacle. Nous travaillons à un tarif groupe (à partir de 6 € par élève selon l'effectif) qui permet de boucler la facturation simplement avec votre coopérative ou votre OGEC. Pour préparer une sortie : <a href=\"mailto:acte2resa@yahoo.fr\">acte2resa@yahoo.fr</a> ou 04 78 83 21 71.",
            ],
          },
          {
            titre: "Réserver, accéder, profiter : le mode d'emploi",
            paragraphes: [
              "La <strong>billetterie en ligne</strong> est assurée par Mapado (paiement carte sécurisé, e-tickets envoyés par email). Vous trouverez aussi notre programmation sur les plateformes partenaires <strong>BilletReduc</strong> et <strong>Ticketac</strong>, qui proposent ponctuellement des promotions sur certaines séances.",
              "Sur place, le bar du hall ouvre 30 minutes avant chaque représentation : c'est l'occasion de boire un verre, de discuter avec les comédiens à l'issue du spectacle, ou simplement de prolonger le moment dans une ambiance feutrée. La salle est <strong>accessible aux personnes à mobilité réduite</strong> ; pour préparer votre venue, contactez-nous au préalable.",
              "Côté accès, nous sommes au cœur de Vaise (Lyon 9), à 10 minutes à pied de la station de métro Gorge de Loup (ligne D), et desservis par les bus C14, C6 et 31 (arrêt Place Valmy). Le parking Indigo Saint-Paul ainsi que des zones bleues sont à proximité immédiate. Plus d'infos sur la <a href=\"/contact\">page contact</a>.",
            ],
          },
          {
            titre: "Une carte d'abonnement saison qui change tout",
            paragraphes: [
              "Si vous comptez venir plusieurs fois cette saison, la <strong>carte d'abonnement 10 spectacles</strong> à <strong>110 €</strong> est sans aucun doute la formule la plus avantageuse. Soit 11 € le spectacle en moyenne — moins cher qu'un cinéma. Elle est nominative, valable sur l'ensemble de la programmation (sauf événements privatisés), et peut s'utiliser librement seul·e ou avec un proche.",
              "Cette carte d'abonnement est aussi un acte de soutien direct au théâtre indépendant : elle nous garantit un public fidèle, donc la possibilité d'inviter chaque saison de nouvelles compagnies, et de continuer à offrir des tarifs accessibles aux familles et aux étudiants.",
            ],
          },
        ]}
        liens={[
          { href: "/ateliers", label: "Découvrir nos ateliers et stages" },
          { href: "/contact", label: "Contacter la billetterie" },
          { href: "/soutenir", label: "Nous soutenir" },
          { href: "/location-salle", label: "Louer la salle" },
        ]}
      />
    </div>
  );
}
