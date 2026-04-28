"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Accessibility,
  X,
  TypeOutline,
  Contrast,
  Underline,
  PauseCircle,
  RotateCcw,
} from "lucide-react";

/**
 * Panneau d'accessibilité (RGAA / EAA / WCAG 2.2 AA) — préférences
 * persistantes localStorage. Activées via classes/data-attrs sur <html>.
 *
 * Options proposées :
 *  - Taille de police (3 niveaux : normal, +15%, +30%)
 *  - Contraste élevé (texte ink → noir pur, fond → blanc/noir pur)
 *  - Police dyslexie-friendly (Atkinson Hyperlegible — chargée à la demande)
 *  - Liens soulignés (force le souligne sur tous les <a>)
 *  - Pause des animations / transitions (respecte prefers-reduced-motion
 *    en plus du préfering système)
 */

type Prefs = {
  fontScale: 1 | 1.15 | 1.3;
  highContrast: boolean;
  dyslexia: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
};

const DEFAULTS: Prefs = {
  fontScale: 1,
  highContrast: false,
  dyslexia: false,
  underlineLinks: false,
  reduceMotion: false,
};

const STORAGE_KEY = "acte2-a11y-prefs";

function readPrefs(): Prefs {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function applyPrefs(p: Prefs) {
  const html = document.documentElement;
  html.style.setProperty("--a11y-font-scale", String(p.fontScale));
  html.classList.toggle("a11y-high-contrast", p.highContrast);
  html.classList.toggle("a11y-dyslexia", p.dyslexia);
  html.classList.toggle("a11y-underline-links", p.underlineLinks);
  html.classList.toggle("a11y-reduce-motion", p.reduceMotion);
}

export function AccessibilityToggle() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Hydration + chargement initial des préférences
  useEffect(() => {
    setMounted(true);
    const p = readPrefs();
    setPrefs(p);
    applyPrefs(p);
  }, []);

  // ESC ferme + lock scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    setTimeout(() => panelRef.current?.querySelector("button")?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  function update(patch: Partial<Prefs>) {
    const next = { ...prefs, ...patch };
    setPrefs(next);
    applyPrefs(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* localStorage indisponible (mode privé Safari ?) — non bloquant */
    }
  }

  function reset() {
    update(DEFAULTS);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ouvrir le panneau des options d'accessibilité"
        aria-expanded={open}
        aria-controls="a11y-panel"
        title="Accessibilité"
        className="fixed z-40 bottom-5 left-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-or-500 hover:bg-or-400 text-nuit-950 shadow-scene transition-colors"
      >
        <Accessibility className="w-5 h-5" aria-hidden="true" />
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-panel-title"
            id="a11y-panel"
            className="fixed inset-0 z-[100] overflow-y-auto bg-nuit-950/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <div
              className="min-h-full flex items-center justify-center p-4"
              onClick={(e) => e.target === e.currentTarget && setOpen(false)}
            >
              <div
                ref={panelRef}
                className="relative w-full max-w-md my-4 bg-surface text-ink rounded-2xl shadow-scene border border-or-500/20 overflow-hidden animate-fade-in-up"
              >
                <div className="h-1 bg-gradient-to-r from-or-500 via-or-300 to-or-500" />

                <div className="p-6">
                  <header className="flex items-start justify-between mb-5 gap-4">
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.32em] text-or-600 dark:text-or-400 mb-1">
                        Accessibilité
                      </p>
                      <h2
                        id="a11y-panel-title"
                        className="font-display text-xl"
                      >
                        Adaptez la lecture
                      </h2>
                      <p className="text-xs text-ink-muted mt-1">
                        Préférences mémorisées pour vos prochaines visites.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Fermer le panneau"
                      className="p-2 -mt-1 -mr-1 rounded-full hover:bg-ink/5 transition-colors"
                    >
                      <X className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </header>

                  {/* Taille de la police */}
                  <fieldset className="space-y-2 mb-5">
                    <legend className="flex items-center gap-2 text-sm font-medium mb-2">
                      <TypeOutline
                        className="w-4 h-4 text-or-500"
                        aria-hidden="true"
                      />
                      Taille du texte
                    </legend>
                    <div className="flex gap-2">
                      {([1, 1.15, 1.3] as const).map((scale) => (
                        <button
                          key={scale}
                          type="button"
                          onClick={() => update({ fontScale: scale })}
                          aria-pressed={prefs.fontScale === scale}
                          className={`flex-1 px-3 py-2 rounded-lg border text-sm transition-colors ${
                            prefs.fontScale === scale
                              ? "border-or-500 bg-or-500/10 text-ink"
                              : "border-divider/30 hover:border-or-500/50 text-ink-muted"
                          }`}
                        >
                          {scale === 1
                            ? "Normal"
                            : scale === 1.15
                            ? "Grand"
                            : "Très grand"}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Toggles */}
                  <div className="space-y-3">
                    <ToggleRow
                      icon={<Contrast className="w-4 h-4 text-or-500" aria-hidden="true" />}
                      label="Contraste élevé"
                      hint="Renforce noir/blanc, désature les fonds."
                      checked={prefs.highContrast}
                      onChange={(v) => update({ highContrast: v })}
                    />
                    <ToggleRow
                      icon={<TypeOutline className="w-4 h-4 text-or-500" aria-hidden="true" />}
                      label="Police dyslexie-friendly"
                      hint="Atkinson Hyperlegible — meilleure lisibilité."
                      checked={prefs.dyslexia}
                      onChange={(v) => update({ dyslexia: v })}
                    />
                    <ToggleRow
                      icon={<Underline className="w-4 h-4 text-or-500" aria-hidden="true" />}
                      label="Liens soulignés"
                      hint="Force le soulignement de tous les liens."
                      checked={prefs.underlineLinks}
                      onChange={(v) => update({ underlineLinks: v })}
                    />
                    <ToggleRow
                      icon={<PauseCircle className="w-4 h-4 text-or-500" aria-hidden="true" />}
                      label="Pause des animations"
                      hint="Désactive transitions et défilements animés."
                      checked={prefs.reduceMotion}
                      onChange={(v) => update({ reduceMotion: v })}
                    />
                  </div>

                  <div className="mt-6 pt-4 border-t border-divider/15 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={reset}
                      className="btn-ghost !px-2 text-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      Réinitialiser
                    </button>
                    <a
                      href="/accessibilite"
                      className="text-xs text-rouge-600 dark:text-or-400 hover:underline"
                    >
                      Notre engagement accessibilité →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

function ToggleRow({
  icon,
  label,
  hint,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer p-2 -mx-2 rounded-lg hover:bg-or-500/5 transition-colors">
      <span className="mt-0.5 flex-shrink-0">{icon}</span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-ink-muted">{hint}</span>
      </span>
      <span className="relative inline-flex h-6 w-11 flex-shrink-0 items-center mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-divider/40 peer-checked:bg-or-500 peer-focus-visible:ring-2 peer-focus-visible:ring-or-500 peer-focus-visible:ring-offset-2 ring-offset-page transition-colors"
        />
        <span
          aria-hidden="true"
          className="absolute left-0.5 inline-block h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"
        />
      </span>
    </label>
  );
}
