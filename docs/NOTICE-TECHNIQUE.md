# Notice technique — Site Acte 2 Théâtre

Document à destination de l'équipe technique (intégrateurs, mainteneurs,
auditeurs RGPD/RGAA, agences relais). Tient lieu de cahier des charges
post-livraison et de bilan d'audit SEO/performance/accessibilité au
28 avril 2026.

> **Production :** <https://acte2theatre.vercel.app>
> **Repository :** <https://github.com/skyymar69-rgb/acte2theatre>
> **Branche :** `main` (auto-deploy Vercel)
> **Réalisation :** Kayzen Web (KAYZEN LYON · SASU · 999 418 346)

---

## 1. Stack technique

### Couche front

| Outil | Version | Rôle |
|---|---|---|
| **Next.js** | 15.5.x | Framework React full-stack (App Router, RSC, ISR, Server Actions) |
| **React** | 19.x | Bibliothèque UI |
| **TypeScript** | 5.7.x | Typage statique strict |
| **Tailwind CSS** | 3.4.x | Système de design utilitaire |
| **next-themes** | 0.4.x | Gestion clair/sombre persistante |
| **lucide-react** | 0.468.x | Icônes (SVG, tree-shake) |
| **next/font** | bundled | Hébergement local des polices Google (Inter, Playfair Display) |
| **date-fns + date-fns-tz** | 4.1 / 3.x | Formatage et timezone Europe/Paris |
| **clsx + tailwind-merge** | latest | Composition de classNames |
| **qrcode.react** | 4.x | Génération QR codes (carte de contact numérique) |

### Couche contenu (CMS)

| Outil | Version | Rôle |
|---|---|---|
| **Sanity Studio** | 3.65.x | Back-office headless |
| **next-sanity** | 9.x | Client + helpers Next 15 + ISR tags |
| **@sanity/image-url** | 1.x | URL builder pour le CDN images Sanity |
| **@portabletext/react** | 3.x | Rendu du Portable Text |

### Couche serveur / hébergement

| Outil | Rôle |
|---|---|
| **Vercel** (Hobby) | Hébergement Edge + CDN + Serverless Functions |
| **Sanity Cloud** (Free) | Stockage du contenu + CDN images + auth |
| **GitHub** | Source de vérité, intégration continue |
| **Mapado** | Billetterie en ligne (externe) |
| **Resend / Formspree** | Email du formulaire de contact (à brancher si besoin) |

### Outils de build / scripts

| Outil | Rôle |
|---|---|
| **sharp** | Conversion WebP, génération favicons, OG image |
| **@sanity/client** | Mutations API pour les scripts de seed |

---

## 2. Architecture du repo

