import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Search, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container max-w-3xl py-16 md:py-24 text-center">
      <p className="text-or-500 font-display italic text-7xl md:text-9xl mb-2 leading-none">
        404
      </p>
      <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-3">
        Lever de rideau imprévu
      </p>
      <h1 className="text-3xl md:text-4xl mb-4 text-balance">
        Cette page n&apos;est plus à l&apos;affiche
      </h1>
      <p className="text-ink-muted mb-8 max-w-xl mx-auto text-pretty">
        L&apos;adresse a peut-être changé pendant l&apos;entracte. Voici quelques
        portes d&apos;entrée pour retrouver votre chemin.
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <Link href="/" className="btn-primary">
          <Home className="w-4 h-4" aria-hidden="true" />
          Retour à l&apos;accueil
        </Link>
        <Link href="/spectacles" className="btn-secondary">
          <Search className="w-4 h-4" aria-hidden="true" />
          Voir la programmation
        </Link>
      </div>

      <div className="border-t border-divider/15 pt-10 text-sm text-ink-muted">
        <p className="mb-4">Vous cherchiez peut-être&nbsp;:</p>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <li>
            <Link
              href="/spectacles"
              className="text-rouge-600 dark:text-or-400 hover:underline inline-flex items-center gap-1"
            >
              Programmation <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link
              href="/ateliers"
              className="text-rouge-600 dark:text-or-400 hover:underline inline-flex items-center gap-1"
            >
              Ateliers <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-rouge-600 dark:text-or-400 hover:underline inline-flex items-center gap-1"
            >
              Contact <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link
              href="/plan-du-site"
              className="text-rouge-600 dark:text-or-400 hover:underline inline-flex items-center gap-1"
            >
              Plan du site <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
