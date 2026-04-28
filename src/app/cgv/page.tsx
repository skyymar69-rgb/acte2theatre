import { LegalPage, legalMetadata } from "@/components/legal-page";

export const metadata = legalMetadata(
  "Conditions Générales de Vente",
  "CGV d'Acte 2 Théâtre — billetterie spectacles, location de salle, ateliers. Tarifs, paiement, droit de rétractation, médiation."
);

export const revalidate = 86400;

export default function CGVPage() {
  return (
    <LegalPage
      titre="Conditions Générales de Vente"
      miseAJour="28 avril 2026"
    >
      <p>
        Les présentes Conditions Générales de Vente (ci-après «&nbsp;CGV&nbsp;»)
        s&apos;appliquent à toute commande passée auprès de la société{" "}
        <strong>ACTE&nbsp;2</strong> (SARL au capital de 8&nbsp;000&nbsp;€,
        494&nbsp;196&nbsp;819 RCS Lyon, siège social 32 quai Arloing 69009
        Lyon), pour les services suivants&nbsp;:
      </p>
      <ul>
        <li>billetterie de spectacles et abonnements ;</li>
        <li>inscription à des ateliers ou stages ;</li>
        <li>location de la salle de spectacle.</li>
      </ul>

      <h2>Article 1 — Champ d&apos;application</h2>
      <p>
        Les présentes CGV sont applicables à toute commande passée par un
        Client (consommateur ou professionnel) auprès d&apos;ACTE&nbsp;2,
        directement par téléphone, par courriel, sur place ou via un service de
        billetterie en ligne tiers (Mapado). Toute commande implique
        l&apos;acceptation sans réserve des présentes CGV.
      </p>
      <p>
        Pour la billetterie en ligne, les conditions générales de vente
        applicables sont également celles de la plateforme{" "}
        <strong>Mapado</strong> (
        <a
          href="https://www.mapado.com/cgv"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.mapado.com/cgv
        </a>
        ).
      </p>

      <h2>Article 2 — Tarifs</h2>
      <p>
        Les tarifs des spectacles sont indiqués sur chaque page spectacle, en
        euros toutes taxes comprises (TTC). ACTE&nbsp;2 est assujettie au taux
        de TVA réduit applicable aux représentations théâtrales (5,5&nbsp;%) au
        jour de la rédaction des présentes — ce taux est susceptible
        d&apos;évoluer en fonction de la réglementation fiscale en vigueur.
      </p>
      <p>
        Les tarifs peuvent évoluer à tout moment&nbsp;; la commande est
        facturée au tarif en vigueur au jour de sa validation.
      </p>

      <h3>2.1. Carte d&apos;abonnement saison</h3>
      <p>
        ACTE&nbsp;2 propose une carte d&apos;abonnement de 10 spectacles pour
        110&nbsp;€ TTC. Cette carte est nominative, valable pour la saison en
        cours, non remboursable, non échangeable contre des espèces, et ne peut
        être utilisée pour des spectacles privatisés ou hors programmation.
      </p>

      <h3>2.2. Tarifs réduits</h3>
      <p>
        Le tarif réduit s&apos;applique sous présentation d&apos;un justificatif
        en cours de validité&nbsp;: étudiant, demandeur d&apos;emploi,
        bénéficiaire des minima sociaux, personne en situation de handicap (et
        son accompagnateur le cas échéant), groupe de 10 personnes ou plus.
      </p>

      <h3>2.3. Location de salle</h3>
      <p>
        Les tarifs de location sont établis sur devis personnalisé selon la
        durée (créneau horaire, demi-journée, journée, week-end, mensuel) et la
        configuration souhaitée (cabaret, conférence, séminaire). Un acompte
        de 30&nbsp;% du montant total est demandé à la signature du devis pour
        confirmer la réservation.
      </p>

      <h2>Article 3 — Modalités de paiement</h2>
      <p>Les paiements sont acceptés selon les modalités suivantes&nbsp;:</p>
      <ul>
        <li>
          <strong>En ligne</strong>&nbsp;: carte bancaire via la plateforme
          Mapado (paiement sécurisé conforme PCI-DSS, données bancaires non
          stockées par ACTE&nbsp;2) ;
        </li>
        <li>
          <strong>Sur place</strong>&nbsp;: espèces, chèque libellé à
          l&apos;ordre d&apos;ACTE&nbsp;2, carte bancaire via terminal ;
        </li>
        <li>
          <strong>Par virement</strong>&nbsp;: pour les locations de salle et
          les inscriptions d&apos;ateliers, sur RIB transmis avec le devis.
        </li>
      </ul>

      <h2>Article 4 — Confirmation et billets</h2>
      <p>
        À l&apos;issue de la commande, un email de confirmation est adressé au
        Client. Pour la billetterie en ligne, les billets dématérialisés
        (e-tickets) sont envoyés par email et présentés au contrôle d&apos;accès
        sur smartphone ou imprimés. La présentation d&apos;une pièce
        d&apos;identité peut être demandée pour les tarifs réduits.
      </p>

      <h2>Article 5 — Droit de rétractation</h2>
      <p>
        Conformément à l&apos;article L.221-28 12° du Code de la consommation,
        le droit de rétractation prévu par l&apos;article L.221-18 ne peut
        être exercé pour les contrats portant sur les prestations de services
        d&apos;activités de loisirs qui doivent être fournies à une date ou à
        une période déterminée. <strong>Les billets de spectacles, ateliers
        et locations de salle ne sont donc ni repris ni échangés</strong>,
        sauf cas exceptionnels (annulation par ACTE&nbsp;2, voir article 6).
      </p>

      <h2>Article 6 — Annulation par ACTE&nbsp;2</h2>
      <p>
        En cas d&apos;annulation d&apos;un spectacle ou d&apos;un atelier du
        fait d&apos;ACTE&nbsp;2 (force majeure, défaillance d&apos;une
        compagnie, fermeture administrative, etc.), le Client se voit proposer&nbsp;:
      </p>
      <ul>
        <li>
          en priorité, un report sur une autre date de la même œuvre ou un
          spectacle équivalent ;
        </li>
        <li>
          à défaut, le remboursement intégral de la somme versée par le moyen
          de paiement initial sous 14 jours.
        </li>
      </ul>

      <h2>Article 7 — Comportement en salle</h2>
      <p>
        Toute personne portant atteinte au bon déroulement de la représentation
        (perturbations sonores, photographies non autorisées, tabac, alcool en
        excès, comportement inapproprié) pourra se voir refuser l&apos;accès ou
        être expulsée sans qu&apos;aucun remboursement ne soit dû.
        L&apos;enregistrement audio ou vidéo des représentations est strictement
        interdit, sauf accord écrit préalable de la direction.
      </p>

      <h2>Article 8 — Données personnelles</h2>
      <p>
        Les données personnelles collectées dans le cadre des transactions sont
        traitées conformément à notre{" "}
        <a href="/confidentialite">politique de confidentialité</a> et au RGPD.
        Elles sont conservées pour la durée nécessaire à la bonne exécution du
        contrat et au respect des obligations légales et comptables (10 ans
        pour les pièces comptables au titre de l&apos;article L.123-22 du Code
        de commerce).
      </p>

      <h2>Article 9 — Médiation et règlement des litiges</h2>
      <p>
        En cas de litige, le Client est invité à contacter en priorité le
        service client d&apos;ACTE&nbsp;2 à{" "}
        <a href="mailto:acte2theatre@yahoo.fr">acte2theatre@yahoo.fr</a> afin
        de rechercher une solution amiable.
      </p>
      <p>
        Conformément aux articles L.611-1 et suivants du Code de la
        consommation, le Client consommateur peut recourir gratuitement au
        service de médiation de la consommation. ACTE&nbsp;2 n&apos;adhère pas
        actuellement à un médiateur particulier&nbsp;; à défaut, le Client
        peut saisir tout médiateur de son choix dûment référencé sur le site
        de la Commission d&apos;évaluation et de contrôle de la médiation de
        la consommation (
        <a
          href="https://www.economie.gouv.fr/mediation-conso"
          target="_blank"
          rel="noopener noreferrer"
        >
          economie.gouv.fr/mediation-conso
        </a>
        ).
      </p>
      <p>
        Le Client peut également recourir à la plateforme européenne de
        Règlement en Ligne des Litiges (RLL)&nbsp;:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>Article 10 — Droit applicable</h2>
      <p>
        Les présentes CGV sont soumises au droit français. Tout litige relatif
        à leur interprétation ou à leur exécution sera de la compétence
        exclusive des tribunaux du ressort de la Cour d&apos;appel de Lyon,
        nonobstant pluralité de défendeurs ou appel en garantie, sous réserve
        des dispositions impératives applicables aux consommateurs.
      </p>
    </LegalPage>
  );
}