```
D:\Acte2\
├── docs/
│   ├── GUIDE-ADMINISTRATEUR.md     ← guide pour Hervé
│   └── NOTICE-TECHNIQUE.md         ← ce document
├── public/
│   ├── images/                     ← photos WebP optimisées
│   │   ├── hero.webp
│   │   ├── la-salle.webp
│   │   ├── espace-bar.webp
│   │   ├── sieges-rouges.webp
│   │   ├── scene-banderole.webp
│   │   ├── titre-bandeau.webp
│   │   └── ...
│   ├── logos/
│   │   ├── logo-acte2.jpg          ← source
│   │   └── logo-acte2.webp         ← optimisé
│   ├── favicon-*.png               ← 16/32/48/96 px
│   ├── apple-touch-icon.png        ← 180 px
│   ├── android-chrome-*.png        ← 192/512 px
│   ├── mstile-*.png                ← 150/310 px (Microsoft tiles)
│   ├── safari-pinned-tab.svg       ← Safari pinned (couleur or)
│   ├── og-default.jpg              ← OG image fallback 1200×630
│   ├── site.webmanifest            ← PWA manifest (3 shortcuts)
│   ├── browserconfig.xml           ← Microsoft tile config
│   ├── humans.txt                  ← équipe + crédits
│   ├── llms.txt                    ← discovery index agents IA
│   ├── llms-full.txt               ← documentation IA exhaustive
│   ├── security.txt                ← alias RFC 9116
│   └── .well-known/
│       └── security.txt            ← contact sécurité (RFC 9116)
├── scripts/
│   ├── seed-full.mjs               ← seed complet (catégories, spectacles, ateliers, pages, paramètres)
│   ├── seed-demo.mjs               ← seed minimal (1 spectacle de démo)
│   ├── enrich-spectacles-descriptions.mjs ← patch des descriptions SEO longues
│   ├── migrate-from-old-site.mjs   ← migration historique acte2theatre.fr
│   └── generate-assets.mjs         ← WebP + favicons + OG image
├── src/
│   ├── app/                        ← Next.js App Router
│   │   ├── layout.tsx              ← shell global (header, footer, theme, scroll progress…)
│   │   ├── page.tsx                ← accueil (hero, manifeste, à l'affiche, galerie, comment venir, ateliers)
│   │   ├── globals.css             ← Tailwind + tokens CSS + grain + reveal + a11y prefs
│   │   ├── sitemap.ts              ← sitemap.xml dynamique
│   │   ├── robots.ts               ← robots.txt
│   │   ├── not-found.tsx           ← page 404 (logo + plan du site illustré)
│   │   ├── api/
│   │   │   ├── revalidate/         ← webhook Sanity (validation HMAC)
│   │   │   └── contact/            ← formulaire RGPD honeypot
│   │   ├── spectacles/
│   │   │   ├── page.tsx            ← listing avec filtres
│   │   │   └── [slug]/page.tsx     ← détail (hero, FAQ, sidebar Mapado/BilletReduc/Ticketac)
│   │   ├── ateliers/page.tsx
│   │   ├── contact/page.tsx        ← pageStatique + Maps RGPD + form
│   │   ├── location-salle/page.tsx
│   │   ├── soutenir/page.tsx
│   │   ├── entreprise/page.tsx     ← page commerciale BtoB
│   │   ├── plan-du-site/page.tsx   ← sitemap HTML
│   │   ├── mentions-legales/page.tsx
│   │   ├── cgu/page.tsx
│   │   ├── cgv/page.tsx
│   │   ├── confidentialite/page.tsx
│   │   ├── cookies/page.tsx
│   │   ├── accessibilite/page.tsx
│   │   └── studio/[[...tool]]/     ← Sanity Studio embarqué
│   │       ├── page.tsx            ← serveur (export metadata)
│   │       └── Studio.tsx          ← client (NextStudio)
│   ├── components/
│   │   ├── site-header.tsx         ← header sticky (wordmark + logo + nav + carte + theme)
│   │   ├── site-footer.tsx         ← footer (sitemap illustré + billetteries + Kayzen)
│   │   ├── theme-provider.tsx      ← next-themes + suppressHydrationWarning
│   │   ├── theme-toggle.tsx        ← bouton soleil/lune
│   │   ├── contact-card.tsx        ← modale carte numérique (3 QR + vCard + portail React)
│   │   ├── cookie-banner.tsx       ← bandeau RGPD granulaire
│   │   ├── cookie-prefs-link.tsx   ← lien "Gérer les cookies"
│   │   ├── google-map-embed.tsx    ← Maps avec consent guard
│   │   ├── contact-form.tsx        ← formulaire RGPD honeypot
│   │   ├── faq.tsx                 ← composant FAQ + builder spectacleFaq()
│   │   ├── next-shows-teaser.tsx   ← bandeau "à l'affiche" pour pages froides
│   │   ├── spectacle-card.tsx      ← carte spectacle réutilisable
│   │   ├── page-statique-renderer.tsx
│   │   ├── legal-page.tsx          ← layout commun pages légales
│   │   ├── reveal.tsx              ← IntersectionObserver fade-in
│   │   ├── external-link.tsx       ← lien sortant accessible
│   │   ├── scroll-progress.tsx     ← barre de progression scroll
│   │   ├── scroll-to-top.tsx       ← bouton retour en haut
│   │   ├── accessibility-toggle.tsx← panneau RGAA (taille texte, contraste, dyslexie, anim)
│   │   ├── toast.tsx               ← notifications transient
│   │   └── json-ld.tsx             ← Schema.org helpers
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts           ← createClient + sanityFetch (tags + ISR)
│   │   │   ├── queries.ts          ← GROQ queries
│   │   │   ├── types.ts            ← types TS (manuels)
│   │   │   └── image.ts            ← urlFor()
│   │   └── utils.ts                ← formatDate, formatRelative, formatPrice, formatDuration, cn
│   └── sanity/
│       ├── env.ts
│       ├── structure.ts            ← Studio sidebar custom
│       └── schemas/
│           ├── index.ts            ← barrel export
│           ├── spectacle.ts        ← schéma principal (groupes, validation)
│           ├── categorie.ts
│           ├── atelier.ts
│           ├── actualite.ts
│           ├── pageStatique.ts
│           └── parametres.ts       ← singleton
├── tailwind.config.ts              ← palette or/rouge/nuit/craie + tokens sémantiques
├── next.config.ts                  ← headers HTTP (CSP, cache, security)
├── sanity.config.ts
├── sanity.cli.ts
├── tsconfig.json
├── package.json
├── README.md
└── .env.local                      ← (gitignored) PROJECT_ID, REVALIDATE_SECRET, WRITE_TOKEN
```

