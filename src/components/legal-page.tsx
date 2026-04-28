import type { Metadata } from "next";
import Link from "next/link";

interface LegalPageProps {
  titre: string;
  miseAJour?: string;
  children: React.ReactNode;
}

export function LegalPage({ titre, miseAJour, children }: LegalPageProps) {
  return (
    <article className="container py-12 md:py-16 max-w-3xl">
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
          <li className="text-ink">{titre}</li>
        </ol>
      </nav>

      <header className="mb-10 pb-8 border-b border-divider/20">
        <h1 className="mb-3">{titre}</h1>
        {miseAJour && (
          <p className="text-sm text-ink-muted">
            Dernière mise à jour&nbsp;: {miseAJour}
          </p>
        )}
      </header>

      <div className="prose-acte2 max-w-none">{children}</div>

      <footer className="mt-16 pt-8 border-t border-divider/20 text-sm text-ink-muted">
        <p>
          Pour toute question relative à ce document, écrivez-nous à{" "}
          <a
            href="mailto:acte2theatre@yahoo.fr"
            className="text-rouge-600 dark:text-or-400 hover:underline"
          >
            acte2theatre@yahoo.fr
          </a>
          .
        </p>
      </footer>
    </article>
  );
}

export function legalMetadata(titre: string, description: string): Metadata {
  return {
    title: titre,
    description,
    robots: { index: true, follow: true },
  };
}
