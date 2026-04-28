/**
 * Migration des spectacles depuis l'ancien site acte2theatre.fr vers Sanity.
 *
 * Données scrapées depuis :
 *  - https://www.acte2theatre.fr/JEUNE-PUBLIC-2025-2026_r53.html
 *  - https://www.acte2theatre.fr/THEATRE-2025-2026_r54.html
 *
 * Lance avec :
 *   node --env-file=.env.local scripts/migrate-from-old-site.mjs
 *
 * Idempotent : un spectacle déjà importé (même slug) sera supprimé puis recréé.
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-12-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Manquant : NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET ou SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// ─────────────────────────────────────────────────────────────────────────────
// Catalogue scraped
// ─────────────────────────────────────────────────────────────────────────────

const SPECTACLES = [
  // Jeune public
  {
    titre: "Bubulle, le poisson volant",
    slug: "bubulle-le-poisson-volant",
    categorieSlug: "jeune-public",
    compagnie: "Compagnie Les P'tites Dames",
    publicCible: "Dès 3 ans",
    resume: "Spectacle pour les tout-petits.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/81043226-58431955.jpg",
    datesRaw: ["12 mai 10h"],
    enVedette: true,
  },
  {
    titre: "Loup y es-tu ? Conte musical",
    slug: "loup-y-es-tu-conte-musical",
    categorieSlug: "jeune-public",
    compagnie: "Cie Tous à la musique",
    publicCible: "6 à 10 ans · Tout public",
    dureeMinutes: 60,
    resume: "Conte musical mêlant musique classique, création plastique et art du conte.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/95076443-66592356.jpg",
    datesRaw: ["mercredi 6 mai 10h30", "samedi 9 mai 14h30", "dimanche 10 mai 15h"],
    enVedette: true,
  },
  {
    titre: "Monsieur Maxence au pays des 5 sens",
    slug: "monsieur-maxence-au-pays-des-5-sens",
    categorieSlug: "jeune-public",
    compagnie: "Compagnie Les 3 Coups Occitanie",
    publicCible: "18 mois à 5 ans",
    dureeMinutes: 40,
    resume: "Exploration sensorielle pour les jeunes enfants.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/96016035-66983040.jpg",
    datesRaw: ["31 mai 11h", "3 juin 10h30", "13 juin 10h30", "14 juin 11h", "12 juillet 11h"],
  },
  {
    titre: "La boîte à histoires découvre le monde",
    slug: "la-boite-a-histoires-decouvre-le-monde",
    categorieSlug: "jeune-public",
    compagnie: "Compagnie Les 3 Coups Occitanie",
    publicCible: "18 mois à 5 ans",
    dureeMinutes: 35,
    resume: "Voyage à travers les saisons avec souvenirs et rencontres.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/96013827-66981616.jpg",
    datesRaw: ["9 mai 10h30", "10 juin 10h30"],
  },
  {
    titre: "La Fée Toquée",
    slug: "la-fee-toquee",
    categorieSlug: "jeune-public",
    compagnie: "La Compagnie Dose — Sabrina Taghzouit",
    publicCible: "3 à 9 ans",
    dureeMinutes: 45,
    resume: "Spectacle solo participatif combinant comédie, improvisation, chant et danse.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/92282270-64746852.jpg",
    datesRaw: ["16 mai 14h30", "27 mai 10h30", "27 mai 14h30", "13 juin 14h30", "1 juillet 10h30", "1 juillet 14h30"],
  },

  // Théâtre adulte
  {
    titre: "À la mienne — de Nicolas Bret-Morel",
    slug: "a-la-mienne",
    categorieSlug: "theatre",
    compagnie: "Les Pendrillons Rouges",
    publicCible: "Tout public",
    resume:
      "Béatrice, grande romancière, puise ses idées en discutant avec les personnages de ses livres entre militaires, médecins et autres personnages rocambolesques.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/94553205-65995425.jpg",
    datesRaw: ["8 mai 20h"], // 18 avril déjà passé, on ne garde que la date future
    tarifAdulte: 18,
    tarifReduit: 16,
    enVedette: true,
  },
  {
    titre: "L'affaire de la rue de Lourcine — Le mystère de la rue Rousselet",
    slug: "l-affaire-de-la-rue-de-lourcine",
    categorieSlug: "theatre",
    compagnie: "Compagnie Les Grandes Personnes",
    publicCible: "Adulte",
    resume: "Vaudeville en deux pièces courtes d'Eugène Labiche.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/95086341-66598377.jpg",
    datesRaw: [], // pas de date connue, on mettra un placeholder
  },
  {
    titre: "Pêle-Mêle — Magic David",
    slug: "pele-mele-magic-david",
    categorieSlug: "theatre",
    compagnie: "Magic David",
    publicCible: "Tout public",
    dureeMinutes: 60,
    resume: "Spectacle de magie d'une heure.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/87001002-61796076.jpg",
    datesRaw: ["9 juillet 20h", "10 juillet 20h", "11 juillet 20h"],
    tarifAdulte: 17,
    tarifReduit: 15,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Utilitaires
// ─────────────────────────────────────────────────────────────────────────────

const MOIS = {
  janvier: 0, janv: 0, "janv.": 0,
  février: 1, fevrier: 1, févr: 1, "févr.": 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  août: 7, aout: 7,
  septembre: 8, sept: 8, "sept.": 8,
  octobre: 9, oct: 9, "oct.": 9,
  novembre: 10, nov: 10, "nov.": 10,
  décembre: 11, decembre: 11, déc: 11, "déc.": 11,
};

/**
 * Parse une date FR libre type "12 mai 10h", "samedi 9 mai 14h30", "1er juillet 10h30"
 * en ISO datetime. Année par défaut = 2026 (saison 2025-2026).
 * Retourne null si parsing échoue.
 */
