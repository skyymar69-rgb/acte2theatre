"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  IdCard,
  X,
  Download,
  ExternalLink,
  MapPin,
  Star,
  Globe2,
} from "lucide-react";
import { emitToast } from "./toast";

const SITE_URL = "https://acte2theatre.vercel.app";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/TwqZxYrurq5qRTXr5";
const GOOGLE_REVIEW_URL = "https://share.google/80TM7ToTYjJf2phd6";

const VCARD_DATA = {
  name: "Acte 2 Théâtre",
  org: "Acte 2 Théâtre",
  title: "Théâtre de proximité — Lyon 9",
  tel: "+33478832171",
  email: "acte2resa@yahoo.fr",
  emailAdmin: "acte2theatre@yahoo.fr",
  url: SITE_URL,
  street: "32 quai Arloing",
  city: "Lyon",
  postal: "69009",
  country: "France",
  note: "Théâtre de proximité — Happy Culture · spectacles jeune public, théâtre, ateliers, location de salle.",
};

/** Génère le contenu d'un fichier .vcf (vCard 3.0, format universel iOS/Android) */
function buildVCard(): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${VCARD_DATA.name}`,
    `N:${VCARD_DATA.name};;;;`,
    `ORG:${VCARD_DATA.org}`,
    `TITLE:${VCARD_DATA.title}`,
    `TEL;TYPE=WORK,VOICE:${VCARD_DATA.tel}`,
    `EMAIL;TYPE=INTERNET,WORK:${VCARD_DATA.email}`,
    `EMAIL;TYPE=INTERNET,WORK:${VCARD_DATA.emailAdmin}`,
    `ADR;TYPE=WORK:;;${VCARD_DATA.street};${VCARD_DATA.city};;${VCARD_DATA.postal};${VCARD_DATA.country}`,
    `URL:${VCARD_DATA.url}`,
    `NOTE:${VCARD_DATA.note}`,
    "CATEGORIES:Théâtre,Culture,Lyon",
    "END:VCARD",
  ].join("\r\n");
}

function downloadVCard() {
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "acte-2-theatre.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  emitToast("Carte de contact téléchargée. Ajoutez-nous à vos contacts !");
}

export function ContactCard() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Mount flag pour le portail (évite mismatch SSR)
  useEffect(() => setMounted(true), []);

  // ESC ferme + lock scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Focus le premier élément interactif de la modale
    setTimeout(() => dialogRef.current?.querySelector("button")?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Restaure le focus sur le bouton trigger
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="hidden sm:inline-flex h-9 items-center gap-2 px-3 rounded-full border border-divider/40 hover:border-or-500/60 hover:bg-or-500/10 text-ink text-sm font-medium transition-colors"
        aria-label="Ouvrir la carte de contact numérique"
      >
        <IdCard className="w-4 h-4 text-or-500" aria-hidden="true" />
        Carte numérique
      </button>

      {/* Bouton mobile compact (icône seule) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-divider/40 hover:border-or-500/60 text-ink"
        aria-label="Ouvrir la carte de contact numérique"
      >
        <IdCard className="w-4 h-4 text-or-500" aria-hidden="true" />
      </button>

      {open &&
        mounted &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-card-title"
          className="fixed inset-0 z-[100] overflow-y-auto bg-nuit-950/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            className="min-h-full flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
          <div
            ref={dialogRef}
            className="relative w-full max-w-2xl my-4 bg-surface text-ink rounded-2xl shadow-scene border border-or-500/20 overflow-hidden animate-fade-in-up"
          >
            {/* Liseré or en haut */}
            <div className="h-1 bg-gradient-to-r from-or-500 via-or-300 to-or-500" />

            <div className="p-6 md:p-8">
              <header className="flex items-start justify-between mb-6 gap-4">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-or-600 dark:text-or-400 mb-2">
                    Carte de contact numérique
                  </p>
                  <h2
                    id="contact-card-title"
                    className="font-display text-2xl md:text-3xl"
                  >
                    Acte <span className="text-or-500">2</span> Théâtre
                  </h2>
                  <p className="text-sm text-ink-muted mt-1">
                    32 quai Arloing — 69009 Lyon · 04 78 83 21 71
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer la carte de contact"
                  className="p-2 -mt-1 -mr-1 rounded-full hover:bg-ink/5 transition-colors"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <QrTile
                  title="Notre site"
                  subtitle="acte2theatre.vercel.app"
                  href={SITE_URL}
                  value={SITE_URL}
                  icon={<Globe2 className="w-4 h-4" aria-hidden="true" />}
                />
                <QrTile
                  title="Itinéraire"
                  subtitle="Google Maps"
                  href={GOOGLE_MAPS_URL}
                  value={GOOGLE_MAPS_URL}
                  icon={<MapPin className="w-4 h-4" aria-hidden="true" />}
                />
                <QrTile
                  title="Laisser un avis"
                  subtitle="Google"
                  href={GOOGLE_REVIEW_URL}
                  value={GOOGLE_REVIEW_URL}
                  icon={<Star className="w-4 h-4" aria-hidden="true" />}
                />
              </div>

              <div className="mt-6 pt-5 border-t border-divider/15 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-ink-muted max-w-md">
                  Scannez avec votre téléphone pour ouvrir le site, calculer
                  l&apos;itinéraire ou laisser un avis. Vous pouvez aussi
                  télécharger nos coordonnées au format vCard.
                </p>
                <button
                  type="button"
                  onClick={downloadVCard}
                  className="btn-primary !py-2 !px-4 text-sm"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Télécharger la vCard
                </button>
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

function QrTile({
  title,
  subtitle,
  href,
  value,
  icon,
}: {
  title: string;
  subtitle: string;
  href: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center text-center p-4 rounded-xl bg-surface-2 hover:bg-or-500/5 border border-divider/10 hover:border-or-500/40 transition-all"
    >
      <div className="bg-white rounded-lg p-2 mb-3 shadow-sm flex items-center justify-center">
        <QRCodeSVG
          value={value}
          size={128}
          level="M"
          marginSize={2}
          fgColor="#0a0a0a"
          bgColor="#ffffff"
          aria-label={`QR Code ${title}`}
          className="block w-32 h-32"
        />
      </div>
      <div className="flex items-center gap-1.5 text-or-600 dark:text-or-400 mb-0.5">
        {icon}
        <span className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold">
          {title}
        </span>
      </div>
      <p className="text-xs text-ink-muted flex items-center gap-1">
        {subtitle}
        <ExternalLink
          className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />
      </p>
    </a>
  );
}
