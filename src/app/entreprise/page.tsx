import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Building2,
  Users,
  Sparkles,
  Wine,
  Drama,
  Wrench,
  Mail,
  CheckCircle2,
  Send,
  Calendar,
} from "lucide-react";
import { NextShowsTeaser } from "@/components/next-shows-teaser";
import { SeoBody } from "@/components/seo-body";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Entreprise · location de salle de spectacle",
  description:
    "Salle de spectacle 100 places à louer à Lyon 9 (Vaise) pour vos comités d'entreprise, séminaires, arbres de Noël, répétitions. Configuration cabaret avec espace bar et régisseur. Devis rapide.",
  alternates: { canonical: "/entreprise" },
  keywords: [
    "location salle spectacle Lyon",
    "salle séminaire Lyon",
    "salle entreprise Lyon",
    "salle arbre de Noël Lyon",
    "comité entreprise Lyon",
    "salle cabaret Lyon",
    "Vaise Lyon 9",
    "location salle 100 places",
  ],
};

const USAGES = [
  {
    icon: Users,
    title: "Comités d'entreprise",
    desc: "Réunions de CSE, événements internes, soirées de cohésion d'équipe.",
  },
  {
    icon: Sparkles,
    title: "Séminaires",
    desc: "Configuration cabaret idéale pour les ateliers et les présentations interactives.",
  },
  {
    icon: Wine,
    title: "Arbres de Noël",
    desc: "Espace bar intégré, ambiance feutrée, scène pour spectacle ou animation.",
  },
  {
    icon: Drama,
    title: "Répétitions",
    desc: "Mise à disposition pour compagnies, conservatoires, école de théâtre, captations vidéo.",
  },
];