function parseFrenchDate(raw, fallbackYear = 2026) {
  const cleaned = raw
    .toLowerCase()
    .replace(/^(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+/, "")
    .replace(/\bà\b/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // "1er juillet" → "1 juillet"
  const normalized = cleaned.replace(/^(\d+)(?:er|ère|e|ème)\s/, "$1 ");

  const match = normalized.match(/^(\d{1,2})\s+([a-zéèû\.]+)\s+(\d{1,2})h(\d{0,2})$/);
  if (!match) return null;

  const day = parseInt(match[1], 10);
  const monthName = match[2].replace(/\.$/, "");
  const month = MOIS[monthName];
  if (month === undefined) return null;

  const hour = parseInt(match[3], 10);
  const minute = match[4] ? parseInt(match[4], 10) : 0;

  // Si la date résultante est dans le passé pour cette année, basculer à l'année suivante
  let year = fallbackYear;
  const candidate = new Date(year, month, day, hour, minute);
  if (candidate < new Date()) {
    year = fallbackYear + 1;
  }
  return new Date(year, month, day, hour, minute).toISOString();
}

/** Date placeholder = dans 14 jours à 20h, à utiliser quand parsing échoue */
function placeholderDate() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  d.setHours(20, 0, 0, 0);
  return d.toISOString();
}

async function uploadImage(url, filename) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Échec téléchargement ${url}: ${resp.status}`);
  const buf = Buffer.from(await resp.arrayBuffer());
  return await client.assets.upload("image", buf, {
    filename,
    contentType: resp.headers.get("content-type") || "image/jpeg",
  });
}

async function ensureCategorie(slug, nom, ordre, couleur) {
  const existing = await client.fetch(
    `*[_type == "categorie" && slug.current == $slug][0]{_id}`,
    { slug }
  );
  if (existing) return existing._id;
  const created = await client.create({
    _type: "categorie",
    nom,
    slug: { _type: "slug", current: slug },
    ordre,
    couleur,
  });
  console.log(`✓ Catégorie créée : ${nom}`);
  return created._id;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

console.log(`→ Migration de ${SPECTACLES.length} spectacles vers Sanity\n`);

// 1. Catégories
const catJeunePublic = await ensureCategorie("jeune-public", "Jeune public", 10, "amber");
const catTheatre = await ensureCategorie("theatre", "Théâtre", 20, "stage");
const catIds = { "jeune-public": catJeunePublic, theatre: catTheatre };

// 2. Spectacles
let imported = 0;
let skipped = 0;
let warnings = [];

for (const sp of SPECTACLES) {
  console.log(`\n→ ${sp.titre}`);

  // Idempotence : supprimer l'existant
  const existing = await client.fetch(
    `*[_type == "spectacle" && slug.current == $slug][0]{_id}`,
    { slug: sp.slug }
  );
  if (existing) {
    await client.delete(existing._id);
    console.log(`  ⚠ Ancienne version supprimée`);
  }

  // Parser les dates
  const parsedDates = [];
  for (const raw of sp.datesRaw) {
    const iso = parseFrenchDate(raw);
    if (iso) parsedDates.push(iso);
    else warnings.push(`[${sp.slug}] Date non parsée : "${raw}"`);
  }
  // Filtrer les dates passées
  const futureDates = parsedDates.filter((iso) => new Date(iso) >= new Date());
  if (futureDates.length === 0) {
    futureDates.push(placeholderDate());
    warnings.push(`[${sp.slug}] Aucune date future, placeholder à +14j ajouté`);
  }

  // Upload image
  let asset;
  try {
    asset = await uploadImage(sp.image, `${sp.slug}.jpg`);
    console.log(`  ✓ Image uploadée`);
  } catch (e) {
    warnings.push(`[${sp.slug}] Image échouée : ${e.message}`);
    skipped++;
    continue;
  }

  // Construire le document
  const doc = {
    _type: "spectacle",
    titre: sp.titre,
    slug: { _type: "slug", current: sp.slug },
    compagnie: sp.compagnie,
    categorie: { _type: "reference", _ref: catIds[sp.categorieSlug] },
    publicCible: sp.publicCible,
    resume: sp.resume,
    representations: futureDates.map((dateHeure, i) => ({
      _type: "representation",
      _key: `rep-${i}`,
      dateHeure,
      complet: false,
    })),
    premierePer: futureDates[0],
    imagePrincipale: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: sp.titre,
    },
    enVedette: sp.enVedette || false,
  };
  if (sp.dureeMinutes) doc.dureeMinutes = sp.dureeMinutes;
  if (sp.tarifAdulte) doc.tarifAdulte = sp.tarifAdulte;
  if (sp.tarifReduit) doc.tarifReduit = sp.tarifReduit;

  await client.create(doc);
  console.log(`  ✓ Spectacle créé (${futureDates.length} dates)`);
  imported++;
}

// 3. Bilan
console.log(`\n${"─".repeat(60)}`);
console.log(`✓ ${imported} spectacles importés, ${skipped} ignorés`);
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} avertissement(s) à vérifier dans le Studio :`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}
console.log(`\n🎉 Recharge http://localhost:3000 ou https://acte2theatre.vercel.app pour voir le résultat.`);
