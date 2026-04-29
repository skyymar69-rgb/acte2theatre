"use client";

import { useEffect } from "react";

/**
 * Filet ultime — capté quand l'erreur se produit dans le layout racine lui-même
 * (cas où `error.tsx` ne peut pas être rendu).
 *
 * IMPORTANT : ce composant doit définir son propre <html><body> car le layout
 * a échoué.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[global-error.tsx]", error);
    }
  }, [error]);

  return (
    <html lang="fr">
      <body
        style={{
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          padding: "4rem 1.5rem",
          textAlign: "center",
          backgroundColor: "#fffbec",
          color: "#0a0a0a",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Une erreur critique est survenue
        </h1>
        <p style={{ marginBottom: "2rem", color: "#404040" }}>
          Le site rencontre un problème technique. L&apos;équipe a été
          notifiée. Vous pouvez réessayer ou nous contacter directement.
        </p>
        {error.digest && (
          <p style={{ fontSize: "0.75rem", color: "#737373", marginBottom: "2rem" }}>
            Référence : {error.digest}
          </p>
        )}
        <button
          type="button"
          onClick={reset}
          style={{
            background: "#c9151e",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            border: 0,
            cursor: "pointer",
            fontWeight: 600,
            marginRight: "0.5rem",
          }}
        >
          Réessayer
        </button>
        <a
          href="mailto:acte2theatre@yahoo.fr"
          style={{ color: "#c9151e", textDecoration: "underline" }}
        >
          acte2theatre@yahoo.fr
        </a>
      </body>
    </html>
  );
}
