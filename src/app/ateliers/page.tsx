import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/lib/sanity/client";
import { ATELIERS_QUERY } from "@/lib/sanity/queries";
import type { Atelier } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { SeoBody } from "@/components/seo-body";

export const revalidate = 3600;

export const metadata = {
  title: "Ateliers",
  description:
    "Stages et ateliers à L'Acte 2 : théâtre, Qi Gong, Tai Chi, soins énergétiques.",
};

const TYPE_LABELS: Record<string, string> = {
  theatre: "Théâtre",
  qigong: "Qi Gong",
  taichi: "Tai Chi",
  energetique: "Soins énergétiques",
  autre: "Autre",
};

export default async function AteliersPage() {
  const ateliers = await sanityFetch<Atelier[]>({
    query: ATELIERS_QUERY,
    tags: ["atelier"],
  });

  return (
    <div className="container py-12 md:py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="mb-3">Ateliers</h1>
        <p className="text-lg text-curtain-700">
          Stages et ateliers réguliers — théâtre pour adultes et enfants,
          énergétique chinoise.
        </p>
      </header>

      {ateliers.length === 0 ? (
        <p className="py-12 text-center text-curtain-600">
          Aucun atelier publié pour le moment.
        </p>
      ) : (
        <div className="space-y-12">
          {ateliers.map((atelier) => (
            <article
              key={atelier._id}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-curtain-200 last:border-b-0"
            >
              {atelier.image && (
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-curtain-100">
                  <Image
                    src={urlFor(atelier.image).width(600).url()}
                    alt={atelier.image.alt || atelier.titre}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <p className="text-sm font-medium uppercase tracking-wider text-stage-700 mb-2">
                  {TYPE_LABELS[atelier.type] ?? atelier.type}
                  {atelier.saison && ` · ${atelier.saison}`}
                </p>
                <h2 className="text-2xl mb-3">{atelier.titre}</h2>
                {atelier.publicCible && (
                  <p className="text-curtain-700 mb-3">
                    <strong>Public :</strong> {atelier.publicCible}
                  </p>
                )}
                {atelier.planning && (
                  <p className="text-curtain-700 whitespace-pre-line mb-3">
                    {atelier.planning}
                  </p>
                )}
                {atelier.tarif && (
                  <p className="text-curtain-700 mb-3">
                    <strong>Tarif :</strong> {atelier.tarif}
                  </p>
                )}
                {atelier.description && (
                  <div className="prose-acte2 mb-4">
                    <PortableText value={atelier.description} />
                  </div>
                )}
                <div className="flex flex-wrap gap-3 mt-4">
                  {atelier.inscriptionUrl && (
                    <a
                      href={atelier.inscriptionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-5 py-2.5 bg-stage-600 hover:bg-stage-700 text-white rounded font-medium transition-colors"
                    >
                      S&apos;inscrire
                    </a>
                  )}
                  {atelier.contactEmail && (
                    <a
                      href={`mailto:${atelier.contactEmail}`}
                      className="inline-flex items-center px-5 py-2.5 border border-curtain-300 hover:bg-curtain-100 rounded font-medium transition-colors"
                    >
                      Nous contacter
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ─────────── BLOC ÉDITORIAL SEO (~ 850 mots) ─────────── */}
      <SeoBody
        kicker="Pratique & transmission"
        titre="Cours de théâtre, stages et énergétique chinoise à Lyon"
        accroche="L'Acte 2 n'est pas qu'un lieu où l'on regarde — c'est aussi un endroit où l'on monte sur scène, où l'on apprend à respirer autrement, où l'on découvre son corps et sa voix. Adultes, ados, enfants : nos ateliers et stages s'adressent à tous ceux qui veulent vivre la scène de l'intérieur, ou simplement prendre soin d'eux dans un cadre bienveillant."
        sections={[
          {
            titre: "Atelier théâtre adultes — saison annuelle, deux niveaux",
            paragraphes: [
              "Notre <strong>atelier théâtre pour adultes</strong> à Lyon 9 propose une saison complète d'octobre à juin, en deux niveaux distincts : débutants pour celles et ceux qui n'ont jamais pratiqué, et confirmés pour les comédiennes et comédiens amateurs avec déjà plusieurs saisons d'expérience. Les cours ont lieu chaque semaine, le lundi, le mardi et le mercredi de 20 h à 22 h.",
              "Au programme : travail de la <strong>corporalité</strong>, jeux de voix (diction, articulation, projection), prise de confiance, gestion des déplacements sur scène, jeux d'improvisation, exercices d'espace et de présence, et bien sûr le plaisir du jeu. Chaque saison s'achève par le montage d'un spectacle joué devant le public dans la salle d'Acte 2 — la consécration logique d'un travail mené sur neuf mois.",
              "Le théâtre amateur, c'est plus qu'un loisir : c'est un terrain pour explorer ses émotions, gagner en aisance dans la prise de parole, et rencontrer une équipe soudée. Pour s'inscrire, il suffit d'écrire à <a href=\"mailto:acte2lyonhd@yahoo.fr\">acte2lyonhd@yahoo.fr</a> ; un formulaire d'inscription PDF est disponible sur la page contact.",
            ],
          },
          {
            titre: "Stage théâtre vacances 10-14 ans — pour les ados de Lyon",
            paragraphes: [
              "Pendant les vacances scolaires d'avril et de juillet, L'Acte 2 propose des <strong>stages théâtre intensifs pour les 10-14 ans</strong>. Cinq jours, du lundi au vendredi, de 9 h à 17 h, où les ados jouent, inventent, improvisent et montent un véritable spectacle qu'ils présenteront à leurs familles le vendredi soir.",
              "Au programme : jeux d'improvisation et de confiance, travail corporel et vocal, création de personnages, écriture collective, répétitions. Chaque enfant repart avec une expérience de scène — et souvent avec une envie de continuer. Le tarif est de <strong>200 € la semaine + 20 € d'adhésion à l'association</strong>.",
              "Sessions disponibles pour la saison 2025-2026 : avril 2026 (du 6 au 10, ou du 13 au 17) et juillet 2026 (du 6 au 10, du 20 au 24, ou du 27 au 31). Les places sont limitées à une douzaine de jeunes par session afin de garantir un encadrement de qualité. Inscriptions et infos : <a href=\"mailto:acte2lyonhd@yahoo.fr\">acte2lyonhd@yahoo.fr</a> ou 04 78 83 21 71.",
            ],
          },
          {
            titre: "Énergétique traditionnelle chinoise — Qi Gong, Tai Chi, soins",
            paragraphes: [
              "L'Acte 2 accueille également les ateliers de <strong>Qi Gong</strong>, <strong>Tai Chi</strong> et <strong>soins énergétiques</strong> animés par Laurence Cavex (Petite Source Shaoyang). Ces pratiques anciennes sont une porte d'entrée vers un mieux-être global : rééquilibrer les énergies, soulager les tensions physiques et psychiques, retrouver de la fluidité dans le corps comme dans l'esprit.",
              "Outils utilisés : Tui Na (massage thérapeutique chinois), Chi Nei Tsang (massage des organes internes), ventouses, moxibustion, acupression, méditation guidée. Ces séances peuvent se dérouler en cabinet (au théâtre, 32 quai Arloing), à domicile, ou en entreprise dans le cadre d'animations team building.",
              "Cette discipline est aussi une ressource précieuse pour les <strong>comédiens et acteurs lyonnais</strong> : Laurence propose un accompagnement corporel spécifique pour préparer une performance, gérer le trac, et ancrer la présence scénique. Réservations : <a href=\"https://www.medoucine.com/consultation/lyon/laurence-cavex/13847\" target=\"_blank\" rel=\"noopener noreferrer\">via Medoucine</a> ou directement à petitesourceshaoyang@gmail.com.",
            ],
          },
          {
            titre: "Pourquoi pratiquer le théâtre à Lyon ?",
            paragraphes: [
              "Lyon est une ville de théâtre, riche d'institutions historiques (Célestins, TNP, Croix-Rousse, Théâtre Comédie Odéon…) mais aussi d'un tissu de scènes indépendantes plus discrètes, où la <strong>pratique amateur</strong> trouve sa juste place. Acte 2, à Vaise, fait partie de ces lieux où l'on entre par la porte de l'apprentissage et où l'on ressort souvent avec l'envie de pousser plus loin.",
              "La pratique théâtrale, ce n'est pas seulement \"faire l'acteur\" : c'est apprendre à habiter son corps, à écouter, à improviser sous contrainte, à prendre la parole en public sans paniquer. Tout ce dont un quotidien moderne a besoin — du stand-up devant un open space jusqu'au pitch d'un projet associatif — passe par les fondamentaux que nous travaillons en cours.",
            ],
          },
          {
            titre: "Inscriptions, niveaux, prérequis",
            paragraphes: [
              "Aucune <strong>expérience préalable</strong> n'est requise pour rejoindre l'atelier débutants. Il suffit d'avoir envie d'essayer, d'être prêt·e à se mettre en jeu, et d'accepter la dimension collective du travail théâtral. Pour le niveau confirmés, nous demandons en général au moins deux saisons d'expérience en cours hebdomadaire ou un parcours équivalent.",
              "Le stage 10-14 ans accueille tout type de profil : aussi bien les jeunes déjà passionnés par le théâtre que celles et ceux qui découvrent. La parité fille-garçon est respectée, et l'encadrement est assuré par des comédiens professionnels rompus à l'animation pédagogique.",
              "Pour les ateliers de Qi Gong et Tai Chi, aucune condition physique particulière n'est requise — ces disciplines s'adaptent à tous les âges et à toutes les morphologies, y compris en cas de blessures ou de pathologies chroniques (avec l'accord d'un médecin si besoin).",
            ],
          },
          {
            titre: "Une saison qui se termine sur scène",
            paragraphes: [
              "Le point d'orgue de l'année, pour nos comédiens amateurs, c'est le <strong>spectacle de fin de saison</strong> : un texte choisi collectivement, mis en scène par notre équipe artistique, et joué devant un vrai public dans la salle de 100 places d'Acte 2. C'est intimidant, exaltant, libérateur — et c'est gratuit pour les amis et la famille des participants.",
              "Pour les stagiaires de juillet, le format est plus court mais l'énergie identique : une représentation finale le vendredi soir, devant les familles, avec costumes improvisés et écriture collective. Une expérience qu'ils n'oublient jamais.",
            ],
          },
        ]}
        liens={[
          { href: "/spectacles", label: "Voir notre programmation" },
          { href: "/contact", label: "Contacter l'équipe pédagogique" },
          { href: "/entreprise", label: "Team building en entreprise" },
        ]}
        fond="surface-2"
      />
    </div>
  );
}
