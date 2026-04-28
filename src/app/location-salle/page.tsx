import {
  pageStatiqueMetadata,
  renderPageStatique,
} from "@/components/page-statique-renderer";
import { NextShowsTeaser } from "@/components/next-shows-teaser";
import { SeoBody } from "@/components/seo-body";

export const revalidate = 3600;

export const generateMetadata = () =>
  pageStatiqueMetadata({ slug: "location-salle" });

export default async function LocationSallePage() {
  return (
    <>
      {await renderPageStatique({ slug: "location-salle" })}

      <SeoBody
        kicker="Louer L'Acte 2"
        titre="Une salle de spectacle 100 places à louer à Lyon, à deux pas de Vaise"
        accroche="Cabaret intimiste, espace bar intégré, scène équipée, régisseur sur demande : L'Acte 2 met à disposition un cadre clés-en-main pour vos événements artistiques, professionnels ou associatifs, à Lyon 9. Voici ce qu'il faut savoir avant de réserver."
        fond="surface-2"
        sections={[
          {
            titre: "Une salle pensée pour le spectacle vivant et la convivialité",
            paragraphes: [
              "L'Acte 2 est une <strong>salle de spectacle privée</strong> située au 32 quai Arloing, dans le 9ᵉ arrondissement de Lyon (Vaise). Avec sa <strong>jauge de 100 places en configuration cabaret</strong> — tables rondes de 4 à 8 personnes — elle s'inscrit dans la tradition des théâtres de proximité : assez grande pour accueillir un vrai public, assez intime pour qu'aucun spectateur ne soit jamais loin de la scène. Cette proximité physique est la signature du lieu et change radicalement la qualité d'écoute, que l'on accueille un seul-en-scène, un magicien, un concert acoustique ou une conférence.",
              "Le <strong>plateau scénique</strong> est équipé en parc lumière et son fonctionnel pour spectacle vivant. Il est suffisamment large pour accueillir une scénographie modeste, un duo musical ou une comédie chorale à 4-5 comédiens. Les régies son et lumière sont accessibles depuis l'arrière de la salle ; le câblage est en place pour intégrer rapidement un système son d'appoint (micros HF, ambiance, diffusion) ou un dispositif vidéo (vidéoprojecteur, captation, écran de retour).",
            ],
          },
          {
            titre: "Pour quels événements la salle est-elle louée ?",
            paragraphes: [
              "Trois grandes familles d'usages cohabitent. <strong>Côté professionnel</strong>, nous accueillons des comités d'entreprise (CSE), arbres de Noël, séminaires, conférences, lancements produit, conventions annuelles, soirées de cohésion et cocktails de fin d'année. La configuration cabaret est particulièrement adaptée aux <strong>soirées-spectacles d'entreprise</strong> où l'on alterne discours institutionnel, animation artistique et moments de convivialité au bar.",
              "<strong>Côté associatif et collectif</strong>, des associations lyonnaises louent la salle pour leurs assemblées générales, soirées de gala, projections-débats et événements caritatifs. Le tarif est étudié au cas par cas : nous savons que les budgets associatifs ne sont pas ceux d'un grand groupe, et nous proposons souvent des arrangements adaptés.",
              "<strong>Côté artistique</strong>, des compagnies, conservatoires, écoles de théâtre, comédiens en solo et collectifs louent la salle pour des <strong>résidences de création</strong>, des répétitions filées avec public, des <strong>captations vidéo</strong> (concert, démo, pilote, bande démo), des tournages courts ou des programmations indépendantes. Les formules mensuelles existent, à discuter selon le calendrier.",
            ],
          },
          {
            titre: "Créneaux, durée et flexibilité",
            paragraphes: [
              "Selon votre projet, la salle peut être louée par <strong>créneau horaire</strong> (3 heures, idéal pour une représentation ou un cocktail-spectacle), à la <strong>demi-journée</strong>, à la <strong>journée complète</strong>, en <strong>week-end</strong> ou en formule <strong>mensuelle</strong> pour les résidences. La flexibilité est un de nos atouts : nous savons que chaque événement a ses contraintes — un horaire de fin imposé par les horaires de transports en commun, une durée de répétition technique imposée par la complexité d'une scénographie, un timing CSE serré par les autres animations de la journée.",
              "Le <strong>calendrier</strong> est partagé sur demande. Les week-ends et soirées de la haute saison (octobre-décembre, mars-juin) sont à privilégier le plus tôt possible : les meilleures dates partent souvent plusieurs mois à l'avance.",
            ],
          },
          {
            titre: "Le devis, le contrat et les conditions",
            paragraphes: [
              "Pour obtenir un <strong>devis</strong>, écrivez à <a href=\"mailto:acte2theatre@yahoo.fr\">acte2theatre@yahoo.fr</a> ou téléphonez au <strong>04 78 83 21 71</strong> en décrivant votre projet (date, créneau, jauge prévue, type d'événement, besoins techniques, restauration). Vous recevrez sous <strong>24 à 48 heures ouvrées</strong> une proposition détaillée avec le tarif, ce qui est inclus, les options techniques et les conditions de paiement (acompte, solde, RIB sur facture).",
              "La signature d'un <strong>contrat de location</strong> verrouille la date dans le calendrier. Pour les CSE, associations et collectivités, nous établissons les justificatifs nécessaires (devis officiel, facture pro forma, attestation, RIB) pour vos process internes. Une <strong>assurance responsabilité civile</strong> du locataire est demandée pour la durée de la location ; un état des lieux d'entrée et de sortie est systématique.",
            ],
          },
          {
            titre: "Restauration, partenaires et options",
            paragraphes: [
              "L'<strong>espace bar du hall</strong> peut être ouvert pour vos invités à l'arrivée et à l'entracte. La régie traiteur reste à votre main : vous pouvez faire intervenir le prestataire de votre choix ou demander une recommandation parmi nos partenaires lyonnais habituels (cuisine de quartier, traiteur événementiel, food truck). Pour les soirées-spectacles d'entreprise, nous pouvons aussi vous mettre en contact avec des <strong>artistes de notre programmation</strong> (humoriste, magicien, musicien, comédien-en-scène) qui peuvent intervenir spécifiquement sur votre événement, en complément de la privatisation.",
              "Côté technique, des options sont disponibles selon votre projet : <strong>régisseur professionnel</strong> mis à disposition, vidéoprojection grand format, micros supplémentaires, captation multi-caméras, montage vidéo post-événement, photographe partenaire. Tout est chiffré dans le devis pour éviter les surprises.",
            ],
          },
          {
            titre: "Soutenir un acteur culturel lyonnais",
            paragraphes: [
              "Privatiser L'Acte 2, c'est aussi <strong>soutenir un théâtre indépendant</strong>. Les ressources générées par les locations professionnelles permettent à la salle de continuer à programmer une saison riche tout au long de l'année — spectacles jeune public à petit prix, créations de jeunes compagnies, ateliers pour adultes et enfants — et de maintenir une politique tarifaire accessible. Votre événement a donc une <strong>portée RSE</strong> bien réelle : il participe au financement d'un acteur culturel de proximité du 9ᵉ arrondissement.",
            ],
          },
        ]}
        liens={[
          { href: "/entreprise", label: "Espace entreprise (CSE, séminaires)" },
          { href: "/spectacles", label: "Voir la programmation" },
          { href: "/contact", label: "Toutes les coordonnées" },
          { href: "/soutenir", label: "Mécénat et partenariats" },
        ]}
      />

      <NextShowsTeaser />
    </>
  );
}
