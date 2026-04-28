import Link from "next/link";
import type { Parametres } from "@/lib/sanity/types";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { CookiePrefsLink } from "./cookie-prefs-link";

export function SiteFooter({ parametres }: { parametres: Parametres | null }) {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-nuit-950 text-craie-100 mt-20 relative overflow-hidden"
    >
      {/* Liseré or en haut */}
      <div className="divider-or" />

      {/* Halo décoratif derrière */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-scene opacity-40"
      />

      <div className="relative container py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Bloc identité */}
        <div className="md:col-span-4">
          <h2 className="font-display text-2xl mb-2 text-craie-100">
            Acte <span className="text-or-500">2</span> Théâtre
          </h2>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-or-400 mb-5">
            Happy Culture · Lyon 9
          </p>

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
              <Phone
                className="w-4 h-4 text-or-500"
                aria-hidden="true"
              />
              <a
                href={`tel:${parametres.telephone.replace(/\s/g, "")}`}
                className="hover:text-or-300 transition-colors"
              >
                {parametres.telephone}
              </a>
            </p>
          )}
          {parametres?.email && (
            <p className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-or-500" aria-hidden="true" />
              <a
                href={`mailto:${parametres.email}`}
                className="hover:text-or-300 transition-colors"
              >
                {parametres.email}
              </a>
            </p>
          )}
        </div>

        {/* Navigation */}
        <nav aria-label="Pied de page" className="md:col-span-3">
          <h2 className="font-display text-lg text-craie-100 mb-4">
            Programmation
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/spectacles"
                className="hover:text-or-300 transition-colors"
              >
                Tous les spectacles
              </Link>
            </li>
            <li>
              <Link
                href="/spectacles?categorie=jeune-public"
                className="hover:text-or-300 transition-colors"
              >
                Jeune public
              </Link>
            </li>
            <li>
              <Link
                href="/spectacles?categorie=theatre"
                className="hover:text-or-300 transition-colors"
              >
                Théâtre adulte
              </Link>
            </li>
            <li>
              <Link
                href="/spectacles?categorie=scolaire"
                className="hover:text-or-300 transition-colors"
              >
                Séances scolaires
              </Link>
            </li>
            <li>
              <Link
                href="/ateliers"
                className="hover:text-or-300 transition-colors"
              >
                Ateliers
              </Link>
            </li>
          </ul>
        </nav>

        {/* Le théâtre */}
        <div className="md:col-span-2">
          <h2 className="font-display text-lg text-craie-100 mb-4">
            Le théâtre
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/contact"
                className="hover:text-or-300 transition-colors"
              >
                Contact &amp; équipe
              </Link>
            </li>
            <li>
              <Link
                href="/location-salle"
                className="hover:text-or-300 transition-colors"
              >
                Location de salle
              </Link>
            </li>
            <li>
              <Link
                href="/soutenir"
                className="hover:text-or-300 transition-colors"
              >
                Nous soutenir
              </Link>
            </li>
            <li>
              <a
                href="https://acte2theatre.mapado.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-or-300 transition-colors"
              >
                Billetterie Mapado
              </a>
            </li>
          </ul>
        </div>

        {/* Réseaux + horaires */}
        <div className="md:col-span-3">
          <h2 className="font-display text-lg text-craie-100 mb-4">
            Suivez-nous
          </h2>
          <div className="flex gap-3 mb-6">
            {parametres?.reseauxSociaux?.facebook && (
              <a
                href={parametres.reseauxSociaux.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Page Facebook Acte 2 Théâtre"
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
                aria-label="Compte Instagram Acte 2 Théâtre"
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
                aria-label="Chaîne YouTube Acte 2 Théâtre"
                className="p-2.5 rounded-full bg-nuit-800 hover:bg-or-500 hover:text-nuit-950 transition-colors"
              >
                <Youtube className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>

          {parametres?.horaires && (
            <p className="text-sm whitespace-pre-line text-craie-100/75 leading-relaxed">
              {parametres.horaires}
            </p>
          )}
        </div>
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
