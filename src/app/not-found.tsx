import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  Home,
  Ticket,
  GraduationCap,
  Building2,
  Heart,
  Mail,
  FileText,
  Map,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

const SITEMAP = [
  {
    title: "Programmation",
    href: "/spectacles",
    icon: Ticket,
    description: "Tous les spectacles à venir cette saison",
  },
  {
    title: "Ateliers & stages",
    href: "/ateliers",
    icon: GraduationCap,
    description: "Théâtre adultes, vacances 10-14 ans, Qi Gong",
  },
  {
    title: "Location de salle",
    href: "/location-salle",
    icon: Building2,
    description: "100 places à privatiser pour vos événements",
  },
  {
    title: "Nous soutenir",
    href: "/soutenir",
    icon: Heart,
    description: "Abonnement saison, scolaires, mécénat",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Mail,
    description: "Adresse, équipe, plan d'accès",
  },
  {
    title: "Plan du site",
    href: "/plan-du-site",
    icon: Map,
    description: "Toutes les pages classées par section",
  },
];

export default function NotFound() {
  return (
    <section className="container max-w-4xl py-12 md:py-16">
      {/* Logo + en-tête */}
      <div className="text-center mb-10">
        <Link
          href="/"
          aria-label="Retour à l'accueil"
          className="inline-flex items-center gap-3 mb-8 group"
        >
          <span className="relative w-14 h-14 rounded-full bg-nuit-950 ring-1 ring-or-500/40 overflow-hidden flex-shrink-0 group-hover:ring-or-500 transition-colors">
            <Image
              src="/logos/logo-acte2.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="56px"
              className="object-cover"
            />
          </span>
          <span className="text-left">
            <span className="block font-display text-xl font-semibold leading-tight">
              Acte <span className="text-or-500">2</span> Théâtre
            </span>
            <span className="block text-[0.62rem] uppercase tracking-[0.32em] text-ink-muted">
              Happy Culture
            </span>
          </span>
        </Link>

        <p className="text-or-500 font-display italic text-7xl md:text-9xl mb-2 leading-none">
          404
        </p>
        <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-3">
          Lever de rideau imprévu
        </p>
        <h1 className="text-3xl md:text-4xl mb-4 text-balance">
          Cette page n&apos;est plus à l&apos;affiche
        </h1>
        <p className="text-ink-muted mb-8 max-w-xl mx-auto text-pretty">
          L&apos;adresse a peut-être changé pendant l&apos;entracte. Voici le
          plan du site pour retrouver votre chemin.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary glow-or">
            <Home className="w-4 h-4" aria-hidden="true" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>

      {/* Plan du site illustré */}
      <div className="border-t border-divider/15 pt-10">
        <h2 className="text-xl font-display mb-6 text-center">
          Plan du site
        </h2>
        <ul
          aria-label="Liens vers les principales sections"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {SITEMAP.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-start gap-3 p-4 rounded-xl bg-surface border border-divider/15 hover:border-or-500/40 hover:shadow-sm transition-all"
                >
                  <span className="flex-shrink-0 inline-flex w-10 h-10 items-center justify-center rounded-full bg-or-500/10 text-or-600 dark:text-or-400 group-hover:bg-or-500/20 transition-colors">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-medium text-ink mb-1 inline-flex items-center gap-1">
                      {item.title}
                      <ArrowRight
                        className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="block text-xs text-ink-muted leading-snug">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Liens légaux discrets */}
      <div className="mt-12 pt-8 border-t border-divider/15 text-center text-xs text-ink-muted">
        <p className="mb-3">Informations légales</p>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <li>
            <Link
              href="/mentions-legales"
              className="hover:text-rouge-600 dark:hover:text-or-400 inline-flex items-center gap-1"
            >
              <FileText className="w-3 h-3" aria-hidden="true" />
              Mentions légales
            </Link>
          </li>
          <li>
            <Link
              href="/confidentialite"
              className="hover:text-rouge-600 dark:hover:text-or-400"
            >
              Confidentialité
            </Link>
          </li>
          <li>
            <Link
              href="/accessibilite"
              className="hover:text-rouge-600 dark:hover:text-or-400"
            >
              Accessibilité
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