---

## 3. Variables d'environnement

| Variable | Rôle | Où la définir |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID du projet Sanity (`n56w49xz`) | Vercel + .env.local |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (`production`) | Vercel + .env.local |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Version GROQ (`2024-12-01`) | Vercel + .env.local |
| `SANITY_REVALIDATE_SECRET` | Signature HMAC du webhook | Vercel + .env.local + sanity.io/manage |
| `SANITY_API_WRITE_TOKEN` | Token Editor pour scripts seed | .env.local **uniquement** |
| `NEXT_PUBLIC_SITE_URL` | URL canonique (`https://acte2theatre.vercel.app`) | Vercel + .env.local |

⚠️ **Le `SANITY_API_WRITE_TOKEN` ne doit JAMAIS être déployé sur Vercel** —
il sert uniquement aux scripts de seed locaux. Il peut être révoqué
sur sanity.io/manage une fois la migration finalisée.

---

## 4. Pipeline de déploiement

```
┌──────────┐    git push     ┌──────────┐   webhook    ┌──────────┐
│  Local   │  ────────────►  │  GitHub  │ ───────────► │  Vercel  │
│ (Windows)│                 │ (main)   │              │ (build)  │
└──────────┘                 └──────────┘              └────┬─────┘
                                                            │
                                                            ▼
                                                       ┌──────────┐
┌──────────┐    publish      ┌──────────┐   webhook    │   Edge   │
│  Studio  │  ────────────►  │  Sanity  │ ───────────► │  Network │
│ /studio  │                 │ (content)│              │ (CDN)    │
└──────────┘                 └──────────┘              └──────────┘
```

- Code → GitHub → Vercel : auto-deploy à chaque push sur `main`,
  build complet (`next build`), déploiement Edge.
- Contenu → Sanity → `/api/revalidate` : webhook signé HMAC, invalide
  les tags Next.js, le visiteur suivant voit la nouvelle version sans
  rebuild.

### Time-to-publish

- Modification de contenu : ~30 secondes (le temps du webhook +
  invalidation de cache + cache CDN Sanity).
- Modification de code : 2-3 minutes (build Next.js + déploiement
  Vercel).

---

## 5. Audit SEO

### 5.1. On-page

