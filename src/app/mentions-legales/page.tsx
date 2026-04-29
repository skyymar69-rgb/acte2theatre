import { LegalPage, legalMetadata } from "@/components/legal-page";

export const metadata = legalMetadata(
  "Mentions légales",
  "Mentions légales du site acte2theatre.fr — éditeur, hébergeur, propriété intellectuelle, responsabilité, droit applicable."
);

export const revalidate = 86400; // 24h

export default function MentionsLegalesPage() {
  return (
    <LegalPage titre="Mentions légales" miseAJour="28 avril 2026">
      <p>
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour
        la confiance dans l&apos;économie numérique, dite loi LCEN, il est porté
        à la connaissance des utilisateurs du site
        <strong> acte2theatre.fr</strong> les présentes mentions légales.
      </p>

      <h2>1. Éditeur du site</h2>
      <p>
        Le site <strong>acte2theatre.fr</strong> est édité par&nbsp;:
      </p>
      <ul>
        <li>
          <strong>Dénomination sociale&nbsp;:</strong> ACTE 2
        </li>
        <li>
          <strong>Forme juridique&nbsp;:</strong> SARL (Société à Responsabilité
          Limitée)
        </li>
        <li>
          <strong>Capital social&nbsp;:</strong> 8&nbsp;000&nbsp;€
        </li>
        <li>
          <strong>Siège social&nbsp;:</strong> 32 quai Arloing, 69009 Lyon,
          France
        </li>
        <li>
          <strong>RCS&nbsp;:</strong> Lyon B 494&nbsp;196&nbsp;819 (immatriculée
          le 09/02/2007)
        </li>
        <li>
          <strong>SIREN&nbsp;:</strong> 494&nbsp;196&nbsp;819
        </li>
        <li>
          <strong>SIRET (siège)&nbsp;:</strong> 494&nbsp;196&nbsp;819 00010
        </li>
        <li>
          <strong>Numéro de TVA intracommunautaire&nbsp;:</strong>{" "}
          FR80&nbsp;494&nbsp;196&nbsp;819
        </li>
        <li>
          <strong>Code NAF / APE&nbsp;:</strong> 90.04Z (Gestion de salles de
          spectacles)
        </li>
        <li>
          <strong>Convention collective&nbsp;:</strong> Entreprises artistiques
          et culturelles (IDCC 1285)
        </li>
        <li>
          <strong>Téléphone&nbsp;:</strong>{" "}
          <a href="tel:+33478832171">04 78 83 21 71</a>
        </li>
        <li>
          <strong>Email&nbsp;:</strong>{" "}
          <a href="mailto:acte2theatre@yahoo.fr">acte2theatre@yahoo.fr</a>
        </li>
        <li>
          <strong>Directeur de la publication&nbsp;:</strong> Monsieur Hervé
          Deschamps, gérant
        </li>
      </ul>

      <h2>2. Conception et réalisation du site</h2>
      <p>
        Le site a été conçu et réalisé par&nbsp;:
      </p>
      <ul>
        <li>
          <strong>Dénomination sociale&nbsp;:</strong> KAYZEN LYON
        </li>
        <li>
          <strong>Forme juridique&nbsp;:</strong> SASU (Société par Actions
          Simplifiée Unipersonnelle)
        </li>
        <li>
          <strong>Siège social&nbsp;:</strong> 6 rue Pierre Termier, 69009 Lyon,
          France
        </li>
        <li>
          <strong>RCS&nbsp;:</strong> Lyon — 999&nbsp;418&nbsp;346
        </li>
        <li>
          <strong>SIRET&nbsp;:</strong> 999&nbsp;418&nbsp;346&nbsp;000&nbsp;14
        </li>
        <li>
          <strong>Numéro de TVA intracommunautaire&nbsp;:</strong>{" "}
          FR85&nbsp;999&nbsp;418&nbsp;346
        </li>
        <li>
          <strong>Code APE&nbsp;:</strong> 4791B
        </li>
        <li>
          <strong>Téléphone&nbsp;:</strong>{" "}
          <a href="tel:+33487776861">+33 (0)4 87 77 68 61</a>
        </li>
        <li>
          <strong>Email&nbsp;:</strong>{" "}
          <a href="mailto:contact@kayzen-lyon.fr">contact@kayzen-lyon.fr</a>
        </li>
        <li>
          <strong>Site agence&nbsp;:</strong>{" "}
          <a
            href="https://internet.kayzen-lyon.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            internet.kayzen-lyon.fr
          </a>
        </li>
      </ul>

      <h2>3. Hébergement du site</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>, société de droit
        américain dont le siège social est situé&nbsp;: 340 S Lemon Ave #4133,
        Walnut, CA 91789, États-Unis. Site web&nbsp;:{" "}
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          vercel.com
        </a>
        . Les données de contenu sont stockées sur l&apos;infrastructure
        managée <strong>Sanity.io</strong> (Sanity AS, Oslo, Norvège — UE/EEE).
      </p>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble du contenu présent sur le site acte2theatre.fr (textes,
        photographies, vidéos, illustrations, logos, marques, base de données,
        architecture, charte graphique, code source) est la propriété exclusive
        d&apos;ACTE&nbsp;2 ou de ses partenaires (compagnies, photographes,
        ayants droit) et est protégé par les lois françaises et internationales
        relatives à la propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication,
        adaptation, totale ou partielle, des éléments du site, quel que soit le
        moyen ou le procédé utilisé, est strictement interdite sans
        l&apos;autorisation écrite préalable d&apos;ACTE&nbsp;2, sauf exception
        légale (notamment l&apos;article L.122-5 du Code de la propriété
        intellectuelle pour la copie privée).
      </p>
      <p>
        La marque <em>Acte 2 Théâtre — Happy Culture</em>, ainsi que les
        logos figurant sur le site, sont la propriété d&apos;ACTE&nbsp;2.
      </p>

      <h2>5. Liens hypertextes</h2>
      <p>
        Le site peut contenir des liens hypertextes vers d&apos;autres sites
        Internet (notamment <em>mapado.com</em> pour la billetterie,
        <em> medoucine.com</em> pour les ateliers énergétiques,
        <em> google.com</em> pour la cartographie). ACTE&nbsp;2 ne saurait être
        tenue responsable du contenu de ces sites tiers, sur lesquels elle
        n&apos;exerce aucun contrôle éditorial.
      </p>
      <p>
        La création de liens hypertextes vers le site acte2theatre.fr est
        autorisée à condition de ne pas porter atteinte à l&apos;image
        d&apos;ACTE&nbsp;2 et de ne pas créer de confusion sur la source du
        contenu.
      </p>

      <h2>6. Limitation de responsabilité</h2>
      <p>
        ACTE&nbsp;2 met tout en œuvre pour assurer l&apos;exactitude et la mise
        à jour des informations diffusées sur le site, dont elle se réserve le
        droit de corriger, à tout moment et sans préavis, le contenu. Toutefois,
        ACTE&nbsp;2 ne peut garantir l&apos;exactitude, la précision ou
        l&apos;exhaustivité des informations mises à disposition sur le site.
      </p>
      <p>
        En conséquence, ACTE&nbsp;2 décline toute responsabilité&nbsp;: pour
        toute imprécision, inexactitude ou omission portant sur des informations
        disponibles sur le site&nbsp;; pour tous dommages, directs ou indirects,
        quelles qu&apos;en soient les causes, origines, natures ou conséquences,
        provoqués à raison de l&apos;accès de quiconque au site ou de
        l&apos;impossibilité d&apos;y accéder&nbsp;; comme de
        l&apos;utilisation du site et/ou du crédit accordé à une quelconque
        information provenant directement ou indirectement de ce dernier.
      </p>

      <h2>7. Données personnelles</h2>
      <p>
        Le traitement des données personnelles collectées sur le site est régi
        par notre{" "}
        <a href="/confidentialite">politique de confidentialité</a> conforme au
        Règlement Général sur la Protection des Données (RGPD — Règlement (UE)
        2016/679) et à la loi française <em>Informatique et Libertés</em> n°
        78-17 du 6 janvier 1978 modifiée.
      </p>

      <h2>8. Accessibilité numérique</h2>
      <p>
        ACTE&nbsp;2 s&apos;engage à rendre son site accessible conformément à
        l&apos;article 47 de la loi n° 2005-102 du 11 février 2005, au{" "}
        <em>European Accessibility Act</em> (directive (UE) 2019/882) et au
        Référentiel Général d&apos;Amélioration de l&apos;Accessibilité (RGAA).
        Voir notre{" "}
        <a href="/accessibilite">déclaration d&apos;accessibilité</a>.
      </p>

      <h2>9. Droit applicable et juridiction</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. Tout
        litige relatif à l&apos;interprétation ou à l&apos;exécution des
        présentes sera soumis aux tribunaux compétents de Lyon, sous réserve
        des dispositions impératives applicables aux consommateurs.
      </p>

      <h2>10. Contact</h2>
      <p>
        Pour toute question relative au site, contactez&nbsp;:
      </p>
      <ul>
        <li>
          Par courrier&nbsp;: ACTE&nbsp;2, 32 quai Arloing, 69009 Lyon
        </li>
        <li>
          Par email&nbsp;:{" "}
          <a href="mailto:acte2theatre@yahoo.fr">acte2theatre@yahoo.fr</a>
        </li>
        <li>
          Par téléphone&nbsp;:{" "}
          <a href="tel:+33478832171">04 78 83 21 71</a>
        </li>
      </ul>
    </LegalPage>
  );
}
