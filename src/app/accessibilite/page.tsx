import { LegalPage, legalMetadata } from "@/components/legal-page";

export const metadata = legalMetadata(
  "Déclaration d'accessibilité",
  "Engagement de L'Acte 2 en matière d'accessibilité numérique. Conforme au RGAA, WCAG 2.2 niveau AA, European Accessibility Act."
);

export const revalidate = 86400;

export default function AccessibilitePage() {
  return (
    <LegalPage
      titre="Déclaration d'accessibilité"
      miseAJour="28 avril 2026"
    >
      <p>
        ACTE&nbsp;2 s&apos;engage à rendre son site internet accessible aux
        personnes en situation de handicap, conformément&nbsp;:
      </p>
      <ul>
        <li>
          à l&apos;article 47 de la loi n° 2005-102 du 11 février 2005 pour
          l&apos;égalité des droits et des chances, la participation et la
          citoyenneté des personnes handicapées ;
        </li>
        <li>
          à la directive européenne (UE) 2016/2102 sur l&apos;accessibilité
          des sites internet ;
        </li>
        <li>
          au <em>European Accessibility Act</em> — directive (UE) 2019/882
          applicable depuis le 28 juin 2025 ;
        </li>
        <li>
          au Référentiel Général d&apos;Amélioration de l&apos;Accessibilité (
          <strong>RGAA 4.1.2</strong>) ;
        </li>
        <li>
          aux Web Content Accessibility Guidelines (<strong>WCAG 2.2</strong>)
          niveau AA.
        </li>
      </ul>

      <h2>1. État de conformité</h2>
      <p>
        Le site <strong>acte2theatre.fr</strong> est en cours
        d&apos;évaluation. La présente déclaration sera mise à jour à la suite
        d&apos;un audit RGAA complet portant sur les 106&nbsp;critères du
        référentiel.
      </p>
      <p>
        À la date de publication, ACTE&nbsp;2 estime que le site est{" "}
        <strong>partiellement conforme</strong> au RGAA 4.1.2.
      </p>

      <h2>2. Engagements et bonnes pratiques en place</h2>
      <p>
        Les bonnes pratiques suivantes ont été mises en œuvre dès la conception
        du site (<em>accessibility by design</em>)&nbsp;:
      </p>
      <ul>
        <li>
          <strong>Structure sémantique HTML 5</strong>&nbsp;: utilisation
          rigoureuse de <code>&lt;header&gt;</code>,{" "}
          <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>,{" "}
          <code>&lt;article&gt;</code>, <code>&lt;footer&gt;</code> ;
        </li>
        <li>
          <strong>Hiérarchie de titres</strong> rigoureuse (un seul{" "}
          <code>h1</code> par page, pas de saut de niveau) ;
        </li>
        <li>
          <strong>Skip link</strong> «&nbsp;Aller au contenu principal&nbsp;»
          en haut de chaque page ;
        </li>
        <li>
          <strong>Focus visible</strong> respectant un contraste suffisant
          (ring de 2px en or rideau) ;
        </li>
        <li>
          <strong>Contraste des textes</strong>&nbsp;: ratio minimum 4,5:1
          pour le texte courant et 3:1 pour le texte large, vérifié sur les
          deux thèmes ;
        </li>
        <li>
          <strong>Alternatives textuelles</strong> sur toutes les images
          informatives, marquage <code>aria-hidden</code> sur les icônes
          décoratives ;
        </li>
        <li>
          <strong>Attributs ARIA</strong>&nbsp;:{" "}
          <code>aria-label</code>, <code>aria-current</code>,{" "}
          <code>aria-expanded</code>, <code>aria-modal</code>,{" "}
          <code>aria-controls</code> appliqués aux composants interactifs ;
        </li>
        <li>
          <strong>Navigation au clavier</strong> intégrale (menu, modales,
          formulaires) ;
        </li>
        <li>
          <strong>Préférences utilisateur respectées</strong>&nbsp;:{" "}
          <code>prefers-reduced-motion</code> coupe les animations,{" "}
          <code>prefers-color-scheme</code> détecte le mode sombre du système ;
        </li>
        <li>
          <strong>Langue déclarée</strong>&nbsp;: attribut{" "}
          <code>lang=&quot;fr&quot;</code> sur la racine HTML ;
        </li>
        <li>
          <strong>Responsive design</strong> du mobile au grand écran ;
        </li>
        <li>
          <strong>Formulaires</strong>&nbsp;: étiquettes explicites, messages
          d&apos;erreur clairs, champs requis signalés textuellement.
        </li>
      </ul>

      <h2>3. Points d&apos;attention identifiés</h2>
      <p>Travaux en cours pour atteindre la pleine conformité&nbsp;:</p>
      <ul>
        <li>
          ajout de transcriptions textuelles pour les éventuelles vidéos
          embarquées (YouTube, Vimeo) ;
        </li>
        <li>
          audit complet par un expert externe sur les 106&nbsp;critères RGAA
          avant la fin du semestre ;
        </li>
        <li>
          test utilisateurs avec personnes en situation de handicap visuel et
          moteur ;
        </li>
        <li>
          vérification automatisée régulière (axe-core, Lighthouse a11y,
          Wave).
        </li>
      </ul>

      <h2>4. Technologies utilisées</h2>
      <p>
        L&apos;accessibilité du site repose sur les technologies suivantes&nbsp;:
        HTML5, CSS3, JavaScript (Next.js / React 19), WAI-ARIA 1.2.
      </p>

      <h2>5. Compatibilité avec les navigateurs et lecteurs d&apos;écran</h2>
      <p>Le site a été testé avec&nbsp;:</p>
      <ul>
        <li>Mozilla Firefox 130+ (NVDA sur Windows)</li>
        <li>Google Chrome 130+ (TalkBack sur Android)</li>
        <li>Apple Safari 18+ (VoiceOver sur macOS et iOS)</li>
        <li>Microsoft Edge 130+</li>
      </ul>

      <h2>6. Retour d&apos;information et contact</h2>
      <p>
        Si vous n&apos;arrivez pas à accéder à un contenu ou à un service du
        site, vous pouvez nous contacter pour être orienté vers une alternative
        accessible ou obtenir le contenu sous une autre forme&nbsp;:
      </p>
      <ul>
        <li>
          Par email&nbsp;:{" "}
          <a href="mailto:acte2theatre@yahoo.fr">acte2theatre@yahoo.fr</a>
        </li>
        <li>
          Par téléphone&nbsp;:{" "}
          <a href="tel:+33478832171">04 78 83 21 71</a>
        </li>
        <li>
          Par courrier&nbsp;: ACTE 2, 32 quai Arloing, 69009 Lyon
        </li>
      </ul>

      <h2>7. Voies de recours</h2>
      <p>
        Cette procédure est à utiliser dans le cas suivant&nbsp;: vous avez
        signalé au responsable du site une demande d&apos;accessibilité ou un
        défaut d&apos;accessibilité l&apos;empêchant d&apos;accéder à un
        contenu ou à un service et vous n&apos;avez pas obtenu de réponse
        satisfaisante.
      </p>
      <ul>
        <li>
          <a
            href="https://formulaire.defenseurdesdroits.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Écrire un message au Défenseur des droits
          </a>
        </li>
        <li>
          <a
            href="https://www.defenseurdesdroits.fr/saisir/delegues"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacter le délégué du Défenseur des droits dans votre région
          </a>
        </li>
        <li>
          Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre)&nbsp;:
          Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07
        </li>
      </ul>

      <h2>8. Date de la déclaration</h2>
      <p>
        La présente déclaration a été établie le 28 avril 2026. Elle sera
        mise à jour à l&apos;issue de l&apos;audit complet RGAA 4.1.2.
      </p>
    </LegalPage>
  );
}
