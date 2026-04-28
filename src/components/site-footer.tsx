import Link from "next/link";
import Image from "next/image";
import type { Parametres } from "@/lib/sanity/types";
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Ticket,
  GraduationCap,
  Building2,
  Heart,
  IdCard,
  Map as MapIcon,
} from "lucide-react";
import { CookiePrefsLink } from "./cookie-prefs-link";

interface SitemapItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SITEMAP_GROUPS: { title: string; items: SitemapItem[] }[] = [
  {
    title: "Programmation",
    items: [
      { href: "/spectacles", label: "Toute la saison", icon: Ticket },
      {
        href: "/spectacles?categorie=jeune-public",
        label: "Jeune public",
        icon: GraduationCap,
      },
      {
        href: "/spectacles?categorie=theatre",
        label: "Théâtre adulte",
        icon: Ticket,
      },
      {
        href: "/spectacles?categorie=scolaire",
        label: "Séances scolaires",
        icon: GraduationCap,
      },
    ],
  },
  {
    title: "Le théâtre",
    items: [
      { href: "/ateliers", label: "Ateliers & stages", icon: GraduationCap },
      { href: "/location-salle", label: "Location de salle", icon: Building2 },
      { href: "/entreprise", label: "Espace entreprise", icon: Building2 },
      { href: "/soutenir", label: "Nous soutenir", icon: Heart },
      { href: "/contact", label: "Contact & équipe", icon: Mail },
    ],
  },
];

