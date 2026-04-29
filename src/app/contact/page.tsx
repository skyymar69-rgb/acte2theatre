import {
  pageStatiqueMetadata,
  renderPageStatique,
} from "@/components/page-statique-renderer";
import { ContactForm } from "@/components/contact-form";
import { GoogleMapEmbed } from "@/components/google-map-embed";
import { NextShowsTeaser } from "@/components/next-shows-teaser";
import { SeoBody } from "@/components/seo-body";
import { Star } from "lucide-react";

export const revalidate = 3600;

export const generateMetadata = () => pageStatiqueMetadata({ slug: "contact" });

export default async function ContactPage() {
  return (
    <>
      {await renderPageStatique({ slug: "contact" })}

      {/* Carte + bouton avis Google */}
      <section
        aria-labelledby="map-title"
        className="bg-surface-2/50 border-y border-divider/15 py-12 md:py-16"
      >
        <div className="container max-w-5xl">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
            <h2 id="map-title" className="text-2xl">
              Nous trouver à Lyon
            </h2>
            <a
              href="https://share.google/80TM7ToTYjJf2phd6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !py-2 !px-4 text-sm"
            >
              <Star className="w-4 h-4 text-or-500" aria-hidden="true" />
              Laisser un avis Google
            </a>
          </div>
          <GoogleMapEmbed />
          <p className="mt-4 text-sm text-ink-muted">
            Bus C14, C6, 31 — arrêt Place Valmy. Métro D Gorge de Loup à
            10&nbsp;min à pied. Parking conseillé&nbsp;: Indigo Saint-Paul ou
            zones bleues à proximité.
          </p>
        </div>
      </section>

      {/* Formulaire de contact RGPD */}
      <section
        aria-labelledby="form-title"
        className="container max-w-3xl py-12 md:py-16"
      >
        <header className="mb-8">
          <h2 id="form-title" className="text-2xl mb-2">
            Nous écrire
          </h2>
          <p className="text-ink-muted">
            Une question sur la programmation, un projet de location, une
            demande de réservation scolaire&nbsp;? Utilisez ce formulaire ou
            écrivez directement à{" "}
            <a
              href="mailto:acte2theatre@yahoo.fr"
              className="text-rouge-600 dark:text-or-400 underline underline-offset-2"
            >
              acte2theatre@yahoo.fr
            </a>
            .
          </p>
        </header>
        <ContactForm />
      </section>

      <SeoBody
        kicker="Joindre Acte 2 Théâtre"
        titre="Toutes les façons de nous contacter, à Lyon 9"
        accroche="Que ce soit pour réserver une place, organiser une sortie scolaire, louer la salle pour votre événement ou simplement nous dire bonjour — voici les bons interlocuteurs et les bons canaux pour gagner du temps."
        sections={[
          {
            titre: "Notre adresse postale et nos coordonnées principales",
            paragraphes: [
              "Acte 2 Théâtre est implanté au <strong>32 quai Arloing, 69009 Lyon</strong>, sur la rive droite de la Saône, dans le quartier <strong>Vaise</strong> (9ᵉ arrondissement). Le théâtre est ouvert au public les soirs de représentation et sur rendez-vous en journée pour les visites de salle, les démonstrations techniques et les rendez-vous professionnels. La <strong>billetterie</strong> ouvre une heure avant chaque spectacle, en même temps que l'espace bar du hall.",
              "Vous pouvez nous joindre en journée au <strong>04 78 83 21 71</strong> (administration et billetterie), tous les jours ouvrés. Pour les courriels, l'adresse <a href=\"mailto:acte2theatre@yahoo.fr\">acte2theatre@yahoo.fr</a> est notre boîte centrale : c'est là qu'arrive toute demande générale, devis, proposition de partenariat ou simple question. Pour les <strong>réservations de groupe</strong> (scolaires, CSE, associations), privilégiez <a href=\"mailto:acte2resa@yahoo.fr\">acte2resa@yahoo.fr</a> — vous obtiendrez plus rapidement un retour avec un tarif groupe et un calendrier.",
            ],
          },
          {
            titre: "À qui écrire selon votre demande",
            paragraphes: [
              "Pour gagner en réactivité, nous avons plusieurs <strong>boîtes mail spécialisées</strong>. La <strong>direction administrative</strong> (acte2theatre@yahoo.fr) traite les contrats, les factures, les demandes de privatisation, les paiements et l'accueil des publics. La <strong>direction artistique</strong> (acte2lyonhd@yahoo.fr) prend en charge la programmation, les propositions de spectacle (compagnies, artistes, agents), les questions sur les œuvres présentées et les invitations professionnelles. Le pôle <strong>communication</strong> (acte2communication@gmail.com) gère les demandes presse, les blogueurs, les influenceurs, les visuels et les partenariats média.",
              "Côté <strong>réservations individuelles</strong>, le plus simple reste la billetterie en ligne <a href=\"https://acte2theatre.mapado.com\" target=\"_blank\" rel=\"noopener noreferrer\">Mapado</a>, accessible 24/7 — vous y trouvez le calendrier complet, les tarifs et le e-billet par mail. Si vous préférez un échange humain, le téléphone reste disponible aux horaires d'ouverture.",
            ],
          },
          {
            titre: "Comment venir au théâtre",
            paragraphes: [
              "<strong>En transports en commun</strong>, le quartier de Vaise est très bien desservi : <strong>métro D station Gorge de Loup</strong> à environ 10 minutes à pied le long de la Saône (un trajet plat, agréable et bien éclairé) ; <strong>bus C14, C6, 31 — arrêt Place Valmy</strong> à 2 minutes à pied du théâtre ; <strong>tram T1 et T3</strong> via la place Valmy. La <strong>gare SNCF de Vaise</strong> se trouve à 5 minutes à pied : pratique si vous arrivez de Saint-Étienne, Roanne ou Dijon.",
              "<strong>En voiture</strong>, prévoyez de stationner au parking <strong>Indigo Saint-Paul</strong> (à proximité, payant), au parking de la <strong>gare de Vaise</strong> (relais TCL, plus économique en soirée) ou en zone bleue gratuite après 19 h dans les rues adjacentes. <strong>À vélo</strong>, plusieurs stations Vélo'v entourent le théâtre, et un arceau vélo se trouve devant l'entrée.",
              "<strong>Accessibilité PMR</strong> : la salle est accessible aux personnes à mobilité réduite. Merci de signaler votre venue lors de la réservation pour que nous préparions au mieux votre accueil et la place adaptée.",
            ],
          },
          {
            titre: "Nos horaires d'ouverture et nos délais de réponse",
            paragraphes: [
              "Le théâtre est <strong>ouvert au public 1 heure avant chaque représentation</strong>. L'<strong>administration</strong> est joignable du lundi au vendredi (hors jours fériés) en journée. Les soirs de spectacle, la billetterie reste ouverte jusqu'à 15 minutes après le début de la représentation pour les éventuels retardataires (l'accès en salle se fait alors entre deux scènes, à l'appréciation du régisseur).",
              "Pour vos <strong>messages écrits</strong>, nous nous engageons à répondre sous <strong>48 heures ouvrées</strong> pour les demandes simples et sous <strong>5 jours ouvrés</strong> pour les devis professionnels (locations, partenariats, mécénat). Si vous avez une <strong>contrainte de calendrier urgente</strong>, indiquez-le clairement en objet : nous ferons remonter la demande en priorité.",
            ],
          },
          {
            titre: "Réseaux sociaux, presse et communication",
            paragraphes: [
              "Suivez-nous sur <strong>Facebook</strong> et <strong>Instagram</strong> (@acte2theatre) pour les coulisses, les annonces de programmation, les jeux-concours et les places offertes. La newsletter mensuelle, à laquelle vous pouvez vous inscrire en bas de chaque page, regroupe l'essentiel de la programmation à venir, les nouveautés ateliers et nos meilleures adresses lyonnaises.",
              "Côté <strong>presse</strong> : nous fournissons sur demande un dossier presse, des visuels haute définition, des éléments de langage sur l'identité <em>Happy Culture</em>, des fiches spectacle et un accueil presse les soirs de premières. Les avis Google et les retours sur nos billetteries partenaires (Mapado, BilletReduc, Ticketac) sont précieux : si vous avez aimé une soirée, n'hésitez pas à <a href=\"https://share.google/80TM7ToTYjJf2phd6\" target=\"_blank\" rel=\"noopener noreferrer\">laisser un avis</a>.",
            ],
          },
        ]}
        liens={[
          { href: "/spectacles", label: "Voir la programmation" },
          { href: "/location-salle", label: "Louer la salle" },
          { href: "/entreprise", label: "Espace entreprise" },
          { href: "/soutenir", label: "Nous soutenir" },
          { href: "/plan-du-site", label: "Plan complet du site" },
        ]}
      />

      <NextShowsTeaser />
    </>
  );
}
