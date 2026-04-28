# Acte 2 Théâtre — Site web

Refonte complète de [acte2theatre.fr](https://www.acte2theatre.fr) sur stack moderne.

**Stack** : Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Sanity CMS · Vercel · Mapado (billetterie externe).

---

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'environnement et le compléter
cp .env.local.example .env.local

# 3. Démarrer en mode dev
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000) et le back-office Sanity sur [http://localhost:3000/studio](http://localhost:3000/studio).

---

## 🔧 Configuration Sanity (10 minutes, à faire une fois)

### 1. Créer un projet Sanity

```bash
# Se connecter (ou créer un compte gratuit sur sanity.io)
npx sanity login

# Initialiser le projet (à la racine du repo)
npx sanity init --env
```

Choisir :
- **Create new project** : nom = `acte2theatre`
- **Use the default dataset configuration** : oui (`production`)

Cela ajoute `NEXT_PUBLIC_SANITY_PROJECT_ID` et `NEXT_PUBLIC_SANITY_DATASET` au `.env.local`.

### 2. Configurer le webhook de revalidation

Dans [sanity.io/manage](https://sanity.io/manage) → projet → **API → Webhooks → Create webhook** :

| Champ | Valeur |
|-------|--------|
| Name | `Next.js revalidate` |
| URL | `https://votre-domaine.vercel.app/api/revalidate` |
| Dataset | `production` |
| Trigger on | `Create`, `Update`, `Delete` |
| Filter | `_type in ["spectacle","categorie","atelier","actualite","pageStatique","parametres"]` |
| Projection | `{ _type, _id, "slug": slug.current }` |
| HTTP method | `POST` |
| Secret | (générer une chaîne aléatoire, la copier dans `SANITY_REVALIDATE_SECRET`) |

À chaque publication dans le Studio, ce webhook invalidera les pages concernées sans rebuild.

### 3. CORS pour le Studio embarqué

Toujours dans [sanity.io/manage](https://sanity.io/manage) → projet → **API → CORS Origins** :

- Ajouter `http://localhost:3000` (dev)
- Ajouter `https://votre-domaine.vercel.app` (prod)
- Cocher **Allow credentials**

---

## ☁️ Déploiement Vercel

```bash
# 1. Pousser le repo sur GitHub
git init && git add . && git commit -m "Initial scaffold"
git remote add origin <votre-repo>
git push -u origin main

# 2. Importer dans Vercel
# https://vercel.com/new → sélectionner le repo
```

**Variables d'environnement à configurer dans Vercel** (Settings → Environment Variables) :

| Variable | Source |
|----------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity manage |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-12-01` |
| `SANITY_REVALIDATE_SECRET` | la chaîne du webhook |
| `NEXT_PUBLIC_SITE_URL` | URL prod (ex : `https://www.acte2theatre.fr`) |

Vercel déploie automatiquement à chaque push. Chaque PR génère une preview URL.

---

## 📁 Structure du projet

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout racine + header/footer
│   ├── page.tsx                  # Accueil
│   ├── globals.css               # Tailwind + tokens
│   ├── sitemap.ts                # Sitemap dynamique
│   ├── robots.ts                 # robots.txt
│   ├── spectacles/
│   │   ├── page.tsx              # Listing avec filtres catégorie
│   │   └── [slug]/page.tsx       # Détail spectacle (SSG + ISR)
│   ├── ateliers/page.tsx
│   ├── contact/page.tsx          # Pages alimentées par
│   ├── location-salle/page.tsx   # le schéma "pageStatique"
│   ├── soutenir/page.tsx
│   ├── studio/[[...tool]]/       # Sanity Studio mounted ici
│   └── api/revalidate/           # Webhook ISR
├── components/
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── spectacle-card.tsx
│   └── page-statique-renderer.tsx
├── lib/
│   ├── sanity/
│   │   ├── client.ts             # Client + helper sanityFetch
│   │   ├── image.ts              # urlFor()
│   │   ├── queries.ts            # GROQ queries
│   │   └── types.ts              # Types TS (manuels avant typegen)
│   └── utils.ts                  # cn, formatDate, formatPrice…
└── sanity/
    ├── env.ts                    # Lecture des env vars
    ├── structure.ts              # Custom Studio sidebar
    └── schemas/
        ├── index.ts              # Barrel
        ├── spectacle.ts          # 🎭 Type principal
        ├── categorie.ts
        ├── atelier.ts
        ├── actualite.ts
        ├── pageStatique.ts
        └── parametres.ts         # Singleton
```

---

## 🧠 Décisions d'architecture

### Pourquoi Sanity ?
Hervé n'est pas développeur. Il lui faut une UI éditeur claire, accessible depuis n'importe quel navigateur. Sanity Studio est embarqué dans la même app Next.js (route `/studio`) — un seul domaine, un seul déploiement.

### Pourquoi ISR + webhooks plutôt que SSR ?
Le contenu change peu (quelques modifs par semaine). On veut servir des pages **statiques** (rapides + bonnes pour le SEO) et invalider à la demande quand un éditeur publie. Le `sanityFetch` du fichier `lib/sanity/client.ts` taggue chaque requête, et `/api/revalidate` réécoute le webhook Sanity pour purger les bons tags.

### Pourquoi conserver Mapado ?
La billetterie marche déjà, gère TVA, billets, QR codes. La refondre serait coûteux et risqué. On lie chaque spectacle à son URL Mapado via le champ `mapadoUrl` du schéma.

### SEO : structured data
La page détail d'un spectacle injecte un JSON-LD `TheaterEvent` (Schema.org). Google peut afficher des **rich snippets** avec date/lieu/prix dans les résultats — gros bénéfice pour la visibilité locale.

---

## 🛠️ Commandes utiles

```bash
npm run dev         # Mode dev avec hot reload
npm run build       # Build de production
npm run start       # Serveur prod en local
npm run lint        # ESLint (Next config)
npm run typecheck   # tsc --noEmit
npm run sanity:typegen   # Génère les types TS depuis les schémas + GROQ
```

---

## 🗺️ Roadmap (post-scaffolding)

### Phase 2 — Pages et UX
- [ ] Menu mobile (Sheet shadcn/ui)
- [ ] Recherche par date / public cible (calendrier)
- [ ] Page détail atelier (`/ateliers/[slug]`)
- [ ] Page détail actualité (`/actualites/[slug]`)
- [ ] Formulaire de contact (Resend ou Formspree)
- [ ] OG images dynamiques (`opengraph-image.tsx` par route)

### Phase 3 — Migration de contenu
- [ ] Script `scripts/scrape-old-site.ts` qui lit l'ancien site et écrit dans Sanity
- [ ] Mapping des URLs `_a1459.html` → nouveaux slugs (table de redirections 301 dans `next.config.ts`)
- [ ] Téléversement des dossiers de presse PDF

### Phase 4 — Améliorations
- [ ] Live preview Sanity (visual editing)
- [ ] Plausible ou Vercel Analytics (RGPD-friendly)
- [ ] Tests E2E Playwright (parcours réservation)

### Phase 6 (optionnelle) — Couche IA / MCP
- [ ] Serveur MCP `acte2-catalogue` (lecture publique des spectacles)
- [ ] Serveur MCP `acte2-admin` (mutations Sanity en langage naturel pour Hervé via Claude Desktop)

---

## 🐛 Troubleshooting

**`Module not found: @/sanity/env`** → vérifier que `tsconfig.json` a bien `"paths": { "@/*": ["./src/*"] }`.

**Le Studio affiche un écran blanc** → CORS pas configuré dans sanity.io/manage. Ajouter `http://localhost:3000` avec **Allow credentials**.

**Le webhook ne déclenche pas la revalidation** → vérifier que `SANITY_REVALIDATE_SECRET` est identique côté Sanity et côté Vercel. Tester en `curl -X POST` avec le header signé (voir docs `next-sanity/webhook`).

**Types TS désynchronisés des schémas** → lancer `npm run sanity:typegen` puis remplacer les types manuels de `src/lib/sanity/types.ts` par les générés.

---

## 📜 Licence

Projet privé pour Acte 2 Théâtre.