export function SiteFooter({ parametres }: { parametres: Parametres | null }) {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-nuit-950 text-craie-100 mt-20 relative overflow-hidden bg-grain"
    >
      {/* Liseré or en haut */}
      <div className="divider-or" />

      {/* Halo décoratif derrière */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-scene opacity-40"
      />

      {/* ─────────── Bloc 1 : identité, plan du site illustré ─────────── */}
      <div className="relative container py-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Identité — 4 cols */}
        <div className="lg:col-span-4">
          <Link
            href="/"
            aria-label="Acte 2 Théâtre — accueil"
            className="inline-flex items-center gap-3 mb-5 group"
          >
            <span className="relative w-12 h-12 rounded-full bg-nuit-900 ring-1 ring-or-500/30 overflow-hidden flex-shrink-0 group-hover:ring-or-500/60 transition-colors">
              <Image
                src="/logos/logo-acte2.webp"
                alt=""
                aria-hidden="true"
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <span>
              <span className="block font-display text-xl text-craie-100 leading-tight">
                Acte <span className="text-or-500">2</span> Théâtre
              </span>
              <span className="block text-[0.62rem] uppercase tracking-[0.32em] text-or-400 mt-0.5">
                Happy Culture
              </span>
            </span>
          </Link>

          {parametres?.adresse && (
            <p className="flex items-start gap-2 text-sm text-craie-100/85 mb-3">
              <MapPin
                className="w-4 h-4 mt-0.5 flex-shrink-0 text-or-500"
                aria-hidden="true"
              />
              <span className="whitespace-pre-line">{parametres.adresse}</span>
            </p>
          )}
          {parametres?.telephone && (
            <p className="flex items-center gap-2 text-sm mb-2">
              <Phone className="w-4 h-4 text-or-500" aria-hidden="true" />
              <a
                href={`tel:${parametres.telephone.replace(/\s/g, "")}`}
                className="hover:text-or-300 transition-colors"
              >
                {parametres.telephone}
              </a>
            </p>
          )}
          {parametres?.email && (
            <p className="flex items-center gap-2 text-sm mb-5">
              <Mail className="w-4 h-4 text-or-500" aria-hidden="true" />
              <a
                href={`mailto:${parametres.email}`}
                className="hover:text-or-300 transition-colors"
              >
                {parametres.email}
              </a>
            </p>
          )}

          {/* Réseaux sociaux + horaires */}
          <div className="flex gap-3 mb-5">
            {parametres?.reseauxSociaux?.facebook && (
              <a
                href={parametres.reseauxSociaux.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Page Facebook Acte 2 Théâtre (ouvre dans un nouvel onglet)"
                className="p-2.5 rounded-full bg-nuit-800 hover:bg-or-500 hover:text-nuit-950 transition-colors"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {parametres?.reseauxSociaux?.instagram && (
              <a
                href={parametres.reseauxSociaux.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compte Instagram (ouvre dans un nouvel onglet)"
                className="p-2.5 rounded-full bg-nuit-800 hover:bg-or-500 hover:text-nuit-950 transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {parametres?.reseauxSociaux?.youtube && (
              <a
                href={parametres.reseauxSociaux.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chaîne YouTube (ouvre dans un nouvel onglet)"
                className="p-2.5 rounded-full bg-nuit-800 hover:bg-or-500 hover:text-nuit-950 transition-colors"
              >
                <Youtube className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            <a
              href="https://acte2theatre.mapado.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Billetterie Mapado (ouvre dans un nouvel onglet)"
              className="p-2.5 rounded-full bg-rouge-600 hover:bg-rouge-500 text-white transition-colors"
            >
              <Ticket className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {parametres?.horaires && (
            <p className="text-xs whitespace-pre-line text-craie-100/65 leading-relaxed">
              {parametres.horaires}
            </p>
          )}
        </div>

        {/* Plan du site illustré — 8 cols */}
        <nav aria-label="Plan du site" className="lg:col-span-8">
          <div className="flex items-center gap-2 mb-5">
            <MapIcon className="w-4 h-4 text-or-500" aria-hidden="true" />
            <h2 className="font-display text-lg text-craie-100">
              Plan du site
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {SITEMAP_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="text-[0.62rem] uppercase tracking-[0.32em] text-or-400 mb-3 font-semibold">
                  {group.title}
                </p>
                <ul className="space-y-1.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group inline-flex items-center gap-2 text-sm text-craie-100/85 hover:text-or-300 transition-colors py-1"
                        >
                          <Icon
                            className="w-3.5 h-3.5 text-or-500/60 group-hover:text-or-400 transition-colors"
                            aria-hidden="true"
                          />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-craie-100/55">
            <Link
              href="/plan-du-site"
              className="inline-flex items-center gap-1 hover:text-or-300 transition-colors"
            >
              <MapIcon className="w-3 h-3" aria-hidden="true" />
              Voir le plan complet (toutes les pages)
            </Link>
            <span className="mx-2 opacity-50">·</span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 hover:text-or-300 transition-colors"
            >
              <IdCard className="w-3 h-3" aria-hidden="true" />
              Carte de contact numérique
            </Link>
          </p>
        </nav>
      </div>

      {/* Sous-footer : copyright + crédits Kayzen + liens légaux */}
      <div className="relative border-t border-nuit-800/80">
        <div className="container py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-craie-100/60">
          <p>
            © {year} Acte 2 Théâtre. SARL au capital de 8 000 € — RCS Lyon
            494&nbsp;196&nbsp;819. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <Link
                href="/mentions-legales"
                className="hover:text-or-300 transition-colors"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/cgu"
                className="hover:text-or-300 transition-colors"
              >
                CGU
              </Link>
            </li>
            <li>
              <Link
                href="/cgv"
                className="hover:text-or-300 transition-colors"
              >
                CGV
              </Link>
            </li>
            <li>
              <Link
                href="/confidentialite"
                className="hover:text-or-300 transition-colors"
              >
                Confidentialité
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="hover:text-or-300 transition-colors"
              >
                Cookies
              </Link>
            </li>
            <li>
              <CookiePrefsLink />
            </li>
            <li>
              <Link
                href="/accessibilite"
                className="hover:text-or-300 transition-colors"
              >
                Accessibilité
              </Link>
            </li>
            <li>
              <Link
                href="/plan-du-site"
                className="hover:text-or-300 transition-colors"
              >
                Plan du site
              </Link>
            </li>
            <li>
              <Link
                href="/studio"
                className="hover:text-or-300 transition-colors"
              >
                Espace admin
              </Link>
            </li>
          </ul>
        </div>

        <div className="container py-4 border-t border-nuit-800/60 text-xs text-craie-100/50 text-center">
          Fièrement réalisé par{" "}
          <a
            href="https://internet.kayzen-lyon.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-or-400 hover:text-or-300 font-medium transition-colors"
          >
            Kayzen Web
          </a>{" "}
          — Agence digitale lyonnaise
        </div>
      </div>
    </footer>
  );
}
