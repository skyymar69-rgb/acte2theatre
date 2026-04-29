import { JsonLd } from "./json-ld";

export interface FaqItem {
  question: string;
  answer: string; // texte simple — peut contenir <a>, <strong>
}

/**
 * Bloc FAQ accessible avec emit du schema FAQPage pour AI Overviews et
 * rich snippets Google. Chaque question est un <details>/<summary> natif
 * pour la navigation clavier sans JS.
 */
export function Faq({
  title = "Questions fréquentes",
  items,
  withSchema = true,
}: {
  title?: string;
  items: FaqItem[];
  withSchema?: boolean;
}) {
  const faqSchema = withSchema && items.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
      }
    : null;

  return (
    <>
      {faqSchema && <JsonLd data={faqSchema} />}
      <section aria-labelledby="faq-title" className="space-y-2">
        <h2 id="faq-title" className="text-2xl mb-6">
          {title}
        </h2>
        <div className="divide-y divide-divider/15 border-y border-divider/15">
          {items.map((item, i) => (
            <details
              key={i}
              className="group py-4 [&[open]_.faq-icon]:rotate-45"
            >
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none font-medium text-ink hover:text-rouge-600 dark:hover:text-or-400 transition-colors">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="faq-icon flex-shrink-0 mt-1 inline-block text-or-500 transition-transform duration-200"
                >
                  +
                </span>
              </summary>
              <p
                className="mt-3 text-ink/85 leading-relaxed text-pretty"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

/**
 * Construit la FAQ standardisée pour une page de spectacle à partir des
 * meta. Les réponses sont auto-générées à partir des données disponibles
 * pour rester factuelles et cohérentes.
 */
export function spectacleFaq({
  publicCible,
  dureeMinutes,
  tarifAdulte,
  tarifEnfant,
  mapadoUrl,
}: {
  publicCible?: string;
  dureeMinutes?: number;
  tarifAdulte?: number;
  tarifEnfant?: number;
  mapadoUrl?: string;
}): FaqItem[] {
  const items: FaqItem[] = [];

  if (publicCible) {
    items.push({
      question: "À partir de quel âge ce spectacle est-il conseillé ?",
      answer: `Ce spectacle est conseillé pour le public suivant : <strong>${publicCible}</strong>. Les enfants plus jeunes peuvent l'apprécier accompagnés d'un adulte selon leur sensibilité.`,
    });
  }

  if (dureeMinutes) {
    const h = Math.floor(dureeMinutes / 60);
    const m = dureeMinutes % 60;
    const duree =
      h === 0
        ? `${dureeMinutes} minutes`
        : m === 0
        ? `${h} heure${h > 1 ? "s" : ""}`
        : `${h}h${m.toString().padStart(2, "0")}`;
    items.push({
      question: "Quelle est la durée du spectacle ?",
      answer: `Le spectacle dure environ <strong>${duree}</strong>, sans entracte sauf indication contraire.`,
    });
  }

  if (tarifAdulte || tarifEnfant) {
    const parts: string[] = [];
    if (tarifAdulte) parts.push(`adulte ${tarifAdulte}€`);
    if (tarifEnfant) parts.push(`enfant ${tarifEnfant}€`);
    items.push({
      question: "Combien coûte le billet ?",
      answer: `Tarifs en vigueur : ${parts.join(
        " · "
      )}. La carte d'abonnement saison (10 spectacles pour 110€) reste la formule la plus avantageuse pour les habitués.`,
    });
  }

  items.push({
    question: "Comment réserver mes places ?",
    answer:
      mapadoUrl
        ? `La réservation se fait en ligne via notre billetterie sécurisée Mapado : <a href="${mapadoUrl}" target="_blank" rel="noopener noreferrer">accéder à la billetterie de ce spectacle</a>. Les places non vendues sont disponibles sur place 30 minutes avant la représentation, dans la limite des disponibilités.`
        : `La réservation se fait en ligne via notre billetterie sécurisée Mapado : <a href="https://acte2theatre.mapado.com" target="_blank" rel="noopener noreferrer">acte2theatre.mapado.com</a>. Les places non vendues sont disponibles sur place 30 minutes avant la représentation, dans la limite des disponibilités.`,
  });

  items.push({
    question: "Le théâtre est-il accessible aux personnes en situation de handicap ?",
    answer:
      "La salle est accessible aux personnes à mobilité réduite. Pour réserver un emplacement adapté ou être accueilli avec un accompagnateur, contactez-nous au préalable au 04 78 83 21 71 ou à acte2resa@yahoo.fr afin que nous préparions au mieux votre venue.",
  });

  items.push({
    question: "Comment venir au théâtre ?",
    answer:
      "Acte 2 Théâtre est situé au 32 quai Arloing, 69009 Lyon, dans le quartier de Vaise. Accès en bus C14, C6 ou 31 (arrêt Place Valmy), métro D station Gorge de Loup à 10 minutes à pied. Parking conseillé : Indigo Saint-Paul ou zones bleues à proximité.",
  });

  items.push({
    question: "Que se passe-t-il en cas d'annulation ?",
    answer:
      "Conformément à l'article L.221-28 12° du Code de la consommation, les billets de spectacle ne sont ni repris ni échangés. En cas d'annulation par Acte 2 Théâtre (force majeure, indisposition d'une compagnie), nous vous proposons un report sur une autre date ou le remboursement intégral sous 14 jours. Voir nos <a href=\"/cgv\">conditions générales de vente</a>.",
  });

  return items;
}
