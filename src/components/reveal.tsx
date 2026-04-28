"use client";

import { useEffect, useRef } from "react";

/**
 * Wrapper qui reveal son enfant à l'entrée dans le viewport.
 * IntersectionObserver — performant, respecte prefers-reduced-motion via CSS.
 *
 * Note React 19 / TS strict : `keyof React.JSX.IntrinsicElements` au lieu de
 * `keyof JSX.IntrinsicElements` (le namespace global JSX a été retiré).
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("is-visible"), delay);
          obs.unobserve(el);
        }
      },
      { rootMargin: "-50px 0px", threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref as unknown as React.Ref<HTMLElement>}
      className={`reveal ${className}`}
    >
      {children}
    </Component>
  );
}
