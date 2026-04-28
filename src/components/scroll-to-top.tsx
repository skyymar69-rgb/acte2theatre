"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Bouton flottant "Retour en haut" — apparaît après ~400px de scroll.
 * Accessible : visible focus, label explicite, smooth scroll respectant
 * prefers-reduced-motion.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function backToTop() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: reduced ? "auto" : "smooth",
    });
    // Repositionne le focus en haut de page (a11y)
    const main = document.getElementById("main");
    main?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={backToTop}
      aria-label="Retour en haut de la page"
      title="Retour en haut"
      className={`fixed z-40 bottom-5 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-rouge-600 hover:bg-rouge-500 text-white shadow-scene transition-all duration-300 hover:scale-110 motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or-500 focus-visible:ring-offset-2 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
