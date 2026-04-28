"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const NAV_ITEMS = [
  { href: "/spectacles", label: "Programmation" },
  { href: "/ateliers", label: "Ateliers" },
  { href: "/location-salle", label: "Location de salle" },
  { href: "/soutenir", label: "Nous soutenir" },
  { href: "/contact", label: "Contact" },
];

/**
 * Wordmark Acte 2 Théâtre — Happy Culture
 * - Playfair Display, "2" en or rideau, "Happy Culture" en sous-titre
 * - S'adapte automatiquement au thème (couleurs sémantiques)
 */
function Wordmark() {
  return (
    <Link
      href="/"
      aria-label="Acte 2 Théâtre — accueil"
      className="group flex flex-col items-start leading-none -my-1"
    >
      <span className="font-display text-[1.45rem] md:text-[1.65rem] font-semibold tracking-tight">
        Acte&nbsp;
        <span className="text-or-500 group-hover:text-or-400 transition-colors">
          2
        </span>{" "}
        Théâtre
      </span>
      <span className="text-[0.62rem] uppercase tracking-[0.32em] text-ink-muted mt-0.5">
        Happy&nbsp;Culture
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        role="banner"
        className="sticky top-0 z-40 bg-page/85 backdrop-blur-md border-b border-divider/40 transition-colors"
      >
        <div className="container flex items-center justify-between h-16 md:h-20 gap-4">
          <Wordmark />

          <nav
            aria-label="Navigation principale"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                    isActive
                      ? "text-rouge-600 dark:text-or-400"
                      : "text-ink-muted hover:text-ink hover:bg-or-500/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-divider/40 hover:border-or-500/60 text-ink"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation mobile"
        className={`fixed inset-0 z-50 bg-nuit-950 text-craie-100 md:hidden transition-opacity duration-200 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-craie-100"
          >
            Acte <span className="text-or-500">2</span> Théâtre
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-2 -mr-2 text-craie-100 hover:text-or-400 transition-colors"
            aria-label="Fermer le menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="6" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="container flex flex-col gap-1 pt-8">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`block py-4 text-2xl font-display border-b border-nuit-800 transition-colors ${
                  isActive
                    ? "text-or-400"
                    : "text-craie-100 hover:text-or-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
