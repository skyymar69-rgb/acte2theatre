# Guide d'administration — Acte 2 Théâtre

Ce guide est destiné à la personne qui gérera le contenu du site
acte2theatre.vercel.app au quotidien (programmation, ateliers,
informations pratiques). Aucune compétence technique n'est requise :
tout passe par une interface web claire qui s'appelle le **Studio**.

---

## 1. Accès au Studio (back-office)

Le Studio est l'interface qui permet de modifier le contenu du site.
Il est accessible depuis n'importe quel navigateur (Chrome, Firefox,
Safari, Edge), sur ordinateur, tablette ou smartphone.

### Adresse

> **<https://acte2theatre.vercel.app/studio>**

Aucun lien n'est affiché publiquement sur le site — tapez l'adresse
directement dans la barre du navigateur, ou enregistrez-la dans vos
favoris.

### Connexion

À la première visite, le Studio demande de se connecter avec :

- **Google** (recommandé — un compte Gmail suffit)
- **GitHub**
- **Email + mot de passe** (créé via Sanity)

Utilisez le compte qui a été configuré lors de la création du projet
Sanity. Si vous n'y avez pas accès, contactez l'agence Kayzen Web
(<contact@kayzen-lyon.fr>) pour vous faire ajouter aux membres
autorisés.

### Sécurité

- N'envoyez jamais le mot de passe ou un lien de connexion par email.
- Si vous changez d'ordinateur, déconnectez-vous via le menu en haut à
  droite du Studio.
- Sanity protège automatiquement le Studio (chiffrement, double
  facteur disponible). Activez la double authentification depuis votre
  profil Google si ce n'est pas déjà fait.

---

## 2. Comprendre la structure du contenu

Le Studio organise le site en **6 grands types de documents**, listés
dans la colonne de gauche :

| Type | Rôle |
|---|---|
| **🎭 Spectacles** | Chaque spectacle programmé (jeune public, théâtre, scolaire) |
| **🏷️ Catégories** | Les filtres de la programmation (Jeune public, Théâtre, Scolaire…) |
| **🎓 Ateliers** | Les ateliers et stages (théâtre, Qi Gong…) |
| **📰 Actualités** | Les articles (à venir — pas encore intégrés au site visible) |
| **📄 Pages** | Les pages texte (Contact, Location de salle, Soutenir) |
| **⚙️ Paramètres du site** | Adresse, téléphone, emails, réseaux sociaux, footer |

Cliquez sur un type pour voir la liste, sur un document pour l'éditer.

---

## 3. Ajouter ou modifier un spectacle

C'est l'opération la plus fréquente. Voici la marche à suivre.

### Créer un nouveau spectacle

1. Cliquer sur **🎭 Spectacles** dans la colonne de gauche.
2. Cliquer sur le bouton **+** (en haut à droite de la liste).
3. Le formulaire s'ouvre. Remplir les champs (les obligatoires sont
   marqués d'une étoile rouge).
4. Cliquer sur **Publier** en bas à droite quand tout est prêt.

### Champs principaux à connaître

#### Onglet « Informations principales »

- **Titre** *(obligatoire)* — apparaît partout sur le site et dans les
  résultats Google. Soigner la formulation, utiliser des accents.
- **Slug (URL)** *(obligatoire)* — généré automatiquement à partir du
  titre. Ne pas modifier sauf cas particulier (les anciens liens
  pourraient casser).
- **Compagnie** — nom de la troupe ou de l'artiste.
- **Catégorie** *(obligatoire)* — choisir parmi Jeune public, Théâtre
  ou Scolaire. Crée le filtre côté site.
- **Public cible** — texte libre, p. ex. *« Dès 6 ans »* ou
  *« Tout public · 12 ans+ »*. Affiché sur la fiche.
- **Durée (minutes)** — un nombre, p. ex. `60` pour 1h.
- **Résumé court** — 2 phrases max, affiché sur les cartes de la
  programmation.
