import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateSecret } from "@/sanity/env";

/**
 * Webhook Sanity → Next.js
 *
 * Configuration côté Sanity (https://sanity.io/manage > API > Webhooks) :
 *  - URL: https://<votre-domaine>/api/revalidate
 *  - Trigger on: Create, Update, Delete
 *  - Filter: _type in ["spectacle","categorie","atelier","actualite","pageStatique","parametres"]
 *  - Projection: { _type, _id, "slug": slug.current }
 *  - HTTP method: POST
 *  - HTTP Headers: aucun
 *  - Secret: identique à SANITY_REVALIDATE_SECRET
 *
 * Quand un éditeur publie une modif dans le Studio, ce endpoint reçoit
 * l'événement et invalide les tags concernés. Le visiteur suivant verra
 * la nouvelle version sans rebuild.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      _id?: string;
      slug?: string;
    }>(req, revalidateSecret);

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: "Bad request — missing _type" },
        { status: 400 }
      );
    }

    // Tag générique du type (ex: "spectacle")
    revalidateTag(body._type);

    // Tag spécifique au document si on a son slug
    if (body.slug) {
      revalidateTag(`${body._type}:${body.slug}`);
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      slug: body.slug ?? null,
      now: Date.now(),
    });
  } catch (err) {
    console.error("[revalidate] error:", err);
    return NextResponse.json(
      { message: (err as Error).message },
      { status: 500 }
    );
  }
}
