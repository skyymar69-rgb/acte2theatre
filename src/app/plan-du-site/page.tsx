import Link from "next/link";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import {
  SPECTACLES_A_VENIR_QUERY,
  ATELIERS_QUERY,
  CATEGORIES_QUERY,
} from "@/lib/sanity/queries";
import type {
  SpectaclePreview,
  Atelier,
  Categorie,
} from "@/lib/sanity/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Plan du site",
  description:
    "Plan complet du site L'Acte 2 Lyon : programmation, ateliers, location de salle, contact, mentions légales.",
  alternates: { canonical: "/plan-du-site" },
};

export default async function PlanDuSitePage() {
  const [spectacles, ateliers, categories] = await Promise.all([
    sanityFetch<SpectaclePreview[]>({
      query: SPECTACLES_A_VENIR_QUERY,
      tags: ["spectacle"],
    }),
    sanityFetch<Atelier[]>({
      query: ATELIERS_QUERY,
      tags: ["atelier"],
    }),
    sanityFetch<Categorie[]>({
      query: CATEGORIES_QUERY,
      tags: ["categorie"],
    }),
  ]);

  return (
    <article className="container py-12 md:py-16 max-w-5xl">
      <nav aria-label="Fil d'Ariane" className="text-xs text-ink-muted mb-6">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link
              href="/"
              className="hover:text-rouge-600 dark:hover:text-or-400"
            >
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-ink">Plan du site</li>
        </ol>
      </nav>

      <header className="mb-12 max-w-2xl">
        <h1 className="mb-3">Plan du site</h1>
        <p className="text-ink-muted text-pretty">
          Toutes les pages du site L'Acte 2, classées par section.
          Utilisez ce plan pour naviguer rapidement ou pour accéder à une page
          précise sans passer par le menu.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <section aria-labelledby="ps-acceuil">
          <h2 id="ps-acceuil" className="text-xl mb-4">
            Accueil &amp; programmation
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Page d&apos;accueil
              </Link>
            </li>
            <li>
              <Link
                href="/spectacles"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Toute la programmation
              </Link>
              <ul className="ml-5 mt-1 space-y-1 text-ink-muted">
                {categories.map((c) => (
                  <li key={c._id}>
                    <Link
                      href={`/spectacles?categorie=${c.slug}`}
                      className="hover:text-rouge-600 dark:hover:text-or-400"
                    >
                      {c.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </section>

        <section aria-labelledby="ps-spectacles">
          <h2 id="ps-spectacles" className="text-xl mb-4">
            Fiches spectacles ({spectacles.length})
          </h2>
          <ul className="space-y-1 text-sm columns-1">
            {spectacles.map((s) => (
              <li key={s._id}>
                <Link
                  href={`/spectacles/${s.slug}`}
                  className="hover:text-rouge-600 dark:hover:text-or-400"
                >
                  {s.titre}
                </Link>
                {s.compagnie && (
                  <span className="text-ink-muted text-xs">
                    {" "}
                    · {s.compagnie}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="ps-ateliers">
          <h2 id="ps-ateliers" className="text-xl mb-4">
            Ateliers &amp; pratique
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/ateliers"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Tous les ateliers
              </Link>
              <ul className="ml-5 mt-1 space-y-1 text-ink-muted">
                {ateliers.map((a) => (
                  <li key={a._id}>{a.titre}</li>
                ))}
              </ul>
            </li>
          </ul>
        </section>

        <section aria-labelledby="ps-theatre">
          <h2 id="ps-theatre" className="text-xl mb-4">
            Le théâtre
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/contact"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Contact &amp; équipe
              </Link>
            </li>
            <li>
              <Link
                href="/location-salle"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Location de salle
              </Link>
            </li>
            <li>
              <Link
                href="/entreprise"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Espace entreprise
              </Link>
            </li>
            <li>
              <Link
                href="/soutenir"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Nous soutenir
              </Link>
            </li>
            <li>
              <a
                href="https://acte2theatre.mapado.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Billetterie en ligne (Mapado) ↗
              </a>
            </li>
          </ul>
        </section>

        <section aria-labelledby="ps-legal">
          <h2 id="ps-legal" className="text-xl mb-4">
            Informations légales
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/mentions-legales"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/cgu"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Conditions générales d&apos;utilisation
              </Link>
            </li>
            <li>
              <Link
                href="/cgv"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Conditions générales de vente
              </Link>
            </li>
            <li>
              <Link
                href="/confidentialite"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Politique de cookies
              </Link>
            </li>
            <li>
              <Link
                href="/accessibilite"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Déclaration d&apos;accessibilité
              </Link>
            </li>
          </ul>
        </section>

        <section aria-labelledby="ps-tech">
          <h2 id="ps-tech" className="text-xl mb-4">
            Ressources techniques
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/sitemap.xml"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                Sitemap XML
              </a>
            </li>
            <li>
              <a
                href="/robots.txt"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                robots.txt
              </a>
            </li>
            <li>
              <a
                href="/llms.txt"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                llms.txt (agents IA)
              </a>
            </li>
            <li>
              <a
                href="/llms-full.txt"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                llms-full.txt (documentation IA complète)
              </a>
            </li>
            <li>
              <a
                href="/humans.txt"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                humans.txt (équipe &amp; crédits)
              </a>
            </li>
            <li>
              <a
                href="/.well-known/security.txt"
                className="hover:text-rouge-600 dark:hover:text-or-400"
              >
                security.txt (RFC 9116)
              </a>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
