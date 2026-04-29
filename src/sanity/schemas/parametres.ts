import { defineField, defineType } from "sanity";

export const parametres = defineType({
  name: "parametres",
  title: "Paramètres du site",
  type: "document",
  // Hide creation in the studio — accessed only via the singleton structure item
  __experimental_omnisearch_visibility: false,
  fields: [
    defineField({
      name: "nomSite",
      title: "Nom du site",
      type: "string",
      initialValue: "Acte 2 Théâtre",
    }),
    defineField({
      name: "baseline",
      title: "Baseline",
      type: "string",
      placeholder: "Théâtre de proximité à Lyon",
    }),
    defineField({
      name: "adresse",
      title: "Adresse",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "telephone",
      title: "Téléphone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email de contact",
      type: "email",
    }),
    defineField({
      name: "horaires",
      title: "Horaires",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "reseauxSociaux",
      title: "Réseaux sociaux",
      type: "object",
      fields: [
        defineField({ name: "facebook", type: "url", title: "Facebook" }),
        defineField({ name: "instagram", type: "url", title: "Instagram" }),
        defineField({ name: "youtube", type: "url", title: "YouTube" }),
      ],
    }),
    defineField({
      name: "carteAbonnement",
      title: "Carte d'abonnement",
      type: "object",
      fields: [
        defineField({
          name: "actif",
          title: "Activée",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "nbSpectacles",
          title: "Nombre de spectacles inclus",
          type: "number",
          initialValue: 10,
        }),
        defineField({
          name: "prix",
          title: "Prix (€)",
          type: "number",
          initialValue: 110,
        }),
      ],
    }),
    defineField({
      name: "footerTexte",
      title: "Texte du footer",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Paramètres du site" }),
  },
});
