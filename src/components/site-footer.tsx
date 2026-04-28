import Link from "next/link";
import type { Parametres } from "@/lib/sanity/types";
import { Facebook, Instagram, Youtube } from "lucide-react";

export function SiteFooter({ parametres }: { parametres: Parametres | null }) {
  return (
    <footer className="bg-curtain-900 text-curtain-200 py-12 mt-16">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-curtain-50 text-xl mb-4">
            Acte 2 Théâtre
          </h3>
          {parametres?.adresse && (
            <p className="text-sm whitespace-pre-line mb-2">
              {parametres.adresse}
            </p>
          )}
          {parametres?.telephone && (
            <p className="text-sm">
              <a
                href={`tel:${parametres.telephone.replace(/\s/g, "")}`}
                className="hover:text-curtain-50"
              >
                {parametres.telephone}
              </a>
            </p>
          )}
          {parametres?.email && (
            <p className="text-sm">
              <a
                href={`mailto:${parametres.email}`}
                className="hover:text-curtain-50"
              >
                {parametres.email}
              </a>
            </p>
          )}
        </div>

        <div>
          <h3 className="font-display text-curtain-50 text-xl mb-4">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/spectacles" className="hover:text-curtain-50">
                Programmation
              </Link>
            </li>
            <li>
              <Link href="/ateliers" className="hover:text-curtain-50">
                Ateliers
              </Link>
            </li>
            <li>
              <Link href="/location-salle" className="hover:text-curtain-50">
                Location de salle
              </Link>
            </li>
            <li>
              <Link href="/soutenir" className="hover:text-curtain-50">
                Nous soutenir
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-curtain-50">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-curtain-50 text-xl mb-4">
            Suivez-nous
          </h3>
          <div className="flex gap-3">
            {parametres?.reseauxSociaux?.facebook && (
              <a
                href={parametres.reseauxSociaux.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full bg-curtain-800 hover:bg-curtain-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {parametres?.reseauxSociaux?.instagram && (
              <a
                href={parametres.reseauxSociaux.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-curtain-800 hover:bg-curtain-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {parametres?.reseauxSociaux?.youtube && (
              <a
                href={parametres.reseauxSociaux.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 rounded-full bg-curtain-800 hover:bg-curtain-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            )}
          </div>
          {parametres?.horaires && (
            <p className="text-sm whitespace-pre-line mt-6 text-curtain-300">
              {parametres.horaires}
            </p>
          )}
        </div>
      </div>

      <div className="container mt-10 pt-6 border-t border-curtain-800 text-xs text-curtain-400 flex flex-wrap justify-between gap-2">
        <p>© {new Date().getFullYear()} Acte 2 Théâtre. Tous droits réservés.</p>
        <p>
          <Link href="/studio" className="hover:text-curtain-200">
            Espace administration
          </Link>
        </p>
      </div>
    </footer>
  );
}
