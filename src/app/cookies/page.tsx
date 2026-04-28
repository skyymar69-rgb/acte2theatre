import { LegalPage, legalMetadata } from "@/components/legal-page";

export const metadata = legalMetadata(
  "Politique de cookies",
  "Politique de gestion des cookies et traceurs sur acte2theatre.fr — types, finalités, durées, consentement RGPD/CNIL."
);

export const revalidate = 86400;

export default function CookiesPage() {
  return (
    <LegalPage titre="Politique de cookies" miseAJour="28 avril 2026">
      <p>
        Cette politique vous informe de l&apos;utilisation des cookies et
        traceurs sur le site <strong>acte2theatre.fr</strong>. Elle est
        conforme aux articles 82 de la loi <em>Informatique et Libertés</em>
        et 5(3) de la directive <em>ePrivacy</em>, ainsi qu&apos;aux
        recommandations de la CNIL (délibération n° 2020-091 du 17 septembre
        2020 et lignes directrices de juin 2023).
      </p>

      <h2>1. Qu&apos;est-ce qu&apos;un cookie&nbsp;?</h2>
      <p>
        Un cookie est un petit fichier texte déposé sur votre terminal
        (ordinateur, smartphone, tablette) lors de la visite d&apos;un site
        web. Il permet de mémoriser des informations relatives à votre
        navigation (préférences, identifiants de session, mesure
        d&apos;audience).
      </p>

      <h2>2. Cookies utilisés sur le site</h2>

      <h3>2.1. Cookies strictement nécessaires (sans consentement)</h3>
      <p>
        Ces cookies sont indispensables au bon fonctionnement du Site et ne
        peuvent être refusés. Ils sont exemptés de consentement en application
        de l&apos;article 82 de la loi <em>Informatique et Libertés</em>.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Finalité</th>
            <th>Durée</th>
            <th>Émetteur</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>acte2-theme</code>
            </td>
            <td>Mémoriser votre préférence de thème (clair/sombre)</td>
            <td>1 an</td>
            <td>acte2theatre.fr</td>
          </tr>
          <tr>
            <td>
              <code>acte2-cookie-consent</code>
            </td>
            <td>Mémoriser vos choix relatifs aux cookies</td>
            <td>13 mois</td>
            <td>acte2theatre.fr</td>
          </tr>
        </tbody>
      </table>

      <h3>2.2. Cookies tiers conditionnés au consentement</h3>
      <p>
        Les cookies tiers ne sont déposés qu&apos;après votre consentement
        explicite via le bandeau de consentement présent à la première visite.
      </p>
      <table>
        <thead>
          <tr>
            <th>Service tiers</th>
            <th>Finalité</th>
            <th>Politique</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Google Maps</td>
            <td>Affichage de la carte interactive sur la page Contact</td>
            <td>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                policies.google.com/privacy
              </a>
            </td>
          </tr>
          <tr>
            <td>Mapado</td>
            <td>
              Billetterie en ligne (uniquement déposés sur acte2theatre.mapado.com,
              pas sur acte2theatre.fr)
            </td>
            <td>
              <a
                href="https://www.mapado.com/politique-confidentialite"
                target="_blank"
                rel="noopener noreferrer"
              >
                mapado.com
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>2.3. Aucun cookie publicitaire</h3>
      <p>
        Le site acte2theatre.fr ne dépose <strong>aucun cookie publicitaire</strong>{" "}
        (Google Ads, Meta Pixel, etc.) ni aucun cookie de profilage à des fins
        de prospection.
      </p>

      <h2>3. Gestion de votre consentement</h2>
      <p>
        Lors de votre première visite, un bandeau de consentement vous propose
        trois options&nbsp;:
      </p>
      <ul>
        <li>
          <strong>«&nbsp;Accepter&nbsp;»</strong>&nbsp;: vous consentez au
          dépôt de tous les cookies (nécessaires et tiers) ;
        </li>
        <li>
          <strong>«&nbsp;Refuser&nbsp;»</strong>&nbsp;: seuls les cookies
          strictement nécessaires sont déposés ;
        </li>
        <li>
          <strong>«&nbsp;Personnaliser&nbsp;»</strong>&nbsp;: vous choisissez
          finement les catégories de cookies à autoriser.
        </li>
      </ul>
      <p>
        Vous pouvez modifier vos choix à tout moment en cliquant sur le lien
        «&nbsp;Gérer les cookies&nbsp;» disponible en bas de chaque page, ou
        directement depuis les paramètres de votre navigateur.
      </p>

      <h2>4. Configuration de votre navigateur</h2>
      <p>
        Vous pouvez paramétrer votre navigateur pour bloquer ou supprimer les
        cookies&nbsp;:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apple Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>
      <p>
        Le blocage de tous les cookies peut entraîner des dysfonctionnements
        sur certaines fonctionnalités du Site.
      </p>

      <h2>5. Mesure d&apos;audience exemptée</h2>
      <p>
        ACTE&nbsp;2 n&apos;utilise pas de service de mesure d&apos;audience
        (Google Analytics, Matomo, Plausible, etc.) à la date de rédaction de
        la présente politique. En cas d&apos;ajout futur, seul un service
        respectant les conditions d&apos;exemption de la CNIL (mesure
        anonymisée, pas de recoupement avec d&apos;autres traitements,
        conservation limitée) sera utilisé.
      </p>

      <h2>6. Réclamation</h2>
      <p>
        Si vous estimez que vos droits relatifs aux cookies n&apos;ont pas été
        respectés, vous pouvez introduire une réclamation auprès de la{" "}
        <a
          href="https://www.cnil.fr/fr/plaintes"
          target="_blank"
          rel="noopener noreferrer"
        >
          CNIL
        </a>
        .
      </p>
    </LegalPage>
  );
}
