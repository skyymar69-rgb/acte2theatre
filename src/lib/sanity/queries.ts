import { groq } from "next-sanity";

/**
 * Projection commune pour la prévisualisation d'un spectacle dans une liste.
 * Inclut la "prochaine date à venir" calculée côté GROQ.
 */
const SPECTACLE_PREVIEW = groq`{
  _id,
  titre,
  "slug": slug.current,
  compagnie,
  publicCible,
  dureeMinutes,
  resume,
  enVedette,
  imagePrincipale {
    ...,
    asset->{ _id, url, metadata { lqip, dimensions } }
  },
  "categorie": categorie->{ _id, nom, "slug": slug.current, couleur },
  "prochaineDate": *[_type == "representation" && _id == ^._id]
    | order(dateHeure asc)[0],
  "representations": representations[
    dateHeure >= now()
  ]| order(dateHeure asc),
  tarifAdulte,
  tarifEnfant,
  mapadoUrl
}`;

/** Spectacles à l'affiche (en vedette + représentations à venir) */
export const SPECTACLES_VEDETTE_QUERY = groq`
*[_type == "spectacle" && enVedette == true && count(representations[dateHeure >= now()]) > 0]
| order(premierePer desc)[0...3] ${SPECTACLE_PREVIEW}
`;

/** Tous les spectacles à venir, triés par première date */
export const SPECTACLES_A_VENIR_QUERY = groq`
*[_type == "spectacle" && count(representations[dateHeure >= now()]) > 0]
| order(premierePer asc) ${SPECTACLE_PREVIEW}
`;

/** Filtré par catégorie */
export const SPECTACLES_PAR_CATEGORIE_QUERY = groq`
*[_type == "spectacle" && categorie->slug.current == $categorie
  && count(representations[dateHeure >= now()]) > 0]
| order(premierePer asc) ${SPECTACLE_PREVIEW}
`;

/** Détail complet d'un spectacle */
export const SPECTACLE_DETAIL_QUERY = groq`
*[_type == "spectacle" && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  imagePrincipale {
    ...,
    asset->{ _id, url, metadata { lqip, dimensions } }
  },
  galerie[]{
    ...,
    asset->{ _id, url, metadata { lqip, dimensions } }
  },
  "categorie": categorie->{ _id, nom, "slug": slug.current, couleur },
  representations[]| order(dateHeure asc),
  dossierPresse { asset->{ url, originalFilename, size } },
  dossierPedagogique { asset->{ url, originalFilename, size } }
}
`;

/** Liste des slugs (pour generateStaticParams) */
export const SPECTACLES_SLUGS_QUERY = groq`
*[_type == "spectacle" && defined(slug.current)][].slug.current
`;

/** Toutes les catégories (pour la navigation) */
export const CATEGORIES_QUERY = groq`
*[_type == "categorie"] | order(ordre asc) {
  _id,
  nom,
  "slug": slug.current,
  description,
  couleur
}
`;

/** Ateliers actifs */
export const ATELIERS_QUERY = groq`
*[_type == "atelier" && actif == true]{
  _id,
  titre,
  "slug": slug.current,
  type,
  publicCible,
  saison,
  planning,
  tarif,
  description,
  image { ..., asset->{ url, metadata { lqip } } },
  inscriptionUrl,
  contactEmail
}
`;

/** Page statique par slug */
export const PAGE_STATIQUE_QUERY = groq`
*[_type == "pageStatique" && slug.current == $slug][0]{
  titre,
  "slug": slug.current,
  imageHero { ..., asset->{ url, metadata { lqip } } },
  contenu,
  seoTitre,
  seoDescription
}
`;

/** Paramètres globaux (singleton) */
export const PARAMETRES_QUERY = groq`
*[_type == "parametres" && _id == "parametres"][0]
`;

/** Actualités */
export const ACTUALITES_QUERY = groq`
*[_type == "actualite"] | order(datePublication desc)[0...20]{
  _id,
  titre,
  "slug": slug.current,
  datePublication,
  extrait,
  image { ..., asset->{ url, metadata { lqip } } }
}
`;
