import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/lib/sanity/client";
import { ATELIERS_QUERY } from "@/lib/sanity/queries";
import type { Atelier } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 3600;

export const metadata = {
  title: "Ateliers",
  description:
    "Stages et ateliers à Acte 2 Théâtre : théâtre, Qi Gong, Tai Chi, soins énergétiques.",
};

const TYPE_LABELS: Record<string, string> = {
  theatre: "Théâtre",
  qigong: "Qi Gong",
  taichi: "Tai Chi",
  energetique: "Soins énergétiques",
  autre: "Autre",
};

export default async function AteliersPage() {
  const ateliers = await sanityFetch<Atelier[]>({
    query: ATELIERS_QUERY,
    tags: ["atelier"],
  });

  return (
    <div className="container py-12 md:py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="mb-3">Ateliers</h1>
        <p className="text-lg text-curtain-700">
          Stages et ateliers réguliers — théâtre pour adultes et enfants,
          énergétique chinoise.
        </p>
      </header>

      {ateliers.length === 0 ? (
        <p className="py-12 text-center text-curtain-600">
          Aucun atelier publié pour le moment.
        </p>
      ) : (
        <div className="space-y-12">
          {ateliers.map((atelier) => (
            <article
              key={atelier._id}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-curtain-200 last:border-b-0"
            >
              {atelier.image && (
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-curtain-100">
                  <Image
                    src={urlFor(atelier.image).width(600).url()}
                    alt={atelier.image.alt || atelier.titre}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <p className="text-sm font-medium uppercase tracking-wider text-stage-700 mb-2">
                  {TYPE_LABELS[atelier.type] ?? atelier.type}
                  {atelier.saison && ` · ${atelier.saison}`}
                </p>
                <h2 className="text-2xl mb-3">{atelier.titre}</h2>
                {atelier.publicCible && (
                  <p className="text-curtain-700 mb-3">
                    <strong>Public :</strong> {atelier.publicCible}
                  </p>
                )}
                {atelier.planning && (
                  <p className="text-curtain-700 whitespace-pre-line mb-3">
                    {atelier.planning}
                  </p>
                )}
                {atelier.tarif && (
                  <p className="text-curtain-700 mb-3">
                    <strong>Tarif :</strong> {atelier.tarif}
                  </p>
                )}
                {atelier.description && (
                  <div className="prose-acte2 mb-4">
                    <PortableText value={atelier.description} />
                  </div>
                )}
                <div className="flex flex-wrap gap-3 mt-4">
                  {atelier.inscriptionUrl && (
                    <a
                      href={atelier.inscriptionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-5 py-2.5 bg-stage-600 hover:bg-stage-700 text-white rounded font-medium transition-colors"
                    >
                      S&apos;inscrire
                    </a>
                  )}
                  {atelier.contactEmail && (
                    <a
                      href={`mailto:${atelier.contactEmail}`}
                      className="inline-flex items-center px-5 py-2.5 border border-curtain-300 hover:bg-curtain-100 rounded font-medium transition-colors"
                    >
                      Nous contacter
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
