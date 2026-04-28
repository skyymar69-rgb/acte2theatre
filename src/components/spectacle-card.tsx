import Image from "next/image";
import Link from "next/link";
import type { SpectaclePreview } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { formatDate, formatDuration, cn } from "@/lib/utils";
import { Calendar, Clock, Users } from "lucide-react";

export function SpectacleCard({
  spectacle,
  featured = false,
  priority = false,
}: {
  spectacle: SpectaclePreview;
  featured?: boolean;
  priority?: boolean;
}) {
  const prochaineDate = spectacle.representations?.[0]?.dateHeure;

  return (
    <article
      className={cn(
        "group relative bg-surface rounded-xl overflow-hidden border border-divider/15 hover:border-or-500/40 transition-all duration-300 hover:shadow-scene flex flex-col",
        featured && "lg:col-span-1"
      )}
    >
      <Link
        href={`/spectacles/${spectacle.slug}`}
        aria-label={`Voir le détail de ${spectacle.titre}`}
        className="block aspect-[4/3] relative bg-nuit-900 overflow-hidden"
      >
        {spectacle.imagePrincipale && (
          <Image
            src={urlFor(spectacle.imagePrincipale).width(960).quality(85).url()}
            alt={spectacle.imagePrincipale.alt || spectacle.titre}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            placeholder={
              spectacle.imagePrincipale.asset?.metadata?.lqip ? "blur" : undefined
            }
            blurDataURL={spectacle.imagePrincipale.asset?.metadata?.lqip}
          />
        )}

        {/* Gradient bas → texte cat lisible si on l'overlay un jour */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-nuit-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />

        {/* Badge "complet" si toutes les représentations le sont */}
        {spectacle.representations?.length > 0 &&
          spectacle.representations.every((r) => r.complet) && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider bg-rouge-600 text-white rounded">
              Complet
            </span>
          )}
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        {spectacle.categorie && (
          <p className="tag-category mb-3 self-start">
            {spectacle.categorie.nom}
          </p>
        )}

        <h3 className="text-xl mb-1.5 leading-tight">
          <Link
            href={`/spectacles/${spectacle.slug}`}
            className="hover:text-rouge-600 dark:hover:text-or-400 transition-colors"
          >
            {spectacle.titre}
          </Link>
        </h3>

        {spectacle.compagnie && (
          <p className="text-sm text-ink-muted italic mb-3">
            {spectacle.compagnie}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted mb-3">
          {spectacle.publicCible && (
            <span className="inline-flex items-center gap-1">
              <Users className="w-3 h-3" aria-hidden="true" />
              {spectacle.publicCible}
            </span>
          )}
          {spectacle.dureeMinutes && (
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {formatDuration(spectacle.dureeMinutes)}
            </span>
          )}
        </div>

        {spectacle.resume && (
          <p className="text-sm text-ink/80 line-clamp-3 mb-4 text-pretty">
            {spectacle.resume}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-divider/10 flex items-center justify-between text-sm">
          {prochaineDate ? (
            <span className="inline-flex items-center gap-1.5 text-ink">
              <Calendar
                className="w-3.5 h-3.5 text-or-500"
                aria-hidden="true"
              />
              <span className="text-ink-muted">Dès le </span>
              <strong className="font-semibold">
                {formatDate(prochaineDate, "d MMM")}
              </strong>
            </span>
          ) : (
            <span className="text-ink-muted">Prochaines dates à venir</span>
          )}
          <Link
            href={`/spectacles/${spectacle.slug}`}
            className="text-rouge-600 dark:text-or-400 hover:text-rouge-700 dark:hover:text-or-300 font-semibold inline-flex items-center gap-1"
            aria-label={`Voir le détail de ${spectacle.titre}`}
          >
            Détails
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
