import { LegalPage, legalMetadata } from "@/components/legal-page";

export const metadata = legalMetadata(
  "Politique de confidentialité",
  "Politique de protection des données personnelles d'Acte 2 Théâtre. Conforme RGPD : finalités, bases légales, durées, droits."
);

export const revalidate = 86400;

export default function ConfidentialitePage() {
  return (
    <LegalPage
      titre="Politique de confidentialité"
      miseAJour="28 avril 2026"
    >
      <p>
        ACTE&nbsp;2 attache une importance particulière au respect de votre vie
        privée et à la protection de vos données personnelles. La présente
        politique a pour objet de vous informer, de manière claire et complète,
        de la manière dont nous collectons, utilisons et protégeons vos
        données personnelles lorsque vous utilisez le site{" "}
        <strong>acte2theatre.fr</strong>.
      </p>
      <p>
        Cette politique est conforme au Règlement Général sur la Protection des
        Données (UE) 2016/679 (ci-après le «&nbsp;RGPD&nbsp;») et à la loi
        française <em>Informatique et Libertés</em> n° 78-17 du 6 janvier 1978
        modifiée.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est&nbsp;:
      </p>
      <ul>
        <li>
          <strong>ACTE&nbsp;2</strong>, SARL au capital de 8&nbsp;000&nbsp;€
        </li>
        <li>RCS Lyon B 494&nbsp;196&nbsp;819</li>
        <li>Siège&nbsp;: 32 quai Arloing, 69009 Lyon, France</li>
        <li>
          Représentant légal&nbsp;: M. Hervé Deschamps, gérant
        </li>
        <li>
          Contact&nbsp;:{" "}
          <a href="mailto:acte2theatre@yahoo.fr">acte2theatre@yahoo.fr</a> —
          04&nbsp;78&nbsp;83&nbsp;21&nbsp;71
        </li>
      </ul>
      <p>
        ACTE&nbsp;2 ne dispose pas d&apos;un Délégué à la Protection des
        Données (DPO) en raison de sa taille. Toute demande relative aux
        données personnelles peut être adressée directement au gérant à
        l&apos;adresse ci-dessus.
      </p>

      <h2>2. Données collectées</h2>
      <p>Selon votre interaction avec le Site, nous pouvons collecter&nbsp;:</p>

      <h3>2.1. Données de contact (formulaire de contact, réservation par email)</h3>
      <ul>
        <li>Nom, prénom</li>
        <li>Adresse email</li>
        <li>Numéro de téléphone (facultatif)</li>
        <li>Message rédigé librement</li>
      </ul>

      <h3>2.2. Données de navigation (cookies, journaux serveur)</h3>
      <ul>
        <li>Adresse IP (anonymisée si possible)</li>
        <li>Pages consultées, durée de visite, page de provenance</li>
        <li>Type de navigateur, système d&apos;exploitation, langue</li>
        <li>Identifiants de session strictement nécessaires</li>
      </ul>
      <p>
        Aucun cookie de mesure d&apos;audience ni de publicité ciblée
        n&apos;est déposé sans votre consentement. Voir notre{" "}
        <a href="/cookies">politique de cookies</a>.
      </p>

      <h3>2.3. Données de billetterie (via Mapado)</h3>
      <p>
        Les données de billetterie (identité, email, coordonnées de paiement)
        sont collectées et traitées par notre prestataire{" "}
        <strong>Mapado</strong>, qui agit en qualité de sous-traitant. Voir la
        politique de confidentialité de Mapado&nbsp;:{" "}
        <a
          href="https://www.mapado.com/politique-confidentialite"
          target="_blank"
          rel="noopener noreferrer"
        >
          mapado.com/politique-confidentialite
        </a>
        . ACTE&nbsp;2 reçoit la liste des présences et la facturation, mais
        n&apos;a pas accès aux données bancaires.
      </p>

      <h2>3. Finalités et bases légales</h2>
      <table>
        <thead>
          <tr>
            <th>Finalité</th>
            <th>Base légale RGPD</th>
            <th>Données concernées</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Répondre à une demande de contact</td>
            <td>
              Article 6.1.b — exécution de mesures précontractuelles à votre
              demande
            </td>
            <td>Nom, email, téléphone, message</td>
          </tr>
          <tr>
            <td>Gérer la billetterie et les abonnements</td>
            <td>Article 6.1.b — exécution du contrat</td>
            <td>Identité, email, paiement (via Mapado)</td>
          </tr>
          <tr>
            <td>Respecter nos obligations comptables et fiscales</td>
            <td>Article 6.1.c — obligation légale</td>
            <td>Données de facturation</td>
          </tr>
          <tr>
            <td>Mesurer l&apos;audience du Site (anonymisée)</td>
            <td>Article 6.1.f — intérêt légitime + exemption CNIL</td>
            <td>Cookies techniques uniquement</td>
          </tr>
          <tr>
            <td>Sécurité du Site et prévention de la fraude</td>
            <td>Article 6.1.f — intérêt légitime</td>
            <td>Logs serveur, IP, user agent</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Durées de conservation</h2>
      <ul>
        <li>
          <strong>Demandes de contact</strong>&nbsp;: 3 ans à compter du
          dernier échange ;
        </li>
        <li>
          <strong>Données de billetterie</strong>&nbsp;: 3 ans après la
          dernière transaction (à des fins de prospection commerciale) ;
        </li>
        <li>
          <strong>Pièces comptables et factures</strong>&nbsp;: 10 ans
          (article L.123-22 du Code de commerce) ;
        </li>
        <li>
          <strong>Logs serveur</strong>&nbsp;: 12 mois (recommandation CNIL) ;
        </li>
        <li>
          <strong>Cookies techniques</strong>&nbsp;: 13 mois maximum.
        </li>
      </ul>

      <h2>5. Destinataires des données</h2>
      <p>
        Vos données sont destinées exclusivement aux services internes
        d&apos;ACTE&nbsp;2 (équipe administrative, communication, technique) et
        à ses sous-traitants strictement encadrés par contrat&nbsp;:
      </p>
      <ul>
        <li>
          <strong>Mapado</strong> — billetterie en ligne (données de
          réservation, paiement) ;
        </li>
        <li>
          <strong>Vercel Inc.</strong> — hébergement du site (données de
          navigation) ;
        </li>
        <li>
          <strong>Sanity AS</strong> (Norvège, UE/EEE) — base de données du
          contenu rédactionnel (pas de données utilisateurs) ;
        </li>
        <li>
          <strong>Google LLC</strong> — Google Maps embed (cookies de
          navigation Google sur le territoire de la fiche) ;
        </li>
        <li>Autorités administratives ou judiciaires sur réquisition légale.</li>
      </ul>
      <p>
        Vos données ne sont jamais cédées, louées ou vendues à des tiers à
        des fins commerciales.
      </p>

      <h2>6. Transferts hors Union européenne</h2>
      <p>
        Certains sous-traitants peuvent traiter des données depuis des pays
        situés hors UE/EEE&nbsp;:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> (États-Unis)&nbsp;: transfert encadré
          par les <em>Standard Contractual Clauses</em> (clauses
          contractuelles types adoptées par la Commission européenne) ;
        </li>
        <li>
          <strong>Google LLC</strong> (États-Unis)&nbsp;: idem.
        </li>
      </ul>

      <h2>7. Vos droits</h2>
      <p>
        Conformément aux articles 15 à 22 du RGPD, vous disposez sur vos
        données personnelles des droits suivants&nbsp;:
      </p>
      <ul>
        <li>
          <strong>Droit d&apos;accès</strong> (art. 15)&nbsp;: obtenir une
          copie de vos données ;
        </li>
        <li>
          <strong>Droit de rectification</strong> (art. 16)&nbsp;: corriger
          des données inexactes ;
        </li>
        <li>
          <strong>Droit à l&apos;effacement</strong> (art. 17)&nbsp;: demander
          la suppression de vos données ;
        </li>
        <li>
          <strong>Droit à la limitation</strong> (art. 18)&nbsp;: suspendre
          temporairement le traitement ;
        </li>
        <li>
          <strong>Droit à la portabilité</strong> (art. 20)&nbsp;: récupérer
          vos données dans un format structuré ;
        </li>
        <li>
          <strong>Droit d&apos;opposition</strong> (art. 21)&nbsp;: vous
          opposer à un traitement fondé sur l&apos;intérêt légitime ;
        </li>
        <li>
          <strong>Droit de définir des directives post-mortem</strong>{" "}
          (art. 85 loi Informatique et Libertés) ;
        </li>
        <li>
          <strong>Droit de retirer votre consentement</strong> à tout moment
          pour les traitements fondés sur le consentement.
        </li>
      </ul>
      <p>
        Pour exercer ces droits, écrivez-nous à{" "}
        <a href="mailto:acte2theatre@yahoo.fr">acte2theatre@yahoo.fr</a> en
        précisant votre demande, ou par voie postale à l&apos;adresse du siège
        social. Une copie de votre pièce d&apos;identité peut vous être
        demandée en cas de doute raisonnable sur l&apos;identité du demandeur.
      </p>
      <p>
        Nous nous engageons à répondre dans un délai d&apos;un mois à compter
        de la réception de votre demande (ce délai pouvant être prolongé de
        deux mois en cas de complexité particulière).
      </p>

      <h2>8. Réclamation auprès de la CNIL</h2>
      <p>
        Si vous estimez, après nous avoir contactés, que vos droits n&apos;ont
        pas été respectés, vous avez le droit d&apos;introduire une
        réclamation auprès de la <strong>CNIL</strong> (Commission Nationale
        de l&apos;Informatique et des Libertés)&nbsp;:
      </p>
      <ul>
        <li>3 place de Fontenoy — TSA 80715, 75334 Paris Cedex 07</li>
        <li>
          <a
            href="https://www.cnil.fr/fr/plaintes"
            target="_blank"
            rel="noopener noreferrer"
          >
            cnil.fr/fr/plaintes
          </a>
        </li>
      </ul>

      <h2>9. Sécurité</h2>
      <p>
        ACTE&nbsp;2 met en œuvre des mesures techniques et organisationnelles
        appropriées pour garantir la sécurité de vos données&nbsp;: chiffrement
        TLS sur l&apos;ensemble du site (HTTPS), accès restreint aux personnes
        habilitées, mots de passe forts, sauvegardes régulières. En cas de
        violation de données présentant un risque pour vos droits et libertés,
        ACTE&nbsp;2 vous en informera et notifiera la CNIL conformément à
        l&apos;article 34 du RGPD.
      </p>

      <h2>10. Mineurs</h2>
      <p>
        Le Site n&apos;est pas destiné spécifiquement aux mineurs de moins de
        15 ans. Lors d&apos;une réservation pour un spectacle jeune public
        ou un atelier accueillant des mineurs, c&apos;est le représentant
        légal qui consent au traitement et fournit les informations
        nécessaires.
      </p>

      <h2>11. Évolution de la présente politique</h2>
      <p>
        ACTE&nbsp;2 se réserve le droit de modifier la présente politique
        pour s&apos;adapter aux évolutions législatives, jurisprudentielles ou
        techniques. La version en vigueur est celle publiée à l&apos;adresse{" "}
        <em>acte2theatre.fr/confidentialite</em>. La date de dernière mise à
        jour figure en haut de la présente page.
      </p>
    </LegalPage>
  );
}
