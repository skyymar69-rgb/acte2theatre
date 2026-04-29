"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { ContactCard } from "./contact-card";

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
      aria-label="Acte 2 Théâtre Happy Culture — accueil"
      className="group flex items-center gap-3 leading-none -my-1"
    >
      {/* Logo officiel Acte 2 Théâtre — affiché sur fond noir circulaire pour intégration thème */}
      <span className="hidden sm:inline-flex relative w-11 h-11 rounded-full bg-nuit-950 ring-1 ring-or-500/30 overflow-hidden flex-shrink-0">
        <Image
          src="/logos/logo-acte2.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="44px"
          className="object-cover"
          priority
        />
      </span>
      <span className="flex flex-col items-start">
        <span className="font-display text-[1.45rem] md:text-[1.55rem] font-semibold tracking-tight">
          Acte&nbsp;
          <span className="text-or-500 group-hover:text-or-400 transition-colors">
            2
          </span>
          &nbsp;Théâtre
        </span>
        <span className="text-[0.62rem] uppercase tracking-[0.32em] text-ink-muted mt-0.5">
          Happy&nbsp;Culture
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const openBtnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      // Focus trap : Tab garde le focus à l'intérieur du menu mobile
      if (e.key === "Tab" && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Focus initial sur le bouton de fermeture
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Restitution du focus au bouton qui a ouvert le menu
      openBtnRef.current?.focus();
    };
  }, [open]);

  // Effet d'élévation subtil quand on a scrollé (>8px)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={`sticky top-0 z-40 bg-page/85 backdrop-blur-md border-b transition-all ${
          scrolled
            ? "border-divider/40 shadow-[0_4px_18px_-12px_rgba(0,0,0,0.35)]"
            : "border-transparent"
        }`}
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
                  className={`relative px-3 py-2 text-sm font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
                    isActive
                      ? "text-rouge-600 dark:text-or-400 after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-or-500 after:rounded-full"
                      : "text-ink/85 hover:text-ink hover:bg-or-500/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ContactCard />
            <ThemeToggle />

            <button
              ref={openBtnRef}
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
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation mobile"
        // `inert` retire le menu du focus order et de la pile A11y quand fermé
        // (cast `as any` car la prop n'est pas encore typée par React 19 sur tous les setups)
        {...({ inert: open ? undefined : "" } as Record<string, unknown>)}
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
            ref={closeBtnRef}
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
