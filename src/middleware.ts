import { NextResponse, type NextRequest } from "next/server";

/**
 * Protection HTTP Basic du back-office Sanity (`/studio/**`).
 *
 * Comportement
 *  - Le navigateur affiche une popup "identifiant + mot de passe" au premier accès.
 *  - Les identifiants sont lus depuis `STUDIO_BASIC_AUTH_USER` / `STUDIO_BASIC_AUTH_PASS`
 *    (fichier `.env.local` en dev, variables d'environnement Vercel en prod).
 *  - Si l'une des deux variables est absente, la protection est désactivée
 *    (utile en CI/preview ; en prod, configurer obligatoirement les deux).
 *  - Une fois la Basic Auth franchie, l'authentification Sanity propre au
 *    Studio (compte Sanity du gérant) reste appliquée → double rideau.
 */
// Realm en ASCII strict : les en-têtes HTTP sont ByteString (latin1) et n'acceptent
// pas les caractères Unicode supérieurs à 0xFF (le tiret cadratin et l'accent
// circonflexe étaient refusés).
const REALM = "Acte 2 Theatre Studio";

function unauthorized() {
  return new NextResponse("Authentification requise.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function decodeBasic(header: string | null): { user: string; pass: string } | null {
  if (!header) return null;
  const [scheme, encoded] = header.split(" ");
  if (scheme !== "Basic" || !encoded) return null;
  try {
    // atob → binary string ; on reconstruit l'UTF-8 pour gérer les caractères accentués
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const decoded = new TextDecoder("utf-8").decode(bytes);
    const sep = decoded.indexOf(":");
    if (sep < 0) return null;
    return { user: decoded.slice(0, sep), pass: decoded.slice(sep + 1) };
  } catch {
    return null;
  }
}

// Comparaison à temps constant — évite la divulgation par mesure de latence.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function middleware(req: NextRequest) {
  const expectedUser = process.env.STUDIO_BASIC_AUTH_USER;
  const expectedPass = process.env.STUDIO_BASIC_AUTH_PASS;

  // Si la protection n'est pas configurée, on ne bloque pas (mais on log en dev)
  if (!expectedUser || !expectedPass) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[middleware] /studio non protégé : définir STUDIO_BASIC_AUTH_USER et STUDIO_BASIC_AUTH_PASS"
      );
    }
    return NextResponse.next();
  }

  const creds = decodeBasic(req.headers.get("authorization"));
  if (
    creds &&
    safeEqual(creds.user, expectedUser) &&
    safeEqual(creds.pass, expectedPass)
  ) {
    return NextResponse.next();
  }

  return unauthorized();
}

export const config = {
  // Protection appliquée uniquement aux routes Studio.
  // Deux entrées pour matcher à la fois `/studio` (racine) et `/studio/...`.
  matcher: ["/studio", "/studio/:path*"],
};