- **Description complète** — texte long, formaté avec des titres et
  paragraphes (voir [Conseils rédaction](#5-conseils-rédaction-seo)).
- **Distribution** — liste des comédiens et rôles, ajoutable un par un.
- **À l'affiche (en vedette)** *(case à cocher)* — coche pour mettre
  ce spectacle en avant sur la page d'accueil (max 3 simultanément).

#### Onglet « Dates & tarifs »

- **Représentations** *(au moins 1 obligatoire pour qu'il apparaisse)*
  — chaque date est ajoutée individuellement (date + heure + note
  optionnelle + case « complet »).
- **Tarifs** — adulte / enfant / réduit, en euros, sans symbole.
- **Lien Mapado** — URL complète de la page de billetterie de ce
  spectacle.

#### Onglet « Médias »

- **Image principale** *(obligatoire)* — visuelle de l'affiche.
  - Dimensions recommandées : **1200 × 1600 px** ou plus, format
    portrait ou paysage.
  - Cliquer-glisser une image, ou utiliser **Upload**.
  - **Toujours remplir le champ « Texte alternatif »** : c'est ce que
    Google et les lecteurs d'écran lisent. Décrire ce qu'on voit en
    une phrase.
- **Galerie** — images supplémentaires.
- **Lien vidéo** — URL YouTube/Vimeo (teaser).
- **Dossier de presse / pédagogique** — fichiers PDF.

#### Onglet « SEO »

- **Titre SEO** *(60 caractères max)* — si laissé vide, c'est le titre
  principal qui sert. Utile pour ajouter des mots-clés (« Lyon »,
  « jeune public »…).
- **Meta description** *(160 caractères max)* — résumé qui apparaît
  dans les résultats Google.

### Publier vs Brouillon

- **Publier** = rend le spectacle visible publiquement.
- Tant qu'on n'a pas cliqué Publier, le travail est en **brouillon** —
  invisible sur le site, mais sauvegardé dans Sanity.
- On peut **dépublier** un spectacle en cliquant sur les trois points
  (•••) → « Dépublier ».

### Modifier un spectacle existant

1. Le sélectionner dans la liste.
2. Modifier les champs.
3. Cliquer sur **Publier** en bas à droite. Les changements sont en
   ligne **en moins d'une minute** (le site se met à jour
   automatiquement via un webhook).

### Le voir en ligne

Une fois publié, le spectacle est accessible à l'adresse :

> `https://acte2theatre.vercel.app/spectacles/<slug>`

Par exemple : `https://acte2theatre.vercel.app/spectacles/le-petit-prince`.

---

## 4. Gérer les autres contenus

### Catégories

Trois catégories existent (Jeune public · Théâtre · Scolaire). Pour en
ajouter une nouvelle (p. ex. « Magie ») :

1. **🏷️ Catégories** → bouton **+**
2. Remplir **Nom**, choisir une **couleur d'accent**, fixer un
   **ordre d'affichage** (10, 20, 30…)
3. Publier

### Ateliers

Même logique que les spectacles, mais avec des champs adaptés
(planning, tarif, contact email, lien d'inscription).

### Pages statiques (Contact, Location de salle, Soutenir)

3 pages éditables :

- **contact** → page <https://acte2theatre.vercel.app/contact>
- **location-salle** → page <https://acte2theatre.vercel.app/location-salle>
- **soutenir** → page <https://acte2theatre.vercel.app/soutenir>

⚠️ **Ne pas modifier le slug** de ces pages — il est lié au code du
site, le casser ferait disparaître la page.

Le contenu est édité avec un mini-traitement de texte : sélectionner
le texte pour le mettre en **gras**, ajouter un **lien**, créer un
**titre H2** ou **H3**.

### Paramètres du site (singleton)

⚙️ **Paramètres du site** → un seul document (singleton). Contient :

- L'adresse, le téléphone, l'email, les horaires
- Les réseaux sociaux (Facebook, Instagram, YouTube)
- La carte d'abonnement (nb de spectacles, prix)
- Le texte du footer (en bas du site)

Modifier ici se répercute **partout** où ces infos sont affichées
(footer, contact, JSON-LD pour Google…).

---

## 5. Conseils rédaction SEO

Pour que les pages remontent dans Google, voici les bonnes pratiques :

### Titre du spectacle

- **Toujours commencer par le titre exact**, p. ex. *« Le Petit
  Prince »*, pas *« Spectacle Le Petit Prince »*.
- Si possible, ajouter un **complément distinctif** dans le SEO Titre
  (60 caractères) : *« Le Petit Prince — spectacle dès 6 ans · Lyon »*.

### Résumé court & description

- Phrase d'accroche en première ligne (= ce qui s'affiche dans Google
  et les cartes du site).
- Mentionner naturellement : **Lyon**, le **public cible** (« dès 6
  ans »), la **durée**, le **prix**.
- Structurer la description longue avec des **titres H2** : « Le
  spectacle », « Pour qui ? », « Pratique »… ça aide la lecture **et**
  le SEO.

### Image et alt

- L'image vaut 1000 mots — choisir une vraie photo (pas un placeholder
  générique).
- Le **texte alternatif** doit décrire l'image en mots-clés naturels :
  *« Le Petit Prince debout sur sa planète, illustration aquarelle,
  spectacle jeune public »* (max 125 caractères).

### Tarifs et dates

- **Toujours remplir les tarifs** : Google les affiche dans les
  résultats enrichis (« à partir de 12 € »).
- **Ajouter au moins 1 représentation à venir** : sinon le spectacle
  n'apparaît pas dans les listings (filtre automatique sur les dates
  futures).