| Critère | État | Détail |
|---|---|---|
| Balise `<title>` unique par page | ✅ | Pattern `{Titre} — Acte 2 Théâtre` ou variante locale |
| Meta `description` unique | ✅ | 150-160 caractères, ville + mots-clés naturels |
| `canonical` correctement défini | ✅ | Tous les types de pages |
| Hiérarchie `<h1>` à `<h4>` | ✅ | Un seul `<h1>` par page, pas de saut de niveau |
| URL propres et lisibles | ✅ | Slug Sanity, pas de paramètres complexes |
| Breadcrumbs visibles | ✅ | Toutes les pages détail/légales |
| Maillage interne | ✅ | NextShowsTeaser sur pages froides + footer sitemap |
| Mobile-first | ✅ | Tailwind mobile-first, viewport meta correct |
| HTTPS | ✅ | Vercel auto, HSTS preload 1 an |
| Compression / minification | ✅ | Brotli/gzip Vercel auto |

### 5.2. Données structurées (Schema.org)

| Type | Pages | Détail |
|---|---|---|
| `PerformingArtsTheater` + `LocalBusiness` | toutes | Adresse, geo, openingHours, capacité 100, aménités, sameAs (Facebook, Mapado, BilletReduc, Ticketac), foundingDate, vatID |
| `WebSite` | toutes | `@id` reference vers Organization |
| `TheaterEvent` | `/spectacles/[slug]` | Une entrée par représentation à venir, avec `Offer` (price, currency, availability, validFrom, url Mapado), `performer` Compagnie, `location` Place, `eventStatus`, `eventAttendanceMode` |
| `BreadcrumbList` | détail spectacle, plan du site | Navigation structurée |
| `FAQPage` | `/spectacles/[slug]` | 6 Q/A par spectacle (âge, durée, prix, réservation, accessibilité, accès) — auto-générées |
| `SpeakableSpecification` | helper dispo | Utilisable sur les pages narratives |

### 5.3. Sitemap & robots

- **`/sitemap.xml`** dynamique : routes principales (priorité 0.6-1.0,
  weekly) + tous les slugs spectacles (0.7, weekly) + 6 pages légales
  (0.2, yearly).
- **`/robots.txt`** : Allow universel + autorise explicitement
  GPTBot et Google-Extended (compatible IA), Disallow `/studio`,
  `/api`, `/_next/`.
- **`/llms.txt` + `/llms-full.txt`** : convention llmstxt.org pour la
  découverte par les agents IA (ChatGPT, Perplexity, Claude).

### 5.4. Performance / Core Web Vitals (cibles)

| Métrique | Cible | Estimation |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5 s | ~1.8 s grâce au `<link rel="preload">` du hero.webp et `priority` Next/Image |
| **INP** (Interaction to Next Paint) | < 200 ms | OK — UI client minimal, RSC partout |
| **CLS** (Cumulative Layout Shift) | < 0.1 | OK — toutes les images avec dimensions, fonts swap |
| **FCP** (First Contentful Paint) | < 1.8 s | OK — preconnect + preload |
| **TBT** (Total Blocking Time) | < 200 ms | OK — bundle JS minimal |

#### Optimisations en place

- `next/image` partout (AVIF + WebP, `sizes` adaptatif, lazy loading,
  blur placeholder via Sanity LQIP).
- `<link rel="preconnect">` Sanity CDN, fonts.gstatic, Mapado.
- `<link rel="preload">` hero.webp.
- Cache headers `immutable 1 an` sur `/images/`, `/logos/`.
- Cache headers 24h sur `/llms*.txt`, `/humans.txt`.
- Police variable Inter + Playfair via `next/font` (pas de FOUT).
- Animations désactivables via `prefers-reduced-motion` + a11y toggle.

### 5.5. SEO local (Lyon 9 / Vaise)

| Levier | État |
|---|---|
| Mots-clés dans titres et descriptions | ✅ « Lyon », « Lyon 9 », « Vaise » |
| Adresse complète sur toutes les pages (footer + Schema) | ✅ |
| `geo` lat/lon dans le JSON-LD Organization | ✅ |
| Page `/contact` avec carte Maps embed (RGPD-aware) | ✅ |
| Bouton « Laisser un avis Google » sur /contact | ✅ |
| Section « Comment venir » sur la home (bus, métro, parking) | ✅ |
| Page `/entreprise` ciblée « location séminaire Lyon » | ✅ |
| Google Business Profile à activer / vérifier | ⚠️ à confirmer côté client |

