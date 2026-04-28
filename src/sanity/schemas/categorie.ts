import { defineField, defineType } from "sanity";

export const categorie = defineType({
  name: "categorie",
  title: "Catégorie",
  type: "document",
  fields: [
    defineField({
      name: "nom",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "nom" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description courte",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "couleur",
      title: "Couleur d'accent",
      type: "string",
      options: {
        list: [
          { title: "Rouge scène", value: "stage" },
          { title: "Or rideau", value: "amber" },
          { title: "Bleu nuit", value: "blue" },
          { title: "Vert sapin", value: "emerald" },
          { title: "Violet velours", value: "purple" },
        ],
        layout: "radio",
      },
      initialValue: "stage",
    }),
    defineField({
      name: "ordre",
      title: "Ordre d'affichage",
      type: "number",
      description: "Plus le nombre est petit, plus la catégorie apparaît tôt",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "ordreAsc",
      by: [{ field: "ordre", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "nom", subtitle: "description" },
  },
});
