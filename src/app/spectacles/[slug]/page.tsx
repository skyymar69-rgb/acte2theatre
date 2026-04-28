import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/lib/sanity/client";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import {
  SPECTACLE_DETAIL_QUERY,
  SPECTACLES_SLUGS_QUERY,
} from "@/lib/sanity/queries";
import type { Spectacle } from "@/lib/sanity/types";
import {
  formatDateTime,
  formatDuration,
  formatPrice,
  cn,
} from "@/lib/utils";
import { FileText, Clock, Users, Calendar, Ticket, ShieldCheck } from "lucide-react";
import {
  JsonLd,
  spectacleEventsJsonLd,
  breadcrumbJsonLd,
} from "@/components/json-ld";
import { Faq, spectacleFaq } from "@/components/faq";
import { NextShowsTeaser } from "@/components/next-shows-teaser";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://acte2theatre.vercel.app";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(SPECTACLES_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spectacle = await sanityFetch<Spectacle | null>({
    query: SPECTACLE_DETAIL_QUERY,
    params: { slug },
    tags: [`spectacle:${slug}`],
  });
  if (!spectacle) return {};

  // Pattern SEO local : "Titre — Théâtre à Lyon · Mois Année · L'Acte 2"
  // Capte les requêtes "[titre] Lyon" et "spectacle [mois année] Lyon".
  const futureRep = (spectacle.representations ?? []).find(
    (r) => new Date(r.dateHeure) >= new Date()
  );
  const moisAnnee = futureRep
    ? new Intl.DateTimeFormat("fr-FR", {
        month: "long",
        year: "numeric",
        timeZone: "Europe/Paris",
      }).format(new Date(futureRep.dateHeure))
    : "saison 2025-2026";

  const titleSeo =
    spectacle.seoTitre ??
    `${spectacle.titre} — Théâtre à Lyon · ${moisAnnee}`;

  const description =
    spectacle.seoDescription ||
    (spectacle.resume
      ? `${spectacle.resume.slice(0, 130)} · Réservez vos places dès ${
          spectacle.tarifEnfant ?? spectacle.tarifAdulte ?? 9
        }€ chez L'Acte 2, Lyon 9.`
      : `${spectacle.titre}${
          spectacle.compagnie ? ` — ${spectacle.compagnie}` : ""
        } à L'Acte 2, Lyon. Réservation en ligne.`);

  return {
    title: titleSeo,
    description,
    alternates: { canonical: `/spectacles/${slug}` },
    openGraph: {
      title: spectacle.titre,
      description,
      type: "article",
      images: spectacle.imagePrincipale
        ? [
            {
              url: urlFor(spectacle.imagePrincipale)
                .width(1200)
                .height(630)
                .quality(85)
                .url(),
              width: 1200,
              height: 630,
              alt: spectacle.imagePrincipale.alt || spectacle.titre,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function SpectaclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spectacle = await sanityFetch<Spectacle | null>({
    query: SPECTACLE_DETAIL_QUERY,
    params: { slug },
    tags: [`spectacle:${slug}`, "spectacle"],
  });

  if (!spectacle) {
    notFound();
  }

  const representationsAVenir = (spectacle.representations || []).filter(
    (r) => new Date(r.dateHeure) >= new Date()
  );

  const eventsLd = spectacleEventsJsonLd({
    siteUrl: SITE_URL,
    titre: spectacle.titre,
    slug,
    resume: spectacle.resume,
    imageUrl: spectacle.imagePrincipale
      ? urlFor(spectacle.imagePrincipale).width(1200).url()
      : undefined,
    compagnie: spectacle.compagnie,
    publicCible: spectacle.publicCible,
    dureeMinutes: spectacle.dureeMinutes,
    representations: representationsAVenir,
    tarifAdulte: spectacle.tarifAdulte,
    tarifReduit: spectacle.tarifReduit,
    mapadoUrl: spectacle.mapadoUrl,
  });

  const breadcrumb = breadcrumbJsonLd(SITE_URL, [
    { name: "Accueil", href: "/" },
    { name: "Programmation", href: "/spectacles" },
    { name: spectacle.titre, href: `/spectacles/${slug}` },
  ]);

  return (
    <>
      {eventsLd?.map((ev, i) => (
        <JsonLd key={i} data={ev} />
      ))}
      <JsonLd data={breadcrumb} />

      <article>
        {/* Hero — image héroïque + dégradé bottom pour le titre */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-nuit-900">
          <Image
            src={urlFor(spectacle.imagePrincipale).width(1920).quality(85).url()}
            alt={spectacle.imagePrincipale.alt || spectacle.titre}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            placeholder={
              spectacle.imagePrincipale.asset.metadata?.lqip
                ? "blur"
                : undefined
            }
            blurDataURL={spectacle.imagePrincipale.asset.metadata?.lqip}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nuit-950/85 via-nuit-950/30 to-transparent" />
        </div>

        <div className="container py-10 md:py-14">
          {/* Fil d'Ariane (visible) */}
          <nav aria-label="Fil d'Ariane" className="text-xs text-ink-muted mb-6">
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
              <li>
                <Link
                  href="/spectacles"
                  className="hover:text-rouge-600 dark:hover:text-or-400"
                >
                  Programmation
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-ink truncate max-w-[18ch]" aria-current="page">
                {spectacle.titre}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              {spectacle.categorie && (
                <Link
                  href={`/spectacles?categorie=${spectacle.categorie.slug}`}
                  className="tag-category mb-3 hover:bg-or-500/30 transition-colors"
                >
                  {spectacle.categorie.nom}
                </Link>
              )}
              <h1 className="mt-3 mb-3 text-balance">{spectacle.titre}</h1>
              {spectacle.compagnie && (
                <p className="text-xl text-ink-muted italic mb-6">
                  par {spectacle.compagnie}
                </p>
              )}

              {/* Méta */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-ink-muted text-sm">
                {spectacle.publicCible && (
                  <span className="inline-flex items-center gap-1.5">
                    <Users
                      className="w-4 h-4 text-or-500"
                      aria-hidden="true"
                    />
                    {spectacle.publicCible}
                  </span>
                )}
                {spectacle.dureeMinutes && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock
                      className="w-4 h-4 text-or-500"
                      aria-hidden="true"
                    />
                    {formatDuration(spectacle.dureeMinutes)}
                  </span>
                )}
              </div>

              {spectacle.resume && (
                <p className="text-lg text-ink mb-8 leading-relaxed text-pretty">
                  {spectacle.resume}
                </p>
              )}

              {spectacle.description && (
                <div className="prose-acte2 max-w-none">
                  <PortableText value={spectacle.description} />
                </div>
              )}

              {/* Distribution */}
              {spectacle.distribution && spectacle.distribution.length > 0 && (
                <section className="mt-10 pt-8 border-t border-divider/15">
                  <h2 className="text-2xl mb-4">Distribution</h2>
                  <ul className="space-y-2">
                    {spectacle.distribution.map((m, i) => (
                      <li key={i} className="text-ink">
                        <span className="font-semibold">{m.nom}</span>
                        {m.role && (
                          <span className="text-ink-muted"> — {m.role}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Vidéo */}
              {spectacle.videoUrl && (
                <section className="mt-10 pt-8 border-t border-divider/15">
                  <h2 className="text-2xl mb-4">Extrait vidéo</h2>
                  <a
                    href={spectacle.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rouge-600 dark:text-or-400 hover:underline underline-offset-4"
                  >
                    Voir l&apos;extrait sur {new URL(spectacle.videoUrl).hostname}
                  </a>
                </section>
              )}

              {/* Documents */}
              {(spectacle.dossierPresse || spectacle.dossierPedagogique) && (
                <section className="mt-10 pt-8 border-t border-divider/15">
                  <h2 className="text-2xl mb-4">Documents</h2>
                  <ul className="space-y-2">
                    {spectacle.dossierPresse && (
                      <li>
                        <a
                          href={spectacle.dossierPresse.asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-rouge-600 dark:text-or-400 hover:underline"
                        >
                          <FileText className="w-4 h-4" aria-hidden="true" />
                          Dossier de presse (PDF)
                        </a>
                      </li>
                    )}
                    {spectacle.dossierPedagogique && (
                      <li>
                        <a
                          href={spectacle.dossierPedagogique.asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-rouge-600 dark:text-or-400 hover:underline"
                        >
                          <FileText className="w-4 h-4" aria-hidden="true" />
                          Dossier pédagogique (PDF)
                        </a>
                      </li>
                    )}
                  </ul>
                </section>
              )}

              {/* FAQ — extractible IA + rich snippets Google */}
              <section className="mt-12 pt-10 border-t border-divider/15">
                <Faq
                  title="Bon à savoir"
                  items={spectacleFaq({
                    publicCible: spectacle.publicCible,
                    dureeMinutes: spectacle.dureeMinutes,
                    tarifAdulte: spectacle.tarifAdulte,
                    tarifEnfant: spectacle.tarifEnfant,
                    mapadoUrl: spectacle.mapadoUrl,
                  })}
                />
              </section>
            </div>

            {/* Sidebar : dates + tarifs + CTA Mapado */}
            <aside aria-label="Réservation" className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 bg-surface rounded-xl border border-divider/15 p-6 shadow-sm">
                <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                  <Calendar
                    className="w-5 h-5 text-or-500"
                    aria-hidden="true"
                  />
                  Dates
                </h2>
                {representationsAVenir.length > 0 ? (
                  <ul className="space-y-3 mb-6">
                    {representationsAVenir.map((r, i) => (
                      <li
                        key={i}
                        className={cn(
                          "text-sm",
                          r.complet && "text-ink-muted line-through"
                        )}
                      >
                        <div className="font-medium text-ink">
                          {formatDateTime(r.dateHeure)}
                        </div>
                        {r.note && (
                          <div className="text-xs text-ink-muted">
                            {r.note}
                          </div>
                        )}
                        {r.complet && (
                          <span className="inline-block mt-1 text-xs font-semibold text-rouge-600">
                            COMPLET
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-ink-muted mb-6">
                    Aucune date à venir.
                  </p>
                )}

                {/* Tarifs */}
                {(spectacle.tarifAdulte ||
                  spectacle.tarifEnfant ||
                  spectacle.tarifReduit) && (
                  <div className="mb-6 pb-6 border-b border-divider/15">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted mb-2">
                      Tarifs
                    </h3>
                    <ul className="space-y-1 text-sm">
                      {spectacle.tarifAdulte != null && (
                        <li className="flex justify-between">
                          <span>Adulte</span>
                          <span className="font-semibold">
                            {formatPrice(spectacle.tarifAdulte)}
                          </span>
                        </li>
                      )}
                      {spectacle.tarifEnfant != null && (
                        <li className="flex justify-between">
                          <span>Enfant</span>
                          <span className="font-semibold">
                            {formatPrice(spectacle.tarifEnfant)}
                          </span>
                        </li>
                      )}
                      {spectacle.tarifReduit != null && (
                        <li className="flex justify-between">
                          <span>Tarif réduit</span>
                          <span className="font-semibold">
                            {formatPrice(spectacle.tarifReduit)}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* CTA réservation Mapado */}
                <a
                  href={spectacle.mapadoUrl ?? "https://acte2theatre.mapado.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  <Ticket className="w-4 h-4" aria-hidden="true" />
                  Réserver mes places
                </a>
                <p className="mt-3 text-xs text-ink-muted flex items-start gap-1.5 leading-relaxed">
                  <ShieldCheck
                    className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-or-500"
                    aria-hidden="true"
                  />
                  Paiement sécurisé via Mapado · Billets envoyés par email ·
                  Places sur place 30&nbsp;min avant si disponibles.
                </p>

                {/* Billetteries partenaires — réservations alternatives */}
                <div className="mt-5 pt-4 border-t border-divider/15">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-muted mb-2">
                    Aussi disponible sur
                  </p>
                  <ul className="space-y-1.5 text-sm">
                    <li>
                      <a
                        href="https://www.billetreduc.com/4486/salle.htm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-ink hover:text-rouge-600 dark:hover:text-or-400 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-or-500" aria-hidden="true" />
                        BilletReduc
                        <span className="sr-only">
                          {" "}(ouvre dans un nouvel onglet)
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.ticketac.com/salles/lyon-acte-2-theatre.htm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-ink hover:text-rouge-600 dark:hover:text-or-400 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-or-500" aria-hidden="true" />
                        Ticketac
                        <span className="sr-only">
                          {" "}(ouvre dans un nouvel onglet)
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Internal linking : autres spectacles à venir */}
      <NextShowsTeaser
        title="Continuez la saison"
        subtitle="D'autres rendez-vous à découvrir cette saison à Acte 2."
        limit={3}
      />
    </>
  );
}
