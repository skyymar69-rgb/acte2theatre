/**
 * Skeleton générique affiché pendant le rendu Server Component.
 * Volontairement minimal : la plupart des pages se chargent < 200 ms.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Chargement de la page"
      className="container py-24 flex flex-col items-center justify-center text-center"
    >
      <div className="relative w-12 h-12 mb-6" aria-hidden="true">
        <span className="absolute inset-0 rounded-full border-2 border-or-500/30" />
        <span className="absolute inset-0 rounded-full border-2 border-or-500 border-t-transparent animate-spin motion-reduce:animate-none" />
      </div>
      <p className="text-sm text-ink-muted">Chargement…</p>
    </div>
  );
}
