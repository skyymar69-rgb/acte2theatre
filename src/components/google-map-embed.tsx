"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const COOKIE_KEY = "acte2-cookie-consent";
const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d88992.49980630733!2d4.776110653804892!3d45.81094558603763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4eb0cf5098b1b%3A0xec36174d6e990e97!2sActe%202%20Th%C3%A9atre!5e0!3m2!1sfr!2sfr!4v1777352727034!5m2!1sfr!2sfr";
const FALLBACK_HREF = "https://maps.app.goo.gl/TwqZxYrurq5qRTXr5";

/**
 * Carte Google Maps respectant le consentement RGPD.
 *
 * Tant que l'utilisateur n'a pas accepté la catégorie "thirdParty" dans
 * le bandeau cookies, on affiche un placeholder cliquable qui consent
 * et charge l'iframe à la volée.
 */
export function GoogleMapEmbed() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    function check() {
      try {
        const raw = localStorage.getItem(COOKIE_KEY);
        if (!raw) {
          setAllowed(false);
          return;
        }
        const parsed = JSON.parse(raw);
        setAllowed(Boolean(parsed?.thirdParty));
      } catch {
        setAllowed(false);
      }
    }
    check();
    const onUpdate = () => check();
    window.addEventListener("acte2:consent-updated", onUpdate);
    return () => window.removeEventListener("acte2:consent-updated", onUpdate);
  }, []);

  if (allowed === null) {
    // SSR / pré-mount → placeholder neutre pour éviter le flash
    return (
      <div className="aspect-[16/9] rounded-xl bg-surface-2 border border-divider/10" />
    );
  }

  if (!allowed) {
    return (
      <div className="aspect-[16/9] rounded-xl bg-surface-2 border border-divider/15 flex flex-col items-center justify-center text-center p-6">
        <MapPin className="w-8 h-8 text-or-500 mb-3" aria-hidden="true" />
        <p className="font-medium mb-2">
          La carte Google Maps utilise des cookies tiers
        </p>
        <p className="text-sm text-ink-muted max-w-md mb-4">
          Pour afficher la carte interactive, autorisez les contenus tiers ou
          ouvrez la carte directement sur Google Maps.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("acte2:open-cookie-prefs"));
            }}
            className="btn-secondary !py-2 !px-4 text-sm"
          >
            Gérer les cookies
          </button>
          <a
            href={FALLBACK_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2 !px-4 text-sm"
          >
            Ouvrir Google Maps
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-[16/9] rounded-xl overflow-hidden border border-divider/15 shadow-sm">
      <iframe
        src={MAP_SRC}
        title="Plan d'accès Acte 2 Théâtre — 32 quai Arloing, Lyon 9"
        loading="lazy"
        referrerPolicy="no-referrer"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
