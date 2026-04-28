import { defineField, defineType } from "sanity";

export const spectacle = defineType({
  name: "spectacle",
  title: "Spectacle",
  type: "document",
  groups: [
    { name: "principal", title: "Informations principales", default: true },
    { name: "dates", title: "Dates & tarifs" },
    { name: "media", title: "Médias" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      group: "principal",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "principal",
      options: { source: "titre", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "compagnie",
      title: "Compagnie",
      type: "string",
      group: "principal",
    }),
    defineField({
      name: "categorie",
      title: "Catégorie",
      type: "reference",
      to: [{ type: "categorie" }],
      group: "principal",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publicCible",
      title: "Public cible",
      type: "string",
      group: "principal",
      description: "Ex : Dès 3 ans, 6-10 ans, Tout public, Adultes",
      placeholder: "Dès 3 ans",
    }),
    defineField({
      name: "dureeMinutes",
      title: "Durée (minutes)",
      type: "number",
      group: "principal",
      validation: (Rule) => Rule.positive().max(300),
    }),
    defineField({
      name: "resume",
      title: "Résumé court",
      type: "text",
      rows: 3,
      group: "principal",
      description: "Affiché dans les listings, ~2 phrases",
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "description",
      title: "Description complète",
      type: "array",
      group: "principal",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "distribution",
      title: "Distribution",
      type: "array",
      of: [
        defineField({
          name: "membre",
          type: "object",
          fields: [
            defineField({
              name: "nom",
              type: "string",
              title: "Nom",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              type: "string",
              title: "Rôle / instrument",
            }),
          ],
          preview: {
            select: { title: "nom", subtitle: "role" },
          },
        }),
      ],
      group: "principal",
    }),

    // ── Dates & tarifs ──
    defineField({
      name: "representations",
      title: "Représentations",
      type: "array",
      group: "dates",
      of: [
        defineField({
          name: "representation",
          type: "object",
          fields: [
            defineField({
              name: "dateHeure",
              title: "Date et heure",
              type: "datetime",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "note",
              title: "Note (optionnelle)",
              type: "string",
              description: "Ex : séance scolaire, complet, etc.",
            }),
            defineField({
              name: "complet",
              title: "Complet",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { date: "dateHeure", note: "note", complet: "complet" },
            prepare({ date, note, complet }) {
              const d = date
                ? new Date(date).toLocaleString("fr-FR", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "(date manquante)";
              return {
                title: complet ? `${d} — COMPLET` : d,
                subtitle: note,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "premierePer",
      title: "Première représentation",
      type: "datetime",
      group: "dates",
      description:
        "Calculé automatiquement, utilisé pour le tri. Mettre à jour si vous voulez un autre ordre.",
    }),
    defineField({
      name: "tarifAdulte",
      title: "Tarif adulte (€)",
      type: "number",
      group: "dates",
    }),
    defineField({
      name: "tarifEnfant",
      title: "Tarif enfant (€)",
      type: "number",
      group: "dates",
    }),
    defineField({
      name: "tarifReduit",
      title: "Tarif réduit (€)",
      type: "number",
      group: "dates",
    }),
    defineField({
      name: "mapadoUrl",
      title: "Lien Mapado (réservation)",
      type: "url",
      group: "dates",
      description: "URL complète vers la page Mapado de ce spectacle",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"] }).custom((url) => {
          if (url && typeof url === "string" && !url.includes("mapado.com")) {
            return "Le lien doit pointer vers mapado.com";
          }
          return true;
        }),
    }),

    // ── Médias ──
    defineField({
      name: "imagePrincipale",
      title: "Image principale",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "credit",
          title: "Crédit photo",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "galerie",
      title: "Galerie d'images",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt" }),
            defineField({ name: "credit", type: "string", title: "Crédit" }),
          ],
        },
      ],
    }),
    defineField({
      name: "videoUrl",
      title: "Lien vidéo (YouTube, Vimeo)",
      type: "url",
      group: "media",
    }),
    defineField({
      name: "dossierPresse",
      title: "Dossier de presse (PDF)",
      type: "file",
      group: "media",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "dossierPedagogique",
      title: "Dossier pédagogique (PDF)",
      type: "file",
      group: "media",
      options: { accept: "application/pdf" },
    }),

    // ── Mise en avant ──
    defineField({
      name: "enVedette",
      title: "À l'affiche (en vedette)",
      type: "boolean",
      group: "principal",
      initialValue: false,
      description: "Cocher pour afficher en grand sur la page d'accueil",
    }),

    // ── SEO ──
    defineField({
      name: "seoTitre",
      title: "Titre SEO",
      type: "string",
      group: "seo",
      description: "Si vide, le titre principal sera utilisé",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta description",
      type: "text",
      rows: 2,
      group: "seo",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  orderings: [
    {
      title: "Date de première (récente → ancienne)",
      name: "premiereDesc",
      by: [{ field: "premierePer", direction: "desc" }],
    },
    {
      title: "Titre (A → Z)",
      name: "titreAsc",
      by: [{ field: "titre", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      titre: "titre",
      compagnie: "compagnie",
      media: "imagePrincipale",
      premiere: "premierePer",
      vedette: "enVedette",
    },
    prepare({ titre, compagnie, media, premiere, vedette }) {
      const date = premiere
        ? new Date(premiere).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "";
      const star = vedette ? "★ " : "";
      return {
        title: `${star}${titre}`,
        subtitle: [compagnie, date].filter(Boolean).join(" — "),
        media,
      };
    },
  },
});
