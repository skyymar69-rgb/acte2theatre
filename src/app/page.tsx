import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity/client";
import {
  SPECTACLES_VEDETTE_QUERY,
  SPECTACLES_A_VENIR_QUERY,
  ATELIERS_QUERY,
} from "@/lib/sanity/queries";
import type { SpectaclePreview, Atelier } from "@/lib/sanity/types";
import { SpectacleCard } from "@/components/spectacle-card";
import { ArrowRight, Ticket, Users, Heart, Bus, TramFront, ParkingCircle, ExternalLink } from "lucide-react";
import { SeoBody } from "@/components/seo-body";

export const revalidate = 3600;

async function safeFetch<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[home] Sanity fetch a échoué, fallback :", err);
    }
    return fallback;
  }
}

export default async function HomePage() {
  const [vedettes, aVenir, ateliers] = await Promise.all([
    safeFetch(
      sanityFetch<SpectaclePreview[]>({
        query: SPECTACLES_VEDETTE_QUERY,
        tags: ["spectacle"],
      }),
      [] as SpectaclePreview[]
    ),
    safeFetch(
      sanityFetch<SpectaclePreview[]>({
        query: SPECTACLES_A_VENIR_QUERY,
        tags: ["spectacle"],
      }),
      [] as SpectaclePreview[]
    ),
    safeFetch(
      sanityFetch<Atelier[]>({
        query: ATELIERS_QUERY,
        tags: ["atelier"],
      }),
      [] as Atelier[]
    ),
  ]);

  return (
    <>
      {/* ──────────────── HERO ──────────────── */}
      <section
        className="relative isolate overflow-hidden bg-nuit-950 text-craie-100 bg-grain"
        aria-labelledby="hero-title"
      >
        {/* Image de fond — vue panoramique du hall Acte 2 Théâtre (purement décorative) */}
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
          aria-hidden="true"
        />
        {/* Vignette dégradée pour lisibilité */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-nuit-950 via-nuit-950/70 to-nuit-950"
        />
        {/* Halo or top */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-or-500/60 to-transparent"
        />

        <div className="relative container max-w-5xl py-20 md:py-32 lg:py-40">
          <p className="text-or-400 font-medium uppercase tracking-[0.3em] text-xs md:text-sm mb-5">
            <span className="font-display italic normal-case tracking-normal text-base text-or-300/90">
              Acte 2 Théâtre · Happy Culture
            </span>
            <span className="ml-2">· Lyon 9 — Vaise</span>
          </p>

          <h1
            id="hero-title"
            className="font-display !text-4xl md:!text-6xl lg:!text-7xl text-balance mb-6 leading-[1.05]"
          >
            Vivez le théâtre autrement,{" "}
            <span className="text-or-500">à Lyon</span>
          </h1>

          <p className="text-lg md:text-xl text-craie-100/85 max-w-2xl mb-8 text-pretty leading-relaxed">
            Saison <strong className="text-or-300">2025-2026</strong> —
            spectacles jeune public, théâtre contemporain et classique,
            séances scolaires, ateliers et stages. Une salle intime de
            100&nbsp;places où l&apos;humain rencontre la scène, à deux
            pas du quai Arloing.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/spectacles"
              data-speakable=""
              className="inline-flex items-center gap-2 px-6 md:px-7 py-3.5 bg-rouge-600 hover:bg-rouge-500 text-white rounded-full font-semibold text-base shadow-scene glow-or transition-all hover:scale-[1.02]"
            >
              <Ticket className="w-5 h-5" aria-hidden="true" />
              Réserver ma soirée
            </Link>
            <Link
              href="/ateliers"
              className="inline-flex items-center gap-2 px-6 md:px-7 py-3.5 border-2 border-or-500/60 hover:border-or-500 hover:bg-or-500/10 text-craie-100 rounded-full font-medium text-base transition-all"
            >
              Inscrire mon enfant à un atelier
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Trust bar — preuve sociale légère et factuelle */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-craie-100/70 mb-3">
            <span className="inline-flex items-center gap-1.5">
              <span className="text-or-500" aria-hidden="true">★</span>
              Théâtre indépendant lyonnais
            </span>
            <span className="hidden sm:inline-block w-px h-3 bg-craie-100/30" aria-hidden="true" />
            <span>Depuis 2007</span>
            <span className="hidden sm:inline-block w-px h-3 bg-craie-100/30" aria-hidden="true" />
            <span>Abonnement 10 spectacles · 110€</span>
          </div>

          {/* Billetteries — 3 plateformes au même rang */}
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-craie-100/55 mb-2">
            Billetterie sécurisée
          </p>
          <ul className="flex flex-wrap items-center gap-2">
            <li>
              <a
                href="https://acte2theatre.mapado.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-nuit-900 hover:bg-or-500/15 border border-or-500/25 hover:border-or-500/60 text-craie-100 text-xs font-medium transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-or-500" aria-hidden="true" />
                Mapado
                <ExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />
                <span className="sr-only"> (ouvre dans un nouvel onglet)</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.billetreduc.com/4486/salle.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-nuit-900 hover:bg-or-500/15 border border-or-500/25 hover:border-or-500/60 text-craie-100 text-xs font-medium transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-or-500" aria-hidden="true" />
                BilletReduc
                <ExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />
                <span className="sr-only"> (ouvre dans un nouvel onglet)</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.ticketac.com/salles/lyon-acte-2-theatre.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-nuit-900 hover:bg-or-500/15 border border-or-500/25 hover:border-or-500/60 text-craie-100 text-xs font-medium transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-or-500" aria-hidden="true" />
                Ticketac
                <ExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />
                <span className="sr-only"> (ouvre dans un nouvel onglet)</span>
              </a>
            </li>
          </ul>

          {/* Mini-stats / signature */}
          <dl className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-craie-100/60">
                Saison
              </dt>
              <dd className="font-display text-2xl md:text-3xl text-or-400">
                2025-26
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-craie-100/60">
                Places
              </dt>
              <dd className="font-display text-2xl md:text-3xl text-or-400">
                100
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-craie-100/60">
                Abonnement
              </dt>
              <dd className="font-display text-2xl md:text-3xl text-or-400">
                110€
              </dd>
            </div>
          </dl>
        </div>

        {/* Liseré or bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-or-500/60 to-transparent"
        />
      </section>

      {/* ──────────────── MANIFESTE / VALEURS ──────────────── */}
      <section
        aria-labelledby="manifeste-title"
        className="container max-w-5xl py-14 md:py-20"
      >
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-5">
            <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-3">
              Notre projet
            </p>
            <h2 id="manifeste-title" className="text-balance">
              Un théâtre pour les enfants, les compagnies&nbsp;émergentes et la
              location
            </h2>
          </div>

          <div className="md:col-span-7 space-y-5 text-ink/90 text-pretty leading-relaxed">
            <p className="text-lg">
              <strong>Une grande partie de la programmation</strong> est dédiée
              aux spectacles jeunes et très jeunes publics tout au long de la
              saison, et particulièrement pendant les vacances scolaires.
            </p>
            <p>
              Acte 2 Théâtre est aussi un lieu{" "}
              <strong>accessible aux compagnies émergentes</strong> — un espace
              ouvert à l&apos;expérience, à la créativité et au pas-de-côté. On
              y croise des premières créations, des cartes blanches, des paris
              artistiques.
            </p>
            <p>
              Et parce qu&apos;une salle vit aussi quand elle est habitée
              autrement, nous l&apos;ouvrons à la{" "}
              <strong>
                <Link
                  href="/entreprise"
                  className="text-rouge-600 dark:text-or-400 underline underline-offset-2"
                >
                  location pour vos événements professionnels
                </Link>
              </strong>{" "}
              : séminaires, comités d&apos;entreprise, arbres de Noël,
              répétitions ou tournages.
            </p>

            <ul className="grid grid-cols-2 gap-3 pt-3 not-prose">
              <li className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-or-500" aria-hidden="true" />
                Jeune public dès 18&nbsp;mois
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-or-500" aria-hidden="true" />
                Compagnies émergentes
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-or-500" aria-hidden="true" />
                Stages vacances scolaires
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-or-500" aria-hidden="true" />
                Salle disponible à la location
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────── DÉFINITION CANONIQUE (GEO / extractible IA) ──────────────── */}
      <section
        aria-label="Présentation"
        className="container max-w-4xl py-12 md:py-16"
      >
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <p className="md:col-span-8 text-lg leading-relaxed text-ink/90 text-pretty">
            <strong>Acte 2 Théâtre</strong> est un théâtre de proximité
            indépendant ouvert depuis <time dateTime="2007-02-06">2007</time>{" "}
            au 32 quai Arloing, dans le 9<sup>e</sup> arrondissement de Lyon
            (quartier de Vaise). Sa salle intimiste de{" "}
            <strong>100 places</strong> en configuration cabaret accueille
            chaque saison une programmation pluridisciplinaire&nbsp;: spectacles
            jeune public dès 18 mois, théâtre contemporain et classique,
            séances scolaires, ateliers de pratique amateur et stages vacances.
            La billetterie est assurée par <strong>Mapado</strong>.
          </p>
          <div className="md:col-span-4 text-sm text-ink-muted space-y-2 md:border-l md:border-divider/15 md:pl-6">
            <p className="font-display text-base text-ink">
              En un coup d&apos;œil
            </p>
            <p>
              <strong>Saison&nbsp;:</strong> 2025-2026
            </p>
            <p>
              <strong>Salle&nbsp;:</strong> 100 places, configuration cabaret
            </p>
            <p>
              <strong>Genres&nbsp;:</strong> jeune public, théâtre, magie,
              scolaire
            </p>
            <p>
              <strong>Tarifs&nbsp;:</strong> 8€ à 18€ — abonnement 110€
            </p>
            <p>
              <strong>Adresse&nbsp;:</strong> 32 quai Arloing, 69009 Lyon
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────── À L'AFFICHE ──────────────── */}
      {vedettes.length > 0 && (
        <section
          className="container py-16 md:py-24"
          aria-labelledby="vedettes-title"
        >
          <header className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
            <div>
              <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
                À l&apos;affiche cette saison
              </p>
              <h2 id="vedettes-title" className="text-balance">
                Spectacles à ne pas manquer
              </h2>
            </div>
            <Link
              href="/spectacles"
              className="inline-flex items-center gap-1.5 text-rouge-600 dark:text-or-400 hover:text-rouge-700 dark:hover:text-or-300 font-medium transition-colors"
            >
              Toute la programmation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vedettes.map((spectacle, i) => (
              <SpectacleCard
                key={spectacle._id}
                spectacle={spectacle}
                featured
                priority={i === 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* ──────────────── BANDEAU "HAPPY CULTURE" ──────────────── */}
      <section
        aria-labelledby="banner-title"
        className="relative bg-nuit-950 text-craie-100 overflow-hidden"
      >
        <Image
          src="/images/scene-banderole.webp"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover opacity-25"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nuit-950 via-nuit-950/70 to-transparent" />
        <div className="relative container max-w-5xl py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-or-400 uppercase tracking-[0.3em] text-xs mb-4">
              Happy Culture
            </p>
            <h2 id="banner-title" className="text-balance mb-5">
              <span className="text-or-500">Un théâtre vivant</span>, à taille
              humaine
            </h2>
            <p className="text-craie-100/85 leading-relaxed mb-6 text-pretty">
              Depuis 2007, Acte 2 Théâtre fait dialoguer compagnies invitées,
              créations maison et publics fidèles. 100 fauteuils rouges, une
              scène intime, et l&apos;envie chevillée au corps de partager une
              culture qui rend heureux.
            </p>
            <Link href="/soutenir" className="btn-primary">
              <Heart className="w-4 h-4" aria-hidden="true" />
              Nous soutenir
            </Link>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-scene">
            <Image
              src="/images/sieges-rouges.webp"
              alt="Rangées de sièges en velours rouge dans la salle de Acte 2 Théâtre, Lyon 9 Vaise"
              fill
              loading="lazy"
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ──────────────── PROCHAINS SPECTACLES ──────────────── */}
      {aVenir.length > 0 && (
        <section
          className="bg-surface-2/40 py-16 md:py-24"
          aria-labelledby="avenir-title"
        >
          <div className="container">
            <header className="mb-10">
              <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
                Calendrier
              </p>
              <h2 id="avenir-title">Prochains spectacles</h2>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aVenir.slice(0, 8).map((spectacle) => (
                <SpectacleCard key={spectacle._id} spectacle={spectacle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────── ATELIERS TEASER ──────────────── */}
      {ateliers.length > 0 && (
        <section
          className="container py-16 md:py-24"
          aria-labelledby="ateliers-title"
        >
          <header className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
            <div>
              <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
                Pratique &amp; transmission
              </p>
              <h2 id="ateliers-title" className="text-balance">
                Ateliers, stages et énergétique chinoise
              </h2>
            </div>
            <Link
              href="/ateliers"
              className="inline-flex items-center gap-1.5 text-rouge-600 dark:text-or-400 hover:text-rouge-700 dark:hover:text-or-300 font-medium transition-colors"
            >
              Tous les ateliers
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ateliers.slice(0, 3).map((a) => (
              <article
                key={a._id}
                className="group rounded-xl overflow-hidden border border-divider/15 bg-surface hover:shadow-scene transition-all"
              >
                <div className="aspect-[4/3] relative bg-surface-2 overflow-hidden">
                  {a.image && (
                    <Image
                      src={a.image.asset?.url ?? ""}
                      alt={a.image.alt || a.titre}
                      fill
                      sizes="(min-width:768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <div className="p-5">
                  <p className="tag-category mb-3">
                    <Users className="inline w-3 h-3 mr-1" aria-hidden="true" />
                    {a.publicCible || "Tout public"}
                  </p>
                  <h3 className="text-lg mb-1 leading-tight">
                    <Link
                      href="/ateliers"
                      className="hover:text-rouge-600 dark:hover:text-or-400 transition-colors"
                    >
                      {a.titre}
                    </Link>
                  </h3>
                  {a.tarif && (
                    <p className="text-sm text-ink-muted">{a.tarif}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ──────────────── GALERIE — LE THÉÂTRE EN IMAGES ──────────────── */}
      <section
        aria-labelledby="galerie-title"
        className="container py-16 md:py-24"
      >
        <header className="mb-10 max-w-2xl">
          <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
            Découvrir la salle
          </p>
          <h2 id="galerie-title" className="text-balance">
            Le théâtre en images
          </h2>
          <p className="text-ink-muted mt-3 text-pretty">
            Cent fauteuils en velours rouge, une scène intimiste éclairée par
            ses projecteurs, l&apos;enseigne jaune <em>Happy Culture</em> qui
            signe l&apos;esprit du lieu&nbsp;: bienvenue dans le 9
            <sup>e</sup> arrondissement de Lyon, à deux pas du quai Arloing.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* Image 1 — la salle complète (hauteur dominante, golden ratio 1.618) */}
          <figure className="md:col-span-7 md:row-span-2 relative aspect-[16/10] md:aspect-auto md:min-h-[480px] rounded-xl overflow-hidden shadow-scene group">
            <Image
              src="/images/la-salle.webp"
              alt="Salle de Acte 2 Théâtre vue depuis le balcon : sièges rouges en velours et scène équipée de projecteurs et d'une échelle, Lyon 9 Vaise"
              fill
              sizes="(min-width:768px) 60vw, 100vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-nuit-950/80 via-nuit-950/30 to-transparent text-craie-100 text-sm">
              <strong className="font-display text-base">La salle</strong>{" "}
              · 100 places assises, configuration cabaret
            </figcaption>
          </figure>

          {/* Image 2 — banderole sur scène */}
          <figure className="md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden shadow-scene group">
            <Image
              src="/images/scene-banderole.webp"
              alt="Scène de Acte 2 Théâtre avec sa grande banderole jaune « Acte 2 Théâtre — Happy Culture » et ses chaises en bois rouge avant un spectacle"
              fill
              sizes="(min-width:768px) 40vw, 100vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-nuit-950/80 via-nuit-950/30 to-transparent text-craie-100 text-sm">
              <strong className="font-display text-base">La scène</strong>{" "}
              · enseigne <em>Happy Culture</em>
            </figcaption>
          </figure>

          {/* Image 3 — espace bar / accueil */}
          <figure className="md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden shadow-scene group">
            <Image
              src="/images/espace-bar.webp"
              alt="Espace bar et accueil de Acte 2 Théâtre — fauteuils en velours rouge, tables hautes en bois et écran lumineux, ambiance feutrée pour boire un verre avant ou après le spectacle, Lyon 9 Vaise"
              fill
              sizes="(min-width:768px) 40vw, 100vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-nuit-950/80 via-nuit-950/30 to-transparent text-craie-100 text-sm">
              <strong className="font-display text-base">L&apos;espace bar</strong>{" "}
              · accueil avant et après les spectacles
            </figcaption>
          </figure>

          {/* Image 4 — sièges rouges plein cadre */}
          <figure className="md:col-span-6 relative aspect-[16/10] rounded-xl overflow-hidden shadow-scene group">
            <Image
              src="/images/sieges-rouges.webp"
              alt="Rangées de sièges en velours rouge dans la salle de Acte 2 Théâtre, configuration cabaret intimiste de 100 places à Lyon"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-nuit-950/80 via-nuit-950/30 to-transparent text-craie-100 text-sm">
              <strong className="font-display text-base">Les fauteuils</strong>{" "}
              · velours rouge, ambiance feutrée
            </figcaption>
          </figure>

          {/* Image 5 — bandeau identité (graffiti acte 2 + abeille jaune) */}
          <figure className="md:col-span-6 relative aspect-[16/10] rounded-xl overflow-hidden shadow-scene group">
            <Image
              src="/images/titre-bandeau.webp"
              alt="Identité visuelle de Acte 2 Théâtre : graffiti street-art « Acte 2 », abeille jaune emblématique « Happy Culture » et intérieur de la salle aux sièges rouges"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-nuit-950/80 via-nuit-950/30 to-transparent text-craie-100 text-sm">
              <strong className="font-display text-base">L&apos;identité</strong>{" "}
              · graffiti, abeille jaune et velours rouge
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ──────────────── COMMENT VENIR (SEO local + accessibilité) ──────────────── */}
      <section
        aria-labelledby="acces-title"
        className="bg-surface-2/40 border-t border-divider/15 py-14 md:py-20"
      >
        <div className="container max-w-5xl">
          <header className="mb-8 max-w-2xl">
            <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
              Accès &amp; informations pratiques
            </p>
            <h2 id="acces-title">Comment venir à Acte 2 Théâtre</h2>
            <p className="text-ink-muted mt-3">
              Le théâtre se situe au <strong>32 quai Arloing, 69009 Lyon</strong>,
              au cœur du quartier de Vaise — accessible facilement en transports
              en commun comme en voiture.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <article className="rounded-xl border border-divider/15 bg-surface p-5">
              <div className="flex items-center gap-2 mb-2">
                <Bus
                  className="w-5 h-5 text-or-500"
                  aria-hidden="true"
                />
                <h3 className="text-base font-semibold !text-base">En bus</h3>
              </div>
              <p className="text-sm text-ink/85">
                Lignes <strong>C14</strong>, <strong>C6</strong> et{" "}
                <strong>31</strong> — arrêt <em>Place Valmy</em>, à 2 minutes
                à pied du théâtre.
              </p>
            </article>
            <article className="rounded-xl border border-divider/15 bg-surface p-5">
              <div className="flex items-center gap-2 mb-2">
                <TramFront
                  className="w-5 h-5 text-or-500"
                  aria-hidden="true"
                />
                <h3 className="text-base font-semibold !text-base">En métro</h3>
              </div>
              <p className="text-sm text-ink/85">
                Ligne <strong>D</strong> station <em>Gorge de Loup</em>, puis
                10 minutes à pied le long du quai Arloing.
              </p>
            </article>
            <article className="rounded-xl border border-divider/15 bg-surface p-5">
              <div className="flex items-center gap-2 mb-2">
                <ParkingCircle
                  className="w-5 h-5 text-or-500"
                  aria-hidden="true"
                />
                <h3 className="text-base font-semibold !text-base">En voiture</h3>
              </div>
              <p className="text-sm text-ink/85">
                Parking <strong>Indigo Saint-Paul</strong> à proximité, ou
                stationnement en zone bleue dans les rues adjacentes.
              </p>
            </article>
          </div>

          <p className="mt-6 text-sm text-ink-muted">
            Plan d&apos;accès, équipe et formulaire de contact sur la{" "}
            <Link
              href="/contact"
              className="text-rouge-600 dark:text-or-400 underline underline-offset-2"
            >
              page Contact
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ──────────────── BLOC SEO ──────────────── */}
      <SeoBody
        kicker="Théâtre de proximité — Lyon 9"
        titre="Acte 2 Théâtre, une salle de théâtre indépendante au cœur de Vaise"
        accroche="Au 32 quai Arloing, à deux pas de la gare de Vaise, Acte 2 Théâtre fait vivre la culture autrement : programmation éclectique pour toute la famille, ateliers ouverts aux amateurs, salle privatisable pour vos événements professionnels et un esprit « Happy Culture » assumé. Bienvenue dans l'un des derniers théâtres de proximité de Lyon."
        sections={[
          {
            titre: "Une saison pensée pour rassembler petits et grands",
            paragraphes: [
              "La <strong>saison 2025-2026 de Acte 2 Théâtre</strong> propose une trentaine de spectacles à l'année, avec un équilibre soigneusement construit entre <strong>jeune public</strong> (dès 18 mois), <strong>théâtre adulte</strong> (créations contemporaines et grands textes), <strong>magie</strong>, <strong>seuls-en-scène</strong> et <strong>séances scolaires</strong>. Notre parti pris : programmer des compagnies engagées, souvent indépendantes, avec une exigence artistique forte mais des tarifs accessibles. Les places adulte démarrent à 13 €, les places enfant à 12 €, et plusieurs formules d'abonnement permettent de revenir plusieurs fois dans la saison sans faire exploser le budget.",
              "Cette politique tarifaire est rendue possible par notre format : une <strong>salle de 100 places</strong> en configuration cabaret, où l'on est toujours proche de la scène, sans jamais avoir à plisser les yeux pour suivre une expression. Cette intimité est ce qui distingue Acte 2 Théâtre des grandes salles lyonnaises : ici, le rapport entre la scène et le public est direct, presque physique.",
            ],
          },
          {
            titre: "Du théâtre, mais pas seulement",
            paragraphes: [
              "Au-delà de la programmation, Acte 2 Théâtre vit toute la semaine grâce à ses <strong>ateliers</strong> : un cours de <strong>théâtre adulte</strong> hebdomadaire, animé par des comédiens professionnels, qui se conclut chaque saison par une représentation publique sur notre scène ; des <strong>stages enfants 10-14 ans</strong> pendant les vacances scolaires ; et un atelier d'<strong>énergétique chinoise</strong> pour celles et ceux qui cherchent une pratique corporelle douce et un moment de respiration dans la semaine. Tous niveaux, tous âges : le théâtre est ouvert.",
              "Nous accueillons aussi très régulièrement des <strong>écoles, crèches, centres aérés et MJC</strong> en séance dédiée — une formule pratique pour les enseignants qui veulent emmener une classe à un spectacle adapté, avec un tarif groupe et un dialogue direct avec l'équipe pour préparer la sortie.",
            ],
          },
          {
            titre: "Une salle qui se loue pour vos événements",
            paragraphes: [
              "Le théâtre se transforme aussi régulièrement en <strong>lieu d'événement professionnel</strong>. Comités d'entreprise (CSE), arbres de Noël, séminaires, lancements produit, conférences, soirées de cohésion : la configuration cabaret de 100 places, l'<strong>espace bar intégré</strong> et la possibilité d'ajouter un régisseur professionnel font de Acte 2 Théâtre un lieu particulièrement adapté aux soirées qui doivent informer, divertir et marquer les esprits. Les compagnies, écoles de théâtre et collectifs artistiques l'utilisent également pour des <strong>résidences</strong>, des répétitions filées et des captations vidéo.",
              "Plus d'informations sur la page <a href=\"/location-salle\">location de salle</a> ou directement sur la page <a href=\"/entreprise\">espace entreprise</a>, avec une demande de devis traitée sous 24 à 48 heures ouvrées.",
            ],
          },
          {
            titre: "Un théâtre soutenu par sa communauté",
            paragraphes: [
              "Acte 2 Théâtre est une <strong>structure indépendante</strong>, sans subvention de fonctionnement régulière. Nos ressources viennent de la billetterie, des ateliers, des locations professionnelles et — c'est essentiel — du <strong>soutien direct du public</strong>. Plusieurs façons de nous aider : prendre une carte d'abonnement, offrir une place en cadeau, parrainer une saison, organiser votre événement chez nous, parler de nous autour de vous, ou faire un don déductible (sous conditions). Tous les détails sont sur la page <a href=\"/soutenir\">Nous soutenir</a>.",
              "Au quotidien, l'équipe — direction artistique, administration, technique, communication — est restreinte mais investie. Vous pouvez nous joindre directement par téléphone au <strong>04 78 83 21 71</strong> ou par mail (<a href=\"mailto:acte2theatre@yahoo.fr\">acte2theatre@yahoo.fr</a> pour l'administration, <a href=\"mailto:acte2resa@yahoo.fr\">acte2resa@yahoo.fr</a> pour les réservations groupées). La page <a href=\"/contact\">contact</a> regroupe toutes les coordonnées utiles ainsi qu'une carte numérique téléchargeable au format vCard.",
            ],
          },
          {
            titre: "Comment venir, et pourquoi revenir",
            paragraphes: [
              "L'accès est très simple en transports : <strong>métro D, station Gorge de Loup</strong> (10 minutes à pied le long du Rhône), <strong>bus C14, C6 ou 31, arrêt Place Valmy</strong> (2 minutes à pied), ou <strong>gare SNCF de Vaise</strong> à 5 minutes. En voiture, le parking Indigo Saint-Paul est à proximité immédiate et plusieurs zones bleues permettent de stationner gratuitement le soir. La salle est accessible aux personnes à mobilité réduite : prévenez-nous lors de la réservation pour que nous préparions votre accueil.",
              "Et puis, surtout, on revient à Acte 2 Théâtre parce qu'on s'y sent bien. C'est un lieu de quartier, où l'on croise volontiers l'équipe au bar entre deux représentations, où le public échange après le spectacle, où l'on tombe parfois sur les comédiens autour d'un verre. C'est ça, l'esprit <em>Happy Culture</em> : un théâtre qui sait rester généreux et léger, sans rien sacrifier à l'exigence. À très bientôt sous nos lumières.",
            ],
          },
        ]}
        liens={[
          { href: "/spectacles", label: "Toute la programmation 2025-2026" },
          { href: "/ateliers", label: "Cours et stages" },
          { href: "/entreprise", label: "Privatiser la salle" },
          { href: "/soutenir", label: "Nous soutenir" },
          { href: "/contact", label: "Toutes les coordonnées" },
        ]}
        fond="surface-2"
      />

      {/* ──────────────── ÉTAT VIDE ──────────────── */}
      {vedettes.length === 0 && aVenir.length === 0 && (
        <section className="py-24">
          <div className="container max-w-2xl text-center">
            <h2 className="mb-4">La saison se prépare</h2>
            <p className="text-lg text-ink-muted">
              La programmation de la prochaine saison sera bientôt en ligne.
              Pour ne rien manquer, écrivez-nous à{" "}
              <a
                href="mailto:acte2theatre@yahoo.fr"
                className="text-rouge-600 dark:text-or-400 underline"
              >
                acte2theatre@yahoo.fr
              </a>
              .
            </p>
          </div>
        </section>
      )}
    </>
  );
}
