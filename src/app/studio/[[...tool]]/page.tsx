/**
 * Sanity Studio est monté à l'URL /studio.
 *
 * Hervé y accédera pour créer/modifier les spectacles, ateliers, etc.
 * L'authentification est gérée par Sanity (compte Sanity).
 *
 * Pattern : ce fichier est un Server Component (peut exporter metadata),
 * et le wrapper client live dans Studio.tsx.
 */
import type { Metadata, Viewport } from "next";
import { Studio } from "./Studio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sanity Studio — Acte 2 Théâtre",
  robots: { index: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function StudioPage() {
  return <Studio />;
}
