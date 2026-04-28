import {
  pageStatiqueMetadata,
  renderPageStatique,
} from "@/components/page-statique-renderer";
import { ContactForm } from "@/components/contact-form";
import { GoogleMapEmbed } from "@/components/google-map-embed";
import { NextShowsTeaser } from "@/components/next-shows-teaser";
import { Star } from "lucide-react";

export const revalidate = 3600;

export const generateMetadata = () => pageStatiqueMetadata({ slug: "contact" });

export default async function ContactPage() {
  return (
    <>
      {await renderPageStatique({ slug: "contact" })}

      {/* Carte + bouton avis Google */}
      <section
        aria-labelledby="map-title"
        className="bg-surface-2/50 border-y border-divider/15 py-12 md:py-16"
      >
        <div className="container max-w-5xl">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
            <h2 id="map-title" className="text-2xl">
              Nous trouver à Lyon
            </h2>
            <a
              href="https://share.google/80TM7ToTYjJf2phd6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !py-2 !px-4 text-sm"
            >
              <Star className="w-4 h-4 text-or-500" aria-hidden="true" />
              Laisser un avis Google
            </a>
          </div>
          <GoogleMapEmbed />
          <p className="mt-4 text-sm text-ink-muted">
            Bus C14, C6, 31 — arrêt Place Valmy. Métro D Gorge de Loup à
            10&nbsp;min à pied. Parking conseillé&nbsp;: Indigo Saint-Paul ou
            zones bleues à proximité.
          </p>
        </div>
      </section>

      {/* Formulaire de contact RGPD */}
      <section
        aria-labelledby="form-title"
        className="container max-w-3xl py-12 md:py-16"
      >
        <header className="mb-8">
          <h2 id="form-title" className="text-2xl mb-2">
            Nous écrire
          </h2>
          <p className="text-ink-muted">
            Une question sur la programmation, un projet de location, une
            demande de réservation scolaire&nbsp;? Utilisez ce formulaire ou
            écrivez directement à{" "}
            <a
              href="mailto:acte2theatre@yahoo.fr"
              className="text-rouge-600 dark:text-or-400 underline underline-offset-2"
            >
              acte2theatre@yahoo.fr
            </a>
            .
          </p>
        </header>
        <ContactForm />
      </section>

      <NextShowsTeaser />
    </>
  );
}
