import Link from "next/link";

const NAV_ITEMS = [
  { href: "/spectacles", label: "Programmation" },
  { href: "/ateliers", label: "Ateliers" },
  { href: "/location-salle", label: "Location de salle" },
  { href: "/soutenir", label: "Nous soutenir" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-curtain-50/95 backdrop-blur border-b border-curtain-200">
      <div className="container flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight"
        >
          Acte 2 <span className="text-stage-600">Théâtre</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-curtain-700 hover:text-stage-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* TODO Phase 2 : menu mobile (Sheet shadcn) */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-curtain-700"
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
