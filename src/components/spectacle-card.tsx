import Image from "next/image";
import Link from "next/link";
import type { SpectaclePreview } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { formatDate, formatDuration, cn } from "@/lib/utils";

export function SpectacleCard({
  spectacle,
  featured = false,
}: {
  spectacle: SpectaclePreview;
  featured?: boolean;
}) {
  const prochaineDate = spectacle.representations?.[0]?.dateHeure;

  return (
    <article
      className={cn(
        "group bg-white rounded-lg overflow-hidden border border-curtain-200 hover:border-curtain-300 transition-all hover:shadow-md flex flex-col",
        featured && "lg:col-span-1"
      )}
    >
      <Link
        href={`/spectacles/${spectacle.slug}`}
        className="block aspect-[4/3] relative bg-curtain-100 overflow-hidden"
      >
        {spectacle.imagePrincipale && (
          <Image
            src={urlFor(spectacle.imagePrincipale).width(800).url()}
            alt={spectacle.imagePrincipale.alt || spectacle.titre}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder={
              spectacle.imagePrincipale.asset.metadata?.lqip ? "blur" : undefined
            }
            blurDataURL={spectacle.imagePrincipale.asset.metadata?.lqip}
          />
        )}
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        {spectacle.categorie && (
          <p className="text-xs font-medium uppercase tracking-wider text-stage-700 mb-2">
            {spectacle.categorie.nom}
          </p>
        )}

        <h3 className="text-xl mb-2 leading-tight">
          <Link
            href={`/spectacles/${spectacle.slug}`}
            className="hover:text-stage-700 transition-colors"
          >
            {spectacle.titre}
          </Link>
        </h3>

        {spectacle.compagnie && (
          <p className="text-sm text-curtain-600 mb-3">{spectacle.compagnie}</p>
        )}

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-curtain-600 mb-3">
          {spectacle.publicCible && <span>{spectacle.publicCible}</span>}
          {spectacle.dureeMinutes && (
            <span>{formatDuration(spectacle.dureeMinutes)}</span>
          )}
        </div>

        {spectacle.resume && (
          <p className="text-sm text-curtain-700 line-clamp-3 mb-4">
            {spectacle.resume}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-curtain-100 flex items-center justify-between text-sm">
          {prochaineDate ? (
            <span className="text-curtain-700">
              <span className="text-curtain-500">Dès le </span>
              {formatDate(prochaineDate, "d MMM")}
            </span>
          ) : (
            <span className="text-curtain-400">Prochaines dates à venir</span>
          )}
          <Link
            href={`/spectacles/${spectacle.slug}`}
            className="text-stage-700 hover:text-stage-800 font-medium"
          >
            Détails →
          </Link>
        </div>
      </div>
    </article>
  );
}
