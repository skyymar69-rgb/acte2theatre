/**
 * Types manuels pour le contenu Sanity.
 *
 * À terme, ces types seront générés automatiquement par :
 *   npm run sanity:typegen
 *
 * Ce qui produira un fichier `src/sanity/types.ts` à partir des schémas
 * et des requêtes GROQ. En attendant, ces définitions servent de contrat.
 */

import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt?: string;
  credit?: string;
  hotspot?: { x: number; y: number };
}

export interface SanityFile {
  asset: {
    url: string;
    originalFilename?: string;
    size?: number;
  };
}

export interface Categorie {
  _id: string;
  nom: string;
  slug: string;
  description?: string;
  couleur?: "stage" | "amber" | "blue" | "emerald" | "purple";
  ordre?: number;
}

export interface Representation {
  dateHeure: string;
  note?: string;
  complet?: boolean;
}

export interface DistributionMembre {
  nom: string;
  role?: string;
}

export interface SpectaclePreview {
  _id: string;
  titre: string;
  slug: string;
  compagnie?: string;
  publicCible?: string;
  dureeMinutes?: number;
  resume?: string;
  enVedette?: boolean;
  imagePrincipale: SanityImage;
  categorie: Categorie;
  representations: Representation[];
  tarifAdulte?: number;
  tarifEnfant?: number;
  mapadoUrl?: string;
}

export interface Spectacle extends SpectaclePreview {
  description?: PortableTextBlock[];
  distribution?: DistributionMembre[];
  galerie?: SanityImage[];
  videoUrl?: string;
  dossierPresse?: SanityFile;
  dossierPedagogique?: SanityFile;
  tarifReduit?: number;
  premierePer?: string;
  seoTitre?: string;
  seoDescription?: string;
}

export type AtelierType =
  | "theatre"
  | "qigong"
  | "taichi"
  | "energetique"
  | "autre";

export interface Atelier {
  _id: string;
  titre: string;
  slug: string;
  type: AtelierType;
  publicCible?: string;
  saison?: string;
  planning?: string;
  tarif?: string;
  description?: PortableTextBlock[];
  image?: SanityImage;
  inscriptionUrl?: string;
  contactEmail?: string;
}

export interface Actualite {
  _id: string;
  titre: string;
  slug: string;
  datePublication: string;
  extrait?: string;
  image?: SanityImage;
  contenu?: PortableTextBlock[];
}

export interface PageStatique {
  titre: string;
  slug: string;
  imageHero?: SanityImage;
  contenu?: PortableTextBlock[];
  seoTitre?: string;
  seoDescription?: string;
}

export interface Parametres {
  nomSite: string;
  baseline?: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  horaires?: string;
  reseauxSociaux?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  carteAbonnement?: {
    actif: boolean;
    nbSpectacles: number;
    prix: number;
  };
  footerTexte?: PortableTextBlock[];
}
