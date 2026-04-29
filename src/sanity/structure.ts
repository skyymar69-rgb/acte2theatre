import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Acte 2 Théâtre")
    .items([
      // Programmation — le cœur du contenu
      S.listItem()
        .title("🎭 Spectacles")
        .child(
          S.documentTypeList("spectacle")
            .title("Tous les spectacles")
            .defaultOrdering([{ field: "premierePer", direction: "desc" }])
        ),
      S.listItem()
        .title("🏷️ Catégories")
        .child(S.documentTypeList("categorie").title("Catégories")),

      S.divider(),

      // Activités annexes
      S.listItem()
        .title("🧘 Ateliers")
        .child(S.documentTypeList("atelier").title("Ateliers")),
      S.listItem()
        .title("📰 Actualités")
        .child(S.documentTypeList("actualite").title("Actualités")),

      S.divider(),

      // Pages éditoriales
      S.listItem()
        .title("📄 Pages")
        .child(S.documentTypeList("pageStatique").title("Pages statiques")),

      S.divider(),

      // Singleton : paramètres globaux du site
      S.listItem()
        .title("⚙️ Paramètres du site")
        .child(
          S.editor()
            .id("parametres")
            .schemaType("parametres")
            .documentId("parametres")
        ),
    ]);