export default function EntreprisePage() {
  return (
    <>
      {/* HERO */}
      <section
        aria-labelledby="ent-hero-title"
        className="relative isolate overflow-hidden bg-nuit-950 text-craie-100 bg-grain"
      >
        <Image
          src="/images/scene-banderole.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-nuit-950 via-nuit-950/80 to-nuit-950"
        />
        <div className="relative container max-w-5xl py-16 md:py-24 lg:py-28">
          <nav aria-label="Fil d'Ariane" className="text-xs text-craie-100/65 mb-6">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:text-or-400">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-or-400" aria-current="page">
                Entreprise
              </li>
            </ol>
          </nav>

          <p className="text-or-400 font-medium uppercase tracking-[0.3em] text-xs md:text-sm mb-4">
            Salle de spectacle disponible à la location
          </p>
          <h1
            id="ent-hero-title"
            className="font-display !text-4xl md:!text-6xl lg:!text-7xl text-balance mb-5 leading-[1.05]"
          >
            Privatisez L&rsquo;Acte&nbsp;<span className="text-or-500">2</span> pour vos
            événements&nbsp;<span className="text-or-500">d&apos;entreprise</span>
          </h1>
          <p className="text-lg md:text-xl text-craie-100/85 max-w-2xl mb-8 text-pretty leading-relaxed">
            Une salle intimiste de <strong>100 places en configuration cabaret</strong>,
            un espace bar intégré, une scène équipée et un régisseur sur
            demande&nbsp;: tout est pensé pour faire de votre événement
            professionnel un moment marquant, à Lyon 9 (Vaise).
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:acte2theatre@yahoo.fr?subject=Demande%20de%20devis%20%E2%80%94%20Location%20L%27Acte%202"
              className="inline-flex items-center gap-2 px-6 md:px-7 py-3.5 bg-rouge-600 hover:bg-rouge-500 text-white rounded-full font-semibold text-base shadow-scene glow-or transition-all hover:scale-[1.02]"
            >
              <Send className="w-5 h-5" aria-hidden="true" />
              Demander un devis
            </a>
            <a
              href="tel:+33478832171"
              className="inline-flex items-center gap-2 px-6 md:px-7 py-3.5 border-2 border-or-500/60 hover:border-or-500 hover:bg-or-500/10 text-craie-100 rounded-full font-medium text-base transition-all"
            >
              04 78 83 21 71
            </a>
          </div>

          <p className="mt-5 text-xs text-craie-100/60 inline-flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-or-500" aria-hidden="true" />
            Réponse rapide, en 24-48h ouvrées.
          </p>
        </div>
      </section>

      {/* USAGES */}
      <section
        aria-labelledby="usages-title"
        className="container max-w-5xl py-14 md:py-20"
      >
        <header className="mb-10 max-w-2xl">
          <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
            Pour quels événements&nbsp;?
          </p>
          <h2 id="usages-title" className="text-balance">
            Une salle, plusieurs usages
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USAGES.map((u) => {
            const Icon = u.icon;
            return (
              <article
                key={u.title}
                className="rounded-xl border border-divider/15 bg-surface p-6 hover:border-or-500/40 hover:shadow-sm transition-all"
              >
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-or-500/15 text-or-600 dark:text-or-400 mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg mb-2 !text-lg">
                  {u.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">{u.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* DÉTAILS — capacités + créneaux */}
      <section
        aria-labelledby="details-title"
        className="bg-surface-2/40 border-y border-divider/15 py-14 md:py-20"
      >
        <div className="container max-w-5xl grid md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
              La salle
            </p>
            <h2 id="details-title" className="mb-5 text-balance">
              100 places · cabaret · espace bar
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Building2
                  className="w-5 h-5 mt-0.5 text-or-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  <strong>100 places assises</strong> en configuration cabaret
                  (tables rondes), modulables selon vos besoins.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Wine
                  className="w-5 h-5 mt-0.5 text-or-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  <strong>Espace bar</strong> intégré au hall pour
                  l&apos;accueil et le cocktail.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Drama
                  className="w-5 h-5 mt-0.5 text-or-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  <strong>Scène équipée</strong> en lumière et son, idéale pour
                  un spectacle ou une animation.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Wrench
                  className="w-5 h-5 mt-0.5 text-or-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  <strong>Régisseur lumière &amp; son</strong> mis à
                  disposition sur demande, pendant toute la durée de votre
                  location.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
              Créneaux
            </p>
            <h2 className="mb-5 text-balance">Une location flexible</h2>
            <p className="text-sm text-ink/85 mb-4">
              Selon les disponibilités du calendrier, la salle peut être louée
              pour&nbsp;:
            </p>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              <li className="flex items-center gap-2 p-3 rounded-lg bg-surface border border-divider/15">
                <Calendar
                  className="w-4 h-4 text-or-500 flex-shrink-0"
                  aria-hidden="true"
                />
                Créneau horaire
              </li>
              <li className="flex items-center gap-2 p-3 rounded-lg bg-surface border border-divider/15">
                <Calendar
                  className="w-4 h-4 text-or-500 flex-shrink-0"
                  aria-hidden="true"
                />
                Demi-journée
              </li>
              <li className="flex items-center gap-2 p-3 rounded-lg bg-surface border border-divider/15">
                <Calendar
                  className="w-4 h-4 text-or-500 flex-shrink-0"
                  aria-hidden="true"
                />
                Journée complète
              </li>
              <li className="flex items-center gap-2 p-3 rounded-lg bg-surface border border-divider/15">
                <Calendar
                  className="w-4 h-4 text-or-500 flex-shrink-0"
                  aria-hidden="true"
                />
                Week-end
              </li>
              <li className="col-span-2 flex items-center gap-2 p-3 rounded-lg bg-or-500/5 border border-or-500/30">
                <Calendar
                  className="w-4 h-4 text-or-500 flex-shrink-0"
                  aria-hidden="true"
                />
                Mensuel — résidence d&apos;artiste, captation, tournage
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* DEVIS — 3 contacts */}
      <section
        aria-labelledby="devis-title"
        className="container max-w-4xl py-14 md:py-20"
      >
        <div className="rounded-2xl border border-or-500/30 bg-surface p-8 md:p-12 text-center shadow-scene">
          <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-3">
            Demande de devis
          </p>
          <h2 id="devis-title" className="mb-4 text-balance">
            Parlons de votre événement
          </h2>
          <p className="text-ink-muted mb-8 max-w-xl mx-auto text-pretty">
            Décrivez votre projet en quelques mots — date envisagée, jauge
            attendue, type d&apos;événement — et nous revenons vers vous
            rapidement avec une proposition adaptée.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                role: "Direction administrative",
                email: "acte2theatre@yahoo.fr",
              },
              {
                role: "Direction artistique",
                email: "acte2lyonhd@yahoo.fr",
              },
              {
                role: "Communication",
                email: "acte2communication@gmail.com",
              },
            ].map((c) => (
              <a
                key={c.email}
                href={`mailto:${c.email}?subject=Demande%20de%20devis%20%E2%80%94%20Location%20L%27Acte%202`}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-2 border border-divider/15 hover:border-or-500/40 hover:bg-or-500/5 transition-all text-sm"
              >
                <Mail
                  className="w-5 h-5 text-or-500 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                <span className="text-xs uppercase tracking-wider text-ink-muted">
                  {c.role}
                </span>
                <span className="font-medium break-all">{c.email}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:acte2theatre@yahoo.fr?subject=Demande%20de%20devis%20%E2%80%94%20Location%20L%27Acte%202"
              className="btn-primary glow-or"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              Envoyer un mail
            </a>
            <a href="tel:+33478832171" className="btn-secondary">
              04 78 83 21 71
            </a>
          </div>

          <p className="mt-5 text-xs text-ink-muted">
            L'Acte 2 · 32 quai Arloing · 69009 Lyon (Vaise)
          </p>
        </div>
      </section>

      <SeoBody
        kicker="L'Acte 2 — espace entreprise"
        titre="Une salle de spectacle à louer à Lyon 9 pour vos événements professionnels"
        accroche="À deux pas de la gare de Vaise et du Vieux-Lyon, L'Acte 2 met sa salle à la disposition des entreprises, comités d'entreprise (CSE), associations, compagnies et établissements scolaires. Configuration cabaret de 100 places, espace bar intégré, scène équipée et régisseur sur demande : un cadre clés-en-main pour transformer votre événement en moment marquant."
        fond="surface-2"
        sections={[
          {
            titre: "Pourquoi choisir L'Acte 2 pour votre événement à Lyon",
            paragraphes: [
              "Située au <strong>32 quai Arloing dans le 9ᵉ arrondissement de Lyon</strong>, à 4 minutes à pied de la gare SNCF de Vaise et de son pôle multimodal (métro D, tram T1, bus, parkings), notre salle est l'un des rares lieux de spectacle indépendants de Lyon dimensionnés pour les événements d'entreprise de taille humaine. La <strong>jauge de 100 places en configuration cabaret</strong> — tables rondes de 4 à 8 personnes — favorise les échanges, l'attention et l'ambiance feutrée. Plus généreuse qu'une salle de réunion classique, plus intime qu'une grande salle de spectacle, elle est calibrée pour les soirées qui doivent à la fois informer, divertir et faire date.",
              "L'identité « <em>Happy Culture</em> » de L'Acte 2 repose sur un parti pris simple : la culture doit rester accessible, festive et conviviale. Dans le cadre d'une privatisation, cela se traduit par un <strong>accueil personnalisé</strong>, un espace bar à l'entrée pour démarrer la soirée verre en main, et la possibilité d'enchaîner ou d'intégrer un spectacle programmé dans notre saison — un seul-en-scène, un concert, une pièce courte, un magicien.",
            ],
          },
          {
            titre: "Quels événements professionnels peut-on organiser ?",
            paragraphes: [
              "Notre salle accueille régulièrement des <strong>réunions de CSE (comités sociaux et économiques)</strong>, des <strong>arbres de Noël d'entreprise</strong>, des soirées de cohésion d'équipe (team building), des <strong>séminaires</strong>, des conventions annuelles, des lancements produit, des cocktails de fin d'année, ainsi que des assemblées générales d'associations lyonnaises. Le format cabaret est particulièrement adapté aux <strong>conférences interactives</strong>, aux ateliers participatifs et aux soirées-spectacles où l'on alterne discours institutionnel et animation artistique.",
              "Côté usages plus créatifs, des compagnies, écoles de théâtre, conservatoires et collectifs d'artistes louent ponctuellement la salle pour des <strong>résidences de création</strong>, des répétitions filées, des <strong>captations vidéo</strong> (concert, démo, pilote) ou des tournages courts. La scène et les régies sont accessibles pour des plages horaires modulables : créneau de 3 heures, demi-journée, journée, week-end ou formule mensuelle pour les résidences.",
            ],
          },
          {
            titre: "Équipements techniques et ressources humaines",
            paragraphes: [
              "La salle dispose d'un <strong>plateau scénique</strong> équipé d'un parc lumière et son fonctionnel pour spectacle vivant, conférence ou concert acoustique. Un <strong>régisseur professionnel</strong> peut être mis à disposition pour la mise en place, les réglages et l'exploitation pendant toute la durée de votre location — option vivement recommandée dès qu'un dispositif technique entre en jeu (vidéo, son live, jeu d'acteurs, conférenciers avec micro HF). Les besoins spécifiques (vidéoprojection grand format, micros supplémentaires, captation, régie multi-sources) sont étudiés au cas par cas et chiffrés dans le devis.",
              "Le <strong>hall d'accueil</strong>, qui sert de bar les soirs de spectacle, devient un espace de pré-cocktail naturel. Selon votre projet, il peut être dressé pour un <strong>verre d'accueil, un buffet dînatoire ou une remise de prix</strong>. La régie traiteur reste à votre main : vous pouvez faire intervenir le prestataire de votre choix ou demander une recommandation parmi nos partenaires lyonnais habituels (cuisine de quartier, traiteur événementiel).",
            ],
          },
          {
            titre: "Comment réserver et obtenir un devis",
            paragraphes: [
              "La marche à suivre est simple. Décrivez en quelques lignes votre <strong>projet d'événement</strong> : date envisagée (ou plage de dates), créneau horaire, jauge prévue, type d'événement, format souhaité (cabaret, conférence, spectacle invité…), besoins techniques et restauration. Adressez ce brief à <a href=\"mailto:acte2theatre@yahoo.fr\">acte2theatre@yahoo.fr</a> pour un retour de la <strong>direction administrative</strong>, à <a href=\"mailto:acte2lyonhd@yahoo.fr\">acte2lyonhd@yahoo.fr</a> si vous avez aussi des questions sur le contenu artistique, ou téléphonez au <strong>04 78 83 21 71</strong>.",
              "Nous vous répondons en <strong>24 à 48 heures ouvrées</strong> avec une proposition détaillée : tarif, ce qui est inclus, options techniques, conditions de privatisation, modalités de paiement (acompte, solde, RIB sur facture). La signature d'un contrat de location simple verrouille la date dans le calendrier. Si vous représentez un CSE, une association ou une collectivité, nous établissons les justificatifs nécessaires (devis, facture pro forma, attestation) pour vos process internes.",
            ],
          },
          {
            titre: "Un partenaire lyonnais qui vous ressemble",
            paragraphes: [
              "Privatiser L'Acte 2, c'est aussi soutenir un <strong>théâtre indépendant</strong> et un <strong>tissu culturel local</strong>. Les ressources générées par les locations professionnelles permettent à la salle de continuer à programmer une saison riche tout au long de l'année — spectacles jeune public à petit prix, créations de jeunes compagnies, ateliers pour adultes — et de maintenir une politique tarifaire accessible (places à partir de 12 €). Votre événement a donc une <strong>portée RSE</strong> bien réelle : il participe au financement d'un acteur culturel de proximité du 9ᵉ arrondissement.",
              "Si votre entreprise s'inscrit dans une logique de <strong>mécénat culturel</strong> ou de <strong>partenariats long terme</strong> (parrainage de saison, abonnement-cadeau pour les collaborateurs, places offertes aux clients), parlons-en : nous adaptons les contreparties (logo dans la communication, rendez-vous dédiés, soirées privatives, cocktails post-spectacle). Notre échelle nous permet de construire des collaborations sur mesure, à la fois lisibles pour vos équipes et utiles pour la salle.",
            ],
          },
        ]}
        liens={[
          { href: "/location-salle", label: "Détails techniques de la salle" },
          { href: "/spectacles", label: "Voir la programmation" },
          { href: "/soutenir", label: "Mécénat et partenariats" },
          { href: "/contact", label: "Toutes les coordonnées" },
        ]}
      />

      <NextShowsTeaser
        title="Pendant ce temps, à l'affiche…"
        subtitle="Et si vous veniez d'abord découvrir la salle un soir de spectacle&nbsp;?"
      />
    </>
  );
}