### 5.6. GEO (Generative Engine Optimization)

| Critère | État |
|---|---|
| `/llms.txt` (sommaire) | ✅ |
| `/llms-full.txt` (documentation IA exhaustive) | ✅ |
| Bots IA autorisés dans `robots.txt` | ✅ GPTBot + Google-Extended |
| Bloc « définition canonique » 25-50 mots sur la home | ✅ |
| FAQ structurée extractible IA sur chaque spectacle | ✅ FAQPage |
| Speakable schema | ✅ helper dispo |
| Entité Wikidata | ⚠️ à créer (action externe) |
| Google Business Profile complet et à jour | ⚠️ action externe |

---

## 6. Audit accessibilité (RGAA 4.1.2 / WCAG 2.2 AA / EAA)

### 6.1. Bonnes pratiques en place

| Critère | État | Détail |
|---|---|---|
| `<html lang="fr">` | ✅ | Déclaration de langue |
| Skip link « Aller au contenu » | ✅ | Visible au focus, focus restauré post-navigation |
| Hiérarchie HTML5 sémantique | ✅ | header / nav / main / article / footer |
| Un seul `<h1>` par page | ✅ | Vérifié sur toutes les pages |
| Alternatives textuelles | ✅ | Toutes les images : `alt` ou `aria-hidden` |
| Liens externes annoncés | ✅ | sr-only « ouvre dans un nouvel onglet » |
| Liens non discernables | ✅ | Pas de « cliquez ici », libellés explicites |
| Contraste couleurs | ✅ | Or (#F5C518) / texte foncé : 4.5:1+ ; corps : 7:1 |
| Focus visible | ✅ | ring 2 px or rideau, ring-offset 2 px |
| Navigation clavier | ✅ | Tabulation logique, modales avec Escape |
| ARIA modal correct | ✅ | role="dialog", aria-modal, aria-labelledby, focus trap minimaliste |
| Champs formulaire | ✅ | `<label>` explicite, required, autoComplete |
| Erreurs de formulaire | ✅ | role="alert", aria-describedby |
| Annonces dynamiques | ✅ | aria-live polite sur compteur de spectacles + toast |
| Préférence reduced-motion | ✅ | Coupe animations système + override via toggle a11y |
| `prefers-color-scheme` | ✅ | Détecté + override toggle thème |
| Toggle accessibilité | ✅ | Taille texte (3 niveaux), contraste, dyslexie (Atkinson Hyperlegible), liens soulignés, pause anim |
| Plan du site HTML | ✅ | `/plan-du-site` |
| Déclaration d'accessibilité | ✅ | `/accessibilite` |
| Mode sombre fonctionnel | ✅ | Tokens sémantiques, contraste vérifié dans les deux thèmes |
| Page 404 utile | ✅ | Logo + plan du site illustré |

### 6.2. Travaux restants pour pleine conformité (audit RGAA 106 critères)

| Critère | À faire |
|---|---|
| Audit externe RGAA officiel | Diligenter un cabinet (Tanaguru, Access42, Atalan…) avant fin du semestre |
| Test utilisateurs avec personnes en situation de handicap visuel et moteur | À planifier |
| Transcription textuelle des vidéos YouTube/Vimeo | À ajouter sur les fiches spectacles concernées |
| Sous-titres des contenus audio | À récupérer auprès des compagnies |
| Vérification automatisée régulière (axe-core, Lighthouse a11y, Wave) | Intégrer dans la CI GitHub Actions |
| Gestion fine du focus dans les modales (focus-trap-react) | À ajouter pour conformité maximale |

### 6.3. Conformité European Accessibility Act (directive UE 2019/882)

Le site respecte les principes du **EAA** applicable depuis le 28 juin
2025 : principes POUR (perceptible, opérable, compréhensible, robuste),
mais une **certification formelle** par un organisme tiers est
recommandée pour les obligations de transparence vis-à-vis du public.

---

## 7. Sécurité

| Mesure | État |
|---|---|
| HTTPS forcé (HSTS preload 1 an) | ✅ |
| Content-Security-Policy stricte | ✅ default-src self, frame-src whitelist Mapado + Maps |
| X-Content-Type-Options nosniff | ✅ |
| X-Frame-Options SAMEORIGIN | ✅ |
| Referrer-Policy strict-origin-when-cross-origin | ✅ |
| Permissions-Policy restrictive | ✅ |
| `/.well-known/security.txt` (RFC 9116) | ✅ |
| Webhook Sanity signé HMAC | ✅ |
| Honeypot anti-bot sur formulaire contact | ✅ |
| Rate limit formulaire (1 req / 30s / IP) | ✅ |
| Pas de stockage des données du formulaire | ✅ Logs serveur uniquement |
| Studio derrière auth Sanity (Google/GitHub/email) | ✅ |
| Tokens Sanity gestion stricte (Editor seulement pour scripts seed) | ✅ |
| Cookies non strictement nécessaires sous consentement | ✅ Bandeau granulaire CNIL 2020-091 |

---

## 8. RGPD / Conformité

| Mesure | État |
|---|---|
| Mentions légales conformes LCEN art. 6.III | ✅ |
| Politique de confidentialité conforme RGPD | ✅ |
| Politique de cookies conforme CNIL | ✅ |
| CGU / CGV conformes droit de la consommation | ✅ |
| Bandeau cookies granulaire (3 catégories) | ✅ |
| Mémorisation choix utilisateur 13 mois | ✅ |
| Bouton « Gérer les cookies » accessible en permanence (footer) | ✅ |
| Carte Google Maps : placeholder tant que consentement absent | ✅ |
| Formulaire de contact : consentement explicite + lien politique | ✅ |
| Honeypot anti-spam | ✅ |
| Mention DPO | ⚠️ Pas applicable (TPE — gérant désigné) |
| Registre des traitements | ⚠️ À tenir côté Acte 2 (article 30 RGPD) |
| Notification CNIL en cas de violation | ✅ procédure documentée dans /confidentialite |

---

## 9. Scripts disponibles

### `seed-full.mjs`

Re-seed complet (idempotent) du dataset Sanity : 3 catégories,
10 spectacles, 3 ateliers, 3 pages statiques, 1 singleton paramètres.

```bash
node --env-file=.env.local scripts/seed-full.mjs
```

### `enrich-spectacles-descriptions.mjs`

Patch des 10 spectacles existants avec descriptions longues, seoTitre,
seoDescription. Idempotent.

```bash
node --env-file=.env.local scripts/enrich-spectacles-descriptions.mjs
```

### `seed-demo.mjs`

Seed minimal (1 spectacle de démonstration). Pour tests.

```bash
node --env-file=.env.local scripts/seed-demo.mjs
```

### `migrate-from-old-site.mjs`

Migration historique depuis acte2theatre.fr. Conservé pour traçabilité.

### `generate-assets.mjs`

Régénère :

- WebP de toutes les photos de `public/images/`
- Favicons multi-tailles depuis `public/logos/logo-acte2.jpg`
- Apple-touch-icon, mstile, safari-pinned-tab.svg
- OG image par défaut (1200×630)
- favicon.ico

```bash
node scripts/generate-assets.mjs
```

---

## 10. Développement local

### Prérequis

- Node.js ≥ 20 (Node 24 testé en dev)
- npm 10+
- Git

### Démarrage

```bash
git clone https://github.com/skyymar69-rgb/acte2theatre.git
cd acte2theatre
npm install
cp .env.local.example .env.local      # remplir les valeurs
npm run dev
```

Le site est sur `http://localhost:3000`, le Studio sur
`http://localhost:3000/studio`.

### Commandes principales

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur dev avec hot reload |
| `npm run build` | Build de production |
| `npm run start` | Sert le build local |
| `npm run lint` | ESLint Next.js config |
| `npm run typecheck` | tsc --noEmit |
| `npm run sanity:typegen` | Génère les types depuis les schémas Sanity |

---

## 11. Points d'amélioration identifiés (post-livraison)

### Court terme (1-2 semaines)

- [ ] Auditer la fiche Google Business Profile et la mettre à jour
- [ ] Créer une entrée Wikidata Acte 2 Théâtre (renforcement entité IA)
- [ ] Brancher Resend ou Formspree sur l'API `/api/contact` pour
      l'envoi d'email réel (actuellement logs serveur seulement)
- [ ] Ajouter un Google Tag Manager / Plausible si besoin d'analytics
      (en respectant le bandeau cookie existant)

### Moyen terme (1-3 mois)

- [ ] Audit RGAA externe par cabinet certifié
- [ ] Programme de récolte d'avis Google (post-spectacle)
- [ ] Live preview Sanity (visual editing) — `next-sanity/preview`
- [ ] Page « Idées de sorties » (`/sortir/famille-lyon`,
      `/sortir/sortie-ados-lyon`) pour SEO topical
- [ ] Newsletter saison (lead magnet « Programme PDF téléchargeable »)
- [ ] Compteur dynamique de places restantes via API Mapado

### Long terme (6-12 mois)

- [ ] Migration vers domaine custom (`acte2theatre.fr` au lieu de
      `.vercel.app`) — couplage DNS + redirections 301 depuis l'ancien
      site
- [ ] Tests E2E Playwright sur le parcours réservation
- [ ] Internationalisation (anglais minimum pour le tourisme culturel)
- [ ] Module billetterie native (alternative à Mapado)
- [ ] Couche IA / MCP : un assistant vocal/textuel pour aider Hervé à
      modifier le contenu (« ajoute un nouveau spectacle X le 12 mai à
      20h »)

---

## 12. Glossaire technique

| Terme | Définition |
|---|---|
| **App Router** | Système de routage Next.js basé sur les dossiers de `src/app/` |
| **RSC** (React Server Components) | Composants rendus côté serveur uniquement, pas de JS au client |
| **ISR** (Incremental Static Regeneration) | Pages statiques pré-rendues, invalidées à la demande |
| **GROQ** | Langage de requête de Sanity (équivalent SQL pour leur graphe) |
| **Portable Text** | Format JSON pour stocker du texte riche dans Sanity |
| **Webhook** | Notification HTTP envoyée par Sanity quand le contenu change |
| **CDN** | Content Delivery Network — serveurs distribués pour servir les fichiers rapidement |
| **CSP** | Content Security Policy — politique de sécurité contre XSS |
| **HSTS** | HTTP Strict Transport Security — force HTTPS au navigateur |
| **HMAC** | Hash-based Message Authentication Code — signature cryptographique |
| **LCP** | Largest Contentful Paint — métrique Core Web Vitals |
| **GEO** | Generative Engine Optimization — optimisation pour les IA génératives |
| **RGAA** | Référentiel Général d'Amélioration de l'Accessibilité |
| **WCAG** | Web Content Accessibility Guidelines |
| **EAA** | European Accessibility Act |

---

## 13. Contacts techniques

**Réalisation et maintenance :**

> **Kayzen Web** (KAYZEN LYON · SASU)
> Siège : 6 rue Pierre Termier, 69009 Lyon
> SIRET 999 418 346 000 14 · TVA FR85 999 418 346
> Tél : +33 (0)4 87 77 68 61
> Email : <contact@kayzen-lyon.fr>
> Web : <https://internet.kayzen-lyon.fr>

**Hébergement :** Vercel Inc. (US) — données contenu sur Sanity AS (Norvège, EEE).

**Billetterie :** Mapado (FR), BilletReduc (FR), Ticketac (FR).

---

*Document v1.0 — 28 avril 2026. Auteur : Kayzen Web.
Mis à jour à chaque évolution majeure du site.*
