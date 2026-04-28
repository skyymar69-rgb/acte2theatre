import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/lib/sanity/client";
import { PAGE_STATIQUE_QUERY } from "@/lib/sanity/queries";
import type { PageStatique } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

interface Props {
  slug: string;
}

export async function renderPageStatique({ slug }: Props) {
  const page = await sanityFetch<PageStatique | null>({
    query: PAGE_STATIQUE_QUERY,
    params: { slug },
    tags: [`pageStatique:${slug}`, "pageStatique"],
  });

  if (!page) {
    notFound();
  }

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
}
