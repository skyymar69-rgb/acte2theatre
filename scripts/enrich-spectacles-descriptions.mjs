/**
 * Enrichit les 10 spectacles existants avec :
 *  - description longue (PortableText, blocs h2 + paragraphes)
 *  - seoTitre optimisé
 *  - seoDescription optimisée
 *
 * Lance avec :
 *   node --env-file=.env.local scripts/enrich-spectacles-descriptions.mjs
 *
 * Idempotent — peut être lancé plusieurs fois sans dupliquer.
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
// Helpers Portable Text
// ─────────────────────────────────────────────────────────────────────────────

const k = () => crypto.randomBytes(6).toString("hex");

const para = (text) => ({
  _type: "block",
  _key: k(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

const heading = (text, style = "h2") => ({
  _type: "block",
  _key: k(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

/** Bloc avec passages en gras (markdef "strong") via segments [{text, bold?}, ...] */
const richPara = (segments) => {
  const strongKey = k();
  return {
    _type: "block",
    _key: k(),
    style: "normal",
    markDefs: [{ _key: strongKey, _type: "strong" }],
    children: segments.map((seg) => ({
      _type: "span",
      _key: k(),
      text: seg.text,
      marks: seg.bold ? [strongKey] : [],
    })),
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// Contenu enrichi par spectacle (slug → {seoTitre, seoDescription, blocks})
// ─────────────────────────────────────────────────────────────────────────────

const ENRICHED = {
  "bubulle-le-poisson-volant": {
    seoTitre: "Bubulle, le poisson volant — spectacle dès 3 ans · Lyon",
    seoDescription:
      "Spectacle jeune public dès 3 ans à Acte 2 Théâtre Lyon : Bubulle, un petit poisson rouge qui rêve de voler. Compagnie Les P'tites Dames. Réservation 12-13€.",
    blocks: [
      richPara([
        { text: "Et si un poisson rouge décidait de quitter son bocal pour aller voir le ciel de plus près ? " },
        { text: "Bubulle, le poisson volant", bold: true },
        { text: " est un petit bijou pour les tout-petits, porté par la malice et la tendresse de la Compagnie Les P'tites Dames." },
      ]),
      heading("L'histoire"),
      para(
        "Bubulle vit dans un bocal douillet. Tout va bien, jusqu'au jour où une mouette lui parle d'un monde au-delà de la vitre — un monde où l'on peut voler, plonger, danser entre les nuages. Le rêve de Bubulle prend forme, et avec lui une grande aventure faite de courage, de petites peurs et d'amitiés inattendues."
      ),
      heading("Pourquoi venir avec votre tout-petit ?"),
      para(
        "Conçu spécialement pour les enfants à partir de 3 ans, ce spectacle conjugue jeu d'objets, manipulation poétique et dialogue avec le jeune public. Les comédiennes prennent le temps des regards, des silences, des éclats de rire — un format idéal pour une première sortie au théâtre, à Lyon, en famille."
      ),
      heading("Pratique"),
      para(
        "Durée : environ 35 minutes, format adapté à la concentration des plus petits. Tarif unique 13€ adulte / 12€ enfant. Réservation en ligne via la billetterie sécurisée Mapado, ou sur place 30 minutes avant la représentation dans la limite des places disponibles. La salle Acte 2 est intimiste (100 places en cabaret) : tous les sièges offrent une vraie proximité avec la scène."
      ),
    ],
  },

  "loup-y-es-tu-conte-musical": {
    seoTitre: "Loup y es-tu ? Conte musical — 6-10 ans · Théâtre Lyon",
    seoDescription:
      "Conte musical pour les 6-10 ans à Lyon : musique classique, création plastique en direct et art du conte. Cie Tous à la musique, 1h, dès 12€.",
    blocks: [
      richPara([
        { text: "Un loup qui vient se présenter sur scène, des notes de musique classique qui dansent autour de lui, et un univers qui se dessine en direct sous les yeux des enfants : " },
        { text: "Loup y es-tu ?", bold: true },
        { text: " est un conte musical comme on en voit rarement." },
      ]),
      heading("Une création originale"),
      para(
        "La Cie Tous à la musique signe ici un spectacle hybride qui croise trois disciplines : le récit conté, la musique classique jouée en direct (violoncelle, clarinette, percussions selon les dates) et la création plastique sur scène — peinture en mouvement projetée pour accompagner l'histoire. Trois langages pour réveiller l'imaginaire des 6 à 10 ans."
      ),
      heading("Pour qui ?"),
      para(
        "Conseillé à partir de 6 ans, le spectacle reste largement accessible aux plus petits dès 4-5 ans s'ils sont déjà familiers du théâtre, et embarque avec autant de plaisir les adultes accompagnateurs. Un spectacle tout public où chacun trouve sa lecture."
      ),
      heading("Le mot des compagnies invitées à Acte 2"),
      para(
        "Comme chaque saison, Acte 2 Théâtre programme cette création dans le cadre de sa saison jeune public, à Lyon 9 (Vaise). Des séances scolaires peuvent être organisées sur demande pour les classes de CP au CM2 — écrire à acte2resa@yahoo.fr."
      ),
      heading("Pratique"),
      para(
        "Durée : 1h. Tarif : 13€ adulte / 12€ enfant. La carte d'abonnement saison (10 spectacles pour 110€) reste la formule la plus avantageuse pour les habitués. Réservation en ligne sur Mapado, ou par téléphone au 04 78 83 21 71."
      ),
    ],
  },

  "monsieur-maxence-au-pays-des-5-sens": {
    seoTitre: "Monsieur Maxence au pays des 5 sens — 18 mois-5 ans · Lyon",
    seoDescription:
      "Spectacle d'éveil sensoriel pour les 18 mois à 5 ans à Lyon. Acte 2 Théâtre, Cie Les 3 Coups Occitanie, 35-40 min. Tarifs 12-13€.",
    blocks: [
      richPara([
        { text: "Toucher, écouter, sentir, regarder, goûter : " },
        { text: "Monsieur Maxence", bold: true },
        { text: " emmène les tout-petits dans un voyage joyeux à la découverte de leurs cinq sens." },
      ]),
      heading("Le voyage de Monsieur Maxence"),
      para(
        "Monsieur Maxence est un drôle de personnage. À chaque escale de son spectacle, il déballe un nouvel objet, une nouvelle texture, une nouvelle musique. Les enfants sont invités à participer, à observer, à s'émerveiller — sans pression, à leur rythme. Un éveil sensoriel rythmé qui respecte parfaitement la concentration des 18 mois à 5 ans."
      ),
      heading("Pour qui ?"),
      para(
        "Spectacle pensé pour les tout-petits dès 18 mois jusqu'à 5 ans. Particulièrement adapté aux crèches, micro-crèches, écoles maternelles et familles. Les sorties scolaires sont accueillies avec joie : contact écoles à acte2resa@yahoo.fr."
      ),
      heading("Pratique"),
      para(
        "Durée : 35 à 40 minutes — format calibré pour la concentration des plus jeunes. La salle d'Acte 2 Théâtre, à Lyon 9 (Vaise), est plongée dans une lumière douce et accueille les petits dans un climat rassurant (poussettes acceptées dans le hall). Tarif unique : 13€ adulte / 12€ enfant. Plusieurs représentations programmées en mai, juin et juillet 2026."
      ),
    ],
  },

  "la-boite-a-histoires-decouvre-le-monde": {
    seoTitre: "La boîte à histoires découvre le monde — 18 mois-5 ans · Lyon",
    seoDescription:
      "Voyage poétique à travers les saisons pour les 18 mois à 5 ans à Acte 2 Théâtre Lyon. Cie Les 3 Coups Occitanie, 35 min. À partir de 12€.",
    blocks: [
      richPara([
        { text: "Une boîte ordinaire devient extraordinaire entre les mains de la conteuse : à chaque ouverture, c'est une saison qui s'invite, un souvenir qui se déploie, une nouvelle rencontre qui surprend les enfants. " },
        { text: "La boîte à histoires", bold: true },
        { text: " est un petit bijou pour les tout-petits qui découvrent le monde." },
      ]),
      heading("Les quatre saisons en récit"),
      para(
        "Le printemps qui se lève, l'été qui éclate, l'automne qui tombe en feuilles, l'hiver qui s'endort sous la neige : la conteuse de la Compagnie Les 3 Coups Occitanie déroule son récit en accord avec les sensations connues des plus jeunes. Chaque saison apporte son ambiance sonore, son objet emblématique, sa petite émotion. Un repère temporel doux pour les 18 mois à 5 ans."
      ),
      heading("Pour qui ?"),
      para(
        "Adapté aux 18 mois à 5 ans, le spectacle se prête à une première sortie au théâtre. Format court (35 minutes), narration claire, voix posée : tout est pensé pour que la concentration des enfants soit respectée et que la sortie reste un moment de plaisir."
      ),
      heading("Pratique"),
      para(
        "Durée : 35 minutes. Tarif : 13€ adulte / 12€ enfant. Acte 2 Théâtre, 32 quai Arloing à Lyon 9 (Vaise) — accessible en bus C14, C6, 31 (arrêt Place Valmy) et métro D Gorge de Loup à 10 min à pied. Représentations en mai et juin 2026."
      ),
    ],
  },

  "la-fee-toquee": {
    seoTitre: "La Fée Toquée — solo participatif 3-9 ans · Théâtre Lyon",
    seoDescription:
      "Solo participatif comédie, impro, chant et danse pour les 3-9 ans à Lyon. Sabrina Taghzouit · La Compagnie Dose. 45 min, 12-13€.",
    blocks: [
      richPara([
        { text: "Sabrina Taghzouit, alias " },
        { text: "La Fée Toquée", bold: true },
        { text: ", est un tourbillon de rires, de chansons et d'idées loufoques. Son spectacle solo participatif embarque les 3-9 ans dans une aventure qu'ils contribuent à inventer." },
      ]),
      heading("Comédie, improvisation, chant et danse"),
      para(
        "Pas de quatrième mur ici : la Fée Toquée parle aux enfants, leur demande leur avis, transforme leurs idées en péripéties. Quatre disciplines se croisent en permanence — comédie burlesque, improvisation à partir des propositions du public, chansons reprises en chœur, et petites chorégraphies qui mobilisent toute la salle."
      ),
      heading("Pour qui ?"),
      para(
        "Conseillé pour les enfants de 3 à 9 ans, le spectacle marche aussi bien à la maison qu'en sortie scolaire. Les fratries y trouvent leur compte : les plus grands rient des absurdités, les plus petits dansent et chantent."
      ),
      heading("Pratique"),
      para(
        "Durée : 45 minutes. Tarif : 13€ adulte / 12€ enfant. Plusieurs créneaux programmés en mai, juin et juillet 2026 — dont des séances à 14h30 idéales pour une sortie d'après-midi en famille à Lyon. Réservez vite : la jauge est limitée à 100 places."
      ),
    ],
  },

  "a-la-mienne": {
    seoTitre: "À la mienne — Nicolas Bret-Morel · Théâtre adulte Lyon",
    seoDescription:
      "Comédie théâtrale à Acte 2 Théâtre Lyon : Béatrice, romancière, dialogue avec ses personnages. Les Pendrillons Rouges. Tarifs 16-18€.",
    blocks: [
      richPara([
        { text: "Béatrice, romancière à succès, écrit dans un grand silence. Sauf que ses personnages ne sont pas du tout d'accord pour rester muets. " },
        { text: "À la mienne", bold: true },
        { text: " de Nicolas Bret-Morel met en scène les conversations rocambolesques d'une autrice avec les créatures qui peuplent ses pages." },
      ]),
      heading("Une comédie rythmée"),
      para(
        "Militaires bavards, médecins philosophes, voisins envahissants : la galerie de portraits que Béatrice tente d'écrire prend vie sur le plateau et reprend la main sur l'écriture. Le résultat ? Un dialogue savoureux, drôle, parfois grinçant, où chacun défend sa vérité face à la grande prêtresse du clavier."
      ),
      heading("Mise en scène"),
      para(
        "La compagnie Les Pendrillons Rouges signe une mise en scène énergique, qui joue avec les codes du théâtre pour mieux les détourner. Costumes soignés, rythme tendu, scènes qui s'enchaînent sans temps mort : 1h30 qui défilent à toute vitesse."
      ),
      heading("Pour qui ?"),
      para(
        "Tout public à partir de 14 ans. Idéal pour une soirée entre amis, une sortie en couple ou un moment de détente après le travail. Acte 2 Théâtre est à 10 minutes du métro Gorge de Loup à Lyon 9."
      ),
      heading("Pratique"),
      para(
        "Tarifs : 18€ plein / 16€ réduit (étudiants, demandeurs d'emploi, minima sociaux, +65 ans, groupes 10+). Représentation à 20h. Bar ouvert 30 minutes avant et après le spectacle dans le hall, ambiance feutrée parfaite pour prolonger la soirée."
      ),
    ],
  },

  "l-affaire-de-la-rue-de-lourcine": {
    seoTitre: "L'affaire de la rue de Lourcine — Labiche · Théâtre Lyon",
    seoDescription:
      "Vaudeville d'Eugène Labiche en deux pièces courtes à Acte 2 Théâtre Lyon. Mise en scène Ariane Sancosme, Compagnie Les Grandes Personnes.",
    blocks: [
      richPara([
        { text: "Eugène Labiche réinventé en deux pièces courtes : " },
        { text: "L'affaire de la rue de Lourcine", bold: true },
        { text: " et " },
        { text: "Le mystère de la rue Rousselet", bold: true },
        { text: " — un diptyque vaudevillesque qui réveille le maître de la comédie française avec un humour résolument contemporain." },
      ]),
      heading("Deux mystères, une même mécanique"),
      para(
        "Lendemain de fête mouvementé, voisins suspicieux, indices qui se contredisent : Labiche manie l'art du quiproquo comme personne. La compagnie Les Grandes Personnes restitue ce sens du rythme avec une mise en scène signée Ariane Sancosme — décor minimal, comédiens omniprésents, virages narratifs millimétrés."
      ),
      heading("Pour qui ?"),
      para(
        "Tout public adulte. Connaisseurs du théâtre classique comme néophytes y trouvent leur compte : la pièce reste accessible, drôle dès la première seconde, et offre un beau prétexte pour redécouvrir un classique du répertoire dans une salle à taille humaine."
      ),
      heading("Pratique"),
      para(
        "Pièce programmée à Acte 2 Théâtre, 32 quai Arloing à Lyon 9. Pour connaître les prochaines dates ou organiser une sortie de groupe, écrivez à acte2resa@yahoo.fr ou consultez la billetterie en ligne."
      ),
    ],
  },

  "pele-mele-magic-david": {
    seoTitre: "Pêle-Mêle — Magic David · Spectacle de magie Lyon",
    seoDescription:
      "Spectacle de magie de et avec Magic David à Acte 2 Théâtre Lyon. 1h de tours surprenants, tout public dès 8 ans. Tarifs 15-17€.",
    blocks: [
      richPara([
        { text: "Une heure de magie pure, signée " },
        { text: "Magic David", bold: true },
        { text: " : tours de proximité, mentalisme, illusions inattendues, le tout porté par un humour vif et une complicité immédiate avec le public." },
      ]),
      heading("Un magicien qui parle au public"),
      para(
        "Magic David n'est pas un illusionniste figé derrière un rideau. Il monte sur scène avec ses cartes, ses cordes, ses objets quotidiens — et invite régulièrement les spectateurs à le rejoindre pour vérifier de leurs propres mains qu'il n'y a pas de truc. Spoiler : il y en a toujours un, mais on ne le voit jamais."
      ),
      heading("Pour qui ?"),
      para(
        "Tout public dès 8 ans. Le spectacle marche aussi bien pour une soirée en famille avec des ados que pour une sortie entre adultes — la magie touche tous les âges. Idéal pendant les vacances scolaires."
      ),
      heading("Pratique"),
      para(
        "Durée : 1h, sans entracte. Tarifs : 17€ plein / 15€ réduit. Trois représentations programmées en juillet 2026 à 20h. La salle Acte 2 (100 places) est parfaite pour ce type de spectacle de proximité où chaque détail compte. Bar ouvert avant et après pour prolonger la magie."
      ),
    ],
  },

  "monte-cristo-loi-du-talion": {
    seoTitre: "Monte Cristo ou la Loi du Talion — séance scolaire dès 12 ans",
    seoDescription:
      "Adaptation de Dumas en 1h10, dès 12 ans, en séance scolaire à Acte 2 Théâtre Lyon. Cie Histoire de Voir, mise en scène Aline Collaudin.",
    blocks: [
      richPara([
        { text: "Le " },
        { text: "Comte de Monte Cristo", bold: true },
        { text: " concentré en 1h10, accessible aux collégiens et lycéens, avec quatre comédiens qui font surgir l'épopée d'Edmond Dantès dans une mise en scène épurée et rythmée signée Aline Collaudin." },
      ]),
      heading("Une adaptation pédagogique"),
      para(
        "La Compagnie Histoire de Voir a fait le choix d'un texte resserré qui garde l'essentiel des thèmes de Dumas : l'injustice, la vengeance, la transformation personnelle, le choix moral. Le langage classique du roman cohabite avec des références plus contemporaines, créant des passerelles directes avec l'imaginaire des élèves d'aujourd'hui."
      ),
      heading("Pour quels niveaux ?"),
      para(
        "À partir de 12 ans — adapté aux classes de 5e, 4e, 3e et seconde. Le spectacle se prête à un travail pédagogique en amont (lecture d'extraits) et en aval (rencontre avec les comédiens, fiche de retour d'expérience, dossier pédagogique sur demande)."
      ),
      heading("Distribution"),
      para(
        "Aline Collaudin (mise en scène et interprétation), Morgane Acien, Pierre Begue, Ugo Bulfone — quatre comédiens pour faire vivre tous les personnages du roman, avec un jeu de transformation costumière à vue."
      ),
      heading("Pratique"),
      para(
        "Séances scolaires sur demande au tarif groupe (à partir de 6€/élève selon effectif). Acte 2 Théâtre dispose de 100 places en configuration cabaret, parfaitement adaptée à l'accueil d'une classe complète. Demander un devis : acte2resa@yahoo.fr ou 04 78 83 21 71."
      ),
    ],
  },

  "sacre-moliere": {
    seoTitre: "Sacré Molière ! — séance scolaire 11-12 ans · Acte 2 Lyon",
    seoDescription:
      "Molière débarque dans notre époque. Séance scolaire à Acte 2 Théâtre Lyon, 1h30, dès 11 ans. Mise en scène Hervé Hartmann.",
    blocks: [
      richPara([
        { text: '"Molière débarque parmi nous ce soir !" — voilà l\'invitation lancée par ' },
        { text: "Sacré Molière !", bold: true },
        { text: " de la Compagnie 2 Trois Bricoles, mis en scène par Hervé Hartmann. Une plongée joyeuse dans la vie et l'œuvre du maître de la comédie française, à hauteur des collégiens." },
      ]),
      heading("Le spectacle"),
      para(
        "Avec sa troupe, Molière saute à pieds joints dans notre époque et éclabousse tout sur son passage : sa jeunesse insolente, son humour mordant, et ses secrets bien gardés. Cinq comédiens, des extraits emblématiques (Le Bourgeois Gentilhomme, Les Précieuses Ridicules, Tartuffe), un rythme soutenu — pour faire découvrir Molière aux élèves de 6e/5e sans jamais ennuyer."
      ),
      heading("Pour quels niveaux ?"),
      para(
        "Idéal pour les classes de 6e et 5e (11-12 ans), tout en restant un spectacle tout public adapté à l'ensemble de la famille. Les enseignants reçoivent un dossier pédagogique sur demande pour préparer la sortie ou mener un travail de retour en classe."
      ),
      heading("Distribution"),
      para(
        "Hervé Hartmann (mise en scène et jeu), Karine Revelant, Armel Beurier, Amandine Vinson, Antoine Dupire. Site de la compagnie : cie2troisbricoles.wixsite.com/bricoles."
      ),
      heading("Pratique"),
      para(
        "Durée : 1h30. Séances scolaires sur demande, au tarif groupe (devis sur acte2resa@yahoo.fr). Acte 2 Théâtre, 32 quai Arloing à Lyon 9 (Vaise) — accessible en bus C14, C6, 31 (Place Valmy) et métro D Gorge de Loup à 10 min à pied. Stationnement bus possible à proximité pour les transports scolaires."
      ),
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

console.log(`→ Enrichissement de ${Object.keys(ENRICHED).length} spectacles\n`);

let count = 0;
let warnings = [];

for (const [slug, content] of Object.entries(ENRICHED)) {
  const existing = await client.fetch(
    `*[_type == "spectacle" && slug.current == $slug][0]{_id, titre}`,
    { slug }
  );

  if (!existing) {
    warnings.push(`[${slug}] Spectacle introuvable, skip.`);
    continue;
  }

  await client
    .patch(existing._id)
    .set({
      seoTitre: content.seoTitre,
      seoDescription: content.seoDescription,
      description: content.blocks,
      _retouchedAt: new Date().toISOString(),
    })
    .commit();

  console.log(`  ✓ ${existing.titre} (${slug})`);
  count++;
}

console.log(`\n${"─".repeat(60)}`);
console.log(`✓ ${count} spectacles enrichis.`);
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} avertissement(s) :`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}
console.log(`\n🎉 Fin. Recharge https://acte2theatre.vercel.app/spectacles/<slug>`);
