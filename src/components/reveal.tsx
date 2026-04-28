"use client";

import { useEffect, useRef } from "react";

/**
 * Wrapper qui reveal son enfant à l'entrée dans le viewport.
 * IntersectionObserver — performant, respecte prefers-reduced-motion via CSS.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
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

  // @ts-expect-error — JSX dynamic tag with ref
  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
