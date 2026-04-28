/**
 * Seed COMPLET du contenu Acte 2 Théâtre dans Sanity, scrapé depuis acte2theatre.fr.
 *
 * Couvre :
 *   - 3 catégories (jeune-public, theatre, scolaire)
 *   - 10 spectacles avec image, dates, tarifs, distribution si connue
 *   - 3 ateliers (théâtre adultes saison, théâtre vacances 10-14, Qi Gong)
 *   - 3 pages statiques (contact, location-salle, soutenir)
 *   - 1 singleton paramètres (adresse, contacts, réseaux)
 *
 * Idempotent : supprime puis recrée chaque entité (sauf les assets images,
 * réutilisés tant que le filename est le même côté Sanity).
 *
 * Lance avec :
 *   node --env-file=.env.local scripts/seed-full.mjs
 */

import { createClient } from "@sanity/client";
import crypto from "node:crypto";

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
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const k = () => crypto.randomBytes(6).toString("hex");

/** Bloc Portable Text "paragraphe simple" depuis du texte plein */
const para = (text) => ({
  _type: "block",
  _key: k(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

/** Bloc Portable Text "titre" */
const heading = (text, style = "h2") => ({
  _type: "block",
  _key: k(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

/** Découpe un paragraphe en plusieurs blocs si \n\n */
const paras = (text) =>
  text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(para);

const MOIS = {
  janvier: 0, février: 1, fevrier: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, août: 7, aout: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11, decembre: 11,
};

/** Parse "12 mai 10h30" / "samedi 9 mai 14h30" / "1er juillet 10h" en ISO Paris */
function parseFrenchDate(raw, fallbackYear = 2026) {
  const cleaned = raw
    .toLowerCase()
    .replace(/^(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+/, "")
    .replace(/\bà\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const normalized = cleaned.replace(/^(\d+)(?:er|ère|e|ème)\s/, "$1 ");
  const match = normalized.match(/^(\d{1,2})\s+([a-zéèû]+)\s+(\d{1,2})h(\d{0,2})$/);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const month = MOIS[match[2]];
  if (month === undefined) return null;
  const hour = parseInt(match[3], 10);
  const minute = match[4] ? parseInt(match[4], 10) : 0;
  // Construit une ISO en heure de Paris (offset +02:00 pour la saison mai-octobre)
  const pad = (n) => String(n).padStart(2, "0");
  const offset = month >= 2 && month <= 9 ? "+02:00" : "+01:00"; // approx DST
  let year = fallbackYear;
  // Si la date est dans le passé pour cette année, prendre l'année suivante
  const candidate = new Date(`${year}-${pad(month + 1)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00${offset}`);
  if (candidate < new Date()) year = fallbackYear + 1;
  return `${year}-${pad(month + 1)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00${offset}`;
}

function placeholderDateISO(daysAhead = 14, hour = 20) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(hour, 0, 0, 0);
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

/** Crée ou remplace par slug atomiquement (préserve les références). Retourne l'_id */
async function upsertBySlug(_type, slug, doc, opts = {}) {
  const existing = await client.fetch(
    `*[_type == $type && slug.current == $slug][0]{_id}`,
    { type: _type, slug }
  );
  const fullDoc = {
    ...doc,
    _type,
    slug: { _type: "slug", current: slug },
  };
  if (existing) {
    if (opts.skipExisting) return existing._id;
    await client.createOrReplace({ _id: existing._id, ...fullDoc });
    return existing._id;
  }
  const created = await client.create(fullDoc);
  return created._id;
}

// ─────────────────────────────────────────────────────────────────────────────
// CATÉGORIES
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { slug: "jeune-public", nom: "Jeune public", couleur: "amber", ordre: 10 },
  { slug: "theatre", nom: "Théâtre", couleur: "stage", ordre: 20 },
  { slug: "scolaire", nom: "Scolaire", couleur: "blue", ordre: 30 },
];

// ─────────────────────────────────────────────────────────────────────────────
// SPECTACLES (10)
// ─────────────────────────────────────────────────────────────────────────────

const SPECTACLES = [
  // ── Jeune public ──
  {
    titre: "Bubulle, le poisson volant",
    slug: "bubulle-le-poisson-volant",
    categorieSlug: "jeune-public",
    compagnie: "Compagnie Les P'tites Dames",
    publicCible: "Dès 3 ans",
    resume: "Spectacle pour les tout-petits autour d'un poisson rouge qui rêve de voler.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/81043226-58431955.jpg",
    datesRaw: ["12 mai 10h"],
    tarifAdulte: 13,
    tarifEnfant: 12,
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
    tarifAdulte: 13,
    tarifEnfant: 12,
    enVedette: true,
  },
  {
    titre: "Monsieur Maxence au pays des 5 sens",
    slug: "monsieur-maxence-au-pays-des-5-sens",
    categorieSlug: "jeune-public",
    compagnie: "Compagnie Les 3 Coups Occitanie",
    publicCible: "18 mois à 5 ans",
    dureeMinutes: 40,
    resume: "Exploration sensorielle pour les tout-petits.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/96016035-66983040.jpg",
    datesRaw: ["31 mai 11h", "3 juin 10h30", "13 juin 10h30", "14 juin 11h", "12 juillet 11h"],
    tarifAdulte: 13,
    tarifEnfant: 12,
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
    tarifAdulte: 13,
    tarifEnfant: 12,
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
    tarifAdulte: 13,
    tarifEnfant: 12,
  },

  // ── Théâtre adulte ──
  {
    titre: "À la mienne — de Nicolas Bret-Morel",
    slug: "a-la-mienne",
    categorieSlug: "theatre",
    compagnie: "Les Pendrillons Rouges",
    publicCible: "Tout public",
    resume:
      "Béatrice, grande romancière, puise ses idées en discutant avec les personnages de ses livres entre militaires, médecins et autres personnages rocambolesques.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/94553205-65995425.jpg",
    datesRaw: ["8 mai 20h"],
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
    resume: "Vaudeville en deux pièces courtes d'Eugène Labiche, mise en scène Ariane Sancosme.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/95086341-66598377.jpg",
    datesRaw: [],
  },
  {
    titre: "Pêle-Mêle — Magic David",
    slug: "pele-mele-magic-david",
    categorieSlug: "theatre",
    compagnie: "Magic David",
    publicCible: "Tout public",
    dureeMinutes: 60,
    resume: "Spectacle de magie d'une heure par Magic David.",
    image: "https://www.acte2theatre.fr/photo/art/large_x2_16_9/87001002-61796076.jpg",
    datesRaw: ["9 juillet 20h", "10 juillet 20h", "11 juillet 20h"],
    tarifAdulte: 17,
    tarifReduit: 15,
  },

  // ── Scolaires ──
  {
    titre: "Monte Cristo ou la Loi du Talion",
    slug: "monte-cristo-loi-du-talion",
    categorieSlug: "scolaire",
    compagnie: "Compagnie Histoire de Voir",
    publicCible: "À partir de 12 ans",
    dureeMinutes: 70,
    resume:
      "Adaptation du roman d'Alexandre Dumas concentrée sur les thèmes de la justice, la vengeance et la transformation personnelle. Mise en scène épurée et rythmée d'Aline Collaudin.",
    image: "https://www.acte2theatre.fr/photo/art/grande/89665920-63362271.jpg",
    datesRaw: [], // Séances scolaires sur demande — placeholder ajouté
    distribution: [
      { nom: "Morgane Acien" },
      { nom: "Pierre Begue" },
      { nom: "Ugo Bulfone" },
      { nom: "Aline Collaudin", role: "Mise en scène · Comédienne" },
    ],
  },
  {
    titre: "Sacré Molière !",
    slug: "sacre-moliere",
    categorieSlug: "scolaire",
    compagnie: "Compagnie 2 Trois Bricoles",
    publicCible: "11-12 ans · Tout public",
    dureeMinutes: 90,
    resume:
      "Molière débarque parmi nous ce soir ! Avec sa troupe, il saute à pieds joints dans notre époque et éclabousse tout sur son passage : sa jeunesse insolente, son humour mordant, et ses secrets bien gardés. Mise en scène Hervé Hartmann.",
    image: "https://www.acte2theatre.fr/photo/art/grande/87476045-62044580.jpg",
    datesRaw: [],
    distribution: [
      { nom: "Karine Revelant" },
      { nom: "Armel Beurier" },
      { nom: "Amandine Vinson" },
      { nom: "Antoine Dupire" },
      { nom: "Hervé Hartmann", role: "Mise en scène · Comédien" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ATELIERS (3)
// ─────────────────────────────────────────────────────────────────────────────

const ATELIERS = [
  {
    slug: "atelier-theatre-adultes",
    titre: "Atelier théâtre adultes",
    type: "theatre",
    publicCible: "Adultes — débutants & confirmés",
    saison: "2025-2026",
    planning:
      "Cours hebdomadaires : lundi, mardi et mercredi de 20h à 22h.\n2 niveaux proposés : débutants et confirmés.",
    tarif: "Sur demande (formulaire d'inscription PDF)",
    description: paras(
      `Travail de la corporalité, de la voix (diction, articulation), prise de confiance, gestion des déplacements sur scène, jeux d'improvisation, jeux sur l'espace et le corps, mémorisation, et montage d'un spectacle en fin de saison.

Inscription : envoyez un mail à acte2lyonhd@yahoo.fr ou téléchargez le formulaire d'inscription sur la page contact.`
    ),
    image: "https://www.acte2theatre.fr/photo/art/default/88834426-62855203.jpg",
    contactEmail: "acte2lyonhd@yahoo.fr",
  },
  {
    slug: "stage-theatre-vacances-10-14",
    titre: "Stage théâtre vacances 10-14 ans",
    type: "theatre",
    publicCible: "10-14 ans",
    saison: "Avril & juillet 2026",
    planning:
      "Lundi au vendredi, 9h-17h.\n\nSemaines proposées :\n• Avril 2026 : 6-10 ou 13-17\n• Juillet 2026 : 6-10, 20-24, 27-31",
    tarif: "200 € la semaine + 20 € d'adhésion",
    description: paras(
      `Programme intensif où les jeunes jouent, inventent, improvisent et montent un vrai spectacle. Au programme : jeux d'improvisation et de confiance, travail corporel et vocal, création de personnages, répétitions collectives.

Représentation finale devant les familles le dernier jour de la semaine.`
    ),
    image: "https://www.acte2theatre.fr/photo/art/grande/95045653-66577780.jpg",
    contactEmail: "acte2lyonhd@yahoo.fr",
  },
  {
    slug: "qi-gong-tai-chi-energetique",
    titre: "Qi Gong, Tai Chi & soins énergétiques",
    type: "qigong",
    publicCible: "Tout public",
    saison: "Toute l'année",
    planning:
      "Cours en intérieur ou extérieur · Séances individuelles à domicile, en cabinet (32 quai Arloing) ou en entreprise.",
    tarif: "Tarifs sur demande — réservations via Medoucine",
    description: paras(
      `Animé par Laurence Cavex (Petite Source Shaoyang), ces ateliers visent à rééquilibrer les énergies du corps et de l'esprit, soulager les maux physiques et psychiques.

Pratiques proposées : Tui Na, Chi Nei Tsang, ventouses, moxibustion, acupression, méditation, Qi Gong et Tai Chi. Possibilité d'accompagnement corporel pour comédiens et d'animations team building en entreprise.`
    ),
    image: "https://www.acte2theatre.fr/photo/art/grande/67476141-47708443.jpg",
    contactEmail: "petitesourceshaoyang@gmail.com",
    inscriptionUrl: "https://www.medoucine.com/consultation/lyon/laurence-cavex/13847",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGES STATIQUES (3)
// ─────────────────────────────────────────────────────────────────────────────

const PAGES_STATIQUES = [
  {
    slug: "contact",
    titre: "Contact",
    seoTitre: "Contact · Acte 2 Théâtre",
    seoDescription:
      "Adresse, téléphone, emails de l'équipe Acte 2 Théâtre — 32 quai Arloing, Lyon 9.",
    contenu: [
      heading("Nous trouver"),
      para("Acte 2 Théâtre"),
      para("32, quai Arloing — 69009 Lyon"),
      para("Téléphone : 04 78 83 21 71"),

      heading("Réservations"),
      para("acte2resa@yahoo.fr"),
      para("Réservation en ligne : acte2theatre.mapado.com"),

      heading("L'équipe"),
      heading("Direction artistique — Hervé Deschamps", "h3"),
      para("acte2lyonhd@yahoo.fr"),
      heading("Direction administrative & financière — Cloé Cavex", "h3"),
      para("acte2theatre@yahoo.fr"),
      heading("Direction de la communication — Cathy Mahdar", "h3"),
      para("acte2communication@gmail.com · 04 78 83 21 71"),
      heading("Régisseur lumière & son — Adrian Miranda", "h3"),
      para("technique.acte2@gmail.com · 04 78 83 21 71"),
    ],
  },
  {
    slug: "location-salle",
    titre: "Location de salle",
    seoTitre: "Location de salle · Acte 2 Théâtre Lyon",
    seoDescription:
      "Salle de spectacle 100 places à Lyon 9 disponible à la location pour événements d'entreprise, séminaires, représentations et répétitions.",
    contenu: [
      para(
        "Acte 2 Théâtre met sa salle de spectacle à disposition pour vos événements professionnels et culturels à Lyon."
      ),

      heading("La salle en chiffres"),
      para("• 100 places assises en configuration cabaret"),
      para("• Espace bar intégré"),
      para("• Régisseur lumière & son disponible sur demande"),
      para("• Située 32 quai Arloing, Lyon 9 (Vaise)"),

      heading("Pour quels usages ?"),
      para(
        "Représentations théâtrales, séminaires d'entreprise, comités d'entreprises, arbres de Noël, fêtes privées, répétitions, conférences, captations."
      ),

      heading("Créneaux disponibles"),
      para(
        "Location au créneau horaire, à la demi-journée, à la journée, au week-end ou au mois selon vos besoins."
      ),

      heading("Devis"),
      para("Pour un devis personnalisé, contactez-nous :"),
      para("• acte2theatre@yahoo.fr"),
      para("• acte2lyonhd@yahoo.fr"),
      para("• acte2communication@gmail.com"),
    ],
  },
  {
    slug: "soutenir",
    titre: "Nous soutenir",
    seoTitre: "Nous soutenir · Acte 2 Théâtre",
    seoDescription:
      "Soutenez Acte 2 Théâtre : abonnement saison, séances scolaires, location de salle, mécénat.",
    contenu: [
      para(
        "Acte 2 Théâtre vit grâce au public, aux compagnies invitées et aux partenaires qui rendent possible chaque saison. Voici comment nous soutenir."
      ),

      heading("Carte d'abonnement saison"),
      para(
        "10 spectacles pour 110 € — la formule la plus avantageuse pour profiter pleinement de notre programmation jeune public et adulte."
      ),

      heading("Séances scolaires"),
      para(
        "Nous accueillons les groupes scolaires sur réservation, avec une programmation adaptée selon les niveaux (Monte Cristo dès 12 ans, Sacré Molière dès 11 ans, et notre programmation jeune public dès 18 mois)."
      ),
      para("Contact écoles : acte2resa@yahoo.fr · 04 78 83 21 71"),

      heading("Location de salle"),
      para(
        "Privatisez la salle pour vos événements (séminaires, arbres de Noël, comités d'entreprise) : voir la page Location de salle."
      ),

      heading("Mécénat / partenariats"),
      para(
        "Vous représentez une entreprise ou une association et souhaitez devenir partenaire ? Écrivez à acte2theatre@yahoo.fr."
      ),
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PARAMÈTRES (singleton)
// ─────────────────────────────────────────────────────────────────────────────

const PARAMETRES = {
  _id: "parametres",
  _type: "parametres",
  nomSite: "Acte 2 Théâtre",
  baseline: "Théâtre de proximité — Lyon 9",
  adresse: "32, quai Arloing\n69009 Lyon",
  telephone: "04 78 83 21 71",
  email: "acte2resa@yahoo.fr",
  horaires:
    "Accueil sur rendez-vous et 1h avant chaque représentation.\nRéservations : acte2resa@yahoo.fr",
  reseauxSociaux: {
    facebook:
      "https://www.facebook.com/people/ACTE-2th%C3%A9%C3%A2tre/61559022917345/?locale=fr_FR",
  },
  carteAbonnement: { actif: true, nbSpectacles: 10, prix: 110 },
  footerTexte: [
    para(
      "Acte 2 Théâtre — 32 quai Arloing, 69009 Lyon — 04 78 83 21 71. Théâtre de proximité, jeune public et adulte, à Vaise."
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

console.log(
  `→ Seed complet vers Sanity (project=${projectId}, dataset=${dataset})\n`
);

const warnings = [];

// 1. Catégories
console.log("─ Catégories ─");
const catIds = {};
for (const cat of CATEGORIES) {
  catIds[cat.slug] = await upsertBySlug("categorie", cat.slug, {
    nom: cat.nom,
    couleur: cat.couleur,
    ordre: cat.ordre,
  });
  console.log(`  ✓ ${cat.nom}`);
}

// 2. Spectacles
console.log("\n─ Spectacles ─");
let spCount = 0;
for (const sp of SPECTACLES) {
  const parsedDates = [];
  for (const raw of sp.datesRaw) {
    const iso = parseFrenchDate(raw);
    if (iso) parsedDates.push(iso);
    else warnings.push(`[${sp.slug}] Date non parsée : "${raw}"`);
  }
  const futureDates = parsedDates.filter((iso) => new Date(iso) >= new Date());
  if (futureDates.length === 0) {
    futureDates.push(placeholderDateISO(14, 20));
    warnings.push(`[${sp.slug}] Aucune date future, placeholder à +14j ajouté`);
  }

  let asset;
  try {
    asset = await uploadImage(sp.image, `${sp.slug}.jpg`);
  } catch (e) {
    warnings.push(`[${sp.slug}] Image échouée : ${e.message}`);
    continue;
  }

  const doc = {
    titre: sp.titre,
    compagnie: sp.compagnie,
    categorie: { _type: "reference", _ref: catIds[sp.categorieSlug] },
    publicCible: sp.publicCible,
    resume: sp.resume,
    representations: futureDates.map((dateHeure, i) => ({
      _type: "representation",
      _key: `rep-${i}-${k()}`,
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
  if (sp.tarifEnfant) doc.tarifEnfant = sp.tarifEnfant;
  if (sp.tarifReduit) doc.tarifReduit = sp.tarifReduit;
  if (sp.distribution) {
    doc.distribution = sp.distribution.map((m) => ({
      _type: "membre",
      _key: k(),
      nom: m.nom,
      ...(m.role && { role: m.role }),
    }));
  }

  await upsertBySlug("spectacle", sp.slug, doc);
  console.log(`  ✓ ${sp.titre}  (${futureDates.length} dates)`);
  spCount++;
}

// 3. Ateliers
console.log("\n─ Ateliers ─");
let atCount = 0;
for (const at of ATELIERS) {
  let asset;
  try {
    asset = await uploadImage(at.image, `atelier-${at.slug}.jpg`);
  } catch (e) {
    warnings.push(`[atelier ${at.slug}] Image échouée : ${e.message}`);
  }
  const doc = {
    titre: at.titre,
    type: at.type,
    publicCible: at.publicCible,
    saison: at.saison,
    planning: at.planning,
    tarif: at.tarif,
    description: at.description,
    actif: true,
  };
  if (at.contactEmail) doc.contactEmail = at.contactEmail;
  if (at.inscriptionUrl) doc.inscriptionUrl = at.inscriptionUrl;
  if (asset) {
    doc.image = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: at.titre,
    };
  }
  await upsertBySlug("atelier", at.slug, doc);
  console.log(`  ✓ ${at.titre}`);
  atCount++;
}

// 4. Pages statiques
console.log("\n─ Pages statiques ─");
let pgCount = 0;
for (const pg of PAGES_STATIQUES) {
  const doc = {
    titre: pg.titre,
    contenu: pg.contenu,
    seoTitre: pg.seoTitre,
    seoDescription: pg.seoDescription,
  };
  await upsertBySlug("pageStatique", pg.slug, doc);
  console.log(`  ✓ ${pg.titre}  (/${pg.slug})`);
  pgCount++;
}

// 5. Singleton paramètres (createOrReplace au lieu d'upsertBySlug)
console.log("\n─ Paramètres globaux ─");
await client.createOrReplace(PARAMETRES);
console.log(`  ✓ Singleton 'parametres' mis à jour`);

// 6. "Touch" tous les docs pour redéclencher le webhook revalidate
//    (utile parce que createOrReplace sur un doc neuf ne réveille pas toujours
//    les tags Next.js qui n'existaient pas encore).
console.log("\n─ Re-trigger webhook (touch) ─");
const touchableTypes = ["categorie", "spectacle", "atelier", "pageStatique", "parametres"];
for (const t of touchableTypes) {
  const docs = await client.fetch(`*[_type == $t]{_id}`, { t });
  for (const d of docs) {
    await client.patch(d._id).set({ _retouchedAt: new Date().toISOString() }).commit();
  }
  console.log(`  ✓ ${docs.length} ${t}(s) touchés`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Bilan
// ─────────────────────────────────────────────────────────────────────────────

console.log(`\n${"─".repeat(60)}`);
console.log(`✓ ${CATEGORIES.length} catégories, ${spCount} spectacles, ${atCount} ateliers, ${pgCount} pages, 1 singleton paramètres.`);
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} avertissement(s) :`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}
console.log(`\n🎉 Migration terminée. Vérifie sur https://acte2theatre.vercel.app`);
