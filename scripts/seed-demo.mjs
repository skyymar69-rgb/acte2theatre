/**
 * Seed une catégorie + un spectacle de démo dans Sanity, avec une image
 * téléchargée depuis picsum.photos (libre de droits).
 *
 * Lance avec :
 *   node --env-file=.env.local scripts/seed-demo.mjs
 *
 * Une fois testé, supprime le token "seed-script" sur sanity.io/manage si tu n'en
 * as plus besoin (et SANITY_API_WRITE_TOKEN dans .env.local).
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

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

console.log(`→ Connexion à Sanity (project=${projectId}, dataset=${dataset})`);

// 1. Trouver la catégorie "Jeune public" déjà créée
const categorie = await client.fetch(
  `*[_type == "categorie" && slug.current == $slug][0]{_id, nom}`,
  { slug: "jeune-public" }
);

if (!categorie) {
  console.error("Catégorie 'jeune-public' introuvable. Crée-la d'abord dans le Studio.");
  process.exit(1);
}
console.log(`✓ Catégorie trouvée : ${categorie.nom} (${categorie._id})`);

// 2. Vérifier qu'aucun spectacle de démo n'existe déjà (idempotence)
const existing = await client.fetch(
  `*[_type == "spectacle" && slug.current == $slug][0]{_id}`,
  { slug: "le-petit-prince" }
);
if (existing) {
  console.log(`⚠ Spectacle "le-petit-prince" existe déjà (${existing._id}). Suppression...`);
  await client.delete(existing._id);
  console.log(`✓ Ancien spectacle supprimé`);
}

// 3. Télécharger une image de placeholder
console.log("→ Téléchargement d'une image placeholder depuis picsum.photos...");
const imgResponse = await fetch("https://picsum.photos/seed/petit-prince/1200/900");
if (!imgResponse.ok) {
  throw new Error(`Échec téléchargement image : ${imgResponse.status}`);
}
const imgBuffer = Buffer.from(await imgResponse.arrayBuffer());
console.log(`✓ Image téléchargée (${(imgBuffer.length / 1024).toFixed(1)} Ko)`);

// 4. Uploader l'image comme asset Sanity
console.log("→ Upload de l'image vers Sanity...");
const asset = await client.assets.upload("image", imgBuffer, {
  filename: "petit-prince-placeholder.jpg",
  contentType: "image/jpeg",
});
console.log(`✓ Asset créé : ${asset._id}`);

// 5. Construire 3 dates de représentations futures
const now = new Date();
const dates = [7, 14, 21].map((daysAhead) => {
  const d = new Date(now);
  d.setDate(d.getDate() + daysAhead);
  d.setHours(20, 0, 0, 0); // 20h00
  return d.toISOString();
});

// 6. Créer le spectacle
console.log("→ Création du spectacle...");
const spectacle = await client.create({
  _type: "spectacle",
  titre: "Le Petit Prince",
  slug: { _type: "slug", current: "le-petit-prince" },
  compagnie: "Compagnie Acte 2",
  categorie: { _type: "reference", _ref: categorie._id },
  publicCible: "Dès 6 ans",
  dureeMinutes: 60,
  resume:
    "L'aventure poétique d'un petit prince venu d'une autre planète, à la rencontre de l'humanité et de ses mystères. Une création tout en délicatesse, portée par la marionnette et la musique live.",
  representations: dates.map((dateHeure, i) => ({
    _type: "representation",
    _key: `rep-${i}`,
    dateHeure,
    note: i === 0 ? "Première" : undefined,
    complet: false,
  })),
  premierePer: dates[0],
  tarifAdulte: 12,
  tarifEnfant: 8,
  tarifReduit: 10,
  imagePrincipale: {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: "Affiche du Petit Prince — silhouette de l'enfant sur sa planète",
    credit: "Photo de placeholder (picsum.photos)",
  },
  enVedette: true,
});

console.log(`✓ Spectacle créé : ${spectacle._id}`);
console.log("\n🎉 Seed terminé. Recharge http://localhost:3000 pour voir le résultat.");
