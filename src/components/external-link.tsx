import { ExternalLink as Icon } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";

/**
 * Lien externe accessible :
 * - target="_blank" + rel sécurisés
 * - Icône visible
 * - Texte sr-only "(ouvre dans un nouvel onglet)" pour les lecteurs d'écran
 *   (RGAA 6.2)
 */
export function ExternalLink({
  href,
  children,
  className = "",
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 ${className}`}
      {...rest}
    >
      {children}
      <Icon className="w-3 h-3 opacity-70" aria-hidden="true" />
      <span className="sr-only"> (ouvre dans un nouvel onglet)</span>
    </a>
  );
}
