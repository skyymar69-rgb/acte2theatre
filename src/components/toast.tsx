"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

let externalEmit: ((message: string) => void) | null = null;

/** Émetteur global : utiliser depuis n'importe quel composant client. */
export function emitToast(message: string) {
  externalEmit?.(message);
}

/**
 * Hôte de toasts léger, sans dépendance. Affiche un toast bas-droite
 * pendant 3 secondes. aria-live polite pour annonce lecteur d'écran.
 */
export function ToastHost() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    externalEmit = (m) => {
      setMessage(m);
      setTimeout(() => setMessage(null), 3000);
    };
    return () => {
      externalEmit = null;
    };
  }, []);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-[110] bottom-20 sm:bottom-5 right-5 left-5 sm:left-auto max-w-sm bg-surface text-ink border border-or-500/30 rounded-xl shadow-scene p-4 flex items-start gap-3 animate-fade-in-up"
    >
      <CheckCircle2
        className="w-5 h-5 mt-0.5 flex-shrink-0 text-or-500"
        aria-hidden="true"
      />
      <p className="text-sm">{message}</p>
    </div>
  );
}
