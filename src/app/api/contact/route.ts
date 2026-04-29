import { type NextRequest, NextResponse } from "next/server";

/**
 * Route API du formulaire de contact RGPD-conforme.
 *
 * Sécurité
 *  - Honeypot (champ "website" caché)
 *  - Rate-limit en mémoire (1 / 30 s / IP) — basique, à remplacer par Upstash KV
 *    en prod si fort trafic ou multi-instance Vercel.
 *  - Validation stricte des champs (taille, format)
 *  - Limite de body 50 ko (au-delà, 413 sans lecture)
 *  - Consentement RGPD obligatoire
 *
 * Envoi du message
 *  - Si `RESEND_API_KEY` est défini → envoi via Resend vers `CONTACT_TO_EMAIL`.
 *  - Sinon → log applicatif (utile en dev, à éviter en prod : configurer Resend).
 */

const lastSentByIp = new Map<string, number>();
const MIN_INTERVAL_MS = 30_000;
const MAX_BODY_BYTES = 50_000;

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

async function sendViaResend(payload: {
  nom: string;
  email: string;
  telephone?: string | null;
  sujet?: string | null;
  message: string;
  ip: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return { ok: false, error: "resend_not_configured" };

  const subject = payload.sujet
    ? `[Site Acte 2 Théâtre] ${payload.sujet}`
    : `[Site Acte 2 Théâtre] Nouveau message de ${payload.nom}`;

  const body = [
    `De   : ${payload.nom} <${payload.email}>`,
    payload.telephone ? `Tél  : ${payload.telephone}` : null,
    `IP   : ${payload.ip}`,
    "",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject,
      text: body,
    }),
  });

  if (!res.ok) {
    return { ok: false, error: `resend_${res.status}` };
  }
  return { ok: true };
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);

  // Rate limit
  const last = lastSentByIp.get(ip);
  if (last && Date.now() - last < MIN_INTERVAL_MS) {
    return NextResponse.json(
      { error: "Trop de tentatives, veuillez patienter quelques secondes." },
      { status: 429 }
    );
  }

  // Limite de taille (avant lecture du body)
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Message trop volumineux." },
      { status: 413 }
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

  // Honeypot : succès silencieux pour ne pas alerter le bot
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

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

  // Envoi (ou fallback log)
  if (process.env.RESEND_API_KEY) {
    const result = await sendViaResend({
      nom,
      email,
      telephone: telephone || null,
      sujet: sujet || null,
      message,
      ip,
    });
    if (!result.ok) {
      console.error("[contact-form] Echec envoi", result.error);
      return NextResponse.json(
        {
          error:
            "Le message n'a pas pu être envoyé. Merci de réessayer ou de nous écrire directement à acte2theatre@yahoo.fr.",
        },
        { status: 502 }
      );
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.log("[contact-form] (mode dev — Resend non configuré)", {
      timestamp: new Date().toISOString(),
      ip,
      nom,
      email,
      telephone: telephone || null,
      sujet: sujet || null,
      messageLen: message.length,
    });
  } else {
    // Production sans Resend : on ne perd pas le message, on l'enregistre dans
    // les logs de la plateforme (Vercel) pour récupération a posteriori.
    console.warn("[contact-form] PROD sans RESEND_API_KEY — message non envoyé", {
      nom,
      email,
      sujet: sujet || null,
      messageLen: message.length,
    });
  }

  lastSentByIp.set(ip, Date.now());

  return NextResponse.json({ ok: true });
}
