import { defineField, defineType } from "sanity";

export const pageStatique = defineType({
  name: "pageStatique",
  title: "Page statique",
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
      description:
        "Identifiant URL : 'contact', 'location-salle', 'soutenir', etc.",
    }),
    defineField({
      name: "imageHero",
      title: "Image de bannière",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt" })],
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
    defineField({
      name: "seoTitre",
      title: "Titre SEO",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: { title: "titre", subtitle: "slug.current" },
  },
});
