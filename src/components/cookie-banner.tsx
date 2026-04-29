"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Cookie, Settings2 } from "lucide-react";

const COOKIE_KEY = "acte2-cookie-consent";

type Consent = {
  necessary: true; // toujours true (cookies strictement nécessaires)
  analytics: boolean;
  thirdParty: boolean; // Maps embed, autres widgets tiers
  decided: true;
  decidedAt: string; // ISO
};

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.decided) return parsed as Consent;
  } catch {
    /* corrupt → re-prompt */
  }
  return null;
}

function writeConsent(c: Omit<Consent, "decided" | "decidedAt">) {
  const payload: Consent = {
    ...c,
    decided: true,
    decidedAt: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_KEY, JSON.stringify(payload));
  // Notifier le reste de l'app (les iframes Maps, etc. peuvent réagir)
  window.dispatchEvent(
    new CustomEvent("acte2:consent-updated", { detail: payload })
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [thirdParty, setThirdParty] = useState(false);

  useEffect(() => {
    setVisible(!readConsent());
  }, []);

  // Permet d'ouvrir le bandeau depuis "Gérer les cookies" (footer)
  useEffect(() => {
    const onOpen = () => {
      const c = readConsent();
      if (c) {
        setAnalytics(c.analytics);
        setThirdParty(c.thirdParty);
      }
      setShowCustom(true);
      setVisible(true);
    };
    window.addEventListener("acte2:open-cookie-prefs", onOpen);
    return () => window.removeEventListener("acte2:open-cookie-prefs", onOpen);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    writeConsent({ necessary: true, analytics: true, thirdParty: true });
    setVisible(false);
  };

  const refuseAll = () => {
    writeConsent({ necessary: true, analytics: false, thirdParty: false });
    setVisible(false);
  };

  const savePrefs = () => {
    writeConsent({ necessary: true, analytics, thirdParty });
    setVisible(false);
    setShowCustom(false);
  };

  return (
    <div
      role="region"
      aria-label="Préférences cookies"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed inset-x-2 sm:inset-x-auto sm:right-4 sm:left-4 md:left-auto bottom-3 z-50 max-w-2xl mx-auto rounded-xl bg-surface text-ink shadow-scene border border-or-500/30 overflow-hidden animate-fade-in-up"
    >
      <div className="h-1 bg-gradient-to-r from-or-500 via-or-300 to-or-500" />

      <div className="p-5 md:p-6">
        <div className="flex items-start gap-3 mb-3">
          <Cookie
            className="w-5 h-5 mt-1 flex-shrink-0 text-or-500"
            aria-hidden="true"
          />
          <div className="flex-1">
            <h2
              id="cookie-title"
              className="font-display text-lg font-semibold mb-1"
            >
              Vos cookies, votre choix
            </h2>
            <p id="cookie-desc" className="text-sm text-ink-muted">
              Nous utilisons uniquement des cookies strictement nécessaires.
              Vous pouvez accepter des cookies tiers (carte Google Maps, mesure
              d&apos;audience anonymisée) pour enrichir votre expérience.{" "}
              <Link
                href="/cookies"
                className="text-rouge-600 dark:text-or-400 underline underline-offset-2"
              >
                En savoir plus
              </Link>
              .
            </p>
          </div>
        </div>

        {showCustom && (
          <fieldset className="border-t border-divider/15 mt-4 pt-4 space-y-3">
            <legend className="sr-only">Préférences détaillées</legend>

            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked
                disabled
                className="mt-0.5 accent-or-500"
                aria-describedby="cat-necessary-help"
              />
              <span>
                <strong>Cookies strictement nécessaires</strong>{" "}
                <span className="text-xs text-ink-muted">(toujours actifs)</span>
                <span id="cat-necessary-help" className="block text-xs text-ink-muted">
                  Mémorisation de vos choix de cookies et de votre thème.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={thirdParty}
                onChange={(e) => setThirdParty(e.target.checked)}
                className="mt-0.5 accent-or-500"
                aria-describedby="cat-third-help"
              />
              <span>
                <strong>Contenus tiers</strong>
                <span id="cat-third-help" className="block text-xs text-ink-muted">
                  Carte Google Maps embarquée sur la page Contact.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-0.5 accent-or-500"
                aria-describedby="cat-analytics-help"
              />
              <span>
                <strong>Mesure d&apos;audience anonyme</strong>
                <span id="cat-analytics-help" className="block text-xs text-ink-muted">
                  Aucun service actif aujourd&apos;hui ; ce choix sera utilisé
                  si nous activons un futur outil de statistiques anonymisé.
                </span>
              </span>
            </label>
          </fieldset>
        )}

        <div className="flex flex-wrap items-center justify-end gap-2 mt-5">
          {!showCustom && (
            <button
              type="button"
              onClick={() => setShowCustom(true)}
              className="btn-ghost !px-3"
            >
              <Settings2 className="w-4 h-4" aria-hidden="true" />
              Personnaliser
            </button>
          )}
          <button
            type="button"
            onClick={refuseAll}
            className="btn-secondary !py-2 !px-4 text-sm"
          >
            Tout refuser
          </button>
          {showCustom ? (
            <button
              type="button"
              onClick={savePrefs}
              className="btn-primary !py-2 !px-4 text-sm"
            >
              Enregistrer mes préférences
            </button>
          ) : (
            <button
              type="button"
              onClick={acceptAll}
              className="btn-primary !py-2 !px-4 text-sm"
            >
              Tout accepter
            </button>
          )}
          <button
            type="button"
            onClick={refuseAll}
            aria-label="Fermer le bandeau (refus implicite des cookies tiers)"
            className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-ink/5 transition-colors text-ink-muted hover:text-ink"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
