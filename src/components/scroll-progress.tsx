"use client";

import { useEffect, useState } from "react";

/**
 * Barre fine de progression du scroll en haut de la page.
 * - Couleur or rideau, fond invisible
 * - Cachée sur prefers-reduced-motion (info redondante avec la position de la barre)
 * - aria-hidden="true" : c'est un indicateur visuel décoratif
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const compute = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const ratio = total > 0 ? (h.scrollTop / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, ratio)));
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 z-[60] h-[3px] pointer-events-none motion-reduce:hidden"
    >
      <div
        className="h-full bg-gradient-to-r from-or-500 via-or-300 to-rouge-600 transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(245,197,24,0.45)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
