import { defineField, defineType } from "sanity";

export const actualite = defineType({
  name: "actualite",
  title: "Actualité",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "titre" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "datePublication",
      title: "Date de publication",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt" })],
    }),
    defineField({
      name: "extrait",
      title: "Extrait",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "contenu",
      title: "Contenu",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
  ],
  orderings: [
    {
      title: "Plus récente d'abord",
      name: "dateDesc",
      by: [{ field: "datePublication", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "titre",
      subtitle: "datePublication",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString("fr-FR")
          : "",
        media,
      };
    },
  },
});
