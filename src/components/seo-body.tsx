import Link from "next/link";

export interface SeoSection {
  /** Titre H2 de la section. */
  titre: string;
  /** Paragraphes — chaque entrée = 1 <p>. Peut contenir du HTML simple. */
  paragraphes: string[];
  /** Sous-section H3 facultative. */
  sousSections?: { titre: string; paragraphes: string[] }[];
}

export interface SeoLink {
  href: string;
  label: string;
}

interface Props {
  /** Kicker au-dessus du H2 principal — ex : "Notre projet". */
  kicker?: string;
  /** Titre H2 principal de la zone éditoriale. */
  titre: string;
  /** Phrase d'accroche en gros au-dessus du contenu. */
  accroche?: string;
  /** Sections rédactionnelles. */
  sections: SeoSection[];
  /** Liens internes en bas (cross-linking). */
  liens?: SeoLink[];
  /** Couleur de fond ("default" | "surface-2"). */
  fond?: "default" | "surface-2";
}

/**
 * Bloc rédactionnel SEO-friendly réutilisable.
 *
 * Pattern : structure sémantique HTML5 propre (article/section/h2/h3/p),
 * 750+ mots utiles par page, mots-clés naturellement intégrés, liens
 * internes pour le maillage, ton "Happy Culture".
 */
export function SeoBody({
  kicker,
  titre,
  accroche,
  sections,
  liens,
  fond = "default",
}: Props) {
  const wrapperClass =
    fond === "surface-2"
      ? "bg-surface-2/40 border-y border-divider/15 py-14 md:py-20"
      : "py-14 md:py-20";

  return (
    <article className={wrapperClass}>
      <div className="container max-w-4xl">
        <header className="mb-10 max-w-3xl">
          {kicker && (
            <p className="text-rouge-600 dark:text-or-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
              {kicker}
            </p>
          )}
          <h2 className="text-balance">{titre}</h2>
          {accroche && (
            <p className="mt-4 text-lg text-ink/90 leading-relaxed text-pretty">
              {accroche}
            </p>
          )}
        </header>

        <div className="prose-acte2 max-w-none">
          {sections.map((s, i) => (
            <section key={i} className="mt-10 first:mt-0">
              <h3 className="text-xl !text-xl mb-3">{s.titre}</h3>
              {s.paragraphes.map((p, j) => (
                <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
              {s.sousSections?.map((ss, k) => (
                <div key={k} className="mt-5">
                  <h4 className="text-base font-semibold text-ink mb-2 not-prose">
                    {ss.titre}
                  </h4>
                  {ss.paragraphes.map((p, l) => (
                    <p key={l} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>
              ))}
            </section>
          ))}
        </div>

        {liens && liens.length > 0 && (
          <nav
            aria-label="Liens internes"
            className="mt-12 pt-8 border-t border-divider/15"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-muted font-semibold mb-3">
              Aller plus loin
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {liens.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-rouge-600 dark:text-or-400 hover:underline underline-offset-2 inline-flex items-center gap-1"
                  >
                    {l.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </article>
  );
}
