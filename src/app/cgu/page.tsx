import { LegalPage, legalMetadata } from "@/components/legal-page";

export const metadata = legalMetadata(
  "Conditions Générales d'Utilisation",
  "CGU du site acte2theatre.fr — utilisation, comptes, comportement attendu, signalement, droit applicable."
);

export const revalidate = 86400;

export default function CGUPage() {
  return (
    <LegalPage
      titre="Conditions Générales d'Utilisation"
      miseAJour="28 avril 2026"
    >
      <h2>Article 1 — Objet</h2>
      <p>
        Les présentes Conditions Générales d&apos;Utilisation (ci-après «&nbsp;CGU&nbsp;»)
        régissent l&apos;utilisation du site internet{" "}
        <strong>acte2theatre.fr</strong> (ci-après le «&nbsp;Site&nbsp;»),
        édité par la société <strong>ACTE&nbsp;2</strong> (SARL,
        494&nbsp;196&nbsp;819 RCS Lyon) dont les coordonnées figurent dans les{" "}
        <a href="/mentions-legales">mentions légales</a>.
      </p>
      <p>
        Toute consultation du Site implique l&apos;acceptation pleine et entière
        des présentes CGU par l&apos;utilisateur (ci-après l&apos;«&nbsp;Utilisateur&nbsp;»).
      </p>

      <h2>Article 2 — Accès au Site</h2>
      <p>
        Le Site est accessible gratuitement à tout Utilisateur disposant
        d&apos;un accès à Internet. Tous les frais afférents à l&apos;accès au
        Site (matériel, logiciels, connexion Internet, etc.) sont à la charge
        exclusive de l&apos;Utilisateur.
      </p>
      <p>
        ACTE&nbsp;2 met en œuvre les moyens raisonnables pour assurer un accès
        de qualité au Site, sans toutefois garantir une disponibilité
        permanente. ACTE&nbsp;2 se réserve le droit, sans préavis ni indemnité,
        de fermer temporairement ou définitivement le Site ou l&apos;accès à un
        ou plusieurs services pour effectuer notamment une mise à jour, des
        opérations de maintenance, des modifications ou changements sur les
        méthodes opérationnelles, les serveurs et les heures d&apos;accessibilité.
      </p>

      <h2>Article 3 — Services proposés</h2>
      <p>
        Le Site permet à l&apos;Utilisateur de consulter les contenus suivants :
      </p>
      <ul>
        <li>la programmation des spectacles et leurs informations détaillées ;</li>
        <li>la liste des ateliers permanents et stages proposés ;</li>
        <li>les informations pratiques relatives au théâtre (horaires, accès, contact) ;</li>
        <li>les conditions de location de la salle pour des événements privés ou professionnels.</li>
      </ul>
      <p>
        La réservation de billets est assurée via la plateforme tierce{" "}
        <strong>Mapado</strong> (
        <a
          href="https://acte2theatre.mapado.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          acte2theatre.mapado.com
        </a>
        ). Les conditions générales de vente applicables aux billets sont
        celles définies à la page <a href="/cgv">CGV</a> ainsi que celles de
        Mapado.
      </p>

      <h2>Article 4 — Engagements de l&apos;Utilisateur</h2>
      <p>L&apos;Utilisateur s&apos;engage à :</p>
      <ul>
        <li>
          utiliser le Site dans le respect des lois et règlements en vigueur,
          des bonnes mœurs et de l&apos;ordre public ;
        </li>
        <li>
          ne pas perturber le fonctionnement du Site, par exemple en tentant
          d&apos;y introduire un virus ou tout code malveillant ;
        </li>
        <li>
          ne pas tenter d&apos;accéder à des zones non publiques (espace
          d&apos;administration, base de données) ;
        </li>
        <li>
          ne pas extraire ou réutiliser, à des fins commerciales ou non, tout
          ou partie du contenu du Site sans autorisation écrite préalable
          d&apos;ACTE&nbsp;2 ;
        </li>
        <li>
          ne pas usurper l&apos;identité d&apos;un tiers ni publier de
          contenus diffamatoires, racistes, sexistes, homophobes, injurieux ou
          contraires à l&apos;ordre public.
        </li>
      </ul>

      <h2>Article 5 — Propriété intellectuelle</h2>
      <p>
        Tous les contenus présents sur le Site (textes, images, photographies,
        vidéos, logos, charte graphique, code source, base de données) sont
        protégés par le droit d&apos;auteur, le droit des marques et plus
        généralement par les droits de propriété intellectuelle. Voir{" "}
        <a href="/mentions-legales">mentions légales — article 4</a>.
      </p>

      <h2>Article 6 — Données personnelles</h2>
      <p>
        Les données personnelles collectées via le Site (formulaire de contact,
        cookies, etc.) sont traitées conformément à notre{" "}
        <a href="/confidentialite">politique de confidentialité</a>.
        L&apos;Utilisateur dispose à tout moment des droits d&apos;accès, de
        rectification, d&apos;effacement, de portabilité, de limitation et
        d&apos;opposition prévus par le RGPD.
      </p>

      <h2>Article 7 — Cookies</h2>
      <p>
        L&apos;utilisation des cookies sur le Site est régie par notre{" "}
        <a href="/cookies">politique de cookies</a>. Lors de la première
        visite, un bandeau de consentement permet à l&apos;Utilisateur
        d&apos;accepter ou de refuser les cookies non strictement nécessaires.
      </p>

      <h2>Article 8 — Liens vers des sites tiers</h2>
      <p>
        Le Site peut contenir des liens vers des sites tiers (Mapado,
        Medoucine, Google Maps, Facebook, etc.). ACTE&nbsp;2 ne contrôle pas le
        contenu de ces sites et décline toute responsabilité quant à leurs
        pratiques en matière de protection des données ou à la qualité de
        leurs services.
      </p>

      <h2>Article 9 — Signalement de contenu illicite</h2>
      <p>
        Conformément à l&apos;article 6.I.5 de la loi LCEN, tout Utilisateur
        ayant connaissance d&apos;un contenu illicite sur le Site peut le
        signaler à&nbsp;:{" "}
        <a href="mailto:acte2theatre@yahoo.fr">acte2theatre@yahoo.fr</a> en
        précisant la date du signalement, ses coordonnées, l&apos;URL du
        contenu visé et les motifs du signalement.
      </p>

      <h2>Article 10 — Modification des CGU</h2>
      <p>
        ACTE&nbsp;2 se réserve la faculté de modifier les présentes CGU à tout
        moment. Les modifications entrent en vigueur dès leur mise en ligne. Il
        est recommandé à l&apos;Utilisateur de consulter régulièrement la
        présente page.
      </p>

      <h2>Article 11 — Droit applicable et juridiction compétente</h2>
      <p>
        Les présentes CGU sont régies par le droit français. En cas de litige,
        une solution amiable sera recherchée préalablement à toute action
        judiciaire. À défaut, les tribunaux français seront seuls compétents
        pour en connaître, conformément aux règles de compétence territoriale
        et matérielle du Code de procédure civile.
      </p>
      <p>
        Les Utilisateurs consommateurs peuvent recourir gratuitement au
        médiateur de la consommation conformément à l&apos;article L.612-1 du
        Code de la consommation, et à la plateforme européenne de règlement en
        ligne des litiges accessible à l&apos;adresse{" "}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>
    </LegalPage>
  );
}