---

## 6. Vérifier le site après modification

1. Modifier un spectacle, cliquer sur **Publier**.
2. Attendre 30 secondes.
3. Ouvrir un autre onglet et aller sur la page concernée
   (`/spectacles/<slug>`).
4. Faire **Ctrl+F5** (Windows) ou **Cmd+Shift+R** (Mac) pour forcer le
   rafraîchissement.
5. Si le contenu n'est pas à jour après 2 minutes : vérifier qu'on a
   bien cliqué « Publier » (et non « Sauvegarder en brouillon »).

---

## 7. Que faire si…

### ❌ Le spectacle ne s'affiche pas dans la programmation

- Vérifier qu'il a au moins **1 représentation à venir** (date dans le
  futur).
- Vérifier qu'il a une **catégorie** assignée.
- Vérifier qu'il est bien **publié** (pas en brouillon).
- Vérifier qu'il a une **image principale** avec **alt** rempli.

### ❌ J'ai supprimé un spectacle par erreur

Sanity garde l'historique pendant 90 jours. Aller dans le Studio →
le document → trois points (•••) → « Voir l'historique » →
restaurer la version souhaitée.

### ❌ La photo ne se met pas à jour

C'est presque toujours du cache navigateur :

- Faire **Ctrl+F5** ou **Cmd+Shift+R** plusieurs fois.
- Si ça persiste, ré-uploader l'image avec un nom différent (ça force
  un nouveau lien).

### ❌ Le site ne se met pas à jour après publication

Très rare. Causes possibles :

- Le webhook Sanity → Vercel a échoué. Aller sur sanity.io/manage →
  API → Webhooks → vérifier le statut.
- Recommencer la publication (modifier un caractère, re-publier).
- En dernier recours, contacter Kayzen Web.

### ❌ J'ai oublié mon mot de passe

Sanity propose un lien « Mot de passe oublié » sur la page de
connexion (si compte email/password). Pour Google/GitHub, passer par
les options de récupération de ces services.

---

## 8. Calendrier idéal de mise à jour

| Fréquence | Action |
|---|---|
| **Avant le début de chaque saison** | Publier les nouveaux spectacles, mettre à jour la page Soutenir |
| **Avant chaque représentation** | Vérifier que la date est bien dans Sanity, photos et résumé OK |
| **Après une représentation** | Cocher « complet » si la salle a fait salle pleine (pour la prochaine) |
| **Mensuelle** | Vérifier les ateliers (saison à jour, tarif à jour) |
| **Trimestrielle** | Mettre à jour les paramètres si l'équipe ou les coordonnées changent |

---

## 9. Liens utiles

- **Studio** : <https://acte2theatre.vercel.app/studio>
- **Sanity (gestion du compte / facturation)** :
  <https://sanity.io/manage>
- **Vercel (hébergement / déploiements)** :
  <https://vercel.com>
- **Mapado (billetterie)** :
  <https://acte2theatre.mapado.com>
- **Mes paramètres Sanity** : Studio → menu en haut à droite

---

## 10. Contact technique

En cas de problème que ce guide ne résout pas :

**Kayzen Web** — agence digitale qui a réalisé le site
- Email : <contact@kayzen-lyon.fr>
- Téléphone : +33 4 87 77 68 61
- Site : <https://internet.kayzen-lyon.fr>

Toujours préciser dans votre message :
- L'URL exacte de la page concernée
- Une capture d'écran
- Les étapes pour reproduire le problème
- L'email du compte Sanity utilisé

---

*Dernière mise à jour : 28 avril 2026.*
