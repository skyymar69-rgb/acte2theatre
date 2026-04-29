"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

/**
 * Frontière d'erreur App Router.
 * Capte toute exception remontée depuis un Server/Client Component sous /app.
 * `global-error.tsx` couvre en plus les exceptions remontant jusqu'au layout racine.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[error.tsx]", error);
    }
  }, [error]);

  return (
    <section
      role="alert"
      className="container max-w-2xl py-20 md:py-28 text-center"
    >
      <AlertTriangle
        className="w-12 h-12 text-or-500 mx-auto mb-6"
        aria-hidden="true"
      />
      <h1 className="mb-4">Oups — une erreur est survenue</h1>
      <p className="text-ink-muted mb-8">
        Le théâtre est toujours là, mais cette page a fait un faux pas. Vous
        pouvez réessayer ; si le problème persiste, contactez-nous à{" "}
        <a
          href="mailto:acte2theatre@yahoo.fr"
          className="text-rouge-600 dark:text-or-400 underline underline-offset-2"
        >
          acte2theatre@yahoo.fr
        </a>
        .
      </p>
      {error.digest && (
        <p className="text-xs text-ink-muted/70 font-mono mb-8">
          Référence&nbsp;: {error.digest}
        </p>
      )}
      <div className="flex flex-wrap gap-3 justify-center">
        <button type="button" onClick={reset} className="btn-primary">
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          Réessayer
        </button>
        <Link href="/" className="btn-secondary">
          <Home className="w-4 h-4" aria-hidden="true" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
