/**
 * Insertion d'un schéma JSON-LD (Schema.org) dans une page Next.js.
 * Server-side rendered → indexable par Google et autres moteurs.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0),
      }}
    />
  );
}

/** Schéma Organization + LocalBusiness pour Acte 2 Théâtre */
export function organizationJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["PerformingArtsTheater", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: "Acte 2 Théâtre",
    alternateName: "Acte 2 — Happy Culture",
    legalName: "ACTE 2",
    description:
      "Théâtre de proximité à Lyon 9 (Vaise). Spectacles jeune public, théâtre adulte, séances scolaires, ateliers et location de salle.",
    url: siteUrl,
    logo: `${siteUrl}/logos/logo-acte2.jpg`,
    image: [
      `${siteUrl}/images/scene-banderole.jpg`,
      `${siteUrl}/images/la-salle.jpg`,
      `${siteUrl}/images/sieges-rouges.jpg`,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "32 quai Arloing",
      postalCode: "69009",
      addressLocality: "Lyon",
      addressRegion: "Auvergne-Rhône-Alpes",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.7711,
      longitude: 4.8113,
    },
    telephone: "+33478832171",
    email: "acte2theatre@yahoo.fr",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card, Check",
    maximumAttendeeCapacity: 100,
    publicAccess: true,
    smokingAllowed: false,
    foundingDate: "2007-02-06",
    vatID: "FR80494196819",
    iso6523Code: "0009:494196819",
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Bar",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Accessibilité PMR",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Climatisation",
        value: true,
      },
    ],
    founder: {
      "@type": "Person",
      name: "Hervé Deschamps",
    },
    sameAs: [
      "https://www.facebook.com/people/ACTE-2théâtre/61559022917345/",
      "https://acte2theatre.mapado.com",
    ],
    hasMap: "https://maps.app.goo.gl/TwqZxYrurq5qRTXr5",
    areaServed: {
      "@type": "City",
      name: "Lyon",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        description: "Sur rendez-vous et 1h avant chaque représentation.",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+33478832171",
        email: "acte2resa@yahoo.fr",
        contactType: "Réservations",
        availableLanguage: ["French"],
      },
      {
        "@type": "ContactPoint",
        email: "acte2communication@gmail.com",
        contactType: "Presse",
        availableLanguage: ["French"],
      },
    ],
  };
}

/** Schéma WebSite avec recherche interne */
export function websiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Acte 2 Théâtre — Happy Culture",
    inLanguage: "fr-FR",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

/** Schéma Speakable — déclare les sections lisibles par assistants vocaux */
export function speakableJsonLd(siteUrl: string, pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${siteUrl}${pagePath}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };
}

interface SpectacleEventInput {
  siteUrl: string;
  titre: string;
  slug: string;
  resume?: string;
  imageUrl?: string;
  compagnie?: string;
  publicCible?: string;
  dureeMinutes?: number;
  representations?: Array<{ dateHeure: string; complet?: boolean }>;
  tarifAdulte?: number;
  tarifReduit?: number;
  mapadoUrl?: string;
}

/** Schéma TheaterEvent pour rich snippets Google sur les détails de spectacle */
export function spectacleEventsJsonLd(sp: SpectacleEventInput) {
  const futureReps = (sp.representations ?? []).filter(
    (r) => new Date(r.dateHeure) >= new Date()
  );
  if (futureReps.length === 0) return null;

  return futureReps.map((rep) => ({
    "@context": "https://schema.org",
    "@type": "TheaterEvent",
    name: sp.titre,
    description: sp.resume,
    image: sp.imageUrl ? [sp.imageUrl] : undefined,
    url: `${sp.siteUrl}/spectacles/${sp.slug}`,
    startDate: rep.dateHeure,
    eventStatus: rep.complet
      ? "https://schema.org/EventScheduled"
      : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Acte 2 Théâtre",
      address: {
        "@type": "PostalAddress",
        streetAddress: "32 quai Arloing",
        postalCode: "69009",
        addressLocality: "Lyon",
        addressCountry: "FR",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Acte 2 Théâtre",
      url: sp.siteUrl,
    },
    performer: sp.compagnie
      ? { "@type": "PerformingGroup", name: sp.compagnie }
      : undefined,
    duration: sp.dureeMinutes ? `PT${sp.dureeMinutes}M` : undefined,
    typicalAgeRange: sp.publicCible,
    offers:
      sp.tarifAdulte !== undefined
        ? {
            "@type": "Offer",
            price: sp.tarifAdulte,
            priceCurrency: "EUR",
            availability: rep.complet
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
            url: sp.mapadoUrl ?? `${sp.siteUrl}/spectacles/${sp.slug}`,
            validFrom: new Date().toISOString(),
          }
        : undefined,
  }));
}

/** BreadcrumbList — fil d'Ariane structuré pour les SERP */
export function breadcrumbJsonLd(
  siteUrl: string,
  items: Array<{ name: string; href: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };
}
