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
import { ArrowRight, Ticket, Users, Heart } from "lucide-react";

export const revalidate = 3600;

export default async function HomePage() {
  const [vedettes, aVenir, ateliers] = await Promise.all([
    sanityFetch<SpectaclePreview[]>({
      query: SPECTACLES_VEDETTE_QUERY,
      tags: ["spectacle"],
    }),
    sanityFetch<SpectaclePreview[]>({
      query: SPECTACLES_A_VENIR_QUERY,
      tags: ["spectacle"],
    }),
    sanityFetch<Atelier[]>({
      query: ATELIERS_QUERY,
      tags: ["atelier"],
    }),
  ]);

  return (
    <>
      {/* ──────────────── HERO ──────────────── */}
      <section
        className="relative isolate overflow-hidden bg-nuit-950 text-craie-100"
        aria-labelledby="hero-title"
      >
        {/* Image de fond — la salle vue depuis la scène */}
        <Image
          src="/images/la-salle.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
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
            Théâtre de proximité · Lyon 9 · Vaise
          </p>

          <h1
            id="hero-title"
            className="font-display !text-5xl md:!text-7xl lg:!text-8xl text-balance mb-6 leading-[1.05]"
          >
            Acte <span className="text-or-500 italic">2</span>{" "}
            <span className="block md:inline">Théâtre</span>
          </h1>

          <p className="text-or-300/90 font-display italic text-2xl md:text-3xl mb-8 tracking-wide">
            Happy Culture
          </p>

          <p className="text-lg md:text-xl text-craie-100/85 max-w-2xl mb-10 text-pretty leading-relaxed">
            Une saison riche en émotions&nbsp;: spectacles jeune public, théâtre
            contemporain et classique, séances scolaires, ateliers et stages.
            Au cœur de Lyon, une salle de 100 places où l&apos;humain et la
            scène se rencontrent.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/spectacles"
              className="inline-flex items-center gap-2 px-6 md:px-7 py-3.5 bg-rouge-600 hover:bg-rouge-500 text-white rounded-full font-semibold text-base shadow-scene transition-all hover:scale-[1.02]"
            >
              <Ticket className="w-5 h-5" aria-hidden="true" />
              Voir la programmation
            </Link>
            <Link
              href="/ateliers"
              className="inline-flex items-center gap-2 px-6 md:px-7 py-3.5 border-2 border-or-500/60 hover:border-or-500 hover:bg-or-500/10 text-craie-100 rounded-full font-medium text-base transition-all"
            >
              Ateliers & stages
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

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
          src="/images/scene-banderole.jpg"
          alt=""
          fill
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
              src="/images/sieges-rouges.jpg"
              alt="Les fauteuils rouges en velours d'Acte 2 Théâtre, prêts pour le spectacle"
              fill
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

      {/* ──────────────── ÉTAT VIDE ──────────────── */}
      {vedettes.length === 0 && aVenir.length === 0 && (
        <section className="py-24">
          <div className="container max-w-2xl text-center">
            <h2 className="mb-4">Bienvenue sur le nouveau site</h2>
            <p className="text-lg text-ink-muted mb-6">
              Aucun spectacle n&apos;a encore été ajouté. Connectez-vous au{" "}
              <Link
                href="/studio"
                className="text-rouge-600 dark:text-or-400 underline"
              >
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
