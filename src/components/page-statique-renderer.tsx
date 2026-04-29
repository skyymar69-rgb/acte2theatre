import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/lib/sanity/client";
import { PAGE_STATIQUE_QUERY } from "@/lib/sanity/queries";
import type { PageStatique } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

interface Props {
  slug: string;
}

/**
 * Récupère un document `pageStatique` Sanity et le rend.
 *
 * Comportement résilient : si le document n'existe pas dans le CMS
 * (slug inconnu) ou si Sanity est indisponible, on retourne `null`
 * plutôt que de lever un 404. Les pages appelantes (contact, soutenir,
 * location-salle…) embarquent un `SeoBody` de secours qui assure le
 * contenu minimal — l'utilisateur ne tombe jamais sur un 404 si la
 * page route existe côté Next.
 */
export async function renderPageStatique({ slug }: Props) {
  let page: PageStatique | null = null;
  try {
    page = await sanityFetch<PageStatique | null>({
      query: PAGE_STATIQUE_QUERY,
      params: { slug },
      tags: [`pageStatique:${slug}`, "pageStatique"],
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[pageStatique:${slug}] Sanity indisponible :`, err);
    }
  }

  if (!page) return null;

  return (
    <article>
      {page.imageHero && (
        <div className="relative aspect-[21/9] bg-curtain-200">
          <Image
            src={urlFor(page.imageHero).width(1920).url()}
            alt={page.imageHero.alt || page.titre}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
      <div className="container py-12 md:py-16 max-w-3xl">
        <h1 className="mb-8">{page.titre}</h1>
        {page.contenu && (
          <div className="prose-acte2">
            <PortableText value={page.contenu} />
          </div>
        )}
      </div>
    </article>
  );
}

export async function pageStatiqueMetadata({ slug }: Props) {
  try {
    const page = await sanityFetch<PageStatique | null>({
      query: PAGE_STATIQUE_QUERY,
      params: { slug },
      tags: [`pageStatique:${slug}`],
    });
    if (!page) return {};
    return {
      title: page.seoTitre || page.titre,
      description: page.seoDescription,
    };
  } catch {
    return {};
  }
}
