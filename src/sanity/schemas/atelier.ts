import { defineField, defineType } from "sanity";

export const atelier = defineType({
  name: "atelier",
  title: "Atelier",
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
      name: "type",
      title: "Type d'atelier",
      type: "string",
      options: {
        list: [
          { title: "Théâtre", value: "theatre" },
          { title: "Qi Gong", value: "qigong" },
          { title: "Tai Chi", value: "taichi" },
          { title: "Soins énergétiques", value: "energetique" },
          { title: "Autre", value: "autre" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publicCible",
      title: "Public cible",
      type: "string",
      placeholder: "Adultes / 8-12 ans / Tout public",
    }),
    defineField({
      name: "saison",
      title: "Saison",
      type: "string",
      placeholder: "2025-2026",
    }),
    defineField({
      name: "planning",
      title: "Planning",
      type: "text",
      rows: 4,
      description:
        "Description libre du planning (jours, horaires, dates clés)",
    }),
    defineField({
      name: "tarif",
      title: "Tarif (€)",
      type: "string",
      description: "Texte libre car les formules peuvent varier",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt" })],
    }),
    defineField({
      name: "inscriptionUrl",
      title: "Lien d'inscription",
      type: "url",
    }),
    defineField({
      name: "contactEmail",
      title: "Email de contact",
      type: "email",
    }),
    defineField({
      name: "actif",
      title: "Actif (visible sur le site)",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "titre", subtitle: "type", media: "image" },
  },
});
