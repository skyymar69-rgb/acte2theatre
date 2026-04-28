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
import { FileText, Clock, Users, Calendar } from "lucide-react";

export const revalidate = 3600;

/** Pré-génère les pages au build pour des perfs maximales */
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
  return {
    title: spectacle.seoTitre || spectacle.titre,
    description: spectacle.seoDescription || spectacle.resume,
    openGraph: {
      title: spectacle.titre,
      description: spectacle.resume,
      images: spectacle.imagePrincipale
        ? [
            {
              url: urlFor(spectacle.imagePrincipale)
                .width(1200)
                .height(630)
                .url(),
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
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

  /** JSON-LD Schema.org Event — bénéfice SEO majeur (rich snippets Google) */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TheaterEvent",
    name: spectacle.titre,
    description: spectacle.resume,
    image: spectacle.imagePrincipale
      ? urlFor(spectacle.imagePrincipale).width(1200).url()
      : undefined,
    location: {
      "@type": "PerformingArtsTheater",
      name: "Acte 2 Théâtre",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lyon",
        addressCountry: "FR",
      },
    },
    performer: spectacle.compagnie
      ? { "@type": "TheaterGroup", name: spectacle.compagnie }
      : undefined,
    offers: spectacle.mapadoUrl
      ? {
          "@type": "Offer",
          url: spectacle.mapadoUrl,
          price: spectacle.tarifAdulte,
          priceCurrency: "EUR",
        }
      : undefined,
    startDate: representationsAVenir[0]?.dateHeure,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="bg-curtain-50">
        {/* Hero */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-curtain-200">
          <Image
            src={urlFor(spectacle.imagePrincipale).width(1920).url()}
            alt={spectacle.imagePrincipale.alt || spectacle.titre}
            fill
            priority
            className="object-cover"
            placeholder={
              spectacle.imagePrincipale.asset.metadata?.lqip
                ? "blur"
                : undefined
            }
            blurDataURL={spectacle.imagePrincipale.asset.metadata?.lqip}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-curtain-950/80 to-transparent" />
        </div>

        <div className="container py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              {spectacle.categorie && (
                <Link
                  href={`/spectacles?categorie=${spectacle.categorie.slug}`}
                  className="inline-block text-sm font-medium text-stage-700 uppercase tracking-wider mb-3 hover:text-stage-800"
                >
                  {spectacle.categorie.nom}
                </Link>
              )}
              <h1 className="mb-3">{spectacle.titre}</h1>
              {spectacle.compagnie && (
                <p className="text-xl text-curtain-700 mb-6">
                  par {spectacle.compagnie}
                </p>
              )}

              {/* Méta */}
              <div className="flex flex-wrap gap-4 mb-8 text-curtain-700 text-sm">
                {spectacle.publicCible && (
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {spectacle.publicCible}
                  </span>
                )}
                {spectacle.dureeMinutes && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {formatDuration(spectacle.dureeMinutes)}
                  </span>
                )}
              </div>

              {spectacle.resume && (
                <p className="text-lg text-curtain-800 mb-8 leading-relaxed">
                  {spectacle.resume}
                </p>
              )}

              {spectacle.description && (
                <div className="prose-acte2">
                  <PortableText value={spectacle.description} />
                </div>
              )}

              {/* Distribution */}
              {spectacle.distribution && spectacle.distribution.length > 0 && (
                <section className="mt-10 pt-8 border-t border-curtain-200">
                  <h2 className="text-2xl mb-4">Distribution</h2>
                  <ul className="space-y-2">
                    {spectacle.distribution.map((m, i) => (
                      <li key={i} className="text-curtain-800">
                        <span className="font-medium">{m.nom}</span>
                        {m.role && (
                          <span className="text-curtain-600"> — {m.role}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Vidéo */}
              {spectacle.videoUrl && (
                <section className="mt-10 pt-8 border-t border-curtain-200">
                  <h2 className="text-2xl mb-4">Extrait vidéo</h2>
                  <a
                    href={spectacle.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stage-700 hover:text-stage-800 underline underline-offset-4"
                  >
                    Voir l&apos;extrait sur {new URL(spectacle.videoUrl).hostname}
                  </a>
                </section>
              )}

              {/* Documents */}
              {(spectacle.dossierPresse || spectacle.dossierPedagogique) && (
                <section className="mt-10 pt-8 border-t border-curtain-200">
                  <h2 className="text-2xl mb-4">Documents</h2>
                  <ul className="space-y-2">
                    {spectacle.dossierPresse && (
                      <li>
                        <a
                          href={spectacle.dossierPresse.asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-stage-700 hover:text-stage-800"
                        >
                          <FileText className="w-4 h-4" />
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
                          className="inline-flex items-center gap-2 text-stage-700 hover:text-stage-800"
                        >
                          <FileText className="w-4 h-4" />
                          Dossier pédagogique (PDF)
                        </a>
                      </li>
                    )}
                  </ul>
                </section>
              )}
            </div>

            {/* Sidebar : dates + tarifs + CTA Mapado */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 bg-white rounded-lg border border-curtain-200 p-6 shadow-sm">
                <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-stage-600" />
                  Dates
                </h2>
                {representationsAVenir.length > 0 ? (
                  <ul className="space-y-3 mb-6">
                    {representationsAVenir.map((r, i) => (
                      <li
                        key={i}
                        className={cn(
                          "text-sm",
                          r.complet && "text-curtain-500 line-through"
                        )}
                      >
                        <div className="font-medium text-curtain-900">
                          {formatDateTime(r.dateHeure)}
                        </div>
                        {r.note && (
                          <div className="text-xs text-curtain-600">
                            {r.note}
                          </div>
                        )}
                        {r.complet && (
                          <span className="inline-block mt-1 text-xs font-semibold text-stage-700">
                            COMPLET
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-curtain-600 mb-6">
                    Aucune date à venir.
                  </p>
                )}

                {/* Tarifs */}
                {(spectacle.tarifAdulte || spectacle.tarifEnfant) && (
                  <div className="mb-6 pb-6 border-b border-curtain-200">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-curtain-600 mb-2">
                      Tarifs
                    </h3>
                    <ul className="space-y-1 text-sm">
                      {spectacle.tarifAdulte != null && (
                        <li className="flex justify-between">
                          <span>Adulte</span>
                          <span className="font-medium">
                            {formatPrice(spectacle.tarifAdulte)}
                          </span>
                        </li>
                      )}
                      {spectacle.tarifEnfant != null && (
                        <li className="flex justify-between">
                          <span>Enfant</span>
                          <span className="font-medium">
                            {formatPrice(spectacle.tarifEnfant)}
                          </span>
                        </li>
                      )}
                      {spectacle.tarifReduit != null && (
                        <li className="flex justify-between">
                          <span>Tarif réduit</span>
                          <span className="font-medium">
                            {formatPrice(spectacle.tarifReduit)}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* CTA réservation */}
                {spectacle.mapadoUrl && (
                  <a
                    href={spectacle.mapadoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 bg-stage-600 hover:bg-stage-700 text-white rounded font-medium transition-colors"
                  >
                    Réserver
                  </a>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
