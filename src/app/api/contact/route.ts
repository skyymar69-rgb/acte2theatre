import { type NextRequest, NextResponse } from "next/server";

/**
 * Route API du formulaire de contact RGPD-conforme.
 *
 * Traitement actuel : log côté serveur + retour JSON.
 * Pour activer l'envoi d'email réel, brancher Resend / Formspree / Sendgrid
 * ici-même (variables d'env nécessaires).
 *
 * Sécurité :
 *  - Honeypot : champ "website" doit être vide (les bots le remplissent souvent)
 *  - Rate limit basique en mémoire (1 demande / 30s / IP)
 *  - Validation côté serveur (type, longueur, présence consentement)
 *  - Pas de stockage des données au-delà du log applicatif
 */

const lastSentByIp = new Map<string, number>();
const MIN_INTERVAL_MS = 30_000;

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // Rate limit
  const last = lastSentByIp.get(ip);
  if (last && Date.now() - last < MIN_INTERVAL_MS) {
    return NextResponse.json(
      { error: "Trop de tentatives, veuillez patienter quelques secondes." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const {
    nom,
    email,
    telephone,
    sujet,
    message,
    consentement,
    website, // honeypot
  } = body as {
    nom?: string;
    email?: string;
    telephone?: string;
    sujet?: string;
    message?: string;
    consentement?: boolean;
    website?: string;
  };

  // Honeypot : si rempli, on simule un succès silencieux (ne pas révéler aux bots)
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Validations RGPD + qualité
  if (!nom || typeof nom !== "string" || nom.length < 2 || nom.length > 100) {
    return NextResponse.json(
      { error: "Le nom est requis (2 à 100 caractères)." },
      { status: 400 }
    );
  }
  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 200
  ) {
    return NextResponse.json(
      { error: "Adresse email invalide." },
      { status: 400 }
    );
  }
  if (
    !message ||
    typeof message !== "string" ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Le message doit faire entre 10 et 5000 caractères." },
      { status: 400 }
    );
  }
  if (consentement !== true) {
    return NextResponse.json(
      {
        error:
          "Vous devez accepter le traitement de vos données pour envoyer le message.",
      },
      { status: 400 }
    );
  }

  // TODO Phase ultérieure : brancher un fournisseur d'emails ici (Resend, etc.)
  console.log("[contact-form]", {
    timestamp: new Date().toISOString(),
    ip,
    nom,
    email,
    telephone: telephone || null,
    sujet: sujet || null,
    messageLen: message.length,
  });

  lastSentByIp.set(ip, Date.now());

  return NextResponse.json({ ok: true });
}
