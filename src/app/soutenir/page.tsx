import {
  pageStatiqueMetadata,
  renderPageStatique,
} from "@/components/page-statique-renderer";
import { NextShowsTeaser } from "@/components/next-shows-teaser";
import { SeoBody } from "@/components/seo-body";

export const revalidate = 3600;

export const generateMetadata = () => pageStatiqueMetadata({ slug: "soutenir" });

export default async function SoutenirPage() {
  return (
    <>
      {await renderPageStatique({ slug: "soutenir" })}

      <SeoBody
        kicker="Soutenir Acte 2 Théâtre"
        titre="Pourquoi et comment soutenir un théâtre indépendant à Lyon"
        accroche="Acte 2 Théâtre vit grâce à son public, à ses spectateurs réguliers, à ses partenaires entreprises et à toutes les personnes qui croient qu'un théâtre de proximité est un bien commun. Voici les manières concrètes de nous donner un coup de pouce — et ce que cela permet."
        sections={[
          {
            titre: "Un théâtre indépendant, financé par celles et ceux qui le fréquentent",
            paragraphes: [
              "Acte 2 Théâtre est une <strong>structure indépendante</strong>, exploitée par une SARL familiale, sans subvention de fonctionnement régulière. Cela signifie que <strong>chaque place vendue, chaque atelier, chaque location de salle, chaque don</strong> contribue directement au maintien d'une saison riche, à des cachets corrects pour les compagnies invitées, à l'entretien de la salle et à une politique tarifaire accessible (places adulte à 13 €, enfant à 12 €). C'est un modèle économique fragile mais sain : il oblige à rester proche du public et à proposer une programmation qui a du sens.",
              "Soutenir Acte 2 Théâtre ne consiste donc pas à « payer un supplément » — c'est <strong>participer au financement direct d'un acteur culturel de quartier</strong>, dans un 9ᵉ arrondissement où les espaces culturels indépendants se font rares. Chaque geste compte, qu'il soit grand ou petit, financier ou non.",
            ],
          },
          {
            titre: "Acheter sa place… et en parler autour de soi",
            paragraphes: [
              "La manière la plus simple et la plus efficace de nous soutenir reste de <strong>venir voir un spectacle</strong> et d'<strong>en parler</strong>. Le bouche-à-oreille est, pour un théâtre indépendant, plus puissant que n'importe quelle campagne de pub : recommander une soirée à un proche, partager une représentation sur les réseaux sociaux, laisser un avis Google après un coup de cœur, c'est concret, gratuit, et ça nous aide énormément. Pour repérer les prochaines dates, rendez-vous sur la page <a href=\"/spectacles\">programmation</a>.",
              "Les <strong>cartes d'abonnement</strong> sont une autre façon de soutenir le théâtre dans la durée : vous bénéficiez d'un tarif réduit, vous vous engagez à venir plusieurs fois dans la saison, et vous nous permettez de mieux anticiper notre billetterie. C'est aussi un excellent <strong>cadeau</strong> à offrir à un proche amateur de scène vivante.",
            ],
          },
          {
            titre: "Privatiser la salle pour vos événements",
            paragraphes: [
              "Pour les <strong>entreprises, CSE, associations et collectivités</strong>, organiser un événement à Acte 2 Théâtre (séminaire, arbre de Noël, lancement, soirée de cohésion, AG) est l'un des moyens les plus efficaces de nous soutenir. Les revenus de location professionnelle représentent une part significative de notre équilibre économique et permettent de programmer des spectacles à petit prix le reste du temps. Vous y gagnez un cadre original et marquant pour vos invités, nous y gagnons les moyens de continuer à programmer une saison riche : c'est gagnant-gagnant.",
              "Toutes les informations sur la page <a href=\"/entreprise\">espace entreprise</a> et la page <a href=\"/location-salle\">location de salle</a>, avec une demande de devis traitée sous 24 à 48 heures ouvrées.",
            ],
          },
          {
            titre: "Mécénat, parrainage de saison et partenariats",
            paragraphes: [
              "Si votre entreprise s'inscrit dans une logique de <strong>mécénat culturel</strong> ou de <strong>responsabilité sociale</strong>, plusieurs formules existent : parrainage de la saison (logo dans la communication, places offertes aux collaborateurs, soirée privative), parrainage d'un spectacle ou d'une création, mise à disposition de places pour un événement caritatif, participation au financement d'ateliers pour des publics éloignés de la culture. Nous construisons chaque collaboration sur mesure pour qu'elle soit à la fois <strong>lisible pour vos équipes</strong> et utile pour la salle.",
              "Pour les <strong>fondations</strong>, <strong>collectivités</strong> et <strong>structures publiques</strong>, nous pouvons monter des dossiers spécifiques (action culturelle en quartier prioritaire, accueil de publics scolaires, accessibilité, médiation). Écrivez à <a href=\"mailto:acte2theatre@yahoo.fr\">acte2theatre@yahoo.fr</a> avec le contour de votre dispositif et nous vous reviendrons rapidement avec une proposition.",
            ],
          },
          {
            titre: "Don ponctuel et déductibilité fiscale",
            paragraphes: [
              "Pour les <strong>dons ponctuels</strong>, nous étudions au cas par cas les meilleures modalités selon le profil du donateur (particulier, entreprise, association). Tous les dons ne sont pas systématiquement éligibles à un reçu fiscal — nous vous orientons vers les <strong>structures partenaires</strong> qui le sont si vous souhaitez bénéficier d'une déductibilité fiscale (article 200 du CGI pour les particuliers, article 238 bis du CGI pour les entreprises). Le plus simple est d'écrire à l'administration en précisant le type et le montant envisagés.",
            ],
          },
          {
            titre: "Bénévolat, parrainage et coups de main concrets",
            paragraphes: [
              "Nous sommes toujours preneurs de <strong>coups de main concrets</strong> sur des sujets ponctuels : aide à l'accueil un soir de premières, distribution de tracts, photographie, vidéo, logistique d'un gros événement, participation à un brainstorming sur un projet pédagogique. Si vous avez une expertise (graphisme, communication, droit, comptabilité, accessibilité, RSE…) et un peu de temps à offrir, écrivez-nous : nous trouverons sûrement une manière de transformer cette envie en action utile pour le théâtre.",
              "Enfin, <strong>parler de nous</strong> à votre comité d'entreprise, à votre association, à votre école, à votre cercle de blogueurs ou journalistes culturels lyonnais, c'est une forme de soutien très précieuse, qui ne coûte rien mais qui ouvre des portes. Merci d'avance.",
            ],
          },
        ]}
        liens={[
          { href: "/spectacles", label: "Voir la programmation" },
          { href: "/entreprise", label: "Privatiser la salle" },
          { href: "/location-salle", label: "Détails location" },
          { href: "/contact", label: "Nous écrire" },
        ]}
      />

      <NextShowsTeaser
        title="Découvrez la programmation à soutenir"
        subtitle="Chaque billet est un soutien direct aux compagnies invitées."
      />
    </>
  );
}
